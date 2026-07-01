# الوثيقة التنفيذية النهائية الموحدة — Monteerly OS

هذه الوثيقة هي المرجع التنفيذي النهائي الموحد لمنصة Monteerly OS بعد دمج ملف العقل الرئيسي، إضافات الصور، دستور العبارات الاحترافية، طرق الدفع الرسمية، وخطة التخزين السحابي، مع ربط الصور الفعلية الموجودة داخل المشروع الحالي بأماكن استخدامها داخل جميع صفحات المنصة.[file:122][file:123][file:176][file:177][file:178]

## 1. تعريف المنصة النهائي

Monteerly OS هو نظام تشغيل إبداعي سيادي لإدارة دورة حياة الأصل الإبداعي في العالم العربي، من الفكرة والكتابة والتصوير والمونتاج والمراجعة، إلى التعاقد والدفع والاستشارات والأرشفة وإدارة الحقوق.[file:122][file:123]

المكونات الرئيسية المعتمدة رسميًا:

- Monteerly Studio: استوديو مراجعة فيديو سحابي مع مراجعة دقيقة للإطارات، تعليقات زمنية، مقارنة نسخ، ومراجعات مباشرة.[file:122][file:123]
- Talent & Job Marketplace: سوق للمواهب والمشاريع مع محرك مطابقة ذكي ونظام تلعيب.[file:122][file:123]
- Stock Footage Library: مكتبة أصول مرئية بتراخيص واضحة ونظام Credits.[file:122][file:123]
- Financial Engine: Wallet + Escrow + Transactions + Payouts.[file:122][file:123]
- Iron Dome / Guardian: طبقة الأمن والمنع والكشف والتدقيق.[file:122][file:123]
- Academy & Community: التدريب، المجتمع، التحديات، والتلعيب.[file:122][file:123]
- Agencies & Enterprise Layer: طبقة الوكالات والمؤسسات مع RBAC وتقارير مركزية.[file:122][file:123]
- Agent Mesh Layer: وكلاء ذكاء اصطناعي تشغيليون داخل المنتج.[file:122][file:123]

## 2. طرق الدفع الرسمية المعتمدة

يُعتمد داخل المنصة هذا الترتيب فقط لطرق الدفع، دون إضافة أي مزود آخر في الوثيقة التنفيذية الحالية:[file:178][file:122]

1. Paymob.[file:178]
- Visa / MasterCard.[file:178]
- فوري.[file:178]
- محافظ المحمول.[file:178]
- Apple Pay.[file:178]

2. PayPal كخيار إضافي للعملاء الدوليين.[file:178][file:122][file:123]

ويجب أن تنعكس هذه الحقيقة في كل صفحات التسعير، الـ checkout، الأسئلة الشائعة، وواجهات المحفظة، مع عدم ذكر Stripe أو أي بدائل أخرى داخل النصوص الرسمية الحالية.[file:178][file:122]

## 3. الخطة الكاملة للتخزين السحابي

### 3.1 الهدف المعماري

خطة التخزين السحابي في Monteerly يجب أن تدعم وسائط كثيفة، مراجعات آمنة، تسليمات نهائية، وثائق قانونية، وأصول مكتبة قابلة للترخيص، مع الفصل الواضح بين الملفات الخام، ملفات المعاينة، والملفات النهائية.[file:122][file:123]

### 3.2 مزود التخزين

يعتمد التصور الرسمي على AWS S3 أو Cloudflare R2، مع تفضيل R2 عند الحاجة لتقليل تكلفة الـ egress بسبب كثافة الوسائط داخل المنصة.[file:122]

### 3.3 المبادئ الأساسية

- كل رفع يتم عبر Presigned URLs قصيرة العمر.[file:122]
- الوصول للملفات الحساسة لا يكون Public مباشرًا.[file:122][file:123]
- ملفات الاستوديو تستخدم نسخ Proxy/Review للوصول السريع.[file:122]
- الملفات القانونية تخزن بتشفير صارم ومراقبة وصول دقيقة.[file:122]
- الأصول المخصصة للمكتبة ترتبط بنظام ترخيص وحقوق استخدام واضح.[file:122][file:123]
- كل ملف مهم يجب أن يملك metadata، owner، project_id أو asset_id، وretention policy.[file:122][file:123]

### 3.4 بنية الـ Buckets الرسمية

| Bucket | الغرض | نوع الوصول | دورة الحياة | ملاحظات |
|---|---|---|---|---|
| `project-raw-uploads` | الملفات الخام الأصلية الخاصة بالمشاريع | خاص | Active أثناء المشروع ثم Cold Archive | يشمل فيديو، صوت، صور، ملفات مشروع.[file:122] |
| `project-review-renders` | نسخ المراجعة وProxy وملفات الـ preview | خاص/مقيّد | قصيرة إلى متوسطة | للاستخدام داخل Studio والمراجعة السريعة.[file:122] |
| `project-final-deliveries` | التسليمات النهائية | خاص مع مشاركة محكومة | طويلة | ملفات التسليم النهائية المعتمدة.[file:122] |
| `footage-library-source` | الأصول الأصلية للمكتبة | خاص | طويلة جدًا | تبقى طالما الترخيص أو المساهمة نشطة.[file:122] |
| `footage-library-proxy` | معاينات المكتبة وwatermarked previews | عام محدود أو signed | طويلة | للعرض والشراء قبل تنزيل الأصل.[file:122][file:123] |
| `documents-contracts-releases` | العقود، الـ NDA، الـ releases، والموافقات | شديد الخصوصية | طويلة جدًا | تشفير صارم وسجل وصول.[file:122] |
| `finance-invoices-reports` | الفواتير، الكشوف، الصادرات المالية | خاص | حسب السياسة الضريبية | مرتبط بالـ wallet والـ finance admin.[file:122][file:123] |
| `academy-course-assets` | ملفات الدورات التعليمية والمواد | خاص/محدود | طويلة | فيديوهات، PDFs، تمارين، thumbnails.[file:122][file:123] |
| `community-media` | وسائط المجتمع والمنشورات | مقيّد | متوسطة | يخضع للمراقبة وسياسات المجتمع.[file:123] |
| `security-evidence-locker` | أدلة النزاعات والحوادث | شديد الخصوصية | طويلة جدًا | write-once قدر الإمكان، وللوصول المقيد فقط.[file:122][file:123] |
| `avatars-profiles` | صور المستخدمين والشركات | عام محدود/مُحكم | طويلة | للملفات الشخصية والوكالات.[file:176] |
| `brand-marketing-assets` | الشعارات، صور الهبوط، التسويق | عام مضبوط | طويلة | أصول موقع المنصة والعلامة.[file:176] |

### 3.5 سياسات الملفات حسب النوع

| النوع | الامتدادات | مكان التخزين | المعالجة |
|---|---|---|---|
| فيديو خام | mp4, mov, mxf, prores | `project-raw-uploads` | Transcode + proxy + metadata extraction. [file:122] |
| فيديو مراجعة | mp4/hls proxy | `project-review-renders` | Watermark + adaptive playback. [file:122][file:123] |
| تسليم نهائي | mp4, mov, zip | `project-final-deliveries` | checksum + approval lock. [file:122] |
| صور مكتبة | jpg, png, webp, tiff | `footage-library-source` | previews + licensing metadata. [file:122][file:123] |
| عقود ووثائق | pdf, docx | `documents-contracts-releases` | encrypted storage + audit log. [file:122] |
| تقارير مالية | pdf, csv, xlsx | `finance-invoices-reports` | export + retention policy. [file:122][file:123] |

### 3.6 الأمن والتشفير

- تشفير أثناء النقل عبر HTTPS/TLS.[file:122]
- تشفير أثناء التخزين للملفات الحساسة.[file:122][file:177]
- Watermarking وForensic Marking لملفات المراجعة الحساسة.[file:122]
- ربط الروابط المشتركة بمدة صلاحية وصلاحيات واضحة.[file:122][file:123]
- تسجيل كل وصول مهم في Audit Log.[file:122][file:123]

### 3.7 دورة الحياة والاحتفاظ

- الملفات الخام: تبقى Active أثناء المشروع، ثم تنتقل إلى أرشفة باردة بعد الإغلاق حسب سياسة الباقة أو المؤسسة.[file:122]
- ملفات المراجعة: يمكن حذفها أو ضغطها بعد التسليم النهائي مع الاحتفاظ بالنسخة المرجعية وسجل التعليقات.[file:122][file:123]
- العقود والتقارير المالية: احتفاظ طويل وفق السياسات القانونية والضريبية.[file:122][file:123]
- أدلة النزاعات: لا تُحذف إلا وفق قرار إداري موثق.[file:122][file:123]

## 4. الصور الفعلية الموجودة داخل المشروع الحالي

بناءً على قائمة `find` التي أرفقتها، الصور الفعلية ذات القيمة التنفيذية داخل المشروع ليست صور `node_modules` أو `test-results` أو `.next cache`، بل الأصول الموجودة في `public/`، وهي التي يجب اعتمادها في الوثيقة التنفيذية والربط بها داخل الصفحات.[file:176]

### 4.1 صور Monteerly الرئيسية

| الملف | المسار الفعلي داخل المشروع | الوصف التنفيذي |
|---|---|---|
| favicon | `./public/images/monteerly/monteerly_01_favicon_app_icon.png` | أيقونة التطبيق والهوية المصغرة.[file:176] |
| logo | `./public/images/monteerly/monteerly_02_main_logo_full.svg` | الشعار الرئيسي للمنصة.[file:176] |
| founder | `./public/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png` | صورة المؤسس/الرسالة الشخصية.[file:176] |
| hero | `./public/images/monteerly/monteerly_04_hero_header_marketing_banner.png` | صورة الهيرو الرئيسية.[file:176] |
| security | `./public/images/monteerly/monteerly_05_security_digital_lock_cyber.png` | أمان سيبراني/قفل رقمي.[file:176] |
| showcase | `./public/images/monteerly/monteerly_06_marketing_showcase_full.png` | عرض تكاملي للمنصة.[file:176] |
| tech | `./public/images/monteerly/monteerly_07_tech_innovation_portrait.png` | طابع تقني/ابتكاري.[file:176] |
| brand-assets | `./public/images/monteerly/monteerly_08_branding_creative_assets.png` | إدارة أصول العلامة.[file:176] |
| ai-advisor | `./public/images/monteerly/monteerly_09_ai_performance_advisor_hologram.png` | مستشار الأداء الذكي.[file:176] |
| multi-platform | `./public/images/monteerly/monteerly_10_multi_platform_publishing_hero.png` | النشر متعدد المنصات.[file:176] |
| collaboration | `./public/images/monteerly/monteerly_11_global_collaboration_grid_4up.png` | التعاون العالمي بين الفرق.[file:176] |
| timeline | `./public/images/monteerly/monteerly_12_editor_red_shirt_timeline.png` | واجهة Timeline للمونتاج والمراجعة.[file:176] |
| analytics | `./public/images/monteerly/monteerly_13_analytics_dashboard_woman_ai.png` | تحليلات ولوحة أداء.[file:176] |
| dual-screen | `./public/images/monteerly/monteerly_14_editor_professional_dual_screen.png` | بيئة المحرر الاحترافية.[file:176] |
| workspace | `./public/images/monteerly/monteerly_15_creator_workspace_laptop_modern.png` | مساحة العمل للمبدع المستقل.[file:176] |
| arab-collab | `./public/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png` | تعاون عربي احترافي/سوق المواهب.[file:176] |
| testimonial-b2b | `./public/images/monteerly/monteerly_17_testimonial_woman_gray_suit_office.png` | شهادة عميل B2B.[file:176] |
| case-study | `./public/images/monteerly/monteerly_18_testimonial_executive_growth_charts.png` | دراسة حالة ونمو.[file:176] |
| testimonial-freelance | `./public/images/monteerly/monteerly_19_testimonial_creative_hoodie_freelance.png` | شهادة مستقل/creator.[file:176] |
| testimonial-enterprise | `./public/images/monteerly/monteerly_20_testimonial_business_exec_corporate.png` | شهادة مؤسسية.[file:176] |
| heritage-saudi | `./public/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png` | تراث سعودي/مكتبة أصول.[file:176] |
| drone-algeria | `./public/images/monteerly/monteerly_22_photographer_algerian_drone_aerial.png` | تصوير جوي جزائري.[file:176] |
| heritage-cinematic | `./public/images/monteerly/monteerly_23_photographer_library_heritage_cinematic.png` | أصول سينمائية تراثية.[file:176] |
| city-drone | `./public/images/monteerly/monteerly_24_photographer_algerian_drone_cityshot.png` | مشهد مديني جوي.[file:176] |
| gamification | `./public/images/monteerly/gamification_power_action.png` | مركز قسم التلعيب والـ Power Action.[file:176] |

### 4.2 صور Platform الإضافية داخل المشروع

| الملف | المسار الفعلي | الاستخدام المقترح |
|---|---|---|
| course 1 | `./public/images/platform/course_thumbnail_1.png` | صور دورات الأكاديمية.[file:176] |
| course 2 | `./public/images/platform/course_thumbnail_2.png` | صور دورات الأكاديمية.[file:176] |
| consultation booking | `./public/images/platform/consultation_booking.png` | صفحة الاستشارات والحجز.[file:176] |
| agency management | `./public/images/platform/agency_management.png` | صفحة الوكالات والإدارة المؤسسية.[file:176] |
| error 404 bg | `./public/images/platform/error_404_bg.png` | خلفية صفحة 404.[file:176] |
| auth login bg | `./public/images/platform/auth_login_bg.png` | خلفية صفحات الدخول/المصادقة.[file:176] |
| wallet dashboard | `./public/images/platform/wallet_dashboard.png` | قسم المالية/المحفظة.[file:176] |
| studio timeline | `./public/images/platform/studio_timeline.png` | قسم الاستوديو والـ review.[file:176] |
| marketplace hero | `./public/images/platform/marketplace_hero.png` | صفحة السوق أو Hero فرعي للسوق.[file:176] |

### 4.3 صور وأيقونات عامة داخل public

- `./public/next.svg`.[file:176]
- `./public/window.svg`.[file:176]
- `./public/file.svg`.[file:176]
- `./public/globe.svg`.[file:176]
- `./public/vercel.svg`.[file:176]

هذه ليست أصول علامة Monteerly الأساسية، ويجب استخدامها فقط إن كانت جزءًا من UI system ثانوي أو placeholders، لا كصور تسويقية أساسية للمنصة.[file:176]

## 5. خريطة أماكن جميع الصور داخل جميع صفحات المنصة

### 5.1 الصفحة الرئيسية `/[locale]/`

| القسم | الصورة/الصور المعتمدة | الهدف |
|---|---|---|
| Hero | `monteerly_04_hero_header_marketing_banner.png` | خلفية الهيرو الأساسية.[file:176] |
| Header / Footer / Splash | `monteerly_02_main_logo_full.svg` | تثبيت الهوية البصرية.[file:176] |
| Founder / About strip | `monteerly_03_profile_ahmed_gamal_circle.png` | رسالة المؤسس والبعد الإنساني.[file:176] |
| Security block | `monteerly_05_security_digital_lock_cyber.png` | شرح الحماية والثقة.[file:176] |
| Ecosystem block | `monteerly_06_marketing_showcase_full.png` | عرض التكامل بين الوحدات.[file:176] |
| Brand assets block | `monteerly_08_branding_creative_assets.png` | إدارة الأصول والهوية.[file:176] |
| AI / Tech | `monteerly_07_tech_innovation_portrait.png`, `monteerly_09_ai_performance_advisor_hologram.png`, `monteerly_10_multi_platform_publishing_hero.png`, `monteerly_11_global_collaboration_grid_4up.png`, `monteerly_13_analytics_dashboard_woman_ai.png` | إبراز التقنية والذكاء الاصطناعي والنشر والتحليلات.[file:176] |
| Studio showcase | `monteerly_12_editor_red_shirt_timeline.png`, `public/images/platform/studio_timeline.png` | توضيح تجربة الاستوديو الفعلية.[file:176] |
| Creators & Workspace | `monteerly_14_editor_professional_dual_screen.png`, `monteerly_15_creator_workspace_laptop_modern.png`, `monteerly_16_editor_arab_thobe_collaboration.png` | المحترفون، المستقلون، وهوية السوق العربي.[file:176] |
| Testimonials | `monteerly_17_testimonial_woman_gray_suit_office.png`, `monteerly_18_testimonial_executive_growth_charts.png`, `monteerly_19_testimonial_creative_hoodie_freelance.png`, `monteerly_20_testimonial_business_exec_corporate.png` | شهادات ودراسات حالة.[file:176] |
| Library / Heritage | `monteerly_21_photographer_saudi_heritage_traditional.png`, `monteerly_22_photographer_algerian_drone_aerial.png`, `monteerly_23_photographer_library_heritage_cinematic.png`, `monteerly_24_photographer_algerian_drone_cityshot.png` | إبراز المكتبة والتراث والتصوير الجوي.[file:176] |
| Gamification | `gamification_power_action.png` | قسم التلعيب والمكافآت.[file:176] |

### 5.2 صفحة الأسعار `/pricing`

- Header/Footer: `monteerly_02_main_logo_full.svg`.[file:176]
- Hero خفيف أو side visual: `monteerly_06_marketing_showcase_full.png` أو `monteerly_13_analytics_dashboard_woman_ai.png` لدعم فكرة التوسع والقيمة.[file:176]
- Cards للخطة المؤسسية: `monteerly_20_testimonial_business_exec_corporate.png`.[file:176]
- للوكالات: `public/images/platform/agency_management.png`.[file:176]

### 5.3 صفحة الأمن والثقة `/trust-security`

- `monteerly_05_security_digital_lock_cyber.png` كالصورة الرئيسية.[file:176]
- `monteerly_06_marketing_showcase_full.png` لتوضيح التكامل بين الأمان وباقي الوحدات.[file:176]
- `monteerly_08_branding_creative_assets.png` لدعم جزء حماية الأصول الرقمية.[file:176]

### 5.4 صفحة About / Story

- `monteerly_03_profile_ahmed_gamal_circle.png` لرسالة المؤسس.[file:176]
- `monteerly_07_tech_innovation_portrait.png` و`monteerly_06_marketing_showcase_full.png` لدعم الرؤية التقنية والمنظومية.[file:176]

### 5.5 صفحة Gallery

يجب أن تعرض كل صور Monteerly الرئيسية الـ24 + صورة التلعيب، مع captions وalt text احترافيين، لأن هذا هو العرض البصري المرجعي للعلامة.[file:176]

### 5.6 صفحات Auth

- `public/images/platform/auth_login_bg.png` خلفية أساسية لصفحات الدخول/التسجيل.[file:176]
- `monteerly_02_main_logo_full.svg` للشعار.[file:176]
- يمكن استخدام `monteerly_05_security_digital_lock_cyber.png` أو `monteerly_15_creator_workspace_laptop_modern.png` في اللوحة الجانبية حسب نوع الصفحة.[file:176]

### 5.7 Dashboard

- `monteerly_13_analytics_dashboard_woman_ai.png` أو `public/images/platform/wallet_dashboard.png` للبطاقات التوضيحية والempty states المرئية.[file:176]
- لا يجب إغراق الـ dashboard بصور تسويقية كثيرة؛ الاستخدام الأفضل يكون في intro panels وempty states فقط.[file:176]

### 5.8 Workspace / Studio

- `monteerly_12_editor_red_shirt_timeline.png` و`public/images/platform/studio_timeline.png` مرجعان بصريان أساسيان للاستوديو.[file:176]
- `monteerly_14_editor_professional_dual_screen.png` في intro panel أو empty state للمحرر الاحترافي.[file:176]

### 5.9 Marketplace

- `public/images/platform/marketplace_hero.png` في Hero الصفحة.[file:176]
- `monteerly_16_editor_arab_thobe_collaboration.png` كأول بطاقة carousel أو بطاقة مميزة.[file:176]
- `monteerly_19_testimonial_creative_hoodie_freelance.png` و`monteerly_17_testimonial_woman_gray_suit_office.png` في قصص النجاح أو trust panels.[file:176]

### 5.10 Library

- `monteerly_21_photographer_saudi_heritage_traditional.png`.[file:176]
- `monteerly_22_photographer_algerian_drone_aerial.png`.[file:176]
- `monteerly_23_photographer_library_heritage_cinematic.png`.[file:176]
- `monteerly_24_photographer_algerian_drone_cityshot.png`.[file:176]

هذه الأربع هي backbone البصري لقسم المكتبة، التراث، الترخيص، والتصوير الجوي.[file:176]

### 5.11 Academy

- `public/images/platform/course_thumbnail_1.png`.[file:176]
- `public/images/platform/course_thumbnail_2.png`.[file:176]
- يمكن دعم hero الخاص بالأكاديمية بـ `monteerly_07_tech_innovation_portrait.png` أو `monteerly_15_creator_workspace_laptop_modern.png` وفق السرد.[file:176]

### 5.12 Consultations

- `public/images/platform/consultation_booking.png` كمرجع بصري للحجز.[file:176]
- دعم testimonial أو trust panel عبر `monteerly_17_testimonial_woman_gray_suit_office.png` أو `monteerly_18_testimonial_executive_growth_charts.png`.[file:176]

### 5.13 Agencies

- `public/images/platform/agency_management.png` كالصورة الرئيسية.[file:176]
- `monteerly_20_testimonial_business_exec_corporate.png` كشهادة مؤسسية.[file:176]
- `monteerly_11_global_collaboration_grid_4up.png` لدعم فكرة العمل متعدد الفرق والعملاء.[file:176]

### 5.14 Error / 404

- `public/images/platform/error_404_bg.png` كخلفية صفحة 404.[file:176]
- الشعار `monteerly_02_main_logo_full.svg`.[file:176]

## 6. Alt text وCaptions المهنية الأساسية

### 6.1 الشعار والهوية

- AR: "شعار Monteerly Studio — نظام التشغيل الإبداعي".[file:176]
- EN: "Monteerly Studio main logo — Creative OS".[file:176]

### 6.2 المؤسس

- AR: "أحمد جمال — المؤسس والرئيس التنفيذي. رؤيتنا تحويل الفوضى الإبداعية إلى تدفق رقمي منظم للمبدعين العرب.".[file:176]
- EN: "Ahmed Gamal — Founder & CEO. Our mission is to turn creative chaos into a structured digital revenue stream for Arabic creators.".[file:176]

### 6.3 الأمان

- AR: "حماية من المستوى العسكري لأصولك الرقمية.".[file:176][file:177]
- EN: "Military-grade protection for your digital assets.".[file:176][file:177]

### 6.4 الهيرو

- AR: "منصة الإنتاج الإعلامي الأكثر تكاملاً في الشرق الأوسط.".[file:176]
- EN: "The MENA region’s most comprehensive media production OS.".[file:176]

## 7. الدستور الشامل للعبارات الاحترافية

### 7.1 المبدأ التوجيهي

الشخصية المعتمدة لصوت Monteerly يجب أن تكون: خبير تقني، حازم، ومطمئن، بالعربية الفصحى الحديثة الخالية من الحشو، وبالإنجليزية المباشرة المختصرة الموجهة للفعل.[file:177]

### 7.2 حالات التحميل

| السياق | AR | EN |
|---|---|---|
| فتح الاستوديو | جاري استدعاء الأصول السحابية وتجهيز بيئة العمل... | Initializing Workspace & Fetching Cloud Assets... [file:177] |
| معالجة الفيديو | تخصيص وحدات المعالجة الرسومية... | Allocating High-Performance GPU Nodes... [file:177] |
| الدفع | جاري تأمين القنوات المالية المشفرة... | Securing Encrypted Financial Gateways... [file:177] |
| الحفظ | تمت المزامنة مع السحابة (مشفر). | Synced to Cloud Vault (Encrypted). [file:177] |

### 7.3 رسائل الخطأ والتعافي

| السياق | AR | EN |
|---|---|---|
| انقطاع النت | فُقد الاتصال بالقمر الصناعي. النسخة المحلية نشطة وآمنة. | Uplink Lost. Local Backup Active & Secure. [file:177] |
| 404 | هذا المسار غير موجود في خريطة النظام (404). | Route Not Found in System Map (404). [file:177] |
| رفض الصلاحية | عذراً، تصريحك الأمني لا يسمح بدخول هذه المنطقة. | Access Denied. Insufficient Security Clearance. [file:177] |

### 7.4 Hero copy

- AR Headline: "نظام التشغيل المركزي لصناعة المحتوى الحديثة.".[file:177]
- EN Headline: "The Central Operating System for Modern Production.".[file:177]
- AR Sub-head: "أدر الفوضى، أمّن الأصول، وضاعف الأرباح. منصة واحدة تجمع الاستوديو السحابي، السوق المفتوح، والعقود الذكية.".[file:177]
- EN Sub-head: "Manage chaos, secure assets, and scale revenue. One unified platform combining Cloud Studio, Marketplace, and Smart Contracts.".[file:177]
- AR CTA: "أطلق الاستوديو مجاناً".[file:177]
- EN CTA: "Deploy Studio Free".[file:177]

### 7.5 Trust & Security copy

- AR: "الأمن هنا جزء من منطق التشغيل، لا مجرد طبقة إضافية.".[file:122][file:123]
- AR: "أعمالك ليست مجرد ملفات، هي أصول رقمية.".[file:177]
- AR: "نحميها بتشفير AES-256 ونظام الضمان المالي حتى التسليم.".[file:177]
- EN: "Security is built into the operating logic, not added as a layer.".[file:177]

### 7.6 Studio & Production copy

- AR: "معالجة وتسليم نهائي" لزر التصدير.[file:177]
- AR: "إنشاء رابط مراجعة آمن" لزر المشاركة.[file:177]
- AR: "المساعد الإخراجي" لزر أو لوحة الـ AI.[file:177]
- AR: "إدخال مواد خام" لوظيفة الاستيراد.[file:177]
- AR: "أرشفة في سلة المهملات" بدل الحذف المباشر.[file:177]

### 7.7 Finance & Business copy

- AR: "السيولة المتاحة" بدل الرصيد الكلي.[file:177]
- AR: "في حساب الضمان" بدل الرصيد المعلق.[file:177]
- AR: "تحويل للحساب البنكي" لزر السحب.[file:177]
- AR: "إصدار مطالبة مالية رسمية" للفواتير.[file:177]
- AR: "استحواذ على الترخيص" لشراء أصل من المكتبة.[file:177]
- AR: "استخدام تجاري عالمي" لوصف الحقوق.[file:177]

### 7.8 Developer / Growth copy

- AR: "مركز قيادة المطورين".[file:177]
- AR: "بيانات الاعتماد السرية".[file:177]
- AR: "مستمعات الأحداث".[file:177]
- AR: "شريك النجاح" لبرنامج الشركاء.[file:177]
- AR: "رابط التتبع الفريد الخاص بك".[file:177]
- AR: "حصة الإيرادات".[file:177]

### 7.9 Wellbeing / Community copy

- AR: "عزل المشتتات وبدء التدفق" للدخول إلى وضع التركيز.[file:177]
- AR: "العودة للعالم" للخروج من وضع التركيز.[file:177]
- AR: "النظام ينصح باستراحة بصرية لمدة 20 ثانية.".[file:177]
- AR: "ساهم في هندسة النظام." لواجهة الملاحظات.[file:177]
- AR: "إرسال تقرير للمهندسين" لزر الإرسال.[file:177]

## 8. إضافات احترافية مقترحة للنسخة النهائية

هذه العبارات إضافات مقترحة لتوسيع الوثيقة بما يحافظ على الصوت نفسه دون كسر الهوية الأسلوبية المعتمدة في الملفات المرفقة.[file:177][file:123]

### 8.1 Navbar

- المنتج.
- الحلول.
- الأسعار.
- الثقة والأمان.
- الوكالات.
- للمؤسسات.
- تسجيل الدخول.
- ابدأ الاستوديو مجانًا.[file:122][file:123]

### 8.2 CTA blocks

- AR: "ابدأ الآن من مساحة واحدة تجمع المراجعة، الحماية، والتحصيل.".
- AR: "حوّل المشروع من ملف متناثر إلى عملية قابلة للإدارة.".
- AR: "حين تصبح المراجعة أوضح، يصبح التسليم أسرع.".
- AR: "كل أصل في مكانه، وكل قرار موثّق، وكل دفعة محسوبة.".

### 8.3 Empty states

- لا توجد مشاريع نشطة حاليًا. ابدأ مشروعك الأول لتفعيل خط الإنتاج.[file:122]
- لا توجد جلسات محجوزة بعد. افتح رزنامتك أو احجز مستشارك الأول.[file:122][file:123]
- لا توجد مبيعات في المكتبة حتى الآن. أضف أول أصل بجودة وترخيص واضحين.[file:122][file:123]
- صندوق الإشعارات هادئ الآن. عندما يحدث شيء مهم، سيصل هنا أولاً.[file:123]

### 8.4 Finance reassurance

- أموالك لا تنتقل عشوائيًا؛ كل حركة تمر عبر سجل مالي قابل للتتبع.[file:122][file:123]
- كل دفعة تمر بحالة واضحة: تمويل، حجز، اعتماد، تحرير، أو تسوية.[file:122][file:123]
- عند الحاجة، يستطيع فريق المالية مراجعة الحالات الحساسة دون كسر تجربة المستخدم.[file:122][file:123]

### 8.5 Marketplace reassurance

- اعثر على الموهبة المناسبة بناءً على أسلوب العمل، لا الكلمات العامة فقط.[file:123]
- من brief منظم إلى proposal واضح إلى escrow ممول، كل شيء يحدث داخل المنصة.[file:123]

## 9. تطبيق تقني للنصوص

يجب تخزين النصوص في ملفات ترجمة بمفاتيح واضحة بدل كتابتها مباشرة في المكونات، حتى تظل الصياغة قابلة للإدارة والتحديث والقياس.[file:177]

مثال بنيوي:

```json
{
  "ui": {
    "buttons": {
      "deploy": "أطلق الاستوديو",
      "secure_pay": "تأمين الدفع",
      "render": "معالجة نهائية"
    },
    "states": {
      "loading_studio": "جاري استدعاء الأصول السحابية وتجهيز بيئة العمل...",
      "saving": "تمت المزامنة مع السحابة (مشفر).",
      "offline": "العمل مستمر في الوضع المحلي"
    },
    "finance": {
      "escrow_tooltip": "هذا المبلغ محجوز لدى طرف ثالث لضمان حقك",
      "invoice_generate": "إصدار فاتورة ضريبية"
    }
  }
}
```
[file:177]

## 10. القرار التنفيذي النهائي

الوثيقة التنفيذية النهائية لمنصة Monteerly يجب أن تتضمن رسميًا: تعريف المنصة، طرق الدفع الرسمية، الخطة الكاملة للتخزين السحابي، خريطة الصور الفعلية الموجودة داخل المشروع، أماكن استخدام كل صورة داخل جميع الصفحات، alt text وcaptions، الدستور الشامل للعبارات الاحترافية، والإضافات المقترحة المتسقة مع صوت العلامة.[file:122][file:123][file:176][file:177][file:178]

ويُعتمد أن الأصول البصرية الرسمية الحالية موجودة داخل `public/images/monteerly` و`public/images/platform`، وأن طرق الدفع الرسمية الحالية هي Paymob ثم PayPal، وأن التخزين السحابي يعتمد Buckets مفصولة وسياسات وصول وتشفير ومراجعة واضحة.[file:176][file:178][file:122]

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

