import { supabase } from '@/lib/supabase';
import { 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  DollarSign, 
  BarChart3,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default async function ExecutiveDashboard() {
  // 1. جلب بيانات الموارد البشرية
  const { data: employees } = await supabase.from('employees').select('salary');
  const totalEmployees = employees?.length || 0;
  const totalSalaries = employees?.reduce((acc, emp) => acc + (emp.salary || 0), 0) || 0;

  // 2. جلب بيانات المالية والتنبيهات الأمنية
  const { data: transactions } = await supabase.from('finance_transactions').select('*');
  
  const income = transactions?.filter(t => t.transaction_type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0;
  const expenses = transactions?.filter(t => t.transaction_type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0;
  const highRiskAlerts = transactions?.filter(t => t.risk_level === 'high').length || 0;

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans" dir="rtl">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">غرفة العمليات التنفيذية</h1>
          <p className="text-slate-500 mt-1">الرؤية الشاملة لمنصة Monteerly Studio</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-600">النظام نشط وحي</span>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Card 1: ملخص السيولة */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <DollarSign className="text-blue-600 w-6 h-6" />
            </div>
            <Link href="/finance" className="text-slate-400 hover:text-blue-600 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
          <div>
            <p className="text-slate-500 font-medium">صافي التدفق النقدي</p>
            <h2 className="text-5xl font-black text-slate-900 mt-2">
              ${(income - expenses).toLocaleString()}
            </h2>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
              <TrendingUp className="w-3 h-3" /> +12%
            </div>
            <span className="text-slate-400 text-xs self-center">مقارنة بالشهر الماضي</span>
          </div>
        </div>

        {/* Card 2: تنبيهات Guardian AI */}
        <div className={`p-8 rounded-[2.5rem] shadow-sm border flex flex-col justify-between transition-all ${
          highRiskAlerts > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-slate-100'
        }`}>
          <div className="bg-red-100 p-3 rounded-2xl w-fit">
            <ShieldAlert className="text-red-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-slate-900 font-bold text-xl">تنبيهات الحارس</h3>
            <p className="text-4xl font-black text-red-600 mt-1">{highRiskAlerts}</p>
          </div>
          <p className="text-xs text-slate-500">عمليات مشبوهة تتطلب تدقيقاً</p>
        </div>

        {/* Card 3: إحصاء الكوادر */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-lg text-white flex flex-col justify-between">
          <div className="bg-slate-800 p-3 rounded-2xl w-fit">
            <Users className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-slate-300 font-medium">إجمالي الموظفين</h3>
            <p className="text-5xl font-black mt-1">{totalEmployees}</p>
          </div>
          <div className="text-xs text-slate-400 flex justify-between items-center">
            <span>إجمالي الرواتب:</span>
            <span className="font-bold text-white">${totalSalaries.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 4: تحليل المصاريف (Wide Box) */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" /> توزيع النفقات
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">رواتب ومستحقات</span>
              <span className="font-bold text-slate-900">${totalSalaries.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-1000" 
                style={{ width: `${(totalSalaries / (expenses || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 5: قائمة العمليات الأخيرة (Extended Box) */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">آخر التحركات المالية</h3>
            <Link href="/finance" className="text-blue-600 text-sm font-bold flex items-center gap-1">
              عرض الكل <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {transactions?.slice(0, 3).map((t) => (
              <div key={t.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${t.transaction_type === 'income' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-slate-700">{t.category}</span>
                </div>
                <span className={`text-sm font-bold ${t.transaction_type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {t.transaction_type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
