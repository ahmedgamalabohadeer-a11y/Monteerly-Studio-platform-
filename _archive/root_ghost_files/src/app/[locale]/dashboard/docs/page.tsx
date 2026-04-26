'use client';
import React from 'react';
import { Book, ShieldCheck, Landmark, GraduationCap, Video, MessageSquare, Search } from 'lucide-react';

const sections = [
  {
    title: 'الإدارة والوكالة',
    icon: ShieldCheck,
    color: 'text-indigo-400',
    content: ['تخصيص الهوية البصرية للشركاء (White Label).', 'إدارة صلاحيات الفريق (Admin, Manager, Creator).']
  },
  {
    title: 'البروتوكولات المالية',
    icon: Landmark,
    color: 'text-emerald-400',
    content: ['إدارة المحفظة الرقمية وتتبع التدفقات.', 'إصدار الفواتير والامتثال الضريبي الدولي.']
  },
  {
    title: 'الإجراءات القانونية',
    icon: Book,
    color: 'text-rose-400',
    content: ['التوقيع الرقمي للعقود والالتزامات.', 'إجراءات بدء التحكيم في مركز النزاعات.']
  },
  {
    title: 'الإنتاج والأكاديمية',
    icon: Video,
    color: 'text-amber-400',
    content: ['استخدام أدوات التعليق الزمني على الفيديو.', 'إتمام المسارات التدريبية والحصول على الشهادات.']
  }
];

export default function DocsPage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Book className="text-indigo-500" size={32} />
          مركز المعرفة والدليل التشغيلي
        </h1>
        <p className="text-slate-400 mt-2 text-sm">المرجع الرسمي لسياسات التشغيل، الإجراءات المالية، والضوابط القانونية للمنصة.</p>
      </div>

      {/* البحث السريع */}
      <div className="relative max-w-2xl">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="ابحث عن إجراء أو بروتوكول معين..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* أقسام الدليل */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <section.icon className={section.color} size={28} />
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>
            <ul className="space-y-4">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* دعم فني مباشر */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">هل تحتاج إلى استشارة قانونية أو مالية؟</h3>
          <p className="text-slate-400 text-sm">فريق الإدارة والتحكيم متاح للرد على استفساراتكم المعقدة.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
          <MessageSquare size={18} /> فتح تذكرة دعم
        </button>
      </div>
    </div>
  );
}
