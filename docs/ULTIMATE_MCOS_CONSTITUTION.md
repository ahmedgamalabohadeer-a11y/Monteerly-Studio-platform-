# 🏛️ ULTIMATE MCOS CONSTITUTION (الدستور التنفيذي المطلق v6.4)

## 🧠 المرجع الرئيسي الموحد
- المصدر الرسمي: `/home/ahmed/projects/Monteerly-Studio-platform-/.docs/monteerly_unified_executive_document.md`
- SHA256: `29bfaaba1c2f6321402fd62169cd16c49445d3d5423de8652bcb09b1a4da7fd1`
- Generator Version: `mcos_ultimate_brain_v6.4`
- Script SHA256: `707e4e4b6d180d35740f338afc9e9f35d8a75e32c05de727e2f09120d15e05da`

## 📜 مقتطف المرجع التنفيذي الموحد

# الوثيقة التنفيذية النهائية الموحدة — Monteerly OS

هذه الوثيقة هي المرجع التنفيذي النهائي الموحد لمنصة Monteerly OS بعد دمج ملف العقل الرئيسي، إضافات الصور، دستور العبارات الاحترافية، طرق الدفع الرسمية، وخطة التخزين السحابي، مع ربط الصور الفعلية الموجودة داخل المشروع الحالي بأماكن استخدامها داخل جميع صفحات المنصة.

## 1. تعريف المنصة النهائي

Monteerly OS هو نظام تشغيل إبداعي سيادي لإدارة دورة حياة الأصل الإبداعي في العالم العربي، من الفكرة والكتابة والتصوير والمونتاج والمراجعة، إلى التعاقد والدفع والاستشارات والأرشفة وإدارة الحقوق.

المكونات الرئيسية المعتمدة رسميًا:

- Monteerly Studio: استوديو مراجعة فيديو سحابي مع مراجعة دقيقة للإطارات، تعليقات زمنية، مقارنة نسخ، ومراجعات مباشرة.
- Talent & Job Marketplace: سوق للمواهب والمشاريع مع محرك مطابقة ذكي ونظام تلعيب.
- Stock Footage Library: مكتبة أصول مرئية بتراخيص واضحة ونظام Credits.
- Financial Engine: Wallet + Escrow + Transactions + Payouts.
- Iron Dome / Guardian: طبقة الأمن والمنع والكشف والتدقيق.
- Academy & Community: التدريب، المجتمع، التحديات، والتلعيب.
- Agencies & Enterprise Layer: طبقة الوكالات والمؤسسات مع RBAC وتقارير مركزية.
- Agent Mesh Layer: وكلاء ذكاء اصطناعي تشغيليون داخل المنتج.

## 2. طرق الدفع الرسمية المعتمدة

يُعتمد داخل المنصة هذا الترتيب فقط لطرق الدفع، دون إضافة أي مزود آخر في الوثيقة التنفيذية الحالية:

1. Paymob.
- Visa / MasterCard.
- فوري.
- محافظ المحمول.
- Apple Pay.

2. PayPal كخيار إضافي للعملاء الدوليين.

ويجب أن تنعكس هذه الحقيقة في كل صفحات التسعير، الـ checkout، الأسئلة الشائعة، وواجهات المحفظة، مع عدم ذكر Stripe أو أي بدائل أخرى داخل النصوص الرسمية الحالية.

## 3. الخطة الكاملة للتخزين السحابي

### 3.1 الهدف المعماري

خطة التخزين السحابي في Monteerly يجب أن تدعم وسائط كثيفة، مراجعات آمنة، تسليمات نهائية، وثائق قانونية، وأصول مكتبة قابلة للترخيص، مع الفصل الواضح بين الملفات الخام، ملفات المعاينة، والملفات النهائية.

### 3.2 مزود التخزين

يعتمد التصور الرسمي على AWS S3 أو Cloudflare R2، مع تفضيل R2 عند الحاجة لتقليل تكلفة الـ egress بسبب كثافة الوسائط داخل المنصة.

### 3.3 المبادئ الأساسية

- كل رفع يتم عبر Presigned URLs قصيرة العمر.
- الوصول للملفات الحساسة لا يكون Public مباشرًا.
- ملفات الاستوديو تستخدم نسخ Proxy/Review للوصول السريع.
- الملفات القانونية تخزن بتشفير صارم ومراقبة وصول دقيقة.
- الأصول المخصصة للمكتبة ترتبط بنظام ترخيص وحقوق استخدام واضح.
- كل ملف مهم يجب أن يملك metadata، owner، project_id أو asset_id، وretention policy.

### 3.4 بنية الـ Buckets الرسمية

| Bucket | الغرض | نوع الوصول | دورة الحياة | ملاحظات |
|---|---|---|---|---|
| `project-raw-uploads` | الملفات الخام الأصلية الخاصة بالمشاريع | خاص | Active أثناء المشروع ثم Cold Archive | يشمل فيديو، صوت، صور، ملفات مشروع. |
| `project-review-renders` | نسخ المراجعة وProxy وملفات الـ preview | خاص/مقيّد | قصيرة إلى متوسطة | للاستخدام داخل Studio والمراجعة السريعة. |
| `project-final-deliveries` | التسليمات النهائية | خاص مع مشاركة محكومة | طويلة | ملفات التسليم النهائية المعتمدة. |
| `footage-library-source` | الأصول الأصلية للمكتبة | خاص | طويلة جدًا | تبقى طالما الترخيص أو المساهمة نشطة. |
| `footage-library-proxy` | معاينات المكتبة وwatermarked previews | عام محدود أو signed | طويلة | للعرض والشراء قبل تنزيل الأصل. |
| `documents-contracts-releases` | العقود، الـ NDA، الـ releases، والموافقات | شديد الخصوصية | طويلة جدًا | تشفير صارم وسجل وصول. |
| `finance-invoices-reports` | الفواتير، الكشوف، الصادرات المالية | خاص | حسب السياسة الضريبية | مرتبط بالـ wallet والـ finance admin. |
| `academy-course-assets` | ملفات الدورات التعليمية والمواد | خاص/محدود | طويلة | فيديوهات، PDFs، تمارين، thumbnails. |
| `community-media` | وسائط المجتمع والمنشورات | مقيّد | متوسطة | يخضع للمراقبة وسياسات المجتمع. |
| `security-evidence-locker` | أدلة النزاعات والحوادث | شديد الخصوصية | طويلة جدًا | write-once قدر الإمكان، وللوصول المقيد فقط. |
| `avatars-profiles` | صور المستخدمين والشركات | عام محدود/مُحكم | طويلة | للملفات الشخصية والوكالات. |
| `brand-marketing-assets` | الشعارات، صور الهبوط، التسويق | عام مضبوط | طويلة | أصول موقع المنصة والعلامة. |

### 3.5 سياسات الملفات حسب النوع

| النوع | الامتدادات | مكان التخزين | المعالجة |
|---|---|---|---|
| فيديو خام | mp4, mov, mxf, prores | `project-raw-uploads` | Transcode + proxy + metadata extraction. |
| فيديو مراجعة | mp4/hls proxy | `project-review-renders` | Watermark + adaptive playback. |
| تسليم نهائي | mp4, mov, zip | `project-final-deliveries` | checksum + approval lock. |
| صور مكتبة | jpg, png, webp, tiff | `footage-library-source` | previews + licensing metadata. |
| عقود ووثائق | pdf, docx | `documents-contracts-releases` | encrypted storage + audit log. |
| تقارير مالية | pdf, csv, xlsx | `finance-invoices-reports` | export + retention policy. |

### 3.6 الأمن والتشفير

- تشفير أثناء النقل عبر HTTPS/TLS.
- تشفير أثناء التخزين للملفات الحساسة.
- Watermarking وForensic Marking لملفات المراجعة الحساسة.
- ربط الروابط المشتركة بمدة صلاحية وصلاحيات واضحة.
- تسجيل كل وصول مهم في Audit Log.

### 3.7 دورة الحياة والاحتفاظ

- الملفات الخام: تبقى Active أثناء المشروع، ثم تنتقل إلى أرشفة باردة بعد الإغلاق حسب سياسة الباقة أو المؤسسة.
- ملفات المراجعة: يمكن حذفها أو ضغطها بعد التسليم النهائي مع الاحتفاظ بالنسخة المرجعية وسجل التعليقات.
- العقود والتقارير المالية: احتفاظ طويل وفق السياسات القانونية والضريبية.
- أدلة النزاعات: لا تُحذف إلا وفق قرار إداري موثق.

## 4. الصور الفعلية الموجودة داخل المشروع الحالي

بناءً على قائمة `find` التي أرفقتها، الصور الفعلية ذات القيمة التنفيذية داخل المشروع ليست صور `node_modules` أو `test-results` أو `.next cache`، بل الأصول الموجودة في `public/`، وهي التي يجب اعتمادها في الوثيقة التنفيذية والربط بها داخل الصفحات.

### 4.1 صور Monteerly الرئيسية

| الملف | المسار الفعلي داخل المشروع | الوصف التنفيذي |
|---|---|---|
| favicon | `./public/images/monteerly/monteerly_01_favicon_app_icon.png` | أيقونة التطبيق والهوية المصغرة. |
| logo | `./public/images/monteerly/monteerly_02_main_logo_full.svg` | الشعار الرئيسي للمنصة. |
| founder | `./public/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png` | صورة المؤسس/الرسالة الشخصية. |
| hero | `./public/images/monteerly/monteerly_04_hero_header_marketing_banner.png` | صورة الهيرو الرئيسية. |
| security | `./public/images/monteerly/monteerly_05_security_digital_lock_cyber.png` | أمان سيبراني/قفل رقمي. |
| showcase | `./public/images/monteerly/monteerly_06_marketing_showcase_full.png` | عرض تكاملي للمنصة. |
| tech | `./public/images/monteerly/monteerly_07_tech_innovation_portrait.png` | طابع تقني/ابتكاري. |
| brand-assets | `./public/images/monteerly/monteerly_08_branding_creative_assets.png` | إدارة أصول العلامة. |
| ai-advisor | `./public/images/monteerly/monteerly_09_ai_performance_advisor_hologram.png` | مستشار الأداء الذكي. |
| multi-platform | `./public/images/monteerly/monteerly_10_multi_platform_publishing_hero.png` | النشر متعدد المنصات. |
| collaboration | `./public/images/monteerly/monteerly_11_global_collaboration_grid_4up.png` | التعاون العالمي بين الفرق. |
| timeline | `./public/images/monteerly/monteerly_12_editor_red_shirt_timeline.png` | واجهة Timeline للمونتاج والمراجعة. |
| analytics | `./public/images/monteerly/monteerly_13_analytics_dashboard_woman_ai.png` | تحليلات ولوحة أداء. |
| dual-screen | `./public/images/monteerly/monteerly_14_editor_professional_dual_screen.png` | بيئة المحرر الاحترافية. |
| workspace | `./public/images/monteerly/monteerly_15_creator_workspace_laptop_modern.png` | مساحة العمل للمبدع المستقل. |
| arab-collab | `./public/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png` | تعاون عربي احترافي/سوق المواهب. |
| testimonial-b2b | `./public/images/monteerly/monteerly_17_testimonial_woman_gray_suit_office.png` | شهادة عميل B2B. |
| case-study | `./public/images/monteerly/monteerly_18_testimonial_executive_growth_charts.png` | دراسة حالة ونمو. |
| testimonial-freelance | `./public/images/monteerly/monteerly_19_testimonial_creative_hoodie_freelance.png` | شهادة مستقل/creator. |
| testimonial-enterprise | `./public/images/monteerly/monteerly_20_testimonial_business_exec_corporate.png` | شهادة مؤسسية. |
| heritage-saudi | `./public/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png` | تراث سعودي/مكتبة أصول. |
| drone-algeria | `./public/images/monteerly/monteerly_22_photographer_algerian_drone_aerial.png` | تصوير جوي جزائري. |
| heritage-cinematic | `./public/images/monteerly/monteerly_23_photographer_library_heritage_cinematic.png` | أصول سينمائية تراثية. |
| city-drone | `./public/images/monteerly/monteerly_24_photographer_algerian_drone_cityshot.png` | مشهد مديني جوي. |
| gamification | `./public/images/monteerly/gamification_power_action.png` | مركز قسم التلعيب والـ Power Action. |

### 4.2 صور Platform الإضافية داخل المشروع

| الملف | المسار الفعلي | الاستخدام المقترح |
|---|---|---|
| course 1 | `./public/images/platform/course_thumbnail_1.png` | صور دورات الأكاديمية. |
| course 2 | `./public/images/platform/course_thumbnail_2.png` | صور دورات الأكاديمية. |
| consultation booking | `./public/images/platform/consultation_booking.png` | صفحة الاستشارات والحجز. |
| agency management | `./public/images/platform/agency_management.png` | صفحة الوكالات والإدارة المؤسسية. |
| error 404 bg | `./public/images/platform/error_404_bg.png` | خلفية صفحة 404. |
| auth login bg | `./public/images/platform/auth_login_bg.png` | خلفية صفحات الدخول/المصادقة. |
| wallet dashboard | `./public/images/platform/wallet_dashboard.png` | قسم المالية/المحفظة. |
| studio timeline | `./public/images/platform/studio_timeline.png` | قسم الاستوديو والـ review. |
| marketplace hero | `./public/images/platform/marketplace_hero.png` | صفحة السوق أو Hero فرعي للسوق. |

### 4.3 صور وأيقونات عامة داخل public

- `./public/next.svg`.
- `./public/window.svg`.
- `./public/file.svg`.
- `./public/globe.svg`.
- `./public/vercel.svg`.

هذه ليست أصول علامة Monteerly الأساسية، ويجب استخدامها فقط إن كانت جزءًا من UI system ثانوي أو placeholders، لا كصور تسويقية أساسية للمنصة.

## 5. خريطة أماكن جميع الصور داخل جميع صفحات المنصة

### 5.1 الصفحة الرئيسية `/[locale]/`

| القسم | الصورة/الصور المعتمدة | الهدف |
|---|---|---|
| Hero | `monteerly_04_hero_header_marketing_banner.png` | خلفية الهيرو الأساسية. |
| Header / Footer / Splash | `monteerly_02_main_logo_full.svg` | تثبيت الهوية البصرية. |
| Founder / About strip | `monteerly_03_profile_ahmed_gamal_circle.png` | رسالة المؤسس والبعد الإنساني. |
| Security block | `monteerly_05_security_digital_lock_cyber.png` | شرح الحماية والثقة. |
| Ecosystem block | `monteerly_06_marketing_showcase_full.png` | عرض التكامل بين الوحدات. |
| Brand assets block | `monteerly_08_branding_creative_assets.png` | إدارة الأصول والهوية. |
| AI / Tech | `monteerly_07_tech_innovation_portrait.png`, `monteerly_09_ai_perf

---

## 📊 حالة التشريح الجراحي للنظام (System Audit)

### 🧩 محرك التكنولوجيا المالية والضمان (FinTech)
**المسارات (Routes):**
- ✅ `src/app/[locale]/wallet/page.tsx` (متصل وجاهز)
- ❌ `src/app/api/payments/paymob/webhook/route.ts` (مفقود - قيد الجدولة)
**المكونات (Components):**
- ✅ `src/components/finance/BalanceCard.tsx` (تم البناء)
- ✅ `src/components/finance/InvoiceBuilder.tsx` (تم البناء)
- ✅ `src/components/fintech/RevenueSplitter.tsx` (تم البناء)

### 🧩 غرفة العمليات والمونتاج السحابي (Workspace)
**المسارات (Routes):**
- ✅ `src/app/[locale]/workspace/page.tsx` (متصل وجاهز)
- ✅ `src/app/[locale]/studio/[projectId]/page.tsx` (متصل وجاهز)
**المكونات (Components):**
- ✅ `src/components/workspace/ReviewPlayer.tsx` (تم البناء)
- ✅ `src/components/workspace/LiveCursors.tsx` (تم البناء)
- ✅ `src/components/workspace/AudioMixer.tsx` (تم البناء)
- ✅ `src/components/workspace/CloudUploadZone.tsx` (تم البناء)

### 🧩 القبة الحديدية والامتثال (Security & Legal)
**المسارات (Routes):**
- ✅ `src/app/[locale]/disputes/page.tsx` (متصل وجاهز)
- ✅ `src/app/[locale]/legal/page.tsx` (متصل وجاهز)
**المكونات (Components):**
- ✅ `src/components/security/ForensicWatermark.tsx` (تم البناء)
- ✅ `src/components/security/sovereignty/ZeroTrustBuilder.tsx` (تم البناء)
- ✅ `src/components/legal/ContractWizard.tsx` (تم البناء)
- ✅ `src/components/admin/ArbitrationConsole.tsx` (تم البناء)

### 🧩 ترسانة الذكاء الاصطناعي (Agents & AI)
**المسارات (Routes):**
- ✅ `src/app/[locale]/ai-studio/page.tsx` (متصل وجاهز)
**المكونات (Components):**
- ✅ `src/components/ai/ScriptGenerator.tsx` (تم البناء)
- ✅ `src/components/ai/StoryboardGenerator.tsx` (تم البناء)
- ✅ `src/components/ai/digital-twin/DigitalTwinSetup.tsx` (تم البناء)
- ✅ `src/components/ai/vision/FaceVault.tsx` (تم البناء)

### 🧩 سوق النخب والمجتمع (Market & Community)
**المسارات (Routes):**
- ✅ `src/app/[locale]/marketplace/page.tsx` (متصل وجاهز)
- ✅ `src/app/[locale]/community/page.tsx` (متصل وجاهز)
**المكونات (Components):**
- ✅ `src/components/market/AiMatcher.tsx` (تم البناء)
- ✅ `src/components/market/TalentMap.tsx` (تم البناء)
- ✅ `src/components/community/CommunityFeed.tsx` (تم البناء)

### 🧩 لوحة القيادة السيادية (God Mode Dashboard)
**المسارات (Routes):**
- ✅ `src/app/[locale]/dashboard/page.tsx` (متصل وجاهز)
- ✅ `src/app/[locale]/executive/page.tsx` (متصل وجاهز)
**المكونات (Components):**
- ✅ `src/components/admin/god-mode/LiveOpsMap.tsx` (تم البناء)
- ✅ `src/components/admin/god-mode/TrafficControl.tsx` (تم البناء)
- ✅ `src/components/analytics/CreatorAnalytics.tsx` (تم البناء)

## 💰 الهيكل الاقتصادي والتسعير (Monetization Engine)
- **الباقة المجانية (Rookie):** أدوات أساسية، تخزين 5GB، عمولة 15%.
- **باقة المحترفين (Pro):** استوديو متقدم، أدوات AI، تخزين 50GB، عمولة 10%.
- **باقة المؤسسات (Studio/Agency):** White-label، إدارة فريق، God-Mode، عمولة 5%.

## 🚀 خطة التنفيذ المؤتمتة القادمة (Execution Queue)
1. **Sprint A:** بناء وتوليد جميع مكونات `Sovereign_Workspace_Layer` لضمان تشغيل الاستوديو.
2. **Sprint B:** ربط `Financial_and_Escrow_Layer` مع بوابات الدفع والمنطق المالي.
3. **Sprint C:** تفعيل خوارزمية `Marketplace_DNA_Match` في سوق العمل.

## Global Frontend Constitution

### Purpose
Monteerly is not a generic SaaS dashboard. It is a sovereign operating system for creative production, protected collaboration, approvals, rights, execution, and executive visibility across the entire platform.

The frontend must therefore communicate:
- operational gravity
- cultural taste
- creative authority
- secure runtime trust
- premium editorial control

Every page, section, component, panel, modal, and navigation layer must feel like it belongs to one unified system identity.

---

### Core Interface Problem
The interface solves a high-trust operational problem for:
- freelancers
- creative professionals
- production teams
- agencies
- clients
- decision-makers
- platform operators

Users must feel that Monteerly is:
- secure
- deliberate
- premium
- operationally intelligent
- visually distinctive
- impossible to confuse with a template SaaS product

---

### Tonal Commitment
The official Monteerly frontend tone is:

**Luxury Editorial Executive**

This tone is mandatory across the platform unless a page has an explicitly approved specialized mode.

This means:
- not playful
- not cute
- not casual startup
- not generic enterprise dashboard
- not neon cyberpunk
- not loud marketing SaaS
- not default template minimalism

The interface should feel like:
- a high-end media control room
- a sovereign creative command layer
- a premium editorial operating surface
- a confidential executive system for production intelligence

---

### Memorability Principle
The one thing users must remember most is:

**Monteerly feels like a sovereign executive environment, not just another software product.**

Every visual decision must reinforce this memory.

---

### Global Layout Law
The global layout must act as an ambient system frame, not a marketing banner container.

Rules:
- The top global bar must be calm, thin, dark, and operational.
- It may communicate secure runtime state, encryption status, or system context.
- It must never visually overpower the actual page title.
- It must never look like a promotional strip, alert ad, or launch ribbon.
- Loud saturated bars such as bright indigo, bright blue, or banner-like announcement strips are forbidden in the global shell.

The layout should create:
- atmosphere
- trust
- continuity
- platform-wide identity

The layout should not create:
- noise
- urgency theater
- visual shouting
- duplicated page hierarchy

---

### Identity Atmosphere
Monteerly’s default atmospheric identity across the platform is:

- dark sovereign surfaces
- restrained cyan / emerald / steel accents
- subtle executive illumination
- layered depth
- low-noise premium contrast
- editorial spacing
- infrastructural calm

The visual world should imply:
- encryption
- governance
- creative seriousness
- protected execution
- intelligent systems

---

### Typography Constitution
Typography must feel authored, intentional, and premium.

Mandatory rules:
- Use a characterful display font paired with a refined body font.
- Typography must feel culturally aware and visually authored.
- Arabic typography must feel elegant, strong, and premium.
- English/supporting latin typography must feel modern and precise.
- Display typography must be reserved for moments of hierarchy, not sprayed everywhere.
- Body typography must maximize readability without becoming generic.

Forbidden fonts and directions:
- Inter
- Roboto
- Arial
- Space Grotesk
- generic system font stacks as primary identity
- overused “AI startup” type combinations

Typography should communicate:
- authority
- clarity
- editorial intent
- premium restraint

---

### Color Constitution
Monteerly must commit to one dominant world, not a scattered palette.

Approved direction:
- predominantly dark surfaces
- highly controlled contrast
- restrained accent usage
- cyan / emerald / ice / muted steel as operational signal colors
- occasional amber only for warnings, review attention, or system caution

Color must be used as:
- hierarchy
- meaning
- operational state
- selective emphasis

Color must never be used as:
- decoration without meaning
- evenly distributed rainbow balance
- generic SaaS friendliness
- purple-on-white cliché
- startup gradient filler

Forbidden:
- bright indigo marketing bars in the global shell
- generic purple gradients on light backgrounds
- evenly distributed accent colors across all UI regions
- decorative color with no semantic purpose

---

### Motion Constitution
Motion must be intentional, sparse, memorable, and hierarchical.

Rules:
- Prioritize page-load reveals and structural transitions over excessive hover gimmicks.
- Motion should communicate system confidence, not novelty.
- Main transitions should feel smooth, deliberate, and premium.
- High-level sections may reveal with stagger, fade, clip, or elevation transitions.
- Hover effects should remain subtle and secondary.
- Motion must never turn the platform into a toy-like interface.

Priority order:
1. page entry
2. section reveal
3. modal/sheet transitions
4. navigation state changes
5. micro-hover details

Forbidden:
- excessive bouncing
- playful hover spam
- random pulsing elements
- decorative motion with no hierarchy
- flashy animation in executive surfaces

---

### Composition Constitution
The layout system must avoid generic centered SaaS stacking.

Approved principles:
- asymmetry where useful
- controlled negative space
- layered depth
- long-form editorial rhythm
- diagonal or offset visual movement when appropriate
- mixed density: quiet zones + information zones
- page-specific composition logic

Forbidden:
- endless centered hero + centered paragraph + centered button
- default card grids repeated mechanically
- equal-width feature cards with no hierarchy
- obvious AI-template composition
- cookie-cutter dashboard symmetry everywhere

Every page must have at least one clear compositional idea.

---

### Surface and Texture Constitution
Flat, empty, generic backgrounds are not acceptable unless explicitly justified.

Approved tools:
- radial light bloom
- subtle grid textures
- layered overlays
- low-opacity structural patterns
- gradient atmosphere with restraint
- cinematic depth
- soft glass or blur only when purposeful
- premium border glow used minimally

Textures must support the system identity without becoming decorative clutter.

Forbidden:
- empty flat backgrounds with no atmosphere
- decorative blobs with no meaning
- random glows
- noisy fake futuristic visuals
- copy-paste “AI generated landing page” effects

---

### Component Law
Components must feel like parts of one sovereign operating environment.

All major components must express:
- purpose
- state
- hierarchy
- confidence
- system continuity

Component rules:
- cards must not feel generic or starter-template based
- panels should carry executive depth and premium borders
- modals should feel infrastructural, not pop-marketing
- badges should communicate state, not decoration
- chips, tabs, and pills should be compact and precise
- tables should feel like intelligence surfaces
- forms should feel secure and intentional
- empty states must still feel premium and system-native

Forbidden:
- colored icon circles as lazy visual filler
- thick left-border cards in SaaS style
- inflated rounded blobs everywhere
- pastel callout components
- inconsistent panel treatments between pages

---

### Shell vs Page Hierarchy
The platform shell must never compete with the page content.

Rules:
- global shell = ambient identity
- page header = functional identity
- section header = local narrative
- cards/panels = operational detail

Therefore:
- the global shell must stay visually quieter than page heroes and executive headers
- page titles must remain the strongest hierarchy point inside any route
- no global strip should look louder than the current page
- executive pages must feel composed, not interrupted by shell chrome

---

### Executive Surface Law
Pages related to:
- executive
- governance
- runtime
- admin
- financial control
- legal review
- production intelligence

must use a stricter and calmer visual discipline than promotional pages.

These pages should feel:
- verified
- monitored
- serious
- high-trust
- system-native

They must not feel:
- campaign-like
- startup-like
- cheerful product-marketing pages
- overloaded with decorative effects

---

### Marketplace and Public Pages
Public and marketplace-facing pages may be more expressive than internal executive surfaces, but they must still remain inside the Monteerly identity system.

That means:
- still premium
- still authored
- still dark or tonally coherent
- still distinctive
- still non-generic

Marketing pages may expand drama, but may not violate the constitutional rules of typography, palette discipline, or compositional originality.

---

### Accessibility and Professionalism Law
Distinctive design must never break clarity.

Required:
- readable text contrast
- clear hierarchy
- semantic structure
- mobile-safe density
- keyboard-safe interaction
- readable Arabic and English typography
- touch-safe targets
- consistent spacing logic

Bold identity is required.
Chaos is forbidden.

---

### Anti-Template Law
Nothing in Monteerly should be easily mistaken for:
- a default Tailwind template
- a generic startup landing page
- a dashboard starter kit
- an AI-generated hero section
- a clone of linear-style SaaS without contextual identity

Before approving any page or component, the review question must be:

**Could this belong to any random startup?**
If the answer is yes, the design is not ready.

---

### Global Prohibitions
Never use:
- Inter, Roboto, Arial, Space Grotesk, or generic system fonts as the main brand identity
- purple gradients on white
- loud announcement banners in the app shell
- generic centered stacks by default
- repetitive three-column SaaS cards
- decorative icon circles as filler
- safe rainbow palettes
- over-rounded starter-kit UI
- flat generic backgrounds
- motion without hierarchy
- page shells that visually overpower the route content

---

### Global Approval Standard
Every new page, section, or component added to Monteerly must pass these checks:

1. Does it feel sovereign, premium, and authored?
2. Does it match the luxury editorial executive tone?
3. Does it avoid generic SaaS patterns?
4. Does the shell remain quieter than the page?
5. Is color used semantically, not decoratively?
6. Is the typography distinctive and intentional?
7. Does the composition contain a real visual idea?
8. Does it feel native to Monteerly specifically?
9. Would a user remember this environment after leaving it?
10. Would this still feel premium if stripped of logos?

If any answer is no, the implementation must be revised before approval.

## Global Frontend Constitution

### Insertion Intent
This section is a constitutional design authority layer for the entire Monteerly platform.
It governs all pages, route shells, shared layouts, visual systems, structural hierarchy, and cross-page frontend behavior.

It must be treated as a binding reference for:
- public pages
- dashboard pages
- executive pages
- admin pages
- marketplace pages
- workspace pages
- onboarding flows
- internal tools
- global shells
- route-level layouts
- reusable design primitives

### Purpose
Monteerly is not a generic SaaS dashboard.
It is a sovereign operating system for creative production, protected collaboration, approvals, rights, execution, and executive visibility across the platform.

The frontend must therefore communicate:
- operational gravity
- cultural taste
- creative authority
- secure runtime trust
- premium editorial control

Every page, section, component, panel, modal, and navigation layer must feel like it belongs to one unified system identity.

### Core Interface Problem
The interface solves a high-trust operational problem for:
- freelancers
- creative professionals
- production teams
- agencies
- clients
- decision-makers
- operators

Users must feel that Monteerly is:
- secure
- deliberate
- premium
- operationally intelligent
- visually distinctive
- impossible to confuse with a template SaaS product

### Tonal Commitment
The official Monteerly frontend tone is:

**Luxury Editorial Executive**

This tone is mandatory across the platform unless a page has an explicitly approved specialized mode.

This means:
- not playful
- not cute
- not casual startup
- not generic enterprise dashboard
- not neon cyberpunk
- not loud marketing SaaS
- not default template minimalism

The interface should feel like:
- a high-end media control room
- a sovereign creative command layer
- a premium editorial operating surface
- a confidential executive system for production intelligence

### Memorability Principle
The one thing users must remember most is:

**Monteerly feels like a sovereign executive environment, not just another software product.**

Every visual decision must reinforce this memory.

### Global Layout Law
The global layout must act as an ambient system frame, not a marketing banner container.

Rules:
- The top global bar must be calm, thin, dark, and operational.
- It may communicate secure runtime state, encryption status, or system context.
- It must never visually overpower the actual page title.
- It must never look like a promotional strip, alert ad, or launch ribbon.
- Loud saturated bars such as bright indigo, bright blue, or banner-like announcement strips are forbidden in the global shell.

The layout should create:
- atmosphere
- trust
- continuity
- platform-wide identity

The layout should not create:
- noise
- urgency theater
- visual shouting
- duplicated page hierarchy

### Identity Atmosphere
Monteerly’s default atmospheric identity across the platform is:
- dark sovereign surfaces
- restrained cyan / emerald / steel accents
- subtle executive illumination
- layered depth
- low-noise premium contrast
- editorial spacing
- infrastructural calm

The visual world should imply:
- encryption
- governance
- creative seriousness
- protected execution
- intelligent systems

### Typography Constitution
Typography must feel authored, intentional, and premium.

Mandatory rules:
- Use a characterful display font paired with a refined body font.
- Typography must feel culturally aware and visually authored.
- Arabic typography must feel elegant, strong, and premium.
- English/supporting latin typography must feel modern and precise.
- Display typography must be reserved for moments of hierarchy, not sprayed everywhere.
- Body typography must maximize readability without becoming generic.

Forbidden fonts and directions:
- Inter
- Roboto
- Arial
- Space Grotesk
- generic system font stacks as primary identity
- overused AI-startup type combinations

Typography should communicate:
- authority
- clarity
- editorial intent
- premium restraint

### Color Constitution
Monteerly must commit to one dominant world, not a scattered palette.

Approved direction:
- predominantly dark surfaces
- highly controlled contrast
- restrained accent usage
- cyan / emerald / ice / muted steel as operational signal colors
- occasional amber only for warnings, review attention, or system caution

Color must be used as:
- hierarchy
- meaning
- operational state
- selective emphasis

Color must never be used as:
- decoration without meaning
- evenly distributed rainbow balance
- generic SaaS friendliness
- purple-on-white cliché
- startup gradient filler

Forbidden:
- bright indigo marketing bars in the global shell
- generic purple gradients on light backgrounds
- evenly distributed accent colors across all UI regions
- decorative color with no semantic purpose

### Motion Constitution
Motion must be intentional, sparse, memorable, and hierarchical.

Rules:
- Prioritize page-load reveals and structural transitions over excessive hover gimmicks.
- Motion should communicate system confidence, not novelty.
- Main transitions should feel smooth, deliberate, and premium.
- High-level sections may reveal with stagger, fade, clip, or elevation transitions.
- Hover effects should remain subtle and secondary.
- Motion must never turn the platform into a toy-like interface.

Priority order:
1. page entry
2. section reveal
3. modal and sheet transitions
4. navigation state changes
5. micro-hover details

Forbidden:
- excessive bouncing
- playful hover spam
- random pulsing elements
- decorative motion with no hierarchy
- flashy animation in executive surfaces

### Composition Constitution
The layout system must avoid generic centered SaaS stacking.

Approved principles:
- asymmetry where useful
- controlled negative space
- layered depth
- long-form editorial rhythm
- diagonal or offset visual movement when appropriate
- mixed density between quiet zones and information zones
- page-specific composition logic

Forbidden:
- endless centered hero + centered paragraph + centered button
- default card grids repeated mechanically
- equal-width feature cards with no hierarchy
- obvious AI-template composition
- cookie-cutter dashboard symmetry everywhere

Every page must have at least one clear compositional idea.

### Surface and Texture Constitution
Flat, empty, generic backgrounds are not acceptable unless explicitly justified.

Approved tools:
- radial light bloom
- subtle grid textures
- layered overlays
- low-opacity structural patterns
- gradient atmosphere with restraint
- cinematic depth
- soft glass or blur only when purposeful
- premium border glow used minimally

Textures must support the system identity without becoming decorative clutter.

Forbidden:
- empty flat backgrounds with no atmosphere
- decorative blobs with no meaning
- random glows
- noisy fake futuristic visuals
- copy-paste AI-generated landing page effects

### Component Law
Components must feel like parts of one sovereign operating environment.

All major components must express:
- purpose
- state
- hierarchy
- confidence
- system continuity

Component rules:
- cards must not feel generic or starter-template based
- panels should carry executive depth and premium borders
- modals should feel infrastructural, not pop-marketing
- badges should communicate state, not decoration
- chips, tabs, and pills should be compact and precise
- tables should feel like intelligence surfaces
- forms should feel secure and intentional
- empty states must still feel premium and system-native

Forbidden:
- colored icon circles as lazy visual filler
- thick left-border cards in SaaS style
- inflated rounded blobs everywhere
- pastel callout components
- inconsistent panel treatments between pages

### Shell vs Page Hierarchy
The platform shell must never compete with the page content.

Rules:
- global shell = ambient identity
- page header = functional identity
- section header = local narrative
- cards and panels = operational detail

Therefore:
- the global shell must stay visually quieter than page heroes and executive headers
- page titles must remain the strongest hierarchy point inside any route
- no global strip should look louder than the current page
- executive pages must feel composed, not interrupted by shell chrome

### Executive Surface Law
Pages related to:
- executive
- governance
- runtime
- admin
- financial control
- legal review
- production intelligence

must use a stricter and calmer visual discipline than promotional pages.

These pages should feel:
- verified
- monitored
- serious
- high-trust
- system-native

They must not feel:
- campaign-like
- startup-like
- cheerful product-marketing pages
- overloaded with decorative effects

### Marketplace and Public Pages
Public and marketplace-facing pages may be more expressive than internal executive surfaces, but they must still remain inside the Monteerly identity system.

That means:
- still premium
- still authored
- still dark or tonally coherent
- still distinctive
- still non-generic

Marketing pages may expand drama, but may not violate the constitutional rules of typography, palette discipline, or compositional originality.

### Accessibility and Professionalism Law
Distinctive design must never break clarity.

Required:
- readable text contrast
- clear hierarchy
- semantic structure
- mobile-safe density
- keyboard-safe interaction
- readable Arabic and English typography
- touch-safe targets
- consistent spacing logic

Bold identity is required.
Chaos is forbidden.

### Anti-Template Law
Nothing in Monteerly should be easily mistaken for:
- a default Tailwind template
- a generic startup landing page
- a dashboard starter kit
- an AI-generated hero section
- a clone of linear-style SaaS without contextual identity

Before approving any page or component, the review question must be:

**Could this belong to any random startup?**

If the answer is yes, the design is not ready.

## Layout Enforcement Rules

### Canonical File Targets
The primary constitutional enforcement targets are:
- `src/app/[locale]/layout.tsx`
- any nested route-level `layout.tsx` files
- dashboard shell layouts
- executive shell layouts
- admin shell layouts
- marketplace shell layouts
- onboarding shell layouts

### Enforcement Priority
`src/app/[locale]/layout.tsx` is the first and highest-priority frontend enforcement layer for:
- platform atmosphere
- shell hierarchy
- runtime framing
- language-aware direction
- cross-page visual consistency

### Mandatory Rules
All global and nested layouts must:
- preserve the calm sovereign shell
- avoid loud announcement-banner behavior
- keep the shell visually quieter than the route content
- maintain dark premium atmospheric identity by default
- support Arabic RTL and English/LTR correctly
- avoid generic SaaS shell chrome
- reinforce Monteerly as a secure executive environment

### Forbidden Layout Behaviors
Layouts must not:
- use bright indigo announcement strips
- use launch-banner aesthetics
- compete with page-level hero sections
- flatten the system into generic dashboard chrome
- impose loud visual branding on every route
- break shell-vs-page hierarchy

### Review Condition
No layout change is approved unless it preserves:
- Global Frontend Constitution
- Shell vs Page Hierarchy
- Anti-Template Law
- Monteerly sovereign executive identity
