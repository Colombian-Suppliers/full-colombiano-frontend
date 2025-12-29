# Storybook Deployment Guide

## 📚 Overview

This guide covers the deployment of Storybook to your VPS for client review and team collaboration. Storybook is deployed as a static site served by Nginx with automatic SSL certificates via Traefik.

## 🌐 URLs

- **Staging**: https://storybook-stg.colombiansupply.com
- **Production**: https://storybook.colombiansupply.com

## 🎯 Purpose

Storybook serves as an interactive component library and design system documentation that allows:

1. **Client Review**: Clients can review UI components and user flows before full integration
2. **Design System**: Single source of truth for all UI components
3. **Development**: Developers can build and test components in isolation
4. **QA**: QA team can verify component behavior and edge cases
5. **Documentation**: Auto-generated documentation for all components

## 📋 User Stories Coverage

Based on your GitHub project (147 user stories across 8 sprints), the following components are documented in Storybook:

### Sprint 1: Fundamentos + Auth (US-001 to US-012, US-020, US-060, US-140)
- ✅ Login page (`app/(auth)/login/Login.stories.tsx`)
- ✅ Registration flow (`components/auth/RegisterFlow.stories.tsx`)
- ✅ Password reset (`app/(auth)/reset-password/ResetPassword.stories.tsx`)
- ✅ Forgot password (`app/(auth)/forgot-password/ForgotPassword.stories.tsx`)
- ✅ Account type selector (`components/auth/shared/AccountTypeSelector.stories.tsx`)
- ✅ Buyer registration steps (Step1, Step2, Step3)
- ✅ Seller registration flows (Natural & Jurídica)

### Sprint 2: Vendedores + Catálogo (US-003, US-016-018, US-021-023, US-025, US-027-028, US-030-032, US-144)
- ✅ Store info cards (StoreHero, StoreInfoCard, StoreSettingsCard)
- ✅ Verification status (`components/store/VerificationStatusCard.stories.tsx`)
- ✅ Document upload (`components/store/DocumentCard.stories.tsx`)
- ✅ Company info (`components/store/CompanyInfoCard.stories.tsx`)
- ✅ Personal info (`components/store/PersonalInfoCard.stories.tsx`)
- ✅ Product forms (`components/products/ProductForm.stories.tsx`)
- ✅ Variations manager (`components/products/VariationsManager.stories.tsx`)

### Sprint 3: Tienda + Carrito (US-004, US-005, US-013, US-019, US-024, US-026, US-029, US-034, US-061-062, US-141, US-145)
- ✅ Landing page components (Hero, Header, Footer, Benefits, FAQ)
- ✅ Categories carousel (`components/landing/CategoriesCarousel/CategoriesCarousel.stories.tsx`)
- ✅ Search bar (`components/ui/SearchBar/SearchBar.stories.tsx`)
- ✅ Filter chips (`components/ui/FilterChips/FilterChips.stories.tsx`)
- ✅ Sort filter (`components/ui/SortFilter/SortFilter.stories.tsx`)

### Sprint 6: Admin + Testing (US-033, US-035-039, US-047, US-070, US-103-106, US-142-143, US-160, US-180-182)
- ✅ Dashboard metrics (`components/dashboard/DashboardMetrics.stories.tsx`)
- ✅ Analytics components (`components/dashboard/AnalyticsComponents.stories.tsx`)
- ✅ Chart components (`components/dashboard/ChartComponents.stories.tsx`)
- ✅ Announcements system (List, Header, Filters, Detail, Actions)

### UI Components Library (All Sprints)
- ✅ 24 reusable UI components (Button, Input, Modal, Card, etc.)
- ✅ Form components (FormField, PasswordInput, FileInput, AddressField)
- ✅ Data visualization (Charts, Metrics, Stats)
- ✅ Feedback components (Spinner, NetworkStatusIndicator)

## 🚀 Deployment Process

### Automatic Deployment

**Staging**: Automatically deploys on push to `develop` branch
```bash
git checkout develop
git add .
git commit -m "feat: update component stories"
git push origin develop
```

**Production**: Automatically deploys on push to `main` branch
```bash
git checkout main
git merge develop
git push origin main
```

### Manual Deployment

You can manually trigger deployment via GitHub Actions:

1. Go to: https://github.com/Colombian-Suppliers/full-colombiano-frontend/actions
2. Select "Deploy Storybook" workflow
3. Click "Run workflow"
4. Choose environment (staging/production)
5. Click "Run workflow"

## 🔧 VPS Setup

### Prerequisites

1. VPS with Docker and Docker Compose installed
2. Traefik reverse proxy running
3. DNS records configured:
   - `storybook-stg.colombiansupply.com` → VPS IP
   - `storybook.colombiansupply.com` → VPS IP

### Initial Setup on VPS

```bash
# SSH into your VPS
ssh deploy@your-vps-ip

# Create directories
mkdir -p ~/apps/storybook/staging
mkdir -p ~/apps/storybook/production

# Clone or copy docker-compose.storybook.yml and nginx-storybook.conf
cd ~/apps/storybook

# Start containers
docker-compose -f docker-compose.storybook.yml up -d

# Verify containers are running
docker ps | grep storybook

# Check logs
docker-compose -f docker-compose.storybook.yml logs -f
```

### Traefik Configuration

Ensure your Traefik instance has the following configuration:

```yaml
# traefik.yml or docker-compose.yml
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: devops@colombiansupply.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
```

## 🔐 GitHub Secrets Configuration

Configure these secrets in your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

```
VPS_HOST              # Your VPS IP address (e.g., 203.0.113.10)
VPS_USER              # SSH username (e.g., deploy)
VPS_SSH_KEY           # Complete private SSH key
VPS_PORT              # SSH port (default: 22)
```

### Generating SSH Key for Deployment

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/colombian_deploy

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/colombian_deploy.pub deploy@your-vps-ip

# Copy private key content for GitHub secret
cat ~/.ssh/colombian_deploy
# Copy the entire output including BEGIN and END lines
```

## 📊 Monitoring and Maintenance

### Check Deployment Status

```bash
# View GitHub Actions logs
# Go to: https://github.com/Colombian-Suppliers/full-colombiano-frontend/actions

# Check VPS containers
ssh deploy@your-vps-ip
docker ps | grep storybook
docker-compose -f ~/apps/storybook/docker-compose.storybook.yml logs -f
```

### Health Checks

```bash
# Staging
curl https://storybook-stg.colombiansupply.com/health

# Production
curl https://storybook.colombiansupply.com/health
```

### Update Storybook

Storybook is automatically updated on every push to `develop` (staging) or `main` (production). No manual intervention needed.

### Rollback

If you need to rollback to a previous version:

```bash
# SSH to VPS
ssh deploy@your-vps-ip
cd ~/apps/storybook

# Production has automatic backup
if [ -d production_backup ]; then
  rm -rf production
  mv production_backup production
  docker-compose -f docker-compose.storybook.yml restart storybook-production
fi
```

## 🎨 Adding New Stories

### 1. Create Component Story

```tsx
// src/components/YourComponent/YourComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your props
  },
};

export const Variant: Story = {
  args: {
    // variant props
  },
};
```

### 2. Organize Stories by User Story

Use the `title` field to organize stories by sprint/epic:

```tsx
// Sprint 1 - Authentication
title: 'Sprint 1 - Auth/Login'
title: 'Sprint 1 - Auth/Register'

// Sprint 2 - Sellers
title: 'Sprint 2 - Sellers/Store Setup'
title: 'Sprint 2 - Sellers/Products'

// Sprint 3 - Catalog
title: 'Sprint 3 - Catalog/Product List'
title: 'Sprint 3 - Catalog/Cart'
```

### 3. Add Documentation

Use MDX to add comprehensive documentation:

```tsx
parameters: {
  docs: {
    description: {
      component: 'This component implements US-XXX: [User Story Title]',
    },
  },
},
```

### 4. Test Locally

```bash
# Run Storybook locally
npm run storybook

# Build to verify it compiles
npm run build-storybook
```

### 5. Deploy

```bash
git add .
git commit -m "feat: add story for US-XXX"
git push origin develop  # Auto-deploys to staging
```

## 🤝 Client Review Process

### Sharing with Clients

1. **Send staging link**: https://storybook-stg.colombiansupply.com
2. **Guide them through stories**: Organized by Sprint/Epic
3. **Collect feedback**: Use GitHub issues or your project management tool
4. **Iterate**: Update stories based on feedback
5. **Approve**: Once approved, merge to production

### Best Practices for Client Review

- **Use realistic data**: Show components with actual content, not Lorem Ipsum
- **Show all states**: Loading, error, empty, success states
- **Mobile responsive**: Ensure all stories work on mobile
- **Add context**: Use MDX documentation to explain the user story
- **Interactive**: Use Storybook controls to let clients interact with components

## 🔒 Security

### Optional: Add Basic Auth to Production

To protect production Storybook with password:

```bash
# Generate password hash
htpasswd -nb admin your-password

# Update docker-compose.storybook.yml
# Uncomment the basicauth lines and add the hash
```

### Access Control

- **Staging**: Open for team and client review
- **Production**: Consider adding basic auth or IP whitelist for sensitive projects

## 📈 Performance

### Build Optimization

The Storybook build is optimized for:
- **Gzip compression**: Enabled in Nginx
- **Static asset caching**: 1 year cache for JS/CSS/images
- **CDN-ready**: Can be deployed to CDN if needed

### Monitoring

- **Build time**: ~2-3 minutes for full build
- **Deploy time**: ~30 seconds to VPS
- **Page load**: < 2 seconds on fast connection

## 🐛 Troubleshooting

### Build Fails

```bash
# Check for missing exports
npm run build-storybook

# Common issues:
# - Missing component exports in index.ts
# - Invalid story syntax
# - TypeScript errors
```

### Deployment Fails

```bash
# Check GitHub Actions logs
# Common issues:
# - SSH key not configured
# - VPS not accessible
# - Directory permissions

# Test SSH connection
ssh -i ~/.ssh/colombian_deploy deploy@your-vps-ip
```

### Storybook Not Loading

```bash
# Check Nginx logs
ssh deploy@your-vps-ip
docker logs colombian-storybook-staging
docker logs colombian-storybook-production

# Check Traefik logs
docker logs traefik
```

### SSL Certificate Issues

```bash
# Check Traefik certificate resolver
docker logs traefik | grep letsencrypt

# Verify DNS records
dig storybook-stg.colombiansupply.com
dig storybook.colombiansupply.com
```

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
- [MDX Documentation](https://storybook.js.org/docs/react/writing-docs/mdx)

## 🎯 Next Steps

1. ✅ Storybook upgraded to v10
2. ✅ CI/CD pipeline configured
3. ✅ VPS deployment setup
4. ⏳ Add stories for remaining user stories (Sprint 4-8)
5. ⏳ Add MDX documentation for each epic
6. ⏳ Configure basic auth for production (optional)
7. ⏳ Set up analytics to track client engagement

---

**Questions?** Contact the development team or open an issue in GitHub.

