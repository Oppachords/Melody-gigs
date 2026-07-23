# Deploy MelodyGigs on Vercel

MelodyGigs is built for Vercel: Next.js App Router, Neon PostgreSQL, and Vercel Blob for profile photos.

## Prerequisites

| Service | Purpose |
|---------|---------|
| **GitHub** | Source repo |
| **Vercel** | Hosting |
| **Neon** | PostgreSQL (via Vercel integration or standalone) |
| **Google Cloud** | OAuth login |
| **Vercel Blob** | Profile image storage |

## Step 1 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import `Oppachords/Melody-gigs` from GitHub.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` (default).
5. Deploy once (it may fail until env vars are set — that's OK).

## Step 2 — Neon Database

**Option A — Vercel integration (recommended)**

1. Vercel project → **Storage** → **Connect Store** → **Neon**.
2. Create or link a database; Vercel injects `DATABASE_URL` automatically.

**Option B — Manual**

1. Create a project at [console.neon.tech](https://console.neon.tech).
2. Copy the **pooled** connection string.
3. Add as `DATABASE_URL` in Vercel → Settings → Environment Variables.

After first deploy with `DATABASE_URL` set, push schema from your machine:

```bash
npm run db:push
npm run db:seed   # optional demo data
```

Or run migrations in CI / a one-off Vercel build hook if you prefer.

## Step 3 — Environment Variables

Add these in **Vercel → Project → Settings → Environment Variables** (Production, Preview, Development):

| Variable | Notes |
|----------|-------|
| `DATABASE_URL` | Neon pooled URL (auto if using integration) |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | `https://your-domain.com` (no trailing slash) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `ADMIN_EMAIL` | Email auto-promoted to admin on sign-in (default: `kallylcolyns@gmail.com`) |
| `BLOB_READ_WRITE_TOKEN` | Auto-injected when Blob store is connected (Step 4) |
| `NEXT_PUBLIC_APP_URL` | Same as production URL |
| `NEXT_PUBLIC_APP_NAME` | `MelodyGigs` |
| `PANDORA_*` | Payment gateway (when ready) |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` | AdSense (when ready) |

## Step 4 — Vercel Blob (profile photos)

1. Vercel project → **Storage** → **Create Database** → **Blob**.
2. Name it (e.g. `melody-gigs-blob`) and **Connect to Project**.
3. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically — no manual copy needed on production.

**Local development:** copy the token from Storage → your Blob store → `.env`:

```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

Uploads go to `/api/upload/profile` and are stored at paths like `profiles/{userId}/...` on Vercel Blob. Users manage photos at:

- `/dashboard/client/settings`
- `/dashboard/creator/settings`

## Step 5 — Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → OAuth 2.0 Client ID → Web application.
2. **Authorized redirect URIs:**
   - `https://your-domain.com/api/auth/callback/google`
   - `https://your-app.vercel.app/api/auth/callback/google` (Vercel preview URL)
   - `http://localhost:3000/api/auth/callback/google` (local)
3. Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in Vercel.

## Step 6 — Redeploy

After all variables are set:

1. **Deployments** → latest deployment → **Redeploy**.
2. Visit your site and sign in with Google.
3. Open **Settings** in the client or creator dashboard and upload a profile photo.

## Custom Domain

1. Vercel → **Settings** → **Domains** → add your domain.
2. Update `AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the custom domain.
3. Add the custom domain redirect URI in Google OAuth.
4. Redeploy.

## Checklist

- [ ] Repo imported on Vercel
- [ ] Neon connected (`DATABASE_URL`)
- [ ] Schema pushed (`npm run db:push`)
- [ ] `AUTH_SECRET`, `AUTH_URL`, Google OAuth configured
- [ ] Vercel Blob store connected (`BLOB_READ_WRITE_TOKEN`)
- [ ] Production redeployed
- [ ] Profile photo upload tested in Settings

## Removed: Cloudflare / OpenNext

This project previously targeted Cloudflare Workers via OpenNext. That setup has been removed. Use standard Vercel deployment only.
