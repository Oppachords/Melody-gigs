# MelodyGigs

A modern, premium freelance marketplace where music professionals, creative artists, and clients connect to collaborate on projects, gigs, performances, productions, and digital creative work.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **Animation:** Framer Motion
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Auth:** NextAuth v5 (Google OAuth only)
- **File Uploads:** UploadThing (profile images)
- **Payments:** Pandora Systems
- **Deployment:** Vercel

## Features

- Google OAuth authentication (no passwords)
- Client & Creator user roles with dedicated dashboards
- Creator advertisements with portfolio embedding (YouTube, Spotify, SoundCloud, etc.)
- Gig posting and applications
- Direct hiring with real-time messaging
- Escrow payment workflow with 5% platform commission
- Work agreement contracts
- Reviews and ratings
- Subscription plans (Free, Pro $30/yr, Unlimited $50/yr)
- Advanced search with filters
- Admin panel for platform management
- SEO optimized with Schema.org, sitemap, robots.txt
- Google AdSense integration
- Dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (recommend [Neon](https://neon.tech))
- Google OAuth credentials
- UploadThing account
- Pandora Systems API keys

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Oppachords/Melody-gigs.git
cd Melody-gigs
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file with:
   - `DATABASE_URL` — Neon PostgreSQL connection string
   - `AUTH_SECRET` — Generate with `openssl rand -base64 32`
   - `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth credentials
   - `UPLOADTHING_TOKEN` — UploadThing API token
   - `PANDORA_API_KEY` / `PANDORA_API_SECRET` — Pandora Systems keys
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` — Google AdSense client ID

5. Push database schema and seed:

```bash
npm run db:push
npm run db:seed
```

6. Start development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/               # API endpoints (auth, payments, uploadthing)
│   ├── dashboard/         # Client, Creator, Admin dashboards
│   ├── search/            # Creator search
│   ├── gigs/              # Gig browsing
│   └── ...
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Dashboard nav
│   ├── landing/           # Homepage sections
│   ├── cards/             # Creator & Ad cards
│   ├── media/             # Media embed components
│   └── ads/               # Google AdSense components
├── lib/                   # Utilities, auth, db, payments
prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Seed data
public/
├── logo.svg               # Brand logo
├── logo.png
└── ads.txt                # Google AdSense declaration
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.example`
4. Connect Neon PostgreSQL as `DATABASE_URL`
5. Deploy

## License

Private — All rights reserved.
