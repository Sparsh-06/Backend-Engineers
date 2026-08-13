# Contributing

Thanks for wanting to contribute. This project is intentionally curated -
here's what that means in practice, so your time (and mine, reviewing it)
isn't wasted.

## What's welcome

**Bug fixes.** Broken code in a lesson's examples, a factual or technical
error, a dead link, an accessibility issue, a build/type error, a genuinely
wrong claim. Open a PR directly. These get reviewed fast.

**Typo and copy-edit fixes.** Small, precise, and clearly correct. A PR that
fixes three typos in one file is easy to review and merge. A PR that
"cleans up" a paragraph's tone or restructures a sentence for style reasons
without fixing an actual error is not a typo fix - see below.

**New reusable components and infrastructure improvements.** New visual
types, performance improvements to the build, tooling, accessibility
improvements to existing components, dependency updates with a clear reason.
Open an issue first if the change is non-trivial (new dependency, new
pattern, anything touching the MDX pipeline) so we can agree on the
approach before you spend time on it. Small, self-contained improvements can
go straight to a PR.

**New lesson content - issue first, always.** This is the one that needs the
most care. Do not open an unsolicited "here's a new lesson" PR. Instead:

1. Open an issue proposing the topic, a rough outline, and why it belongs in
   the curriculum (which group, what it builds on, what gap it fills).
2. Wait for explicit go-ahead on the topic and angle before writing anything.
3. Even after a topic is approved and written, the final prose will likely
   get edited before merge to match the site's voice (see below) - that's
   normal, not a rejection of the contribution.

Unsolicited lesson-content PRs will be closed and redirected to this process,
not out of unfriendliness - it's the only way this stays consistent instead
of turning into a pile of mismatched writing styles.

## What's not in scope right now

- Rewrites of existing lessons "for style" without a concrete error to fix.
- New top-level sections or curriculum groups (that's a bigger call than a
  single PR - open an issue to discuss first, expect it to be a longer
  conversation).
- Translations (not something the project is set up for yet).
- Anything generated wholesale by an AI tool and submitted without review or
  editing on your end. It's usually obvious, and it undermines the entire
  point of a project that's explicitly trying to avoid that voice.

## The voice, if you're proposing content

Every lesson on this site has been held to the same bar, and new content
needs to match it:

- Concrete over abstract. Real function names, real error messages, real
  numbers you're confident are accurate - not vague gestures at "performance"
  or "scalability."
- No filler phrasing - avoid constructions like "it's not just X, it's Y,"
  forced rule-of-three lists, or hollow transitions ("at the end of the
  day," "that said"). If a sentence doesn't say anything a reader couldn't
  already guess, cut it.
- Vary sentence and paragraph length. A whole lesson in uniform medium-length
  sentences reads like it was generated, even when a human wrote it.
- No fabricated specifics. Don't invent a benchmark number, a stat, a quote,
  or a claim about what a company does internally unless you can back it up.
  "I'm not sure of the exact number, so I described it qualitatively instead"
  is always better than a plausible-sounding made-up one.
- Every code snippet needs to actually be correct - real APIs, real behavior,
  tested or at least carefully hand-verified, not close-enough pseudocode
  dressed up as real code.

If you're not sure whether something fits the voice, look at a few existing
lessons in `src/content/topics/` before writing - it'll be obvious fast.

## Setup

```bash
pnpm install
pnpm dev
```

Before opening a PR:

```bash
pnpm lint
pnpm build
```

Both need to pass. If you added or changed a lesson, check it renders
correctly at its `/topics/[slug]` or `/build/[slug]` route locally.

## How lessons actually work

- `src/data/topics.ts` holds each lesson's metadata - title, description, SEO
  keywords, which curriculum group it belongs to, and any interactive
  visuals. A lesson only appears on the live site once its slug is added to
  `publishedTopicSlugs` in that file.
- The lesson body itself is a separate `.mdx` file in `src/content/topics/`.
- Interactive visuals (request-flow diagrams, comparisons, timelines, memory
  maps) are data-driven from that same `topics.ts` entry and rendered inline
  via `<Visual id="..." />` in the MDX - look at an existing lesson with a
  visual before adding a new one.

## Licensing note

By opening a PR, you're agreeing your contribution is licensed under the same
terms as the part of the repo it touches: MIT for code (see `LICENSE`), or
CC BY-NC-ND 4.0 for anything under `src/content/` (see
`src/content/LICENSE`) - meaning you're fine with it living on the site under
those terms, not that you're giving up the right to also use your own words
elsewhere.

## Conduct

Be direct and be kind. Disagree about the work, not about the person. Low-
effort, spammy, or bad-faith PRs and issues get closed without much
discussion - that's not personal, it's just what keeps review time focused
on contributions that actually move the project forward.

## Questions

Not sure if something's in scope, or want to float an idea before writing an
issue? `contact@backendengineer.in`.
