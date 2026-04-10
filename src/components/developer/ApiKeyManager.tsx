'use client';
import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function ApiKeyManager() {
  const { addToast } = useToast();
  const [showKey, setShowKey] = useState(false);
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production Key', prefix: 'sk_live_51M...', created: 'Jan 10, 2026', lastUsed: 'Just now' }
  ]);

  const copyKey = () => {
    navigator.clipboard.writeText('sk_live_51Mxq9...');
    addToast('success', 'تم نسخ مفتاح API للحافظة.');
  };

  return (
    <div className="space-y-6">
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h3 className="font-bold text-white flex items-center gap-2">
                   <Key size={18} className="text-yellow-400" /> مفاتيح API
                </h3>
                <p className="text-sm text-slate-400 mt-1">استخدم هذه المفاتيح للوصول إلى Monteerly API برمجياً.</p>
             </div>
             <Button size="sm" className="bg-white text-black hover:bg-slate-200 text-xs font-bold gap-2">
                <Plus size={14}/> مفتاح جديد
             </Button>
          </div>

          <div className="space-y-3">
             {keys.map(key => (
                <div key={key.id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                   <div>
                      <div className="font-bold text-white text-sm mb-1">{key.name}</div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                         <span>{key.prefix}</span>
                         <span className="text-slate-600">•</span>
                         <span>Created: {key.created}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Roll Key"><RefreshCw size={14}/></button>
                      <button className="p-2 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-400" title="Revoke"><Trash2 size={14}/></button>
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6">
          <h4 className="font-bold text-white text-sm mb-2">كيف أبدأ؟</h4>
          <p className="text-xs text-indigo-200 mb-4">اقرأ الوثائق الكاملة لتعلم كيفية دمج Monteerly في تطبيقك.</p>
          <div className="bg-black p-3 rounded-lg border border-white/10 font-mono text-xs text-green-400 flex justify-between items-center">
             <span>curl https://api.monteerly.com/v1/projects -u sk_live_...:</span>
             <Copy size={12} className="cursor-pointer hover:text-white" />
          </div>
          <div className="mt-4">
             <a href="#" className="text-xs text-white font-bold underline hover:text-indigo-400">View Documentation &rarr;</a>
          </div>
       </div>
    </div>
  );
}
