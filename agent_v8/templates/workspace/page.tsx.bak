'use client';
import { MonitorPlay, SlidersHorizontal, Focus, Activity } from 'lucide-react';
export default function Workspace() {
  return (
    <div dir='rtl' className='p-8 min-h-screen bg-slate-950 text-white'>
      <h1 className='text-3xl font-black mb-6 text-blue-400'>بيئة التحرير والمونتاج السحابية</h1>
      <div className='grid md:grid-cols-4 gap-6'>
        <Card icon={<Activity className="text-emerald-400"/>} title="QC Scopes" value="تدقيق الألوان والصوت" />
        <Card icon={<Focus className="text-purple-400"/>} title="Deep Focus Mode" value="عزل المشتتات" />
        <Card icon={<SlidersHorizontal className="text-blue-400"/>} title="Compare View" value="مقارنة A/B" />
        <Card icon={<MonitorPlay className="text-red-400"/>} title="Live Stream Cutter" value="قص البث المباشر" />
      </div>
    </div>
  );
}
function Card({icon, title, value}:any) { return <div className='bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center gap-4 hover:border-blue-500 transition-all'><div className='p-4 bg-slate-800 rounded-full'>{icon}</div><h3 className='font-bold text-lg'>{title}</h3><span className='text-slate-400 text-sm'>{value}</span></div>}
