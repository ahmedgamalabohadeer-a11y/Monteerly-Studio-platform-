'use client';
import { useContent } from '@/hooks/useContent';
import Image from 'next/image';

export function AITechSection() {
  const { ai_tech } = useContent();
  return (
    <section className="py-24 bg-gradient-to-b from-muted/5 to-muted/20">
      <div className="container px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          
          {/* Features Grid */}
          <div className="flex-1 space-y-10">
            <div>
              <h2 className="text-4xl font-bold mb-4">{ai_tech.title}</h2>
              <p className="text-xl text-muted-foreground">{ai_tech.subtitle}</p>
            </div>
            <div className="grid gap-6">
              {ai_tech.features.map((feat: any, i: number) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-secondary transition-colors">
                    <Image src={feat.image} alt={feat.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{feat.title}</h4>
                    <p className="text-sm text-muted-foreground">{feat.desc}</p>
                  </div>