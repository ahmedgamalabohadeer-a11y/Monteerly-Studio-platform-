'use client'
import React from 'react';
import { Camera, MonitorPlay, Building2, UserCircle } from 'lucide-react';

export default function RoleSelectionPage() {
  const roles = [
    { id: 'editor', title: 'مونتير / مبدع', desc: 'استقبل مشاريع، استخدم أدوات الذكاء الاصطناعي، وارفع أرباحك.', icon: <MonitorPlay className="w-10 h-10 text-indigo-500" /> },
    { id: 'photographer', title: 'مصور سينمائي', desc: 'بع لقطاتك الخام (Raw Footage) في المكتبة، وتلقى طلبات تصوير ميداني.', icon: <Camera className="w-10 h-10 text-rose-500" /> },
    { id: 'agency', title: 'وكالة إنتاج / شركة', desc: 'أدر فريقك، افتح مساحات عمل تعاونية، ووثق عقودك.', icon: <Building2 className="w-10 h-10 text-emerald-500" /> },
    { id: 'client', title: 'عميل / صانع محتوى', desc: 'ابحث عن نخب إبداعية، وادفع بأمان عبر نظام الضمان (Escrow).', icon: <UserCircle className="w-10 h-10 text-amber-500" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-8 font-sans" dir="rtl">
      <div className="max-w-5xl w-full">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">كيف تستخدم Monteerly OS؟</h1>
          <p className="text-slate-400 text-lg">حدد هويتك المهنية ليتم تخصيص واجهة النظام، الأدوات، ومساحة العمل لتناسب احتياجاتك.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map(role => (
            <div key={role.id} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-slate-500 hover:bg-slate-800 cursor-pointer transition-all group text-center flex flex-col items-center">
              <div className="bg-slate-950 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-xl">
                {role.icon}
              </div>
              <h3 className="text-xl font-black mb-3">{role.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{role.desc}</p>
              <button className="mt-8 w-full bg-slate-950 group-hover:bg-indigo-600 text-white py-3 rounded-xl font-bold transition-all border border-slate-800 group-hover:border-indigo-600">
                اختيار هذا الدور
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
