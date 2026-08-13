'use client';
import { useContent } from '@/hooks/useContent';
import Image from 'next/image';

export function MarketplacePreview() {
  const { marketplace } = useContent();
  return (
    <section className="py-24 container px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{marketplace.title}</h2>
        <p className="text-muted-foreground">{marketplace.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {marketplace.talents.map((talent: unknown, i: number) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[3/4]">
            <Image src={talent.image} alt={talent.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="font-bold text-lg">{talent.name}</h3>
              <p className="text-xs text-primary font-medium uppercase mb-1">{talent.role}</p>
              <p className="text-xs opacity-80">{talent.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

