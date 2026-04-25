'use client';
import React from 'react';
import { ShieldCheck, Share2, Download, ExternalLink, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CertificateBadge() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8">
       {/* Certificate Card */}
       <div className="w-full max-w-4xl bg-white text-black rounded-lg shadow-2xl overflow-hidden relative border-8 border-double border-slate-200">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="p-12 text-center relative z-10">
             <div className="w-24 h-24 mx-auto mb-8">
                {/* Logo Placeholder */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-900 fill-current">
                   <circle cx="50" cy="50" r="45" opacity="0.1" />
                   <path d="M50 20 L80 80 L20 80 Z" />
                </svg>
             </div>

             <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-widest">Certificate of Mastery</h1>
             <p className="text-xl text-slate-600 mb-8 font-serif italic">This certifies that</p>
             
             <h2 className="text-4xl font-black text-indigo-900 mb-8 underline decoration-wavy decoration-indigo-200">
                MOHAMED KAMAL
             </h2>

             <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed mb-12">
                Has successfully completed the advanced curriculum and passed the rigorous examination for the 
                <span className="font-bold"> Monteerly Certified Colorist (MCC)</span> credential.
             </p>

             <div className="flex justify-between items-end mt-12 px-12">
                <div className="text-center">
                   <div className="w-40 border-b-2 border-black mb-2"></div>
                   <div className="text-xs font-bold uppercase tracking-wider">Chief Instructor</div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                   <QrCode size={64} className="text-slate-800" />
                   <span className="text-[10px] font-mono text-slate-500">ID: 8821-XA-992</span>
                </div>

                <div className="text-center">
                   <div className="w-40 border-b-2 border-black mb-2"></div>
                   <div className="text-xs font-bold uppercase tracking-wider">Date: Jan 17, 2026</div>
                </div>
             </div>
          </div>

          {/* Gold Seal */}
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-600 text-yellow-900 font-bold text-xs text-center p-4 rotate-12 opacity-90">
             OFFICIAL SEAL
          </div>
       </div>

       {/* Actions */}
       <div className="mt-8 flex gap-4">
          <Button className="bg-indigo-600 text-white gap-2 font-bold hover:bg-indigo-700">
             <Share2 size={18} /> مشاركة على LinkedIn
          </Button>
          <Button variant="outline" className="border-white/20 text-white gap-2 hover:bg-white/10">
             <Download size={18} /> تحميل PDF عالي الدقة
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-bold">
             <ShieldCheck size={16} /> Verified on Blockchain
          </div>
       </div>
    </div>
  );
}

################################################################################