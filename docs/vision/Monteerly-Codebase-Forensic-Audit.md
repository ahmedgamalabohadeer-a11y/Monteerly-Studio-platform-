# Monteerly Codebase Forensic Audit (v1.2 – Post-Governance Sprint)

## 0. Scope (النطاق)
هذا المستند يفحص الكود الحالي لمستودع `Monteerly-Studio-platform-` كما هو على فرع `main` بعد تنفيذ:
- نظام التدقيق المركزي (F-009 – Global Audit Logs).
- ترقية نظام العقود إلى إدارة نسخ (F-007 v2 – Contract Versioning).

ويقارنه مع:
- `docs/vision/Monteerly-Platform-Ultimate-Blueprint.md` (نتاج العقل التحليلي AI Core).
- `docs/vision/Monteerly-Enterprise-System-Design.md` (التصميم المؤسسي F-008).

**أهداف التدقيق (محدّثة):**
- توثيق الوحدات المنفذة فعلياً في الكود (As-Is State).
- تقييم حالة طبقة التشغيل (Termux + Monteerly CLI + AI Core).
- مراجعة مستوى الحوكمة والأمان بعد إضافة Audit Logs وContract Versioning.
- تحديد أولويات السبرينت القادمة (RLS, Settings, Advanced Executive KPIs).

---

## 1. Folders & Structure (High-Level Analysis)

الهيكل العام للمشروع ما زال يعكس معمارية (MCOS) بشكل دقيق:

- `src/app/[locale]/` **(طبقة العرض والعمليات - Presentation & Application)**
  - `hr/`: لوحة الموارد البشرية (UI + Server Actions).
  - `finance/`: العمليات المالية (UI + Server Actions + Guardian Integration).
  - `contracts/`: إدارة العقود + النسخ (UI + Server Actions لـ addContract و addContractRevision).
  - `executive/`: غرفة القيادة (Aggregated UI + Audit Logs Overview).
  - `api/db-health/`: مسار فحص الاتصال بقاعدة البيانات.

- `src/lib/` **(طبقة السياسات والاتصال - Domain & Data)**
  - `supabase.ts`: محرك الاتصال الآمن (Supabase Client).
  - `guardian.ts`: العقل الرقابي لفلترة العمليات المالية (Rules Engine).
  - `audit.ts`: طبقة التدقيق الموحدة (Global Audit Logging Helper).

- `docs/` **(طبقة الرؤية والحوكمة - Vision Engine)**
  - `sprints/`: مخططات إنتاجية (F-003..F-007 + F-009 + F-007 v2).
  - `vision/`: الدستور التقني، المخطط الشامل (Ultimate)، التصميم المؤسسي (F-008)، وتقرير التدقيق الحالي.

- `tools/` **(طبقة التشغيل - Ops Engine)**
  - `monteerly.sh`: الأداة السيادية (CLI).
  - `new_feature_blueprint.sh` & `list_blueprints.sh`: أدوات أتمتة دورة التطوير.
  - `refresh_brain.sh`: تجديد الـ Ultimate Blueprint وربطه بالريبو.
  - `gen_file.py`: أداة بناء ملفات من stdin (MCOS Scaffold).

- `~/monteerly_ai_core/` **(طبقة الذكاء الخارجي - Offline AI)**
  - `ultimate_builder.py`: محرك قراءة الـ PDF/Word واستخراج المعرفة المؤسسية.

---

## 2. Implemented Modules (الوحدات المنفذة – حالة ما بعد الحوكمة)

### 2.1 HR Module (F-003)
- **الواجهة**: `/[locale]/hr` (نمط Bento Grid).
- **الحالة**: LIVE (MVP).
- **الوظائف الحالية**:
  - عرض إجمالي الموظفين ورواتبهم.
  - إضافة موظف جديد عبر Server Action إلى جدول `employees`.
  - تسجيل كل عملية إضافة موظف في جدول `audit_logs` كـ `created_employee`.
- **فجوات التدقيق (Audit Gaps)**:
  - لا يوجد بعد Validation قوي للمدخلات (مثل Zod).
  - لا يظهر ارتباط الموظف بعقوده القانونية (Foreign Key UI).

### 2.2 Finance Module (F-004 + Guardian F-005)
- **الواجهة**: `/[locale]/finance`.
- **الحالة**: LIVE (MVP).
- **الوظائف الحالية**:
  - إضافة معاملات مالية (وارد/صادر) إلى `finance_transactions`.
  - استدعاء Guardian AI قبل الحفظ في قاعدة البيانات.
  - تسجيل:
    - العمليات المحظورة عاليًا كـ `blocked_transaction` في `audit_logs`.
    - العمليات المقبولة كـ `created_transaction` في `audit_logs`.
- **فجوات التدقيق (Audit Gaps)**:
  - لا يوجد بعد نظام تقارير زمنية (شهري/سنوي).
  - Thresholds الخاصة بـ Guardian ما زالت Hardcoded (يجب نقلها إلى Settings).

### 2.3 Guardian AI (F-005)
- **الموقع**: `src/lib/guardian.ts`.
- **الحالة**: LIVE (Logic-based).
- **الوظائف**:
  - حظر المبالغ غير المنطقية (<= 0).
  - رفع تنبيه `high risk` للمبالغ الضخمة (> Threshold).
- **فجوات التدقيق (Audit Gaps)**:
  - الاعتماد على أرقام ثابتة في الكود، وليس إعدادات ديناميكية.
  - لا يوجد بعد تكامل مع Legal Text Analysis.

### 2.4 Contracts / Legal Module (F-007 v2)
- **الواجهة**: `/[locale]/contracts`.
- **الحالة**: LIVE (v2 – مع Versioning).
- **الوظائف الحالية**:
  - تأسيس عقد جديد (title, contract_type, status).
  - إدارة رقم النسخة الحالية في حقل `current_version`.
  - إنشاء نسخ تعديل جديدة عبر `addContractRevision`:
    - قراءة `current_version`.
    - إضافة صف في `contract_revisions` مع `version_number = current_version + 1`.
    - تحديث العقد الرئيسي بالنسخة الجديدة.
    - تسجيل الحدث في `audit_logs` كـ `created_contract_revision`.
  - واجهة UI تعرض:
    - نموذج تأسيس عقد (V1).
    - نموذج إصدار نسخة جديدة من عقد قائم.
    - قائمة بأحدث التعديلات (revisions) مع رقم النسخة وملخص التعديل.
    - سجل العقود السيادي مع رقم النسخة الحالي لكل عقد.
- **حالة الفجوات (محدّثة)**:
  - تم إغلاق الفجوة السابقة الخاصة بعدم وجود Versioning UI.
  - ما زال Workflow حالة العقد (Draft → Under Review → Signed) بدائيًا ويمكن تطويره لاحقًا.

### 2.5 Executive Monitoring (F-006 – بعد ربط Audit & Legal)
- **الواجهة**: `/[locale]/executive`.
- **الحالة**: LIVE (Aggregated View + Audit Snapshot).
- **الوظائف الحالية**:
  - عرض صافي التدفق النقدي (Income - Expenses).
  - عرض عدد تنبيهات Guardian عالية الخطورة.
  - عرض عدد الموظفين / العقود.
  - عرض “نبض المنصة” عبر آخر عدة عمليات من جدول `audit_logs` (module, action, created_at).
- **تحسّن عن v1.1**:
  - أصبحت غرفة التنفيذ ترى الآن حركة HR + Finance + Legal من خلال Audit Logs، وليس فقط أرقام مالية أو HR.

---

## 3. Ops & CLI Scripts (محرك التشغيل)

- **Monteerly CLI (`tools/monteerly.sh`)**
  - **الأوامر المتاحة**: `init`, `build F-XXX`, `sync`, `audit`.
  - **التقييم**: مستقر ومفيد للعمل اليومي، لكنه ما زال غير متصل مباشرة بـ:
    - Ultimate Blueprint (لا يوجد أمر مثل `monteerly brain`).
    - تقارير التدقيق (لا يوجد أمر مثل `monteerly report audit`).

- **AI Core (`ultimate_builder.py` + `refresh_brain.sh`)**
  - محرك فعال لتجميع المعرفة المؤسسية وكتابة Ultimate Blueprint إلى الريبو.
  - لديه الآن سكربت Auto-refresh (`tools/refresh_brain.sh`) يربط:
    - /sdcard/Download → monteerly_source → ultimate_builder → docs/vision/Ultimate Blueprint.

---

## 4. Coverage vs. Design (تحليل التغطية – محدث)

بالمقارنة مع التصميم المؤسسي F-008:

- **Presentation Layer**: ممتازة.
  - HR, Finance, Contracts, Executive مبنية على نمط Bento UI موجه للإدارة.

- **Application Layer (Modules)**: قوية نسبيًا.
  - HR, Finance, Guardian, Executive, Contracts (v2) مفعّلة.
  - Legal Module أصبح يدعم Versioning حقيقي.

- **Domain Layer**: في مرحلة انتقالية.
  - Guardian AI منظم في lib.
  - Audit Logging أصبح طبقة Domain/Policy واضحة في `audit.ts`.
  - ما زلنا نحتاج إلى:
    - Policy أو Service Layer لـ HR (مثلاً: سياسات الحد الأقصى للرواتب).
    - Policy لـ Legal (حالة العقد، شروط التوقيع…).

- **Data Layer**: جيدة مع ملاحظات:
  - الجداول الأساسية موجودة:
    - employees, finance_transactions, contracts, contract_revisions, audit_logs.
  - ينقصها حتى الآن:
    - تطبيق RLS فعلي على الجداول الحساسة.
    - جدول Settings لتخزين Config ديناميكي (خاصة Guardian Thresholds).

- **Security & Governance Layer**: تحسّن من “ضعيفة” إلى “متوسطة – مع Logs & Legal Versioning”.
  - نقاط قوة:
    - وجود سجل تدقيق مركزي audit_logs.
    - وجود Versioning للعقود مع تسجيل في Logs.
    - عرض مختصر لحركة التدقيق من خلال Executive Dashboard.
  - نقاط ضعف:
    - عدم وجود RLS حتى الآن.
    - عدم وجود نظام Roles/Permissions.
    - إعدادات Guardian وغيرها ما زالت معرّفة داخل الكود نفسه.

---

## 5. Gaps & Next Priorities (خارطة الطريق بعد v1.2)

بناءً على التطورات الأخيرة، تم تعديل قائمة الفجوات والأولويات كما يلي:

### 🔴 الأولوية الأمنية (Security – High Priority)
1. **تفعيل RLS وسياسات الوصول (F-010 – Secure Data Access Layer)**:
   - تفعيل Row Level Security على:
     - employees
     - finance_transactions
     - contracts
     - contract_revisions
     - audit_logs
   - تعريف سياسات قراءة/كتابة مناسبة (حتى لو كان هناك مستخدم واحد الآن، يُجهّز النظام للمستقبل).
   - الهدف: رفع مستوى الأمان المؤسسي ومنع أي تسرب بيانات في حال تعدد المستخدمين لاحقاً.

### 🟠 الأولوية الحَوْكميّة (Governance – Config & Settings)
2. **نقل إعدادات Guardian وغيرها إلى جدول Settings (F-011 – Centralized Config)**:
   - إنشاء جدول settings أو config:
     - مفاتيح مثل: guardian_high_risk_threshold, guardian_min_amount, feature_flags.
   - تعديل guardian.ts ليقرأ من هذه الإعدادات بدلاً من الأرقام الثابتة.
   - الهدف: جعل السياسات قابلة للتعديل من الإدارة دون تعديل الكود.

### 🟡 الأولوية التنفيذية (Executive Insight – Enhancement)
3. **تقوية Executive Dashboard بمؤشرات إضافية (F-006 v2)**:
   - إضافة:
     - عدد العقود النشطة/المنتهية/تحت المراجعة.
     - عدد عمليات التدقيق خلال آخر فترة (مثلاً 24 ساعة).
   - هدف: إعطاء المدير التنفيذي صورة أقرب لـ “Real-time cockpit”.

---

## 6. ملاحظة ختامية (v1.2)

تقرير v1.2 يعكس مرحلة “ما بعد” تنفيذ Sprint الحوكمة الأولى (Audit Logs + Contract Versioning + Executive Audit View).  
المرحلة القادمة المنطقية، من منظور هندسي/أمني، هي:

- تأمين الطبقة البيانية (RLS).  
- مركزية الإعدادات السيادية (Settings).  
- تعميق رؤية الإدارة التنفيذية عبر Dashboard أكثر ثراءً.

