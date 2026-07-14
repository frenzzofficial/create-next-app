# create-next-app

A top 1% Next.js template for building modern, enterprise-grade web apps —
opinionated, fully typed, and built to read the same regardless of who
(or what) wrote a given file.

## Stack

Fixed, not à la carte — this template intentionally doesn't support
swapping these out:

- **[Next.js](https://nextjs.org)** (App Router) + **React** — `next@16`, `react@19`
- **TypeScript** — strict mode, no `any`
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first config, OKLCH design tokens
- **[Zod](https://zod.dev)** — the only validation layer, client and server
- **[Bun](https://bun.sh)** — package manager and script runner
- **[Biome](https://biomejs.dev)** — linting and formatting (no ESLint/Prettier)
- **[shadcn/ui](https://ui.shadcn.com)** — generated components (Stage 9, not yet integrated)
- **Axios**, **React Hook Form**, **Zustand**, **next-themes**, **lucide-react**, **class-variance-authority**

## Getting started

```bash
bun install
cp .env.example .env.local   # then fill in real values — JWT_SECRET especially
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Start the dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Biome lint |
| `bun run format` | Biome format (writes) |
| `bun run check` | Biome lint + format check |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run verify` | All of the above, in sequence — run before opening a PR |

A pre-commit hook (`husky` + `lint-staged`) runs `biome check --write` on
staged files automatically.

## Project structure

```text
src/
├── app/                 # App Router routes, layouts, route groups
│   ├── (auth)/(protected)/(public)/   # route groups — layouts only so far
│   ├── api/              # route handlers (currently just /api/health)
│   ├── blogs/             # example content route
│   └── dev/               # internal design-system/typography preview pages
├── assets/               # fonts, icons, images, logos, svg (source files)
├── components/
│   ├── features/           # feature-specific components (home/, more as features land)
│   ├── layouts/            # Header, Footer, AppClientLayout, Theme
│   ├── providers/           # ThemeProvider
│   └── ui/                # buttons/, inputs/, links/, svg/, images/, shadcn/ (Stage 9)
├── docs/dev/              # the 10-stage architecture guides — read these first
├── packages/
│   ├── configs/            # app/theme/navigation/role/schema constants
│   ├── env/                # Zod-validated env modules — the only place process.env is read
│   ├── hooks/              # useDebounce, useLocalStorage, useBreakpoints, etc.
│   ├── metadata/            # SEO / Open Graph / Twitter card builders
│   ├── schemas/             # Zod schemas (auth, user, common)
│   ├── services/            # network calls (auth.services.ts so far)
│   ├── store/              # Zustand store(s)
│   └── utils/              # cn, asyncHandler, errors (AppError), date, format, etc.
├── styles/                # globals.css (tokens), typography.css, ui/*.css, animation.css
└── types/                 # ambient/shared TypeScript types (app, api, auth, navigation, globals)
```

## Documentation

The architecture is built out in ten staged guides under `src/docs/dev/`,
each with its own checklist. Current status:

1. ✅ Project initialization
2. ✅ Professional development environment
3. ✅ Enterprise architecture — **the canonical folder-structure reference**
4. ✅ Design system guide
5. ✅ Design implementation guide
6. ✅ Reusable UI guide
7. ✅ Icons guide
8. ✅ Project & env setup
9. ⬜ shadcn/ui integration — not started
10. ◐ API layer guide — `errors.ts`/`asyncHandler.ts` exist; the shared `apiClient` + interceptors described in this stage don't yet

See [`AGENTS.md`](./AGENTS.md) for the full conventions checklist (TypeScript
rules, path aliases, the env/schema/service/store patterns) and a list of
known gotchas worth reading before you touch CSS tokens, the `components/ui`
barrel export, or `packages/env`.

## Environment variables

See [`.env.example`](./.env.example) for the full list, grouped by which
Zod schema validates them (`client.env.ts`, `app.env.ts`, `auth.env.ts`,
`user.env.ts`). Client-readable variables must be prefixed `NEXT_PUBLIC_`;
everything else is server-only.

## License

[CC0 1.0 Universal](./LICENSE) — public domain. Use it for anything.
