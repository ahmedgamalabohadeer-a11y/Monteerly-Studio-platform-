'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Film, Clock, ExternalLink, Activity } from 'lucide-react';

export default function ProductionPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      // جلب البيانات مع الـ Join
      const { data, error } = await supabase
        .from('production_projects')
        .select(`
          id, 
          project_name, 
          production_status, 
          contract_id,
          legal_contracts ( client_name )
        `)
        .order('last_update', { ascending: false });

      if (error) {
        console.error("Supabase Error:", error);
      } else if (data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();

    // إعداد Realtime Listener لتحديث الصفحة تلقائياً عند أي إضافة جديدة
    const channel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'production_projects' }, () => {
        fetchProjects(); // إعادة جلب البيانات عند أي تغيير
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white animate-in fade-in duration-500" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold font-cairo flex items-center gap-4">
              <Film className="text-brand-primary w-10 h-10" /> 
              مدير الإنتاج السيادي
            </h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <Activity size={16} className="text-green-500" />
              تتبع المشاريع نشط ويتم التحديث لحظياً (Real-time)
            </p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-bold text-white">{projects.length}</div>
             <div className="text-xs text-slate-500 uppercase tracking-widest">Active Projects</div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
             <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="font-cairo">جاري استدعاء المشاريع من الخزنة...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group bg-slate-900 border border-slate-800 hover:border-brand-primary/50 transition-all p-6 rounded-2xl flex justify-between items-center shadow-lg hover:shadow-brand-primary/10">
                <div className="flex gap-6 items-center">
                   <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Film size={24} className="text-slate-600 group-hover:text-brand-primary" />
                   </div>
                   <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{project.project_name}</h3>
                    {/* عرض اسم العميل إذا نجح الـ Join، أو عرض كود العقد إذا فشل */}
                    <p className="text-slate-400 text-sm">
                      العميل: <span className="text-white font-semibold">{project.legal_contracts?.client_name || 'غير متوفر'}</span>
                      <span className="mx-2 text-slate-700">|</span> 
                      كود الربط: {project.contract_id?.substring(0,8)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${
                    project.production_status === 'pending' 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    <Clock size={14} />
                    {project.production_status === 'pending' ? 'قيد الانتظار' : 'جاري العمل'}
                  </span>
                  <button className="text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors">
                     فتح مساحة العمل <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <Film size={48} className="mx-auto text-slate-700 mb-6 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2 font-cairo">لا توجد مشاريع إنتاج نشطة حالياً</h3>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              المشاريع تظهر هنا تلقائياً بمجرد توقيع واعتماد عقود الإنتاج عبر المنظومة القانونية.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
