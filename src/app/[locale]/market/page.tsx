import { supabase } from '@/lib/supabase';
import { ShoppingCart, Video, Clock, DollarSign, Star } from 'lucide-react';
import { createOrder } from './actions';

export default async function MarketPage() {
  // جلب الخدمات المتاحة
  const { data: services } = await supabase
    .from('services')
    .select('*, profiles:freelancer_id(full_name)')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans" dir="rtl">
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-slate-50 mb-4">سوق المونتاج السيادي</h1>
        <p className="text-slate-500 text-lg">اختر الباقة المناسبة لمشروعك. أموالك في أمان تام (Escrow) حتى تستلم الفيديو النهائي وتوافق عليه.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services && services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="bg-slate-950 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-50 p-3 rounded-2xl">
                    <Video className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <DollarSign className="w-4 h-4" /> {service.price}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-50 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">{service.description}</p>
                
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 pb-6 border-b border-slate-50">
                  <span className="flex items-center gap-1"><UserIcon name={service.profiles?.full_name || 'مونتير محترف'} /></span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> تسليم في {service.delivery_days} أيام</span>
                </div>
              </div>

              <form action={async () => {
                "use server"
                await createOrder(service.id, service.freelancer_id, service.price);
              }}>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all active:scale-95 flex justify-center items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  طلب الخدمة الآن
                </button>
              </form>

            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-500">لا توجد خدمات معروضة حالياً</h3>
            <p className="text-slate-400 mt-2">كن أول مونتير يضيف باقة خدماته في المنصة!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// مكون مساعد لعرض اسم المونتير
function UserIcon({ name }: { name: string }) {
  return <><Star className="w-4 h-4 text-amber-400" /> {name}</>;
}
