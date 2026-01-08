"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

type ProjectData = {
  title: string;
  description: string;
  budget: number;
  deadline: string;
};

export default function EditProjectPage() {
  const [formData, setFormData] = useState<ProjectData>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const params = useParams();
  const projectId = (params?.id as string) || "";

  // كشف الموبايل
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // التحقق من المستخدم وجلب البيانات
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (!projectId) {
        setLoading(false);
        return;
      }

      try {
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
          router.push("/dashboard/projects");
          return;
        }

        const data = projectSnap.data();
        
        // تحويل التاريخ إلى صيغة input[type="date"]
        let deadlineStr = "";
        if (data.deadline) {
          const deadlineDate = new Date(data.deadline.toMillis ? data.deadline.toMillis() : data.deadline);
          deadlineStr = deadlineDate.toISOString().split("T")[0];
        }

        setFormData({
          title: data.title || "",
          description: data.description || "",
          budget: data.budget || 0,
          deadline: deadlineStr,
        });

        setLoading(false);
      } catch (err) {
        console.error("خطأ في جلب المشروع:", err);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [projectId, router]);

  // معالجة تغيير الحقول
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) || 0 : value,
    }));
  };

  // معالجة الحفظ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // التحقق من الحقول المطلوبة
    if (!formData.title.trim()) {
      setError("عنوان المشروع مطلوب");
      return;
    }

    if (!formData.budget || formData.budget <= 0) {
      setError("الميزانية يجب أن تكون أكبر من صفر");
      return;
    }

    if (!formData.deadline) {
      setError("تاريخ التسليم مطلوب");
      return;
    }

    setSaving(true);

    try {
      const projectRef = doc(db, "projects", projectId);
      
      await updateDoc(projectRef, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        budget: formData.budget,
        deadline: new Date(formData.deadline),
      });

      // إعادة التوجيه إلى صفحة المشروع
      router.push(`/dashboard/projects/${projectId}`);
    } catch (err) {
      console.error("خطأ في تحديث المشروع:", err);
      setError("حدث خطأ أثناء حفظ التعديلات. حاول مرة أخرى.");
      setSaving(false);
    }
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
        <p>جاري تحميل بيانات المشروع...</p>
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
      {/* هيدر الصفحة */}
      <header
        style={{
          marginBottom: isMobile ? 16 : 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
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
            تعديل المشروع
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            قم بتحديث تفاصيل المشروع وحفظ التغييرات.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/dashboard/projects/${projectId}`)}
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            border: "1px solid #334155",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            fontSize: "11px",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          ← الرجوع
        </button>
      </header>

      {/* نموذج التعديل */}
      <section
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(31,41,55,1)",
          background:
            "linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.9))",
          padding: isMobile ? "16px" : "24px",
          maxWidth: "600px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* رسالة الخطأ */}
          {error && (
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.5)",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#fca5a5",
                  margin: 0,
                }}
              >
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* حقل العنوان */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="title"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#e5e7eb",
              }}
            >
              عنوان المشروع *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="عنوان المشروع"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(31,41,55,1)",
                backgroundColor: "rgba(15,23,42,0.95)",
                color: "#e5e7eb",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* حقل الوصف */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="description"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#e5e7eb",
              }}
            >
              وصف المشروع (اختياري)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="اشرح تفاصيل المشروع..."
              rows={5}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(31,41,55,1)",
                backgroundColor: "rgba(15,23,42,0.95)",
                color: "#e5e7eb",
                fontSize: "13px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </div>

          {/* صف الميزانية والموعد */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 12,
            }}
          >
            {/* حقل الميزانية */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="budget"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#e5e7eb",
                }}
              >
                الميزانية (جنيه مصري) *
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(31,41,55,1)",
                  borderRadius: "10px",
                  backgroundColor: "rgba(15,23,42,0.95)",
                  overflow: "hidden",
                }}
              >
                <input
                  id="budget"
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="5000"
                  min="0"
                  step="100"
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#e5e7eb",
                    fontSize: "13px",
                    fontFamily: "inherit",
                  }}
                />
                <span
                  style={{
                    padding: "10px 12px",
                    backgroundColor: "rgba(31,41,55,0.5)",
                    color: "#9ca3af",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  EGP
                </span>
              </div>
            </div>

            {/* حقل التاريخ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="deadline"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#e5e7eb",
                }}
              >
                موعد التسليم *
              </label>
              <input
                id="deadline"
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(31,41,55,1)",
                  backgroundColor: "rgba(15,23,42,0.95)",
                  color: "#e5e7eb",
                  fontSize: "13px",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* أزرار الإجراء */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 10,
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={() => router.push(`/dashboard/projects/${projectId}`)}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(31,41,55,1)",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              الغاء
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background:
                  "linear-gradient(135deg,#0DB7B4,#22c55e,#16a34a)",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>

          {/* رسالة معلوماتية */}
          <div
            style={{
              backgroundColor: "rgba(13,183,180,0.1)",
              border: "1px solid rgba(13,183,180,0.3)",
              borderRadius: "10px",
              padding: "10px 12px",
              marginTop: 8,
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#a5f3fc",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              💡 سيتم حفظ التعديلات فوراً في قاعدة البيانات عند الضغط على "حفظ التعديلات".
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
