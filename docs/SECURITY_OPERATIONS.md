# Security Operations — Monteerly

## Secrets
- Store secrets only in approved environment-variable managers or a password manager.
- Keep local secrets in ignored local files only.
- Never commit, paste into chat, print in logs, place in source code, write into Markdown, SQL, test fixtures, or shell scripts.
- If a secret appears in terminal output, source files, backup files, or chat, treat it as exposed and rotate or revoke it through the responsible provider.

## Cloud services
- Supabase remote is production-sensitive; remote writes require explicit approval.
- Vercel: no deploy or environment-variable changes without explicit approval.
- Sentry: no releases, token changes, alerts, or project configuration changes without explicit approval.
- GitHub: no staging, commits, pushes, pull requests, branch operations, or history changes without explicit approval.

## Local operations
- Docker/Supabase local work must not be assumed to reflect production.
- Preserve local evidence and backups unless explicit approval authorizes their deletion or movement.
