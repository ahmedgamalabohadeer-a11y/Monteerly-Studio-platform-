'use client';
import React from 'react';
import Image from 'next/image';
import { MapPin, Star, MessageCircle, Share2, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function PublicPortfolio() {
  return (
    <div className="max-w-5xl mx-auto pb-12">
       {/* Cover */}
       <div className="h-64 w-full bg-gradient-to-r from-slate-900 to-slate-800 relative">
          <div className="absolute bottom-4 right-4 flex gap-2">
             <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" icon={<Share2 size={16} />}>مشاركة</Button>
          </div>
       </div>

       {/* Header */}
       <div className="px-6 relative -mt-16 mb-8 flex flex-col md:flex-row items-end md:items-center gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-background bg-white overflow-hidden relative shadow-lg">
             <Image src="/images/user_avatar.jpg" alt="User" fill className="object-cover" />
          </div>
          
          <div className="flex-1 pt-4 md:pt-0">
             <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">كريم عبد العزيز</h1>
                <Badge variant="success">متاح للعمل</Badge>
             </div>
             <p className="text-muted-foreground mb-2">Senior Video Editor & Motion Designer</p>
             <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} /> القاهرة، مصر</span>
                <span className="flex items-center gap-1 text-yellow-500 font-bold"><Star size={14} fill="currentColor" /> 4.9 (150 تقييم)</span>
             </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
             <Button variant="primary" size="lg" className="flex-1" icon={<MessageCircle size={18} />}>تواصل معي</Button>
          </div>
       </div>

       {/* Portfolio Grid */}
       <div className="px-6">
          <h3 className="font-bold text-xl mb-6 border-b border-border pb-2">معرض الأعمال</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <PortfolioItem 
                image="/images/work1.jpg" 
                title="إعلان سيارات مرسيدس" 
                category="Commercial" 
                views="1.2k" 
             />
             <PortfolioItem 
                image="/images/work2.jpg" 
                title="فيلم وثائقي قصير" 
                category="Documentary" 
                views="850" 
             />
             <PortfolioItem 
                image="/images/work3.jpg" 
                title="Intro لقناة تقنية" 
                category="Motion Graphics" 
                views="2.1k" 
             />
          </div>
       </div>
    </div>
  );
}

function PortfolioItem({ image, title, category, views }: any) {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-200">
               <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                     <Play size={24} fill="currentColor" />
                  </div>
               </div>
               <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">{category}</span>
            </div>
            <h4 className="font-bold group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-xs text-muted-foreground">{views} مشاهدة</p>
        </div>
    )
}

################################################################################