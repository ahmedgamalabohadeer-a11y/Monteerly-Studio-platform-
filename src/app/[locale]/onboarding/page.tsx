'use client'
import React, { useState } from 'react';
import { ShieldCheck, User, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function OnboardingGateway() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tax_id: '',
    experience_years: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // التحديث المباشر للجدول الذي تم التحقق منه في الصور
      const { error } = await supabase.from('profiles').update({
        tax_id: formData.tax_id,
        experience_years: parseInt(formData.experience_years),
        bio: formData.bio,
        status: 'verified' // تفعيل الحالة بعد التوثيق
      }).eq('id', user.id);

      if (!error) router.push('/ar/dashboard');
      else alert('خطأ في حفظ البيانات: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="w-full max-w-2xl bg-[#0A0A0F] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="mb-8 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-white">التهيئة السيادية (KYC)</h1>
            <p className="text-slate-400 mt-2">استكمل بياناتك لتوثيق هويتك وتفعيل خدمات الـ Escrow.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder="الرقم الضريبي" onChange={e => setFormData({...formData, tax_id: e.target.value})} className="bg-[#12121A] border border-white/10 p-4 rounded-xl text-white w-full" />
                <input required type="number" placeholder="سنوات الخبرة" onChange={e => setFormData({...formData, experience_years: e.target.value})} className="bg-[#12121A] border border-white/10 p-4 rounded-xl text-white w-full" />
            </div>
            
            <textarea placeholder="نبذة مهنية (Bio)" onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-[#12121A] border border-white/10 p-4 rounded-xl text-white h-32" />
            
            <button disabled={loading} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={18} /> توثيق الهوية والبدء</>}
            </button>
        </form>
      </div>
    </div>
  );
}
