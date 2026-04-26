'use client';
import React from 'react';
import { Star, Video } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function ExpertCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary transition-colors">
       <div className="relative w-fit mx-auto mb-4">
          <Avatar size="xl" src="/images/expert_avatar.png" fallback="EX" />
          <div className="absolute bottom-0 right-0 bg-emerald-500 border-2 border-card w-4 h-4 rounded-full" />
       </div>

       <h3 className="font-bold text-lg mb-1">د. محمد علي</h3>
       <p className="text-xs text-muted-foreground mb-3">Color Grading Expert • DaVinci Certified</p>
       
       <div className="flex justify-center gap-2 mb-4">
          <Badge variant="secondary">تصحيح ألوان</Badge>
          <Badge variant="secondary">سينما</Badge>
       </div>

       <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-sm mb-6">
          <Star fill="currentColor" size={14} /> 
          <span>4.9</span> 
          <span className="text-muted-foreground font-normal">(120 تقييم)</span>
       </div>

       <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="text-right">
             <p className="text-[10px] text-muted-foreground">سعر الجلسة</p>
             <p className="font-bold">$50<span className="text-xs font-normal">/ساعة</span></p>
          </div>
          <Button size="sm" variant="primary" icon={<Video size={14} />}>حجز استشارة</Button>
       </div>
    </div>
  );
}

################################################################################