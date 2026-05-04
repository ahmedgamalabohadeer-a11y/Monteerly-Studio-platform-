import { supabase } from '@/lib/supabase';
import { FileText, FilePlus, RefreshCcw, ShieldCheck } from 'lucide-react';
import { addContract, addContractRevision } from './actions';

export default async function ContractsPage() {
  const { data: contracts } = await supabase.from('contracts').select('*').order('created_at', { ascending: false });
  const { data: revisions } = await supabase.from('contract_revisions').select('*, contracts(title)').order('created_at', { ascending: false }).limit(5);

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans" dir="rtl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-50">الترسانة القانونية | Legal OS</h1>
        <p className="text-slate-500">توثيق العقود، حماية الحقوق، وإدارة التعديلات (Versioning)</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. نموذج إضافة عقد جديد */}
        <div className="bg-slate-950 p-6 rounded-[2rem] shadow-sm border border-slate-100 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <FilePlus className="text-blue-600 w-5 h-5" />
            <h3 className="font-bold">تأسيس عقد جديد</h3>
          </div>
          <form action={addContract} className="space-y-4">
            <input name="title" required placeholder="عنوان العقد" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none" />
            <select name="contract_type" className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none">
              <option value="employment">عقد توظيف</option>
              <option value="partnership">عقد شراكة</option>
              <option value="supply">عقد توريد</option>
            </select>
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-black transition-all">
              تأسيس (V1)
            </button>
          </form>
        </div>

        {/* 2. نموذج إضافة تعديل/نسخة (Versioning) */}
        <div className="bg-slate-50 p-6 rounded-[2rem] shadow-inner border border-slate-200 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCcw className="text-orange-600 w-5 h-5" />
            <h3 className="font-bold">إصدار نسخة جديدة (Revision)</h3>
          </div>
          <form action={addContractRevision} className="space-y-4">
            <select name="contract_id" required className="w-full p-3 bg-slate-950 rounded-xl text-sm outline-none border border-slate-200">
              <option value="">-- اختر العقد المراد تعديله --</option>
              {contracts?.map(c => (
                <option key={c.id} value={c.id}>{c.title} (الحالي: V{c.current_version})</option>
              ))}
            </select>
            <input name="changes_summary" required placeholder="ملخص التعديلات القانونية" className="w-full p-3 bg-slate-950 rounded-xl text-sm outline-none border border-slate-200" />
            <button className="w-full bg-orange-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-orange-700 transition-all">
              إصدار النسخة الجديدة واعتمادها
            </button>
          </form>
        </div>

        {/* 3. الإحصائيات وسجل التعديلات السريعة */}
        <div className="bg-slate-950 p-6 rounded-[2rem] shadow-sm border border-slate-100">
           <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-50">
             <ShieldCheck className="w-5 h-5 text-emerald-600" /> آخر التعديلات السيادية
           </h3>
           <div className="space-y-3">
             {revisions?.map((rev, i) => (
               <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="flex justify-between">
                   <span className="text-xs font-bold text-slate-50">{rev.contracts?.title}</span>
                   <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">V{rev.version_number}</span>
                 </div>
                 <p className="text-xs text-slate-500 mt-1">{rev.changes_summary}</p>
               </div>
             ))}
             {(!revisions || revisions.length === 0) && <p className="text-xs text-slate-400">لا توجد نسخ تعديل مسجلة.</p>}
           </div>
        </div>

        {/* 4. السجل الكامل للعقود (Master List) */}
        <div className="md:col-span-3 bg-slate-950 p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="font-bold mb-6 text-slate-50">سجل العقود السيادي</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contracts?.map((contract) => (
              <div key={contract.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <FileText className="w-6 h-6 text-slate-400" />
                  <div>
                    <h4 className="font-bold text-slate-50">{contract.title}</h4>
                    <span className="text-xs text-slate-400">{contract.contract_type}</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-50 bg-slate-950 px-3 py-1 rounded-full inline-block mb-1">
                    نسخة V{contract.current_version}
                  </div>
                  <div className="text-[10px] text-slate-400">{new Date(contract.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
            {(!contracts || contracts.length === 0) && <p className="text-center py-5 text-slate-400 text-sm w-full">لا يوجد سجل عقود حالياً.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
