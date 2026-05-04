import { supabase } from '@/lib/supabase';
import { Users, UserPlus, Activity, Briefcase, Trash2 } from 'lucide-react';
import { addEmployee } from './actions';

export default async function HRPage() {
  // جلب البيانات الحقيقية من Supabase
  const { data: employees, count: totalEmployees } = await supabase
    .from('employees')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-slate-50">إدارة الموارد البشرية | Monteerly HR</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* إحصائيات سريعة */}
        <div className="bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">إجمالي الموظفين</p>
            <h2 className="text-3xl font-bold text-blue-600">{totalEmployees || 0}</h2>
          </div>
          <Users className="text-blue-500 w-10 h-10 opacity-20" />
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">رواتب الموظفين (تقديري)</p>
            <h2 className="text-3xl font-bold text-emerald-600">
              {employees?.reduce((acc, emp) => acc + (emp.salary || 0), 0).toLocaleString()} 
            </h2>
          </div>
          <Briefcase className="text-emerald-500 w-10 h-10 opacity-20" />
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm">حالة النظام</p>
            <h2 className="text-3xl font-bold text-orange-600">نشط</h2>
          </div>
          <Activity className="text-orange-500 w-10 h-10 opacity-20" />
        </div>

        {/* نموذج الإضافة */}
        <div className="md:col-span-1 bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="text-blue-600 w-5 h-5" />
            <h3 className="font-semibold">إضافة كادر جديد</h3>
          </div>
          <form action={addEmployee} className="space-y-4">
            <input name="full_name" required type="text" placeholder="الاسم الكامل" className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <input name="position" required type="text" placeholder="المسمى الوظيفي" className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <input name="salary" required type="number" placeholder="الراتب" className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all active:scale-95">
              اعتماد وإضافة
            </button>
          </form>
        </div>

        {/* قائمة الموظفين الحقيقية */}
        <div className="md:col-span-2 bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold mb-4 text-slate-50">سجل الموظفين الحالي</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b text-slate-400">
                  <th className="pb-2 font-medium">الاسم</th>
                  <th className="pb-2 font-medium">المنصب</th>
                  <th className="pb-2 font-medium">الراتب</th>
                  <th className="pb-2 font-medium">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {employees && employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-medium text-slate-50">{emp.full_name}</td>
                      <td className="py-3 text-slate-600">{emp.position}</td>
                      <td className="py-3 text-slate-600">{emp.salary}</td>
                      <td className="py-3"><Trash2 className="w-4 h-4 text-red-300 cursor-pointer hover:text-red-500" /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400 italic">لا توجد بيانات حالياً.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
