'use client';
import React from 'react';
import { CreativeFeedItem } from './CreativeFeedItem';

export function FeedContainer() {
  const items = [
    {
      id: '1',
      videoSrc: '/images/features/live.jpg',
      creator: { name: 'أحمد كمال', role: 'VFX Artist', avatar: '/avatars/ahmed.jpg', available: true },
      stats: { likes: '12.4K', comments: '340', shares: '1.2K' },
      tags: ['3D', 'Motion', 'Commercial']
    },
    {
      id: '2',
      videoSrc: '/images/features/ai-brain.jpg',
      creator: { name: 'سارة علي', role: 'Colorist', avatar: '/avatars/sara.jpg', available: false },
      stats: { likes: '8.2K', comments: '120', shares: '500' },
      tags: ['Grading', 'Film', 'Moody']
    },
    {
      id: '3',
      videoSrc: '/images/features/speed.jpg',
      creator: { name: 'خالد عمر', role: 'Video Editor', avatar: '/avatars/khaled.jpg', available: true },
      stats: { likes: '5.1K', comments: '80', shares: '200' },
      tags: ['Documentary', 'Editing', 'Storytelling']
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto pb-20 pt-8">
       {items.map(item => (
          <CreativeFeedItem key={item.id} data={item} />
       ))}
       <div className="text-center py-8 text-slate-500 text-sm animate-pulse">
          جاري تحميل المزيد من الإبداع...
       </div>
    </div>
  );
}
