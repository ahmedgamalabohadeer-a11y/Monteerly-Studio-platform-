'use client';
import { useContent } from '@/hooks/useContent';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, PlayCircle } from 'lucide-react'; // Or ArrowRight based on dir

export function HeroSection() {
  const { hero, global } = useContent();
  const isRTL = global.direction === 'rtl';

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center text-center px-4 min-h-[95vh]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <Image 
            src={hero.image} 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-10 dark:opacity-20 blur-sm"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold mb-8 shadow-glow"
        >
          <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
          {hero.badge}
        </motion.div>
      
        {/* Headings */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-heading leading-tight">
          <span className="block text-foreground">{hero.pretitle}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {hero.title}
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          {hero.subtitle}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
          <Link href="/signup" className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-secondary/90 hover:shadow-lg transition-all text-lg group">
            {hero.cta}
            <ArrowLeft className={`w-5 h-5 transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'}`} />
          </Link>
          <button className="flex items-center justify-center gap-2 px-8 py-4 border border-border bg-card/50 backdrop-blur rounded-full font-medium hover:bg-card transition-colors text-lg">
            <PlayCircle className="w-5 h-5" />
            {hero.secondary}
          </button>
        </div>
      </div>
    </section>
  );
}

