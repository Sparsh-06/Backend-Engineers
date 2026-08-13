# Security Policy

This is a personal educational project (a static/server-rendered Next.js
site with no user accounts, no payments, and no user-generated data stored
server-side), so the realistic threat surface is small - mainly dependency
vulnerabilities and anything in the GitHub Actions workflows. Still, if you
find something, please report it responsibly.

## Reporting a vulnerability

**Don't open a public issue for a security problem.** Email
`contact@backendengineer.in` with:

- What you found and where (file, route, workflow)
- Steps to reproduce, if applicable
- What you think the actual impact is

This is a solo-maintained project, so there's no formal SLA - but real
reports get read and acted on, not ignored. Expect an acknowledgment within
a few days.

## Scope

In scope: the application code in this repository, the GitHub Actions
workflows, and how secrets/credentials are handled in them.

Out of scope: the underlying platforms this depends on (Next.js, Vercel or
whatever it's hosted on, npm/pnpm itself, GitHub Actions runners) - report
those upstream, not here. Automated vulnerability scanning (CodeQL,
Dependabot) already runs against this repo continuously; if you're seeing
something those tools would already catch, it's likely already flagged.

## Supported versions

There isn't a versioned release process here - only the `main` branch is
maintained. Fixes land there, not backported anywhere.
