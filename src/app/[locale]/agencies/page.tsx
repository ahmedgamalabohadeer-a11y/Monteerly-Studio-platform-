'use client'
import React from 'react';
import { Building2, Users, PieChart, ShieldCheck } from 'lucide-react';

export default function AgenciesPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3 text-white">
              <Building2 className="w-10 h-10 text-indigo-500" /> لوحة الوكالات المؤسسية
            </h1>
            <p className="text-slate-400 text-lg">إدارة فرق العمل، الفوترة الضريبية الإلكترونية، وتخصيص العلامة التجارية للوكالة (White-label).</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-5 h-5" /> إدارة الصلاحيات (RBAC)
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all group cursor-pointer">
             <Users className="text-blue-400 mb-6 w-12 h-12 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-black mb-2 text-white">إدارة الكيانات والفرق</h3>
             <p className="text-slate-400 text-sm">تحديد الأدوار (مصور، مدير مشروع، إلخ) وتوزيع المهام.</p>
           </div>
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/50 transition-all group cursor-pointer">
             <PieChart className="text-emerald-400 mb-6 w-12 h-12 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-black mb-2 text-white">الفوترة الإلكترونية</h3>
             <p className="text-slate-400 text-sm">توليد فواتير ضريبية للامتثال المؤسسي والسعودي.</p>
           </div>
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] hover:border-amber-500/50 transition-all group cursor-pointer">
             <ShieldCheck className="text-amber-400 mb-6 w-12 h-12 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-black mb-2 text-white">سياسات الأمان العزلي</h3>
             <p className="text-slate-400 text-sm">تطبيق Multi-tenant وعزل البيانات المالية لكل مستأجر.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
