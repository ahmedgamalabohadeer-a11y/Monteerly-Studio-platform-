'use client';
import React, { useState } from 'react';
import { DollarSign, Users, Link as LinkIcon, Copy, TrendingUp, Gift } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton';
import { motion } from 'framer-motion';

export function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://monteerly.com/ref/ahmed_kamal";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
       {/* Hero Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-900 to-black p-6 rounded-2xl border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign size={100} /></div>
             <div className="relative z-10">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">الأرباح المتراكمة</div>
                <div className="text-4xl font-black text-white">$1,250.00</div>
                <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                   <TrendingUp size={12}/> +$120 هذا الأسبوع
                </div>
             </div>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10">
             <div className="text-slate-400 text-xs font-bold uppercase mb-1">عدد الإحالات (Signups)</div>
             <div className="text-4xl font-black text-white">45</div>
             <div className="text-xs text-slate-500 mt-2">Conversion Rate: 12%</div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 flex flex-col justify-center">
             <div className="text-slate-400 text-xs font-bold uppercase mb-2">رابط الإحالة الخاص بك</div>
             <div className="bg-black p-2 rounded-lg border border-white/10 flex justify-between items-center mb-2">
                <code className="text-xs text-indigo-300 truncate px-1">{referralLink}</code>
                <button onClick={copyLink} className="text-slate-400 hover:text-white">
                   {copied ? <span className="text-green-400 text-xs font-bold">Copied!</span> : <Copy size={16}/>}
                </button>
             </div>
             <p className="text-[10px] text-slate-500">شارك الرابط واحصل على 20% مدى الحياة.</p>
          </div>
       </div>

       {/* Referral History */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
             <Users className="text-indigo-400" /> آخر المسجلين
          </h3>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">U{i}</div>
                      <div>
                         <div className="font-bold text-white text-sm">مستخدم جديد #{990+i}</div>
                         <div className="text-xs text-slate-500">Plan: Pro (Yearly)</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-sm font-bold text-green-400">+$24.00</div>
                      <div className="text-[10px] text-slate-500">Pending</div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

################################################################################