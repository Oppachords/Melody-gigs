# Deploying MelodyGigs on Cloudflare + Neon

## Architecture

| Service | Role |
|---------|------|
| **Cloudflare Pages** | Hosts the Next.js app |
| **Neon** | PostgreSQL database (create at [neon.tech](https://neon.tech)) |
| **Google Cloud** | OAuth login |
| **UploadThing** | Profile image uploads |
| **Pandora Systems** | Payments (escrow, subscriptions) |
| **Google AdSense** | Ads (optional) |

Cloudflare does **not** host PostgreSQL. Create the database on Neon, then connect it via `DATABASE_URL`.

---

## Step 1 — Create Neon Database

1. Go to [console.neon.tech](https://console.neon.tech) and sign up.
2. **New Project** → name it `melodygigs` → choose a region close to your users.
3. Open **Dashboard → Connection Details**.
4. Copy the **Pooled connection** string (best for Cloudflare/serverless).
5. Paste it into `.env` as `DATABASE_URL`.

Example:
```
postgresql://neondb_owner:xxxx@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Apply schema (run locally once)

With `DATABASE_URL` set in `.env`:

```bash
npm run db:push    # creates all tables
npm run db:seed    # seeds categories, FAQs, testimonials
```

---

## Step 2 — Configure `.env` (local)

Your `.env` file is already templated. Replace each `REPLACE_ME`:

| Variable | How to get it |
|----------|---------------|
| `DATABASE_URL` | Neon → Connection Details → **Pooled connection** |
| `AUTH_SECRET` | Already generated. Regenerate: `openssl rand -base64 32` |
| `AUTH_URL` | Local: `http://localhost:3000` / Prod: `https://your-domain.com` |
| `AUTH_GOOGLE_ID` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Same OAuth client → Client secret |
| `UPLOADTHING_TOKEN` | [uploadthing.com](https://uploadthing.com) → App → API Keys |
| `UPLOADTHING_APP_ID` | UploadThing app dashboard |
| `PANDORA_API_KEY` | Pandora Systems merchant dashboard |
| `PANDORA_API_SECRET` | Pandora Systems merchant dashboard |
| `PANDORA_WEBHOOK_SECRET` | Pandora webhook settings |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` | [AdSense](https://www.google.com/adsense) → Account → Client ID |
| `NEXT_PUBLIC_APP_URL` | Your public URL (same as `AUTH_URL`) |

Test locally:
```bash
npm run dev
```

---

## Step 3 — Google OAuth Setup

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. **Create Credentials → OAuth client ID → Web application**.
3. Add **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://your-domain.com`
   - `https://melody-gigs.pages.dev` (Cloudflare preview URL)
4. Add **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`
   - `https://melody-gigs.pages.dev/api/auth/callback/google`
5. Copy Client ID → `AUTH_GOOGLE_ID`, Client Secret → `AUTH_GOOGLE_SECRET`.

---

## Step 4 — Cloudflare Pages Environment Variables

In **Cloudflare Dashboard → Workers & Pages → your project → Settings → Environment variables**, add **every** variable from `.env.example` for **Production** (and Preview if you want preview deploys to work):

```
DATABASE_URL
AUTH_SECRET
AUTH_URL
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
UPLOADTHING_TOKEN
UPLOADTHING_APP_ID
PANDORA_API_KEY
PANDORA_API_SECRET
PANDORA_WEBHOOK_SECRET
PANDORA_API_URL
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_APP_NAME
PLATFORM_COMMISSION_RATE
```

**Important for production:**
- Set `AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your live domain, e.g. `https://melodygigs.com`
- Use the same values in Google OAuth redirect URIs

---

## Step 5 — Cloudflare Pages Build Settings

| Setting | Value |
|---------|-------|
| Framework preset | Next.js |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| Node.js version | 20+ |

`npm run build` runs OpenNext and produces the `.open-next/` bundle that Wrangler deploys. Use `npm run build:next` only if you need a standard Next.js build (e.g. Vercel).

Connect your GitHub repo: `Oppachords/Melody-gigs` → branch `main`.

### Worker size limit (important)

Next.js + Prisma + Auth produces a Worker bundle of ~**3.8 MiB** (gzipped). Cloudflare **free** Workers allow **3 MiB** max. **Paid** Workers ($5/mo) allow **10 MiB**.

If deploy fails with `code: 10027` (size limit):

1. **Recommended:** Upgrade to [Cloudflare Workers Paid](https://developers.cloudflare.com/workers/platform/pricing/) (~$5/mo) — your bundle fits within the 10 MiB limit.
2. **Alternative:** Deploy on **Vercel** instead (connect the same GitHub repo + Neon `DATABASE_URL`). Vercel has no Worker size limit for Next.js.

---

## Step 6 — Pandora Webhook

After deploy, register this webhook URL in Pandora Systems:

```
https://your-domain.com/api/payments/webhook
```

Use the same `PANDORA_WEBHOOK_SECRET` in both Pandora dashboard and your env vars.

---

## Step 7 — UploadThing

1. Create app at [uploadthing.com](https://uploadthing.com).
2. Allowed origins: add your Cloudflare domain.
3. Copy token to `UPLOADTHING_TOKEN`.

---

## Cloudflare compatibility note

This app uses **Prisma + PostgreSQL (`pg` driver)** and **NextAuth with database sessions**. For Cloudflare Pages:

- Use Neon’s **pooled connection string** (not direct/unpooled).
- If you hit runtime errors on Cloudflare Workers, consider:
  - **Cloudflare Hyperdrive** pointing to Neon, or
  - Hosting on **Vercel** (recommended in original spec) with the same Neon database.

---

## Quick checklist

- [ ] Neon project created, `DATABASE_URL` set
- [ ] `npm run db:push && npm run db:seed` run successfully
- [ ] Google OAuth client created with correct redirect URIs
- [ ] UploadThing app created
- [ ] Pandora API keys obtained
- [ ] All env vars added to Cloudflare Pages dashboard
- [ ] `AUTH_URL` and `NEXT_PUBLIC_APP_URL` match live domain
- [ ] Site deployed and Google sign-in tested
