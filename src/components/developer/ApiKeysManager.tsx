'use client';
import React, { useState } from 'react';
import { Key, Copy, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ApiKeysManager() {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Zapier Integration', prefix: 'pk_live_...', created: '2025-12-01' },
    { id: '2', name: 'Internal Dashboard', prefix: 'sk_test_...', created: '2026-01-10' },
  ]);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <div>
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key size={18} className="text-orange-500" /> مفاتيح API
             </h3>
             <p className="text-slate-400 text-xs">استخدم هذه المفاتيح للربط مع تطبيقات خارجية.</p>
          </div>
          <Button size="sm" className="bg-white text-black hover:bg-slate-200">
             <Plus size={14} className="mr-1" /> مفتاح جديد
          </Button>
       </div>

       <div className="space-y-3">
          {keys.map((key) => (
             <div key={key.id} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-lg group hover:border-white/10 transition-colors">
                <div>
                   <div className="font-bold text-white text-sm">{key.name}</div>
                   <div className="font-mono text-xs text-slate-500 mt-1">Created: {key.created}</div>
                </div>
                <div className="flex items-center gap-3">
                   <code className="bg-black px-2 py-1 rounded text-xs text-slate-300 font-mono border border-white/5">
                      {key.prefix}****************
                   </code>
                   <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors" title="Copy">
                      <Copy size={14} />
                   </button>
                   <button className="p-1.5 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-500 transition-colors" title="Revoke">
                      <Trash2 size={14} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################