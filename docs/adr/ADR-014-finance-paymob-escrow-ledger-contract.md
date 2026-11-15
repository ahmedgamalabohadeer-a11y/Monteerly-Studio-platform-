# ADR-014 — Canonical Finance, Paymob Lifecycle, Escrow and Append-Only Ledger Contract

**Status:** Approved architecture / Implementation pending
**Decision date:** 2026-11-15
**Decision owner:** Product owner (decision supplied in this task)
**Scope:** Canonical pricing authority, payment intents and provider events, Paymob-first settlement, escrow state transitions, append-only ledger invariants, and payout/refund accounting.
**Evidence boundary:** This ADR defines a required target contract. It does not prove that current application code, migrations, database state, Paymob configuration, or deployed systems implement it.

## 1. Context

The repository has multiple payment and accounting paths with inconsistent amount sources, units, table names, and status vocabularies. Paymob checkout and webhook endpoints are currently fail-closed, while separate marketplace code can create an escrow row in `held` state without provider settlement. Wallet and withdrawal behavior is not backed by a canonical settlement ledger. PayPal's webhook is only an acknowledgement stub.

There is also an ADR numbering conflict in existing documents: the approved ADR-001 through ADR-005 record assigns ADR-004 to private KYC storage and ADR-005 to KYC resubmission. A non-canonical Master Brain proposal reuses ADR-004/ADR-005 for payment and finance. This decision uses the next non-conflicting identifier, ADR-014. It does not rename or change the KYC decisions.

## 2. Decision

Adopt one server-authoritative payment lifecycle. The server derives a quote from an authorized `services` or `jobs` record, creates a payment intent, verifies provider events, and atomically settles the intent into escrow and balanced ledger postings. Client-supplied amounts, statuses, ownership claims, and provider outcomes are never authoritative.

Paymob is the primary provider. PayPal remains an optional international provider and must satisfy the same normalized intent, event, replay, settlement, and ledger contracts before it is enabled. A provider adapter may translate provider-specific requests and events, but it cannot weaken these invariants.

## 3. Normative invariants

The terms **MUST**, **MUST NOT**, and **SHOULD** are normative requirements for implementation and review.

### 3.1 Pricing authority and money representation

1. A payment amount MUST be calculated server-side from the canonical, authorized service or job record. The server MUST verify the authenticated actor's authority over that record and the allowed order/payment lifecycle.
2. The server MUST ignore or reject client-provided amount, fee, tax, discount, currency, seller proceeds, payment status, and escrow status. A client may submit an entity identifier and non-authoritative quote selections only; each selection MUST be revalidated against stored policy and data.
3. The amount used for a provider request MUST be a server-created, immutable quote snapshot tied to the source record, currency, calculation version, fee/tax rules, and expiry. A changed source price requires a new quote/intent; an existing intent is not silently repriced.
4. All persisted and computed monetary values MUST use integer minor units (`BIGINT` or a range-checked integer type) and an explicit ISO currency code. Examples: 1 EGP = 100 piastres; 1 USD = 100 cents. Currency exponent MUST come from an approved currency rule, not an implicit decimal assumption.
5. Binary floating-point values MUST NOT be used in payment, tax, fee, escrow, ledger, refund, or payout calculations. Decimal source values such as legacy `services.price` or `jobs.budget` MUST be parsed and converted using a specified deterministic rounding rule before creating the quote. Rounding rule and price-calculation version MUST be stored with the quote.
6. A transaction MUST NOT combine different currencies. FX requires a separately approved, versioned quote with source/target currency, rate source, timestamp, rounding, and provider settlement evidence.
7. Price/rate changes MUST be authorized, audited, and effective-dated. Browser forms and metadata fields MUST NOT be able to modify a settled quote.

### 3.2 Payment intent and provider lifecycle

1. A Payment Intent MUST be created server-side from the authorized quote and have a stable internal UUID, owner, source entity, amount in minor units, currency, calculation version, provider, and idempotency key.
2. The initial intent lifecycle is closed to these states: `created`, `pending_provider`, `succeeded`, `failed`, `cancelled`, `expired`. Only validated commands may make allowed transitions; repeated commands are idempotent. Provider retries MUST NOT create a second intent or charge.
3. The provider request MUST be formed from the stored intent, never directly from request-body amounts. Credentials and provider configuration MUST remain server-only. Redirect return pages are informational and MUST NOT mark an intent paid.
4. The Paymob adapter MUST use the exact HMAC signature contract documented for the configured Paymob integration at implementation time. The implementation MUST specify the signed fields, their canonical order/encoding, digest algorithm, character encoding, and secret version from authoritative provider documentation and approved fixtures. It MUST NOT guess field ordering or accept alternate unsigned representations.
5. Webhook validation MUST happen before a provider event can cause business state changes. It MUST reject missing/invalid signatures, malformed or oversized payloads, wrong merchant/account, unknown intent, mismatched provider transaction, amount or currency, and event types outside the supported contract. Comparison MUST use a constant-time method where applicable. Verification secrets MUST be server-only and support rotation.
6. A valid provider capture/settlement event is the only event that may move an intent to `succeeded` and fund escrow. Client redirects, browser callbacks, unverified API responses, and audit log entries are not settlement evidence.

### 3.3 Provider event inbox, idempotency, and replay protection

1. Every webhook delivery MUST be recorded in a durable `provider_events_inbox` before or atomically with processing. The record MUST include provider, provider event ID, received timestamp, signature-verification result/version, payload hash, normalized event type, associated internal intent when known, processing state, and a minimized/redacted payload representation sufficient for audit and recovery.
2. The database MUST enforce uniqueness for `(provider, provider_event_id)`. Provider transaction IDs and internal intent settlement operations MUST also have unique/idempotency constraints appropriate to the provider contract.
3. Signature verification MUST precede application of provider data. Invalid events MUST NOT update a payment intent, escrow, wallet projection, or ledger. Security-relevant rejection metadata may be recorded without retaining unnecessary personal or payment data.
4. An identical repeat event (same provider/event ID and payload hash) MUST be recognized as a replay and MUST NOT repeat side effects. It may receive the provider's documented success acknowledgement only after the original event is durably accepted. Reuse of an event ID with a different hash MUST be rejected, audited as a security conflict, and escalated.
5. Out-of-order events MUST NOT regress a terminal or more advanced internal state. Transitions MUST be checked against the current state under a transaction/lock. Unknown or contradictory events MUST be quarantined for reconciliation, not applied heuristically.
6. Inbox receipt, intent transition, escrow funding, ledger posting, and creation of notification/outbox work MUST be atomic where they form one settlement. External email/notification failures MUST NOT roll back or repeat financial settlement.
7. Webhook acknowledgement MUST follow durable processing or durable queuing. Transient processing failure MUST allow safe retry; permanent invalidity MUST not be reported as a successful settlement.

### 3.4 Escrow lifecycle and custody

The allowed escrow states are exactly:

`initiated`, `funded`, `delivery_submitted`, `approved`, `released`, `refunded`, `disputed`.

The allowed transition graph is:

```text
initiated ── verified provider capture ──> funded
funded ── freelancer submits delivery ──> delivery_submitted
funded ── authorized dispute ───────────> disputed
funded ── authorized refund ────────────> refunded
delivery_submitted ── client approval ──> approved
delivery_submitted ── authorized dispute ─> disputed
approved ── atomic release command ─────> released
approved ── authorized dispute/refund ──> disputed / refunded
disputed ── resolution: client refund ──> refunded
disputed ── resolution: release ────────> released
```

1. `initiated` is a payment/escrow record without custody or spendable funds. No amount may be shown as funded, held, available, or withdrawable in this state.
2. `funded` MUST be entered only by the verified, idempotent provider settlement command after capture evidence matches the intent's amount and currency. Escrow funding and its ledger postings MUST commit atomically.
3. Delivery submission, client approval, dispute, refund, and release MUST be authorized commands with actor, resource ownership/capability, current-state precondition, reason/evidence where applicable, and idempotency key. A direct status update is prohibited.
4. `released` and `refunded` are terminal for the escrow record. Post-release chargebacks, corrections, or recovery MUST be recorded as separate provider events, dispute/recovery records, and compensating ledger entries; history MUST NOT be rewritten or the escrow silently reopened.
5. A refund MUST be reflected only after the provider confirms refund/void settlement, or through an explicitly modeled payable/refund-in-flight state in the payment-intent contract. A local request or button press is not proof of returned funds.
6. Every transition MUST map to ledger postings and audit evidence. Notifications are outbox side effects and cannot themselves transfer or release funds.

### 3.5 Append-only ledger and non-negative balances

1. The canonical ledger MUST be append-only and double-entry. Each journal transaction MUST balance debits and credits within the same currency (`sum(debits) = sum(credits)`) and reference the originating payment intent, provider event, escrow command, refund, payout, or approved adjustment.
2. Posted ledger entries MUST NOT be updated or deleted by application roles, service roles, maintenance jobs, or ordinary administrative paths. Corrections MUST use new, linked reversing/compensating entries that preserve the original record.
3. All ledger amounts MUST use integer minor units and explicit currency. The schema MUST enforce valid sign/account semantics and a supported posting type. Metadata MUST NOT be authoritative for balance, amount, or settlement state.
4. User-available and escrow-reserved balances MUST never become negative. Before a reservation, release, refund, or payout, the authoritative available amount MUST be checked and reduced/reserved atomically under appropriate row/account locking or serializable transaction semantics. Concurrent requests MUST not both spend the same funds.
5. A mutable wallet balance, cached projection, UI value, or sum of mutable escrow status rows MUST NOT be the accounting source of truth. Any balance projection MUST be rebuildable/reconcilable from immutable ledger entries and updated atomically with postings.
6. Fees, taxes, refunds, reversals, chargebacks, and payouts MUST have explicit accounts and posting rules. If an external chargeback exceeds a user's remaining funds, the implementation MUST record an approved platform receivable/risk-loss treatment; it MUST NOT create a negative user-available balance or erase the original posting.
7. Only narrow, audited server/database commands may post financial entries. A general `service_role` credential MUST NOT be used as an unrestricted ledger writer. Client roles MUST have no direct insert/update/delete privileges over intents, provider inbox, escrow settlement state, payout state, or ledger entries; database-level constraints/commands MUST preserve the ledger invariants even when application authorization is bypassed.

### 3.6 Payouts, refunds, reconciliation, and audit

1. Withdrawal requests MUST reserve no more than the user's available ledger balance, exactly once. Approval MUST not itself claim that money was transferred.
2. Payout processing MUST have an idempotent provider request/reference and explicit request, approval, processing, settled, failed, and reversal evidence. High-risk or above-threshold payouts SHOULD use independent two-person (four-eyes) approval according to a finance-approved threshold policy.
3. A provider payout success event MUST produce the corresponding ledger postings exactly once. Failed or reversed payouts MUST restore availability using compensating postings, not edits.
4. Refunds and chargebacks MUST reference the original intent/settlement and provider evidence. Reconciliation MUST compare internal intents, inbox events, provider settlements/refunds, escrow states, and ledger totals; unresolved differences MUST be observable and escalated.
5. Audit records MUST identify the authenticated actor or provider event, operation, resource, prior/next state, amount/currency, policy version, and correlation/idempotency identifiers. Sensitive provider payloads, credentials, card data, and unnecessary personal data MUST NOT be logged.

## 4. Security, privacy, and operational consequences

- Payment and escrow commands are security boundaries. UI controls, callbacks, RLS alone, or an `account_type` claim do not authorize a financial transition.
- Provider credentials and HMAC secrets remain server-only, are rotated through the approved secret-management process, and are never placed in source, client bundles, audit payloads, or this ADR.
- Payment card data MUST remain with the provider; the platform stores provider references and minimum settlement evidence, not PAN/CVV.
- Provider event retention, payload minimization, finance record retention, dispute evidence, and legal holds require an approved retention schedule.
- Operations MUST monitor signature failures, replay conflicts, event-processing lag, stuck intents, escrow/ledger mismatches, negative-balance prevention conflicts, payout failures, and reconciliation differences.
- Paymob checkout and webhooks, and PayPal webhooks, MUST remain disabled or return a safe unavailable response until the complete contract, provider documentation, sandbox evidence, and owner approvals are in place.

## 5. Alternatives considered

- Accepting amount/status from the browser: rejected because client input is tamperable.
- Marking escrow funded when creating an order or on provider redirect: rejected because neither establishes settled funds.
- Updating wallet/ledger balances in place: rejected because it destroys auditability and permits concurrent double-spend.
- Applying webhook events directly without an inbox: rejected because retries and out-of-order delivery can duplicate or regress settlement.
- Treating provider webhook HTTP 200 as successful processing: rejected because acknowledgement is not settlement evidence.
- Keeping Paymob and finance meanings under the existing KYC ADR-004/ADR-005 IDs: rejected because those IDs already have canonical KYC decisions; ADR-014 is the dedicated finance identifier.

## 6. Rollback and compensation

No rollback may delete or rewrite settled financial history. If a provider integration or command is unsafe, disable new intent creation and event application while preserving inbox, intent, escrow, and ledger evidence. Resolve already accepted events through reviewed forward compensations and provider reconciliation. Restore availability only through new balanced, linked postings. Never expose a secret, mark an unverified payment as settled, or make an escrow/wallet balance editable as a recovery shortcut.

## 7. Implementation acceptance criteria

Before any real-money enablement, implementation review MUST demonstrate at least:

1. Client amount tampering, wrong owner, wrong service/job state, stale quote, currency mismatch, and unauthorized fee/discount changes are rejected.
2. Exact minor-unit conversions and approved rounding pass boundary/property tests, including large values and currency exponents.
3. Valid Paymob signature is accepted; missing, malformed, altered-payload, wrong-account, wrong-amount/currency, and invalid signatures are rejected using provider-approved fixtures.
4. Repeated identical provider events settle once; duplicate ID with different hash is quarantined; out-of-order and concurrent callbacks do not duplicate or regress states.
5. Provider capture, escrow funding, balanced ledger postings, and outbox enqueue are atomic and retry-safe.
6. Invalid escrow transitions, unauthorized actor/resource pairs, repeated refunds/releases, and post-terminal mutation are rejected.
7. Ledger update/delete attempts fail at the database boundary; each journal balances by currency; reversals preserve original entries.
8. Concurrent payouts/reservations cannot spend the same funds or make available balance negative; payout provider failure/reversal restores funds by compensating entries.
9. Reconciliation detects missing, duplicate, mismatched, delayed, refunded, and charged-back provider events without exposing secrets or unnecessary PII.
10. Local replay and tests use an approved disposable database; any remote read-only verification, migration application, provider sandbox operation, or deployment receives its own explicit authorization.

## 8. Approval and implementation status

The architecture rules above are approved by the task owner for ADR-014. Physical table definitions, exact pricing/tax/FX policies, payout thresholds, provider event canonicalization fixtures, retention periods, migration sequence, implementation, tests, sandbox use, and production enablement remain pending review by finance/accounting, product, security, privacy/legal, schema, and operations owners as applicable.

**This ADR authorizes documentation of the architecture only. It does not authorize application code changes, schema/migration creation or execution, RLS/grant/function/trigger changes, Paymob/PayPal configuration, credential handling, sandbox charges/refunds, production access, tests, or deployment.**

## 9. References

- `docs/adr/ADR-001-schema-and-access-contract.md` — schema authority and the existing ADR-004/ADR-005 KYC decisions.
- `artifacts/handoffs/P0-FINANCE-PAYMOB-AUDIT.md` — read-only repository evidence and current gap register.
- `artifacts/handoffs/P0-ADR-REVIEW-AND-APPROVAL.md` — approved ADR-001 through ADR-005 scope and implementation gates.
- `docs/MCOS_MASTER_BRAIN_V3_PROPOSAL.md` — non-canonical finance proposal; context only, not implementation or schema evidence.
