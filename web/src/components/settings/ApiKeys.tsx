'use client';
import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ApiKeys() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h3 className="font-bold text-lg">مفاتيح API</h3>
             <p className="text-sm text-muted-foreground">استخدم هذه المفاتيح للربط مع أدوات خارجية (مثل Zapier).</p>
          </div>
          <Button variant="outline" icon={<Plus size={16} />}>إنشاء مفتاح جديد</Button>
       </div>

       <div className="border border-border rounded-xl overflow-hidden">
          <div className="p-4 bg-muted/20 border-b border-border flex items-center justify-between">
             <div>
                <p className="font-bold text-sm">Production Key</p>
                <p className="text-xs text-muted-foreground">تم الإنشاء: 12 Jan 2026</p>
             </div>
             <div className="flex items-center gap-2">
                <div className="bg-background border border-input rounded-lg px-3 py-1.5 font-mono text-xs flex items-center gap-2 w-64">
                   <Key size={12} className="text-muted-foreground" />
                   <span className="flex-1 truncate">
                      {showKey ? 'sk_live_51Mz...Xy9z' : 'sk_live_••••••••••••••••'}
                   </span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setShowKey(!showKey)}>
                   {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText('sk_live_...')}>
                   <Copy size={14} />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">
                   <Trash size={14} />
                </Button>
             </div>
          </div>
          
          <div className="p-4 bg-yellow-50 text-yellow-800 text-xs flex items-center gap-2">
             <Key size={14} />
             <span>تحذير: لا تشارك مفاتيحك السرية مع أي شخص. إذا تم اختراق المفتاح، قم بحذفه فوراً.</span>
          </div>
       </div>
    </div>
  );
}

