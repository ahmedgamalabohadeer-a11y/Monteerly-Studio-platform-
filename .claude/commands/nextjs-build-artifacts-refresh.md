---
name: nextjs-build-artifacts-refresh
description: Workflow command scaffold for nextjs-build-artifacts-refresh in Monteerly-Studio-platform-.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /nextjs-build-artifacts-refresh

Use this workflow when working on **nextjs-build-artifacts-refresh** in `Monteerly-Studio-platform-`.

## Goal

Refreshes or updates Next.js build artifacts after code or dependency changes, ensuring the build output is up-to-date.

## Common Files

- `.next/BUILD_ID`
- `.next/build-manifest.json`
- `.next/server/app-paths-manifest.json`
- `.next/server/app/**/*.js`
- `.next/server/app/**/*.rsc`
- `.next/server/app/**/*.html`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Modify source code or dependencies
- Run Next.js build process
- Update .next/ and related build artifact files

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.