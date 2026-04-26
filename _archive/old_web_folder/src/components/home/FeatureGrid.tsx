import React from 'react';
import { Video, Landmark, GraduationCap, ShieldCheck } from 'lucide-react';

export function FeatureGrid() {
  const features = [
    { title: 'مونتاج سينمائي', desc: 'أدوات مراجعة وتعليق لحظي على الفيديوهات بدقة 4K.', icon: Video, color: 'text-rose-500' },
    { title: 'إدارة مالية', desc: 'نظام فواتير وامتثال ضريبي متوافق مع التجارة الدولية.', icon: Landmark, color: 'text-emerald-500' },
    { title: 'أكاديمية ذكية', desc: 'تدريب وتأهيل الكوادر وتوثيق المهارات بشهادات رقمية.', icon: GraduationCap, color: 'text-amber-500' },
    { title: 'تحكيم قانوني', desc: 'فض النزاعات التعاقدية عبر منصة قضاء رقمي مؤمنة.', icon: ShieldCheck, color: 'text-indigo-500' },
  ];

  return (
    <div id="features" className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((f, i) => (
        <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/30 transition-all group">
          <f.icon className={`${f.color} mb-6 group-hover:scale-110 transition-transform`} size={40} />
          <h3 className="text-xl font-bold mb-3">{f.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
