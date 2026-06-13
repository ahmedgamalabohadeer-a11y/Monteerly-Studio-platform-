'use client';
import { Bot, Mic, FileText, Sparkles } from 'lucide-react';
export default function AIStudio() {
  return (
    <div dir='rtl' className='p-8 min-h-screen bg-slate-900 text-white'>
      <h1 className='text-3xl font-black mb-6 text-purple-400'>استوديو الذكاء الاصطناعي</h1>
      <div className='grid md:grid-cols-3 gap-6'>
        <Card icon={<Bot className="text-blue-400"/>} title="Digital Twin" value="التوأم الرقمي البصري" />
        <Card icon={<Mic className="text-emerald-400"/>} title="AI Dubbing" value="دبلجة مع حفظ نبرة الصوت" />
        <Card icon={<FileText className="text-amber-400"/>} title="AI Script Writer" value="توليد السكربتات الإعلانية" />
      </div>
    </div>
  );
}
function Card({icon, title, value}:any) { return <div className='bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center gap-4 hover:border-purple-500 transition-all'><div className='p-4 bg-slate-900 rounded-full'>{icon}</div><h3 className='font-bold text-lg'>{title}</h3><span className='text-slate-400 text-sm'>{value}</span></div>}
