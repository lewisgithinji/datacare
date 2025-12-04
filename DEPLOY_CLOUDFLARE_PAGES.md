# Deploying to Cloudflare Pages

This project is a Vite + React app. Below are concrete steps and recommended settings to deploy it to Cloudflare Pages.

Required build settings
- **Build command**: `npm run build`
- **Build output directory**: `dist`

- Environment variables (set these in Pages > Project > Settings > Environment variables or in GitHub Secrets / Environments)
- **`VITE_SUPABASE_URL`**: your Supabase project URL (e.g. `https://xyz.supabase.co`)
- **`VITE_SUPABASE_ANON_KEY`**: the Supabase anon (publishable) key
- **`VITE_EMAILJS_SERVICE_ID`**: EmailJS service id (optional; contact form falls back to `mailto:` if missing)
- **`VITE_EMAILJS_TEMPLATE_ID`**: EmailJS template id (optional)
- **`VITE_EMAILJS_PUBLIC_KEY`**: EmailJS public key (optional)

Notes on secrets and safety
- The `VITE_` prefix exposes values to client-side code; do not store server-only secrets (e.g. Supabase `service_role` key) here.
- Supabase anon key is intended for client usage; keep the service_role key out of the frontend.

Routing / SPA fallback
- This repo includes `public/_redirects` with `/* /index.html 200` which provides an SPA fallback. Cloudflare Pages supports Netlify-style `_redirects` and `_headers` placed in the `public/` folder. If you prefer, you can instead configure a Pages Route that sends all requests to `index.html`.

Headers / Security
- `public/_headers` is present with a Content-Security-Policy and other security headers. Cloudflare Pages will copy these headers during deploy. Verify they match any external CDNs or endpoints you use (fonts, EmailJS, Supabase).

Other repo items to be aware of
- `supabase/` directory contains local Supabase configuration and functions for the Supabase project — these are separate from Cloudflare Pages and must be deployed to Supabase (if used).
- The app uses `localStorage` for Supabase auth persistence which works in browser-based Pages deployments.

Recommended Cloudflare Pages workflow

CI + Deploy (recommended)

1. Connect the `datacare` repository to Cloudflare Pages.
2. Use the framework preset `Vite` or set the build command and output directory as above.
3. Add the environment variables in the Pages dashboard (for Pages-managed builds) _or_ store them in GitHub Secrets and/or GitHub Environments for builds triggered by GitHub Actions.
4. Leave the default Node version unless you need a specific one—set `ENGINES` in `package.json` or `NODE_VERSION` in Pages if necessary.

GitHub Actions

I added an example GitHub Actions workflow at `.github/workflows/deploy-cloudflare-pages.yml` that:
- Runs lint and tests on PRs and pushes.
- Builds and deploys on `main` branch pushes.
- Uses `actions/cache` to speed up installs.
- Deploys using `cloudflare/pages-action@v1` and performs a small smoke test (if `CLOUDFLARE_PAGES_URL` is set).

Secrets and GitHub Environment (recommended)

Add the following secrets to your GitHub repository (or to a `production` GitHub Environment for stronger protection):
- `CLOUDFLARE_API_TOKEN` — API token limited to Pages deployments (grant `Pages:Deployments` only).
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID.
- `CLOUDFLARE_PAGES_PROJECT` — the Pages project name/slug.
- `CLOUDFLARE_PAGES_URL` — the deployed Pages URL (used by the smoke test), e.g. `https://your-pages-domain.pages.dev`.
- `VITE_SUPABASE_URL` — Supabase URL (public)
- `VITE_SUPABASE_ANON_KEY` — Supabase anon key (public)
- `VITE_EMAILJS_SERVICE_ID` — EmailJS service id (optional)
- `VITE_EMAILJS_TEMPLATE_ID` — EmailJS template id (optional)
- `VITE_EMAILJS_PUBLIC_KEY` — EmailJS public key (optional)

How to create a least-privilege Cloudflare API token

1. In the Cloudflare dashboard, go to **My Profile → API Tokens → Create Token**.
2. Use the **Edit Cloudflare Pages** template or create a custom token with only the `Pages:Edit`/`Pages:Deployments` permission for the specific account.
3. Optionally scope the token to only the Pages project.
4. Save the token into the GitHub secret `CLOUDFLARE_API_TOKEN`.

Using GitHub Environments

- Create a `production` environment in the repo (Settings → Environments → New environment).
- Attach the production-only secrets to that environment (e.g., `CLOUDFLARE_API_TOKEN`, `VITE_SUPABASE_...`).
- Configure required reviewers or wait timers if desired—this enforces approvals before GitHub Actions can deploy to production.

Notes on building in CI vs Pages dashboard

- If you build using GitHub Actions (the workflow provided), the `VITE_` variables must be available to the runner at build time (via repository secrets or environment secrets attached to the GitHub Environment).
- If you prefer Pages-managed builds, configure the environment variables in the Pages dashboard and let Pages build on push. Both approaches are valid; CI gives more control, caching, and test gates.

Pages Preview Environment Variables + Runbook
------------------------------------------

This section shows the recommended preview env vars (used by Cloudflare Pages preview builds for PRs) and step-by-step runbook to configure previews and production safely.

Preview environment variables (set these in the Pages project dashboard → Settings → Environment variables → Preview)
- `VITE_SUPABASE_URL` — your Supabase URL (e.g. `https://xyz.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` — Supabase anon (publishable) key
- `VITE_EMAILJS_SERVICE_ID` — EmailJS service id (optional)
- `VITE_EMAILJS_TEMPLATE_ID` — EmailJS template id (optional)
- `VITE_EMAILJS_PUBLIC_KEY` — EmailJS public key (optional)

Why set these in Pages (preview) instead of GitHub Actions:
- Cloudflare Pages preview builds can run for PRs (including forks) without exposing repository secrets to untrusted workflows.
- Preview builds give a unique shareable URL for each PR, improving QA and review.

Runbook — Configure Pages previews and secure production deploys

1) Create Pages project (if not already connected)
	- In Cloudflare dashboard → Pages, connect the `datacare` repository.
	- Set the build command: `npm run build` and the output directory: `dist` (or choose the Vite preset).

2) Add Preview env vars in Pages
	- In the Pages project, open **Settings → Environment variables**.
	- Choose the **Preview** environment and add the `VITE_` variables listed above.
	- Save. Create a test PR to confirm the preview build shows correctly.

3) Create least-privilege Cloudflare API token for production deploys
	- In Cloudflare dashboard → Profile → API Tokens → Create Token.
	- Use the **Edit Cloudflare Pages** template or create a custom token with **Pages:Deployments (Edit)** permission scoped to the account or project only.
	- Save the token value securely (you will add it to GitHub Secrets).

4) Configure GitHub production secrets & Environment
	- In GitHub, create a `production` Environment in the repository (Settings → Environments → New environment).
	- Add these secrets to the `production` Environment (not repo-level) to increase protection:
	  - `CLOUDFLARE_API_TOKEN`
	  - `CLOUDFLARE_ACCOUNT_ID`
	  - `CLOUDFLARE_PAGES_PROJECT`
	  - `CLOUDFLARE_PAGES_URL` (optional, used by smoke test)
	  - `VITE_SUPABASE_URL` (production value)
	  - `VITE_SUPABASE_ANON_KEY` (production value)
	  - `VITE_EMAILJS_SERVICE_ID` (optional)
	  - `VITE_EMAILJS_TEMPLATE_ID` (optional)
	  - `VITE_EMAILJS_PUBLIC_KEY` (optional)
	- Optionally require one or more reviewers/approvals on the `production` Environment to gate production deploys.

5) Confirm GitHub Actions workflow is using `environment: production` for the deploy job (already added to `.github/workflows/deploy-cloudflare-pages.yml`).

6) Configure branch protection for `main`
	- In GitHub repository Settings → Branches, protect `main` and require passing status checks (lint/tests) and PR reviews before merging.

7) Test the workflow
	- Create a PR — verify Cloudflare Pages preview appears and is healthy.
	- Merge to `main` — GitHub Actions should run, build using `production` secrets, and deploy via the Cloudflare Pages API token.

8) Smoke test and rollback plan
	- After deploy, the GH Action runs a smoke test against `CLOUDFLARE_PAGES_URL` (if set). If smoke test fails, investigate logs in Pages and GH Actions.
	- To rollback: use Cloudflare Pages UI to redeploy a previous successful deployment or revert the Git commit and re-deploy.

CLI and quick checks (PowerShell)
---------------------------------
Build locally and test preview-like environment variables locally:
```powershell
npm ci
$env:VITE_SUPABASE_URL = 'https://xyz.supabase.co'
$env:VITE_SUPABASE_ANON_KEY = 'public-anon-key'
npm run build
npm run preview
```

Quick smoke-test example (replace URL):
```powershell
curl.exe -I https://your-pages-domain.pages.dev/
```

If you'd like, I can: create a short script to populate the Pages preview env var names (a checklist), or add a GitHub Actions job that posts the preview URL as a PR comment automatically. Tell me which of those you'd like next.

Troubleshooting
- If client-side authentication with Supabase fails, confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values are correct.
- If SPA routes 404, ensure the `_redirects` file is included in the built `dist` or add a Pages Route for `/*` to `index.html`.

Useful Cloudflare Docs
- Pages deployment settings: https://developers.cloudflare.com/pages
- Redirects and headers: check the Pages docs for `_redirects` and `_headers` handling

If you'd like, I can also create a sample `cloudflare-pages` build config or add a `pages` entry in `package.json` to document the settings programmatically.
