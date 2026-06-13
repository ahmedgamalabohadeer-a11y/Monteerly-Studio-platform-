"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, loginWithGoogle } from "@/lib/auth-service";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

type AuthErrorLike = {
  message?: string;
  code?: string;
};

function getErrorDetails(error: unknown): AuthErrorLike {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === "object" && error !== null) {
    const maybeError = error as Record<string, unknown>;
    return {
      message: typeof maybeError.message === "string" ? maybeError.message : undefined,
      code: typeof maybeError.code === "string" ? maybeError.code : undefined,
    };
  }

  return {};
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setStatusMsg("جاري الاتصال بالسيرفر...");
    setIsLoading(true);

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("انتهت مهلة الاتصال (Timeout). تحقق من الإنترنت.")), 15000)
    );

    try {
      await Promise.race([loginUser(email, password), timeoutPromise]);
      setStatusMsg("تم بنجاح! جاري التوجيه...");
      router.push("/dashboard");
    } catch (err: unknown) {
      const { message, code } = getErrorDetails(err);
      let msg = message || "حدث خطأ غير معروف";

      if (code === "auth/invalid-credential") {
        msg = "البريد أو كلمة المرور غير صحيحة";
      }

      setError(msg);
      setStatusMsg("");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    setStatusMsg("جاري فتح Google...");

    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const { message } = getErrorDetails(err);
      setError("فشل الدخول بجوجل: " + (message || "حدث خطأ غير معروف"));
      setStatusMsg("");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020817] px-4 py-12">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/20 blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel relative z-10 w-full max-w-md space-y-8 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-blue-500/20">
            M
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">مرحباً بعودتك</h2>
          <p className="mt-2 text-sm text-slate-400">نظام Monteerly Studio الاحترافي</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              type="email"
              required
              className="block w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3.5 text-white outline-none"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="block w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3.5 text-white outline-none"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {statusMsg && <p className="text-center text-sm text-slate-400">{statusMsg}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3.5 font-bold text-white transition-all"
          >
            {isLoading ? "جاري المعالجة..." : "تسجيل الدخول"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm font-medium text-slate-300"
        >
          Google
        </button>
      </motion.div>
    </div>
  );
}
