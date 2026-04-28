# Feature: Finance Management Bento Dashboard
<metadata>
- **Feature ID**: F-004
- **Status**: Approved
- **Created at**: 2026-04-28
- **Owner**: Ahmed Gamal
- **Linked Sprint**: Sprint-02
- **Deployment Target**: Vercel
</metadata>

## Section 0 – Feature Brief
- **Business Goal**: أتمتة تتبع التدفقات النقدية (وارد/صادر) مع تحليل فوري للميزانية.
- **Dependencies**: Supabase (finance_transactions), Next.js Server Actions.
- **Primary Risks**: دقة البيانات المالية (التحقق من المدخلات الرقمية).

## Section 1 – Read-Only Audit
- [x] جدول `finance_transactions` جاهز في قاعدة البيانات.
- [x] تم اختبار سرعة الاستجابة لاتصال Supabase.

## Section 2 – Surgical Execution
- **UI Logic**: استخدام 3 بطاقات علوية للمؤشرات (إجمالي الدخل، إجمالي المصروفات، صافي الربح).
- **Security**: فلترة المدخلات عبر Server Actions لمنع التلاعب بالأرقام.
