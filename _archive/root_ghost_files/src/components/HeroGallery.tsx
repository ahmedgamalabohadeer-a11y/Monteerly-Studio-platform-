'use client';
import Image from 'next/image';

const images = Array.from({length: 24}, (_, i) => `/images/monteerly/monteerly${(i%24)+1}.png`);

export default function HeroGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12 p-4 bg-slate-900/20 rounded-3xl">
      {images.slice(0, 24).map((src, i) => (
        <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-black hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border-2 border-white/20">
          <Image src={src} alt={`صورة ${i+1}`} fill className="object-cover group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
            <span className="bg-white/90 text-black px-4 py-2 rounded-xl font-bold text-sm backdrop-blur">
              صورة {i+1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
