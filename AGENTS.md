# AGENTS.md

## Stack

Next.js 16.2 (App Router) / React 19+ / HeroUI v3 / Tailwind CSS v4 / Fumadocs / TypeScript (strict)

## No Comments

Never add comments that narrate what code does. Never use comments as a thinking scratchpad. The only acceptable comments explain non-obvious intent, trade-offs, or constraints that the code itself cannot convey.

## Skills

All detailed rules, patterns, and reference material live in `.agents/skills/`. Read the relevant skill before starting any task.

### Next.js

| Skill | Path | When to use |
|-------|------|-------------|
| next-best-practices | `.agents/skills/next-best-practices/` | File conventions, RSC boundaries, async APIs, error handling, data patterns, bundling, middleware-to-proxy rename |
| nextjs-app-router-patterns | `.agents/skills/nextjs-app-router-patterns/` | Server Components, streaming, parallel routes, intercepting routes, caching strategies |

### HeroUI v3

| Skill | Path | When to use |
|-------|------|-------------|
| heroui-react | `.agents/skills/heroui-react/` | Component API, compound patterns, theming, semantic variants. Fetch MDX docs before implementing any component. v2 patterns are forbidden. |

### Tailwind CSS v4

| Skill | Path | When to use |
|-------|------|-------------|
| tailwind-design-system | `.agents/skills/tailwind-design-system/` | CSS-first `@theme` config, design tokens, dark mode, spacing scales, color with OKLCH |

### React

| Skill | Path | When to use |
|-------|------|-------------|
| vercel-react-best-practices | `.agents/skills/vercel-react-best-practices/` | Performance optimization across 8 categories (waterfalls, bundle size, server, client, re-renders, rendering, JS, advanced) |
| vercel-composition-patterns | `.agents/skills/vercel-composition-patterns/` | Compound components, avoiding boolean props, state management, React 19 APIs |

### TypeScript

| Skill | Path | When to use |
|-------|------|-------------|
| typescript-advanced-types | `.agents/skills/typescript-advanced-types/` | Generics, conditional types, mapped types, template literals, type guards, utility types |

### Fumadocs

| Skill | Path | When to use |
|-------|------|-------------|
| read-docs | `.agents/skills/read-docs/` | Retrieving content from Fumadocs-powered sites via `/llms.txt`, `/llms.mdx/`, and `/api/search` |

### Design (Impeccable)

| Skill | Path | When to use |
|-------|------|-------------|
| impeccable | `.agents/skills/impeccable/` | Core design skill. Run `/impeccable teach` for project context, `/impeccable craft` for full design flow. Read `.impeccable.md` before any design work. |
| polish | `.agents/skills/polish/` | Final design refinement pass |
| audit | `.agents/skills/audit/` | Score design quality with severity ratings |
| critique | `.agents/skills/critique/` | Multi-persona review against Nielsen's heuristics |
| typeset | `.agents/skills/typeset/` | Fix typography hierarchy and scale |
| arrange | `.agents/skills/arrange/` | Fix layout and spacing |
| colorize | `.agents/skills/colorize/` | Rebuild color palette |
| animate | `.agents/skills/animate/` | Add purposeful motion |
| adapt | `.agents/skills/adapt/` | Responsive across breakpoints |
| distill | `.agents/skills/distill/` | Simplify and reduce complexity |
| bolder | `.agents/skills/bolder/` | Increase visual impact |
| quieter | `.agents/skills/quieter/` | Reduce visual noise |
| clarify | `.agents/skills/clarify/` | Improve information hierarchy |
| delight | `.agents/skills/delight/` | Subtle moments of delight |
| harden | `.agents/skills/harden/` | Production readiness (empty states, edge cases) |
| optimize | `.agents/skills/optimize/` | Performance optimization |
| overdrive | `.agents/skills/overdrive/` | Technically extraordinary effects |
| shape | `.agents/skills/shape/` | Discovery interview to produce a design brief |

### UI Review

| Skill | Path | When to use |
|-------|------|-------------|
| web-design-guidelines | `.agents/skills/web-design-guidelines/` | Review UI code against Web Interface Guidelines |

## General Rules

- Server Components are the default. Only add `'use client'` when required.
- HeroUI v3 uses compound components with dot-notation (`Card.Header`, not flat props). No `<HeroUIProvider>`. Use `onPress` not `onClick`.
- Tailwind v4 uses `@theme` in CSS, not `tailwind.config.ts`.
- Use `proxy.ts` not `middleware.ts` (Next.js 16 rename).
- `params`, `searchParams`, `cookies()`, `headers()` are async. Always await.
- Props crossing Server to Client must be JSON-serializable.
- Use `Promise.all()` for independent fetches. Use Suspense for streaming.
- Use `unknown` over `any`. Use `interface` for objects, `type` for unions.
- Do not use `forwardRef`. Pass `ref` as a regular prop (React 19).
- Avoid `useEffect`. Derive state during render, fetch data in Server Components, and handle mutations with Server Actions. Only reach for `useEffect` when synchronizing with an external system (DOM APIs, third-party widgets, subscriptions).
- Import directly from modules, never through barrel files.
- Fetch HeroUI component docs before implementing any component.
- Check `.impeccable.md` before any design work.
