# Backend Engineer

[![CI](https://github.com/Sparsh-06/Backend-Engineers/actions/workflows/ci.yml/badge.svg)](https://github.com/Sparsh-06/Backend-Engineers/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Sparsh-06/Backend-Engineers/actions/workflows/codeql.yml/badge.svg)](https://github.com/Sparsh-06/Backend-Engineers/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/code%20license-MIT-blue.svg)](./LICENSE)
[![Content License: CC BY-NC-ND 4.0](https://img.shields.io/badge/content%20license-CC%20BY--NC--ND%204.0-lightgrey.svg)](./src/content/LICENSE)

**[backendengineer.in](https://www.backendengineer.in)** - backend engineering, explained in plain English, with interactive visuals instead of walls of text.

Most backend content assumes you already know the fundamentals and jumps straight to distributed systems. This doesn't. It starts at "what is a server, really" and builds up - real lessons, real architecture from real companies, real projects you build yourself, not summaries of summaries.

## What's actually here

Nothing on this list is a placeholder page. If it's linked in the nav, it has real content behind it.

- **[Topics](https://www.backendengineer.in/topics)** - 32 published lessons across 3 live curriculum groups, each with plain-English explanations, real code, and at least one interactive visual (a request-flow diagram, a side-by-side comparison, a step-through timeline, or a memory map).
  - **Backend fundamentals** (14 lessons) - what a server is, the client-server model, HTTP basics, statelessness, APIs, idempotency, middleware, and more.
  - **Node.js runtimes** (8 lessons) - the event loop, async I/O, worker threads vs. cluster, streams, garbage collection, modules, error handling, and how the HTTP server actually works underneath.
  - **Protocols & APIs** (10 lessons) - TCP/TLS, HTTP/1.1 vs. 2 vs. 3, REST & OpenAPI, GraphQL, gRPC & Protobuf, real-time communication (WebSockets/SSE/long-polling), proxies, API gateways, auth (JWT/OAuth/OIDC), and rate limiting.
- **[Build It](https://www.backendengineer.in/build)** - guided, from-scratch projects with real working code and the specific problems that only show up once you build the thing yourself: a token-bucket rate limiter, a URL shortener, a real-time chat server with Redis pub/sub for scaling across instances.
- **[Architecture](https://www.backendengineer.in/architecture)** - how Netflix, Uber, Discord, and Stripe actually scale, with named tech stacks and plain-language explanations of what each piece does. Includes deep dives grounded in real published engineering blog posts (Netflix's real-time graph, Uber's gRPC migration) - explained in our own words, properly credited, not copied.
- **[Cloud](https://www.backendengineer.in/cloud)** - a category-first reference mapping the same concept across AWS, GCP, and Azure (12 categories: compute, storage, databases, caching, networking, and more), so you can see what each provider actually calls the thing you're looking for.
- **[Concepts](https://www.backendengineer.in/concepts)** - a searchable glossary of 22 backend terms in plain English, cross-linked to the full lessons where one exists.
- **[Field Notes](https://www.backendengineer.in/blog)** - reactions to real engineering postmortems and incidents. Honestly empty until there's something real worth reacting to - no filler posts.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, React Server Components, static generation)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** for MDX lesson content, compiled server-side
- **[Shiki](https://shiki.style)** via `rehype-pretty-code` for build-time syntax highlighting (zero client-side JS cost)
- A small custom `rehype` plugin that auto-links glossary terms to definitions with hover tooltips, without touching lesson prose
- `next/og` (`ImageResponse`) for dynamic, per-page Open Graph images
- Hand-written interactive visual components (no charting/animation library) - request-flow diagrams, comparisons, timelines, memory maps, an annotated code walkthrough, and a parameter simulator

## Project structure

```
src/
├── app/                      # Routes (App Router)
│   ├── topics/[slug]/        # Lesson pages, MDX-rendered
│   ├── build/[slug]/         # Build-it project pages
│   ├── architecture/
│   │   └── [company]/[deepdive]/  # Company profiles + deep dives
│   ├── cloud/, concepts/, blog/
│   ├── sitemap.ts, robots.ts, manifest.ts
│   └── opengraph-image.tsx   # + one per dynamic route segment
├── content/
│   ├── topics/*.mdx          # One file per published lesson
│   └── build/*.mdx           # One file per build-it project
├── data/
│   ├── topics.ts             # Curriculum structure, keywords, visuals - single source of truth
│   ├── architecture-profiles.ts / architecture-deep-dives.ts
│   ├── build-projects.ts, cloud-services.ts, glossary.ts, field-notes.ts
├── lib/
│   ├── markdown.ts           # MDX compilation pipeline (highlighting, glossary links, components)
│   └── rehype-glossary.ts    # The auto-linking plugin
└── modules/
    ├── components/mdx/       # <CodeWalkthrough>, <Simulator>, <CodeBlock>
    ├── components/topics/visuals/  # request-flow, comparison, timeline, memory-map
    └── layouts/               # Page-level layout components, one per section
```

**How content is added:** each lesson's metadata (title, description, SEO keywords, which curriculum group it belongs to, optional interactive visuals) lives in `src/data/topics.ts`. The actual lesson body is a separate `.mdx` file in `src/content/topics/`. A topic only appears on the live site once its slug is added to `publishedTopicSlugs` in that same file - so the curriculum can be scaffolded well ahead of being written, without exposing empty pages.

## Getting started

This project uses **pnpm**.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```

## Quality & security

- Every push and PR to `main` runs lint, a TypeScript typecheck, and a full
  production build via GitHub Actions ([`ci.yml`](.github/workflows/ci.yml))
  - required to pass before anything merges.
- [CodeQL](.github/workflows/codeql.yml) scans on every push/PR and weekly on
  a schedule. [Dependabot](.github/dependabot.yml) opens weekly PRs for
  outdated dependencies, grouped to keep the noise down.
- `main` is protected: no direct pushes, changes go through a PR with a
  passing CI check.
- Found a real vulnerability? See [SECURITY.md](./SECURITY.md) - please
  don't open a public issue for it.

## SEO & discovery

- Every page ships real `<title>`/description/canonical metadata and JSON-LD structured data (`Organization`, `WebSite`, `TechArticle`, `CollectionPage`, `DefinedTermSet`, `BreadcrumbList` - scoped to what's actually true; empty sections like Field Notes deliberately don't get structured data claiming content that doesn't exist).
- `sitemap.ts` sources `lastModified` from real file mtimes per lesson/project, not a blanket "now" on every build.
- A GitHub Action (`.github/workflows/notify-search-engines.yml`) pings Google Search Console and IndexNow on every push to `main`, so new or updated pages get crawled faster instead of waiting for a routine re-crawl.

## Curriculum roadmap

32 lessons are live. The full planned curriculum is larger - these groups are scaffolded in `src/data/topics.ts` (title, description, keywords already written) but don't have lesson content yet, so they're not published:

- **Data storage** - ACID, isolation levels, indexing, connection pooling, MongoDB, Redis, wide-column stores, caching patterns
- **Distributed architecture** - scaling, load balancing, consistent hashing, queues vs. streams, delivery semantics, fault tolerance, consensus
- **Cloud & platform** - containers, Kubernetes, serverless, CDNs, VPCs, observability
- **Production scenarios** - end-to-end system design walkthroughs
- A few additional language-runtime lessons (Go, Python, JVM) alongside the Node.js group

Nothing here is published until it's actually written - the site would rather have a shorter curriculum than a padded one.

## Contributing

Contributions are welcome, but curated on purpose - see
[CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR. Bug fixes, typo
fixes, and reusable components/infra improvements are welcome directly. New
lesson content requires an issue first (there's a template for it) - no
unsolicited content PRs, so the voice stays consistent across the whole site.

## License

This repository uses two licenses for two different things:

- **Code** (everything except `src/content/`) - [MIT](./LICENSE). Reuse the
  components, the MDX pipeline, the visuals, the SEO setup, whatever's
  useful.
- **Lesson content** (`src/content/`) - [CC BY-NC-ND 4.0](./src/content/LICENSE).
  Read it, learn from it, link to it - but it's not free to republish,
  repackage, or reuse commercially. The writing itself is the thing this
  project is actually protecting.

---

Built and maintained by [Sparsh Sharma](https://www.backendengineer.in). Questions: `contact@backendengineer.in`.
