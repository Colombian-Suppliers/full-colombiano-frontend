# Storybook Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Configure GitHub Secrets

Go to: `https://github.com/Colombian-Suppliers/full-colombiano-frontend/settings/secrets/actions`

Add these secrets:
```
VPS_HOST        = your-vps-ip-address
VPS_USER        = deploy
VPS_SSH_KEY     = (paste your private SSH key)
VPS_PORT        = 22
```

### 2. Setup VPS

```bash
# Copy setup script to VPS
scp scripts/setup-storybook-vps.sh deploy@your-vps-ip:~/

# SSH to VPS and run setup
ssh deploy@your-vps-ip
bash setup-storybook-vps.sh
```

### 3. Configure DNS

Add these DNS records:
```
storybook-stg.colombiansupply.com  →  A  →  your-vps-ip
storybook.colombiansupply.com      →  A  →  your-vps-ip
```

### 4. Deploy

```bash
# Deploy to staging
git checkout main
git add .
git commit -m "feat: setup storybook deployment"
git push origin main
```

Wait 2-3 minutes, then visit:
- **Staging**: https://storybook-stg.colombiansupply.com
- **Production**: https://storybook.colombiansupply.com

## 📝 Daily Workflow

### Adding New Stories

```bash
# 1. Create your component story
# src/components/YourComponent/YourComponent.stories.tsx

# 2. Test locally
npm run storybook

# 3. Commit and push
git add .
git commit -m "feat: add story for US-XXX"
git push origin main

# 4. Auto-deploys in 2-3 minutes
```

### Sharing with Clients

1. Send link: https://storybook.colombiansupply.com
2. Guide them to relevant stories
3. Collect feedback
4. Iterate

## 🔧 Common Commands

```bash
# Run Storybook locally
npm run storybook

# Build Storybook
npm run build-storybook

# Check VPS status
ssh deploy@your-vps-ip
docker ps | grep storybook

# View logs
docker-compose -f ~/apps/storybook/docker-compose.storybook.yml logs -f

# Restart containers
docker-compose -f ~/apps/storybook/docker-compose.storybook.yml restart
```

## 🐛 Troubleshooting

### Build fails
```bash
npm run build-storybook
# Fix any errors shown
```

### Deployment fails
- Check GitHub Actions logs
- Verify SSH key is correct
- Test SSH connection: `ssh deploy@your-vps-ip`

### Site not loading
```bash
# Check containers
ssh deploy@your-vps-ip
docker ps | grep storybook

# Check logs
docker logs colombian-storybook-production
```

## 📚 Full Documentation

See [STORYBOOK_DEPLOYMENT.md](./STORYBOOK_DEPLOYMENT.md) for complete documentation.

## ✅ Checklist

- [ ] GitHub secrets configured
- [ ] VPS setup complete
- [ ] DNS records added
- [ ] First deployment successful
- [ ] Staging URL accessible
- [ ] Production URL accessible
- [ ] Team has access
- [ ] Client has been shown demo

---

**Need help?** Check the full documentation or contact the dev team.

