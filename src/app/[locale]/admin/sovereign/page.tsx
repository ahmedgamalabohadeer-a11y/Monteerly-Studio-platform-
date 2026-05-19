'use client'
import React from 'react';
import { Crown, Activity, Users, Wallet, ShieldAlert, TrendingUp, Settings, AlertOctagon } from 'lucide-react';

export default function SovereignGodMode() {
  const fraudAlerts = [
    { id: 102, user: 'Ahmed G.', score: 18, reason: 'تعدد النزاعات (Disputes)' },
    { id: 405, user: 'Sami R.', score: 35, reason: 'تراجع بنكي (Chargeback)' }
  ];

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
          <a href="#" className="flex items-center gap-3 text-rose-400 bg-rose-500/10 px-4 py-3 rounded-xl font-bold text-sm"><ShieldAlert className="w-5 h-5"/> رادار الاحتيال (Fraud)</a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors"><Wallet className="w-5 h-5"/> خوادم الدفع (Paymob)</a>
        </nav>
      </div>

      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-screen">
        <header className="mb-10">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3 text-white">
            النظرة العامة <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">God Mode</span>
          </h1>
        </header>

        {/* مؤشرات حيوية (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[ 
            { label: 'إجمالي الإيرادات (المنصة)', val: '$45,230', icon: <TrendingUp className="text-emerald-500 w-6 h-6"/>, color: 'emerald' },
            { label: 'أموال في الضمان', val: '$124,500', icon: <Wallet className="text-indigo-500 w-6 h-6"/>, color: 'indigo' },
            { label: 'تراجعات بنكية (Chargebacks)', val: '1', icon: <AlertOctagon className="text-rose-500 w-6 h-6"/>, color: 'rose' }
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

        {/* رادار الاحتيال (Fraud Radar) */}
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-[2rem] overflow-hidden mb-8">
           <div className="p-6 border-b border-rose-500/20 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-rose-400">رادار الاحتيال النشط (Fraud_Score > 15)</h3>
           </div>
           <div className="p-6 space-y-4">
              {fraudAlerts.map(alert => (
                 <div key={alert.id} className="flex justify-between items-center bg-[#0A0A0F] p-4 rounded-xl border border-rose-500/10">
                    <div>
                       <p className="font-bold text-white flex items-center gap-2">{alert.user} <span className="bg-rose-500 text-white px-2 py-0.5 rounded text-xs">Score: {alert.score}</span></p>
                       <p className="text-xs text-slate-500 mt-1">السبب: {alert.reason}</p>
                    </div>
                    <div>
                       {alert.score >= 20 ? 
                         <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20">السحب محظور آلياً</span> :
                         <button className="text-xs bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded">مراقبة الحساب</button>
                       }
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
