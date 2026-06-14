import { supabase } from '@/lib/supabase';
import { FileText, FilePlus, RefreshCcw, ShieldCheck } from 'lucide-react';
import { addContract, addContractRevision } from './actions';

export default async function ContractsPage() {
  const { data: contracts } = await supabase.from('contracts').select('*').order('created_at', { ascending: false });
  const { data: revisions } = await supabase.from('contract_revisions').select('*, contracts(title)').order('created_at', { ascending: false }).limit(5);

  return (
    <div className="p-6 md:p-8 bg-[#05050A] min-h-screen font-sans text-slate-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
             <FileText className="text-indigo-500" /> الترسانة القانونية | Legal OS
          </h1>
          <p className="text-slate-400 mt-2 text-sm">توثيق العقود، حماية الحقوق، وإدارة التعديلات (Versioning) بخوارزميات سيادية.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 1. نموذج إضافة عقد جديد */}
          <div className="bg-[#0A0A0F] p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/5 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <FilePlus className="text-indigo-400 w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">تأسيس عقد جديد</h3>
            </div>
            <form action={async (formData) => { "use server"; await addContract(formData); }} className="space-y-4">
              <input name="title" required placeholder="عنوان العقد" className="w-full p-4 bg-[#12121A] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-indigo-500 transition-colors" />
              <select name="contract_type" className="w-full p-4 bg-[#12121A] border border-white/10 rounded-xl text-sm text-slate-300 outline-none focus:border-indigo-500 transition-colors appearance-none">
                <option value="employment">عقد توظيف</option>
                <option value="partnership">عقد شراكة</option>
                <option value="supply">عقد توريد</option>
              </select>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl text-sm font-black hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                تأسيس الإصدار الأول (V1)
              </button>
            </form>
          </div>

          {/* 2. نموذج إضافة تعديل/نسخة (Versioning) */}
          <div className="bg-[#0A0A0F] p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/5 h-fit">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <RefreshCcw className="text-amber-400 w-5 h-5" />
               </div>
              <h3 className="font-bold text-lg text-white">إصدار نسخة جديدة</h3>
            </div>
            <form action={async (formData) => { "use server"; await addContractRevision(formData); }} className="space-y-4">
              <select name="contract_id" required className="w-full p-4 bg-[#12121A] border border-white/10 rounded-xl text-sm text-slate-300 outline-none focus:border-amber-500 transition-colors appearance-none">
                <option value="">-- اختر العقد المراد تعديله --</option>
                {contracts?.map(c => (
                  <option key={c.id} value={c.id}>{c.title} (الحالي: V{c.current_version})</option>
                ))}
              </select>
              <input name="changes_summary" required placeholder="ملخص التعديلات القانونية" className="w-full p-4 bg-[#12121A] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-amber-500 transition-colors" />
              <button className="w-full bg-amber-600 text-white py-4 rounded-xl text-sm font-black hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                اعتماد التعديل السيادي
              </button>
            </form>
          </div>

          {/* 3. الإحصائيات وسجل التعديلات السريعة */}
          <div className="bg-[#0A0A0F] p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/5">
             <h3 className="font-bold mb-6 flex items-center gap-2 text-white">
               <ShieldCheck className="w-5 h-5 text-emerald-400" /> سجل التعديلات المعتمدة
             </h3>
             <div className="space-y-4">
               {revisions?.map((rev, i) => (
                 <div key={i} className="p-4 bg-[#12121A] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-bold text-slate-200">{rev.contracts?.title}</span>
                     <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">V{rev.version_number}</span>
                   </div>
                   <p className="text-xs text-slate-400 leading-relaxed">{rev.changes_summary}</p>
                 </div>
               ))}
               {(!revisions || revisions.length === 0) && (
                  <div className="text-center py-6 text-slate-500 text-sm border-2 border-dashed border-white/5 rounded-xl">لا توجد نسخ تعديل مسجلة حالياً.</div>
               )}
             </div>
          </div>

          {/* 4. السجل الكامل للعقود (Master List) */}
          <div className="md:col-span-3 bg-[#0A0A0F] p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/5 mt-4">
            <h3 className="font-bold mb-6 text-xl text-white">الأرشيف القانوني للعقود</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts?.map((contract) => (
                <div key={contract.id} className="flex justify-between items-start p-6 bg-[#12121A] border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all group">
                  <div className="flex gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-indigo-500/10 transition-colors">
                       <FileText className="w-6 h-6 text-slate-500 group-hover:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">{contract.title}</h4>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-md">{contract.contract_type}</span>
                    </div>
                  </div>
                  <div className="text-left flex flex-col items-end gap-2">
                    <div className="text-xs font-black text-white bg-indigo-600 px-3 py-1 rounded-full shadow-lg shadow-indigo-600/20">
                      V{contract.current_version}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">{new Date(contract.created_at).toLocaleDateString('ar-EG')}</div>
                  </div>
                </div>
              ))}
              {(!contracts || contracts.length === 0) && (
                  <div className="col-span-full text-center py-12 text-slate-500 text-sm border-2 border-dashed border-white/5 rounded-2xl">
                      الأرشيف فارغ. قم بتأسيس أول عقد لك من اللوحة العلوية.
                  </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
