# Feature: Dual Entity Engine & Escrow (F-011)

## 1. The Core Problem
تجنب فرض ضرائب معقدة (E-Invoice) على المستقلين، مع توفيرها للشركات.

## 2. Engineering Solution
- **Escrow Logic**: يتم حجز الأموال في جدول `escrow_accounts`. المنصة تأخذ رسوم معالجة فقط.
- **Corporate Logic**: إذا كان حساب المستخدم `role === 'studio'`، يتم استدعاء (Tax API) لإصدار فاتورة إلكترونية رسمية وتخزينها في `finance_transactions`.
- **Code Reference**: تم إنشاء `src/lib/escrow.ts` للتحكم في دورة حياة المال (Held -> Released -> Refunded).
