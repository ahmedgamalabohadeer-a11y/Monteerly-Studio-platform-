'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center justify-center font-sans">
      <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl max-w-xl text-center shadow-2xl shadow-indigo-900/20">
        <AlertCircle className="w-16 h-16 text-indigo-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-3xl font-black mb-4">Wallet (المحفظة)</h1>
        <p className="text-slate-400 leading-relaxed">
          هذه الوحدة قيد التطوير والتكامل ضمن معمارية Monteerly Corporate OS v5.0. 
          سيتم ربطها بمحركات الذكاء الاصطناعي قريباً.
        </p>
      </div>
    </div>
  );
}
