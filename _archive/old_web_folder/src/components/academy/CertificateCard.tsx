'use client';
import React from 'react';
import { Award, Share2, Download } from 'lucide-react';
// استخدام زر TypeUI الموحد
import { Button } from '@/components/ui/Button';

export function CertificateCard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-xl p-1 relative overflow-hidden group">
       <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/20 blur-2xl rounded-full" />
       <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center border border-white/5">
          <div className="w-16 h-16 mx-auto bg-gradient-to-b from-amber-300 to-amber-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
             <Award size={32} className="text-black" />
          </div>
          <h3 className="text-white font-bold text-lg mb-1">خبير مونتاج معتمد</h3>
          <p className="text-slate-400 text-xs mb-4">تم الإصدار: 15 يناير 2026</p>
          <p className="text-slate-500 text-[10px] font-mono mb-6">ID: MNT-2026-X99</p>
          <div className="flex gap-2 justify-center">
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors">
                <Download size={16} /> تحميل PDF
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-sm font-bold transition-colors">
                <Share2 size={16} /> LinkedIn
             </button>
          </div>
       </div>
    </div>
  );
}
