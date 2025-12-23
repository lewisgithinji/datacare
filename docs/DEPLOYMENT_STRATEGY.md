# Deployment Strategy for Datacare Website

## Overview

This document explains how development work is isolated from production, ensuring that ongoing feature development never accidentally affects the live website at datacare.co.ke.

---

## Production Deployment

### Current Setup

- **Live URL**: https://datacare.co.ke
- **Hosting**: Cloudflare Pages
- **Production Branch**: `main`
- **Auto-deploy**: Enabled (any push to `main` triggers production deployment)

### Environment Variables

Production environment variables are configured in **Cloudflare Pages Dashboard**:

**Required:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase public/anonymous key

**Optional:**
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service identifier
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template identifier  
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public API key

> [!IMPORTANT]
> Environment variables are **NOT** stored in Git. The `.env` file is gitignored and used only for local development.

---

## Development Workflow

### Branch Strategy

```
main (production)
  └── feature/your-feature (development)
  └── feature/another-feature (development)
  └── fix/bug-fix (development)
```

**Rules:**
1. `main` branch = production (always deployable)
2. All development happens on feature branches
3. Features are merged to `main` only when ready for production

### Step-by-Step Workflow

#### 1. Start New Feature

```bash
# Switch to main and update
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/lg/feature-name
```

**Branch naming convention:**
- `feature/initials/description` - New features
- `fix/initials/description` - Bug fixes
- `refactor/initials/description` - Code refactoring
- `docs/initials/description` - Documentation updates

#### 2. Develop and Test Locally

```bash
# Make changes to code
code .

# Test locally
npm run dev

# Commit regularly
git add .
git commit -m "feat: Add feature description"
```

#### 3. Push to GitHub

```bash
# Push feature branch
git push -u origin feature/lg/feature-name
```

**What happens:**
- Cloudflare Pages creates a **preview deployment**
- Preview URL: `https://[unique-id].datacare.pages.dev`
- Production remains **unchanged**

#### 4. Review and Test Preview

- Open preview URL
- Test all changes
- Share with team for feedback
- Make adjustments if needed

#### 5. Deploy to Production

When ready for production:

```bash
# Option A: Merge via Pull Request (Recommended)
# 1. Create PR on GitHub
# 2. Get review/approval
# 3. Merge PR to main

# Option B: Direct merge (for trusted developers)
git checkout main
git merge feature/lg/feature-name
git push origin main
```

**What happens:**
- Cloudflare Pages automatically deploys `main` to production
- Changes go live at https://datacare.co.ke
- Previous preview deployments remain available

---

## How Production is Protected

### 1. Branch Isolation

✅ **Feature branches create isolated preview environments**
- Each feature branch gets its own preview URL
- Changes are visible only on preview URL
- Production remains unaffected

❌ **Feature branches never trigger production deploys**
- Only merges to `main` affect production
- No accidental deployments

### 2. Environment Separation

| Environment | Branch | URL | Env Vars Loaded From |
|-------------|--------|-----|----------------------|
| Local Dev | Any | localhost:8080 | `.env` file |
| Preview | Feature branches | `*.pages.dev` | Cloudflare Preview vars |
| Production | `main` | datacare.co.ke | Cloudflare Production vars |

### 3. Deployment Gates

**Recommended setup on GitHub:**

1. **Branch Protection Rules**
   - Settings → Branches → Add rule
   - Branch: `main`
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require review from code owners

2. **Required Status Checks**
   - Linting must pass
   - Build must succeed
   - Tests must pass

---

## Common Scenarios

### Scenario 1: Working on a New Feature

**Goal**: Add new contact form without affecting production

```bash
# Create feature branch
git checkout -b feature/lg/contact-form

# Develop and test locally
npm run dev

# Push to get preview
git push -u origin feature/lg/contact-form

# Test preview: https://abc123.datacare.pages.dev
# Production unchanged: https://datacare.co.ke

# When ready, create PR and merge to main
# Only then does it affect production
```

### Scenario 2: Multiple Developers Working Simultaneously

**Goal**: Lewis works on contact form, another dev works on analytics

```bash
# Lewis
git checkout -b feature/lg/contact-form
# Preview: https://contact-abc.pages.dev

# Other developer
git checkout -b feature/jd/analytics-dashboard  
# Preview: https://analytics-xyz.pages.dev

# Both can work independently
# Production remains stable: https://datacare.co.ke
```

### Scenario 3: Emergency Production Fix

**Goal**: Fix critical bug on live site immediately

```bash
# Create fix branch from main
git checkout main
git pull origin main
git checkout -b fix/lg/critical-bug

# Make fix and test
# Push for quick preview
git push -u origin fix/lg/critical-bug

# If fix works, merge immediately
git checkout main
git merge fix/lg/critical-bug
git push origin main

# Production updates within 1-2 minutes
```

---

## Cloudflare Pages Configuration

### Accessing Settings

1. Cloudflare Dashboard → Workers & Pages
2. Select **datacare** project
3. Settings tab → Environment variables

### Production Variables

Set in **Production** environment:

```
VITE_SUPABASE_URL=https://akffppqsrwveplnbeisx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Preview Variables (Recommended)

Set in **Preview** environment (same as production):

```
VITE_SUPABASE_URL=https://akffppqsrwveplnbeisx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> [!TIP]
> Preview environment can use the same Supabase project as production since RLS policies protect data.

---

## Deployment Checklist

Before merging to `main`:

- [ ] Code reviewed by at least one other developer
- [ ] Linting passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Feature tested on preview deployment
- [ ] No console errors in browser
- [ ] Mobile responsive design verified
- [ ] No breaking changes to existing features

---

## Rollback Procedure

If a production deployment causes issues:

### Option 1: Cloudflare Pages Rollback (Fastest)

1. Cloudflare Pages → Deployments tab
2. Find previous working deployment
3. Click **⋮** menu → **Rollback to this deployment**
4. Production reverts in ~1 minute

### Option 2: Git Revert

```bash
# Revert the problematic commit
git revert <commit-hash>
git push origin main

# Cloudflare redeploys automatically
```

### Option 3: Force Deploy Previous Commit

```bash
# Reset to previous good commit
git checkout main
git reset --hard <good-commit-hash>
git push --force origin main
```

---

## Monitoring and Logs

### Check Deployment Status

- Cloudflare Pages → Deployments tab
- See build logs for each deployment
- Check for build errors or warnings

### Production Errors

- Browser Console (F12) for client-side errors
- Cloudflare Pages → Analytics for traffic and errors
- Supabase Dashboard → Logs for database/auth errors

---

## Best Practices

### Do ✅

- Always create feature branches for new work
- Test on preview deployments before merging
- Keep `main` branch always deployable
- Use meaningful commit messages
- Pull latest `main` before creating feature branches

### Don't ❌

- Don't commit directly to `main` (except small docs changes)
- Don't store secrets in `.env` and commit them
- Don't merge untested code to `main`
- Don't push broken builds to `main`
- Don't skip code review for significant changes

---

## Quick Reference

### Common Commands

```bash
# Start new feature
git checkout main && git pull origin main
git checkout -b feature/lg/my-feature

# Save and push work
git add -A
git commit -m "feat: Description"
git push -u origin feature/lg/my-feature

# Update feature with latest main
git checkout feature/lg/my-feature
git merge main

# Deploy to production (after PR approval)
git checkout main
git merge feature/lg/my-feature
git push origin main
```

### Useful Links

- **Production**: https://datacare.co.ke
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **GitHub Repository**: https://github.com/lewisgithinji/datacare
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## Summary

Your production website is protected by:

1. **Branch isolation** - Feature work happens on separate branches
2. **Preview deployments** - Test before going live
3. **Environment separation** - Different configs for dev/preview/production
4. **Manual merge control** - Deliberate decision to deploy to production

**The key principle**: Only changes merged to `main` affect production. Everything else is isolated.
