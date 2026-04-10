'use client';
import React from 'react';
import { Award, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CertificateCard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/30 rounded-xl p-1 relative overflow-hidden group">
       <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/20 blur-2xl rounded-full" />
       
       <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center border border-white/5">
          <div className="w-16 h-16 mx-auto bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20">
             <Award size={32} className="text-black" />
          </div>
          
          <h3 className="text-white font-bold text-lg mb-1">خبير مونتاج معتمد</h3>
          <p className="text-slate-400 text-xs mb-4">تم الإصدار: 15 يناير 2026</p>
          <p className="text-slate-500 text-[10px] font-mono mb-6">ID: MNT-2026-X99</p>
          
          <div className="flex gap-2 justify-center">
             <Button size="sm" variant="outline" className="h-8 text-xs border-white/10 text-white hover:bg-white/10">
                <Download size={14} className="mr-1" /> PDF
             </Button>
             <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
                <Share2 size={14} className="mr-1" /> LinkedIn
             </Button>
          </div>
       </div>
    </div>
  );
}
