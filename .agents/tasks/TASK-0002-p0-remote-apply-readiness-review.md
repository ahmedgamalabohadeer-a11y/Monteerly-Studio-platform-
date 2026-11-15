# TASK-0002 — P0 Remote Apply Readiness Review (Read-only)

## Objective
Review the completed local P0 remediation artifacts and determine whether the repository has enough local evidence to request a production database backup and a separate remote migration approval.

## Mandatory reading
Read each file completely before reaching conclusions:

- AGENTS.md
- .codex/AGENTS.md
- .agents/skills/Monteerly-Studio-platform-/SKILL.md, if present
- docs/MCOS_MASTER_BRAIN_V3_PROPOSAL.md
- artifacts/handoffs/P0-SECURITY-INVENTORY.md
- artifacts/handoffs/P0-MIGRATION-RECONCILIATION.md
- artifacts/handoffs/P0-LOCAL-REMEDIATION-REPORT.md
- artifacts/handoffs/P0-MIGRATION-APPLY-PLAN.md
- supabase/migrations/20260827130000_p0_security_containment.sql
- supabase/tests/p0_security_contract.sql
- all migrations matching:
  *user_system_roles*
  *role*
  *rls*
  *policy*
  *grant*
  *security*
- package.json
- relevant authorization helpers and their tests.

## Known historical migrations requiring special review
- supabase/migrations/20260827000000_enable_rls_on_critical_tables.sql
- supabase/migrations/20260827000001_fix_service_role_access.sql
- supabase/migrations/20260827000002_fix_service_role_policy.sql
- supabase/migrations/20260827000003_fix_user_system_roles_policy.sql
- supabase/migrations/20260827000004_drop_old_user_system_roles_policy.sql
- supabase/migrations/20260827000005_allow_anon_read_user_system_roles.sql
- supabase/migrations/20260827000006_disable_rls_temp.sql
- supabase/migrations/20260827000007_grant_anon_select.sql

## Strict read-only restrictions
- Do not edit, create, delete, move, rename, stage, commit, push, or restore any file.
- Do not inspect .env files, secrets, credentials, API keys, connection strings, or configuration values that could contain secrets.
- Do not run pnpm, npm, build, lint, test, Supabase CLI, SQL, Docker, migrations, Git write commands, network commands, deployment commands, or any external-service command.
- Do not contact Supabase, GitHub, Vercel, Paymob, PayPal, Resend, Sentry, or production.
- Do not modify or remove supabase/.temp files.

## Required report
1. Current branch and concise worktree classification:
   - pre-existing changes
   - P0 remediation changes
   - dangerous/untracked historical migrations
   - files that must not be touched

2. Migration containment review:
   - exact intended effect of 20260827130000_p0_security_containment.sql
   - grants/revokes
   - RLS enablement
   - policies
   - trigger/function effects
   - SECURITY DEFINER and search_path posture
   - data backfill behavior
   - idempotency
   - rollback or compensating migration requirements

3. Historical migration risk table:
   - each 20260827000000–00007 file
   - whether it changes RLS
   - whether it grants anon access
   - whether it grants authenticated write access
   - whether it risks recursion
   - whether it can remain unapplied safely
   - whether the containment migration compensates for it

4. Verification-harness review:
   - what p0_security_contract.sql proves
   - what it cannot prove
   - requirements to run it locally
   - requirements to run it remotely
   - missing positive/negative tests

5. Backup scope recommendation:
   - schema objects that require snapshot
   - tables requiring data export
   - whether source backup is sufficient
   - minimum backup verification criteria
   - recommended safe local backup location

6. Choose exactly one conclusion:
   - STOP-P0-REVIEW
   - SAFE-TO-REQUEST-DATABASE-BACKUP-PLAN
   - OWNER-DECISION-REQUIRED

7. Confirm explicitly:
   - no file was changed
   - no network command was run
   - no external service was contacted
   - no secret was inspected or printed
