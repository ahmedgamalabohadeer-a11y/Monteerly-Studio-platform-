'use client';
import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Lock, Fingerprint, Network } from 'lucide-react';

export function SecurityPolicies() {
  const [policies, setPolicies] = useState({
    mfa: true,
    sso: false,
    ip_lock: true
  });

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 h-full">
       <h3 className="font-bold text-white mb-6">سياسات المؤسسة</h3>
       
       <div className="space-y-6">
          <div className="flex items-start justify-between">
             <div className="flex gap-3">
                <div className="mt-1 text-indigo-400"><Fingerprint size={20} /></div>
                <div>
                   <h4 className="font-bold text-white text-sm">المصادقة الثنائية (2FA)</h4>
                   <p className="text-xs text-slate-400 max-w-[200px]">إجبار جميع أعضاء الفريق على تفعيل 2FA قبل الدخول.</p>
                </div>
             </div>
             <button onClick={() => setPolicies(p => ({...p, mfa: !p.mfa}))} className="text-indigo-500">
                {policies.mfa ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-600" />}
             </button>
          </div>

          <div className="flex items-start justify-between">
             <div className="flex gap-3">
                <div className="mt-1 text-purple-400"><Lock size={20} /></div>
                <div>
                   <h4 className="font-bold text-white text-sm">الدخول الموحد (SSO)</h4>
                   <p className="text-xs text-slate-400 max-w-[200px]">السماح بالدخول فقط عبر بريد الشركة (Google Workspace / Azure AD).</p>
                </div>
             </div>
             <button onClick={() => setPolicies(p => ({...p, sso: !p.sso}))} className="text-purple-500">
                {policies.sso ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-600" />}
             </button>
          </div>

          <div className="flex items-start justify-between">
             <div className="flex gap-3">
                <div className="mt-1 text-green-400"><Network size={20} /></div>
                <div>
                   <h4 className="font-bold text-white text-sm">تقييد النطاق (IP Whitelist)</h4>
                   <p className="text-xs text-slate-400 max-w-[200px]">منع الدخول من خارج شبكة المكتب.</p>
                   {policies.ip_lock && (
                      <div className="mt-2">
                         <input type="text" placeholder="Add IP Address..." className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white" />
                      </div>
                   )}
                </div>
             </div>
             <button onClick={() => setPolicies(p => ({...p, ip_lock: !p.ip_lock}))} className="text-green-500">
                {policies.ip_lock ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-600" />}
             </button>
          </div>
       </div>
    </div>
  );
}

