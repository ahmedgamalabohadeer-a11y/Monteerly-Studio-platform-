# Feature Update: Contract Versioning System (F-007 v2)

<metadata>
- **Feature ID**: F-007 (v2 Upgrade)
- **Status**: Executing
- **Owner**: Legal Engine
</metadata>

## 1. Objective
إضافة خاصية "إدارة النسخ" (Versioning) لتتبع أي تعديل يطرأ على العقود الحالية دون حذف الأصل، مع تسجيل ذلك في سجل التدقيق (Audit Logs).

## 2. Surgical Execution
- **Actions**: إضافة دالة `addContractRevision` في `contracts/actions.ts`. ستقوم بـ:
  1. قراءة رقم النسخة الحالية (`current_version`) من جدول `contracts`.
  2. إضافة صف جديد في `contract_revisions` مع رقم (النسخة + 1).
  3. تحديث جدول `contracts` بالنسخة الجديدة.
  4. تسجيل العملية في `audit_logs` كـ `created_contract_revision`.
- **UI**: إضافة صندوق (Bento Card) جديد في `contracts/page.tsx` لاختيار العقد وإضافة التعديل.
