'use client';
import React from 'react';
import { QrCode, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function DigitalPass() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-600 relative h-[600px] flex flex-col">
       {/* Hole Punch Visual */}
       <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-full z-20" />

       {/* Access Level Header */}
       <div className="bg-indigo-600 p-8 pt-12 text-center text-white">
          <h2 className="text-2xl font-black tracking-widest uppercase">All Access</h2>
          <p className="text-xs opacity-80 font-mono">SET: DESERT STORM</p>
       </div>

       {/* Profile */}
       <div className="flex-1 bg-slate-50 flex flex-col items-center pt-8 px-6 relative">
          <div className="absolute -top-12 p-1 bg-white rounded-full">
             <Avatar src="/avatars/mohamed.jpg" size="xl" className="border-4 border-white shadow-lg w-24 h-24" />
          </div>
          
          <div className="mt-12 text-center w-full">
             <h3 className="text-2xl font-bold text-slate-900">Mohamed Kamal</h3>
             <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-bold mt-2 uppercase tracking-wide">
                Director
             </div>
          </div>

          <div className="mt-8 w-full space-y-4">
             <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <Calendar className="text-indigo-600" size={20} />
                <div>
                   <div className="text-[10px] text-slate-400 uppercase font-bold">Valid Until</div>
                   <div className="text-sm font-bold text-slate-900">Jan 30, 2026</div>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <MapPin className="text-indigo-600" size={20} />
                <div>
                   <div className="text-[10px] text-slate-400 uppercase font-bold">Allowed Zones</div>
                   <div className="text-sm font-bold text-slate-900">Zone A, B, Catering</div>
                </div>
             </div>
          </div>

          {/* QR Code */}
          <div className="mt-auto mb-8 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
             <QrCode size={120} className="text-slate-900" />
          </div>
       </div>

       {/* Verification Footer */}
       <div className="bg-green-500 py-2 text-center text-white text-[10px] font-bold uppercase flex items-center justify-center gap-2">
          <ShieldCheck size={12} /> Verified Personnel
       </div>
    </div>
  );
}

