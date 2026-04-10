'use client';
import React from 'react';
import { X, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AppBanner() {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 to-primary text-white p-4 rounded-xl relative overflow-hidden flex items-center justify-between shadow-lg my-6">
       {/* Background Pattern */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
       
       <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
             <Smartphone size={24} />
          </div>
          <div>
             <h4 className="font-bold">حمل تطبيق Monteerly</h4>
             <p className="text-xs text-slate-300">تابع مشاريعك وتلقى الإشعارات في أي وقت.</p>
          </div>
       </div>

       <div className="flex items-center gap-2 relative z-10">
          <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">App Store</Button>
          <button onClick={() => setVisible(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
             <X size={16} />
          </button>
       </div>
    </div>
  );
}
