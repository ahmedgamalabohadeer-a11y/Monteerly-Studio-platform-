'use client';
import React, { useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { InteractiveButton } from '@/components/system/InteractiveButton';

export function PricingTable() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Hobbyist',
      price: annual ? '0' : '0',
      desc: 'للمبتدئين والتجربة',
      features: ['2GB Cloud Storage', '720p Exports', 'Standard Support'],
      cta: 'ابدأ مجاناً',
      popular: false
    },
    {
      name: 'Pro Creator',
      price: annual ? '29' : '39',
      desc: 'لليوتيوبرز وصناع المحتوى',
      features: ['100GB Cloud Storage', '4K Exports', 'AI Auto-Captions', 'No Watermark'],
      cta: 'اشترك الآن',
      popular: true, // The "Decoy"
      highlight: 'أفضل قيمة 🌟'
    },
    {
      name: 'Studio Team',
      price: annual ? '99' : '119',
      desc: 'للفرق والشركات الصغيرة',
      features: ['2TB Storage', 'Collaborative Editing', 'Brand Kits', 'Priority Render'],
      cta: 'ترقية الفريق',
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
       {/* Toggle */}
       <div className="flex justify-center mb-12">
          <div className="bg-slate-900 p-1 rounded-full border border-white/10 flex relative">
             <button 
               onClick={() => setAnnual(false)}
               className={`px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 ${!annual ? 'text-white' : 'text-slate-400'}`}
             >
                شهري
             </button>
             <button 
               onClick={() => setAnnual(true)}
               className={`px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 flex items-center gap-2 ${annual ? 'text-white' : 'text-slate-400'}`}
             >
                سنوي <span className="text-[10px] bg-green-500 text-black px-1.5 rounded font-black">-20%</span>
             </button>
             
             {/* Sliding Pill */}
             <motion.div 
               className="absolute top-1 bottom-1 bg-indigo-600 rounded-full"
               animate={{ 
                  left: annual ? '50%' : '4px', 
                  width: annual ? 'calc(50% - 4px)' : 'calc(50% - 4px)'
               }}
             />
          </div>
       </div>

       {/* Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -10 }}
               className={`relative p-8 rounded-3xl border flex flex-col h-full ${
                  plan.popular 
                  ? 'bg-gradient-to-b from-indigo-900/50 to-black border-indigo-500 shadow-2xl z-10 scale-105' 
                  : 'bg-slate-900/50 border-white/10 hover:border-white/20'
               }`}
             >
                {plan.popular && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Star size={12} fill="white" /> {plan.highlight}
                   </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-4xl font-black text-white">${plan.price}</span>
                   <span className="text-slate-500">/mo</span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                   {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                         <div className={`p-1 rounded-full ${plan.popular ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            <Check size={10} />
                         </div>
                         {feat}
                      </li>
                   ))}
                </ul>

                <InteractiveButton 
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                   {plan.cta}
                </InteractiveButton>
             </motion.div>
          ))}
       </div>
    </div>
  );
}

