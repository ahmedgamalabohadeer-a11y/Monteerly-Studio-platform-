'use client';
import React, { useState } from 'react';
import { Globe, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function CustomDomain() {
  const [domain, setDomain] = useState('review.myagency.com');
  const [status, setStatus] = useState<'verified' | 'pending' | 'failed'>('pending');

  return (
    <div className="space-y-6">
       <div className="border-b border-border pb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
             <Globe className="text-blue-500" size={20} /> النطاق الخاص (Custom Domain)
          </h3>
          <p className="text-sm text-muted-foreground">استخدم نطاقك الخاص لروابط المراجعة وملفات بورتفوليو.</p>
       </div>

       <div className="grid gap-6 max-w-xl">
          <div className="flex gap-2 items-end">
             <div className="flex-1">
                <Input label="اسم النطاق" value={domain} onChange={(e: any) => setDomain(e.target.value)} placeholder="e.g. video.company.com" />
             </div>
             <Button variant="primary">حفظ</Button>
          </div>

          <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-4">
             <h4 className="font-bold text-sm">إعدادات DNS (مطلوب)</h4>
             <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="font-bold text-muted-foreground">Type</div>
                <div className="font-bold text-muted-foreground">Host</div>
                <div className="font-bold text-muted-foreground">Value</div>
                
                <div className="font-mono">CNAME</div>
                <div className="font-mono">review</div>
                <div className="font-mono select-all bg-white p-1 rounded border">cname.monteerly.com</div>
             </div>

             <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                   {status === 'verified' && <span className="text-emerald-500 flex items-center gap-1 font-bold"><CheckCircle size={16} /> تم التحقق</span>}
                   {status === 'pending' && <span className="text-yellow-600 flex items-center gap-1 font-bold"><RefreshCw size={16} className="animate-spin" /> جاري التحقق...</span>}
                   {status === 'failed' && <span className="text-red-500 flex items-center gap-1 font-bold"><AlertCircle size={16} /> فشل التحقق</span>}
                </div>
                <Button size="sm" variant="outline" onClick={() => setStatus('verified')}>التحقق الآن</Button>
             </div>
          </div>
       </div>
    </div>
  );
}
