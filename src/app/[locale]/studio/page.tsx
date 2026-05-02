'use client'
import React from 'react';
import { MonitorPlay, Cpu, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function StudioPage() {
  const tools = [
    { title: "الرندر السحابي (GPU Cluster)", desc: "استخدم خوادم MCOS القوية لمعالجة الفيديوهات الثقيلة في ثوانٍ.", icon: <Cpu className="w-6 h-6 text-indigo-400" /> },
    { title: "تصحيح الألوان بالذكاء الاصطناعي", desc: "تطبيق قوالب ألوان سينمائية متقدمة بضغطة زر.", icon: <Wand2 className="w-6 h-6 text-purple-400" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-block bg-indigo-500/10 p-4 rounded-full mb-6">
            <MonitorPlay className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">استوديو MCOS الإبداعي</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">أدوات تحرير فيديو ورندر سحابية متقدمة، مصممة للنخب.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {tools.map((tool, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 transition-all group">
              <div className="bg-slate-950 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-2xl font-black mb-3">{tool.title}</h3>
              <p className="text-slate-400 leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center border-t border-white/5 pt-12">
          <p className="text-slate-500 mb-6 font-bold">هذه الواجهة تتصل بـ Agent Ultra لتخصيص الموارد محلياً.</p>
          <Link href="/ar/workspace" className="text-indigo-400 hover:text-indigo-300 font-black">
            العودة لمساحة العمل &larr;
          </Link>
        </div>
      </div>
    </div>
  );
}
