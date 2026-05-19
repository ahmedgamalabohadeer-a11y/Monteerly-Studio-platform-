'use client'
import React from 'react';
import { Bell, Wallet, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function NotificationsCenter() {
  const notifs = [
    { type: 'finance', title: 'تم تأمين الدفعة في الضمان', desc: 'تم إيداع 800$ في نظام Escrow لمشروع "إعلان تجاري". يمكنك بدء العمل الآن.', time: 'منذ 10 دقائق', icon: <Wallet className="w-5 h-5 text-emerald-400" />, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { type: 'message', title: 'رسالة مشفرة جديدة', desc: 'وكالة نون الإبداعية أرسلت لك رسالة في صندوق التفاوض.', time: 'منذ ساعة', icon: <MessageSquare className="w-5 h-5 text-indigo-400" />, bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { type: 'system', title: 'تم توثيق هويتك بنجاح', desc: 'حسابك الآن يحمل شارة التوثيق السيادي (KYC Level 1).', time: 'أمس', icon: <ShieldCheck className="w-5 h-5 text-amber-400" />, bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { type: 'alert', title: 'تحديث أمني', desc: 'تم تسجيل دخول من جهاز جديد (Windows - Chrome). إذا لم تكن أنت، قم بتغيير مفتاح التشفير فوراً.', time: 'منذ 3 أيام', icon: <AlertTriangle className="w-5 h-5 text-rose-400" />, bg: 'bg-rose-500/10', border: 'border-rose-500/20' }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans pt-24" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
              <Bell className="w-8 h-8 text-indigo-500" /> مركز الإشعارات
            </h1>
            <p className="text-slate-400">تحديثات النظام، الأرصدة، والمراسلات في مكان واحد.</p>
          </div>
          <button className="text-sm font-bold text-slate-500 hover:text-white transition-colors">تحديد الكل كمقروء</button>
        </header>

        <div className="space-y-4">
          {notifs.map((n, i) => (
            <div key={i} className="bg-[#0A0A0F] border border-white/5 rounded-[1.5rem] p-5 flex items-start gap-4 hover:bg-[#12121A] transition-colors cursor-pointer">
              <div className={`p-3 rounded-2xl shrink-0 border ${n.bg} ${n.border}`}>
                {n.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white text-sm md:text-base">{n.title}</h3>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
