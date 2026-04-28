# Feature: Executive Ops Monitoring Dashboard
<metadata>
- **Feature ID**: F-006
- **Status**: Approved
- **Created at**: 2026-04-28
- **Owner**: Ahmed Gamal
- **Linked Sprint**: Sprint-02
- **Deployment Target**: Vercel
</metadata>

## Section 0 – Feature Brief
- **الهدف التجاري**: توفير شاشة موحدة للمدير التنفيذي تعرض مؤشرات الأداء الرئيسية (KPIs) لمراقبة نبض المؤسسة مالياً وإدارياً وأمنياً في مكان واحد.
- **المكونات المرتبطة**: 
  1. HR (إحصائيات القوى العاملة).
  2. Finance (التدفقات النقدية).
  3. Guardian (سجل التنبيهات الأمنية).
- **نطاق العمل**: (MVP) عرض الخلاصة الإحصائية مع روابط وصول سريع.

## Section 1 – Read-Only Audit
- [x] تم التأكد من استقرار وحدات HR و Finance.
- [x] تم فحص قدرة Guardian على إرسال مستويات المخاطرة للوحة التحكم.

## Section 2 – Surgical Execution
- **Layout**: Bento Grid (4 صناديق علوية + جدولين عرضيين للعمليات الأخيرة).
- **Tech Stack**: Next.js 16 Server Components لجلب البيانات المجمعة (Aggregated Data) من جداول Supabase المتعددة في طلب واحد.
