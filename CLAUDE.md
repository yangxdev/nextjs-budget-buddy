# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Budget Buddy is a personal finance management web app built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and MongoDB (native driver). Authentication uses NextAuth v4 with GitHub and Google OAuth providers. Local development runs via Docker Compose (Next.js + MongoDB).

## Commands

| Task | Command |
|------|---------|
| Full local stack | `docker compose up` (Next.js + MongoDB) |
| Stop local stack | `docker compose down` |
| Rebuild containers | `docker compose up --build` |
| Dev server (no Docker) | `yarn dev` (port 3000, requires MongoDB on localhost:27017) |
| Build | `yarn build` |
| Start prod | `yarn start` |
| Lint | `yarn lint` (`next lint` — deprecated in Next 15, future migration to ESLint CLI) |
| MongoDB Compass | Connect to `mongodb://localhost:27017` |

## Architecture

### Routing & URL Rewrites

Protected pages live under `/app/protected/` but are served at `/p/*` via a URL rewrite in `next.config.mjs` (`/p/:path*` → `/protected/:path*`). All navigation links use the `/p/` prefix.

### Authentication Flow

- NextAuth v4 configured in `/app/utils/authOptions.ts` (GitHub + Google providers)
- `SessionProvider` wrapper in root layout (`/app/layout.tsx`)
- Server components check auth via `getServerSession(authOptions)` — **always pass `authOptions`**, omitting it returns `null`
- Client components use `useSession()`
- Protected routes (`/p/income`, `/p/expenses`, `/p/savings`, `/p/settings`) redirect to sign-in if unauthenticated

### Next.js 15 Async APIs

`cookies()`, `headers()`, and `params` are **async** in Next.js 15. Always `await` them before accessing values:

```ts
const cookieStore = await cookies();
cookieStore.get("key");
```

### Data Layer — MongoDB

MongoDB via the native `mongodb` driver. Client singleton in `/lib/mongodb.ts` (cached on `globalThis` in dev to survive hot-reloads). Database: `budget_buddy`.

Collections: `users`, `incomes`, `expenses` — Income and Expense share nearly identical document shapes (type, date, source, amount, currency, category, notes, userId).

- **Reads**: Server components import helper functions from `get_expenses/expenses.ts` and `get_incomes/incomes.ts` which query MongoDB directly
- **Writes**: Client components POST to `/api/database/add_expense` and `/api/database/add_income` API routes
- **Indexes**: `{ userId: 1, date: -1 }` on incomes/expenses, unique `{ email: 1 }` on users (created by `mongo-init/init.js`)

### Middleware

`/middleware.ts` runs on `/p/income` and `/p/expenses` routes — fetches daily currency exchange rates from exchangerate-api.com and caches them in cookies.

### Global Configuration

`/app/app.config.js` is the central config hub containing:
- Supported currencies (30+, base: EUR)
- Income categories (11) and expense categories (36)
- i18n translations (English, Italian) with time-based greetings
- Debug flags

### Component Patterns

- Server components are the default; client components are explicitly marked with `'use client'`
- Chart components exist in Server/Client pairs (e.g., `ExpenseInfoChartDoughnutServer.tsx` fetches data, `ExpenseInfoChartDoughnutClient.tsx` renders Chart.js)
- Skeleton components in `/app/components/skeletons/` for loading states

### Key Directories

- `/app/protected/` — Feature pages (expenses, income, savings, settings) with co-located components
- `/app/components/` — Shared components (NavMenu, dashboard widgets, skeletons)
- `/app/api/database/` — REST API routes for CRUD operations
- `/app/charts/` — Dashboard-level chart components (vertical bar, line, flow)
- `/app/_styles/styles.js` — Layout constants (sidebar width, padding)
- `/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Styling

Tailwind CSS with dark mode (selector-based toggle), custom theme colors (accent greens/reds), and plugins (scrollbar, scrollbar-hide, animate). Local font: Avenir Book.

### ESLint

ESLint 9 with flat config (`eslint.config.mjs`). Uses `@eslint/eslintrc` FlatCompat to bridge the `next/core-web-vitals` config. The old `.eslintrc.json` has been removed.

### Environment Variables

See `.env.example` for the full list. Key variables:

- `NEXTAUTH_SECRET` — **required** for NextAuth JWT signing
- `NEXTAUTH_URL` — set to `http://localhost:3000` for local dev (auto-detected on Vercel)
- `GITHUB_ID`, `GITHUB_SECRET` — GitHub OAuth
- `GOOGLE_ID`, `GOOGLE_SECRET` — Google OAuth
- `MONGODB_URI` — MongoDB connection string (`mongodb://localhost:27017/budget_buddy` for local dev)

### Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).
