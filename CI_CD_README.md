# Frontend CI/CD Configuration

Configuración de CI/CD para el frontend de Colombian Supply usando GitHub Actions.

## 📁 Estructura de Archivos

```
full-colombiano-frontend/
├── .github/
│   └── workflows/
│       ├── deploy-staging.yml      # Deploy automático a staging
│       └── deploy-production.yml   # Deploy manual a producción
├── Dockerfile                      # Build de la imagen Docker
├── docker-compose.staging.yml      # Compose para staging
├── docker-compose.production.yml   # Compose para producción
├── .env.staging.example            # Variables de entorno staging
└── CI_CD_README.md                 # Esta guía
```

## 🔄 Flujo de CI/CD

### Staging (Automático)

```
Push a 'develop' → GitHub Actions → Lint → Test → Build → Deploy a VPS Staging
```

**Trigger**: Push a branch `develop`

**Pasos**:
1. ✅ ESLint check
2. ✅ TypeScript type check
3. ✅ Run tests
4. 🏗️ Build Next.js app
5. 🐳 Build Docker image
6. 📦 Upload artifact
7. 🚀 Deploy to VPS staging
8. 🏥 Health check

**URL**: https://stg.colombiansupply.com

### Production (Manual)

```
Create tag v*.*.* → GitHub Actions → Lint → Test → Lighthouse → Build → Deploy a VPS Production
```

**Trigger**: 
- Push de tag `v*.*.*` (ej: `v1.0.0`)
- Manual workflow dispatch

**Pasos**:
1. ✅ ESLint check
2. ✅ TypeScript type check (strict)
3. ✅ Run tests with coverage
4. 🏗️ Build Next.js app (production)
5. 💡 Lighthouse performance check
6. 🐳 Build Docker image
7. 📦 Upload artifact
8. 🔄 Rolling update (zero downtime)
9. 🏥 Health check
10. 🧪 Smoke tests
11. ↩️ Rollback automático si falla

**URL**: https://colombiansupply.com

## 🔐 GitHub Secrets Requeridos

Configurar en: `Settings → Secrets and variables → Actions`

### Secrets de Infraestructura:
```
VPS_HOST              # IP del VPS (ej: 203.0.113.10)
VPS_USER              # Usuario SSH (ej: deploy)
VPS_SSH_KEY           # Private SSH key completa
VPS_PORT              # Puerto SSH (default: 22)
```

### Secrets de Staging:
```
STAGING_API_URL       # https://api-stg.colombiansupply.com
```

### Secrets de Production:
```
PROD_API_URL          # https://api.colombiansupply.com
GA_ID                 # (Opcional) Google Analytics ID
```

## 🚀 Cómo Hacer Deploy

### Deploy a Staging:

```bash
# Opción 1: Push a develop (automático)
git checkout develop
git add .
git commit -m "feat: nuevo componente"
git push origin develop

# GitHub Actions se ejecuta automáticamente
```

### Deploy a Production:

```bash
# Opción 1: Con tag (automático)
git checkout main
git merge develop
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main
git push origin v1.0.0

# Opción 2: Manual desde GitHub
# 1. Ir a Actions → Deploy to Production
# 2. Click "Run workflow"
# 3. Ingresar version: v1.0.0
# 4. Click "Run workflow"
```

## 📊 Monitorear Deployments

### Ver el progreso:

1. Ir a: https://github.com/Colombian-Suppliers/full-colombiano-frontend/actions
2. Click en el workflow en ejecución
3. Ver logs en tiempo real

### Ver logs en el VPS:

```bash
# Conectar al VPS
ssh -i ~/.ssh/colombian_vps_deploy deploy@TU_IP_VPS

# Logs staging
cd ~/apps/frontend
docker-compose -f docker-compose.staging.yml logs -f frontend

# Logs production
docker-compose -f docker-compose.production.yml logs -f frontend
```

## 🏥 Health Checks

Los workflows incluyen health checks automáticos:

```bash
# Staging
curl https://stg.colombiansupply.com

# Production
curl https://colombiansupply.com
```

## 🎨 Build Arguments

El Dockerfile acepta build arguments para configuración:

```dockerfile
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_SITE_URL
```

Estos se pasan durante el build:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.colombiansupply.com \
  --build-arg NEXT_PUBLIC_ENVIRONMENT=production \
  -t colombian-frontend:production .
```

## 🔧 Troubleshooting

### Workflow falla en "Run ESLint"

**Problema**: Errores de linting

**Solución**:
```bash
# Ejecutar ESLint localmente
npm run lint

# Auto-fix errores
npm run lint -- --fix

# Commit y push
git add .
git commit -m "fix: linting errors"
git push
```

### Workflow falla en "Run type check"

**Problema**: Errores de TypeScript

**Solución**:
```bash
# Ejecutar type check localmente
npx tsc --noEmit

# Corregir errores de tipos
# Commit y push de nuevo
```

### Workflow falla en "Build application"

**Problema**: Error al compilar Next.js

**Solución**:
```bash
# Build localmente
npm run build

# Ver errores específicos
# Corregir y volver a intentar

# Verificar que todas las env vars están configuradas
cat .env.local
```

### Workflow falla en "Lighthouse Performance Check"

**Problema**: Performance score bajo

**Solución**:
```bash
# Ejecutar Lighthouse localmente
npm install -g @lhci/cli
npm run build
lhci autorun

# Optimizar:
# - Reducir bundle size
# - Optimizar imágenes
# - Lazy load components
# - Enable caching
```

### Health check falla después del deploy

**Problema**: El sitio no responde

**Solución**:
```bash
# Ver logs del contenedor
ssh deploy@VPS
cd ~/apps/frontend
docker-compose -f docker-compose.production.yml logs frontend

# Verificar que el contenedor está corriendo
docker ps | grep frontend

# Probar health check manualmente
curl http://localhost:3000

# Si funciona local pero no con dominio, verificar Traefik
cd ~/apps/traefik
docker-compose logs traefik | grep frontend
```

## 🔄 Rollback

Para rollback manual:

```bash
# Conectar al VPS
ssh -i ~/.ssh/colombian_vps_deploy deploy@TU_IP_VPS
cd ~/apps/frontend

# Ver imágenes disponibles
docker images | grep colombian-frontend

# Editar docker-compose para usar imagen anterior
nano docker-compose.production.yml
# Cambiar tag de imagen

# Reiniciar
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d
```

## 📝 Mejores Prácticas

### 1. Siempre probar en staging primero

```bash
# Deploy a staging
git checkout develop
git push origin develop

# Verificar en staging
open https://stg.colombiansupply.com

# Probar funcionalidad manualmente
# Si todo bien, merge a main
git checkout main
git merge develop
git tag v1.0.1
git push origin main --tags
```

### 2. Optimizar performance

```bash
# Analizar bundle size
npm run build
npm run analyze  # Si tienes @next/bundle-analyzer

# Optimizar imágenes
# - Usar next/image
# - Formato WebP
# - Lazy loading

# Code splitting
# - Dynamic imports
# - Route-based splitting
```

### 3. Usar variables de entorno correctamente

```bash
# Variables públicas (expuestas al browser)
NEXT_PUBLIC_API_URL=https://api.colombiansupply.com

# Variables privadas (solo en server)
DATABASE_URL=postgresql://...
SECRET_KEY=...
```

### 4. Mantener dependencias actualizadas

```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar (con cuidado)
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix
```

### 5. Revisar logs después de cada deploy

```bash
# Inmediatamente después del deploy
ssh deploy@VPS
cd ~/apps/frontend
docker-compose -f docker-compose.production.yml logs --tail=100 frontend

# Buscar errores
docker-compose -f docker-compose.production.yml logs frontend | grep -i error
```

## 🎯 Performance Checklist

Antes de deploy a producción:

- [ ] Bundle size < 200KB (gzipped)
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Imágenes optimizadas (WebP)
- [ ] Code splitting implementado
- [ ] Lazy loading de componentes pesados
- [ ] Caching configurado
- [ ] Fonts optimizados

## 🔐 Security Checklist

- [ ] No secrets en código
- [ ] HTTPS habilitado
- [ ] Security headers configurados
- [ ] CORS configurado correctamente
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Input validation
- [ ] Dependencies sin vulnerabilidades

## 🎯 Próximos Pasos

- [ ] Agregar tests E2E (Playwright/Cypress)
- [ ] Configurar Sentry para error tracking
- [ ] Implementar A/B testing
- [ ] Setup analytics (Google Analytics/Mixpanel)
- [ ] Configurar CDN (Cloudflare)
- [ ] Implementar PWA features
- [ ] Setup monitoring (Vercel Analytics)

## 📚 Referencias

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)

## 🚀 Quick Commands

```bash
# Desarrollo local
npm install
npm run dev

# Build local
npm run build
npm start

# Linting
npm run lint
npm run lint -- --fix

# Type check
npx tsc --noEmit

# Tests
npm test
npm test -- --coverage

# Docker local
docker build -t frontend:local .
docker run -p 3000:3000 frontend:local
```

---

**¿Preguntas?** Contactar al equipo de DevOps o abrir un issue en GitHub.

