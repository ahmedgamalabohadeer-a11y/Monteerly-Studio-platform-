'use client';
import React, { useState } from 'react';
import { Search, Music, Video, Image as ImageIcon, Download, Play, Pause, ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AssetBrowser() {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'vfx'>('audio');
  const [playing, setPlaying] = useState<number | null>(null);
  const [purchasing, setPurchasing] = useState<number | null>(null);

  const assets = {
    audio: [
       { id: 1, title: 'Epic Cinematic Build', author: 'Hans Zimmer Clone', price: '$15', duration: '02:10', type: 'audio' },
       { id: 2, title: 'Lo-Fi Chill Beat', author: 'Study Girl', price: '$5', duration: '03:00', type: 'audio' },
       { id: 3, title: 'Horror Suspense', author: 'Scary Sound', price: '$10', duration: '01:45', type: 'audio' },
    ],
    video: [
       { id: 4, title: 'Aerial Dubai 4K', author: 'Drone Master', price: '$45', duration: '00:15', type: 'video' },
       { id: 5, title: 'Green Screen Fire', author: 'VFX Pro', price: '$12', duration: '00:05', type: 'video' },
    ],
    vfx: [
       { id: 6, title: 'Dust Particles Overlay', author: 'Studio X', price: '$8', duration: '-', type: 'image' },
    ]
  };

  const handleBuy = (id: number) => {
    setPurchasing(id);
    // Simulate API Call & Import
    setTimeout(() => {
       setPurchasing(null);
       // Here we would trigger a global event: "Asset Imported to Bin"
       alert("تم الشراء وإضافة الملف إلى مشروعك!");
    }, 1500);
  };

  return (
    <div className="w-80 bg-[#111] border-r border-white/10 flex flex-col h-full">
       {/* Header tabs */}
       <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab('audio')}
            className={`flex-1 py-3 flex justify-center ${activeTab === 'audio' ? 'text-indigo-400 border-b-2 border-indigo-400 bg-white/5' : 'text-slate-400 hover:text-white'}`}
          >
             <Music size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-3 flex justify-center ${activeTab === 'video' ? 'text-indigo-400 border-b-2 border-indigo-400 bg-white/5' : 'text-slate-400 hover:text-white'}`}
          >
             <Video size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('vfx')}
            className={`flex-1 py-3 flex justify-center ${activeTab === 'vfx' ? 'text-indigo-400 border-b-2 border-indigo-400 bg-white/5' : 'text-slate-400 hover:text-white'}`}
          >
             <ImageIcon size={18} />
          </button>
       </div>

       {/* Search */}
       <div className="p-3 border-b border-white/10">
          <div className="relative">
             <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
             <input 
               type="text" 
               placeholder="بحث في المتجر..." 
               className="w-full bg-black border border-white/10 rounded-lg pr-9 pl-3 py-2 text-xs text-white focus:border-indigo-500 outline-none"
             />
          </div>
       </div>

       {/* List */}
       <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {assets[activeTab]?.map((item) => (
             <div key={item.id} className="bg-[#1a1a1a] border border-white/5 rounded-lg p-3 group hover:border-white/20 transition-all draggable cursor-grab active:cursor-grabbing">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <div className="font-bold text-white text-sm line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.author} • {item.duration}</div>
                   </div>
                   <div className="text-green-400 font-bold text-sm">{item.price}</div>
                </div>

                <div className="flex gap-2 mt-2">
                   <button 
                     onClick={() => setPlaying(playing === item.id ? null : item.id)}
                     className="p-1.5 bg-white/10 rounded hover:bg-white/20 text-white"
                   >
                      {playing === item.id ? <Pause size={14}/> : <Play size={14}/>}
                   </button>
                   
                   <Button 
                     onClick={() => handleBuy(item.id)}
                     disabled={purchasing === item.id}
                     size="sm" 
                     className={`flex-1 h-8 text-xs font-bold ${purchasing === item.id ? 'bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
                   >
                      {purchasing === item.id ? (
                         <span className="flex items-center gap-1 animate-pulse">جاري التحميل...</span>
                      ) : (
                         <span className="flex items-center gap-1"><ShoppingCart size={12}/> شراء واستخدام</span>
                      )}
                   </Button>
                </div>
             </div>
          ))}
       </div>

       {/* Footer Promo */}
       <div className="p-3 bg-gradient-to-r from-indigo-900 to-purple-900 border-t border-white/10">
          <div className="text-xs text-white font-bold mb-1">Monteerly Pro</div>
          <p className="text-[10px] text-indigo-200 mb-2">احصل على خصم 50% على كل الأصول.</p>
          <button className="w-full bg-white text-indigo-900 text-xs font-bold py-1 rounded">ترقية الآن</button>
       </div>
    </div>
  );
}

################################################################################