'use client';
import React, { useState } from 'react';
import { Shirt, ShoppingBag, Upload, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MerchDesigner() {
  const [product, setProduct] = useState<'tshirt' | 'hoodie' | 'mug'>('tshirt');
  const [color, setColor] = useState('black');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Preview Area */}
       <div className="bg-slate-200 rounded-xl p-8 flex items-center justify-center relative min-h-[400px]">
          <div className="relative w-64 h-64">
             {/* Simple SVG representations for mockup */}
             {product === 'tshirt' && (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                   <path d="M20,20 L30,20 L35,10 L65,10 L70,20 L80,20 L85,40 L75,45 L75,90 L25,90 L25,45 L15,40 Z" fill={color} stroke="none" />
                </svg>
             )}
             {product === 'hoodie' && (
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    <path d="M25,25 L20,30 L20,90 L80,90 L80,30 L75,25 L65,25 Q50,40 35,25 Z" fill={color} />
                    <circle cx="50" cy="20" r="15" fill={color} />
                </svg>
             )}
             {/* Logo Overlay */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-dashed border-white/50 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded">
                <span className="text-[8px] font-bold text-white/80">YOUR LOGO</span>
             </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
             {['black', '#1e1b4b', '#b91c1c', '#ffffff'].map(c => (
                <button 
                  key={c} 
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border border-slate-300 shadow-sm ${c === '#ffffff' ? 'bg-white' : ''}`}
                  style={{ backgroundColor: c }}
                />
             ))}
          </div>
       </div>

       {/* Controls */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
             <ShoppingBag className="text-pink-400" /> صمم منتجاتك (Merch)
          </h3>

          <div className="space-y-6 flex-1">
             <div>
                <label className="text-xs text-slate-300 font-bold mb-2 block">نوع المنتج</label>
                <div className="flex gap-2">
                   <button onClick={() => setProduct('tshirt')} className={`flex-1 py-3 rounded-lg border text-sm font-bold ${product === 'tshirt' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-black/20 border-white/10 text-slate-400'}`}>T-Shirt</button>
                   <button onClick={() => setProduct('hoodie')} className={`flex-1 py-3 rounded-lg border text-sm font-bold ${product === 'hoodie' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-black/20 border-white/10 text-slate-400'}`}>Hoodie</button>
                </div>
             </div>

             <div>
                <label className="text-xs text-slate-300 font-bold mb-2 block">رفع التصميم</label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                   <Upload size={20} className="text-slate-500 mb-2" />
                   <span className="text-xs text-slate-400">PNG Transparent (Max 10MB)</span>
                </div>
             </div>

             <div className="p-4 bg-green-900/10 border border-green-500/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm text-slate-300">سعر التكلفة</span>
                   <span className="text-white font-bold">$12.00</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm text-slate-300">سعر البيع</span>
                   <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded border border-white/10">
                      <span className="text-xs text-slate-500">$</span>
                      <input type="number" defaultValue="25" className="w-8 bg-transparent text-white font-bold text-sm text-right outline-none" />
                   </div>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between items-center">
                   <span className="text-sm font-bold text-green-400">ربحك الصافي</span>
                   <span className="text-lg font-black text-green-400">$13.00</span>
                </div>
             </div>
          </div>

          <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold h-12">
             إطلاق المنتج في المتجر 🚀
          </Button>
       </div>
    </div>
  );
}
