"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logout,
} from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignUp() {
    setLoading(true);
    setMessage("");
    try {
      await signUpWithEmail(email, password);
      setMessage("✓ تم التسجيل بنجاح! جاري التوجيه...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setMessage(`✗ خطأ: ${err.message}`);
    }
    setLoading(false);
  }

  async function handleSignIn() {
    setLoading(true);
    setMessage("");
    try {
      await signInWithEmail(email, password);
      setMessage("✓ تم تسجيل الدخول بنجاح! جاري التوجيه...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setMessage(`✗ خطأ: ${err.message}`);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    setMessage("");
    try {
      await signInWithGoogle();
      setMessage("✓ تم تسجيل الدخول عبر Google! جاري التوجيه...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setMessage(`✗ خطأ: ${err.message}`);
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
      setEmail("");
      setPassword("");
      setMessage("✓ تم تسجيل الخروج بنجاح!");
    } catch (err: any) {
      setMessage(`✗ خطأ: ${err.message}`);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
        color: "white",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#020617",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
          Monteerly Studio
        </h1>

        {message && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              borderRadius: "6px",
              backgroundColor: message.includes("✗")
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(34, 197, 94, 0.1)",
              color: message.includes("✗") ? "#ef4444" : "#22c55e",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <label style={{ display: "block", marginBottom: "8px" }}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #475569",
            backgroundColor: "#020617",
            color: "white",
          }}
        />

        <label style={{ display: "block", marginBottom: "8px" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #475569",
            backgroundColor: "#020617",
            color: "white",
          }}
        />

        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: loading ? "#888888" : "#22c55e",
            color: "black",
            fontWeight: 600,
            marginBottom: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "جاري المعالجة..." : "Sign Up"}
        </button>

        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #64748b",
            backgroundColor: "#020617",
            color: "white",
            marginBottom: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "جاري المعالجة..." : "Sign In"}
        </button>

        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #64748b",
            backgroundColor: "#0f172a",
            color: "white",
            marginBottom: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "جاري المعالجة..." : "Sign in with Google"}
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            marginTop: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
