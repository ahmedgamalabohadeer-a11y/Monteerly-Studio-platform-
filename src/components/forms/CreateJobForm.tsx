'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Rocket, DollarSign, FileText } from 'lucide-react';

export function CreateJobForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', budget: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // الحصول على معرف المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('يرجى تسجيل الدخول أولاً');

      // 1. إنشاء المشروع في قاعدة البيانات
      const { data, error } = await supabase.from('jobs').insert({
        title: formData.title,
        budget: parseFloat(formData.budget),
        client_id: user.id,
        status: 'open',
        snapshot: { description: formData.description }
      }).select().single();

      if (error) throw error;

      // 2. محاكاة التوجه لبوابة الدفع (Paymob)
      alert('✅ تم إنشاء المشروع بنجاح! سيتم توجيهك الآن لتأمين الدفعة في الضمان (Escrow).');
      window.location.href = `/studio/${data.id}`;
      
    } catch (err: unknown) {
      alert(`❌ خطأ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
      <div>
        <label className="block text-slate-400 text-sm mb-2 mr-2">عنوان المشروع</label>
        <div className="relative">
          <FileText className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            required
            className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white outline-none focus:border-indigo-500 transition-all"
            placeholder="مثال: مونتاج فيديو يوتيوب سينمائي"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-400 text-sm mb-2 mr-2">الميزانية المقدرة ($)</label>
          <div className="relative">
            <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
            <input 
              required
              type="number"
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white outline-none focus:border-indigo-500 transition-all"
              placeholder="500"
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            />
          </div>
        </div>
      </div>

      <button 
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-500/20"
      >
        {loading ? <div className="animate-spin w-6 h-6 border-4 border-white/20 border-t-white rounded-full" /> : (
          <>
            <Rocket className="w-6 h-6" />
            تأسيس المشروع وتفعيل الضمان
          </>
        )}
      </button>
    </form>
  );
}
