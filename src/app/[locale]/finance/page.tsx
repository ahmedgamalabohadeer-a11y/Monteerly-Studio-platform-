'use client'
import React from 'react';
import { DollarSign, TrendingUp, Lock, Activity, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';

export default function FinanceDashboard() {
  // بيانات مالية محاكية (للعرض والتحليل)
  const metrics = {
    totalEscrow: "124,500$",
    netRevenue: "18,675$", // يمثل أرباح المنصة (EBITDA Proxy)
    activeDisputesAmount: "1,650$",
    growthRate: "+12.4%"
  };

  const auditLogs = [
    { id: "AUD-847291-102", type: "تسوية نزاع", amount: "450$", entity: "أحمد جمال (مستقل)", date: "2026-06-09 14:30", status: "مكتمل" },
    { id: "AUD-847290-055", type: "إيداع Escrow", amount: "2,500$", entity: "شركة الأفق (عميل)", date: "2026-06-09 11:15", status: "محتجز" },
    { id: "AUD-847289-992", type: "سحب أرباح", amount: "1,200$", entity: "محمود حسن (مستقل)", date: "2026-06-08 09:45", status: "مكتمل" },
    { id: "AUD-847288-411", type: "استقطاع عمولة", amount: "375$", entity: "رسوم منصة (MCOS)", date: "2026-06-08 09:45", status: "مكتمل" }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8 font-sans" dir="rtl">
        {/* Header */}
        <header className="mb-10 border-b border-white/10 pb-6 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-black mb-2 flex items-center gap-3 text-emerald-500">
                    <TrendingUp size={36} /> التدقيق المالي الموحد (Audit & EBITDA)
                </h1>
                <p className="text-slate-400 text-sm">مراقبة التدفقات النقدية، الأموال المحتجزة، وسجلات التدقيق المالي غير القابلة للتعديل.</p>
            </div>
            <button className="bg-emerald-500 text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all">
                <FileText size={18} /> تصدير التقرير (PDF)
            </button>
        </header>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Lock size={64} /></div>
                <p className="text-slate-400 text-sm font-bold mb-2">إجمالي السيولة المحتجزة (Escrow)</p>
                <h2 className="text-4xl font-black text-white">{metrics.totalEscrow}</h2>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 text-sm font-bold">
                    <ArrowUpRight size={16} /> <span>أموال مؤمنة للمشاريع النشطة</span>
                </div>
            </div>

            <div className="bg-[#0A0A0F] border border-emerald-500/20 p-6 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-emerald-500 opacity-10"><DollarSign size={64} /></div>
                <p className="text-emerald-400 text-sm font-bold mb-2">صافي إيرادات المنصة (Net Revenue)</p>
                <h2 className="text-4xl font-black text-emerald-500">{metrics.netRevenue}</h2>
                <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                    <Activity size={16} /> <span>{metrics.growthRate} مقارنة بالشهر السابق</span>
                </div>
            </div>

            <div className="bg-[#0A0A0F] border border-rose-500/20 p-6 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-rose-500 opacity-10"><Activity size={64} /></div>
                <p className="text-rose-400 text-sm font-bold mb-2">أموال قيد النزاع (Disputed)</p>
                <h2 className="text-4xl font-black text-rose-500">{metrics.activeDisputesAmount}</h2>
                <div className="mt-4 flex items-center gap-2 text-rose-400 text-sm font-bold">
                    <ArrowDownRight size={16} /> <span>تتطلب تدخلاً إدارياً</span>
                </div>
            </div>
        </div>

        {/* Audit Trail Table */}
        <div className="bg-[#0A0A0F] border border-white/5 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0D0D14]">
                <h3 className="text-xl font-black flex items-center gap-2">
                    <Lock size={20} className="text-slate-400" /> سجل التدقيق المالي (Audit Trail)
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-[#12121A] text-slate-400 text-sm border-b border-white/5">
                            <th className="p-4 font-bold">معرف التدقيق (Audit ID)</th>
                            <th className="p-4 font-bold">نوع الحركة</th>
                            <th className="p-4 font-bold">المبلغ</th>
                            <th className="p-4 font-bold">الجهة المعنية</th>
                            <th className="p-4 font-bold">التاريخ والوقت</th>
                            <th className="p-4 font-bold">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {auditLogs.map((log, index) => (
                            <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="p-4 font-mono text-indigo-400 font-bold">{log.id}</td>
                                <td className="p-4 text-slate-200">{log.type}</td>
                                <td className="p-4 font-black">{log.amount}</td>
                                <td className="p-4 text-slate-400">{log.entity}</td>
                                <td className="p-4 text-slate-500 font-mono text-xs">{log.date}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${log.status === 'مكتمل' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
