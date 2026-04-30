import { supabase } from '@/lib/supabase';
import { ShieldAlert, TrendingUp, Users, ArrowUpRight, DollarSign, Activity, Gavel, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { resolveDispute } from './dispute-actions';

export default async function ExecutiveDashboard() {
  const { data: employees } = await supabase.from('employees').select('salary');
  const totalEmployees = employees?.length || 0;
  const totalSalaries = employees?.reduce((acc, emp) => acc + (emp.salary || 0), 0) || 0;

  const { data: transactions } = await supabase.from('finance_transactions').select('*');
  const income = transactions?.filter(t => t.transaction_type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0;
  const expenses = transactions?.filter(t => t.transaction_type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0;
  const highRiskAlerts = transactions?.filter(t => t.risk_level === 'high').length || 0;

  const { count: totalContracts } = await supabase.from('contracts').select('*', { count: 'exact' });
  const { data: auditLogs } = await supabase.from('audit_logs').select('module, action, created_at').order('created_at', { ascending: false }).limit(6);

  // جلب النزاعات المالية (الضمان المعلق أو المتنازع عليه)
  const { data: disputedEscrows } = await supabase.from('escrow_accounts')
    .select('*, client:client_id(full_name), freelancer:freelancer_id(full_name)')
    .in('status', ['held', 'disputed'])
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans" dir="rtl">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">غرفة العمليات التنفيذية</h1>
          <p className="text-slate-500 mt-1">الرؤية الشاملة (HR, Finance, Legal, Audit, Disputes)</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* ملخص السيولة */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-blue-50 p-3 rounded-2xl"><DollarSign className="text-blue-600 w-6 h-6" /></div>
          </div>
          <div>
            <p className="text-slate-500 font-medium">صافي التدفق النقدي</p>
            <h2 className="text-5xl font-black text-slate-900 mt-2">${(income - expenses).toLocaleString()}</h2>
          </div>
        </div>

        {/* تنبيهات الحارس */}
        <div className={`p-8 rounded-[2.5rem] shadow-sm border flex flex-col justify-between ${highRiskAlerts > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-slate-100'}`}>
          <div className="bg-red-100 p-3 rounded-2xl w-fit"><ShieldAlert className="text-red-600 w-6 h-6" /></div>
          <div>
            <h3 className="text-slate-900 font-bold text-xl">تنبيهات الحارس</h3>
            <p className="text-4xl font-black text-red-600 mt-1">{highRiskAlerts}</p>
          </div>
        </div>

        {/* إحصاء الموظفين والعقود */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-lg text-white flex flex-col justify-between">
          <div className="bg-slate-800 p-3 rounded-2xl w-fit"><Users className="text-blue-400 w-6 h-6" /></div>
          <div>
            <h3 className="text-slate-300 font-medium">الموظفين / العقود</h3>
            <p className="text-4xl font-black mt-1">{totalEmployees} <span className="text-lg text-slate-400 font-normal">/ {totalContracts || 0} عقد</span></p>
          </div>
        </div>

        {/* ⚖️ مركز فض النزاعات (جديد) */}
        <div className="md:col-span-4 bg-amber-50 p-8 rounded-[2.5rem] shadow-sm border border-amber-200 mt-4">
          <h3 className="font-bold mb-6 text-amber-900 flex items-center gap-2">
            <Gavel className="w-6 h-6 text-amber-600" /> المحكمة الإدارية (مركز فض النزاعات والضمان)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {disputedEscrows?.map((escrow) => (
              <div key={escrow.id} className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${escrow.status === 'disputed' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {escrow.status === 'disputed' ? 'نزاع مفتوح' : 'أموال معلقة (أمانة)'}
                    </span>
                    <span className="font-black text-lg text-slate-800">${escrow.amount}</span>
                  </div>
                  <p className="text-sm text-slate-600"><strong>العميل:</strong> {escrow.client?.full_name || 'غير معروف'}</p>
                  <p className="text-sm text-slate-600"><strong>المونتير:</strong> {escrow.freelancer?.full_name || 'غير معروف'}</p>
                  <p className="text-xs text-slate-400 mt-2">رقم الطلب: {escrow.order_id}</p>
                </div>

                <form action={resolveDispute} className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  <input type="hidden" name="escrow_id" value={escrow.id} />
                  <input type="text" name="reason" required placeholder="سبب القرار الإداري..." className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                  <div className="flex gap-2">
                    <button type="submit" name="decision" value="released" className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 flex items-center justify-center gap-1 transition-all">
                      <CheckCircle className="w-4 h-4" /> لصالح المونتير (صرف)
                    </button>
                    <button type="submit" name="decision" value="refunded" className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700 flex items-center justify-center gap-1 transition-all">
                      <XCircle className="w-4 h-4" /> لصالح العميل (رد)
                    </button>
                  </div>
                </form>
              </div>
            ))}
            {(!disputedEscrows || disputedEscrows.length === 0) && (
               <div className="col-span-full text-center py-8">
                 <p className="text-amber-700 font-medium">لا توجد نزاعات أو أموال معلقة حالياً.</p>
               </div>
            )}
          </div>
        </div>

        {/* سجل التدقيق المركزي */}
        <div className="md:col-span-4 bg-slate-50 p-8 rounded-[2.5rem] shadow-inner border border-slate-200 mt-4">
          <h3 className="font-bold mb-6 text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" /> نبض المنصة (Live Audit Logs)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditLogs?.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{log.module}</span>
                  <span className="text-sm font-bold text-slate-800">{log.action.replace(/_/g, ' ')}</span>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                   {new Date(log.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {(!auditLogs || auditLogs.length === 0) && <p className="text-slate-400 text-sm">لا يوجد نشاط مسجل.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
