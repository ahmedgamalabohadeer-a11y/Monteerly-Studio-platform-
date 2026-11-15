# Infrastructure Provenance — Redacted

## Scope
This document records only high-level, non-secret connection evidence. It does not establish production readiness, schema correctness, RLS safety, deployment correctness, or authorization to make remote changes.

## Locally confirmed linkage
- GitHub CLI authentication: confirmed locally.
- Repository remote: configured locally.
- Supabase CLI authentication: confirmed locally.
- Supabase remote project: linked locally; treat as production-sensitive.
- Vercel authentication and project linkage: confirmed locally.
- Sentry authentication: confirmed locally.

## Operating constraints
- Do not place secrets, passwords, tokens, database URLs, project keys, environment-variable values, user identifiers, or private operational details in this document.
- CLI login or project linkage is not evidence of deployment safety, security correctness, or production readiness.
- Any remote write requires separate explicit human authorization.
