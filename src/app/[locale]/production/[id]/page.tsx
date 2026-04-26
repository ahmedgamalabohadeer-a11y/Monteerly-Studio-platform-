'use client';
import React, { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Film, ArrowRight, CheckCircle, Clock, PlayCircle, UploadCloud, File, Trash2, Download } from 'lucide-react';
import Link from 'next/link';

export default function ProductionWorkspace({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  const locale = unwrappedParams.locale || 'ar';

  const [project, setProject] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // 1. جلب بيانات المشروع والملفات
  const fetchData = async () => {
    // جلب بيانات المشروع
    const { data: projData } = await supabase
      .from('production_projects')
      .select('*, legal_contracts(client_name, delivery_date)')
      .eq('id', projectId)
      .single();

    if (projData) {
      setProject(projData);
      setStatus(projData.production_status);
    }

    // جلب قائمة الملفات من Storage
    const { data: fileList, error } = await supabase
      .storage
      .from('production-files')
      .list(projectId); // البحث داخل مجلد يحمل معرف المشروع

    if (!error && fileList) {
      setFiles(fileList);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  // 2. تحديث حالة الإنتاج
  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus);
    await supabase
      .from('production_projects')
      .update({ production_status: newStatus, last_update: new Date().toISOString() })
      .eq('id', projectId);
  };

  // 3. محرك رفع الملفات
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const filePath = `${projectId}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from('production-files')
      .upload(filePath, file);

    if (error) {
      alert("خطأ في الرفع: " + error.message);
    } else {
      await fetchData(); // تحديث القائمة بعد الرفع
    }
    setUploading(false);
  };

  // 4. حذف ملف
  const deleteFile = async (fileName: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الملف؟")) return;
    await supabase.storage.from('production-files').remove([`${projectId}/${fileName}`]);
    await fetchData();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-cairo">جاري فتح مساحة العمل...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-cairo">المشروع غير موجود.</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white animate-in fade-in duration-500" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <Link href={`/${locale}/production`} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 text-sm transition-colors">
              <ArrowRight size={16} /> العودة للمدير الفني
            </Link>
            <h1 className="text-3xl font-bold font-cairo flex items-center gap-3 italic">
              <Film className="text-brand-primary" /> {project.project_name}
            </h1>
          </div>
          <div className="text-left">
             <div className="text-xs text-slate-500 font-mono">CLIENT: {project.legal_contracts?.client_name}</div>
             <div className="text-xs text-amber-500 font-mono">DUE: {project.legal_contracts?.delivery_date}</div>
          </div>
        </header>

        {/* التحكم في الحالة */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'pending', label: 'إنتظار', icon: Clock, color: 'text-amber-500' },
              { id: 'in_progress', label: 'مونتاج', icon: PlayCircle, color: 'text-blue-500' },
              { id: 'review', label: 'مراجعة', icon: UploadCloud, color: 'text-purple-500' },
              { id: 'completed', label: 'تم التسليم', icon: CheckCircle, color: 'text-emerald-500' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => updateStatus(s.id)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${status === s.id ? `bg-slate-950 border-brand-primary ${s.color} scale-105` : 'border-transparent text-slate-600 hover:bg-slate-800'}`}
              >
                <s.icon size={24} />
                <span className="font-bold text-xs font-cairo">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* قسم رفع وإدارة الملفات */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* منطقة الرفع */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl sticky top-8">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-300">
                <UploadCloud size={18} /> مركز الرفع
              </h3>
              <label className={`group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-800 rounded-2xl cursor-pointer hover:border-brand-primary transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploading ? (
                    <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-slate-600 group-hover:text-brand-primary mb-3" />
                      <p className="text-xs text-slate-500 font-cairo">اسحب الملف أو اضغط هنا</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          </div>

          {/* قائمة الملفات المرفوعة */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-white/5 bg-slate-950/50 flex justify-between items-center">
                <h3 className="font-bold font-cairo text-slate-300">ملفات المشروع ({files.length})</h3>
              </div>
              <div className="divide-y divide-white/5">
                {files.length > 0 ? files.map(f => (
                  <div key={f.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-950 rounded-lg text-brand-primary"><File size={20} /></div>
                      <div>
                        <div className="text-sm font-bold text-slate-200 truncate max-w-[200px] md:max-w-xs">{f.name.split('_').slice(1).join('_')}</div>
                        <div className="text-[10px] text-slate-500">{(f.metadata.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => deleteFile(f.name)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                )) : (
                  <div className="p-20 text-center text-slate-600 font-cairo italic">لا توجد ملفات مرفوعة حالياً.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
