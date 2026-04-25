'use client';
import { useRouter } from 'next/navigation';
import { Shield, LayoutDashboard, FileCheck } from 'lucide-react';

export default function PortalPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 animate-in fade-in duration-700" dir="rtl">
      <div className="text-center mb-12">
        <Shield size={80} className="mx-auto text-brand-primary mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cairo">بوابة Monteerly السيادية</h1>
        <p className="text-gray-400 text-lg">نظام تشغيل الشركات المتكامل (Corporate OS)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
        <button onClick={() => router.push('/ar/dashboard-english')} className="group p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500 transition-all flex flex-col items-center">
          <LayoutDashboard size={40} className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold text-white mb-2">لوحة التحكم</h2>
          <p className="text-slate-400 text-sm">إدارة المشاريع، الموارد، وتحليلات الأداء</p>
        </button>
        
        <button onClick={() => router.push('/ar/legal')} className="group p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-green-500 transition-all flex flex-col items-center">
          <FileCheck size={40} className="text-green-500 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-bold text-white mb-2">المنظومة القانونية</h2>
          <p className="text-slate-400 text-sm">صياغة العقود بالذكاء الاصطناعي والتوقيع الرقمي</p>
        </button>
      </div>
    </div>
  );
}
