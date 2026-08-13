'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { VideoHoverCard } from '@/components/marketplace/VideoHoverCard';

type Creator = {
  id: string;
  name: string;
  role: string;
  rate: string;
  image: string;
  video?: string;
  avatar: string;
  rating: number;
  reviews: number;
  availability?: 'available' | 'busy' | 'offline';
  verified?: boolean;
};

const featuredCreators: Creator[] = [
  {
    id: 'featured-ahmed-samir',
    name: 'Ahmed Samir',
    role: 'Video Editor',
    rate: '$35',
    image: '/images/features/live.jpg',
    avatar: '/images/features/live.jpg',
    rating: 5.0,
    reviews: 18,
    availability: 'available',
    verified: true,
  },
  {
    id: 'featured-sara-nabil',
    name: 'Sara Nabil',
    role: 'Motion Designer',
    rate: '$42',
    image: '/images/features/ai-brain.jpg',
    avatar: '/images/features/ai-brain.jpg',
    rating: 4.9,
    reviews: 24,
    availability: 'busy',
    verified: true,
  },
  {
    id: 'featured-khaled-tarek',
    name: 'Khaled Tarek',
    role: 'Colorist',
    rate: '$50',
    image: '/images/features/speed.jpg',
    avatar: '/images/features/speed.jpg',
    rating: 4.8,
    reviews: 12,
    availability: 'available',
  },
];

export function FeaturedVideoCreators() {
  const handleBook = (creatorName: string) => {
    console.log(`Book creator: ${creatorName}`);
  };

  return (
    <section className="mb-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0B0B12] via-slate-950 to-[#08080D] p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
            <Sparkles size={14} />
            ترشيحات الفيديو المميزة
          </div>
          <h2 className="text-2xl font-black text-white md:text-3xl">اكتشف محترفي الفيديو الأسرع حجزاً</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            بطاقات تفاعلية لمبدعين مختارين بعناية، مع معاينة فورية للأعمال، حالة التوفر، وسرعة وصول للحجز.
          </p>
        </div>

        <Link
          href="/ar/marketplace"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          استعراض السوق بالكامل
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredCreators.map((creator) => (
          <VideoHoverCard
            key={creator.id}
            name={creator.name}
            role={creator.role}
            rate={creator.rate}
            image={creator.image}
            video={creator.video}
            avatar={creator.avatar}
            rating={creator.rating}
            reviews={creator.reviews}
            availability={creator.availability}
            verified={creator.verified}
            onBook={() => handleBook(creator.name)}
          />
        ))}
      </div>
    </section>
  );
}
