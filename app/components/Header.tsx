"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";

type HeaderProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // تطبيق الثيم على العنصر الجذر
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute("data-color-scheme", "dark");
    } else {
      root.setAttribute("data-color-scheme", "light");
    }
  }, [isDark]);

  return (
    <header
      dir="rtl"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        height: "70px",
        backgroundColor: "rgba(15,23,42,0.98)",
        borderBottom: "1px solid rgba(31,41,55,1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
        zIndex: 30,
      }}
    >
      {/* الجانب الأيسر */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* زر تبديل الثيم */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(31,41,55,1)",
            backgroundColor: "rgba(15,23,42,0.95)",
            color: "#e5e7eb",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          title={isDark ? "Dark Mode" : "Light Mode"}
        >
          {isDark ? "🌙" : "☀️"}
        </button>

        {/* معلومات المستخدم */}
        {user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: "8px",
              backgroundColor: "rgba(13,183,180,0.1)",
              border: "1px solid rgba(13,183,180,0.3)",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#a5f3fc",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.displayName || user.email?.split("@")[0] || "مستخدم"}
            </span>
            <span style={{ fontSize: "12px" }}>👤</span>
          </div>
        )}
      </div>

      {/* الجانب الأيمن - زر القائمة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid rgba(31,41,55,1)",
          backgroundColor: "rgba(15,23,42,0.95)",
          color: "#e5e7eb",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}
