import { supabase } from '@/lib/supabase';
import { Briefcase, CheckCircle, AlertTriangle, UploadCloud, PlayCircle } from 'lucide-react';
import { submitWork, approveWork, raiseDispute } from './actions';

export default async function WorkspacePage() {
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) return <div className="p-8 text-center">يرجى تسجيل الدخول</div>;
  
  const userId = authData.user.id;

  // جلب المشاريع (سواء كان المستخدم عميلاً أو مونتيراً) بناءً على حسابات الضمان
  const { data: projects } = await supabase.from('escrow_accounts')
    .select('*, orders(*), client:client_id(full_name), freelancer:freelancer_id(full_name)')
    .or(`client_id.eq.${userId},freelancer_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans" dir="rtl">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">مساحة العمل (الاستوديو السحابي)</h1>
        <p className="text-slate-500 mt-1">إدارة مشاريع المونتاج، تسليم الفيديوهات، واعتماد الأموال</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {projects?.map((project) => {
          const isClient = project.client_id === userId;
          const order = project.orders?.[0] || {};
          const statusColors = {
            'in_progress': 'bg-blue-100 text-blue-700 border-blue-200',
            'review_pending': 'bg-purple-100 text-purple-700 border-purple-200',
            'completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'disputed': 'bg-red-100 text-red-700 border-red-200',
          };

          return (
            <div key={project.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    <span className="font-bold text-slate-800">مشروع #{order.id?.substring(0, 8)}</span>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[order.status as keyof typeof statusColors] || 'bg-slate-100'}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-2xl text-sm border border-slate-100">
                  <p className="text-slate-600 mb-1"><strong>الطرف الآخر:</strong> {isClient ? project.freelancer?.full_name : project.client?.full_name}</p>
                  <p className="text-slate-600"><strong>مبلغ الضمان:</strong> <span className="text-emerald-600 font-bold">${project.amount}</span></p>
                </div>
              </div>

              {/* منطقة الإجراءات بناءً على دور المستخدم وحالة المشروع */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                
                {/* 1. للمونتير: تسليم العمل */}
                {!isClient && order.status === 'in_progress' && (
                  <form action={async (fd) => { "use server"; await submitWork(order.id, project.client_id, fd.get('url') as string, fd.get('notes') as string); }} className="space-y-3">
                    <input name="url" type="url" required placeholder="رابط الفيديو (Cloudflare R2 / Drive)" className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input name="notes" type="text" placeholder="ملاحظات التسليم..." className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none" />
                    <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-black transition-all">
                      <UploadCloud className="w-4 h-4" /> تسليم مسودة الفيديو
                    </button>
                  </form>
                )}

                {/* 2. للعميل: مراجعة واعتماد العمل */}
                {isClient && order.status === 'review_pending' && (
                  <div className="space-y-3">
                    <a href={order.delivery_url} target="_blank" className="w-full bg-indigo-50 text-indigo-700 font-bold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-indigo-100 transition-all border border-indigo-200">
                      <PlayCircle className="w-4 h-4" /> مشاهدة الفيديو المسلم
                    </a>
                    
                    <div className="flex gap-2">
                      <form action={async () => { "use server"; await approveWork(project.id, order.id, project.freelancer_id); }} className="flex-1">
                        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg flex justify-center items-center gap-1 hover:bg-emerald-700 transition-all">
                          <CheckCircle className="w-4 h-4" /> اعتماد وصرف
                        </button>
                      </form>
                      
                      <form action={async () => { "use server"; await raiseDispute(project.id, order.id, project.freelancer_id, "رفض العميل للمسودة"); }} className="flex-1">
                        <button type="submit" className="w-full bg-red-50 text-red-600 font-bold py-2 rounded-lg flex justify-center items-center gap-1 hover:bg-red-100 transition-all border border-red-200">
                          <AlertTriangle className="w-4 h-4" /> رفض (نزاع)
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* رسائل الحالات المغلقة */}
                {order.status === 'completed' && <p className="text-center text-sm font-bold text-emerald-600 flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4"/> اكتمل المشروع وتم تحويل الأموال</p>}
                {order.status === 'disputed' && <p className="text-center text-sm font-bold text-red-600 flex items-center justify-center gap-1"><AlertTriangle className="w-4 h-4"/> مجمد إدارياً (تم رفع الأمر للإدارة)</p>}
                
              </div>
            </div>
          );
        })}
        {(!projects || projects.length === 0) && (
          <div className="col-span-full text-center py-20">
            <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-500">لا توجد مشاريع نشطة</h3>
            <p className="text-slate-400 mt-2">مساحة العمل الخاصة بك فارغة حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
