# Feature: Global Audit Logging System (F-009)

<metadata>
- Feature ID: F-009
- Status: Planned
- Owner: Executive & Governance Layer
- Depends on: F-003 (HR), F-004 (Finance), F-005 (Guardian), F-007 (Contracts), F-008 (Enterprise Design)
</metadata>

## 1. Objective

إنشاء نظام تدقيق مركزي (Global Audit Logs) يسجل كل العمليات الحساسة داخل المنصة (HR, Finance, Legal)، بحيث يمكن:

- معرفة "من قام بماذا ومتى" عبر جدول موحّد `audit_logs`.
- تمكين الإدارة التنفيذية من مراجعة الأنشطة من لوحة واحدة.
- دعم التدقيق المالي والقانوني (Forensic Audit) مستقبلاً.

## 2. Scope

يشمل الإصدار الأول (v1):

- تصميم وتنفيذ جدول `audit_logs` في Supabase.
- إضافة تسجيل تلقائي (Auto Logging) للعمليات التالية:
  - إضافة موظف جديد في HR.
  - إضافة معاملة مالية جديدة في Finance (بعد Guardian).
  - إضافة عقد جديد في Contracts.
- إتاحة قراءة ملخص من `audit_logs` في Executive Dashboard (عدد آخر العمليات).

## 3. Data Model – audit_logs Table (High Level)

الجدول المقترح:

- id (UUID, PK)
- actor_type (TEXT) – system, user, agent
- actor_identifier (TEXT) – مثلاً: "server_action:hr/addEmployee"
- action (TEXT) – created_employee, created_transaction, created_contract
- module (TEXT) – hr, finance, contracts
- entity_id (TEXT) – id الموظف أو المعاملة أو العقد
- payload_snapshot (JSONB) – نسخة مصغّرة من البيانات (بدون أسرار)
- created_at (TIMESTAMP WITH TIME ZONE, default now())

## 4. Logging Contract – Pattern

كل Server Action مستهدف يجب أن يلتزم بالآتي:

1. تنفيذ العملية الأساسية (إدخال في employees / finance_transactions / contracts).
2. بعد نجاح العملية، استدعاء دالة `logAuditEvent(...)` بإرسال:
   - module
   - action
   - entity_id
   - payload_snapshot (مختصر)

## 5. Executive Consumption (v1)

في `/[locale]/executive`:

- إضافة Card جديدة:
  - العنوان: "سجل التدقيق (آخر 7 عمليات)"
  - المحتوى: عرض آخر 7 صفوف من `audit_logs` (module, action, created_at).

## 6. Non-Goals (Out of Scope for v1)

- لا يشمل نظام صلاحيات متقدم (Roles) في هذه المرحلة.
- لا يشمل بحث معقد أو تصفية حسب المستخدم (يتم إضافتها في v2).
- لا يشمل الآن ربطًا كاملاً مع Legal Engine أو تحليل نصوص العقود.

