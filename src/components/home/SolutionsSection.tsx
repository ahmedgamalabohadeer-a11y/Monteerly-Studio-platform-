'use client';
import { useContent } from '@/hooks/useContent';
import Image from 'next/image';

export function SolutionsSection() {
  const { solutions } = useContent();
  
  return (
    <section className="py-24 container px-4">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">{solutions.title}</h2>
        <p className="text-muted-foreground text-xl">{solutions.subtitle}</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Ecosystem Visual */}
        <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl aspect-[4/3] group bg-card">
           <Image 
             src={solutions.mainImage} 
             alt="Monteerly Ecosystem" 
             fill 
             className="object-cover object-top hover:scale-105 transition-transform duration-700" 
           />
        </div>
        
        {/* Features List */}
        <div className="space-y-8">
          {solutions.features.map((item: unknown, i: number) => (
            <div key={i} className="flex gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-20 h-20 relative flex-shrink-0 rounded-xl overflow-hidden bg-muted p-2">
                <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

