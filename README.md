<div align="center">

<img src="src/assets/logo.png" alt="Aura Digital" width="220" />

### Digital transformation · AI · Creative technology

*We don't just design. We build intelligent digital solutions — where strategy, technology and creativity meet.*

<br />

![React](https://img.shields.io/badge/React-18-0C0A12?style=flat-square&logo=react&logoColor=DCCFFF)
![Vite](https://img.shields.io/badge/Vite-5-0C0A12?style=flat-square&logo=vite&logoColor=DCCFFF)
![React Router](https://img.shields.io/badge/React_Router-6-0C0A12?style=flat-square&logo=reactrouter&logoColor=DCCFFF)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-0C0A12?style=flat-square&logo=vercel&logoColor=DCCFFF)
![License](https://img.shields.io/badge/status-private-0C0A12?style=flat-square)

</div>

<br />

Aura Digital is a boutique creative studio working where **software engineering, artificial intelligence and design** meet — based in Valencia, working worldwide. This repository is the studio's own website: an editorial, motion-driven single-page experience built to feel like couture, not a template.

This README documents the codebase — architecture, design system, local setup and deployment — for whoever picks this project up next (very possibly, future you).

<br />

## ✦ Table of contents

- [What's inside](#-whats-inside)
- [Tech stack](#-tech-stack)
- [Getting started](#-getting-started)
- [The Discovery Call system](#-the-discovery-call-system)
- [The Manager area](#-the-manager-area)
- [Environment variables](#-environment-variables)
- [Deployment](#-deployment)
- [Project structure](#-project-structure)
- [Design system](#-design-system)
- [Studio](#-studio)

<br />

## ✦ What's inside

A single-page marketing site (`/`) plus a secondary experimental space (`/labs`), sharing one design system:

| Section | What it does |
|---|---|
| **Hero** | Animated headline, particle field, entrance choreography |
| **About / Philosophy** | The studio's positioning and principles |
| **Services** | The three pillars — transformation, experiences, creative intelligence |
| **Featured + Pricing** | The Digital Launch package, full package grid, à la carte menu, EUR/USD toggle |
| **Work** | Real case studies — a live embedded site, a before/after slider, a product mock |
| **Why Aura / Testimonials** | Differentiation grid and real client quotes |
| **Founder** | The person behind the studio |
| **Labs portal → `/labs`** | A darker, more technical satellite site for experiments beyond the brief |
| **FAQ** | Accordion of the questions that come up before a project starts |
| **Discovery Call** | A guided, in-site multi-step form replacing a generic "contact us" — see below |

Every piece of copy, pricing figure and link lives in [`src/data/site.js`](src/data/site.js) and [`src/data/discovery.js`](src/data/discovery.js) — content is never hardcoded inside components.

<br />

## ✦ Tech stack

- **[React 18](https://react.dev)** + **[Vite 5](https://vitejs.dev)** — no framework ceremony, just fast DX
- **[React Router 6](https://reactrouter.com)** — client-side routing between the studio and Labs
- **Vanilla CSS** with design tokens (`src/styles/global.css`) — no CSS framework, every rule is intentional
- **[Vercel Serverless Functions](https://vercel.com/docs/functions)** (`/api`) — the only custom backend code, zero servers to manage
- **[Resend](https://resend.com)** — transactional email for Discovery Call submissions
- **[Supabase](https://supabase.com)** (Postgres + Auth) — powers the Manager area and stores Discovery Call submissions
- Zero UI/animation libraries — reveal-on-scroll, the custom cursor, the aura glow and the before/after slider are all hand-rolled

<br />

## ✦ Getting started

```bash
npm install
npm run dev       # starts Vite on localhost
```

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

The Discovery Call form posts to `/api/discovery`, which only exists once deployed to Vercel (or run locally via `vercel dev` — see below). On plain `vite dev` the request will fail gracefully into the form's own error state, which is expected.

<br />

## ✦ The Discovery Call system

Instead of linking out to a generic form tool, "Book a discovery call" opens a full-screen, in-brand guided experience:

```
Intro → About you → Your business → The project → Timeline & budget → Review → Submit → Success
```

- Lives entirely in [`src/components/discovery/`](src/components/discovery/), orchestrated by [`DiscoveryCallContext`](src/context/DiscoveryCallContext.jsx) so any CTA on the site can open it
- Client-side validation, focus trap, `Esc` to close, answers preserved when navigating back or reopening
- Submits to [`api/discovery.js`](api/discovery.js) — a Vercel function that validates the payload, filters spam with a honeypot + timing trap, and emails a formatted, on-brand summary via Resend
- No secrets ever touch the client — the Resend key and destination inbox live only in the deployment's environment variables

<br />

## ✦ The Manager area

`/manager` is a password-protected area for editing the site's content and browsing Discovery Call submissions — no code changes or redeploys needed. It's a thin layer on top of **Supabase**: Supabase Auth handles login, Row Level Security decides who can write, and the browser talks to Supabase directly (`@supabase/supabase-js`) rather than through a custom API.

**What's editable**: Services, Pricing, Selected Work, Testimonials, FAQ, and the Labs archive (Experiments + Lab Notes). Long-form prose (hero, about, philosophy, founder bio, footer) is intentionally left static — it changes rarely and doesn't fit a list/form editor cleanly.

**How it reaches the public site**: each public section (`Services.jsx`, `Pricing.jsx`, etc.) reads its content with [`useContentSection`](src/hooks/useContentSection.js), which fetches from the `site_content` table and falls back to the static `src/data/*.js` export if Supabase is unreachable or a section has never been saved yet. That static export also acts as the seed — the first time a Manager editor opens a section with no row yet, the form is pre-filled from it, and hitting **Save** creates the row.

### One-time setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor** → run:

   ```sql
   create table site_content (
     section text primary key,
     data jsonb not null,
     updated_at timestamptz not null default now()
   );

   create table discovery_submissions (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     name text, email text, business text, location text, website text,
     description text, stage text, stage_other text, audience text,
     services jsonb, services_other text, goal text, materials text,
     timeline text, budget text, notes text
   );

   alter table site_content enable row level security;
   alter table discovery_submissions enable row level security;

   create policy "public read" on site_content for select using (true);
   create policy "auth write" on site_content for all
     using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
   create policy "auth read submissions" on discovery_submissions for select
     using (auth.role() = 'authenticated');
   -- discovery_submissions has no insert policy for anon/authenticated —
   -- rows are only ever written by api/discovery.js using the service role
   -- key, which bypasses RLS entirely.
   ```

3. **Authentication → Users** → add one user (your email + a password you choose). That's the only Manager login.
4. **Settings → API** → copy the Project URL, the `anon`/publishable key, and the `service_role`/secret key.
5. Set the three Supabase env vars below in Vercel (and `.env.local` locally), then sign in at `/manager/login`.

<br />

## ✦ Environment variables

Copy [`.env.example`](.env.example) to `.env.local` for local `vercel dev`, and set the same keys in the Vercel project's **Settings → Environment Variables**.

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✦ | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `TO_EMAIL` | ✦ | Inbox that receives Discovery Call submissions |
| `FROM_EMAIL` | — | Sender address. Defaults to Resend's shared test sender; point it at a verified domain once you have one |
| `VITE_SUPABASE_URL` | ✦ | Project URL from Supabase → Settings → API. Bundled into the client — that's expected |
| `VITE_SUPABASE_ANON_KEY` | ✦ | Anon/publishable key from the same page. Also public by design; RLS is the actual gate |
| `SUPABASE_SERVICE_ROLE_KEY` | ✦ | Secret. Server-only, used by `api/discovery.js` to store submissions. Never prefix with `VITE_` |

<br />

## ✦ Deployment

The site is built for **Vercel** — the static build and the `/api` function deploy together with zero configuration.

1. Connect this repository in the [Vercel dashboard](https://vercel.com/new), or run `vercel` from the project root
2. Add the environment variables above under **Settings → Environment Variables**
3. Create a [Resend](https://resend.com) account and generate an API key
4. Deploy — `vercel.json` already handles the SPA rewrite so client-side routes (like `/labs`) work on refresh
5. Test the Discovery Call end-to-end once live to confirm the email arrives

<br />

## ✦ Project structure

```
├── api/
│   └── discovery.js            # Serverless function → Resend + Supabase insert
├── public/
│   ├── favicon.svg              # Sparkle mark (primary favicon)
│   └── favicon.png              # Full wordmark (apple-touch-icon)
├── src/
│   ├── assets/                  # Images (founder, work, avatars, logo)
│   ├── components/
│   │   ├── home/                # One component per homepage section
│   │   ├── labs/                # The Labs satellite site
│   │   ├── discovery/           # The Discovery Call experience
│   │   ├── manager/              # /manager section editors (one per content type)
│   │   └── shared/               # Header, footer, cursor, loader, rich text
│   ├── context/                  # DiscoveryCallContext, ManagerAuthContext
│   ├── data/                     # site.js + discovery.js — copy & seed/fallback content
│   ├── hooks/                     # useReveal, useSmoothScroll, useContentSection
│   ├── lib/                       # supabase.js — the browser Supabase client
│   ├── pages/                     # Home.jsx, Labs.jsx, Manager.jsx
│   ├── styles/                    # global.css, labs.css, discovery.css, manager.css
│   └── utils/                     # links.js — external-link handling
├── vercel.json
└── .env.example
```

<br />

## ✦ Design system

Nothing here is a component library — it's tokens (`:root` in `global.css`) that every section pulls from, so new work reads as part of the same studio, not a bolt-on.

**Palette**

![#0C0A12](https://placehold.co/14x14/0C0A12/0C0A12.png) `--obsidian` `#0C0A12` — primary dark
![#F3F1F8](https://placehold.co/14x14/F3F1F8/F3F1F8.png) `--porcelain` `#F3F1F8` — primary light
![#DCCFFF](https://placehold.co/14x14/DCCFFF/DCCFFF.png) `--aura` `#DCCFFF` — accent, dark-mode
![#7A6BD6](https://placehold.co/14x14/7A6BD6/7A6BD6.png) `--iris` `#7A6BD6` — accent, light-mode
![#4A3E86](https://placehold.co/14x14/4A3E86/4A3E86.png) `--iris-deep` `#4A3E86` — gradients, shadows

**Type**

| Role | Typeface |
|---|---|
| Display / headlines | `Bodoni Moda` — editorial serif, italic for emphasis |
| Body / UI | `Instrument Sans` |
| Labels / mono accents | `JetBrains Mono` — always uppercase, wide letter-spacing |

**Motion** — `cubic-bezier(.22,1,.36,1)` for entrances, IntersectionObserver-driven `.reveal` fades, a cursor-reactive `#aura` glow, and everything gets a static fallback under `prefers-reduced-motion`.

<br />

## ✦ Studio

Built by **[Emanuelle Soares](https://www.linkedin.com/in/emanuelle-soares-54b661382/)** — Founder & Digital Strategist, Aura Digital.
Valencia, Spain · Working worldwide.

<br />

<div align="center">

*Strategy, craft and aura.*

</div>
