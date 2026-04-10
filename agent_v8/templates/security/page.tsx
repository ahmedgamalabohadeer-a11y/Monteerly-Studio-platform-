'use client';
import { ShieldAlert, Fingerprint, MapPin, Lock } from 'lucide-react';
export default function Security() {
  return (
    <div dir='rtl' className='p-8 min-h-screen bg-slate-950 text-white'>
      <h1 className='text-3xl font-black mb-6 text-red-500'>القبة الحديدية والسيادة على البيانات</h1>
      <div className='grid md:grid-cols-4 gap-6'>
        <Card icon={<Fingerprint className="text-emerald-400"/>} title="Forensic Watermarking" value="بصمة خفية لمنع التسريب" />
        <Card icon={<MapPin className="text-blue-400"/>} title="Data Residency" value="خوادم محلية (الرياض/القاهرة)" />
        <Card icon={<ShieldAlert className="text-red-400"/>} title="Smart Guardian" value="مراقبة PII والتهرب" />
        <Card icon={<Lock className="text-purple-400"/>} title="Zero Trust Builder" value="سياسات وصول مشروطة" />
      </div>
    </div>
  );
}
function Card({icon, title, value}:any) { return <div className='bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center gap-4 hover:border-red-500 transition-all'><div className='p-4 bg-slate-800 rounded-full'>{icon}</div><h3 className='font-bold text-lg text-center'>{title}</h3><span className='text-slate-400 text-sm text-center'>{value}</span></div>}
