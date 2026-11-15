# MCOS Schema and Access Contract

**Status:** Approved / Implementation Pending
**Date:** 2026-10-11
**Scope:** Approved design direction for schema authority, identity and role boundaries, marketplace profile visibility, production-project membership, and KYC storage/state transitions. Implementation, DDL, Storage configuration, local replay, and remote inspection remain separately gated.

## Evidence boundary

This decision records approved direction. Its local evidence basis includes migration definitions, Prisma models, application call sites, security contract files, and P0 handoffs. Supabase migrations are canonical per ADR-001. Prisma is legacy/secondary. Application code is evidence of consumption, not proof of schema. Handoffs and proposals are context, not DDL or applied-state evidence. No remote state was inspected.

## ADR-001 — Canonical schema and access contract

**Context:** Repository schema vocabularies diverge. Migrations define a small profiles table and user_system_roles; Prisma models legacy users/projects/financial_transactions/security_audit_logs; application code consumes additional profile fields and tables not established by inspected migrations.

**Decision:** Supabase migrations are the canonical source for schema, RLS, functions, triggers, and grants. Prisma remains legacy/secondary. Application code and TypeScript indicate consumer expectations only. Supabase remote is operational evidence only after separately authorized read-only inspection. Documentation and proposals are not DDL.

**Consequences:** Reconciliation begins with the ordered migration chain and tests, then compares application callers. A code reference without migration DDL is missing or unverified. Prisma drift is documented, not silently treated as live schema.

**Alternatives considered:** Prisma as canonical; infer schema from queries; treat proposals/handoffs as database evidence.

**Rejected alternatives:** They confuse intended/consumed contracts with canonical migration DDL or applied state.

**Security implications:** Authorization must be represented in migrations and tested by actor, resource, and operation. UI guards do not establish authorization.

**Data-privacy implications:** Classify data before creating projections; do not copy KYC, financial, or internal fields to broad read surfaces.

**Operational implications:** Migration candidates require ordered replay in a fresh disposable local stack, catalog checks, and separate approval.

**Rollback/compensation:** Historical migrations remain immutable. Recovery uses a new reviewed compensating migration that preserves deny-by-default controls; never restore anonymous access or unsafe role mutation.

**Open questions:** Which schema extensions are canonical but absent locally? How should legacy Prisma models be documented? Who owns schema/security/operations approval?

**Approval checklist:** [x] Direction accepted in the task decisions. [ ] Schema/security owners approve detailed field and evidence contracts. [ ] Operations separately approves disposable replay.

## Migration ordering approval

**Problem:** A fresh replay first reaches a migration that alters four relations not created by the inspected chain; later, containment requires `profiles.email`, also absent from earlier DDL. Appending fixes after these historical consumers cannot satisfy their preconditions. Prisma and application queries do not replace canonical migration DDL.

**Options:** Edit historical migrations (rejected); append later prerequisites (does not fix earlier failures); rely on manual/remote schema or Prisma (not reproducible); add additive prerequisites at ordered positions before each consumer (approved planning direction).

**Decision:** Approve the ordering recommendation for planning: preserve historical migration files; target `20260826235959_critical_relations_prerequisite` before `20260827000000_enable_rls_on_critical_tables.sql`, followed by the historical chain, then `20260827125959_profiles_email_prerequisite` immediately before containment. The logical contracts for the missing relations are recorded in the migration-ordering decision document. IDs are planning targets pending collision and runner/history review. No migration or SQL is authorized.

**Replay impact:** Full replay remains blocked until both prerequisite definitions are reviewed and candidate files are separately authorized and authored. A later append cannot unblock this sequence. Any future local replay must use a new disposable stack and the full ordered chain; remote state remains unknown and requires separately authorized read-only verification.

**Signup-trigger impact:** The containment replacement signup trigger writes the Auth email, so the profile column must exist first. The earlier trigger does not establish ongoing synchronization during a rollout window. Decide signup coordination or review a separate compatibility mechanism before any rollout; do not change triggers under this ADR.

**Migration-ordering impact:** The two candidates intentionally sort before existing historical migrations. This changes the sorted chain for fresh replay without editing historical files, and may interact with existing applied history. Verify migration-runner semantics and applied history before authoring or any remote action.

**Approval gate:** The ordering direction is approved by this task; implementation remains pending schema-owner approval of table/field/backfill contracts, security review, migration-operations confirmation, and separate local replay authorization. Remote inspection or apply requires separate authorization.

## Schema contracts and ordering approval

**Problem:** ADR-001 through ADR-005 settle the access direction, but the local canonical chain does not define several consumed relations and fields. The critical-table RLS migration requires four relations that the inspected chain does not create; containment later requires `profiles.email`, also absent from prior DDL. Prisma and application consumers disagree with or exceed the migration contract. No schema, product, security, or finance owner response is present in this review context.

**Options:** Treat application/Prisma shapes as approved DDL (rejected); defer all contract choices without a review baseline (safe but leaves owners without a concrete pack); or publish logical additive contracts and ordering candidates for named owner review while leaving exact physical DDL and sign-offs pending (selected).

**Decision:** ADR-001 through ADR-005 remain approved design decisions. The entity contracts and candidate ordering in `artifacts/handoffs/P0-SCHEMA-CONTRACTS-AND-ORDERING-APPROVAL.md` are the proposed owner-review baseline, not owner-approved schema. Preserve historical migration files. Retain the two prerequisite candidates before their existing consumers. Do not infer missing types, constraints, backfills, or access rules from Prisma or application calls; record unresolved choices for their owning reviewers.

**Replay impact:** Fresh replay remains blocked until owners approve exact definitions for the missing critical relations and profile email, candidate IDs are reconciled with runner semantics and migration history, candidates are separately authorized and authored, and a separate disposable local replay is approved. The approval pack alone does not unblock replay.

**Signup-trigger impact:** The containment signup trigger inserts the Auth email into `profiles.email`; that column must preexist. Source, type, nullability, uniqueness, backfill, and email-change synchronization are undecided. `system_role=user` remains independent of `account_type`; no user metadata, cookie, client state, or form value may grant a role. This decision authorizes no trigger modification or signup rollout.

**Migration-ordering impact:** Candidate `20260826235959_critical_relations_prerequisite` is proposed before `20260827000000_enable_rls_on_critical_tables.sql`; candidate `20260827125959_profiles_email_prerequisite` is proposed after `20260827000007` and before containment. They intentionally sort ahead of historical consumers and require collision, tool, applied-history, backfill, and owner review. No historical file is reordered, edited, renamed, removed, or skipped.

**Approval gate:** The logical contract pack is ready for schema, product, security, privacy/legal, finance, and migration-operations review; no such owner sign-off is claimed here. Each owner must record approve/revise/reject and conditions in the pack. Separate explicit approval remains required before migration authoring, policy/function/trigger/Storage changes, tests, local replay, remote inspection, or external action.

### profiles.email ordering decision

**Problem:** The inspected canonical chain creates `profiles` without `email`. No later migration before containment adds it, while `20260827130000_p0_security_containment.sql` explicitly requires the column and the replacement signup trigger writes it. A fresh replay therefore cannot reach containment with the inspected chain alone. A more immediate prerequisite is also present: `20260827000000_enable_rls_on_critical_tables.sql` directly alters `projects`, `financial_transactions`, `security_audit_logs`, and `production_projects`, none of which has a `CREATE TABLE` definition in the inspected migration chain. That earlier migration is the first observed full-chain blocker.

**Options considered:**

1. Edit the historical profile or containment migration to add/relax the prerequisite — rejected because historical migrations are immutable in this task and it changes replay history.
2. Append a new email migration after containment — rejected because it runs too late to satisfy containment's precondition on a fresh replay.
3. Rely on an out-of-band/manual column or treat Prisma as schema — rejected because it is not reproducible canonical migration evidence.
4. Add a new additive prerequisite migration ordered before containment, backfilled only from the canonical Auth record, with data/constraint checks — recommended for local fresh replay, pending migration-history review and owner approval.

**Recommended decision:** Keep every historical migration unchanged. After the earlier critical-table DDL blocker is resolved, propose a separate additive migration `20260827125959_profiles_email_prerequisite` immediately before containment in the local ordering. It should add the column compatibly and map existing profile identities to the corresponding Auth email without printing or copying values into reports. Do not assume `NOT NULL` or uniqueness: first prove null/duplicate semantics and align email change behavior. This is a migration candidate only; no DDL is authored here.

**Replay impact:** The candidate ordering permits a fresh replay to present the required profile column before containment, if migration ordering is confirmed by an approved isolated replay. It does not prove remote state or authorize a remote apply. Since the candidate timestamp precedes an existing migration, remote migration history and tool behavior must be reviewed read-only under separate authorization before any rollout. If that review cannot establish a safe rollout, stop; do not use an out-of-band schema patch.

**Signup-trigger impact:** The containment replacement `handle_new_user()` inserts `new.email`, so the column must exist before that function is installed. The prior trigger does not establish ongoing email synchronization during a rollout window. A remote rollout would need an approved sequencing/maintenance decision or a separately reviewed compatibility mechanism; do not edit triggers under this ADR. A clean local replay has no signups until tests deliberately create synthetic users after migration completion.

**Migration-ordering impact:** The proposed email prerequisite is ordered after the profile/account-type and role-helper migrations, and before containment. It is downstream of the earlier missing-table prerequisite needed before `20260827000000_enable_rls_on_critical_tables.sql`. Both candidate IDs are provisional; check for conflicts and migration-history implications before authoring. No existing migration is reordered, removed, renamed, or edited.

**Approval gate:** Schema owner approves source/type/nullability/backfill; security reviews exposure and trigger behavior; migration operator verifies ordering/tool semantics and applied-history compatibility; operations approves any signup coordination. Local replay and remote read-only inspection each require separate authorization. This recommendation does not authorize migration creation or execution.

## ADR-002 — Marketplace profile visibility

**Context:** Marketplace queries freelancer rows from profiles, while containment allows only own-row profile reads. Full-table browser access would expose unrelated private fields.

**Decision:** Establish a published safe projection, provisionally named published_freelancer_profiles or marketplace_profiles, available to authenticated users only in this phase. Candidate fields are approved display name, avatar reference, biography, experience summary, and publication state. Exclude email, tax_id, KYC object path/type, metadata, financial/internal data. Exclude KYC status unless separately approved. Browser clients receive no full profiles-table access.

**Consequences:** Talent discovery remains available without weakening containment. A publication lifecycle and server-controlled writer are required. The projection has explicit SELECT policy and no browser write path.

**Alternatives considered:** Read all profiles; disable discovery indefinitely; use a narrow view or dedicated projection table.

**Rejected alternatives:** Full-table reads leak data; disabling discovery breaks a product capability. The logical projection is accepted; physical table versus secured view needs review.

**Security implications:** Authenticated SELECT of published rows only; no anon grant; writes validate profile ownership/publication capability and are audited.

**Data-privacy implications:** Only approved fields are exposed. Unpublish must promptly remove visibility.

**Operational implications:** Define synchronization, freshness, failure handling, and audit.

**Rollback/compensation:** Disable projection reads while retaining profiles and marketplace routes. Do not widen profiles grants as fallback.

**Open questions:** Exact fields? Who may publish? Table, view, or server endpoint?

**Approval checklist:** [x] Authenticated-only safe projection direction accepted. [ ] Product/privacy approve exact fields and publication lifecycle. [ ] Security approves implementation and writer boundary.

## ADR-003 — Production-project membership

**Context:** Production callers query/update/subscribe through browser Supabase clients. Containment closes direct access because the local schema does not establish ownership or membership.

**Decision:** Use production_project_members or an equivalent canonical membership model. Access derives from verified ownership, active membership, and scoped capability, never account_type alone. SELECT, UPDATE, and DELETE have separate policies. No anon access. Realtime uses the same authorized audience or equivalent server-mediated authorization.

**Consequences:** Reconcile parent schema/owner relation first. Define invitations, revocation, expiry, audit, and Realtime behavior. Existing direct-client workflows remain unavailable until the model and tests are approved.

**Alternatives considered:** Public SELECT; authorization by account_type; server-mediated access; membership-table RLS.

**Rejected alternatives:** Public access exposes projects; account_type does not prove membership; reopening before tests contradicts containment. Membership-table RLS is selected, with server mediation for flows that cannot safely use direct Realtime.

**Security implications:** Bind current identity to active owner/member records and capability. Avoid recursive RLS helpers. UPDATE/DELETE check row access and permitted transitions independently.

**Data-privacy implications:** Project metadata, media references, comments, and delivery status remain scoped to project members.

**Operational implications:** Audit membership changes and define cache/session invalidation and Realtime revocation behavior.

**Rollback/compensation:** Close affected client paths while preserving pages/features. Restore only proven membership-scoped capability through a reviewed additive change.

**Open questions:** Canonical project ID/owner? Required capabilities? Required Realtime events?

**Approval checklist:** [x] Membership-based access direction accepted. [ ] Product/security approve exact capabilities and policies. [ ] Operations approves revocation and Realtime behavior.

## ADR-004 — Private KYC storage

**Context:** KYC uploads use a bucket named secure-vault, but local migrations do not define the bucket or policies. No server-controlled review download path was confirmed.

**Decision:** Use a dedicated private KYC bucket. Never issue public KYC URLs. Server-controlled review endpoints authorize admin/KYC operators, audit access, and provide short-lived access only when needed. Orphan cleanup, retention, and legal hold are part of the design. This ADR creates no bucket or Storage policy.

**Consequences:** Define consistent Storage and database metadata contracts; implement review endpoints and audit; support upload finalization and retries.

**Alternatives considered:** Public URLs; shared media bucket; direct browser operator downloads; dedicated private bucket/server review.

**Rejected alternatives:** Public/shared access rules are unsuitable for identity documents; direct browser access bypasses review authorization and audit.

**Security implications:** Private by default; caller-bound object keys; content limits; authorize each review; object path is not proof of ownership.

**Data-privacy implications:** Minimize identifiers in object metadata/logs; define retention, deletion, legal hold, and access audit.

**Operational implications:** Define malware scan, upload finalization, cleanup scheduling, alerting, and recovery.

**Rollback/compensation:** Disable new upload/finalization through reviewed changes while preserving evidence. Do not make a bucket public to restore availability.

**Open questions:** Formats/limits? Operator review lifecycle? Retention/legal-hold periods?

**Approval checklist:** [x] Dedicated private bucket/server-controlled review direction accepted. [ ] Privacy/legal approves retention and legal hold. [ ] Security/operations approve access, scanning, cleanup, and recovery.

## ADR-005 — KYC resubmission state machine

**Context:** Current containment RPC sets status to pending but does not enforce rejected-only resubmission or retain each attempt as a first-class record.

**Decision:** not_started → pending → approved or rejected; rejected → pending is the only resubmission path. Pending and approved submissions cannot be replaced. Every attempt and decision is audited. Upload success followed by RPC failure must not leave a permanent untracked object; use staged upload/finalize plus cleanup of expired uncommitted objects. Approved is terminal unless reverification is separately approved.

**Consequences:** Store attempts/decisions durably; enforce transitions and ownership atomically; coordinate Storage lifecycle with database retries.

**Alternatives considered:** Replace documents at any time; overwrite one object/status; append attempts and allow resubmission only after rejected.

**Rejected alternatives:** Unrestricted replacement loses evidence and permits state reset. Append-only attempts with constrained transitions are selected.

**Security implications:** Subject may submit only after rejection; authorized operators alone decide. Server verifies object ownership/state and audit actor.

**Data-privacy implications:** Retain rejected/superseded documents only for approved periods and legal holds. Cleanup must preserve held evidence.

**Operational implications:** Upload tickets, finalization, retries, orphan reconciliation, and cleanup must be idempotent and observable.

**Rollback/compensation:** Disable new submissions without deleting history or objects. Correct state through reviewed compensating records.

**Open questions:** Is post-approval reverification needed? Orphan grace period? Which decisions require two reviewers?

**Approval checklist:** [x] Rejected-only resubmission direction accepted. [ ] Compliance/privacy approve retention and audit details. [ ] Security/operations approve transition enforcement, retry, and cleanup.

## Cross-decision approval checklist

- [x] Task owner approved the ADR-001 through ADR-005 design directions for this planning task.
- [ ] Name schema, product, security, privacy/legal, finance, and operations reviewers for implementation details.
- [ ] This approved direction does not authorize DDL, code, Storage configuration, local execution, or remote action.
- [ ] Each implementation proposal receives separate review and approval.

## ADR review and approval

**Problem:** The five security/schema directions were previously recorded as approved directions while downstream handoffs still listed approval of the ADRs as a replay precondition. That wording left unclear whether the design choices themselves were settled.

**Options:** Keep all five as proposals; approve the directions while leaving implementation contracts open; or treat this document as authorization to implement schema and application changes.

**Approved decision:** ADR-001 through ADR-005 are approved as final design decisions for this planning scope. Canonical authority, authenticated-only safe marketplace projection, membership/capability-scoped production access, private audited KYC storage, and rejected-only KYC resubmission are settled. The approval does not authorize DDL, migration authoring or execution, RLS/grant/function/trigger changes, Storage configuration, application changes, tests, replay, or remote inspection.

**Replay impact:** Replay documents must treat ADR approval as complete and must continue to block execution until schema contracts, prerequisites, candidate ordering, test fixtures, and the disposable environment are separately reviewed and authorized. The two known local chain blockers remain unresolved by design approval alone.

**Signup-trigger impact:** New accounts continue to receive `system_role=user`, independent of `account_type`; client metadata, cookies, or submitted form fields cannot assign a privileged role. The existing containment signup trigger depends on `profiles.email`, which remains absent from the inspected preceding migration chain. This approval does not authorize changing or installing a trigger, and does not settle email backfill or synchronization behavior.

**Migration-ordering impact:** Preserve historical migrations. The two additive prerequisite candidates and their positions remain planning candidates pending field/table contracts, migration-runner and history review, and separate authoring approval. ADR approval does not make earlier-sorting candidate IDs safe to insert or apply.

**Approval gate:** The design decisions are approved by the task owner for this scope. Before implementation, obtain separate schema-owner approval of exact entity and field contracts, security/privacy/legal/product/finance reviews as applicable, operations review of migration ordering and compensation, and explicit authorization for each consequential activity. Local replay and remote read-only inspection each require separate authorization.

**Status by ADR:** ADR-001 Approved; ADR-002 Approved; ADR-003 Approved; ADR-004 Approved; ADR-005 Approved. Detailed implementation contracts remain pending.

## Risks, gaps, next steps

The first clean-replay blocker is the critical-table RLS migration's references to four relations with no defining migration DDL; `profiles.email` is a later independent blocker. Profile/KYC fields and contract tables also lack reproducible DDL. Marketplace and production callers conflict with containment. ADR design approval is complete; next resolve and review both prerequisite contracts and migration history, then seek separate authorization for migration authoring and any local replay.
