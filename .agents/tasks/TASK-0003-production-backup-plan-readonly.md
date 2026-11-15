# TASK-0003 — Production Database Backup and Remote Pre-flight Plan (Read-only)

## Objective

Create a complete, security-conscious, reviewable backup and read-only remote pre-flight plan for Supabase production before any P0 containment migration could be considered.

This task is planning only. Do not execute the plan, do not connect to Supabase, do not inspect secrets, and do not modify repository files.

## Mandatory reading

Read each file completely before writing conclusions:

- AGENTS.md
- .codex/AGENTS.md
- docs/MCOS_MASTER_BRAIN_V3_PROPOSAL.md
- artifacts/handoffs/P0-SECURITY-INVENTORY.md
- artifacts/handoffs/P0-MIGRATION-RECONCILIATION.md
- artifacts/handoffs/P0-LOCAL-REMEDIATION-REPORT.md
- artifacts/handoffs/P0-MIGRATION-APPLY-PLAN.md
- supabase/migrations/20260827130000_p0_security_containment.sql
- supabase/tests/p0_security_contract.sql
- all migrations related to profiles, user_system_roles, grants, policies, RLS, triggers, and SECURITY DEFINER.

## Existing confirmed findings

Treat these as constraints to validate against local artifacts:

- The containment migration is local only and has not been applied remotely.
- Remote status previously indicated disabled RLS on user_system_roles, anon SELECT access, and authenticated UPDATE access.
- The tracked migration chain does not prove a profiles.email column exists.
- Role trigger naming is inconsistent:
  - on_auth_user_created_system_role
  - on_auth_user_system_role_created
- Historical migrations 20260827000000–00007 are dangerous and must not be applied automatically.
- The existing /tmp source backup is not a database backup.
- No approved production backup or restore rehearsal exists.

## Strict restrictions

- Do not create, edit, delete, move, rename, stage, commit, push, or restore any file.
- Do not inspect .env files, passwords, credentials, tokens, API keys, connection strings, or secret-bearing configuration values.
- Do not run Supabase CLI, psql, pg_dump, Docker, SQL, network commands, package manager commands, build, lint, test, Git write commands, deployment commands, or external tools.
- Do not contact Supabase, GitHub, Vercel, Sentry, Resend, Paymob, PayPal, or any production service.
- Do not modify or inspect contents of supabase/.temp.

## Required output

### 1. Backup scope

Specify the minimum schema and data required before a role/RLS containment migration:

- auth.users relationship metadata required for restoration
- public.user_system_roles
- public.profiles
- public.production_projects, only if it exists
- relevant schema objects and functions in mcos_private and public
- RLS status, policies, grants, default privileges
- triggers on auth.users
- function owners, ACLs, definitions, and search_path
- constraints, indexes, defaults, columns, and migration history
- storage metadata and bucket policies if KYC or production storage depends on them

### 2. Backup strategy options

Compare without using credentials or executing commands:

- Supabase Dashboard export and available managed backup options.
- Secure direct PostgreSQL dump only after separate approval and interactive credentials supplied outside the repository.
- Database-internal snapshot approach and its limitations.
- External encrypted backup storage.

Recommend one approach for a Supabase Free project and explain its limitations.

### 3. Backup storage and verification

Define:

- encrypted location outside repository and outside /tmp
- UTC timestamp naming convention
- file permissions
- checksum requirements
- non-empty and parseability checks
- schema object counts
- row counts without exposing row data
- referential consistency checks
- retention and secure deletion policy
- restore rehearsal in an isolated disposable target
- evidence artifacts that may be committed without secrets

### 4. Read-only remote pre-flight inventory

List every metadata category required before migration approval:

- migration history
- exact role/RLS policies
- table grants
- default privileges
- role memberships
- RLS flags
- profiles.email existence/type/default/constraints
- trigger inventory on auth.users
- function signatures/overloads/owners/ACLs/search_path
- existing system-role distribution, redacted
- elevated-role inventory, redacted
- production_projects existence and access rules
- storage/KYC policy dependencies
- likely lock and compatibility risks

### 5. Required local corrections before remote apply approval

Describe the minimum local correction plan for:

- profiles.email precondition mismatch
- duplicate trigger naming and single-trigger assertion
- migration idempotency limitations after policy replacement
- existing privileged-role review/disposition
- isolated replay against a restored target
- expanded SQL contract coverage
- compensating migration/rollback strategy
- expected lock/WAL/runtime estimates

Do not edit anything.

### 6. Approval gates

Write separate proposed approval texts for:

1. Executing a production database backup only.
2. Running a read-only remote schema/policy/migration inventory only.
3. Creating an isolated restore environment and replaying migration locally.
4. Applying the specific reviewed containment migration to production.
5. Pushing the resulting commit to the working branch.
6. Merging to main and triggering Vercel production deployment.

### 7. Final conclusion

End with exactly one:

- PLAN-READY-FOR-OWNER-REVIEW
- PLAN-BLOCKED-NEEDS-MORE-LOCAL-EVIDENCE

### 8. Explicit confirmation

Confirm:

- no file was changed
- no secret was inspected or printed
- no network command was run
- no external service was contacted
- no migration or database command was executed
