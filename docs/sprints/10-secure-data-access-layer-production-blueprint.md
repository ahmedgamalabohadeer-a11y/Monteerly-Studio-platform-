# Feature: Secure Data Access Layer (F-010 – RLS & Policies)

<metadata>
- Feature ID: F-010
- Status: Planned
- Owner: Security & Governance Layer
- Depends on: F-003, F-004, F-005, F-007 v2, F-008, F-009
</metadata>

## 1. Objective

رفع مستوى أمان البيانات في Monteerly Studio من خلال:

- تفعيل Row Level Security (RLS) على الجداول الحساسة.
- تعريف سياسات وصول (Policies) واضحة قابلة للتوسّع لاحقاً مع تعدد المستخدمين.
- الحفاظ على بساطة التنفيذ الحالية (مستخدم واحد / نظام واحد) بدون تعقيد زائد.

## 2. Scope (v1)

يشمل الإصدار الأول من F-010:

- تفعيل RLS على الجداول:
  - employees
  - finance_transactions
  - contracts
  - contract_revisions
  - audit_logs
- تعريف سياسة افتراضية:
  - السماح حالياً لكل الطلبات القادمة من Service Role أو Backend (Next.js Server) بالقراءة والكتابة، مع تقييد أي وصول عميل مباشر (Client-side) إن وجد.
- عدم بناء نظام Roles معقد في هذه المرحلة، فقط تجهيز البنية.

## 3. Design Principles

- Keep It Ready, Not Over-Engineered:
  - النظام الآن مستخدم من جهة واحدة (المدير/الخادم)، لكن يجب أن يكون RLS مفعلاً منذ اليوم الأول.
- Server-Only Access:
  - كل العمليات على الجداول الحساسة يجب أن تمر عبر Server Actions أو Backend، وليس Public Keys.
- Future-Ready:
  - السياسات تصمم بحيث يمكن لاحقاً إضافة عمود مثل `owner_id` أو `organization_id` بدون إعادة تصميم كامل.

## 4. Target Tables

1. employees
2. finance_transactions
3. contracts
4. contract_revisions
5. audit_logs

## 5. Policy Sketch (High-Level)

- قاعدة عامة (الآن):
  - السماح لكل الاستعلامات القادمة باستخدام المفتاح السري (service role) من الخادم.
  - منع أي وصول مجهول أو public من الـ client.

- مثال سياسة (Conceptual):
  - employees:
    - policy: "server_can_manage_employees"
    - USING: true
    - WITH CHECK: true

(يتم تنفيذ التفاصيل في SQL Migration منفصل حسب إعداد Supabase الحالي)

## 6. Non-Goals (Out of Scope)

- لا يشمل هذه النسخة:
  - تصميم نظام Roles/Permissions كامل.
  - ربط المستخدمين بجداول مثل employees أو contracts.
- هذا سيتم تناوله في ميزة لاحقة بعد F-010 وF-011.

