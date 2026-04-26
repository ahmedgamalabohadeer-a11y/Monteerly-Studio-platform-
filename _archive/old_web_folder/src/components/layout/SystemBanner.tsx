'use client';
import React, { useState } from 'react';
import { Megaphone, X, ArrowLeft } from 'lucide-react';

export function SystemBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 flex items-center justify-between relative z-50">
       <div className="flex items-center gap-3 text-sm font-medium mx-auto">
          <span className="bg-white/20 p-1 rounded-full animate-pulse"><Megaphone size={14} /></span>
          <span>
             جديد في Monteerly: أداة الكتابة بالذكاء الاصطناعي متاحة الآن للجميع! 🤖
          </span>
          <button className="bg-white/10 hover:bg-white/20 px-3 py-0.5 rounded-full text-xs flex items-center gap-1 transition-colors">
             جربها الآن <ArrowLeft size={12} />
          </button>
       </div>
       
       <button 
          onClick={() => setVisible(false)}
          className="text-white/60 hover:text-white absolute left-4 top-1/2 -translate-y-1/2"
       >
          <X size={18} />
       </button>
    </div>
  );
}

