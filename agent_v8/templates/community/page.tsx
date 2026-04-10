'use client';
import { Users, Award, TrendingUp, MessageSquare } from 'lucide-react';
export default function Community() {
  return (
    <div dir='rtl' className='p-8 min-h-screen bg-slate-50'>
      <h1 className='text-3xl font-black mb-6 text-blue-900'>مجتمع المونتيرين وصناع المحتوى</h1>
      <div className='grid md:grid-cols-4 gap-6'>
        <Card icon={<MessageSquare className="text-blue-600"/>} title="ساحة النقاش (Feed)" value="تبادل الخبرات" />
        <Card icon={<Award className="text-amber-500"/>} title="Gamification Badges" value="Top Rated Talent" />
        <Card icon={<Users className="text-emerald-600"/>} title="Referral Dashboard" value="ترقيات العضوية" />
        <Card icon={<TrendingUp className="text-red-600"/>} title="Trending Topics" value="المواضيع الرائجة" />
      </div>
    </div>
  );
}
function Card({icon, title, value}:any) { return <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-4 hover:shadow-md transition-all'><div className='p-4 bg-slate-50 rounded-full'>{icon}</div><h3 className='font-bold text-lg'>{title}</h3><span className='text-slate-500 text-sm'>{value}</span></div>}
