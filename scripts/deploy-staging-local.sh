#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying Frontend to Staging (Local)${NC}"
echo "============================================"

# Configuration
REGISTRY="ghcr.io"
# Note: Docker requires repository names to be lowercase
# GHCR normalizes organization names to lowercase automatically
# GitHub Actions uses ${{ github.repository_owner }} which gets normalized by Docker
IMAGE_NAME="colombian-suppliers/full-colombiano-frontend"
IMAGE_TAG="staging"
NAMESPACE="stg-apps"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
INFRA_DIR="$(cd "$FRONTEND_DIR/../full-colombiano-infra" && pwd)"
KUBECONFIG_PATH="$INFRA_DIR/.kube/dev-k3s.yaml"

# Check prerequisites
echo ""
echo "📋 Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl is not installed${NC}"
    exit 1
fi

# Set KUBECONFIG
if [ -z "$KUBECONFIG" ]; then
    if [ -f "$KUBECONFIG_PATH" ]; then
        export KUBECONFIG="$KUBECONFIG_PATH"
        echo "✅ Using kubeconfig from: $KUBECONFIG_PATH"
    else
        echo -e "${YELLOW}⚠️  KUBECONFIG not set and not found at $KUBECONFIG_PATH${NC}"
        echo "Please set KUBECONFIG environment variable:"
        echo "  export KUBECONFIG=/path/to/kubeconfig"
        exit 1
    fi
else
    echo "✅ Using KUBECONFIG: $KUBECONFIG"
fi

# Verify kubectl connection
echo "🔍 Verifying kubectl connection..."
if ! kubectl get nodes &> /dev/null; then
    echo -e "${RED}❌ Cannot connect to Kubernetes cluster${NC}"
    echo "Please check your KUBECONFIG"
    exit 1
fi
echo "✅ Connected to cluster"

# Check if logged into GHCR
echo ""
echo "🔐 Step 1: Checking GHCR authentication..."
if docker info 2>/dev/null | grep -q "Username"; then
    echo "✅ Already logged into Docker registry"
else
    echo -e "${YELLOW}⚠️  Not logged into Docker registry${NC}"
    echo ""
    echo "Please login to GitHub Container Registry using one of these methods:"
    echo ""
    echo "Option 1: Using GitHub CLI (Recommended):"
    echo "  gh auth token | docker login ghcr.io -u MateoAV --password-stdin"
    echo ""
    echo "Option 2: Using GITHUB_TOKEN environment variable:"
    echo "  echo \$GITHUB_TOKEN | docker login ghcr.io -u MateoAV --password-stdin"
    echo ""
    echo "Option 3: Interactive login:"
    echo "  docker login ghcr.io"
    echo "  # Username: MateoAV"
    echo "  # Password: <your GitHub Personal Access Token>"
    echo ""
    
    # Try to auto-login if GITHUB_TOKEN is set
    if [ -n "$GITHUB_TOKEN" ]; then
        echo "🔐 Attempting automatic login with GITHUB_TOKEN..."
        echo "$GITHUB_TOKEN" | docker login ghcr.io -u MateoAV --password-stdin 2>/dev/null && echo "✅ Login successful!" || {
            echo -e "${RED}❌ Automatic login failed${NC}"
            read -p "Press Enter to try manual login, or Ctrl+C to cancel..."
        }
    else
        # Try GitHub CLI
        if command -v gh &> /dev/null; then
            echo "🔐 Attempting automatic login with GitHub CLI..."
            gh auth token 2>/dev/null | docker login ghcr.io -u MateoAV --password-stdin 2>/dev/null && echo "✅ Login successful!" || {
                echo -e "${YELLOW}⚠️  GitHub CLI login failed, please login manually${NC}"
                read -p "Press Enter after logging in, or Ctrl+C to cancel..."
            }
        else
            read -p "Press Enter after logging in, or Ctrl+C to cancel..."
        fi
    fi
fi

# Step 2: Build and Push Docker image
echo ""
echo "🏗️  Step 2: Building and pushing Docker image for linux/amd64..."
cd "$FRONTEND_DIR"

# Use buildx to build for the correct platform (linux/amd64 for VPS) and push directly
SHORT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "latest")

docker buildx build \
  --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_API_URL=https://api-stg.fullcolombiano.com \
  --build-arg NEXT_PUBLIC_ENVIRONMENT=staging \
  --build-arg NEXT_PUBLIC_SITE_URL=https://stg.fullcolombiano.com \
  --build-arg SKIP_API_TYPES_GENERATION=true \
  -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
  -t ${REGISTRY}/${IMAGE_NAME}:staging-${SHORT_SHA} \
  --push \
  .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build and push failed${NC}"
    exit 1
fi

echo "✅ Docker image built and pushed successfully"
echo "   Image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

# Step 3: Skip (already pushed with buildx)
echo ""
echo "✅ Step 3: Image already pushed (skipped - done in Step 2)"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker push failed${NC}"
    exit 1
fi

echo "✅ Image pushed successfully"
echo "   Image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

# Step 4: Create namespace if not exists
echo ""
echo "📁 Step 4: Creating namespace..."
kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
echo "✅ Namespace ready"

# Step 5: Create/Update ConfigMap
echo ""
echo "⚙️  Step 5: Creating/updating ConfigMap..."
kubectl create configmap frontend-config \
  --from-literal=NEXT_PUBLIC_API_URL=https://api-stg.fullcolombiano.com \
  --from-literal=NEXT_PUBLIC_ENVIRONMENT=staging \
  --from-literal=NEXT_PUBLIC_APP_NAME="Full Colombiano Staging" \
  -n ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
echo "✅ ConfigMap ready"

# Step 6: Apply deployment using manifest from infra repo
echo ""
echo "🚀 Step 6: Applying deployment..."
DEPLOY_MANIFEST="$INFRA_DIR/deploy-frontend-staging.yaml"

if [ -f "$DEPLOY_MANIFEST" ]; then
    echo "📝 Using manifest: $DEPLOY_MANIFEST"
    # Update image in the manifest for this deployment
    sed "s|image:.*|image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}|" "$DEPLOY_MANIFEST" | kubectl apply -f -
else
    echo -e "${YELLOW}⚠️  Manifest file not found at $DEPLOY_MANIFEST, using inline YAML...${NC}"
    cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: ${NAMESPACE}
  labels:
    app: frontend
spec:
  replicas: 2
  progressDeadlineSeconds: 600
  revisionHistoryLimit: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: nextjs
        image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
        envFrom:
        - configMapRef:
            name: frontend-config
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        startupProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 0
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 30
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 60
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: ${NAMESPACE}
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend
  namespace: ${NAMESPACE}
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/proxy-body-size: "64m"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - stg.fullcolombiano.com
    secretName: frontend-tls
  rules:
  - host: stg.fullcolombiano.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
EOF
fi

echo "✅ Deployment applied"

# Step 7: Wait for rollout
echo ""
echo "⏳ Step 7: Waiting for deployment rollout..."
kubectl rollout status deployment/frontend -n ${NAMESPACE} --timeout=10m

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Deployment rollout may have issues${NC}"
    echo "Checking pod status..."
    kubectl get pods -n ${NAMESPACE} -l app=frontend
fi

# Step 8: Show status
echo ""
echo "📊 Step 8: Deployment status"
echo "=============================="
echo ""
echo "Pods:"
kubectl get pods -n ${NAMESPACE} -l app=frontend
echo ""
echo "Service:"
kubectl get svc -n ${NAMESPACE} -l app=frontend
echo ""
echo "Ingress:"
kubectl get ingress -n ${NAMESPACE}
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "🌐 Frontend URL: https://stg.fullcolombiano.com"
echo ""
echo "📋 Useful commands:"
echo "  kubectl logs -f deployment/frontend -n ${NAMESPACE}"
echo "  kubectl get pods -n ${NAMESPACE}"
echo "  kubectl describe deployment frontend -n ${NAMESPACE}"
