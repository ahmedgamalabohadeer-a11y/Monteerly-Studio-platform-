# Monteerly Studio Platform — Project Context for Codex

## Purpose
Monteerly Studio Platform (MCOS) is a multi-role digital platform. Existing platform capabilities, user roles, pages, components, workflows, and documentation must be preserved unless a human-approved change says otherwise.

## Current engineering posture
- Primary branch: `chore/monteerly-stabilization`.
- The repository may contain broad uncommitted changes and untracked operational artifacts.
- Treat all cloud services as production-sensitive.
- Default mode: read-only inspection, reporting, and planning.
- Any source, infrastructure, or cloud change requires explicit human approval after an impact report.

## Architecture
- Application: Next.js and TypeScript.
- Data/auth/storage: Supabase and PostgreSQL.
- Observability: Sentry.
- Hosting: Vercel.
- Version control: GitHub.
- Local environment: Docker and Supabase CLI.
- Automation direction: n8n.
- Graph/knowledge direction: Neo4j Aura.

## Payment policy
- Primary: Paymob.
- Paymob sequence: Visa/MasterCard, Fawry, mobile wallets, Apple Pay.
- PayPal: supplementary and for international customers only.
- Do not introduce Stripe or Firebase.

## Governance
- `docs/MCOS_MASTER_BRAIN_V3_PROPOSAL.md` is a proposal/reference, not a canonical source of truth.
- Existence of a UI, route, component, migration, or policy does not prove feature completeness, authorization correctness, security, or production readiness.
- Changes must be evidence-based, scoped, minimally invasive, and reversible where possible.

## Secret safety
- Never store secrets in this document.
- Never read local environment files or credential-bearing operational artifacts unless the user explicitly approves a narrowly scoped, redacted security task.
