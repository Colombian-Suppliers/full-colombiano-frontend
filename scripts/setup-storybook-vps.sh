#!/bin/bash

# Storybook VPS Setup Script
# This script sets up the necessary infrastructure on your VPS to host Storybook

set -e

echo "🚀 Colombian Supply - Storybook VPS Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on VPS or locally
if [ -z "$VPS_HOST" ]; then
    echo -e "${YELLOW}Running in local mode. Set VPS_HOST to run remotely.${NC}"
    echo ""
    read -p "Enter VPS IP address: " VPS_HOST
    read -p "Enter VPS SSH user (default: deploy): " VPS_USER
    VPS_USER=${VPS_USER:-deploy}
    read -p "Enter SSH key path (default: ~/.ssh/id_rsa): " SSH_KEY
    SSH_KEY=${SSH_KEY:-~/.ssh/id_rsa}
    
    echo ""
    echo "Connecting to VPS: $VPS_USER@$VPS_HOST"
    echo ""
    
    # Copy files to VPS
    echo "📦 Copying configuration files..."
    scp -i "$SSH_KEY" docker-compose.storybook.yml "$VPS_USER@$VPS_HOST:~/apps/storybook/"
    scp -i "$SSH_KEY" nginx-storybook.conf "$VPS_USER@$VPS_HOST:~/apps/storybook/"
    
    # Run setup on VPS
    ssh -i "$SSH_KEY" "$VPS_USER@$VPS_HOST" 'bash -s' < "$0" remote
    exit 0
fi

# Running on VPS
echo "✅ Running on VPS"
echo ""

# Create directories
echo "📁 Creating directories..."
mkdir -p ~/apps/storybook/staging
mkdir -p ~/apps/storybook/production
echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# Check if Docker is installed
echo "🐳 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker is installed${NC}"
fi
echo ""

# Check if Docker Compose is installed
echo "🐳 Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose is installed${NC}"
fi
echo ""

# Check if Traefik network exists
echo "🌐 Checking Traefik network..."
if ! docker network ls | grep -q traefik-public; then
    echo "Creating traefik-public network..."
    docker network create traefik-public
    echo -e "${GREEN}✓ Network created${NC}"
else
    echo -e "${GREEN}✓ Network exists${NC}"
fi
echo ""

# Check if Traefik is running
echo "🔍 Checking Traefik installation..."
if ! docker ps | grep -q traefik; then
    echo -e "${YELLOW}⚠ Traefik is not running${NC}"
    echo ""
    echo "Traefik is required as a reverse proxy. Would you like to set it up?"
    read -p "Install Traefik? (y/n): " install_traefik
    
    if [ "$install_traefik" = "y" ]; then
        echo "Creating Traefik configuration..."
        mkdir -p ~/apps/traefik
        cd ~/apps/traefik
        
        # Create Traefik docker-compose.yml
        cat > docker-compose.yml <<'EOF'
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - traefik-public
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./letsencrypt:/letsencrypt
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.rule=Host(`traefik.colombiansupply.com`)"
      - "traefik.http.routers.traefik.entrypoints=websecure"
      - "traefik.http.routers.traefik.tls=true"
      - "traefik.http.routers.traefik.tls.certresolver=letsencrypt"
      - "traefik.http.routers.traefik.service=api@internal"

networks:
  traefik-public:
    external: true
EOF

        # Create Traefik configuration
        cat > traefik.yml <<'EOF'
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: traefik-public

certificatesResolvers:
  letsencrypt:
    acme:
      email: devops@colombiansupply.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
EOF

        mkdir -p letsencrypt
        touch letsencrypt/acme.json
        chmod 600 letsencrypt/acme.json
        
        echo "Starting Traefik..."
        docker-compose up -d
        
        echo -e "${GREEN}✓ Traefik installed and started${NC}"
    else
        echo -e "${YELLOW}⚠ Skipping Traefik installation. You'll need to configure your own reverse proxy.${NC}"
    fi
else
    echo -e "${GREEN}✓ Traefik is running${NC}"
fi
echo ""

# Start Storybook containers
echo "🚀 Starting Storybook containers..."
cd ~/apps/storybook

if [ -f docker-compose.storybook.yml ]; then
    docker-compose -f docker-compose.storybook.yml up -d
    echo -e "${GREEN}✓ Storybook containers started${NC}"
else
    echo -e "${YELLOW}⚠ docker-compose.storybook.yml not found${NC}"
    echo "Please copy the file from your repository to ~/apps/storybook/"
fi
echo ""

# Verify containers
echo "🔍 Verifying containers..."
docker ps | grep storybook || echo -e "${YELLOW}⚠ No storybook containers running${NC}"
echo ""

# Display summary
echo "=========================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "📋 Summary:"
echo "  - Directories created: ~/apps/storybook/staging, ~/apps/storybook/production"
echo "  - Docker and Docker Compose installed"
echo "  - Traefik network configured"
echo "  - Storybook containers started"
echo ""
echo "🌐 URLs (after DNS configuration):"
echo "  - Staging: https://storybook-stg.colombiansupply.com"
echo "  - Production: https://storybook.colombiansupply.com"
echo ""
echo "📝 Next Steps:"
echo "  1. Configure DNS records to point to this VPS"
echo "  2. Configure GitHub secrets (VPS_HOST, VPS_USER, VPS_SSH_KEY)"
echo "  3. Push to develop branch to trigger deployment"
echo "  4. Verify deployment at the URLs above"
echo ""
echo "🔧 Useful Commands:"
echo "  - View logs: docker-compose -f ~/apps/storybook/docker-compose.storybook.yml logs -f"
echo "  - Restart: docker-compose -f ~/apps/storybook/docker-compose.storybook.yml restart"
echo "  - Stop: docker-compose -f ~/apps/storybook/docker-compose.storybook.yml down"
echo ""

