"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, onSnapshot, Timestamp, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type ProjectDoc = {
  title?: string;
  status?: string;
  userId?: string;
  createdAt?: Timestamp;
  budget?: number;
  escrowStatus?: string;
  deadline?: Timestamp;
  description?: string;
};

function formatDate(timestamp?: Timestamp) {
  if (!timestamp || !(timestamp as any).toMillis) return "تاريخ غير متوفر";
  const d = new Date((timestamp as any).toMillis());
  return d.toLocaleString("ar-EG");
}

function formatCurrency(amount?: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
  }).format(amount || 0);
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || "";

  const [project, setProject] = useState<ProjectDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "files" | "payments">("overview");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const ref = doc(db, "projects", projectId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setProject(null);
        } else {
          setProject(snap.data() as ProjectDoc);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, [projectId]);

  // معالجة الحذف
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "projects", projectId));
      // إعادة التوجيه إلى قائمة المشاريع بعد الحذف
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("خطأ في حذف المشروع:", error);
      setDeleting(false);
    }
  };

  if (!projectId) {
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
          padding: 16,
        }}
      >
        <p>معرّف المشروع غير صالح.</p>
      </main>
    );
  }

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
          padding: 16,
        }}
      >
        <p>جارٍ تحميل بيانات المشروع...</p>
      </main>
    );
  }

  if (!project) {
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
          padding: 16,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 8 }}>لم يتم العثور على هذا المشروع.</p>
          <button
            type="button"
            onClick={() => router.push("/dashboard/projects")}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid #374151",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            العودة لقائمة المشاريع
          </button>
        </div>
      </main>
    );
  }

  const statusLabel =
    project.status === "hiring"
      ? "مرحلة التوظيف"
      : project.status === "in_progress"
      ? "قيد التنفيذ"
      : project.status === "completed"
      ? "مكتمل"
      : project.status === "draft"
      ? "مسودة"
      : "غير محدد";

  const escrowLabel =
    project.escrowStatus === "funded"
      ? "ممول"
      : project.escrowStatus === "released"
      ? "تم التحرير"
      : project.escrowStatus === "disputed"
      ? "قيد النزاع"
      : "لم يتم التمويل";

  const escrowColor =
    project.escrowStatus === "funded"
      ? { bg: "rgba(22,163,74,0.18)", border: "#22c55e", text: "#bbf7d0" }
      : project.escrowStatus === "released"
      ? { bg: "rgba(37,99,235,0.18)", border: "#0ea5e9", text: "#bfdbfe" }
      : project.escrowStatus === "disputed"
      ? { bg: "rgba(249,115,22,0.18)", border: "#f97316", text: "#fed7aa" }
      : { bg: "rgba(31,41,55,0.8)", border: "#6b7280", text: "#e5e7eb" };

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "white",
        padding: "60px 12px 20px",
      }}
    >
      {/* Modal تأكيد الحذف */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
        >
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(31,41,55,1)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
              padding: "20px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: 8,
                color: "#e5e7eb",
              }}
            >
              تأكيد حذف المشروع
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              هل أنت متأكد من رغبتك في حذف المشروع "<strong>{project.title}</strong>"؟ لا يمكن التراجع عن هذا الإجراء.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(31,41,55,1)",
                  backgroundColor: "#020617",
                  color: "#e5e7eb",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: deleting ? "not-allowed" : "pointer",
                  opacity: deleting ? 0.6 : 1,
                }}
              >
                الغاء
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "1px solid #ef4444",
                  backgroundColor: "rgba(239,68,68,0.15)",
                  color: "#fca5a5",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: deleting ? "not-allowed" : "pointer",
                  opacity: deleting ? 0.6 : 1,
                }}
              >
                {deleting ? "جاري الحذف..." : "نعم، احذف"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* هيدر المشروع */}
      <section
        style={{
          borderRadius: 18,
          border: "1px solid rgba(31,41,55,1)",
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
          padding: 14,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontSize: 11,
                color: "#9ca3af",
                marginBottom: 4,
              }}
            >
              مساحة عمل المشروع
            </p>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {project.title || "مشروع بدون عنوان"}
            </h1>
            <p
              style={{
                fontSize: 11,
                color: "#9ca3af",
              }}
            >
              تم الإنشاء في: {formatDate(project.createdAt)}
            </p>
          </div>

          {/* أزرار الإجراءات */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => router.push(`/dashboard/projects/${projectId}/edit`)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid rgba(13,183,180,0.5)",
                backgroundColor: "rgba(13,183,180,0.1)",
                color: "#a5f3fc",
                fontSize: 11,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              ✏️ تعديل
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid rgba(239,68,68,0.5)",
                backgroundColor: "rgba(239,68,68,0.1)",
                color: "#fca5a5",
                fontSize: 11,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              🗑️ حذف
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/projects")}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #334155",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                fontSize: 11,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              ← الرجوع
            </button>
          </div>
        </div>

        {/* صفوف المعلومات الرئيسية */}
        <div
          style={{
            marginTop: 10,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 8,
          }}
        >
          <div
            style={{
              padding: "8px 10px",
              borderRadius: "12px",
              border: "1px solid #4b5563",
              backgroundColor: "rgba(15,23,42,0.95)",
            }}
          >
            <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>
              الحالة
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#e5e7eb" }}>
              {statusLabel}
            </p>
          </div>

          <div
            style={{
              padding: "8px 10px",
              borderRadius: "12px",
              border: `1px solid ${escrowColor.border}`,
              backgroundColor: escrowColor.bg,
            }}
          >
            <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>
              الضمان
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: escrowColor.text,
              }}
            >
              {escrowLabel}
            </p>
          </div>

          <div
            style={{
              padding: "8px 10px",
              borderRadius: "12px",
              border: "1px solid rgba(56,189,248,0.6)",
              backgroundColor: "rgba(8,47,73,0.9)",
            }}
          >
            <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>
              الميزانية
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#bae6fd",
              }}
            >
              {formatCurrency(project.budget)}
            </p>
          </div>

          <div
            style={{
              padding: "8px 10px",
              borderRadius: "12px",
              border: "1px solid rgba(34,197,94,0.6)",
              backgroundColor: "rgba(5,46,22,0.9)",
            }}
          >
            <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>
              موعد التسليم
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#bbf7d0",
              }}
            >
              {formatDate(project.deadline)}
            </p>
          </div>
        </div>
      </section>

      {/* التبويبات */}
      <section
        style={{
          borderRadius: 16,
          border: "1px solid rgba(31,41,55,1)",
          background:
            "linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.9))",
          padding: 12,
        }}
      >
        {/* شريط التبويبات */}
        <div
          style={{
            display: "flex",
            gap: 6,
            borderBottom: "1px solid rgba(31,41,55,1)",
            marginBottom: 12,
            paddingBottom: 8,
            overflowX: "auto",
          }}
        >
          {[
            { id: "overview", label: "نظرة عامة" },
            { id: "tasks", label: "المهام" },
            { id: "files", label: "الملفات" },
            { id: "payments", label: "الدفعات" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border:
                  activeTab === tab.id
                    ? "1px solid #0DB7B4"
                    : "1px solid transparent",
                backgroundColor:
                  activeTab === tab.id
                    ? "rgba(13,183,180,0.15)"
                    : "transparent",
                color: activeTab === tab.id ? "#a5f3fc" : "#9ca3af",
                fontSize: 11,
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* محتوى التبويبات */}
        {activeTab === "overview" && (
          <div
            style={{
              borderRadius: 12,
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(31,41,55,1)",
              padding: 12,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              وصف المشروع
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#e5e7eb",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
              }}
            >
              {project.description ||
                "لا يوجد وصف متاح لهذا المشروع حالياً."}
            </p>
          </div>
        )}

        {activeTab === "tasks" && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px dashed rgba(56,189,248,0.35)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              🎯 سيتم إضافة نظام إدارة المهام قريباً داخل مساحة عمل المشروع.
            </p>
          </div>
        )}

        {activeTab === "files" && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px dashed rgba(34,197,94,0.35)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              📁 سيتم إضافة نظام رفع الملفات وتبادل المستندات قريباً.
            </p>
          </div>
        )}

        {activeTab === "payments" && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px dashed rgba(249,115,22,0.35)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              💳 سيتم إضافة لوحة تتبع الدفعات وعمليات الـ Escrow قريباً.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
