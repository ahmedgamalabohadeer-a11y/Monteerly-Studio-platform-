'use client';
import React from 'react';
import { Copy, Eye, Plus, History } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function VirtualCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* Card Preview */}
       <div className="relative w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-black p-6 flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <span className="text-white font-bold tracking-widest text-lg">Monteerly</span>
                <span className="text-white/80 font-mono text-sm">Debit</span>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-yellow-400/20 rounded flex items-center justify-center">
                   <div className="w-8 h-5 bg-yellow-400 rounded-sm opacity-80" />
                </div>
                <div className="flex-1"></div>
                <div className="text-white text-2xl tracking-widest font-mono">
                   •••• 4291
                </div>
             </div>

             <div className="flex justify-between items-end text-white">
                <div>
                   <div className="text-[8px] opacity-70 uppercase mb-1">Card Holder</div>
                   <div className="font-bold tracking-wide">MOHAMED KAMAL</div>
                </div>
                <div>
                   <div className="text-[8px] opacity-70 uppercase mb-1">Expires</div>
                   <div className="font-bold tracking-wide">09/28</div>
                </div>
                <div className="text-2xl font-bold italic">VISA</div>
             </div>
          </div>
       </div>

       {/* Controls */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-white">بطاقة المشتريات (Assets Card)</h3>
             <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">Active</span>
          </div>

          <div className="space-y-4 mb-6">
             <div className="flex justify-between text-sm text-slate-400">
                <span>الرصيد المتاح</span>
                <span className="text-white font-bold">$450.00</span>
             </div>
             <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[45%]" />
             </div>
             <div className="text-xs text-right text-slate-500">من أصل $1,000.00 شهرياً</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" className="border-white/10 text-white gap-2 text-xs"><Eye size={14}/> إظهار الأرقام</Button>
             <Button variant="outline" className="border-white/10 text-white gap-2 text-xs"><Copy size={14}/> نسخ الرقم</Button>
             <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10 gap-2 text-xs">تجميد البطاقة</Button>
             <Button variant="outline" className="border-white/10 text-white gap-2 text-xs"><History size={14}/> السجل</Button>
          </div>
       </div>
    </div>
  );
}

################################################################################