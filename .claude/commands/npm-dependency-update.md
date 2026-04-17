---
name: npm-dependency-update
description: Workflow command scaffold for npm-dependency-update in Monteerly-Studio-platform-.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /npm-dependency-update

Use this workflow when working on **npm-dependency-update** in `Monteerly-Studio-platform-`.

## Goal

Updates npm dependencies and related lock files, often to fix dependency issues or add new packages.

## Common Files

- `node_modules/.package-lock.json`
- `node_modules/**/package.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Modify package.json or install/remove dependencies
- Update node_modules/.package-lock.json and other lock files
- Commit updated lock files and possibly node_modules content

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.