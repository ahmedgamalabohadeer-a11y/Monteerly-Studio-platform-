import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

type BrainManifest = {
  generated_at?: string;
  last_checked_at?: string;
  last_rebuilt_at?: string;
  generator_version?: string;
  script_path?: string;
  script_sha256?: string;
  canonical_source?: string;
  canonical_source_sha256?: string;
  system_state_sha256?: string;
  excerpt_chars?: number;
  source_chars?: number;
  source_lines?: number;
  constitution_path?: string;
  execution_state_path?: string;
  found_count?: number;
  missing_count?: number;
  status?: string;
  needs_rebuild?: boolean;
};

async function loadBrainManifest(): Promise<BrainManifest | null> {
  try {
    const manifestPath = path.join(process.cwd(), '.docs', 'runtime', 'brain.manifest.json');
    const raw = await fs.readFile(manifestPath, 'utf-8');
    return JSON.parse(raw) as BrainManifest;
  } catch {
    return null;
  }
}

function formatDate(input?: string) {
  if (!input) return '—';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat('ar-EG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function truncateMiddle(value?: string, start = 18, end = 14) {
  if (!value) return '—';
  if (value.length <= start + end + 3) return value;
  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

function calculateHealthScore(manifest: BrainManifest | null) {
  if (!manifest) return 0;

  let score = 100;

  if (manifest.status !== 'fresh') score -= 20;
  if (manifest.needs_rebuild) score -= 20;
  if ((manifest.missing_count ?? 0) > 0) score -= Math.min((manifest.missing_count ?? 0) * 8, 24);
  if (!manifest.canonical_source_sha256) score -= 10;
  if (!manifest.system_state_sha256) score -= 10;
  if (!manifest.script_sha256) score -= 10;

  return Math.max(score, 0);
}

function getHealthLabel(score: number) {
  if (score >= 95) return 'ممتاز';
  if (score >= 80) return 'جيد جدًا';
  if (score >= 65) return 'مستقر';
  if (score >= 45) return 'يحتاج مراجعة';
  return 'حرج';
}

function getStatusClasses(status?: string) {
  if (status === 'fresh') {
    return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
  }
  if (status === 'stale') {
    return 'border-amber-500/20 bg-amber-500/10 text-amber-300';
  }
  return 'border-white/10 bg-white/[0.04] text-slate-300';
}

function getStatusDotClasses(status?: string) {
  if (status === 'fresh') return 'bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.7)]';
  if (status === 'stale') return 'bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.6)]';
  return 'bg-slate-400';
}

function getScoreClasses(score: number) {
  if (score >= 95) return 'text-emerald-300';
  if (score >= 80) return 'text-cyan-300';
  if (score >= 65) return 'text-amber-300';
  if (score >= 45) return 'text-orange-300';
  return 'text-rose-300';
}

function getScoreBarClasses(score: number) {
  if (score >= 95) return 'from-emerald-400 via-emerald-300 to-teal-300';
  if (score >= 80) return 'from-cyan-400 via-sky-300 to-indigo-300';
  if (score >= 65) return 'from-amber-400 via-yellow-300 to-orange-300';
  if (score >= 45) return 'from-orange-400 via-amber-300 to-yellow-200';
  return 'from-rose-500 via-rose-400 to-orange-300';
}

function buildWarnings(manifest: BrainManifest | null) {
  const warnings: string[] = [];

  if (!manifest) {
    warnings.push('تعذر تحميل ملف brain.manifest.json من المسار التنفيذي.');
    return warnings;
  }

  if (manifest.status !== 'fresh') {
    warnings.push('الحالة الحالية ليست fresh، ويجب التحقق من سلامة المرجع التنفيذي.');
  }

  if (manifest.needs_rebuild) {
    warnings.push('المنظومة تشير إلى أن إعادة بناء العقل التنفيذي مطلوبة.');
  }

  if ((manifest.missing_count ?? 0) > 0) {
    warnings.push(`يوجد ${manifest.missing_count} عنصر مفقود داخل التتبع المرجعي ويجب تحديده ومعالجته.`);
  }

  if (!manifest.canonical_source) {
    warnings.push('لم يتم التعرف على canonical source بشكل صحيح.');
  }

  if (!manifest.canonical_source_sha256 || !manifest.system_state_sha256 || !manifest.script_sha256) {
    warnings.push('بعض بصمات التحقق SHA256 غير متوفرة.');
  }

  return warnings;
}

const shellCard =
  'rounded-[30px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-sm';

const panelCard =
  'rounded-[26px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(10,10,18,0.96),rgba(6,6,12,0.92))] shadow-[0_16px_40px_rgba(0,0,0,0.32)]';

const softCard =
  'rounded-2xl border border-white/[0.06] bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]';

export default async function Page() {
  const brainManifest = await loadBrainManifest();
  const healthScore = calculateHealthScore(brainManifest);
  const healthLabel = getHealthLabel(healthScore);
  const warnings = buildWarnings(brainManifest);
  const statusClasses = getStatusClasses(brainManifest?.status);
  const statusDotClasses = getStatusDotClasses(brainManifest?.status);
  const scoreClasses = getScoreClasses(healthScore);
  const scoreBarClasses = getScoreBarClasses(healthScore);

  const executiveSummary = [
    {
      label: 'المصدر المرجعي',
      value: truncateMiddle(brainManifest?.canonical_source, 22, 18),
      title: brainManifest?.canonical_source || '—',
    },
    {
      label: 'الدستور التنفيذي',
      value: truncateMiddle(brainManifest?.constitution_path, 18, 18),
      title: brainManifest?.constitution_path || '—',
    },
    {
      label: 'حالة التنفيذ',
      value: truncateMiddle(brainManifest?.execution_state_path, 18, 18),
      title: brainManifest?.execution_state_path || '—',
    },
    {
      label: 'سكربت البناء',
      value: truncateMiddle(brainManifest?.script_path, 18, 18),
      title: brainManifest?.script_path || '—',
    },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50" dir="rtl">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-[-120px] top-[240px] h-[260px] w-[260px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.015))]" />
      </div>

      <div className="border-b border-white/6 bg-black/25 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 md:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-slate-300">
              <span className={`h-2.5 w-2.5 rounded-full ${statusDotClasses}`} />
              MCOS Executive Runtime
            </div>

            <div className="text-[11px] font-bold tracking-[0.22em] text-slate-400 uppercase">
              Secure Executive Surface · Runtime Verified
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10 space-y-8">
        <section className={`${shellCard} overflow-hidden p-6 md:p-8`}>
          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${statusClasses}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${statusDotClasses}`} />
                  {brainManifest?.status || 'unknown'}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-black text-slate-300">
                  <span className="text-slate-500">الإصدار</span>
                  <span className="text-white">{brainManifest?.generator_version || '—'}</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-black text-slate-300">
                  <span className="text-slate-500">Found / Missing</span>
                  <span className="text-white">
                    {brainManifest?.found_count ?? 0} / {brainManifest?.missing_count ?? 0}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.34em] text-indigo-300/80 font-black">
                  Monteerly Executive Surface
                </p>

                <h1 className="max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl xl:text-6xl">
                  وحدة قيادة العقل التنفيذي
                </h1>

                <p className="max-w-3xl text-sm leading-8 text-slate-300 md:text-base">
                  لوحة تنفيذية احترافية لقراءة جاهزية المرجع الموحد، سلامة البصمات، اتساق ملفات
                  التشغيل، ومؤشرات القرار السريعة التي يعتمد عليها النظام في التقييم التنفيذي.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <TopStat
                  label="آخر فحص"
                  value={formatDate(brainManifest?.last_checked_at || brainManifest?.generated_at)}
                />
                <TopStat
                  label="آخر إعادة بناء"
                  value={formatDate(brainManifest?.last_rebuilt_at)}
                />
                <TopStat
                  label="العناصر المفقودة"
                  value={String(brainManifest?.missing_count ?? '—')}
                  tone={(brainManifest?.missing_count ?? 0) > 0 ? 'warn' : 'ok'}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {executiveSummary.map((item) => (
                  <SummaryPill
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    title={item.title}
                  />
                ))}
              </div>
            </div>

            <div className={`${panelCard} p-5 md:p-6`}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    Executive Health Score
                  </p>
                  <div className={`text-5xl font-black leading-none md:text-6xl ${scoreClasses}`}>
                    {healthScore}
                    <span className="text-2xl text-slate-500 md:text-3xl">/100</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  {healthLabel}
                </div>
              </div>

              <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${scoreBarClasses}`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>

              <div className="space-y-3">
                <QuickLine
                  label="حالة المرجع"
                  value={brainManifest?.status || 'unknown'}
                  valueClass={brainManifest?.status === 'fresh' ? 'text-emerald-300' : 'text-amber-300'}
                />
                <QuickLine
                  label="إعادة البناء"
                  value={String(brainManifest?.needs_rebuild)}
                  valueClass={brainManifest?.needs_rebuild ? 'text-amber-300' : 'text-emerald-300'}
                />
                <QuickLine
                  label="التحقق البنيوي"
                  value={brainManifest?.canonical_source_sha256 ? 'Verified' : 'Missing'}
                  valueClass={brainManifest?.canonical_source_sha256 ? 'text-emerald-300' : 'text-rose-300'}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ActionLink href="/api/brain-runtime" label="فتح JSON الخام" primary />
                <ActionLink href="/ar/executive" label="إعادة تحميل اللوحة" />
              </div>

              <div className="mt-5 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4">
                <p className="mb-2 text-xs font-black text-slate-400">القراءة التنفيذية</p>
                <p className="text-sm leading-7 text-slate-300">
                  {brainManifest?.status === 'fresh'
                    ? 'البيانات الحالية صالحة للقراءة التنفيذية، مع بقاء نقطة مراجعة مرتبطة بالعناصر المفقودة فقط.'
                    : 'الحالة الحالية لا تدعم الاعتماد الكامل قبل مراجعة وضع المرجع التنفيذي أولًا.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className={`${panelCard} p-6 md:p-7`}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="mb-2 text-2xl font-black text-white">الملخص التنفيذي</h2>
                <p className="text-sm leading-7 text-slate-400">
                  نظرة منظمة على المصدر الأساسي والملفات التشغيلية التي يستند إليها runtime التنفيذي.
                </p>
              </div>
              <SectionBadge label="Core References" />
            </div>

            <div className="space-y-4">
              <InfoCard label="المصدر المرجعي الأساسي" value={brainManifest?.canonical_source || '—'} />
              <InfoCard label="ملف الدستور التنفيذي" value={brainManifest?.constitution_path || '—'} />
              <InfoCard label="ملف حالة التنفيذ" value={brainManifest?.execution_state_path || '—'} />
              <InfoCard label="مسار سكربت البناء" value={brainManifest?.script_path || '—'} />
            </div>
          </div>

          <div className={`${panelCard} p-6 md:p-7`}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="mb-2 text-2xl font-black text-white">حالة التشغيل الحالية</h2>
                <p className="text-sm leading-7 text-slate-400">
                  مؤشرات الحالة الميدانية للعقل التنفيذي كما تم تحميلها مباشرة من ملف manifest.
                </p>
              </div>
              <SectionBadge label="Live Status" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MetricCard
                label="الحالة"
                value={brainManifest?.status || '—'}
                tone={brainManifest?.status === 'fresh' ? 'green' : 'amber'}
              />
              <MetricCard label="إصدار المولد" value={brainManifest?.generator_version || '—'} />
              <MetricCard label="آخر فحص" value={brainManifest?.last_checked_at || brainManifest?.generated_at || '—'} />
              <MetricCard label="آخر إعادة بناء" value={brainManifest?.last_rebuilt_at || '—'} />
              <MetricCard label="Found / Missing" value={`${brainManifest?.found_count ?? 0} / ${brainManifest?.missing_count ?? 0}`} />
              <MetricCard
                label="هل يلزم Rebuild"
                value={String(brainManifest?.needs_rebuild)}
                tone={brainManifest?.needs_rebuild ? 'amber' : 'green'}
              />
              <MetricCard
                label="حجم المصدر"
                value={`${brainManifest?.source_lines ?? 0} سطر · ${brainManifest?.source_chars ?? 0} حرف`}
              />
              <MetricCard
                label="حجم المقتطف"
                value={`${brainManifest?.excerpt_chars ?? 0} حرف`}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className={`${panelCard} p-6 md:p-7`}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="mb-2 text-2xl font-black text-white">التنبيهات والملاحظات</h2>
                <p className="text-sm leading-7 text-slate-400">
                  هذه هي النقاط التي يجب مراجعتها أولًا قبل اعتماد أي قراءة نهائية أو قرار تشغيلي.
                </p>
              </div>
              <SectionBadge label="Attention" tone="amber" />
            </div>

            <div className="space-y-3">
              {warnings.length > 0 ? (
                warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-amber-500/15 bg-amber-500/10 px-4 py-3 text-sm leading-7 text-amber-100"
                  >
                    {warning}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/10 px-4 py-3 text-sm leading-7 text-emerald-100">
                  لا توجد تنبيهات تشغيلية حرجة حاليًا، والبيانات تشير إلى حالة مستقرة قابلة للاعتماد.
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniStat
                label="المرجع البنيوي"
                value={brainManifest?.canonical_source_sha256 ? 'جاهز' : 'ناقص'}
                tone={brainManifest?.canonical_source_sha256 ? 'ok' : 'danger'}
              />
              <MiniStat
                label="حالة التنفيذ"
                value={brainManifest?.system_state_sha256 ? 'مؤكدة' : 'غير مكتملة'}
                tone={brainManifest?.system_state_sha256 ? 'ok' : 'danger'}
              />
            </div>
          </div>

          <div className={`${panelCard} p-6 md:p-7`}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="mb-2 text-2xl font-black text-white">سلامة البصمات والتتبع</h2>
                <p className="text-sm leading-7 text-slate-400">
                  طبقة تحقق مرجعية تعرض بصمات المصدر، حالة النظام، وسكربت البناء بصياغة أكثر وضوحًا.
                </p>
              </div>
              <SectionBadge label="SHA256 Integrity" />
            </div>

            <div className="space-y-4">
              <HashCard label="Canonical Source SHA256" fullValue={brainManifest?.canonical_source_sha256 || '—'} />
              <HashCard label="System State SHA256" fullValue={brainManifest?.system_state_sha256 || '—'} />
              <HashCard label="Script SHA256" fullValue={brainManifest?.script_sha256 || '—'} />
            </div>
          </div>
        </section>

        <section className={`${panelCard} p-6 md:p-7`}>
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-black text-white">التفسير التنفيذي السريع</h2>
              <p className="max-w-3xl text-sm leading-7 text-slate-400">
                ملخص بلغة قرار لتقييم الجاهزية، الموثوقية، والإجراء التالي دون الحاجة لقراءة كل التفاصيل التقنية.
              </p>
            </div>
            <SectionBadge label="Decision Layer" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <NarrativeCard
              title="الجاهزية"
              tone="cyan"
              text={
                brainManifest?.status === 'fresh'
                  ? 'المرجع التنفيذي الحالي محدث ويظهر بحالة fresh، ما يجعل الطبقة المعروضة قابلة للاعتماد التشغيلي بشكل كبير.'
                  : 'المرجع التنفيذي لا يظهر بحالة fresh، لذلك لا يُنصح باعتماد القراءة الحالية قبل التحقق من مصدر التغيير.'
              }
            />
            <NarrativeCard
              title="الموثوقية"
              tone="emerald"
              text={
                brainManifest?.canonical_source_sha256 && brainManifest?.system_state_sha256
                  ? 'المصدر المرجعي وحالة النظام يحملان بصمات تحقق صريحة، ما يعزز الثقة في اتساق السلسلة التنفيذية.'
                  : 'بعض طبقات التحقق المرجعي غير مكتملة، ما يقلل من وضوح الاعتماد النهائي ويستلزم مراجعة إضافية.'
              }
            />
            <NarrativeCard
              title="الإجراء التالي"
              tone="amber"
              text={
                (brainManifest?.missing_count ?? 0) > 0
                  ? `يوجد ${brainManifest?.missing_count} عنصر مفقود، لذا الإجراء التالي الصحيح هو تحديده وإغلاقه قبل اعتماد الحالة كنسخة نهائية بالكامل.`
                  : 'لا توجد عناصر مفقودة مؤثرة حاليًا، ويمكن الانتقال إلى مستوى أعلى من الاعتماد والتحسين التنفيذي.'
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function TopStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'ok' | 'warn';
}) {
  const valueClass =
    tone === 'warn' ? 'text-amber-300' : tone === 'ok' ? 'text-emerald-300' : 'text-white';

  return (
    <div className={`${softCard} px-4 py-4`}>
      <div className="mb-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">{label}</div>
      <div className={`text-sm font-black leading-6 ${valueClass}`}>{value}</div>
    </div>
  );
}

function SummaryPill({
  label,
  value,
  title,
}: {
  label: string;
  value: string;
  title?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
      title={title}
    >
      <div className="mb-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">{label}</div>
      <div className="truncate text-sm font-black text-slate-200">{value}</div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'green' | 'amber';
}) {
  const toneClass =
    tone === 'green'
      ? 'text-emerald-300'
      : tone === 'amber'
      ? 'text-amber-300'
      : 'text-white';

  return (
    <div className={`${softCard} p-4`}>
      <div className="mb-2 text-xs text-slate-500">{label}</div>
      <div className={`break-words text-sm font-black leading-7 ${toneClass}`}>{value}</div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={`${softCard} p-4`}>
      <div className="mb-2 text-xs text-slate-500">{label}</div>
      <div className="break-all text-sm font-bold leading-7 text-slate-200">{value}</div>
    </div>
  );
}

function HashCard({ label, fullValue }: { label: string; fullValue: string }) {
  return (
    <div className={`${softCard} p-4`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          SHA256
        </div>
      </div>
      <div className="mb-2 break-all font-mono text-sm leading-7 text-slate-200">{fullValue}</div>
      <div className="text-[11px] text-slate-500">{truncateMiddle(fullValue, 16, 16)}</div>
    </div>
  );
}

function QuickLine({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-sm font-black ${valueClass || 'text-white'}`}>{value}</span>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'ok' | 'danger';
}) {
  return (
    <div className={`${softCard} p-4`}>
      <div className="mb-2 text-xs text-slate-500">{label}</div>
      <div className={`text-sm font-black ${tone === 'ok' ? 'text-emerald-300' : 'text-rose-300'}`}>
        {value}
      </div>
    </div>
  );
}

function NarrativeCard({
  title,
  text,
  tone,
}: {
  title: string;
  text: string;
  tone?: 'cyan' | 'emerald' | 'amber';
}) {
  const toneMap =
    tone === 'emerald'
      ? 'from-emerald-500/14 to-transparent border-emerald-500/10'
      : tone === 'amber'
      ? 'from-amber-500/14 to-transparent border-amber-500/10'
      : 'from-cyan-500/14 to-transparent border-cyan-500/10';

  return (
    <div className={`rounded-2xl border bg-gradient-to-b ${toneMap} p-5`}>
      <h3 className="mb-3 text-lg font-black text-white">{title}</h3>
      <p className="text-sm leading-8 text-slate-300">{text}</p>
    </div>
  );
}

function SectionBadge({
  label,
  tone,
}: {
  label: string;
  tone?: 'amber';
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] ${
        tone === 'amber'
          ? 'border-amber-500/15 bg-amber-500/10 text-amber-300'
          : 'border-white/10 bg-white/[0.04] text-slate-400'
      }`}
    >
      {label}
    </div>
  );
}

function ActionLink({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-black transition ${
        primary
          ? 'border border-cyan-400/20 bg-cyan-400/12 text-cyan-100 hover:bg-cyan-400/18'
          : 'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]'
      }`}
    >
      {label}
    </a>
  );
}
