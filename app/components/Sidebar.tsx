"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSignOut, setShowSignOut] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("خطأ في تسجيل الخروج:", error);
    }
  };

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  const navItems = [
    { href: "/dashboard", label: "لوحة التحكم", icon: "📊" },
    { href: "/dashboard/projects", label: "المشاريع", icon: "🎯" },
    { href: "/dashboard/profile", label: "الملف الشخصي", icon: "👤" },
    { href: "/dashboard/settings", label: "الإعدادات", icon: "⚙️" },
  ];

  return (
    <>
      {/* Overlay للموبايل */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 40,
            display: "none",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: "280px",
          backgroundColor: "rgba(15,23,42,0.98)",
          borderLeft: "1px solid rgba(31,41,55,1)",
          padding: "20px 16px",
          overflowY: "auto",
          zIndex: 50,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          paddingTop: "80px",
        }}
        dir="rtl"
      >
        {/* شعار */}
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#e5e7eb",
              margin: 0,
            }}
          >
            Monteerly
          </h2>
          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              margin: "4px 0 0 0",
            }}
          >
            Studio Platform
          </p>
        </div>

        {/* عناصر التنقل */}
        <nav style={{ marginBottom: 24 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 12px",
                marginBottom: 8,
                borderRadius: "10px",
                border: isActive(item.href)
                  ? "1px solid rgba(13,183,180,0.6)"
                  : "1px solid transparent",
                backgroundColor: isActive(item.href)
                  ? "rgba(13,183,180,0.1)"
                  : "transparent",
                color: isActive(item.href) ? "#a5f3fc" : "#e5e7eb",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: isActive(item.href) ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid rgba(31,41,55,1)",
            margin: "16px 0",
          }}
        />

        {/* قسم المستخدم */}
        <div
          style={{
            position: "relative",
          }}
        >
          <button
            onClick={() => setShowSignOut(!showSignOut)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderRadius: "10px",
              border: "1px solid rgba(31,41,55,1)",
              backgroundColor: "rgba(15,23,42,0.95)",
              color: "#e5e7eb",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: "16px" }}>👤</span>
            <span>حسابي</span>
            <span style={{ marginLeft: "auto", fontSize: "12px" }}>
              {showSignOut ? "▲" : "▼"}
            </span>
          </button>

          {showSignOut && (
            <button
              onClick={handleSignOut}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 12px",
                marginTop: 8,
                borderRadius: "10px",
                border: "1px solid rgba(239,68,68,0.3)",
                backgroundColor: "rgba(239,68,68,0.1)",
                color: "#fca5a5",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "16px" }}>🚪</span>
              <span>تسجيل الخروج</span>
            </button>
          )}
        </div>

        {/* معلومات */}
        <div
          style={{
            marginTop: 24,
            padding: "12px",
            borderRadius: "10px",
            backgroundColor: "rgba(13,183,180,0.08)",
            border: "1px solid rgba(13,183,180,0.2)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            🎯 Monteerly Studio Platform v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
