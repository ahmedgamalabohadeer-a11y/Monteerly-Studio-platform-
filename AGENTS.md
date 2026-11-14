<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


<!-- BEGIN MONTEERLY CODEX PROJECT RULES -->
# Monteerly Studio Platform — Codex Instructions

## Project identity
- Product: Monteerly Studio Platform / Monteerly Corporate OS (MCOS).
- Repository root: this directory.
- Primary working branch: `chore/monteerly-stabilization`.
- Stack: Next.js, TypeScript, Supabase/PostgreSQL, Docker, Vercel, Sentry.
- Supporting services may include n8n, Neo4j, Cloudflare R2, Upstash, Resend, ElevenLabs, Gemini, Paymob, and PayPal.
- Reference proposal: `docs/MCOS_MASTER_BRAIN_V3_PROPOSAL.md`.
- The reference proposal is non-canonical and requires human review. It does not prove feature completeness, security, or production readiness.

## Default operating mode
- Default to read-only inspection, analysis, and planning.
- Before any file change or side-effecting command, state:
  1. Goal
  2. Files and services affected
  3. Expected impact
  4. Minimal safe plan
  5. Validation and rollback approach
- Wait for explicit user approval before making changes.

## Non-destructive product rule
- Do not delete features, routes, pages, components, user roles, workflows, documentation, data, or business capabilities merely to simplify work.
- Remove only verified duplicates, after presenting evidence and receiving explicit approval.
- Preserve role coverage and locale behavior from login onward unless a human-approved task explicitly changes them.
- Do not replace working integrations with mock data or placeholders without approval.

## Security and secret handling
- Never read, print, quote, copy, transmit, commit, upload, or modify values from:
  - `.env`, `.env.*`, `.sentryclirc`, `*.pem`, `*.key`
  - `archive/root-config-backups/`
  - `supabase/.temp/`
  - backup, restore, dump, or credential-bearing scripts
- Never reveal or store passwords, API keys, JWTs, service-role keys, database URLs, auth tokens, or Vercel environment values.
- Do not add secrets to source code, Markdown, SQL, shell scripts, test fixtures, logs, Git, Vercel, or Sentry.
- If a task needs a secret, stop and require it to be supplied interactively outside the repository and outside chat.
- Treat previously exposed credential values as revoked or unsafe. Never reuse them.

## Actions prohibited without explicit approval
- Git writes: `git add`, `git commit`, `git push`, force push, rebase, reset, clean, branch deletion, history rewrites, PR creation.
- Vercel writes: deploys, environment-variable changes, project setting changes.
- Supabase remote writes: `supabase db push`, remote migrations, remote SQL, RLS/policy/grant changes, auth/storage setting changes, resets, or data mutations.
- Sentry writes: releases, tokens, alert rules, project settings, or issue mutations.
- Package installs, dependency upgrades, lockfile regeneration, broad configuration replacement.
- Deleting Docker containers, volumes, backups, scripts, or local data.
- Running builds, linters, tests, migrations, network calls, Docker commands, or tool installations unless explicitly approved.

## Supabase posture
- The linked Supabase project is production-sensitive and remote access is read-only by default.
- Local Supabase work must remain local in Docker.
- Never run `supabase db push` or `supabase db reset` by default.
- Never infer a route, component, SQL migration, RLS policy, or auth configuration is complete or safe because it exists.
- See `supabase/AGENTS.md` for stricter database-specific rules.

## GitHub, Vercel, and Sentry posture
- Authentication or CLI linkage proves only local access; it does not prove production safety or authorize writes.
- GitHub: do not push or create pull requests without approval.
- Vercel: do not deploy or change environment variables without approval.
- Sentry: do not create/modify releases, alerts, tokens, or settings without approval.

## Technology and product rules
- Use existing TypeScript, Next.js, App Router, locale-routing, and component conventions.
- Prefer minimal, local, reversible changes.
- Do not introduce Stripe or Firebase.
- Payment policy:
  - Primary provider: Paymob.
  - Paymob order: Visa/MasterCard, Fawry, mobile wallets, Apple Pay.
  - PayPal is supplementary and only for international customers.
- Keep `next.config.js`; do not replace it with `next.config.mjs` unless explicitly approved.
- Preserve existing Sentry support in Next.js configuration.

## Required response format
For every task, report in this exact order:
1. Goal
2. Status
3. Files read
4. Root cause or findings
5. Impact map
6. Minimal plan
7. Proposed change or completed change
8. Validation performed and results
9. Remaining risks
10. Approval required
11. Next safe step

## Validation
- Run only the narrowest relevant validation after approval.
- Report the exact commands executed and concise redacted results.
- Never claim production readiness, database safety, or security completeness without evidence.
<!-- END MONTEERLY CODEX PROJECT RULES -->
