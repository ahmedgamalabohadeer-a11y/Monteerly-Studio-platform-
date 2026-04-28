import { supabase } from '@/lib/supabase';
import { FileText, FilePlus, History, Clock, CheckCircle } from 'lucide-react';
import { addContract } from './actions';

export default async function ContractsPage() {
  const { data: contracts } = await supabase
    .from('contracts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans" dir="rtl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">إدارة العقود | Legal OS</h1>
        <p className="text-slate-500">توثيق وحوكمة الاتفاقيات القانونية</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* إحصائيات سريعة */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs">إجمالي العقود</p>
            <h2 className="text-2xl font-bold">{contracts?.length || 0}</h2>
          </div>
          <FileText className="text-blue-500 opacity-20 w-8 h-8" />
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs">تحت المراجعة</p>
            <h2 className="text-2xl font-bold text-orange-500">
              {contracts?.filter(c => c.status === 'under_review').length || 0}
            </h2>
          </div>
          <Clock className="text-orange-500 opacity-20 w-8 h-8" />
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs">عقود منتهية</p>
            <h2 className="text-2xl font-bold text-red-500">0</h2>
          </div>
          <History className="text-red-500 opacity-20 w-8 h-8" />
        </div>

        {/* إضافة عقد جديد */}
        <div className="md:col-span-1 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <FilePlus className="text-blue-600 w-5 h-5" />
            <h3 className="font-bold">تسجيل عقد جديد</h3>
          </div>
          <form action={addContract} className="space-y-4">
            <input name="title" required placeholder="عنوان العقد" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <select name="contract_type" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none">
              <option value="employment">عقد توظيف</option>
              <option value="partnership">عقد شراكة</option>
              <option value="supply">عقد توريد</option>
            </select>
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-black transition-all">
              حفظ العقد
            </button>
          </form>
        </div>

        {/* قائمة العقود */}
        <div className="md:col-span-3 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="font-bold mb-6 flex items-center gap-2">
             سجل العقود السيادي
          </h3>
          <div className="space-y-4">
            {contracts?.map((contract) => (
              <div key={contract.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{contract.title}</h4>
                    <span className="text-xs text-slate-400">{contract.contract_type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    contract.status === 'signed' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {contract.status}
                  </span>
                  <span className="text-xs text-slate-400">V{contract.current_version}</span>
                </div>
              </div>
            ))}
            {(!contracts || contracts.length === 0) && (
              <p className="text-center py-10 text-slate-400 italic text-sm">لا يوجد سجل عقود حالياً.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
