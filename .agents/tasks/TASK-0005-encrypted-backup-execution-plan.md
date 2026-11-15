# TASK-0005 — Encrypted Production Backup Execution Plan (Planning Only)

## Objective

Create a precise, safe execution plan for a one-time encrypted Supabase production database backup using an approved interactive credential flow and GnuPG symmetric AES-256 encryption.

This is a planning task only.

Do not connect to Supabase.
Do not run pg_dump, psql, Supabase CLI, Docker, SQL, network commands, migrations, restore commands, Git write commands, builds, tests, or deployments.
Do not inspect .env files, credentials, connection strings, tokens, API keys, passwords, shell history, or ~/.codex/config.toml.
Do not create or encrypt a real database backup.

## Known approved local facts

- Backup staging directory exists:
  /home/ahmed/backups/monteerly
- It is outside the repository and outside /tmp.
- It is writable and owner-only with mode 0700.
- Local filesystem encryption is not evidenced.
- GnuPG is available locally:
  gpg 2.4.4
- `age` is not installed.
- Any production backup must be encrypted before being retained.
- The owner must enter credentials interactively outside the repository.
- The owner must enter the GnuPG passphrase interactively.
- No credentials, project URL, database URL, backup contents, raw row data, or passphrase may be printed, committed, or stored in the repository.

## Mandatory reading

Read complete contents of:

- AGENTS.md
- .codex/AGENTS.md
- docs/MCOS_MASTER_BRAIN_V3_PROPOSAL.md
- artifacts/handoffs/P0-MIGRATION-APPLY-PLAN.md
- TASK-0003 report or backup plan, if available
- relevant local Supabase project files, excluding .env files and supabase/.temp contents

## Required output

### 1. Preconditions

List all required conditions before backup execution, including:

- owner approval for backup only
- approved backup method
- interactive credential handling outside repository
- available disk space
- staging permissions
- GPG availability
- no migration or remote write authorization
- a clear cleanup policy for unencrypted temporary files

### 2. Recommended backup method

Provide a recommended primary method and fallback method:

- Primary: a direct PostgreSQL logical backup only if owner supplies credentials interactively and the connection method is confirmed.
- Fallback: Supabase Dashboard/provider-supported export or snapshot if direct logical backup is unavailable or incomplete.

Do not invent a connection URI or use placeholders that resemble real credentials.

### 3. Safe execution sequence

Describe a numbered sequence that:

- creates a UTC-stamped directory under /home/ahmed/backups/monteerly
- applies mode 0700
- writes a raw temporary backup only inside that directory
- validates non-empty output and archive parseability
- collects aggregate-only counts/checksums
- encrypts using interactive GnuPG AES-256 symmetric encryption
- verifies encrypted artifact exists and has a SHA-256 checksum
- securely removes the temporary unencrypted dump after encryption verification
- avoids putting passwords in command arguments, environment files, shell history, or repository files
- creates only redacted evidence metadata suitable for a handoff report

### 4. Temporary-data handling

Specify:

- where a raw dump may exist temporarily
- maximum allowed lifetime of raw data
- required permissions
- how to verify no unencrypted backup remains
- why deletion does not guarantee physical erasure on a copy-on-write or SSD filesystem
- what residual risk remains

### 5. Verification criteria

Specify exact categories of evidence:

- tool versions
- artifact names and sizes
- SHA-256 hashes
- parseability
- schema object inventory
- aggregate row counts
- referential checks
- encrypted-file verification
- restore rehearsal requirements
- evidence that must remain local versus evidence safe to commit

### 6. Approval text

Provide the exact approval statement required before execution. It must authorize only:

- one encrypted backup
- no migration
- no SQL write
- no restore
- no Git push/merge
- no Vercel deployment
- credentials and passphrase entered interactively outside repository

### 7. Final conclusion

End with exactly one:

- BACKUP-EXECUTION-PLAN-READY-FOR-OWNER-APPROVAL
- BACKUP-EXECUTION-PLAN-BLOCKED

### 8. Explicit confirmation

Confirm:

- no file was changed
- no external service was contacted
- no network command was run
- no database command was run
- no secret was inspected or printed
