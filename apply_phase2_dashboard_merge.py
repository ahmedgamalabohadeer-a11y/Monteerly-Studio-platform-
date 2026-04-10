import os, json
from pathlib import Path

ROOT = Path(".")
LOCALE_DIR = ROOT / "src/app/[locale]"
DASH_DIR = LOCALE_DIR / "dashboard"

# ─── التشخيص أولاً ──────────────────────────────────
def diagnose():
    print("
📊 تقرير التشخيص الجنائي:")
    checks = {
        "src/components/workspace": ROOT / "src/components/workspace",
        "src/components/finance": ROOT / "src/components/finance",
        "src/components/security": ROOT / "src/components/security",
        "dashboard/page.tsx (Prisma)": DASH_DIR / "page.tsx",
        "dashboard/page-archive-ui.tsx": DASH_DIR / "page-archive-ui.tsx",
        "_archive folder": ROOT / "_archive",
    }
    for label, path in checks.items():
        status = "✅" if path.exists() else "❌"
        print(f"  {status} {label}")
    print()

# ─── 1. إنشاء layout.tsx الموحد ──────────────────────
def create_dashboard_layout():
    layout_code = '''\
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

// ── مكونات الهيكل الثابت (من src/components) ──────
// إذا كانت الملفات موجودة، قم بإلغاء التعليق:
// import { Sidebar } from "@/components/layout/Sidebar";
// import { Topbar } from "@/components/layout/Topbar";
// import { PowerFab } from "@/components/ui/PowerFab";

interface DashboardLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workspace" });

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* ── الشريط الجانبي ──────────────────────────── */}
      <aside className="w-64 shrink-0 border-r border-zinc-800/60 bg-zinc-900/80 backdrop-blur-xl">
        {/* <Sidebar locale={locale} /> */}
        <div className="p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Monteerly Studio
          </p>
        </div>
      </aside>

      {/* ── المنطقة الرئيسية ──────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <Topbar locale={locale} title={t("title")} /> */}
        <header className="h-14 shrink-0 border-b border-zinc-800/60 flex items-center px-6 bg-zinc-900/50">
          <h1 className="text-sm font-medium text-zinc-200">{t("title")}</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
          {children}
        </main>
      </div>

      {/* ── زر القوة النابض (FAB) ─────────────────── */}
      {/* <PowerFab /> */}
    </div>
  );
}
'''
    layout_path = DASH_DIR / "layout.tsx"
    DASH_DIR.mkdir(parents=True, exist_ok=True)
    layout_path.write_text(layout_code, encoding="utf-8")
    print("✅ [Phase 2] تم إنشاء dashboard/layout.tsx الموحد.")

# ─── 2. دمج الـ UI مع Prisma في page.tsx ────────────
def create_merged_dashboard_page():
    page_code = '''\
/**
 * Dashboard Page — Monteerly Studio OS V5.0
 * المبدأ: Server Component يجلب البيانات مباشرة من Prisma
 * ثم يحقنها في مكونات الواجهة الموجودة في src/components
 */
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// ── مكونات من الترسانة الموجودة ──────────────────────
// قم بإلغاء التعليق عند التحقق من وجود الملف:
// import { BalanceCard }        from "@/components/finance/BalanceCard";
// import { TransactionRow }     from "@/components/finance/TransactionRow";
// import { WatermarkManager }   from "@/components/security/WatermarkManager";
// import { AuditLogViewer }     from "@/components/security/AuditLogViewer";

// ── Skeleton Loading ─────────────────────────────────
function StatCardSkeleton() {
  return (
    <div className="rounded-2xl bg-zinc-800/50 border border-zinc-700/30 p-6 animate-pulse">
      <div className="h-3 bg-zinc-700 rounded w-1/2 mb-4" />
      <div className="h-8 bg-zinc-700 rounded w-3/4" />
    </div>
  );
}

// ── مكوّن الكروت المالية (Server Component) ─────────
async function FinancialStats({ userId }: { userId: string }) {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    select: { available: true, pending: true, currency: true },
  });

  const stats = [
    {
      label: "السيولة المتاحة",           // Copywriting Constitution
      value: wallet?.available ?? 0,
      currency: wallet?.currency ?? "USD",
      color: "text-emerald-400",
    },
    {
      label: "في حساب الضمان",            // Copywriting Constitution
      value: wallet?.pending ?? 0,
      currency: wallet?.currency ?? "USD",
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl bg-zinc-900 border border-zinc-800/60 p-6
                     hover:border-zinc-600/60 transition-colors"
        >
          <p className="text-xs text-zinc-500 mb-2">{s.label}</p>
          <p className={`text-3xl font-bold tabular-nums ${s.color}`}>
            {s.value.toLocaleString("ar-EG", {
              style: "currency",
              currency: s.currency,
            })}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── مكوّن المشاريع النشطة (Server Component) ─────────
async function ActiveProjects({ userId }: { userId: string }) {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId, status: { in: ["ACTIVE", "IN_REVIEW"] } },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
      client: { select: { name: true } },
    },
  });

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        <p className="text-sm">لا توجد مشاريع نشطة</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-800/50">
      {projects.map((p) => (
        <li key={p.id} className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium text-zinc-100">{p.title}</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {p.client?.name ?? "—"} ·{" "}
              {new Date(p.updatedAt).toLocaleDateString("ar-EG")}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full border ${
              p.status === "ACTIVE"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            {p.status === "ACTIVE" ? "نشط" : "قيد المراجعة"}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── الصفحة الرئيسية (Page Entry Point) ─────────────
interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workspace" });

  // ── مصادقة المستخدم ──────────────────────────────
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login`);

  return (
    <div className="space-y-8">
      {/* ── الترحيب ───────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">
          {t("title")} 👋
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          {t("projects_active")}
        </p>
      </div>

      {/* ── البطاقات المالية (مع Skeleton) ─────────── */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        }
      >
        <FinancialStats userId={user.id} />
      </Suspense>

      {/* ── المشاريع النشطة ────────────────────────── */}
      <section>
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          المشاريع قيد العمل
        </h3>
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800/60 p-4">
          <Suspense
            fallback={
              <div className="py-8 text-center text-zinc-600 text-sm animate-pulse">
                جاري تجهيز طاولة المونتاج...
              </div>
            }
          >
            <ActiveProjects userId={user.id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
'''
    page_path = DASH_DIR / "page.tsx"
    # ── حفظ نسخة احتياطية من page.tsx القديم إن وُجد ──
    if page_path.exists():
        backup = DASH_DIR / "page.backup-before-phase2.tsx"
        if not backup.exists():
            import shutil
            shutil.copy2(page_path, backup)
            print("💾 تم حفظ نسخة احتياطية: page.backup-before-phase2.tsx")

    page_path.write_text(page_code, encoding="utf-8")
    print("✅ [Phase 2] تم دمج page.tsx (Prisma + UI).")

# ─── 3. سكربت البذر (Database Seed) ────────────────
def create_seed_script():
    seed_dir = ROOT / "prisma"
    seed_dir.mkdir(exist_ok=True)
    seed_code = '''\
/**
 * Prisma Seed — Monteerly Studio OS V5.0
 * يحقن بيانات تجريبية لرؤية النظام يعمل فوراً
 * التشغيل: npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 بدء حقن البيانات التجريبية...");

  // ── مستخدم تجريبي ─────────────────────────────
  const user = await prisma.user.upsert({
    where: { email: "demo@monteerly.com" },
    update: {},
    create: {
      email: "demo@monteerly.com",
      name: "أحمد — المدير التنفيذي",
      role: "CREATOR",
    },
  });

  // ── محفظة تجريبية ─────────────────────────────
  await prisma.wallet.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      available: 2450.75,
      pending: 850.00,
      currency: "USD",
    },
  });

  // ── مشاريع تجريبية ────────────────────────────
  const projects = [
    { title: "فيلم وثائقي — رؤية 2030", status: "ACTIVE" },
    { title: "إعلان تجاري — رمضان 2026", status: "IN_REVIEW" },
    { title: "مونتاج حفل زفاف ملكي", status: "ACTIVE" },
  ];

  for (const proj of projects) {
    await prisma.project.create({
      data: { ...proj, ownerId: user.id },
    });
  }

  console.log("🎉 تم حقن البيانات بنجاح!");
  console.log(`   👤 المستخدم: ${user.email}`);
  console.log(`   💰 السيولة: $2,450.75 | في الضمان: $850.00`);
  console.log(`   📁 المشاريع: ${projects.length} مشاريع نشطة`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
'''
    (seed_dir / "seed.ts").write_text(seed_code, encoding="utf-8")
    print("✅ [Phase 2] تم إنشاء prisma/seed.ts.")
    print("   ▶ للتشغيل: npx prisma db seed")

# ─── التشغيل ─────────────────────────────────────────
diagnose()
create_dashboard_layout()
create_merged_dashboard_page()
create_seed_script()

print("
" + "─" * 50)
print("🎯 Phase 2 اكتملت. الخطوات القادمة:")
print("  1. npx prisma db push     ← مزامنة Schema مع Supabase")
print("  2. npx prisma db seed     ← حقن البيانات التجريبية")
print("  3. npm run dev            ← تشغيل وفحص لوحة التحكم")
print("  4. في الرد القادم: دمج مكونات Sidebar + BalanceCard الحقيقية")
