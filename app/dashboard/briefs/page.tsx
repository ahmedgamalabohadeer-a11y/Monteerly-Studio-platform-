"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  updateDoc,
  doc as firebaseDoc,
} from "firebase/firestore";

type Brief = {
  id: string;
  title: string;
  clientName: string;
  description: string;
  budget: number;
  deadline: Timestamp;
  status: "pending" | "accepted" | "in-progress" | "completed" | "rejected";
  createdAt: Timestamp;
};

export default function BriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    description: "",
    budget: "",
    deadline: "",
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUserId(currentUser.uid);

      const briefsQuery = query(
        collection(db, "briefs"),
        where("userId", "==", currentUser.uid)
      );

      const unsubscribeBriefs = onSnapshot(briefsQuery, (snapshot) => {
        const briefsList: Brief[] = [];
        snapshot.forEach((docSnap) => {
          briefsList.push({
            id: docSnap.id,
            ...docSnap.data(),
          } as Brief);
        });
        briefsList.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        );
        setBriefs(briefsList);
        setLoading(false);
      });

      return () => unsubscribeBriefs();
    });

    return () => unsubscribe();
  }, [router]);

  async function handleCreateBrief(e: React.FormEvent) {
    e.preventDefault();
    setModalLoading(true);

    try {
      const briefData = {
        userId,
        title: formData.title,
        clientName: formData.clientName,
        description: formData.description,
        budget: parseFloat(formData.budget),
        deadline: Timestamp.fromDate(new Date(formData.deadline)),
        status: "pending" as const,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "briefs"), briefData);

      setFormData({
        title: "",
        clientName: "",
        description: "",
        budget: "",
        deadline: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error("خطأ:", err);
      alert("فشل إنشاء الطلب");
    }

    setModalLoading(false);
  }

  async function updateBriefStatus(briefId: string, newStatus: Brief["status"]) {
    try {
      const briefRef = firebaseDoc(db, "briefs", briefId);
      await updateDoc(briefRef, { status: newStatus });
    } catch (err) {
      console.error("خطأ في التحديث:", err);
    }
  }

  if (loading) {
    return (
      <main
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          color: "white",
        }}
      >
        <p>جاري تحميل الطلبات...</p>
      </main>
    );
  }

  const getStatusBadge = (status: Brief["status"]) => {
    const statusMap: Record<
      Brief["status"],
      { bg: string; text: string; label: string }
    > = {
      pending: { bg: "#1f2937", text: "#f59e0b", label: "قيد الانتظار" },
      accepted: { bg: "#065f46", text: "#86efac", label: "مقبول" },
      "in-progress": { bg: "#1e40af", text: "#93c5fd", label: "قيد التنفيذ" },
      completed: { bg: "#047857", text: "#6ee7b7", label: "مكتمل" },
      rejected: { bg: "#7f1d1d", text: "#fca5a5", label: "مرفوض" },
    };
    return statusMap[status];
  };

  const pendingCount = briefs.filter((b) => b.status === "pending").length;
  const acceptedCount = briefs.filter((b) => b.status === "accepted").length;

  const formatDate = (timestamp: Timestamp) => {
    return new Date(timestamp.toMillis()).toLocaleDateString("ar-EG");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(amount);
  };

  return (
    <main
      style={{
        marginLeft: "260px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "white",
      }}
    >
      {/* شريط علوي */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 600 }}>
            الطلبات ({briefs.length})
          </h2>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            إدارة طلبات العملاء والعروض السعرية
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(to right, #3b82f6, #60a5fa)",
            color: "white",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          + طلب جديد
        </button>
      </header>

      {/* بطاقات الإحصائيات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        <StatCard
          label="الطلبات المعلقة"
          value={pendingCount.toString()}
          hint="تنتظر الردّ"
        />
        <StatCard
          label="الطلبات المقبولة"
          value={acceptedCount.toString()}
          hint="جاهزة للتنفيذ"
        />
        <StatCard
          label="إجمالي الطلبات"
          value={briefs.length.toString()}
          hint="كل الطلبات"
        />
      </div>

      {/* قائمة الطلبات */}
      <div
        style={{
          marginTop: "12px",
          borderRadius: "12px",
          border: "1px solid #1f2933",
          backgroundColor: "#020617",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #1f2933",
          }}
        >
          <h3 style={{ fontSize: "15px", fontWeight: 600 }}>قائمة الطلبات</h3>
        </div>

        {briefs.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center" }}>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              لا توجد طلبات حتى الآن.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #3b82f6",
                backgroundColor: "transparent",
                color: "#3b82f6",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              ابدأ الآن
            </button>
          </div>
        ) : (
          <div>
            {briefs.map((brief) => {
              const statusInfo = getStatusBadge(brief.status);
              return (
                <div
                  key={brief.id}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #1f2933",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "14px", fontWeight: 500 }}>
                        {brief.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                        من: {brief.clientName}
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundColor: statusInfo.bg,
                        color: statusInfo.text,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 500,
                        marginLeft: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {statusInfo.label}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      marginBottom: "6px",
                    }}
                  >
                    {brief.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    <span>الموازنة: {formatCurrency(brief.budget)}</span>
                    <span>الموعد: {formatDate(brief.deadline)}</span>
                  </div>

                  {/* أزرار الحالة حسب كل وضع */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {brief.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateBriefStatus(brief.id, "accepted")
                          }
                          style={{
                            padding: "4px 10px",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: "#065f46",
                            color: "#86efac",
                            fontSize: "11px",
                            cursor: "pointer",
                          }}
                        >
                          قبول
                        </button>
                        <button
                          onClick={() =>
                            updateBriefStatus(brief.id, "rejected")
                          }
                          style={{
                            padding: "4px 10px",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: "#7f1d1d",
                            color: "#fca5a5",
                            fontSize: "11px",
                            cursor: "pointer",
                          }}
                        >
                          رفض
                        </button>
                      </>
                    )}

                    {brief.status === "accepted" && (
                      <button
                        onClick={() =>
                          updateBriefStatus(brief.id, "in-progress")
                        }
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: "#1e40af",
                          color: "#93c5fd",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        بدء التنفيذ
                        </button>
                    )}

                    {brief.status === "in-progress" && (
                      <button
                        onClick={() =>
                          updateBriefStatus(brief.id, "completed")
                        }
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: "#047857",
                          color: "#6ee7b7",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        إكمال
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal لإنشاء طلب جديد */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => !modalLoading && setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#020617",
              border: "1px solid #1f2933",
              borderRadius: "12px",
              padding: "24px",
              width: "100%",
              maxWidth: "500px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}
            >
              إنشاء طلب جديد
            </h2>

            <form onSubmit={handleCreateBrief}>
              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "4px",
                    color: "#9ca3af",
                  }}
                >
                  عنوان المشروع
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="مثلاً: فيديو إعلاني 30 ثانية"
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "#111827",
                    color: "white",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "4px",
                    color: "#9ca3af",
                  }}
                >
                  اسم العميل
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  placeholder="اسم الشركة أو الفرد"
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "#111827",
                    color: "white",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "4px",
                    color: "#9ca3af",
                  }}
                >
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="أضف تفاصيل الطلب..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "#111827",
                    color: "white",
                    fontSize: "13px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "4px",
                    color: "#9ca3af",
                  }}
                >
                  الموازنة (جنيه مصري)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  placeholder="5000"
                  required
                  min="0"
                  step="100"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "#111827",
                    color: "white",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "4px",
                    color: "#9ca3af",
                  }}
                >
                  موعد التسليم
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "#111827",
                    color: "white",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background:
                      "linear-gradient(to right, #3b82f6, #60a5fa)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: modalLoading ? "not-allowed" : "pointer",
                    opacity: modalLoading ? 0.5 : 1,
                  }}
                >
                  {modalLoading ? "جاري الحفظ..." : "إنشاء الطلب"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={modalLoading}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "transparent",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: modalLoading ? "not-allowed" : "pointer",
                  }}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div
      style={{
        borderRadius: "12px",
        border: "1px solid #1f2933",
        padding: "14px 16px",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.08), #020617)",
      }}
    >
      <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
        {label}
      </p>
      <p style={{ fontSize: "22px", fontWeight: 600, marginBottom: "6px" }}>
        {value}
      </p>
      <p style={{ fontSize: "11px", color: "#6b7280" }}>{hint}</p>
    </div>
  );
}
