'use client'
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { ShieldCheck, Lock, Loader2, ArrowRight, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SecureCheckout({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // بيانات محاكية مؤقتاً لتلخيص المشروع (سيتم جلبها لاحقاً من قاعدة البيانات)
  const projectSummary = {
    title: "مونتاج فيديو إعلاني احترافي",
    amount: 1500, // بالجنيه أو الدولار
    freelancer: "أحمد جمال",
    fee: 30 // عمولة المنصة
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/paymob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, amount: projectSummary.amount + projectSummary.fee })
      });
      
      const data = await res.json();
      
      if (data.redirectUrl) {
        // إعادة توجيه العميل إلى بوابات Paymob المشفرة
        window.location.href = data.redirectUrl;
      } else {
        alert("تنبيه: بوابة الدفع في وضع التطوير (Sandbox). يلزم إدخال مفاتيح Paymob في الخزنة السرية (.env).");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('فشل الاتصال بخوادم الدفع');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans" dir="rtl">
      <button onClick={() => router.back()} className="absolute top-8 right-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowRight className="w-4 h-4" /> العودة
      </button>

      <div className="w-full max-w-xl">
        <header className="mb-10 text-center">
            <div className="inline-block bg-indigo-500/10 p-4 rounded-3xl mb-6 border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
               <Lock className="w-10 h-10 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-black mb-3 text-white">إيداع الضمان (Escrow)</h1>
            <p className="text-slate-400 text-sm">سيتم حجز الأموال في خزنة Monteerly المشفرة ولن تُسلم للمبدع إلا باعتمادك.</p>
        </header>

        <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-indigo-500 to-emerald-500"></div>
           
           <h3 className="font-bold text-lg mb-6 border-b border-white/5 pb-4">ملخص التعاقد (م. رقم {projectId})</h3>
           
           <div className="space-y-4 mb-8">
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-400">المشروع</span>
               <span className="font-bold text-white">{projectSummary.title}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-400">الطرف المنفذ</span>
               <span className="font-bold text-indigo-400">{projectSummary.freelancer}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-400">رسوم الحماية (Sovereign Guard)</span>
               <span className="font-bold text-emerald-400">{projectSummary.fee} EGP</span>
             </div>
           </div>

           <div className="bg-[#12121A] border border-white/5 p-6 rounded-2xl mb-8 flex justify-between items-center">
             <span className="font-bold text-slate-300">الإجمالي المستحق</span>
             <span className="text-3xl font-black text-white">{projectSummary.amount + projectSummary.fee} EGP</span>
           </div>

           <button 
             onClick={handlePayment} 
             disabled={loading}
             className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-[#12121A] disabled:text-slate-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)]"
           >
             {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
             {loading ? 'جاري تأمين الاتصال ببوابة الدفع...' : 'دفع آمن عبر (Paymob)'}
           </button>
           
           <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
             <ShieldCheck className="w-4 h-4 text-emerald-500" />
             <span>اتصال مشفر ومحمي. لا نحتفظ ببيانات بطاقتك الائتمانية.</span>
           </div>
        </div>
      </div>
    </div>
  );
}
