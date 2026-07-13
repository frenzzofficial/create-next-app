# Stage 3 — Enterprise Architecture

## Overview

This stage establishes the folder structure every feature in the application will rely on. Rather than building business features first, we create a scalable structure so features have a consistent place to live from day one.

The architecture targets modern frontend applications — SaaS platforms, dashboards, admin panels, e-commerce, and other large-scale Next.js projects.

## Objectives

- Enterprise folder architecture
- Feature-based component organization
- Shared UI component library
- Layout system
- Provider architecture
- Configuration layer
- Environment management
- Utility layer
- Service layer
- Global state management foundation
- Shared hooks
- Centralized metadata
- Type-safe project foundation

## Install Runtime Dependencies

```bash
bun add axios zod clsx lucide-react next-themes class-variance-authority tailwind-merge react-hook-form zod-validation-error @hookform/resolvers
```

| Package                  | Purpose                        |
| ------------------------ | ------------------------------ |
| axios                    | HTTP client                    |
| zod                      | Runtime schema validation      |
| clsx                     | Conditional class names        |
| tailwind-merge           | Merge Tailwind utility classes |
| class-variance-authority | Component variants             |
| lucide-react             | Icon library                   |
| next-themes              | Theme management               |
| react-hook-form          | Form validation                |
| zod-validation-error     | Zod validation error           |
| @hookform/resolvers      | Form resolvers                 |

## Folder Structure

> This structure is the contract for the project. Every later stage places files here — nowhere else.

```text
src
│
├── app
│   ├── (auth)
│   ├── (protected)
│   ├── (public)
│   ├── api
│   ├── error.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── robots.txt
│   ├── sitemap.ts
│   └── page.tsx
│
├── assets
│   ├── fonts
│   ├── icons
│   ├── images
│   ├── logos
│   └── svg
│
├── components
│   ├── features
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── navigation
│   │   └── profile
│   │
│   ├── layouts
│   │   ├── AppClientLayout
│   │   ├── Header
│   │   ├── Footer
│   │   ├── Theme
│   │   ├── AuthLayout
│   │   ├── ProtectedLayout
│   │   └── PublicLayout
│   │
│   ├── providers
│   │   ├── AuthProvider
│   │   └── ThemeProvider
│   │
│   └── ui
│       ├── buttons
│       │   └── Button.tsx
│       │
│       ├── inputs
│       │   ├── Input.tsx
│       │   ├── Checkbox.tsx
│       │   └── InputFactory.tsx
│       │
│       ├── images
│       │   ├── LucidIcon.tsx
│       │   ├── ImageComponent.tsx
│       │   └── NavigationLogo.tsx
│       │
│       └── shadcn
│           ├── avatar
│           ├── badge
│           ├── button
│           ├── card
│           ├── dialog
│           ├── dropdown
│           └── tabs
│
├── packages
│   ├── configs
│   ├── env
│   ├── hooks
│   ├── metadata
│   ├── forms
│   ├── schemas
│   ├── services
│   ├── store
│   └── utils
│
├── styles
│   ├── animations.css
│   ├── globals.css
│   ├── typography.css
│   ├── ui.css
|        ├── input.css
|        ├── button.css
│   └── navigation
│
└── types
```

## Folder Responsibilities

### app

Next.js App Router: route groups, pages, layouts, API routes, loading UI, error boundaries. No business logic here.

```text
app
├── (auth)
├── (protected)
├── (public)
├── api
├── layout.tsx
└── page.tsx
```

### assets

Static assets: brand logos, custom icons, images, web fonts, SVG illustrations.

```text
assets
├── fonts
├── icons
├── images
├── logos
└── svg
```

### components

Four categories, each with a distinct role.

**components/features** — feature-specific presentation components, scoped to one business domain, never reused globally.

```text
features
├── auth
├── dashboard
├── navigation
└── profile
```

Examples: sign-in form, dashboard cards, user profile card, navigation menu.

**components/layouts** — reusable page structures that compose shared interface elements (auth pages, dashboard pages, marketing pages).

```text
layouts
├── AppClientLayout
├── AuthLayout
├── ProtectedLayout
└── PublicLayout
```

**components/providers** — React providers consumed directly by UI components, exposing shared state through Context.

```text
providers
├── AuthProvider
└── ThemeProvider
```

**components/ui** — reusable, business-logic-free UI building blocks.

```text
ui
├── buttons
├── inputs
└── shadcn
```

### packages

Reusable application logic — functionality, not presentation.

**packages/configs** — centralized app settings, navigation definitions, theme configuration.

```text
configs
├── app.config.ts
├── navigation.config.ts
└── theme.config.ts
```

**packages/env** — environment variable parsing and validation, separated by client/server.

```text
env
├── app.env.ts
├── auth.env.ts
└── client.env.ts
```

**packages/hooks** — generic, reusable custom hooks.

```text
hooks
├── useBoolean.ts
├── useBreakpoints.ts
├── useDebounce.ts
├── useLocalStorage.ts
├── useMediaQuery.ts
└── useMounted.ts
```

**packages/metadata** — SEO metadata, Open Graph, Twitter cards.

```text
metadata
├── app.metadata.ts
├── openGraph.ts
└── twitter.ts
```

**packages/schemas** — all Zod schemas: form validation, API validation, shared request models.

```text
schemas
├── auth.schema.ts
├── common.schema.ts
└── user.schema.ts
```

**packages/services** — application services: Axios client, auth services, storage helpers. Business logic lives here, not in components.

```text
services
├── api
├── auth
├── storage
└── index.ts
```

**packages/store** — global state management. Zustand is the default choice; this structure leaves room to expand if that changes.

```text
store
├── context
├── reducers
├── slices
└── index.ts
```

**packages/utils** — framework-independent utility functions.

```text
utils
├── cn.ts
├── cookies.ts
├── date.ts
├── format.ts
├── sanitize.ts
├── storage.ts
└── validators.ts
```

### styles

Global styling resources. `navigation/` holds multiple navigation themes (classical corporate, premium cyber, transparent, sidebar, mobile).

```text
styles
├── animations.css
├── globals.css
├── input.css
├── typography.css
├── ui.css
└── navigation
```

### types

Global TypeScript declaration files, shared across the app.

```text
types
├── api.d.ts
├── app.d.ts
├── auth.d.ts
├── globals.d.ts
└── navigation.d.ts
```

## Architecture Principles

- **Route-first** — `app` defines routes and layouts; business logic stays out of it.
- **Separation of concerns** — UI, business logic, services, utilities, and configuration each own a clear responsibility.
- **Feature-based organization** — domain components live in `components/features` and evolve independently.
- **Reusable UI** — `components/ui` stays free of business logic.
- **Centralized configuration** — settings live in `packages/configs`, not scattered through the codebase.
- **Type safety** — shared types, schemas, and utilities are centralized to reduce duplication.
- **Scalability** — the structure holds from a small project to an enterprise application without a rewrite.

## Stage Deliverables

- ✅ Enterprise folder architecture
- ✅ Feature-based component organization
- ✅ Shared UI component library
- ✅ Multiple application layouts
- ✅ Configuration management
- ✅ Environment configuration
- ✅ Global providers
- ✅ Reusable hooks
- ✅ Service layer
- ✅ Utility layer
- ✅ Global state management foundation
- ✅ Type-safe project structure

## Next Stage

Continue to [04-design-system-guide.md](./04-design-system-guide.md) to define design tokens and the theme system.
