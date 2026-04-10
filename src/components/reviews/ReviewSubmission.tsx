'use client';
import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Avatar } from '@/components/ui/Avatar';

export function ReviewSubmission({ freelancerName }: { freelancerName: string }) {
  const [ratings, setRatings] = useState({ quality: 0, communication: 0, time: 0 });

  const handleRate = (criteria: keyof typeof ratings, score: number) => {
    setRatings({ ...ratings, [criteria]: score });
  };

  return (
    <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
       <div className="mb-6">
          <Avatar size="xl" className="mx-auto mb-4" fallback={freelancerName[0]} />
          <h2 className="text-2xl font-bold">كيف كانت تجربتك مع {freelancerName}؟</h2>
          <p className="text-muted-foreground">رأيك يساعد مجتمعنا على النمو والحفاظ على الجودة.</p>
       </div>

       <div className="space-y-6 mb-8 text-left">
          <RatingCriteria 
             label="جودة العمل" 
             value={ratings.quality} 
             onChange={(v: number) => handleRate('quality', v)} 
          />
          <RatingCriteria 
             label="التواصل والمتابعة" 
             value={ratings.communication} 
             onChange={(v: number) => handleRate('communication', v)} 
          />
          <RatingCriteria 
             label="الالتزام بالمواعيد" 
             value={ratings.time} 
             onChange={(v: number) => handleRate('time', v)} 
          />
       </div>

       <Textarea 
          placeholder="اكتب تعليقاً عاماً (سيظهر في ملف المستقل)..." 
          className="mb-6 h-32"
       />

       <div className="flex gap-3">
          <Button variant="ghost" className="flex-1">تخطي</Button>
          <Button variant="primary" className="flex-1" icon={<ThumbsUp size={16} />}>نشر التقييم</Button>
       </div>
    </div>
  );
}

function RatingCriteria({ label, value, onChange }: any) {
   return (
      <div className="flex justify-between items-center">
         <span className="font-bold text-sm">{label}</span>
         <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
               <button 
                  key={star} 
                  onClick={() => onChange(star)}
                  className={`transition-transform hover:scale-110 ${value >= star ? 'text-yellow-500' : 'text-muted-foreground/30'}`}
               >
                  <Star fill="currentColor" size={24} />
               </button>
            ))}
         </div>
      </div>
   );
}
