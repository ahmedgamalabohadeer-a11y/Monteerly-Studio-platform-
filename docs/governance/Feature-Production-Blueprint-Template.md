# Feature / Agent Production Blueprint Template

> This template is used to design, implement, review, deploy, and govern any new feature or AI agent inside Monteerly Studio Platform.

---

## Metadata

- **Feature ID**:
- **Status**: Draft / In-Review / Approved / In-Progress / Shipped / Rolled-Back
- **Created at**:
- **Updated at**:
- **Owner**:
- **Linked Sprint**:
- **Linked Roadmap Phase**:
- **Deployment Target**: Local / Vercel / Hybrid

---

## Section 0 – Feature Brief

- **Feature / Agent Name**:
- **Business Goal**:
- **Target Users / Roles**:
- **Scope**: MVP / Full Feature / Experiment
- **Dependencies**:
- **Primary Risks**:

---

## Section 1 – Read-Only Audit (Safety First)

### 1.1 Termux Reconnaissance Script

```bash
cd ~/Monteerly-Studio-platform-
echo "🔍 Repo status"
git status --short

echo "🔍 Current branch"
git branch --show-current

echo "🔍 Relevant files"
find web app src components lib docs -maxdepth 3 2>/dev/null | head -n 200

echo "🔍 Search by keyword"
grep -R "FEATURE_KEYWORD" -n . 2>/dev/null | head -n 50
```

### 1.2 Existing Integration Points

- Pages / routes affected:
- Components affected:
- API / server actions affected:
- Supabase / data tables affected:
- Sentry / Guardian touchpoints:
- Existing environment variables involved:

### 1.3 Safety Notes

- No deletion of existing features without explicit approval.
- Prefer additive and reversible changes.
- Confirm compatibility with Next.js App Router and strict TypeScript.

---

## Section 2 – Surgical Execution

### 2.1 Files to Add

- `web/...`
- `components/...`
- `lib/...`

### 2.2 Files to Modify

- `web/...`
- `components/...`
- `lib/...`

### 2.3 Execution Method

- Safe backup before edits.
- Minimal, surgical code changes.
- Keep UI aligned with Corporate OS patterns.
- Ensure responsive behavior and accessibility.

### 2.4 Performance Notes

- Target fast server responses.
- Avoid over-fetching.
- Prefer cached or batched reads when possible.
- Keep bundle growth controlled.

---

## Section 3 – Governance, Legal, Finance

### 3.1 Governance

- Feature owner:
- Reviewer:
- Approval requirement:
- Rollback owner:

### 3.2 Legal / Data Review

- Does it process sensitive data?
- Does it affect contracts, finance, or legal flows?
- Are logs free of sensitive payloads?

### 3.3 Financial Impact

- Expected infra cost:
- External API cost:
- Operational savings:
- ROI rationale:

---

## Section 4 – Go-Live Roadmap

### 4.1 Pre-Deploy Checklist

- [ ] Audit completed
- [ ] Code reviewed
- [ ] Env variables verified
- [ ] Vercel build checked
- [ ] Sentry monitoring confirmed
- [ ] Rollback plan documented

### 4.2 Git Commands

```bash
cd ~/Monteerly-Studio-platform-
git status
git add .
git commit -m "feat: [feature-name] production blueprint implementation"
git push origin main
```

### 4.3 Rollback Plan

```bash
cd ~/Monteerly-Studio-platform-
git log --oneline -n 5
git revert <commit_sha>
git push origin main
```

---

## Section 5 – Final Decision

- **Ship Now / Ship with Constraints / Defer**:
- **Reason**:
- **Conditions**:
- **Next Sprint Action**:
