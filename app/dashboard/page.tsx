"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";

type Project = {
  id: string;
  title: string;
  status: "draft" | "hiring" | "in_progress" | "review" | "completed";
  budget?: number;
  escrowStatus?: "unfunded" | "funded" | "released" | "disputed";
  deadline?: Timestamp | null;
  createdAt: Timestamp;
  userId?: string;
};

const statusLabels: Record<Project["status"], string> = {
  draft: "مسودة",
  hiring: "مرحلة التوظيف",
  in_progress: "قيد التنفيذ",
  review: "قيد المراجعة",
  completed: "مكتمل",
};

const escrowLabels: Record<
  NonNullable<Project["escrowStatus"]>,
  string
> = {
  unfunded: "لم يتم التمويل",
  funded: "ممول",
  released: "تم التحرير",
  disputed: "قيد النزاع",
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  // كشف الموبايل
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // جلب المشاريع من Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const q = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const unsubProjects = onSnapshot(q, (snapshot) => {
        const list: Project[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as any;
          list.push({
            id: docSnap.id,
            title: data.title ?? "",
            status: data.status ?? "draft",
            budget: data.budget ?? 0,
            escrowStatus: data.escrowStatus ?? "unfunded",
            deadline: data.deadline ?? null,
            createdAt: data.createdAt,
            userId: data.userId,
          });
        });
        setProjects(list);
        setLoading(false);
      });

      return () => unsubProjects();
    });

    return () => unsubscribe();
  }, [router]);

  // حسابات الإحصائيات
  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(
      (p) => p.status === "in_progress" || p.status === "review"
    ).length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);

    return { total, active, completed, totalBudget };
  }, [projects]);

  // آخر 5 مشاريع
  const recentProjects = useMemo(() => {
    return projects.slice(0, 5);
  }, [projects]);

  const formatDate = (timestamp?: Timestamp | null) => {
    if (!timestamp || !(timestamp as any).toMillis) return "بدون موعد";
    const d = new Date((timestamp as any).toMillis());
    return d.toLocaleDateString("ar-EG");
  };

  const formatCurrency = (amount?: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100vh",
          backgroundColor: "#020617",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <p>جاري تحميل لوحة التحكم...</p>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "white",
        padding: isMobile ? "60px 12px 20px" : "24px 32px",
      }}
    >
      {/* هيدر الصفحة مع الترحيب */}
      <header
        style={{
          marginBottom: isMobile ? 16 : 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            لوحة التحكم
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            مرحباً بك في Monteerly! إليك ملخص نشاطك اليومي.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/projects/new")}
          style={{
            padding: isMobile ? "6px 12px" : "8px 16px",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg,#0DB7B4,#22c55e,#16a34a)",
            color: "white",
            fontSize: isMobile ? "11px" : "12px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 12px 30px rgba(16,185,129,0.35)",
          }}
        >
          + مشروع جديد
        </button>
      </header>

      {/* الإحصائيات الرئيسية */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, minmax(0, 1fr))"
            : "repeat(4, minmax(0, 1fr))",
          gap: isMobile ? 10 : 14,
          marginBottom: isMobile ? 16 : 20,
        }}
      >
        <StatCard
          icon="📊"
          label="إجمالي المشاريع"
          value={stats.total}
          subtext="منذ البداية"
          tone="primary"
          isMobile={isMobile}
        />
        <StatCard
          icon="⚡"
          label="مشاريع نشطة"
          value={stats.active}
          subtext="قيد التنفيذ والمراجعة"
          tone="accent"
          isMobile={isMobile}
        />
        <StatCard
          icon="✅"
          label="مشاريع مكتملة"
          value={stats.completed}
          subtext="تم إنهاؤها بنجاح"
          tone="success"
          isMobile={isMobile}
        />
        <StatCard
          icon="💰"
          label="إجمالي الميزانية"
          value={formatCurrency(stats.totalBudget)}
          subtext="المتعاقد عليه"
          tone="info"
          isMobile={isMobile}
        />
      </section>

      {/* قسم المشاريع النشطة */}
      <section
        style={{
          marginBottom: isMobile ? 16 : 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? 10 : 12,
            gap: 8,
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: 700,
            }}
          >
            المشاريع النشطة
          </h2>
          <button
            type="button"
            onClick={() => router.push("/dashboard/projects")}
            style={{
              fontSize: "11px",
              padding: "5px 10px",
              borderRadius: "999px",
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              cursor: "pointer",
            }}
          >
            عرض الكل ←
          </button>
        </div>

        {projects
          .filter(
            (p) => p.status === "in_progress" || p.status === "review"
          )
          .slice(0, 3).length === 0 ? (
          <div
            style={{
              borderRadius: "14px",
              border: "1px dashed rgba(31,41,55,1)",
              backgroundColor: "rgba(15,23,42,0.9)",
              padding: isMobile ? 12 : 14,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
              }}
            >
              لا توجد مشاريع نشطة حالياً. ابدأ بمشروع جديد! 🚀
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr)",
              gap: isMobile ? 10 : 12,
            }}
          >
            {projects
              .filter(
                (p) => p.status === "in_progress" || p.status === "review"
              )
              .slice(0, 3)
              .map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={() =>
                    router.push(
                      `/dashboard/projects/${encodeURIComponent(p.id)}`
                    )
                  }
                  isMobile={isMobile}
                />
              ))}
          </div>
        )}
      </section>

      {/* قسم آخر المشاريع */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? 10 : 12,
            gap: 8,
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: 700,
            }}
          >
            آخر المشاريع
          </h2>
        </div>

        {recentProjects.length === 0 ? (
          <div
            style={{
              borderRadius: "14px",
              border: "1px dashed rgba(31,41,55,1)",
              backgroundColor: "rgba(15,23,42,0.9)",
              padding: isMobile ? 12 : 14,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
              }}
            >
              لا توجد مشاريع بعد. جرّب إنشاء واحد الآن! ✨
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(1, minmax(0, 1fr))"
                : "repeat(2, minmax(0, 1fr))",
              gap: isMobile ? 10 : 12,
            }}
          >
            {recentProjects.map((p) => (
              <MiniProjectCard
                key={p.id}
                project={p}
                onClick={() =>
                  router.push(
                    `/dashboard/projects/${encodeURIComponent(p.id)}`
                  )
                }
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

type StatCardProps = {
  icon: string;
  label: string;
  value: string | number;
  subtext: string;
  tone: "primary" | "accent" | "success" | "info";
  isMobile?: boolean;
};

function StatCard({
  icon,
  label,
  value,
  subtext,
  tone,
  isMobile,
}: StatCardProps) {
  const toneStyles = {
    primary: {
      border: "rgba(56,189,248,0.6)",
      bg: "rgba(8,47,73,0.95)",
      color: "#bae6fd",
    },
    accent: {
      border: "rgba(37,99,235,0.7)",
      bg: "rgba(30,64,175,0.95)",
      color: "#e0f2fe",
    },
    success: {
      border: "rgba(34,197,94,0.6)",
      bg: "rgba(5,46,22,0.95)",
      color: "#bbf7d0",
    },
    info: {
      border: "rgba(249,115,22,0.6)",
      bg: "rgba(76,29,0,0.95)",
      color: "#fed7aa",
    },
  };

  const style = toneStyles[tone];

  return (
    <div
      style={{
        borderRadius: "14px",
        border: `1px solid ${style.border}`,
        backgroundColor: style.bg,
        padding: isMobile ? "10px 12px" : "12px 14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: "18px" }}>{icon}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontSize: "10px",
              color: "#9ca3af",
              marginBottom: 2,
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: isMobile ? "15px" : "16px",
              fontWeight: 700,
              color: style.color,
            }}
          >
            {value}
          </p>
          <p
            style={{
              fontSize: "9px",
              color: "#6b7280",
              marginTop: 2,
            }}
          >
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  onClick: () => void;
  isMobile?: boolean;
};

function ProjectCard({ project, onClick, isMobile }: ProjectCardProps) {
  const formatDate = (timestamp?: Timestamp | null) => {
    if (!timestamp || !(timestamp as any).toMillis) return "بدون موعد";
    const d = new Date((timestamp as any).toMillis());
    return d.toLocaleDateString("ar-EG");
  };

  const formatCurrency = (amount?: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(amount || 0);
  };

  const escrowColor =
    project.escrowStatus === "funded"
      ? { bg: "rgba(22,163,74,0.18)", border: "#22c55e", text: "#bbf7d0" }
      : project.escrowStatus === "released"
      ? { bg: "rgba(37,99,235,0.18)", border: "#0ea5e9", text: "#bfdbfe" }
      : project.escrowStatus === "disputed"
      ? { bg: "rgba(249,115,22,0.18)", border: "#f97316", text: "#fed7aa" }
      : { bg: "rgba(31,41,55,0.8)", border: "#6b7280", text: "#e5e7eb" };

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "right",
        backgroundColor: "#020617",
        borderRadius: "14px",
        border: "1px solid rgba(31,41,55,1)",
        padding: isMobile ? "12px" : "14px",
        display: "grid",
        gridTemplateColumns: isMobile
          ? "minmax(0,1fr)"
          : "minmax(0,2.4fr) minmax(0,1.4fr)",
        gap: 10,
        cursor: "pointer",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: isMobile ? "13px" : "14px",
            fontWeight: 600,
            marginBottom: 4,
            color: "#e5e7eb",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.title || "مشروع بدون عنوان"}
        </p>
        <p
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            marginBottom: 6,
          }}
        >
          تسليم: {formatDate(project.deadline || null)}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            style={{
              padding: "6px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              borderColor: "#4b5563",
              backgroundColor: "rgba(15,23,42,0.9)",
              color: "#e5e7eb",
              border: "1px solid #4b5563",
            }}
          >
            {statusLabels[project.status]}
          </span>
          <span
            style={{
              padding: "6px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              borderColor: escrowColor.border,
              backgroundColor: escrowColor.bg,
              color: escrowColor.text,
              border: `1px solid ${escrowColor.border}`,
            }}
          >
            {escrowLabels[project.escrowStatus || "unfunded"]}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: isMobile ? "space-between" : "space-around",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 8 : 6,
        }}
      >
        <div style={{ textAlign: isMobile ? "left" : "right" }}>
          <p
            style={{
              fontSize: "10px",
              color: "#9ca3af",
              marginBottom: 2,
            }}
          >
            الميزانية
          </p>
          <p
            style={{
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 700,
            }}
          >
            {formatCurrency(project.budget)}
          </p>
        </div>
      </div>
    </button>
  );
}

type MiniProjectCardProps = {
  project: Project;
  onClick: () => void;
  isMobile?: boolean;
};

function MiniProjectCard({
  project,
  onClick,
  isMobile,
}: MiniProjectCardProps) {
  const formatDate = (timestamp?: Timestamp | null) => {
    if (!timestamp || !(timestamp as any).toMillis) return "بدون موعد";
    const d = new Date((timestamp as any).toMillis());
    return d.toLocaleDateString("ar-EG");
  };

  const formatCurrency = (amount?: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(amount || 0);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "right",
        backgroundColor: "#020617",
        borderRadius: "14px",
        border: "1px solid rgba(31,41,55,1)",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        cursor: "pointer",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#e5e7eb",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0,
        }}
      >
        {project.title || "مشروع بدون عنوان"}
      </p>
      <p
        style={{
          fontSize: "10px",
          color: "#9ca3af",
          margin: 0,
        }}
      >
        أنشئ في: {formatDate(project.createdAt)}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "10px",
            backgroundColor: "rgba(13,183,180,0.2)",
            color: "#a5f3fc",
            border: "1px solid #0DB7B4",
          }}
        >
          {statusLabels[project.status]}
        </span>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#bae6fd",
            margin: 0,
          }}
        >
          {formatCurrency(project.budget)}
        </p>
      </div>
    </button>
  );
}
