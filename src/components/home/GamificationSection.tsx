'use client';
import { useContent } from '@/hooks/useContent';
import Image from 'next/image';

export function GamificationSection() {
  const { gamification } = useContent();
  
  return (
    <section className="py-24 container px-4">
      <div className="bg-[#006B8F] rounded-3xl p-8 md:p-16 overflow-hidden relative text-white">
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center md:text-right">
            <h2 className="text-4xl md:text-5xl font-bold">{gamification.title}</h2>
            <p className="text-xl font-medium text-white/90">{gamification.subtitle}</p>
            <p className="text-white/70">{gamification.desc}</p>
            <button className="px-8 py-3 bg-[#FF6B6B] text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-transform mt-4">
              {gamification.cta}
            </button>
          </div>
          {/* Visual Representation of Power FAB */}
          <div className="flex-1 flex justify-center">
             <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl animate-pulse-slow">
                <span className="text-6xl">⚡</span> 
                {/* Note: Replace with actual image if available: <Image src={gamification.image} ... /> */}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

################################################################################