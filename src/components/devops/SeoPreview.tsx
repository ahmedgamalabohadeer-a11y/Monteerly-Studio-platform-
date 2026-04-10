'use client';
import React, { useState } from 'react';
import { Globe, Twitter, Facebook, Search } from 'lucide-react';

export function SeoPreview() {
  const [title, setTitle] = useState('Monteerly | The Creative OS');
  const [desc, setDesc] = useState('Join 10,000+ creators using the most advanced cloud editing platform in the world.');
  const [image, setImage] = useState('https://monteerly.com/og-image.jpg');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Inputs */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white mb-4">إعدادات الـ Meta Tags</h3>
          <div>
             <label className="text-xs text-slate-300 font-bold mb-1 block">Title Tag</label>
             <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm" />
             <div className="text-[10px] text-right mt-1 text-slate-500">{title.length} / 60 characters</div>
          </div>
          <div>
             <label className="text-xs text-slate-300 font-bold mb-1 block">Description</label>
             <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded p-2 text-white text-sm h-24" />
             <div className="text-[10px] text-right mt-1 text-slate-500">{desc.length} / 160 characters</div>
          </div>
       </div>

       {/* Previews */}
       <div className="space-y-6">
          {/* Google Search Result */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                <div className="flex flex-col">
                   <span className="text-xs text-slate-800">Monteerly</span>
                   <span className="text-[10px] text-slate-500">https://monteerly.com › home</span>
                </div>
             </div>
             <div className="text-xl text-[#1a0dab] font-normal hover:underline cursor-pointer mb-1 truncate">{title}</div>
             <div className="text-sm text-[#4d5156] line-clamp-2">{desc}</div>
          </div>

          {/* Twitter Card */}
          <div className="bg-black border border-slate-800 rounded-xl overflow-hidden max-w-sm">
             <div className="h-40 bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                [ OG Image Preview ]
             </div>
             <div className="p-3">
                <div className="text-slate-500 text-[10px] uppercase mb-1">MONTEERLY.COM</div>
                <div className="text-white font-bold text-sm mb-1">{title}</div>
                <div className="text-slate-500 text-xs line-clamp-2">{desc}</div>
             </div>
          </div>
       </div>
    </div>
  );
}
