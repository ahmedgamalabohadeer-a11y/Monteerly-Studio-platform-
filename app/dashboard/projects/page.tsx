"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";

type Project = {
  id: string;
  title: string;
  status: "draft" | "hiring" | "in_progress" | "review" | "completed";
  budget?: number;
  escrowStatus?: "unfunded" | "funded" | "released" | "disputed";
  deadline?: Timestamp | null;
  description?: string;
  createdAt: Timestamp;
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | Project["status"]>(
    "all"
  );
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const q = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
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
            description: data.description ?? "",
            createdAt: data.createdAt,
          });
        });
        setProjects(list);
        setLoading(false);
      });

      return () => unsubProjects();
    });

    return () => unsubscribe();
  }, [router]);

  const filteredProjects = useMemo(() => {
    if (filterStatus === "all") return projects;
    return projects.filter((p) => p.status === filterStatus);
  }, [projects, filterStatus]);

  const activeCount = projects.filter(
    (p) => p.status === "in_progress" || p.status === "review"
  ).length;
  const hiringCount = projects.filter((p) => p.status === "hiring").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;

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
        <p>جاري تحميل قائمة المشاريع...</p>
      </main>
    );
  }

  const pillBase: CSSProperties = {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "11px",
    border: "1px solid transparent",
    whiteSpace: "nowrap",
  };

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
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isMobile ? 12 : 16,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "18px" : "20px",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            المشاريع
          </h1>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>
            إدارة كل مشاريعك النشطة، المسودات، والمكتملة داخل Monteerly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          style={{
            fontSize: "12px",
            padding: "6px 10px",
            borderRadius: "999px",
            border: "1px solid #334155",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          ← العودة للوحة التحكم
        </button>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,minmax(0,1fr))",
          gap: isMobile ? 8 : 12,
          marginBottom: isMobile ? 12 : 16,
        }}
      >
        <MiniStat
          label="مشاريع نشطة"
          value={activeCount}
          tone="primary"
          isMobile={isMobile}
        />
        <MiniStat
          label="مرحلة التوظيف"
          value={hiringCount}
          tone="accent"
          isMobile={isMobile}
        />
        <MiniStat
          label="مشاريع مكتملة"
          value={completedCount}
          tone="success"
          isMobile={isMobile}
        />
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 10,
          marginBottom: isMobile ? 10 : 14,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <FilterPill
            active={filterStatus === "all"}
            label="الكل"
            onClick={() => setFilterStatus("all")}
          />
          <FilterPill
            active={filterStatus === "in_progress"}
            label="قيد التنفيذ"
            onClick={() => setFilterStatus("in_progress")}
          />
          <FilterPill
            active={filterStatus === "review"}
            label="قيد المراجعة"
            onClick={() => setFilterStatus("review")}
          />
          <FilterPill
            active={filterStatus === "hiring"}
            label="التوظيف"
            onClick={() => setFilterStatus("hiring")}
          />
          <FilterPill
            active={filterStatus === "completed"}
            label="مكتمل"
            onClick={() => setFilterStatus("completed")}
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/projects")}
          style={{
            padding: "7px 14px",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(135deg,#0DB7B4,#22c55e,#16a34a)",
            color: "white",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 12px 30px rgba(16,185,129,0.35)",
          }}
        >
          + مشروع جديد (قريباً)
        </button>
      </section>

      <section
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(31,41,55,1)",
          background:
            "linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.9))",
          padding: isMobile ? "10px" : "14px",
        }}
      >
        {filteredProjects.length === 0 ? (
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              textAlign: "center",
              padding: "16px 0",
            }}
          >
            لا توجد مشاريع مطابقة للفلاتر الحالية.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr)",
              gap: isMobile ? 10 : 12,
            }}
          >
            {filteredProjects.map((p) => {
              const escrowColor =
                p.escrowStatus === "funded"
                  ? { bg: "rgba(22,163,74,0.18)", border: "#22c55e", text: "#bbf7d0" }
                  : p.escrowStatus === "released"
                  ? { bg: "rgba(37,99,235,0.18)", border: "#0ea5e9", text: "#bfdbfe" }
                  : p.escrowStatus === "disputed"
                  ? { bg: "rgba(249,115,22,0.18)", border: "#f97316", text: "#fed7aa" }
                  : { bg: "rgba(31,41,55,0.8)", border: "#6b7280", text: "#e5e7eb" };

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    router.push(`/dashboard/projects/${encodeURIComponent(p.id)}`)
                  }
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
                      {p.title || "مشروع بدون عنوان"}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        marginBottom: 6,
                      }}
                    >
                      إنشاء: {formatDate(p.createdAt)} · تسليم:{" "}
                      {formatDate(p.deadline || null)}
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
                          ...pillBase,
                          borderColor: "#4b5563",
                          backgroundColor: "rgba(15,23,42,0.9)",
                          color: "#e5e7eb",
                        }}
                      >
                        الحالة: {statusLabels[p.status]}
                      </span>
                      <span
                        style={{
                          ...pillBase,
                          borderColor: escrowColor.border,
                          backgroundColor: escrowColor.bg,
                          color: escrowColor.text,
                        }}
                      >
                        الضمان: {escrowLabels[p.escrowStatus || "unfunded"]}
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
                        {formatCurrency(p.budget)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

type MiniStatProps = {
  label: string;
  value: number;
  tone: "primary" | "accent" | "success";
  isMobile?: boolean;
};

function MiniStat({ label, value, tone, isMobile }: MiniStatProps) {
  let border = "rgba(148,163,184,0.7)";
  let bg = "rgba(15,23,42,0.9)";
  let color = "#e5e7eb";

  if (tone === "accent") {
    border = "rgba(37,99,235,0.9)";
    bg = "rgba(30,64,175,0.95)";
    color = "#e0f2fe";
  } else if (tone === "success") {
    border = "rgba(22,163,74,0.9)";
    bg = "rgba(5,46,22,0.95)";
    color = "#bbf7d0";
  }

  return (
    <div
      style={{
        borderRadius: "12px",
        border: `1px solid ${border}`,
        background: bg,
        padding: isMobile ? "8px 10px" : "10px 12px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          color: "#9ca3af",
          marginBottom: 2,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: isMobile ? "16px" : "18px",
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </p>
    </div>
  );
}

type FilterPillProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function FilterPill({ active, label, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "5px 10px",
        borderRadius: "999px",
        border: active ? "1px solid #0DB7B4" : "1px solid #374151",
        backgroundColor: active ? "rgba(13,183,180,0.15)" : "#020617",
        color: active ? "#a5f3fc" : "#e5e7eb",
        fontSize: "11px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
