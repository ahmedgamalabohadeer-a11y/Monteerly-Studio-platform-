# Supabase Area Rules — Monteerly

## Default posture
- This directory is security-sensitive.
- Work in read-only mode unless the user explicitly approves a named local or remote operation.

## Protected paths
- Never inspect, print, copy, or disclose `supabase/.temp/`.
- Never inspect or expose `.env`, `.env.*`, database URLs, service-role keys, passwords, tokens, or backup artifacts.

## Prohibited by default
- Do not run:
  - `supabase db push`
  - `supabase db reset`
  - `supabase migration up`
  - remote SQL
  - remote schema changes
  - seed changes
  - `supabase link` changes
- Do not modify migrations, RLS policies, grants, functions, triggers, auth settings, storage policies, or database roles.
- Do not disable RLS, add broad anon access, add public grants, or introduce service-role workarounds.
- Do not delete local Docker volumes, restore artifacts, or database containers.

## SQL review protocol
Before proposing any SQL change:
1. Read all related migrations, tests, and affected application call paths.
2. Identify schema objects, roles, policies, and authorization consequences.
3. Explain the security impact and a rollback approach.
4. Wait for explicit approval.
5. Validate locally first if approved.
6. Never apply to remote without a separate explicit approval.

## Evidence rule
- A migration or policy existing in this directory does not prove it was applied, is correct, is secure, or is production-ready.
