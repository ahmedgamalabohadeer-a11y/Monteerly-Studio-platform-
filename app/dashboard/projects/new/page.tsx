"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  // التحقق من المستخدم
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // معالجة تغيير الحقول
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // معالجة الإرسال
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // التحقق من الحقول المطلوبة
    if (!formData.title.trim()) {
      setError("عنوان المشروع مطلوب");
      return;
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      setError("الميزانية يجب أن تكون أكبر من صفر");
      return;
    }

    if (!formData.deadline) {
      setError("تاريخ التسليم مطلوب");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("لا يوجد مستخدم مسجل");

      // إنشاء المشروع الجديد
      const projectRef = await addDoc(collection(db, "projects"), {
        title: formData.title.trim(),
        description: formData.description.trim(),
        budget: parseFloat(formData.budget),
        deadline: new Date(formData.deadline),
        userId: user.uid,
        status: "draft",
        escrowStatus: "unfunded",
        createdAt: serverTimestamp(),
      });

      // إعادة التوجيه إلى صفحة المشروع الجديد
      router.push(`/dashboard/projects/${projectRef.id}`);
    } catch (err) {
      console.error("خطأ في إنشاء المشروع:", err);
      setError("حدث خطأ أثناء إنشاء المشروع. حاول مرة أخرى.");
      setLoading(false);
    }
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
            مشروع جديد
          </h1>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            أنشئ مشروعك الجديد وابدأ التعاون مع فريقك على Monteerly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/projects")}
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

      {/* نموذج الإنشاء */}
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
              placeholder="مثال: تطوير تطبيق جوال"
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
              placeholder="اشرح تفاصيل المشروع، المتطلبات، والأهداف..."
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
              onClick={() => router.push("/dashboard/projects")}
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
              disabled={loading}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background:
                  loading
                    ? "linear-gradient(135deg,#0DB7B4,#22c55e,#16a34a)"
                    : "linear-gradient(135deg,#0DB7B4,#22c55e,#16a34a)",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "جاري الإنشاء..." : "إنشاء المشروع"}
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
              💡 بعد إنشاء المشروع، ستتمكن من إضافة المهام والملفات وإدارة الدفعات من مساحة عمل المشروع.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
