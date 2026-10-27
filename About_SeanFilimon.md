# About Sean Filimon

This is the canonical source of truth for all content about Sean Filimon on this site. Every page, component, and piece of copy must reference this document for factual accuracy.

## Identity

- **Name:** Sean Filimon
- **Date of birth:** April 30, 2005
- **Age:** 21
- **Location:** California, United States
- **Birthplace:** New Jersey
- **Diagnosed:** High-functioning autism (Asperger's syndrome) at age 7 (2012)

Sean is a software and product engineer with an advanced background in AI, frontend and backend systems, and infrastructure. He has been writing code since age 13 and has over 7 years of engineering experience. He did not follow a traditional path — no CS degree, no internships at big companies. He learned by building, shipping, and fixing what broke.

## Places Lived

New Jersey, Tennessee, Florida, Texas, Florida (again), California.

## Family

- Father: chiropractor for 20 years
- Mother: nurse
- Neither parent was in tech
- His brother was building a Swift mobile app and a website, which inspired Sean to start coding

---

## Companies & Projects

| Name | Role | Founded | Status | Description |
|------|------|---------|--------|-------------|
| **LegionEdge** | Founder & CEO | October 2025 | Active | Parent company. AI-powered technology company building the next generation of developer tools. |
| ↳ Nokuva | Founder & CEO | October 2025 | Active | The premier AI-native design editor. Design on a real canvas, build a token system, convert to code. |
| ↳ Foltrac | Founder & CEO | October 2025 | Stealth | Cross-cloud deployment platform with full visibility. One pipeline, every provider. |
| ↳ Tavoc | Founder & CEO | October 2025 | Stealth | IDE built for speed and monorepo workflows with sub-millisecond file switching |
| ↳ W0rktree | Open Source Maintainer | October 2025 | Active / Open Source | Next-generation version control system built in Rust for monorepos. A competitor to Git. |
| Better IAM | Creator | September 2026 | Open Source | Embeddable TypeScript authentication, identity provisioning, and access management. Runs in your app with your database. |
| Better Compute | Creator | October 2026 | Open Source | Embeddable TypeScript control plane for GPU, CPU, and bare-metal capacity. Built on Better IAM. |
| Better Files | Creator | October 2026 | Open Source | Embeddable data rooms for TypeScript applications. Built on Better IAM. |
| OpticEngine | Creator | March 2024 | Stealth | Backend server engine for building and scaling systems |

LegionEdge is the parent company. Nokuva, Foltrac, Tavoc, and W0rktree are products under LegionEdge.

### Team Members (LegionEdge)

- Brian Mutungi (Nokuva)
- Josh Wyant (W0rktree, Nokuva)
- Owen Rossi (Nokuva)
- Nicholas Angelastro (OpticEngine)

---

## Nokuva — AI-Native Design Editor

### What Nokuva Is

Nokuva is the premier AI-native design editor that puts design back at the center — describe what you want, watch it build on a real canvas, refine every pixel, build a token system, then convert to code when you're ready.

**Category:** AI-native design editor. Not an app builder. Not a code generator. Not a prompt-to-code tool. A design tool.

**Elevator pitch:** Design tools that jump straight from prompt to code skip the entire design phase: the exploration, refinement, and token systems that make products scalable. Nokuva is the professional design editor rebuilt for the AI era. Full visual editor with layers, frames, and an infinite canvas. AI that generates designs, not code dumps. A design token system. The Figma feel — but AI-native from the ground up.

### What Nokuva Is NOT

- Not a "prompt to code" tool (Bolt, v0, Lovable territory)
- Not a website builder (Wix, Squarespace territory)
- Not a plugin or extension for existing tools
- Not a prototyping-only tool
- Not replacing the design process — it is the design process, accelerated

### Core Differentiators

1. **Design-First, Code-Second** — Stay in the cheap phase (design) until it's right. Skipping design means every iteration costs engineering hours, token bloat, inconsistent UI, and expensive UX debt.
2. **Real Canvas, Real Editor** — Every element on the canvas is a real HTML element via Nokuva's Virtual DOM. Not vectors. Not screenshots. Full visual editor with layers, frames, drag-and-drop, inspect panels, and pixel-level control.
3. **Virtual DOM Architecture** — Every element is a VNode — a lightweight, JSON-serializable object that represents a real UI element. The design is the code foundation. No translation layer.
4. **Built-In Design System** — Design tokens from day one: colors (hex and oklch with full palette generation), typography (250+ Google Fonts), spacing, border radius, shadows, elevation. All editable from a Theme Editor panel. All resolving live on canvas.
5. **Multi-Agent AI** — Specialized agents: Orchestrator, Plan Agent, Design Theme Agent, Design Spec Agent, Frame Builder Agent, UI Agent. Not one model doing everything poorly.
6. **SpacetimeDB Real-Time Collaboration** — In-memory relational database with built-in real-time subscriptions. Live cursors, per-node granular updates, collaborative undo/redo, advisory node locking, presence detection — all at database speed.

### The Three Eras Framing

- **Era 1 — Static Design (2000s):** Photoshop, Sketch. Output: PNGs and PDFs that developers eyeballed and rebuilt.
- **Era 2 — Collaborative Vectors (2010s):** Figma. Output: inspect panels and handoff links.
- **Era 3 — AI-Native Design (2026+):** Nokuva. Output: tokenized, production-mapped designs that are the source of truth.

### Nokuva Workflow (5 Steps)

1. **Describe Your Vision** — Tell Nokuva what you want in plain English.
2. **AI Generates Your Design** — Words transform into a structured layout on a real canvas. Not code. Not a screenshot. A real design with components, spacing, typography, and color hierarchy.
3. **Refine and Iterate** — Visual editor. Drag elements. Adjust spacing. Swap colors. Edit the layer tree. Every change here costs pennies. The same change in code costs dollars.
4. **Build Your System** — Organize reusable components, tokens, and styles into a cohesive design system from one theme editor.
5. **Convert to Code** — Perfected design converts to clean, production-ready code. No bloat from AI regeneration. No inconsistencies from prompt iteration.

### Nokuva Features

**Canvas and Editor:**
- Infinite canvas with multi-page support
- Frame-based artboards with device presets
- Complete layer tree with drag-and-drop reordering, visibility, locking, and grouping
- Visual inspection overlays
- Pixel-level control over spacing, typography, and hierarchy

**AI System:**
- Natural language generation — describe and watch it build
- Multi-agent architecture (Orchestrator, Plan Agent, Design Theme Agent, Design Spec Agent, Frame Builder Agent, UI Agent)
- Intelligent iteration — AI understands canvas context, adapts suggestions in real-time
- Design token AI — generates complete color systems and type scales

**Design System:**
- Design tokens: colors (hex + oklch with palette generation), typography, spacing, border radius, shadows, elevation
- Theme Editor panel for the entire design system
- Live theme resolution — change a token, every element using it updates instantly
- 40+ HTML element primitives across layout, typography, forms, media, and interactive categories
- Professional component collection: navbars, hero sections, feature grids, pricing tables, testimonials, footers — all tokenized and theme-aware

**Asset Libraries:**
- 10,000+ icons from 8 libraries (Material Design, Heroicons, Feather, Font Awesome, Ionicons, Ant Design, and more)
- 250+ Google Fonts with fuzzy search and instant loading
- Everything declared as JSON — serializable, AI-readable, version-controllable

**Architecture:**
- Virtual DOM (VNode tree) — every canvas element is a real HTML element, not a vector
- VNodes are lightweight, JSON-serializable with type, props, styles, children, and meta (design tokens, Tailwind classes)
- Pluggable extension system: Tailwind CSS resolution, icon libraries, Google Fonts auto-loading, design token resolution, interactive state management

**Collaboration:**
- SpacetimeDB — in-memory relational database with real-time subscriptions
- Live cursors and selections from every team member
- Per-node granular updates (not full-frame reloads)
- Collaborative undo/redo respecting each user's history
- Advisory node locking — see who's editing what
- Presence detection — active, idle, or away status
- Dual-database: SpacetimeDB for real-time canvas state, PostgreSQL for persistent data (auth, billing, accounts, audit logs, assets)

**Code Output:**
- Production-ready code conversion from perfected designs
- Clean, tokenized output — not bloated AI-generated code
- No regeneration bloat from prompt iteration

### Nokuva Key Claims

| Claim | Backing |
|-------|---------|
| "50x cheaper design phase" | Catch issues in design (pennies per change) instead of code (dollars per change). No regeneration bloat. |
| "The Figma feel" | Infinite canvas, frame-based artboards, layer tree, inspect mode, real-time multiplayer. |
| "AI-native, not AI-bolted-on" | Multi-agent architecture built from the ground up. |
| "Eliminates the design-to-code gap" | Virtual DOM means design structure = code structure. |
| "Real-time at database speed" | SpacetimeDB, not WebSocket relay. |

### Nokuva Approved Phrases

- "The premier design software for the AI era"
- "Design interfaces at the speed of thought"
- "AI-native, not AI-bolted-on"
- "The Figma feel — but AI-native from the ground up"
- "Design first. Code second."
- "Design isn't overhead. It's leverage."
- "50x cheaper design phase"
- "What you see is exactly what developers get"

### Nokuva Pricing

| Tier | Price | For |
|------|-------|-----|
| Starter | $0/month | Solo creators exploring the platform. 1 project. Full canvas, editor, tokens, code export. |
| Pro | $19/month | Professionals shipping real products. Unlimited projects. Real-time collaboration. Custom domains. |
| Team | $49/month | Teams building at scale. Advanced design system management. CI integration. Node locking. SSO. |

### Nokuva Stats

- 40+ HTML element primitives
- 10,000+ icons from 8 libraries
- 250+ Google Fonts
- 50x cheaper design phase

---

## W0rktree — Next-Generation Version Control

### What W0rktree Is

W0rktree is a next-generation distributed version control system built in Rust. It replaces Git entirely — a new system designed from scratch for monorepos with thousands of contributors, multi-tenant organizations, real-time collaboration, fine-grained access control, license compliance, and performance that scales.

W0rktree is not a Git wrapper, not a Git hosting platform, not a layer on top of Git. It has its own protocol, storage model, identity system, and history model. It speaks Git when needed — for migration and interop — but Git is a compatibility target, not a dependency.

**Positioning:** "W0rktree is not the next version of Git. It is what comes after Git."

### Technology Stack

Rust, CRDT, BLAKE3, gRPC, QUIC, FastCDC, TOML, FUSE/FUSE-T/ProjFS, Tokio, zstd

### Two-Runtime Architecture

W0rktree is split into two cooperating runtimes. Neither is optional. Neither duplicates the other.

**Local Background Process (`worktree-bgprocess`):**
- Runs on the developer's machine. Only process that touches the working directory.
- File watching via OS-native APIs (inotify, FSEvents, ReadDirectoryChangesW)
- Auto-snapshot creation (triggers: 30s inactivity, 50 changed files, 10MB changed bytes, branch switch)
- Branch management, local merges, sync orchestration
- Large file management via FastCDC chunking and VFS (FUSE/FUSE-T/ProjFS)
- 200ms debounce window, semantic file classification, ignore pattern matching
- IPC via Unix domain sockets (Linux/macOS) or named pipes (Windows)
- Offline-capable — continues all local operations when server unreachable, catches up on reconnection

**Remote Server (`worktree-server`):**
- Canonical source of truth for all history
- Multi-tenant management, IAM enforcement, cross-tenant access
- Staged snapshot aggregation for team visibility
- Branch protection, license compliance, merge request system
- Tag and release management, CI/CD gate integration
- API surface: gRPC (sync), REST (admin/integration), WebSocket (real-time events)

**Strict separation:** bgprocess never enforces access control or stores canonical history. Server never watches files or creates auto-snapshots.

### Core Features

**Trees (not Repositories):**
- Replace Git repos, submodules, and monorepo conventions with a single model
- Each tree has own snapshot history, branches, access rules, ignore patterns
- Trees can be nested; each level maintains independence
- Can be synced independently

**Snapshots (not Commits):**
- Immutable, content-addressed, complete-state records
- Created automatically by bgprocess or manually via `wt snapshot`
- No staging area, no index, no `add` command
- Append-only — only ever added, never removed or reordered

**Staged Snapshot Visibility:**
- Visibility layer between local work and branch history
- Team sees which files changed, who, which branch — before push
- Advisory conflict detection warns when two devs touch same files
- Not blocking — push proceeds if user chooses
- Privacy controls: opt-out per tree, temporary pause, branch-level privacy

**Declarative Access Control:**
- TOML files in `.wt/access/` and `.wt-tree/access/`, version-controlled alongside code
- Five built-in roles: Owner, Admin, Maintainer, Developer, Viewer
- 20+ atomic permissions, custom roles supported
- RBAC + ABAC (attribute-based conditions: time, IP, tenant plan/type/status, custom attributes)
- Permission ceiling model: root defines max; trees can only restrict further
- Path-level access requires explicit registration — no globs, no wildcards (O(1) lookup)

**Multi-Tenant Architecture:**
- Every actor is a tenant (user or org with verified identity)
- Organization tenants: multiple accounts, teams, role hierarchies
- Cross-tenant collaboration built into the protocol with optional expiration
- Three visibility modes: private, shared, public

**Append-Only History:**
- No rebase. No `reset --hard`. No force-push.
- One merge model (merge only)
- Soft deletes with configurable recovery windows
- Full reflog maintained locally and server-synced (default 90 days)

**Cross-Tree Dependency System:**
- Tree dependencies, branch dependencies, snapshot dependencies
- `wt depend add` creates structured TODOs in target tree, links branches for synchronized merging
- Prevents partial feature deployments

**Native Large File Handling:**
- No separate LFS system — same storage pipeline for all files
- FastCDC content-defined chunking (default threshold 10MB, target chunk 1MB)
- Lazy loading via platform-native VFS — transparent to editors and build tools
- LRU chunk cache (default 10GB local, 512MB VFS)

**License Compliance Engine:**
- Per-path SPDX identifiers enforced on every sync, export, fork, copy, archive
- Three grant levels: read-only, modify, redistribute
- Dual enforcement: both IAM and license must pass
- Proprietary paths auto-excluded from public archives and Git exports

**Sync Protocol:**
- gRPC over QUIC (HTTP/2 fallback)
- Connection migration, multiplexed streams, 0-RTT reconnection, built-in TLS 1.3
- Delta sync with have/want negotiation
- All data compressed with zstd
- Offline mode with full catch-up on reconnection

**Storage Architecture:**
- Content-addressable with BLAKE3 hashing (faster than SHA-256, tree-hashing mode for large inputs)
- Object types: blobs, tree objects, snapshots, manifests, deltas, chunks, tags, branches
- Per-tenant namespace isolation, configurable storage quotas
- Pack files with delta compression, garbage collection with grace periods

**Git Compatibility:**
- `wt init --from-git` imports Git repo with full history
- Live mirror mode: bidirectional sync with Git remote for gradual adoption
- Round-trip guarantees: byte-identical content, author/date preserved, merge structure maintained

### Design Philosophy (6 Enforced Constraints)

1. **One job per command** — No overloaded commands like Git's `checkout`. `wt branch create`, `wt branch switch`, `wt restore` — each does exactly one thing.
2. **Plain terminology** — Snapshot, tree, switch, restore — words that mean what they say.
3. **Automatic by default** — Auto-snapshots, auto-sync, auto-merge for non-conflicting changes.
4. **Append-only history** — Enforced by the protocol, not by convention.
5. **Non-destructive operations** — Soft deletes with recovery windows. Full reflog server-synced.
6. **Real-time collaboration** — Staged snapshot visibility as a core protocol feature, not an add-on.

### Platform Support

| Capability | Linux | macOS | Windows |
|------------|-------|-------|---------|
| File watcher | inotify | FSEvents | ReadDirectoryChangesW |
| Large file VFS | FUSE | FUSE-T | ProjFS |
| IPC | Unix domain socket | Unix domain socket | Named pipe |
| Service manager | systemd | launchd | Windows Service |

---

## LegionEdge — Parent Company

LegionEdge is the parent company behind Nokuva, Foltrac, Tavoc, and W0rktree. Founded in October 2025, it is the umbrella under which all of Sean's developer tool products operate.

- Built a full-stack AI app builder with integrations across Neon, Together AI, DigitalOcean, Supabase, Figma, and GitHub
- Designed a GPU-accelerated Rust IDE for next-generation development
- Managed and scaled a team of 7 engineers
- Forged strategic partnerships with major industry players
- Deployed complex backend systems on AWS, GCP, and DigitalOcean

---

## Contract & Freelance Work

Software Engineer, 2020 – Present.

| Project | Client | Year | Description |
|---------|--------|------|-------------|
| Fleet Management Dashboard | Underscor | 2020 | Real-time fleet tracking, analytics, GPS processing |
| Discrimination Guidance Software | Injury Compliance Software | 2021 | Compliance-focused healthcare software |
| High-Volume Content Distribution | — | 2022 | Rust-based CMS handling millions of concurrent requests |
| Collaborative Game Systems | — | 2020–2022 | Real-time multiplayer systems, event sourcing, CRDTs |
| Minecraft Server Core | — | 2020 | Custom Java server core for 1,000+ concurrent players |
| Discord Bot Platform | — | 2021 | Bot management platform serving hundreds of communities |
| Casino Industry | — | ~6 months | Real-time concurrent systems for games/users, scaled 6+ platforms |

First paid contract at age 15 — a website for a YouTuber. Followed by 2–3 years of freelance work building websites, platforms, and dashboards. Also traded stocks and crypto in high school.

---

## Technical Skills

### Languages

TypeScript, Rust, Go, Python, Java

### Frontend

React, Next.js, Tailwind CSS

### Backend & Infrastructure

AWS, GCP, Azure, DigitalOcean, Docker, Kubernetes

### Systems

Distributed systems, real-time multiplayer, high-concurrency backends

### Networking

Cisco Packet Tracer, network configuration, cybersecurity

## Focus Areas

- AI-powered development
- Full-stack platforms
- Developer tooling
- Distributed systems
- Cloud infrastructure
- GPU-accelerated interfaces

---

## Education

- **Wendell Krin Technical High School** (2020–2023)
  - Program: Cybersecurity, Cisco Packet Tracer (Networking, Configuration)
  - Dropped out and earned his GED to focus on building businesses
  - Strengths: Math, History, English, Science

## Certifications

All from CIW:

1. Network Technology Associate
2. Site Development Associate
3. Internet Business Associate
4. Web Foundations Associate

---

## Timeline

| Year | Event |
|------|-------|
| 2005 | Born in New Jersey |
| 2012 | Diagnosed with high-functioning autism at age 7 |
| 2018 | First lines of code at age 13 (Python script, then JavaScript) |
| 2019 | Self-taught web development; built sites for small businesses |
| 2020 | Backend and infrastructure deep dive (Node.js, PostgreSQL); first paid contract at 15 |
| 2020–2022 | Two years freelancing: websites, platforms, dashboards |
| 2021 | Distributed systems deep dive (Raft, Paxos, Git internals) |
| 2022 | Incorporated first company at 16 (did not survive) |
| 2025 | Founded LegionEdge in October — parent company of Nokuva, Foltrac, Tavoc, and W0rktree |
| 2026 | Age 21. Running LegionEdge and all its products, and building Better IAM, Better Compute, Better Files, and W0rktree. Writing about deployment, distributed systems, version control, and the craft of building software. |

---

## Events Attended

- **AWS re:Invent 2025** — Las Vegas, Nevada (November 30 – December 4, 2025)
- **Google Cloud Next 2026** — Las Vegas, Nevada (April 28–30, 2026)

## Social Links

| Platform | Handle | URL |
|----------|--------|-----|
| Website | — | seanfilimon.com |
| GitHub | @seanfilimon | github.com/seanfilimon |
| YouTube | @SeanFilimon | youtube.com/@SeanFilimon |
| LinkedIn | seanfilimon | linkedin.com/in/seanfilimon |
| X / Twitter | @SeanFilimon | x.com/SeanFilimon |
| TikTok | @seanfilimon | tiktok.com/@seanfilimon |
| Instagram | @seanfilimon | instagram.com/seanfilimon |
| Facebook | seanfilimon | facebook.com/seanfilimon |

---

## Descriptors

Use these when writing about Sean in third-person contexts:

- Software and product engineer with an advanced background in AI, frontend and backend systems, and infrastructure
- 21-year-old entrepreneur and product engineer
- Building software since age 13 with over 7 years of engineering experience
- Forward-thinking technology leader driving the future of AI-powered software engineering

## Personal Notes

- Autism described as "a gift of creativity" that made him think differently
- Every product started the same way — hit a problem, got frustrated no good solution existed, decided to build one
- Learned more from shipping than from any course
- Writes about what he learns because the best way to understand something is to explain it
