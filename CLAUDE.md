# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Budget Buddy is a personal finance management web app built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and PostgreSQL via Prisma. Authentication uses NextAuth v4 with GitHub and Google OAuth providers.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` (runs `prisma generate && next build && prisma db push`) |
| Start prod | `npm start` |
| Lint | `npm run lint` (ESLint with next/core-web-vitals) |
| Generate Prisma client | `npx prisma generate` |
| Push schema to DB | `npx prisma db push` |
| Create migration | `npx prisma migrate dev --name <name>` |
| Prisma Studio | `npx prisma studio` |

## Architecture

### Routing & URL Rewrites

Protected pages live under `/app/protected/` but are served at `/p/*` via a URL rewrite in `next.config.mjs` (`/p/:path*` → `/protected/:path*`). All navigation links use the `/p/` prefix.

### Authentication Flow

- NextAuth v4 configured in `/app/utils/authOptions.ts` (GitHub + Google providers)
- `SessionProvider` wrapper in root layout (`/app/layout.tsx`)
- Server components check auth via `getServerSession(authOptions)`; client components use `useSession()`
- Protected routes (`/p/income`, `/p/expenses`, `/p/savings`, `/p/settings`) redirect to sign-in if unauthenticated

### Data Layer — Dual Approach

The project has **two coexisting database access patterns**:
1. **Raw SQL via `@vercel/postgres`** — used in `/app/api/database/` API routes (legacy approach)
2. **Prisma ORM** — schema defined in `/prisma/schema.prisma`, singleton client in `/lib/prisma.ts`

Models: `User`, `Income`, `Expense` — Income and Expense share nearly identical schemas (type, date, source, amount, currency, category, notes).

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

### Environment Variables

- `GITHUB_ID`, `GITHUB_SECRET` — GitHub OAuth
- `GOOGLE_ID`, `GOOGLE_SECRET` — Google OAuth
- `POSTGRES_PRISMA_URL` — DB connection (pooled)
- `POSTGRES_URL_NON_POOLING` — DB connection (direct)

### Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).
