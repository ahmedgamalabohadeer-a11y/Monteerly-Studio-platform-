# Termux Operations Manual

## Purpose
This document defines the daily operational workflow for Monteerly Studio Platform from Termux.

## Daily Start

```bash
cd ~/Monteerly-Studio-platform-
git pull origin main
git status
git branch --show-current
```

## Before Any Feature Work

1. Create or update a production blueprint.
2. Review impacted files in read-only mode.
3. Confirm env and deployment assumptions.
4. Make small reversible changes.

## Blueprint Workflow

```bash
cd ~/Monteerly-Studio-platform-
./tools/new_feature_blueprint.sh my-feature
./tools/list_blueprints.sh
```

## Validation Workflow

```bash
cd ~/Monteerly-Studio-platform-
./tools/validate_ops_engine.sh
```

## Before Push

```bash
cd ~/Monteerly-Studio-platform-
git status
npm run lint --prefix web || true
npm run build --prefix web || true
```

## Push Workflow

```bash
cd ~/Monteerly-Studio-platform-
git add .
git commit -m "chore: update ops workflow"
git push origin main
```

## Rollback

```bash
cd ~/Monteerly-Studio-platform-
git log --oneline -n 5
git revert <commit_sha>
git push origin main
```
