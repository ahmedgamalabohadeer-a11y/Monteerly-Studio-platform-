'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, MonitorPlay, Wand2 } from 'lucide-react';

export default function StudioPage() {
  const tools = [
    {
      title: 'الرندر السحابي (GPU Cluster)',
      desc: 'استخدم خوادم MCOS القوية لمعالجة الفيديوهات الثقيلة في مسار تنفيذ أكثر هدوءاً ووضوحاً.',
      icon: <Cpu className="h-6 w-6 text-indigo-400" />,
    },
    {
      title: 'تصحيح الألوان بالذكاء الاصطناعي',
      desc: 'تطبيق قوالب ألوان سينمائية متقدمة بضغطة زر مع إبقاء الصفحة نفسها خفيفة وغير متضخمة بصرياً.',
      icon: <Wand2 className="h-6 w-6 text-purple-400" />,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl space-y-10 px-4 py-6 md:px-6 md:py-8">
      <header className="space-y-5 text-center">
        <div className="inline-flex rounded-full bg-indigo-500/10 p-4">
          <MonitorPlay className="h-10 w-10 text-indigo-400" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-50 md:text-5xl">
            استوديو MCOS الإبداعي
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400">
            أدوات تحرير ورندر سحابية متقدمة، مع واجهة تنفيذ تنتمي إلى shell العام
            بدل أن تتحول إلى shell مستقل داخل الصفحة.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <article
            key={tool.title}
            className="group rounded-3xl border border-white/5 bg-[#0A0A0F] p-8 shadow-xl transition-all hover:border-indigo-500/30"
          >
            <div className="mb-6 inline-flex rounded-2xl bg-[#05050A] p-4 transition-transform group-hover:scale-110">
              {tool.icon}
            </div>

            <h2 className="mb-3 text-2xl font-black text-slate-100">
              {tool.title}
            </h2>
            <p className="leading-8 text-slate-400">{tool.desc}</p>
          </article>
        ))}
      </div>

      <div className="space-y-4 border-t border-white/5 pt-8 text-center">
        <p className="font-bold text-slate-500">
          هذه الواجهة تتصل بوحدات المعالجة دون الحاجة إلى إعادة بناء shell كامل
          داخل route الصفحة.
        </p>

        <Link
          href="/ar/workspace"
          className="inline-flex items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-black text-indigo-400 transition-colors hover:text-indigo-300"
        >
          العودة لمساحة العمل
        </Link>
      </div>
    </section>
  );
}
