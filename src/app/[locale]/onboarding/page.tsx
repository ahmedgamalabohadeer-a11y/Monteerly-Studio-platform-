'use client'
import React, { useState } from 'react';
import { ShieldCheck, User, Building, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function OnboardingGateway() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    taxId: '',
    country: 'Egypt',
    experienceYears: '0'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        ...formData,
        status: 'pending_verification'
      });
      router.push('/ar/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="w-full max-w-2xl bg-[#0A0A0F] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="mb-8 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-white">التهيئة السيادية (KYC)</h1>
            <p className="text-slate-400 mt-2">استكمل بياناتك لتوثيق هويتك المهنية وتفعيل خدمات الـ Escrow.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder="الرقم الضريبي / القومي" onChange={e => setFormData({...formData, taxId: e.target.value})} className="bg-[#12121A] border border-white/10 p-4 rounded-xl text-white w-full" />
                <input required type="number" placeholder="سنوات الخبرة" onChange={e => setFormData({...formData, experienceYears: e.target.value})} className="bg-[#12121A] border border-white/10 p-4 rounded-xl text-white w-full" />
            </div>
            
            <textarea placeholder="نبذة مهنية مختصرة (Bio)" onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-[#12121A] border border-white/10 p-4 rounded-xl text-white h-32" />
            
            <button disabled={loading} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={18} /> تفعيل الهوية والبدء</>}
            </button>
        </form>
      </div>
    </div>
  );
}
