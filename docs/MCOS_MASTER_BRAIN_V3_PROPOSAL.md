# MCOS Master Brain V3 — Proposal

> **الحالة:** Proposal / Needs Human Review
> **النفاذ:** غير نافذ، غير Canonical، ولا يستبدل أي ملف عقل أو دستور حالي
> **تاريخ الجرد:** 2026-08-27
> **النطاق:** تصميم مرجعي مقترح لمنصة Monteerly Studio (MCOS)، مبني على الأدلة المحلية المتاحة فقط
> **قاعدة حاكمة:** وجود صفحة أو component أو route لا يثبت اكتمال الميزة أو أمانها أو تشغيلها في الإنتاج.

## 1. Governance and Provenance

### 1.1 الهدف والنفاذ

تجمع هذه الوثيقة الرؤية، حدود الثقة، نموذج المجالات، فجوات التنفيذ، القرارات المعمارية المطلوبة، وبوابات الإطلاق في مرجع واحد قابل للمراجعة. وهي Proposal فقط: لا تغيّر تلقائيًا .docs/MASTER_BRAIN.md أو ملفات runtime أو الدستور، ولا تمنح إذنًا لتنفيذ migration أو تغيير RLS أو الدفع أو دفتر الأستاذ.

### 1.2 ترتيب الأدلة المستخدم

1. دليل قابل لإعادة التشغيل: اختبارات، سجلات تحقق، وسياسات تحقق محددة.
2. الكود الحالي وServer Actions وAPI routes والإعدادات.
3. migrations وsupabase-schema.sql وprisma/schema.prisma بوصفها **نية محلية**؛ لا تثبت حالة قاعدة بيانات فعلية.
4. الوثائق المرجعية الحالية.
5. الوثائق والتقارير التاريخية؛ تفيد في الرؤية ولا تثبت التنفيذ.
6. المقترحات الواردة هنا، وحالتها دائمًا Proposed حتى الاعتماد.

لا يوجد حاليًا ترتيب Canonical متسق ومُعتمد بين مصادر العقل؛ حسمه موضوع ADR-013.

### 1.3 قاموس الحالات

| الحالة | التعريف |
|---|---|
| Verified | دليل محلي محدد وقابل لإعادة التشغيل يثبت السلوك المقصود في النطاق المختبر فقط. |
| Partial | أجزاء من التدفق موجودة، مع فجوات وظيفية أو أمنية أو تشغيلية. |
| UI Only | واجهة أو مكوّن موجود بلا دليل backend/DB/test كافٍ. |
| Prototype | منطق تجريبي أو محاكاة أو قيم ثابتة أو عقد غير مكتمل. |
| Missing | لا يوجد تنفيذ مطابق في المصادر المفحوصة. |
| Blocked | لا يجوز الاعتماد أو الإطلاق قبل إزالة مانع موثق. |
| Not Verifiable | المصدر أو البيئة أو الدليل غير متاح في هذا التدقيق. |
| Proposed | تصميم مستقبلي يحتاج قرارًا وموافقة قبل التنفيذ. |

### 1.4 سياسة الادعاءات

- لا توصف المنصة بأنها production-ready أو secure أو compliant دون Evidence قابل لإعادة التشغيل ومحدد النطاق.
- نجاح build سابق لا يثبت صحة التدفقات المالية أو RLS أو الإنتاج.
- نجاح اختبار رفض الزائر لا يثبت صحة صلاحيات المستخدمين المصادقين أو عزل المؤسسات والمشروعات.
- أسماء Escrow وSmart Contract وEncrypted/Sovereign في الواجهة ليست دليلًا قانونيًا أو ماليًا أو تشفيريًا.

### 1.5 سجل Provenance

| المصدر | أثره في V3 | التصنيف/الملاحظة |
|---|---|---|
| AGENTS.md و.codex/AGENTS.md | قيود العمل ووعي Next.js والإجراءات المحلية | تعليمات تشغيلية؛ لا تثبت حالة المنتج. |
| .docs/MASTER_BRAIN.md و.docs/monteerly_unified_executive_document.md | الرؤية، الطبقات، UX، Paymob/PayPal | متطابقان بايتًا في الجرد الحالي؛ مرجع رؤية، لا دليل تنفيذ. |
| .docs/runtime/brain.current.md | snapshot تاريخي من العقل | مطابق لـUltimate Blueprint ذي 415 سطرًا، وأقدم من Master Brain الحالي. |
| .docs/runtime/brain.manifest.json | تعريف runtime المعلن | غير متسق: يشير إلى hash/عدد أسطر النسخة القديمة؛ BRAIN-001. |
| docs/ULTIMATE_MCOS_CONSTITUTION.md | مبادئ UX والحوكمة | يتضمن ادعاءات جاهزية تاريخية غير كافية كدليل. |
| docs/MCOS_MASTER_SYSTEM_MAP.md | خريطة نظام تاريخية | خريطة قصيرة وقديمة مقارنة بالroutes الحالية. |
| تقارير docs/vision وdocs/sprints وdocs/governance | أفكار الأدوار والوكلاء والإطلاق وRLS وEscrow | Historical / Non-Canonical ما لم تُدعَّم بالكود والاختبارات. |
| artifacts/*-20260827*.log | build/lint/type/Playwright محفوظ سابقًا | build نجح، lint: 0 errors/123 warnings، Playwright: 8/8؛ ليس إعادة تشغيل في هذا التدقيق. |
| الكود وmigrations والمخططات | الحالة المحلية والنية التنفيذية | أعلى مرجع محلي للحالة، مع بقاء DB/production Not Verifiable. |
| Google Drive prompt.txt | متطلبات إنشاء هذا المقترح | مصدر تعليمات فقط؛ لم تُعدّل ملفات Drive. |

أي إشارات سابقة إلى **Firebase** أو **Stripe**، ومنها scripts/setup-env.js وdocs/vision/Monteerly-Technical-Gaps.md وبعض التقارير المؤرشفة، هي **Historical / Non-Canonical** ولا تدخل في التصميم المستقبلي. لا Firebase ولا Stripe ضمن MCOS V3.

### 1.6 Not Verifiable / Source Missing

- next.config.mjs غير موجود؛ المتاح next.config.js فقط.
- تقارير Baseline Audit وArchitecture Inventory وP0-A وP0-A.1 وDrive Analysis وLaunch Matrix ليست ملفات محلية مستقلة قابلة لإعادة القراءة؛ استُخدم فقط ما بقي موثقًا في سياق المهمة، وما عداه Source Missing.
- حالة Supabase/Vercel/GitHub/Paymob/PayPal والإنتاج لم تُفحص في هذا العمل: Not Verifiable.
- تطبيق migrations المحلية على أي بيئة غير مثبت، ولا يجوز استنتاجه من وجود الملفات.
- حالة CI الفعلية، إعداد buckets، الأسرار، Sentry events، النسخ الاحتياطية، provider dashboards، وlegal/compliance approvals غير متاحة.

## 2. Vision and Product Principles

Monteerly نظام تشغيل للعمل الإبداعي يربط اكتشاف المواهب والخدمات، التعاقد، الدفع، الإنتاج، مراجعة الوسائط، التسليم، التسوية، والسمعة داخل نطاقات ثقة قابلة للتدقيق.

الدورة المستهدفة:

**اكتشاف → طلب/خدمة → عرض واختيار → اتفاق → دفع → تنفيذ → مراجعة → تسليم → تسوية → سمعة وتحليلات**.

المبادئ:

- **Evidence Before Claim:** كل claim له owner ودليل وتاريخ صلاحية.
- **Security and Trust by Design:** المصادقة لا تساوي التفويض، والدور لا يساوي ملكية المورد.
- **Additive Evolution:** الحفاظ على الصفحات والميزات الحالية، مع نقل غير الجاهز إلى Partial/Prototype بدل حذفه.
- **Human Approval:** تغييرات schema/RLS/triggers/migrations والدفع وEscrow/Ledger والإنتاج تحتاج موافقة بشرية صريحة.
- **Server Authority:** السعر، حالة الدفع، الملكية، العضوية، KYC، النزاع، والتحويل المالي تُحسم خادميًا.
- **Honest UX:** لا claims مضللة عن التشفير أو الضمان أو الامتثال أو الذكاء.

## 3. Stack and Non-Goals

### 3.1 Stack الملزم

- Next.js 16.2.1 + React 19.2.4 + TypeScript 5 + pnpm.
- Supabase Auth/Postgres للهوية والبيانات التشغيلية.
- R2/S3-compatible أو Supabase Storage بعد ADR-007.
- Sentry بعد redaction وسياسة PII وعينات مناسبة.
- Resend + React Email للبريد المعاملي مع outbox.
- Vercel: Preview أولًا، ثم Production بموافقة.
- Paymob أساسي؛ PayPal دولي اختياري فقط.

### 3.2 Non-goals

- لا Firebase ولا Stripe.
- لا AI كسلطة مالية أو أمنية أو قانونية نهائية.
- لا نماذج LLM/OCR ضخمة مفروضة على الجهاز المحلي؛ الجهاز واجهة تحكم، والتنفيذ الثقيل خدمة مُدارة بعد قرار.
- لا اعتماد على cookie أو metadata أو state عميل كمصدر صلاحية.
- لا service role في client bundle.
- لا توسيع لمزوّد دفع آخر ضمن التنفيذ الحالي. أي بديل مستقبلي يظل Future Consideration / Unapproved.

### 3.3 تعارضات Toolchain الحالية

- pnpm-lock.yaml وحيد، لكن package.json لا يثبت packageManager، وCI يثبت pnpm 9، بينما baseline سجل pnpm 11.5.2.
- scripts/cto.mjs يوصي بأوامر npm، يقرأ/ينسخ .env.local، يجري network health، commit تلقائيًا، ويحذف .next وapp/ في وضع heal؛ لا يُشغّل قبل عزله ومراجعته.
- scripts/setup-env.js مرجع Firebase قديم وغير متسق ويبدو غير صالح؛ Historical / Non-Canonical.
- eslint.config.mjs هو Flat Config الحالي، بينما .eslintrc.json تكوين قديم موازٍ؛ يجب اعتماد مصدر واحد عبر قرار لاحق دون حذف قبل المراجعة.
- next.config.mjs مفقود؛ لا يوجد تعارض ثنائي فعلي الآن، لكن الوثائق التي تفترض وجوده قديمة.

## 4. Personas, Identity, and Authorization

### 4.1 Personas

Visitors، Clients، Freelancers، Agencies، Organization Members، Project Collaborators، Reviewers، Admin، Executive، Support، Finance/KYC/Moderation Operators، Enterprise Administrators، Developers/API Consumers، وAgent/System Identities.

### 4.2 نموذج الفصل المقترح

| البعد | مصدر الحقيقة المقترح | قاعدة الوصول |
|---|---|---|
| Identity | Supabase auth.users | جلسة موثقة بـauth.getUser() خادميًا. |
| Account Type | profiles.account_type | اختيار المستخدم: client/freelancer/agency؛ يضبط التجربة لا الصلاحية السيادية. |
| System Role | مخزن مخصص مثل user_system_roles | يبدأ user، ولا يأتي من FormData/cookie/metadata/profile update؛ تغييره بإجراء إداري مدقق. |
| Organization Membership | membership مستقل | tenant + status + scoped role؛ لا يُستنتج من account_type. |
| Project Membership | membership مستقل للمشروع | owner/member/reviewer مع حالة دعوة وانتهاء. |
| Scoped Capability | capability مشتقة خادميًا | action + resource + context؛ أقل صلاحية، قابلة للإلغاء، ولا تُخزن كقرار في العميل. |

الحالة: النموذج Proposed حتى اعتماد ADR-002 وADR-003.

### 4.3 الحالة الحالية

- src/proxy.ts يتحقق من user ثم يقرأ user_system_roles للمسارات admin/executive/finance/disputes.
- requireUser وrequireSystemRole وwithAuthGuard توفر حراسة request-scoped جزئيًا.
- AuthGuard وRoleContext عميلان؛ مفيدان للعرض فقط. AuthProvider وRoleProvider لا يظهر أنهما مركبان في layout الحالي.
- auth/page.tsx ينفذ auth من العميل ويعرض Debug Info يتضمن معرف/email وحالة session؛ يجب ألا يظهر في UX إنتاجي.
- supabaseAdmin server-only، لكن استعماله يتطلب حارسًا وownership قبل كل query.
- migration الأصلية سمحت بدور من raw_user_meta_data؛ migrations اللاحقة فصلت account type/system role، لكن حالة DB غير قابلة للتحقق.

## 5. Canonical Domain Model Proposal

> نموذج مفاهيمي فقط؛ لا يمثل SQL أو إذن migration.

| الكيان | الغرض والمالك | مصدر الحقيقة والعلاقات والحالات | الحساسية وRLS | الحالة الحالية والتبعيات وقبول المستقبل |
|---|---|---|---|---|
| Service Offering | حزمة خدمة يملكها freelancer/agency | profile + add-ons + availability؛ draft/published/paused/retired | السعر وسياسة التسليم؛ كتابة للمالك وقراءة عامة للمنشور | Partial: services مستعلم عنه بلا schema canonical؛ يقبل بعد CRUD وRLS واختبارات التسعير. |
| Job / Opportunity | طلب يملكه client/organization | proposals ثم selection/order؛ draft/open/shortlisted/awarded/closed/canceled | budget وبيانات العميل؛ owner/org membership | Partial: jobs موجود لكن المخططات متعارضة؛ قبول بعزل المالك والحالات. |
| Proposal / Selection | عرض من موهبة واختيار موثق | job + proposer + terms؛ submitted/withdrawn/accepted/rejected | عرض مالي وهوية؛ الأطراف فقط | Missing؛ يلزم ADR-001 وmembership وRLS واختبارات السباق. |
| Order / Engagement | التزام تجاري بعد اختيار/شراء | service/job + parties + contract/payment؛ pending/active/completed/canceled | بيانات تجارية؛ الأطراف والعمليات فقط | Partial: orders مستخدم بلا تعريف متسق؛ قبول بإنشاء idempotent وربط الأسعار الخادمية. |
| Contract | اتفاق ونسخ وقبول | order + parties + revisions/signatures؛ draft/review/accepted/active/terminated/disputed | وثيقة قانونية؛ parties/legal capability | Partial/Blocked: عدة أسماء جداول وstubs؛ قبول بأثر قبول وتوقيع ونسخ غير قابلة للطمس. |
| Project / Workspace | حاوية الإنتاج | order/contract + memberships + tasks/assets؛ planned/active/review/completed/archived | محتوى وملكية؛ membership/capability | Partial: jobs/projects/production_projects متداخلة؛ قبول بعد canonical mapping وRLS. |
| Memberships | يربط user بـorg/project | subject + scope + role/capabilities؛ invited/active/suspended/expired | أمني؛ self-view وإدارة مخولة | Missing؛ شرط P0 لأي مشاركة. |
| Deliverable / Asset / Media Version | دورة حياة الملفات | project + uploader + version lineage؛ uploading/scanning/ready/review/approved/quarantined/deleted | شديد الحساسية؛ private-by-default وsigned access | UI/Partial؛ قبول بmetadata موثوق وchecksum وscan وversion RLS. |
| Review / Approval / Change Request | قرار قابل للتدقيق | media version + anchors/comments؛ open/resolved/approved/changes_requested | مشروع خاص؛ أعضاء محددون | Partial: timecoded comments/actions؛ لا threads/atomic release كامل. |
| Dispute | نزاع وأدلة واستئناف | order/contract/escrow + case events؛ opened/triage/evidence/review/decided/appealed/closed | قانوني/مالي؛ arbiter capability والأطراف | Partial/Blocked: تحديثات متعددة غير ذرية ومبالغ صفرية؛ قبول بstate machine وfour-eyes. |
| Payment Intent | أمر دفع يولده الخادم | order + provider + amount minor units؛ created/pending/succeeded/failed/expired | مالي؛ العميل لا يحدد authority | Prototype/Blocked: checkout يثق في amount؛ قبول بعقد provider-neutral وidempotency. |
| Provider Event | inbox للwebhook | provider event ID + signature + payload hash؛ received/verified/applied/rejected | أسرار/PII؛ server-only | Missing: Paymob بلا HMAC وPayPal stub؛ قبول بتوقيع وreplay/out-of-order tests. |
| Escrow / Ledger | حفظ الحقيقة المالية | accounts + immutable entries + references؛ state machine بالقسم 9 | أعلى حساسية؛ لا update لمداخل ledger | Prototype/Blocked: schemas وأسماء/units متعارضة؛ قبول double-entry invariants وتسوية. |
| Payout / Refund / Chargeback | حركة خارجية مضبوطة | reservation + approvals + provider op؛ requested/reserved/approved/processing/settled/failed/reversed | four-eyes وidempotency | Missing/Prototype؛ approveWithdrawal يسجل فقط؛ قبول بمزوّد sandbox وتسوية. |
| Audit / Notification | أثر القرار وإبلاغ غير حاجب | domain event + outbox + attempts؛ pending/sent/failed/dead-letter | تقليل PII؛ actor خادمي موثق | Partial: audit actor أحيانًا نص والبريد مباشر؛ قبول outbox/dedup/redaction. |

## 6. Project, Organization, and Collaboration Model

- Organization هي tenant مستقل، وAgency/Enterprise أشكال حساب منظمة لا أدوار نظام.
- membership يربط user بـorganization/project، مع invitation وstatus وexpiry وcapabilities وaudit.
- capabilities المقترحة: project.view وasset.upload وreview.comment وreview.approve وcontract.accept وbilling.view وdispute.manage؛ تُقيّم خادميًا.
- account_type لا يمنح وصولًا لمشروع. client/freelancer/agency يصف persona فقط.
- Guest review links: token مجزأ/مخزن hash، scope ضيق، انتهاء، revocation، no-download افتراضيًا، وrate limit.
- Realtime presence والبث لا يتجاوزان RLS؛ القناة مرتبطة بعضوية موثقة.
- المهام/milestones/approvals كيانات مستقلة ذات state وowner وdue date وأثر قرار.
- الحالة الحالية: CollaborationContext cursor ثابت، وVideoSyncEngine يبث باسم project دون دليل membership؛ Prototype.

## 7. Studio and Media Platform

التصميم المستهدف:

1. **Ingestion:** تذكرة رفع خادمية بعد membership/quota، ثم object مؤقت.
2. **Validation:** MIME حقيقي، size/duration، checksum، malware scan، وquarantine.
3. **Derivatives:** source/proxy/thumbnail/waveform/transcript بواسطة workers؛ FFmpeg pipeline Proposed حتى وجود workers واختبارات وقياسات.
4. **Versioning:** lineage immutable، current version pointer، مقارنة نسخ، watermarks وسياسات download.
5. **Review:** rooms خاصة، timecode/frame anchors، threaded comments، change requests، approvals، وإعادة اتصال/conflict strategy.
6. **Lifecycle:** retention، recycle bin، legal hold، deletion، backup/restore.

الحالة الحالية: توجد صفحات Studio/Workspace/Production ومكونات player/annotations/comparison وServer Actions للتعليقات والتسليم. لكن R2 يولّد public URLs، route /api/storage/r2 لا يثبت membership للمشروع، وSupabase Storage في KYC/production يعتمد على RLS غير مثبت؛ لذلك الحالة Partial/Blocked.

## 8. Marketplace, Talent, and Productized Services

المستهدف: profiles موثقة، service packages/add-ons، jobs/proposals، matching قابل للتفسير، availability، portfolio verification، أسعار خادمية، روابط عروض/دفع محدودة، white-label portal، licensing/stock، anti-fraud/spam/appeals، وتحليلات للبائع والعميل.

الحالة الحالية:

- صفحات Market/Marketplace/Talent/Hire/Store موجودة، وبعضها يتصل بـSupabase.
- createOrder يقرأ سعر service خادميًا، لكنه ينشئ order ثم يستدعي holdFundsInEscrow وgenerateContract غير المتكامل؛ لا transaction ذرية ولا rollback.
- generateContract stub يعيد true، فلا يوجد دليل عقد فعلي.
- proposals، ranking governance، availability، verified portfolio، licensing rights، anti-spam/appeal واختبارات رحلة كاملة غير مثبتة.

التصنيف: UI Only / Partial.

## 9. Finance, Paymob, PayPal, Escrow, and Ledger

### 9.1 مزودو الدفع المعتمدون

- **Paymob أساسي:** Visa/MasterCard، Fawry، Mobile Wallets، وApple Pay فقط عندما تكون متاحة ومفعلة في حساب Paymob.
- **PayPal:** خيار إضافي للعملاء الدوليين فقط.
- لا مزود آخر في التنفيذ الحالي.

### 9.2 عقد الدفع المستهدف

- Payment Intent ينشأ خادميًا من order/contract وسعر مخزن؛ لا يقبل amount/state/owner كحقيقة من العميل.
- جميع الأموال integer minor units مع currency صريحة وrounding وقواعد fee/tax/FX ذات نسخ.
- adapter provider-neutral لـPaymob/PayPal، مع credentials server-only.
- webhook inbox يتحقق من signature/HMAC، يسجل provider event ID وpayload hash، يرفض replay، ويتعامل مع out-of-order events.
- idempotent command/outbox يمنع تكرار order/email/ledger عند retry.
- البريد والإشعار نتيجة جانبية مستقلة؛ فشلهما لا يعيد الحركة المالية.

### 9.3 Escrow state machine المقترحة

initiated → pending_provider → funded → held → delivery_submitted → changes_requested | approved → released → closed

الفروع: disputed → refunded | released، وchargeback_review → closed. كل transition له actor/capability/preconditions/idempotency key وledger entries؛ لا تحديث يدوي للحالة بلا command مدقق.

### 9.4 Ledger وPayout

- دفتر append-only/double-entry، مجموع debit=credit لكل transaction، ولا delete/update للمداخل.
- payout يمر reservation → four-eyes approval → provider processing → settlement/reversal.
- reconciliation يومي مع provider، مع refunds/chargebacks ونسخ قواعد fee/tax/FX.
- audit immutable يفصل actor/request/provider evidence.

### 9.5 الحالة الحالية الصريحة

**Partial / Blocked:**

- /api/checkout/paymob غير محمي ويأخذ amount من JSON العميل ويستخدم بيانات billing ثابتة.
- Paymob webhook لا يتحقق من HMAC/signature ولا يكتب payment/ledger state؛ يرسل بريدًا فقط.
- PayPal webhook stub يعيد received=true بلا تحقق.
- RevenueEngine يستخدم floating numbers ونسبًا ثابتة غير versioned.
- approveWithdrawal يغيّر audit action فقط ولا ينفذ payout.
- dispute actions تكتب transactions بمبلغ 0 وتنفذ تحديثات متعددة غير ذرية.
- supabase-schema.sql وPrisma وmigrations والكود تستخدم transactions وfinancial_transactions وfinance_transactions وgeneral_ledger وfinancial_ledgers بحقول وحالات مختلفة.

لا يوجد دليل sandbox/provider/reconciliation/chargeback أو RLS قابل لإعادة التشغيل.

## 10. Contracts, KYC, Disputes, and Compliance

- Contract: templates، parties، revisions، acceptance evidence، signatures، NDA/IP transfer/releases، immutable audit.
- KYC: case منفصل، provider/manual review، encrypted evidence locker، expiry/reverification، least privilege، no raw ID in logs.
- Dispute: opening، triage، evidence window، decision، financial command، notification، appeal، SLA، legal hold.
- Privacy: retention، DSAR، breach response، deletion exceptions، وسياسات يراجعها مستشار قانوني.

الحالة الحالية Partial/Blocked:

- contracts وlegal_contracts وcontract_revisions وproduction/ledger integrations غير متسقة، وبعض contract logic stub.
- KYC يرفع من العميل إلى secure-vault، ويواصل محاكاة النجاح عند فشل الرفع؛ يخزن document_id مباشرة في profile، وschema/RLS غير مثبت.
- admin KYC fallback يجلب profiles.* ويطبع أسماء الأعمدة؛ يحتاج تقليل صلاحية وبيانات.
- النزاع محمي إداريًا في بعض المسارات، لكن الحالة والمال غير ذريين وتوجد عدة implementations.
- لا يجوز ادعاء AML/GDPR/data residency/encryption/military-grade أو التوقيع القانوني دون دليل وقرار قانوني.

## 11. Storage, Privacy, and Data Lifecycle

### 11.1 النموذج المستهدف

- تصنيف objects: public marketing، private project، restricted KYC/legal، temporary processing.
- private-by-default؛ signed upload/download محدودان بالعضوية وcontent type وsize وduration وquota وexpiry.
- checksum + MIME sniffing + malware scan + quarantine قبل ready.
- object key يولده الخادم ولا يقبل path/tenant/project authority من العميل.
- metadata يربط object بالtenant/project/uploader/version/retention/legal hold.
- recycle bin، secure deletion، retention exception، backup/restore، RPO/RTO واختبار recovery.
- اختيار R2/S3-compatible أو Supabase Storage/data residency عبر ADR-007 فقط.

### 11.2 الحالة الحالية

- R2 implementations متعددة وبأسماء env مختلفة: CLOUDFLARE_R2_* وR2_*.
- public URL يُرجع مباشرة؛ لا evidence download authorization.
- /api/storage/r2 يقبل projectId دون membership lookup، و/api/upload/presign user-scoped فقط لا resource-scoped.
- uploadLightFile يستخدم getPublicUrl حتى للوثائق؛ يتعارض مع private-by-default.
- KYC وproduction client uploads تعتمد على bucket/RLS غير مثبتين.

التصنيف: Partial / Blocked.

## 12. AI, Guardian, and Agent Mesh

### 12.1 السياسة المستهدفة

- registry لكل use case: owner، provider، data class، model/version، purpose، retention، quota، evaluation، failure mode.
- auth، membership، rate limits، quotas، input/output size، DLP/redaction، prompt-injection defenses.
- قواعد deterministic قبل LLM للمال والأمن؛ AI advisory فقط.
- human approval إلزامي لـKYC/payout/dispute/contract/financial movement.
- agent identity منفصلة، tool scopes، budget، timeout، kill switch، immutable audit، وquality threshold.

### 12.2 الحالة الحالية

- /api/ai/gemini و/api/ai/voice و/api/analyze-image بلا auth/rate-limit؛ image analysis random simulation.
- /api/ai/legal محمي بمستخدم فقط، ولا يوجد quota/data classification/retention evidence.
- Agent Relay يحتفظ بطابور الذاكرة ويملك fallback secret ثابتًا؛ Prototype/Blocked.
- Guardian regex/rules محلية محدودة، وFinancialGuard غير موصول بتدفق checkout الفعلي.
- Upstash queue يستخدم fallback endpoint/token تمثيلي؛ لا دليل تشغيل.

## 13. Academy, Community, Agency, Enterprise

| المجال | الهدف | الحالة الحالية |
|---|---|---|
| Academy | courses, enrollment, progress, exams, certificates, instructors | صفحات ومكونات كثيرة؛ backend/schema/tests غير مثبتة: UI Only. |
| Community | posts, groups, moderation, reports, appeals, reputation | صفحات ومكونات social/community؛ سياسات moderation/RLS غير مثبتة: UI Only/Prototype. |
| Agency | organizations, teams, client spaces, workload, portfolios | صفحات agency/agencies وteam UI؛ organization membership canonical مفقود: UI Only/Blocked. |
| Enterprise | SSO/SAML, SCIM, domain verification, audit export, legal hold, retention | مكونات enterprise فقط دون دليل protocol/backend: UI Only/Missing. |

هذه الوحدات محفوظة Additively ضمن P4، ولا تُحذف، ولا تدخل launch scope قبل حسم MVP والـtenancy.

## 14. Notifications, Support, and Communications

المستهدف: in-app notifications، Resend/react-email، preferences، localization، outbox، retry/backoff، deduplication، delivery audit، dead-letter، support cases وincident communications.

الحالة الحالية Partial/Blocked:

- notifications insert مباشر دون فحص نتيجة.
- email routes غير محمية ويمكن استدعاؤها مباشرة، ولا rate limit أو allowlist أو idempotency.
- Paymob webhook يستدعي email route قبل إثبات التوقيع، ما يفتح abuse/spam path.
- لا outbox أو preference center أو retry/dedup evidence.
- صفحات Notifications/Messages/Support ومكونات البريد لا تثبت التسليم التشغيلي.

## 15. Analytics, Observability, Operations

المستهدف: structured logs، correlation/request IDs، redaction، PII policy، SLOs، alerts، runbooks، incident lifecycle، status page، post-incident review، deployment traces وSentry releases.

الحالة الحالية:

- Sentry مهيأ server/edge/client، لكن sendDefaultPii=true وtracesSampleRate=1 وenableLogs=true بلا redaction ظاهر؛ Blocked حتى سياسة الخصوصية.
- /api/db-health محمي admin/executive؛ جيد مبدئيًا، لكن operational evidence غير متاح.
- /api/brain-runtime عام ويكشف manifest غير سري لكنه قد يكشف metadata تشغيلية قديمة؛ يلزم threat model/cache policy.
- logging غالبًا console وغير structured، وactor في audit أحيانًا string يمرره caller.
- لا SLO/runbooks/status/incident/restore evidence محلي كافٍ.

## 16. Accessibility, i18n, SEO, and UX Quality

الهدف: Arabic/English parity، RTL/LTR، WCAG 2.2 AA، keyboard/focus/screen-reader، captions/transcripts، alt text، semantic markup، locale-safe navigation، sitemap/robots/canonical/hreflang، performance budgets وvisual regression.

الدليل الحالي:

- locale layout يضبط lang/dir وmetadata، لكن كثيرًا من الروابط hard-coded إلى /ar.
- src/lib/i18n.ts stub يعيد العربية وkey نفسه؛ parity غير مثبتة.
- lint المحفوظ يتضمن تحذير alt مفقود وimg غير محسنة، إلى جانب 123 warning إجمالًا.
- لا اختبارات axe/keyboard/screen-reader/visual regression ولا sitemap/robots ظاهرين في الجرد.
- نصوص UI تدعي مشفر/سيادي/ضمان بلا evidence؛ يلزم copy review.

التصنيف: Partial / UI Only.

## 17. Delivery, CI/CD, Environments, and Recovery

### 17.1 التصميم المستهدف

- فصل local/test/staging/preview/production، وعقد env بالأسماء والأنواع فقط دون قيم.
- PR workflow مع pnpm وNode مثبتين، frozen lock، typecheck، lint، unit/integration/RLS/E2E، secret/dependency scanning، migration dry-run.
- Preview أولًا، Production بعد owner approval، مع rollback وSentry release tracking.
- backup/restore drill دوري وRPO/RTO معتمد.

### 17.2 الحالة الحالية

- artifacts المؤرخة 2026-08-27: build نجح، TypeScript final log فارغ بما يتسق مع 0 errors، lint 0 errors/123 warnings، Playwright 8/8.
- pnpm test مجرد echo نجاح؛ لا unit tests.
- Playwright يغطي أربع حالات فقط على Desktop/Mobile: auth route، redirect finance للزائر، cookie مزورة، ورفض API بلا session. لا مستخدم حقيقي/RLS/payment/storage.
- CI يثبت pnpm 9 وNode 24 ويشغل install/build/lint/test/Playwright؛ نجاحه الحالي غير قابل للتحقق هنا.
- db migration workflow يشغل Supabase local على PR فقط؛ لا دليل أنه مر على migrations غير المتتبعة الحالية.
- deploy إلى Vercel على main مباشرة؛ يلزم Preview/approval gate.
- worktree الحالي يحتوي ملفات supabase/.temp معدلة وثماني migrations غير متتبعة؛ لا تُدمج قبل review. أخطرها 20260827000006_disable_rls_temp.sql الذي يعطل RLS، يليه 20260827000007_grant_anon_select.sql الذي يمنح anon صلاحية SELECT على user_system_roles.

## 18. Verified Implementation State

| Feature ID | Current status | UI evidence | Code evidence | Backend evidence | DB/RLS evidence | Test evidence | Operational evidence | Missing evidence | Risk | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| STATE-AUTH | Partial/Blocked | auth/onboarding/admin routes | proxy, serverAuth, apiGuard | Supabase SSR clients | migrations متعارضة؛ آخر مسارين يعطلان RLS ويمنحان anon SELECT | 8 smoke تشمل رفض الزائر فقط | Not Verifiable | real-user/RLS/admin matrix/provider mounting | Critical | P0 |
| STATE-DB | Blocked | N/A | queries بأسماء متعددة | Not Verifiable | schema/Prisma/migrations متباينة + anon/disable RLS files | migration check غير مُعاد | Not Verifiable | canonical schema + applied-state inventory | Critical | P0 |
| STATE-PAY | Prototype/Blocked | checkout/payment UI | Paymob route، PayPal stub | Paymob fetch code فقط | لا provider event inbox | لا payment tests | Not Verifiable | signature/idempotency/sandbox/reconciliation | Critical | P0 |
| STATE-FIN | Prototype/Blocked | finance/wallet/admin UI | RevenueEngine/escrow/actions | عمليات متعددة غير ذرية | ledger canonical/RLS غير مثبت | unauth rejection فقط | Not Verifiable | double-entry/minor units/payout/reconcile | Critical | P0 |
| STATE-STO | Partial/Blocked | upload/studio/production UI | presign/R2/Supabase storage | signed upload code | bucket policies Not Verifiable | لا storage tests | Not Verifiable | private download, membership, scan, quota | Critical | P0 |
| STATE-MKT | Partial | market/marketplace/talent | createJob/createOrder | Supabase queries | services/orders schema غير canonical | لا journey test | Not Verifiable | proposal/order transaction/pricing/RLS | High | P1 |
| STATE-STUDIO | UI Only/Partial | studio/workspace/player/review | comments/upload/delivery actions | R2/Supabase paths | membership model مفقود | لا multi-user test | Not Verifiable | versions/workers/QC/offline/access | High | P1 |
| STATE-LEGAL | Partial/Blocked | contracts/KYC/disputes | actions متعددة | service role في admin flows | جداول/سياسات غير متسقة | admin unauth only | Not Verifiable | signatures/KYC evidence/atomic disputes | Critical | P0 |
| STATE-AI | Prototype/Blocked | AI Studio/Guardian UI | Gemini/voice/random image/relay | providers في code | N/A | لا eval/security tests | Not Verifiable | auth/rate/DLP/quotas/audit/kill switch | Critical | P0 |
| STATE-ACAD | UI Only | Academy/Community pages/components | عرض أساسًا | Not Verifiable | Not Verifiable | none | Not Verifiable | schema/RLS/moderation/progress | Medium | P4 |
| STATE-ORG | UI Only/Blocked | Agency/Enterprise pages | contexts/components | Not Verifiable | memberships missing | none | Not Verifiable | tenancy/SSO/SCIM/domain/legal hold | High | P0/P4 |
| STATE-NOTIF | Partial/Blocked | notifications/messages/email templates | direct insert + open email APIs | Resend code | outbox missing | none | Not Verifiable | auth/rate/retry/dedup/preferences | High | P1 |
| STATE-OBS | Partial/Blocked | monitor components | Sentry configs/instrumentation | SDK configured | N/A | none | Not Verifiable | redaction/SLO/alerts/runbooks/releases | Critical | P0 |
| STATE-CI | Partial | N/A | scripts/workflows | CI definitions | local DB check definition | stored build/lint/8 E2E; unit test fake | CI status Not Verifiable | reproducible green CI, real tests, pinning | High | P1/P2 |
| STATE-UX | Partial/UI Only | RTL shell وواجهات واسعة | locale metadata، i18n stub | N/A | N/A | lint warnings فقط | Not Verifiable | WCAG/i18n parity/SEO/visual/perf tests | Medium | P3 |

## 19. Implementation Gap Register

| Gap ID | Domain | Description | Historical evidence/source | Current status | Risk | Dependency | Priority | Proposed task | Acceptance criteria | Evidence artifact | Owner decision required |
|---|---|---|---|---|---|---|---|---|---|---|---|
| AUTH-001 | Auth | منع self-promotion وفصل account_type/system_role | P0-A context + migrations | Partial/Blocked | Critical | ADR-002/RLS | P0 | توحيد role write path | signup=user؛ self update مرفوض | RLS + integration tests | نعم، DB/RLS |
| AUTH-002 | Auth | مصدر تفويض واحد request-scoped | proxy/serverAuth/RoleContext | Partial | Critical | ADR-002 | P0 | Authorization service | لا cookie/client context كقرار | auth matrix tests | نعم |
| AUTH-003 | Admin | حصر service-role actions | admin/dispute/KYC actions | Partial | Critical | AUTH-002 | P0 | guard + scoped queries | كل action يثبت role/resource | API/action tests | نعم |
| DB-001 | Data | نموذج domain canonical بدل تعدد الأسماء | schema/Prisma/actions | Blocked | Critical | ADR-001 | P0 | inventory + mapping | entity/field/state map معتمد | schema diff artifact | نعم |
| ORG-001 | Tenancy | organizations/project memberships مفقودة | docs + code inventory | Missing | Critical | ADR-003/DB-001 | P0 | membership model | role وحده لا يمنح project | membership tests | نعم |
| RLS-001 | Data Security | RLS متعارضة وغير مثبتة؛ anon/disable files خطرة | migrations 260-270007 | Blocked | Critical | DB-001/ORG-001 | P0 | review/dry-run matrix | deny-by-default + own/member/admin cases | local DB RLS suite | نعم |
| PAY-001 | Paymob | checkout يثق في amount ولا يثبت ownership | checkout route | Blocked | Critical | ADR-004/DB-001 | P0 | server payment intent | amount من order فقط | tamper tests | نعم |
| PAY-002 | Paymob | webhook بلا signature/replay protection | Paymob webhook | Blocked | Critical | ADR-004 | P0 | verified inbox | invalid/replay rejected | fixture tests | نعم |
| PAY-003 | PayPal | webhook stub بلا lifecycle | PayPal route | Prototype | Critical | ADR-004 | P0 | optional intl adapter | signed sandbox lifecycle | sandbox artifacts | نعم |
| PAY-004 | Payments | idempotency/out-of-order/reconciliation مفقودة | route inventory | Missing | Critical | PAY-002/FIN-002 | P0 | inbox/outbox/reconcile | duplicate/out-of-order safe | integration report | نعم |
| FIN-001 | Pricing | floating/client-adjacent authority وقواعد غير versioned | RevenueEngine/checkout | Blocked | Critical | DB-001/PAY-001 | P0 | minor-unit pricing service | deterministic versioned totals | property tests | نعم |
| FIN-002 | Ledger | append-only double-entry غير موجود | schemas المتعارضة | Missing | Critical | ADR-005 | P0 | ledger invariants | debit=credit؛ immutable | ledger test report | نعم |
| FIN-003 | Withdrawals | approveWithdrawal لا ينفذ payout/four-eyes | admin action | Prototype | Critical | FIN-002/ADR-005 | P0 | payout workflow | reservation + two approvals + idempotency | integration artifacts | نعم |
| FIN-004 | Wallet/Escrow | wallet مشتق من rows غير canonical وتسويات غير ذرية | wallet/escrow/dispute actions | Blocked | Critical | FIN-002 | P0 | canonical balance projection | balance reconciles from ledger | reconciliation test | نعم |
| STO-001 | Storage | public URLs وprivate-by-default غير محقق | storage lib/KYC | Blocked | Critical | ADR-007 | P0 | private object contract | no public restricted object | access tests | نعم |
| STO-002 | Storage | presign لا يثبت membership/quota/scan | R2/presign routes | Blocked | Critical | ORG-001/STO-001 | P0 | resource-scoped upload | outsider denied؛ limits enforced | upload suite | نعم |
| AI-001 | AI | AI APIs بلا auth/rate/DLP/evaluation | AI routes | Blocked | High | SEC-002/OBS-001 | P0 | AI gateway policy | auth/quota/redaction/evals | security/eval report | نعم |
| AGENT-001 | Agent Mesh | relay secret fallback وطابور memory | agent relay | Prototype/Blocked | Critical | security model | P0 | agent identities/queue/kill switch | no default secret؛ durable scoped tasks | agent threat tests | نعم |
| SEC-001 | Validation | validation متفرق وpayload limits ناقصة | APIs/actions | Partial | High | domain contracts | P0 | validation boundary | schemas + limits لكل endpoint | fuzz/negative tests | لا بعد ADRs |
| SEC-002 | Abuse | rate limiting/quotas مفقودة | open email/AI/checkout | Missing | Critical | identity/queue decision | P0 | rate/abuse layer | per-user/IP/provider limits | load/abuse tests | نعم |
| SEC-003 | Secrets | fallback secrets/dummy credentials وlegacy setup | agent/queue/R2/setup-env | Blocked | Critical | env contract | P0 | fail-closed handling | لا secret defaults؛ scan green | secret scan artifact | نعم |
| OPS-001 | Toolchain | pnpm/Node غير مثبتين باتساق | package/lock/CI/baseline | Partial | High | toolchain decision | P1 | pin package manager/runtime | local=CI versions | version artifact | نعم |
| OPS-002 | Tests | pnpm test echo؛ لا unit/integration/RLS | package/tests | Missing | High | domain contracts | P1 | test pyramid | real suites fail on regression | coverage/results | لا |
| OPS-003 | CI/CD | status غير مثبت وproduction direct-on-main | workflows | Not Verifiable | High | OPS-001/002 | P1 | preview + approval gates | protected green pipeline | CI/deploy evidence | نعم |
| OPS-004 | Safety | CTO/setup scripts تكتب env/git وتحذف وتستخدم network | scripts | Blocked | Critical | tooling review | P0 | quarantine/redesign | dry-run + approvals + no secret output | script tests | نعم |
| OBS-001 | Observability | Sentry default PII و100% traces بلا redaction | Sentry configs | Blocked | Critical | privacy policy | P0 | redaction/sampling | sensitive fields removed | Sentry test event | نعم |
| A11Y-001 | Accessibility | WCAG والkeyboard/alt غير مختبرة | lint/UI | Partial | Medium | test tooling | P3 | accessibility gate | axe + keyboard + alt green | a11y report | لا |
| I18N-001 | i18n | i18n stub وروابط /ar ثابتة | i18n/routes | Partial | Medium | routing contract | P3 | locale parity | AR/EN journeys equivalent | locale tests | نعم للمحتوى |
| DR-001 | Recovery | RPO/RTO/backup/restore drill غير مثبت | docs/workflows | Missing | Critical | ADR-009 | P0 | recovery plan/drill | restore measured and signed off | drill report | نعم |
| DOC-001 | Documentation | خرائط وادعاءات تاريخية متضاربة | system map/vision | Partial | Medium | ADR-013 | P2 | evidence-linked registry | كل claim بتاريخ ودليل | docs audit | نعم |
| BRAIN-001 | Brain | manifest يشير إلى snapshot قديم | runtime hashes/lines | Blocked | High | ADR-013 | P0 | hierarchy/rebuild policy | hash/source/status متسقة | manifest verification | نعم |
| CLAIM-001 | Trust/UX | claims أمان/تشفير/ضمان بلا دليل | UI copy/docs | Blocked | High | legal/security review | P0 | claims registry | كل claim مثبت أو مخفف | signed claims matrix | نعم |

**توزيع الفجوات:** 32 Gap IDs: P0=26، P1=3، P2=1، P3=2، P4=0. وجود صفر في P4 لا يعني غياب أعمال P4؛ هذا السجل يحصر فجوات التحكم المطلوبة، بينما التوسعات واردة في roadmap.

## 20. ADR Register

جميع ADRs أدناه: **Proposed / Needs Owner Approval / No Implementation Until Approved**.

| ADR | Context & Problem | Options | Proposed direction | Consequences/Dependencies | Required evidence & approval |
|---|---|---|---|---|---|
| ADR-001 Canonical domain model | jobs/orders/projects/contracts/ledgers متداخلة | توحيد حول job أو order أو project | lifecycle الوارد بالقسم 5 مع mapping تدريجي additive | يمس كل domains؛ يعتمد inventory | schema map + migration plan + owner/data approval |
| ADR-002 Account type/system role/capabilities | مصادر role متعددة | roles فقط أو capabilities أو hybrid | identity + account_type + system_role + scoped capability | يتطلب auth service/RLS | threat model + auth matrix + owner/security approval |
| ADR-003 Organizations/project memberships | لا tenancy canonical | direct ownership أو memberships | organizations + project memberships explicit | prerequisite للاستوديو/الوكالات | tenancy model + RLS tests + owner approval |
| ADR-004 Paymob/PayPal lifecycle | routes غير آمنة وغير مكتملة | provider-specific أو neutral adapter | provider-neutral intent/events؛ Paymob primary، PayPal intl | يعتمد order/ledger | provider docs/sandbox/threat model + finance approval |
| ADR-005 Ledger/Escrow/payout | schemas وحالات متعارضة | mutable balances أو event/ledger | append-only double-entry + state machines | أعلى كلفة وضبط | accounting review + invariants + owner/finance/legal approval |
| ADR-006 KYC provider/manual review | KYC client upload ومحاكاة | manual أو provider أو hybrid | case lifecycle مع provider optional + manual exception | privacy/legal/retention | legal DPIA/vendor review + owner approval |
| ADR-007 Storage provider/data residency | R2 وSupabase Storage متوازيان | R2 أو Supabase أو hybrid | القرار حسب class/residency/cost؛ private contract واحد | migration/lifecycle | benchmark، legal، restore test + owner approval |
| ADR-008 Retention/deletion/legal hold | لا policy مثبتة | global أو per-class | per-class retention مع legal hold precedence | يمس كل data domains | legal/privacy matrix + owner approval |
| ADR-009 Backup/RPO/RTO | لا drill | provider default أو managed plan | RPO/RTO حسب class + restore drills | cost/ops | measured drill + owner approval |
| ADR-010 MVP scope | 60 route و506 component دون backend متكافئ | broad launch أو core journey | core client↔freelancer lifecycle أولًا، والباقي preserved/planned | يقلل سطح الخطر | scope matrix + owner/product approval |
| ADR-011 DB/RLS/trigger change control | migrations خطرة غير متتبعة | ad hoc أو reviewed pipeline | new migrations only، dry-run، rollback، two reviewers | CI/local DB required | migration diff/RLS suite + owner/DB approval |
| ADR-012 Preserve/archive/rename rules | وثائق ونسخ bak كثيرة | حذف مباشر أو preserve registry | additive، archive/rename فقط بقرار وخريطة | repository hygiene | inventory + owner approval |
| ADR-013 Canonical reference hierarchy | Master/runtime/manifest/constitution متعارضة | واحد أو generated hierarchy | owner-approved canonical source + generated runtime + freshness check | يحل BRAIN/DOC | hash verification + owner/governance approval |

## 21. Phased Roadmap

### G0 — Governance

- **Objective:** source hierarchy، evidence registry، ADRs، scope وclaims.
- **Prerequisites:** owner/architecture/security/legal/finance owners.
- **Tasks:** ADR-001..013، schema map، claim registry، migration quarantine review.
- **Risks:** اعتماد وثيقة تاريخية كحقيقة أو دمج migrations خطرة.
- **Exit criteria:** hierarchy معتمد، 13 ADR decisions، وكل claim له evidence/owner.
- **Approval gate:** موافقة owner؛ لا code/DB قبلها.

### P0 — Security and Trust Foundation

- **Objective:** Auth/RBAC، schema/RLS، memberships، protected APIs، payment/webhook، ledger/Escrow، storage، validation/rate/secrets، Sentry privacy، backup plan.
- **Prerequisites:** G0 وcanonical model.
- **Tasks:** فجوات P0 الـ26، على دفعات صغيرة قابلة للاختبار.
- **Risks:** privilege escalation، data exposure، money inconsistency، irreversible DB change.
- **Exit criteria:** local RLS/auth/payment/storage/security suites خضراء، no critical open gap، review مزدوج.
- **Approval gates:** DB/security/finance/legal والowner حسب ADR.

### P1 — Core Product Integrity

- **Objective:** build/type، data access canonical، client/freelancer journey، contracts/KYC/disputes/notifications.
- **Prerequisites:** P0 controls.
- **Tasks:** toolchain pinning، repositories/services، transactional workflows، outbox.
- **Risks:** schema drift وpartial failure.
- **Exit criteria:** journey متكاملة في test environment مع rollback evidence.
- **Approval gate:** product + security acceptance.

### P2 — Verification and Recovery

- **Objective:** unit/integration/RLS/E2E، CI gates، observability، recovery drill.
- **Prerequisites:** stable contracts وtest fixtures.
- **Tasks:** test pyramid، preview CI، migration dry-run، SLOs، restore drill.
- **Risks:** flaky tests أو evidence غير reproducible.
- **Exit criteria:** protected green CI، measured restore، release checklist.
- **Approval gate:** operations approval.

### P3 — Quality

- **Objective:** lint debt، performance، accessibility، i18n، SEO، visual QA.
- **Prerequisites:** core flows ثابتة.
- **Tasks:** 123 warning backlog، WCAG، locale parity، budgets، visual regression، claims copy.
- **Risks:** regressions عبر 506 components.
- **Exit criteria:** quality budgets وAR/EN/a11y journeys خضراء.
- **Approval gate:** design/content/accessibility acceptance.

### P4 — Governed Expansion

- **Objective:** Academy، Community، Agency، Enterprise، advanced Studio، licensing، gamification، governed AI/Agent Mesh.
- **Prerequisites:** tenancy، moderation، privacy، finance، operations mature.
- **Tasks:** domain-specific ADRs وbackends بدل UI-only.
- **Risks:** scope expansion، moderation/compliance/cost.
- **Exit criteria:** كل module يمر نفس evidence/launch gates.
- **Approval gate:** owner/product/business approval لكل module.

## 22. Launch Gates

| Gate | معيار Go | الحالة الحالية | القرار |
|---|---|---|---|
| G0 Architecture | ADR-001/002/003/013 معتمدة ونموذج canonical | غير معتمد | **NO-GO** |
| G1 Build | reproducible type/build/lint/test وCI أخضر مثبت | artifacts قديمة، unit test وهمي، CI غير متحقق | **NO-GO** |
| G2 Identity | real signup/login/default user وrole/capability matrix وno escalation | اختبار مستخدم حقيقي/RLS غير متاح | **NO-GO** |
| G3 Data | schema/RLS applied-state inventory وdeny-by-default tests | migrations متعارضة؛ disable RLS وanon SELECT غير متتبعين | **NO-GO** |
| G4 Money | signed webhooks، idempotency، ledger، reconciliation، sandbox | غير موجود/Prototype | **NO-GO** |
| G5 Storage | private membership-scoped access، scan/retention | public URLs وسياسات غير مثبتة | **NO-GO** |
| G6 Core Journey | client→freelancer→pay→deliver→approve/dispute→settle E2E | 4 smoke cases فقط | **NO-GO** |
| G7 Recovery | backup/restore drill وRPO/RTO | Source Missing | **NO-GO** |
| G8 Operations | SLO/alerts/runbooks/redaction/preview approval | Sentry PII risk وrunbooks مفقودة | **NO-GO** |
| G9 Claims | claims registry ومراجعة قانونية وأمنية | claims مضللة محتملة | **NO-GO** |

## 23. First 10 Tasks

> أول عشر مهام فقط، بالترتيب، دون تنفيذ.

| # | Task | Why now | Dependencies | Files likely affected | Tests required | Approval |
|---|---|---|---|---|---|---|
| 1 | Canonical domain model decision | يمنع بناء RLS/مال على أسماء متعارضة | G0 | schemas, migrations, Prisma, domain actions, docs ADR | schema mapping/fixture validation | نعم: owner/data |
| 2 | Role/capability decision | يغلق مصادر privilege ambiguity | Task 1 جزئيًا | proxy, serverAuth, apiGuard, RoleContext, auth/admin actions, role migrations | auth matrix/default role/self-update denial | نعم: owner/security/DB |
| 3 | Schema/RLS inventory | وجود anon/disable policies يجعل كل claim غير صالح | 1-2 | all migrations, schema, Prisma, query inventory | local reset/dry-run/RLS positive-negative | نعم: DB/security؛ migration ممنوع قبلها |
| 4 | Server request-scoped auth | توحيد session validation لكل request | 2 | Supabase server client, proxy, Server Actions, APIs | expired/forged/missing session | لا للتصميم؛ نعم لأي auth config |
| 5 | Authorization service | role لا يثبت ownership/membership | 2-4 وADR-003 | server-only authorization layer + domain callers | outsider/member/owner/capability matrix | نعم: architecture/security |
| 6 | Remove insecure role sources | يمنع العودة لـmetadata/cookie/profile role | 2-5 | auth/onboarding/proxy/contexts/migrations through additive migration | forged cookie/metadata/profile update denial | نعم: DB/RLS |
| 7 | Protect admin/finance/dispute actions | service role يوسع blast radius | 4-6 | admin/KYC/dispute/finance/wallet actions, API guards | direct invocation، least privilege، audit actor | نعم: security/finance |
| 8 | Payment/webhook contract | checkout/webhooks P0 قبل أي مال | 1,5,7 وADR-004 | checkout, Paymob/PayPal routes, provider adapter, inbox/outbox | tamper/signature/replay/idempotency/out-of-order | نعم: finance/security/provider |
| 9 | Ledger/Escrow invariants | لا تسوية موثوقة دون دفتر واحد | 1,3,8 وADR-005 | finance/escrow/wallet/disputes + migrations reviewed | double-entry/state/property/reconcile/rollback | نعم: owner/finance/legal/DB |
| 10 | Storage authorization and private access | الملفات وKYC معرضة لروابط وسياسات غير مثبتة | 3,5 وADR-007/008 | storage lib, presign/R2, KYC/production/workspace, future bucket policies | membership، URL expiry، MIME/size/quota، scan، retention | نعم: security/privacy/DB/storage |

## خاتمة الحوكمة

هذا المقترح يحافظ على كل الصفحات والمكونات والميزات Additively، لكنه يرفض تحويل اتساع الواجهة إلى claim جاهزية. الأولوية ليست إضافة سطح UI جديد؛ بل تثبيت مصدر الحقيقة، العضوية، RLS، العقود المالية والتخزينية، والأدلة القابلة لإعادة التشغيل. لا يصبح هذا الملف Canonical إلا بقرار بشري صريح، ولا يسمح بذاته بأي migration أو نشر أو حركة مالية.
