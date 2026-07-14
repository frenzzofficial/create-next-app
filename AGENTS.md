<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Operating Manual — create-next-app

This file is the single source of truth for any agent (Claude Code, Cursor,
Copilot, or a human) working in this repository. `CLAUDE.md` imports this
file directly (`@AGENTS.md`) rather than duplicating it — edit this file,
not that one.

## What this project is

An opinionated, enterprise-grade Next.js starter template (App Router).
The goal is a codebase that reads the same whether it was written by
Vivek or by an agent six months from now — consistent conventions over
clever one-offs. It ships as a `create-next-app`-style template, not an
application with business logic of its own.

## Read this first: the stage docs

The architecture isn't ad-hoc — it's built out in ten staged guides under
`src/docs/dev/`, each one a deliverable with an explicit checklist:

| Stage | File | Status |
|---|---|---|
| 1 | `01-project-initialization.md` | ✅ Done |
| 2 | `02-professional-development-environment.md` | ✅ Done |
| 3 | `03-enterprise-architecture.md` | ✅ Done — canonical folder-structure reference |
| 4 | `04-design-system-guide.md` | ✅ Done |
| 5 | `05-design-implementation-guide.md` | ✅ Done |
| 6 | `06-reusable-ui-guide.md` | ✅ Done |
| 7 | `07-icons-guide.md` | ✅ Done |
| 8 | `08-project-env-setup.md` | ✅ Done |
| 9 | `09-shadcn-design-guide.md` | ⬜ Not started — no `components/ui/shadcn` yet |
| 10 | `10-api-layer-guide.md` | ◐ Partially pulled forward — `errors.ts` + `asyncHandler.ts` exist; the shared `apiClient` with interceptors described in this stage does not |

**Before touching a folder this table covers, read that stage's doc first.**
It documents *why* the structure is what it is, not just what it is — the
"why" is usually the difference between a good change and a plausible-looking
one that breaks a documented convention.

## Non-negotiable conventions

- **TypeScript strict mode.** `type` over `interface`. Never `any` — use
  `unknown` and narrow it.
- **Arrow function components.** No `function Component() {}`.
- **`@/*` path aliases only** (`@/packages/...`, `@/components/...`,
  `@/types/...`) — configured in `tsconfig.json`. Never a deep relative
  import (`../../../foo`).
- **Zod is the only validation layer.** Form/input rules live in
  `packages/configs/schema.config.ts` (the shared field-rule primitives)
  and get composed in `packages/schemas/*.schema.ts`. Don't hand-roll a
  regex or a length check somewhere else.
- **No raw `process.env` outside `packages/env`.** Every environment
  variable is read once, through a Zod schema, in `client.env.ts`,
  `app.env.ts`, or `auth.env.ts` — see Stage 8. If you need a new env var,
  add it to the relevant schema, not to a `process.env.X` call site.
  Client-readable vars **must** be prefixed `NEXT_PUBLIC_` or Next.js
  won't inline them into the browser bundle (this exact bug shipped once
  already — see "Landmines" below).
- **`asyncHandler` + `AppError` for anything that can fail.** Wrap service
  calls in `asyncHandler(promise)` (`packages/utils/asyncHandler.ts`) and
  destructure `[error, data]` — don't `try/catch` at the call site.
  Anything thrown gets normalized to `AppError` via `toAppError`
  (`packages/utils/errors.ts`).
- **Icons go through the registry.** `LucideIcon`
  (`components/ui/images/LucideIcon.tsx`) — never
  `import { X } from "lucide-react"` directly in a feature component. See
  Stage 7, and the barrel-export landmine below before adding it anywhere.
- **Biome, not ESLint/Prettier.** Suppression comments are
  `// biome-ignore lint/<rule>: <reason>` on the line directly above the
  flagged one — an `eslint-disable` comment is silently ignored here.
- **Bun is the package manager and runtime.** `bun install`, `bun run dev`,
  etc. `bun.lock` is the real lockfile; don't commit a `package-lock.json`
  or `yarn.lock`.

## Commands

```bash
bun install        # install deps
bun run dev         # dev server (Turbopack)
bun run build        # production build
bun run verify       # lint + format + check + typecheck — run before any PR
```

## Known landmines (found the hard way — don't reintroduce these)

- **Never wrap a token in `hsl()`.** Every color custom property in
  `globals.css` is a full OKLCH value (`--primary: oklch(0.59 0.11 216)`).
  `hsl(var(--primary))` is invalid CSS — the browser silently drops the
  declaration, no console error. Always `var(--x)` directly, or
  `color-mix(in oklch, var(--x) N%, transparent)` for an alpha-blended
  variant (see `input.css` or `button.css` for the pattern).
- **`server-only` modules can't be re-exported from a barrel a Client
  Component also imports from.** `components/ui/index.ts` deliberately
  does NOT export `LucideIcon` or `NavigationLogo` — both transitively
  import `server-only` (directly, and via `appConfig` → `app.env.ts`,
  respectively), and `app/error.tsx` / `app/dev/design-system/page.tsx`
  are Client Components that import from that same barrel. Adding either
  export back in breaks the build for every consumer of the barrel, not
  just the one that needed the server-only piece. Import them by their
  direct path from a Server Component instead.
- **`packages/store` and `packages/services` are flat files today**
  (`app.store.ts`, `auth.services.ts`), not the `context/reducers/slices`
  or `api/auth/storage` subfolder structure Stage 3's doc describes.
  That's a known, not-yet-resolved gap — don't "fix" it by moving files
  without checking every import site first.
- **`InputFactory` supports 5 of the 11 types Stage 6 documents**
  (text, email, password, checkbox, select — missing number, textarea,
  radio, switch, date, search). Extend it there; don't build a parallel
  input component.
- **Header/Footer are placeholder stubs**, not real navigation. Don't
  assume they're wired to `navigation.config.ts` yet — they aren't.
