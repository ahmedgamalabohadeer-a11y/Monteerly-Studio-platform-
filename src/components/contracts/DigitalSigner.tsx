'use client';
import React, { useState } from 'react';
import { PenTool, Check } from 'lucide-react';
// استخدام أزرار وحقول TypeUI الأساسية التي دمجناها سابقاً
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface SignerProps {
  onSign: (signature: string) => void;
}

export function DigitalSigner({ onSign }: SignerProps) {
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
       <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
          <PenTool size={20} className="text-indigo-400" /> التوقيع الإلكتروني
       </h3>
       
       <div className="bg-amber-500/10 text-amber-500 text-sm p-4 rounded-lg mb-6 border border-amber-500/20">
          بإدخال اسمك الكامل أدناه، أنت توافق قانونياً على جميع الشروط والأحكام المذكورة في هذا العقد وتلتزم بتنفيذها.
       </div>

       <div className="space-y-4">
          <div className="flex items-start gap-3">
             <input 
                type="checkbox" 
                id="agree" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                className="mt-1 w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500 bg-slate-800 border-slate-700" 
             />
             <label htmlFor="agree" className="text-sm cursor-pointer select-none text-slate-300">
                أقر بأنني قرأت العقد كاملاً وأوافق على شروط منصة Monteerly للعمل الحر.
             </label>
          </div>

          <div>
             <label className="text-sm font-bold block mb-2 text-slate-300">اكتب اسمك الكامل للتوقيع</label>
             <input 
                placeholder="مثلاً: أحمد محمد جمال" 
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white font-serif text-xl focus:ring-2 focus:ring-indigo-500 outline-none"
             />
             <p className="text-xs text-slate-500 mt-2">سيتم ختم هذا التوقيع بختم زمني ورقم IP الجهاز.</p>
          </div>
       </div>

       <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
          <button 
             disabled={!agreed || signature.length < 5}
             onClick={() => onSign(signature)}
             className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <Check size={20} /> اعتماد وتوقيع العقد
          </button>
       </div>
    </div>
  );
}
