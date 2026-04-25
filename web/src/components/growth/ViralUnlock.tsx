// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Gift, Lock, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function ViralUnlock() {
  const [invites, setInvites] = useState(1); // Demo: User has invited 1 friend

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
       
       <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
             <Gift size={32} className="animate-bounce" />
          </div>

          <div className="flex-1 text-center md:text-left">
             <h3 className="text-xl font-bold mb-1">افتح ميزة التصدير 8K مجاناً!</h3>
             <p className="text-indigo-100 text-sm mb-4">
                الميزة مغلقة للمحترفين فقط. ادعُ 3 أصدقاء لفتحها لمدة شهر كامل مجاناً.
             </p>
             
             {/* Progress Bar */}
             <div className="w-full bg-black/30 h-4 rounded-full overflow-hidden mb-2">
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: `${(invites / 3) * 100}%` }} 
                   className="h-full bg-white shadow-[0_0_10px_white]"
                />
             </div>
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span>0 Invites</span>
                <span>{invites} / 3 Completed</span>
             </div>
          </div>

          <div className="flex gap-2">
             <button className="bg-[#1DA1F2] hover:bg-[#1a91da] p-3 rounded-xl transition-colors text-white">
                <Share2 size={20} />
             </button>
             <button className="bg-[#4267B2] hover:bg-[#365899] p-3 rounded-xl transition-colors text-white">
                <Globe size={20} />
             </button>
             <button className="bg-white hover:bg-slate-200 p-3 rounded-xl transition-colors text-indigo-600 font-bold flex items-center gap-2">
                <Share2 size={20} /> نسخ الرابط
             </button>
          </div>
       </div>
    </div>
  );
}

