'use client'
import React from 'react';
import { Crown, Activity, Users, Wallet, ShieldAlert, TrendingUp, Settings } from 'lucide-react';

export default function SovereignGodMode() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 font-sans flex flex-col md:flex-row" dir="rtl">
      
      {/* Sidebar الإدارة */}
      <div className="w-full md:w-64 bg-[#0A0A0F] border-l border-white/5 p-6 flex flex-col hidden md:flex min-h-screen">
        <div className="flex items-center gap-3 mb-12">
          <Crown className="w-8 h-8 text-amber-500" />
          <h2 className="font-black text-xl text-white">إدارة الإمبراطورية</h2>
        </div>
        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 text-amber-400 bg-amber-500/10 px-4 py-3 rounded-xl font-bold text-sm"><Activity className="w-5 h-5"/> النظرة العامة</a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors"><Users className="w-5 h-5"/> إدارة المستخدمين</a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors"><Wallet className="w-5 h-5"/> الخزينة (Escrow)</a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors"><ShieldAlert className="w-5 h-5"/> النزاعات المفتوحة</a>
        </nav>
        <button className="flex items-center gap-3 text-slate-500 hover:text-white px-4 py-3 font-bold text-sm mt-auto transition-colors"><Settings className="w-5 h-5"/> إعدادات النظام</button>
      </div>

      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-screen">
        <header className="mb-10">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3 text-white">
            النظرة العامة <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">God Mode</span>
          </h1>
          <p className="text-slate-400">إحصائيات حية لجميع عمليات منصة Monteerly OS.</p>
        </header>

        {/* مؤشرات حيوية (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[ 
            { label: 'إجمالي الإيرادات (المنصة)', val: '$45,230', icon: <TrendingUp className="text-emerald-500 w-6 h-6"/>, color: 'emerald' },
            { label: 'أموال محتجزة في الضمان', val: '$124,500', icon: <Wallet className="text-indigo-500 w-6 h-6"/>, color: 'indigo' },
            { label: 'المستخدمين النشطين', val: '8,432', icon: <Users className="text-blue-500 w-6 h-6"/>, color: 'blue' },
            { label: 'نزاعات تتطلب تدخلاً', val: '3', icon: <ShieldAlert className="text-rose-500 w-6 h-6"/>, color: 'rose' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-full h-1 bg-${stat.color}-500/50`}></div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-bold text-slate-400">{stat.label}</p>
                <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>{stat.icon}</div>
              </div>
              <h3 className="text-3xl font-black text-white">{stat.val}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* أحدث طلبات السحب */}
          <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-white/5"><h3 className="font-bold text-white">طلبات سحب أموال قيد الانتظار</h3></div>
            <div className="p-6">
              <div className="flex justify-between items-center bg-[#12121A] p-4 rounded-xl border border-white/5 mb-3">
                <div><p className="font-bold text-sm text-white">أحمد جمال</p><p className="text-xs text-slate-500">حساب بنكي محلي</p></div>
                <div className="text-left"><p className="font-black text-emerald-400">$1,250</p><button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded mt-1">اعتماد التحويل</button></div>
              </div>
            </div>
          </div>

          {/* نظام مراقبة النظام */}
          <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-white/5"><h3 className="font-bold text-white">حالة الخوادم السيادية</h3></div>
            <div className="p-6 space-y-4">
               <div className="flex justify-between items-center"><span className="text-sm text-slate-400">قاعدة البيانات (Supabase)</span><span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">مستقر (99.9%)</span></div>
               <div className="flex justify-between items-center"><span className="text-sm text-slate-400">محرك التخزين (Cloud Vault)</span><span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">مستقر</span></div>
               <div className="flex justify-between items-center"><span className="text-sm text-slate-400">العقود الذكية (Escrow)</span><span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">مستقر</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
