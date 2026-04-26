"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser, loginWithGoogle } from "@/lib/auth-service";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusMsg("جاري الاتصال بالسيرفر...");
    setIsLoading(true);

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("انتهت مهلة الاتصال (Timeout). تحقق من الإنترنت.")), 15000)
    );

    try {
      await Promise.race([
        loginUser(email, password),
        timeoutPromise
      ]);
      setStatusMsg("تم بنجاح! جاري التوجيه...");
      router.push("/dashboard"); 
    } catch (err: any) {
      let msg = err.message || "حدث خطأ غير معروف";
      if (err.code === 'auth/invalid-credential') msg = "البريد أو كلمة المرور غير صحيحة";
      setError(msg);
      setStatusMsg("");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setStatusMsg("جاري فتح Google...");
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setError("فشل الدخول بجوجل: " + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020817] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 p-8 glass-panel rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-2xl mb-6 shadow-lg shadow-blue-500/20">M</div>
          <h2 className="text-3xl font-bold tracking-tight text-white">مرحباً بعودتك</h2>
          <p className="mt-2 text-sm text-slate-400">نظام Monteerly Studio الاحترافي</p>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input type="email" required className="block w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3.5 px-4 text-white outline-none" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" required className="block w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3.5 px-4 text-white outline-none" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm text-center flex items-center justify-center gap-2"><AlertCircle size={16} /> {error}</div>}
          <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 transition-all">
            {isLoading ? "جاري المعالجة..." : "تسجيل الدخول"}
          </button>
        </form>
        <button onClick={handleGoogleLogin} type="button" className="flex w-full justify-center items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 py-3 px-4 text-sm font-medium text-slate-300">Google</button>
      </motion.div>
    </div>
  );
}
