'use client';
import Image from "next/image";
import React from 'react';
import { Star } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen w-full flex bg-black">
       {/* Left: Content & Form */}
       <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 relative z-10">
          <div className="mb-12">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xl mb-6 shadow-lg shadow-indigo-500/30">M</div>
             <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
             <p className="text-slate-400">{subtitle}</p>
          </div>
          {children}
          <div className="mt-8 text-center text-xs text-slate-500">
             &copy; 2026 Monteerly Studio. جميع الحقوق محفوظة.
          </div>
       </div>

       {/* Right: Visuals (Hidden on Mobile) */}
       <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 relative">
             <Image src="/images/monteerly/monteerly_04_hero_header_marketing_banner.png" alt="Marketing Hero" fill className="object-cover opacity-40 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/40" />
          </div>
          
          <div className="relative z-10 max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
             <div className="flex gap-1 text-yellow-400 mb-4">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
             </div>
             <p className="text-lg text-white font-medium leading-relaxed mb-6">
                &quot;غيّرت Monteerly طريقة عملنا بالكامل. اختفت فوضى الإيميلات، وأصبحت دورة المراجعة أسرع بـ 3 أضعاف. لا يمكننا العودة للوراء.&quot;
             </p>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full overflow-hidden">
                   <Image src="/avatars/user.jpg" alt="User Avatar" width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div>
                   <div className="text-white font-bold">سارة العمري</div>
                   <div className="text-slate-400 text-sm">Creative Director @ Vision2030</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

