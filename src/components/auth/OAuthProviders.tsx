'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function OAuthProviders() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuth = async (provider: 'google' | 'github' | 'facebook') => {
    setLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/admin/dashboard` }
      });
      if (error) throw error;
    } catch (err: any) {
      alert(`❌ فشل الاتصال: ${err.message}`);
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="mx-4 text-slate-500 text-xs font-bold">أو الدخول عبر</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <button onClick={() => handleOAuth('google')} disabled={!!loading} className="w-full bg-white text-slate-900 font-bold py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors">
        {loading === 'google' ? 'جاري الاتصال...' : 'المتابعة باستخدام Google'}
      </button>

      <button onClick={() => handleOAuth('github')} disabled={!!loading} className="w-full bg-[#24292F] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#1b1f23] transition-colors border border-white/10">
        {loading === 'github' ? 'جاري الاتصال...' : 'المتابعة باستخدام GitHub'}
      </button>

      <button onClick={() => handleOAuth('facebook')} disabled={!!loading} className="w-full bg-[#1877F2] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#166fe5] transition-colors">
        {loading === 'facebook' ? 'جاري الاتصال...' : 'المتابعة باستخدام Facebook'}
      </button>
    </div>
  );
}
