# Stage 6 — Reusable UI Components

## Overview

This is a rulebook, not a build sequence. It governs how anyone — human or AI agent — decides between reusing, extending, or creating a UI component once the library exists. Read it after [07-icons-guide.md](./07-icons-guide.md) and [09-shadcn-design-guide.md](./09-shadcn-design-guide.md), since it assumes `LucideIcon` and `components/ui/shadcn` already exist.

These components are core infrastructure, shared across every feature. **Do not recreate them.**

## Priority Order

```text
Use the existing component
        ↓
Extend it — props, variants, composition
        ↓
Create a new component — last resort
```

A new component is justified only when no existing component, and no reasonable extension of one, satisfies the requirement.

## ⚠️ Structure Note

This stage's paths use **plural** UI subfolders (`buttons/`, `inputs/`) plus two folders that don't exist yet — `links/` and `svg/`/`images/` — none of which appear in [03-enterprise-architecture.md](./03-enterprise-architecture.md), which uses singular names (`button/`, `input/`) and only `button`, `input`, and `shadcn` under `components/ui`.

This needs a decision before it's final:

- **Adopt this stage's structure** — update Stage 3's tree to add `components/ui/{buttons,inputs,links,svg,images}` and rename `button/` → `buttons/`, `input/` → `inputs/`.
- **Keep Stage 3 as the source of truth** — rewrite the paths below to `ui/button/Button.tsx`, `ui/input/InputFactory.tsx`, and fold `Link`, `IconSVG`, and `LucideIcon` into the existing `button`/`input` folders (or another agreed location) instead of new top-level ones.

Neither is wrong — but the two docs currently disagree, and picking one keeps the architecture a contract instead of a suggestion. The paths below are written as originally authored (plural), pending that call.

## Component Systems

| System       | Location                     | Import as                       |
| ------------ | ---------------------------- | ------------------------------- |
| Button       | `ui/buttons/Button.tsx`      | `<Button />`                    |
| Input        | `ui/inputs/InputFactory.tsx` | `<InputFactory />`              |
| Link         | `ui/links/Link.tsx`          | `<Link />`                      |
| Custom SVG   | `ui/svg/IconSVG.tsx`         | `<IconSVG />`                   |
| Lucide icons | `ui/images/LucideIcon.tsx`   | `<LucideIcon iconName="..." />` |
| shadcn/ui    | `ui/shadcn/`                 | per-component — see Stage 8     |

## Button System

**Location:** `ui/buttons/Button.tsx` — the single source of truth for buttons project-wide.

- Always render `<Button />`. Never a raw `<button />`, unless the request is explicit about needing one.
- New visual treatment → add a variant or size to `Button`, don't create a second button component.

```tsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="ghost" />
<Button variant="outline" />
```

## Input System

**Location:** `ui/inputs/InputFactory.tsx` — a factory that selects the correct input implementation internally via a switch-case.

- Never build an individual input component directly.
- Always render `<InputFactory />` and let it resolve the type.

Supported types: text, email, password, number, textarea, select, checkbox, radio, switch, date, search.

- New input type needed → extend `InputFactory` with the new case and keep the API shape consistent. Don't ship a standalone input component alongside it.

## Link System

**Location:** `ui/links/Link.tsx` — unified internal/external navigation with the project's default styling and behavior built in.

- Always render `<Link />`.
- Don't reach for a raw `<a />` or the framework's link primitive directly unless specifically required — styling belongs inside `Link`, not repeated at every call site.

## Custom SVG System

**Location:** `ui/svg/IconSVG.tsx` — renders the project's custom, non-Lucide SVG assets.

- Always render `<IconSVG />`. Never inline raw `<svg>` markup into a page or feature component.
- New brand/custom asset → add it to the SVG system, not embedded ad hoc.

## Lucide Icon System

**Location:** `ui/images/LucideIcon.tsx` — see [07-icons-guide.md](./07-icons-guide.md) for the full implementation and the reasoning behind it.

- Always render `<LucideIcon iconName="Home" />` for icons known at build time — nearly every icon in the app.
- Never `import { Home } from "lucide-react"` directly in a feature component; that bypasses the registry and reintroduces per-component tree-shaking guesswork.
- New icon needed → add it to the registry in `LucideIcon.tsx` (one import, one map entry), then use it by name.
- Icon name only known at runtime (CMS, database) → this is the one case `LucideIcon` doesn't cover. Use the documented `DynamicIcon` escape hatch from Stage 7 instead of extending the registry as a workaround.

## shadcn/ui

**Location:** `ui/shadcn/` — everything generated by the shadcn CLI. See [09-shadcn-design-guide.md](./09-shadcn-design-guide.md) for the generation workflow.

- Don't hand-write a component that duplicates one already in `ui/shadcn/`.
- Component missing → install it with the CLI (`bunx --bun shadcn@latest add <name>`) and let it land in `ui/shadcn/` — don't hand-roll it as a stopgap.
- Don't manually recreate what the CLI generates — regenerate or update instead.

## Styling Responsibility

Global styles (Stage 4/5) own design tokens, typography, spacing, color, motion, and accessibility baselines. Component appearance lives inside the reusable components themselves — `Button.tsx`, `InputFactory.tsx`, `Link.tsx`, `IconSVG.tsx`, `LucideIcon.tsx` — not in the pages that use them.

Pages and feature components are responsible for layout, composition, and business logic only. They should never redefine how a shared component looks.

## Decision Tree

```text
Need a button?              → ui/buttons/Button.tsx
Need an input?               → ui/inputs/Input.tsx
Need an input for Form?      → ui/inputs/InputFactory.tsx
Need a link?                  → ui/links/Link.tsx
Need a custom SVG?             → ui/svg/IconSVG.tsx
Need a Lucide icon?             → ui/images/LucideIcon.tsx
Need a shadcn component?         → check ui/shadcn/ first, install via CLI if missing
Need something none of these cover?
                                    → create a new component, last resort
```

## Core Principle

These components are the project's design system, not a suggestion. Extending an existing component costs a variant; duplicating one costs consistency, maintainability, and a second implementation to keep in sync forever. Default to reuse.
