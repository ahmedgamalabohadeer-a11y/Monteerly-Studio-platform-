'use client';
import React from 'react';
import { ShieldCheck, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LicenseCertificate() {
  return (
    <div className="bg-white text-slate-900 p-8 border border-slate-200 shadow-xl max-w-3xl mx-auto rounded-none relative overflow-hidden">
       {/* Decorative Border */}
       <div className="absolute top-0 left-0 w-full h-4 bg-primary" />
       
       <div className="flex justify-between items-start mb-12 mt-4">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tight">
             <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center">M</div>
             MONTEERLY
          </div>
          <div className="text-right">
             <h1 className="text-4xl font-serif text-slate-900 mb-1">CERTIFICATE</h1>
             <p className="text-sm tracking-[0.3em] uppercase text-slate-500">Of License</p>
          </div>
       </div>

       <div className="text-center space-y-6 mb-12">
          <p className="text-slate-500 italic">This document certifies that</p>
          <h2 className="text-3xl font-bold border-b border-slate-300 inline-block pb-2 px-8">Ahmed Gamal</h2>
          <p className="text-slate-500 italic">Has been granted a non-exclusive, royalty-free license to use</p>
          <h3 className="text-xl font-bold text-primary">"Cinematic Epic Trailer Music - Vol 2"</h3>
       </div>

       <div className="grid grid-cols-2 gap-8 text-sm mb-12 border-t border-b border-slate-100 py-8">
          <div>
             <span className="block text-slate-400 text-xs uppercase font-bold mb-1">Asset ID</span>
             <span className="font-mono font-bold">#AS-8921-XJ</span>
          </div>
          <div>
             <span className="block text-slate-400 text-xs uppercase font-bold mb-1">License Type</span>
             <span className="font-bold">Commercial (Standard)</span>
          </div>
          <div>
             <span className="block text-slate-400 text-xs uppercase font-bold mb-1">Creator</span>
             <span className="font-bold">SoundLabs Studio</span>
          </div>
          <div>
             <span className="block text-slate-400 text-xs uppercase font-bold mb-1">Date</span>
             <span className="font-bold">January 13, 2026</span>
          </div>
       </div>

       <div className="flex items-center gap-4 justify-center text-emerald-700 bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-8">
          <ShieldCheck size={24} />
          <p className="text-sm font-medium">This license is verified and secure on the Monteerly Blockchain.</p>
       </div>

       <div className="flex justify-center gap-4 print:hidden">
          <Button variant="outline" icon={<Printer size={16} />} onClick={() => window.print()}>Print</Button>
          <Button variant="primary" icon={<Download size={16} />}>Download PDF</Button>
       </div>
    </div>
  );
}

