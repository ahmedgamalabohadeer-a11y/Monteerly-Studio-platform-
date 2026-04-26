'use client';
import React from 'react';
import { Play, Check, X, MessageSquare } from 'lucide-react';

export function MobileApprovalCard() {
  return (
    <div className="max-w-md mx-auto bg-black min-h-screen flex flex-col pb-20 md:pb-0 md:border md:border-white/10 md:rounded-3xl md:h-[800px] md:min-h-0 md:overflow-hidden relative">
       {/* Mobile Header */}
       <div className="p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-20">
          <span className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">v3.final</span>
          <span className="text-xs font-bold text-slate-300 shadow-black drop-shadow-md">إعلان رمضان 2026</span>
       </div>

       {/* Video Area (Full Height) */}
       <div className="flex-1 relative bg-slate-900">
          <img src="/images/features/live.jpg" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
             <button className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
             </button>
          </div>
       </div>

       {/* Action Bar (Sticky Bottom) */}
       <div className="p-6 bg-slate-900 border-t border-white/10 relative z-30">
          <div className="flex justify-between items-center mb-6">
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900" />
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-slate-900" />
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white">+2</div>
             </div>
             <button className="text-slate-400 text-xs flex items-center gap-1">
                <MessageSquare size={14} /> 12 تعليق
             </button>
          </div>

          <div className="flex gap-4">
             <button className="flex-1 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold flex flex-col items-center justify-center gap-1 hover:bg-red-500 hover:text-white transition-colors">
                <X size={24} />
                <span className="text-xs">طلب تعديل</span>
             </button>
             <button className="flex-1 py-4 bg-green-500 rounded-xl text-white font-bold flex flex-col items-center justify-center gap-1 shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors">
                <Check size={24} />
                <span className="text-xs">اعتماد</span>
             </button>
          </div>
       </div>
    </div>
  );
}

