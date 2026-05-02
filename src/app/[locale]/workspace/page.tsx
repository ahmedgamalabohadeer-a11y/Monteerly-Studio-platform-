import { supabase } from '@/lib/supabase';
import { ShieldCheck, Server } from 'lucide-react';
import CloudUploadZone from '@/components/workspace/CloudUploadZone';

export default async function WorkspacePage() {
  const { data: authData } = await supabase.auth.getUser();

  // محاكاة لمعرفات الطلب في النسخة التجريبية (MVP)
  const orderId = "mcos-req-001";
  const clientId = "mcos-client-001";

  // قاموس العبارات الاحترافية المعتمد
  const ar = {
    system: { 
      gpu_alloc: "تخصيص وحدات المعالجة الرسومية (GPU Allocation)...", 
      loading: "جاري استدعاء الأصول السحابية وتجهيز بيئة العمل..." 
    },
    legal: { 
      vault: "تمت المزامنة مع السحابة (مشفر)." 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans" dir="rtl">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">غرفة العمليات التعاونية</h1>
          <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
            <Server className="w-4 h-4" /> معالجة وتسليم نهائي | إنشاء رابط مراجعة آمن
          </p>
        </div>
        <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-5 py-3 rounded-full font-black text-xs flex items-center gap-2 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> اتصال آمن بالخوادم السيادية
        </div>
      </header>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-black text-slate-900">محرك الرفع السحابي (R2)</h2>
          <p className="text-slate-400 text-sm font-bold mt-1">تشفير AES-256 نشط. يرجى سحب الأصول الرقمية هنا.</p>
        </div>
        
        {/* دمج المكون التفاعلي الجديد الذي تم بناؤه سابقاً */}
        <CloudUploadZone orderId={orderId} clientId={clientId} ar={ar} />
      </div>
    </div>
  );
}
