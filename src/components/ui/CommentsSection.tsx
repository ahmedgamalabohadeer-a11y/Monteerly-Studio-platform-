'use client';
import React from 'react';
import { Send, ThumbsUp, Reply } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export function CommentsSection() {
  return (
    <div className="space-y-8 mt-8 border-t border-border pt-8">
       <h3 className="font-bold text-lg">التعليقات (3)</h3>

       {/* Add Comment */}
       <div className="flex gap-4">
          <Avatar fallback="ME" />
          <div className="flex-1 space-y-2">
             <Textarea placeholder="أضف تعليقاً..." className="min-h-[100px]" />
             <div className="flex justify-end">
                <Button size="sm" variant="primary" icon={<Send size={14} />}>نشر</Button>
             </div>
          </div>
       </div>

       {/* Comments List */}
       <div className="space-y-6">
          <CommentItem 
             user="سارة أحمد" 
             time="منذ 2 ساعة" 
             text="شرح ممتاز! هل يمكن تطبيق نفس الخطوات على برنامج DaVinci Resolve؟" 
             likes={5}
          />
          <CommentItem 
             user="محمد جمال" 
             time="منذ 5 ساعات" 
             text="أعجبتني جداً الفقرة الخاصة بتصحيح الألوان. شكراً لك." 
             likes={12}
             hasReply
          />
       </div>
    </div>
  );
}

function CommentItem({ user, time, text, likes, hasReply }: any) {
   return (
      <div className="flex gap-4">
         <Avatar fallback={user[0]} />
         <div className="flex-1">
            <div className="bg-muted/30 p-3 rounded-xl rounded-tl-none">
               <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-sm">{user}</span>
                  <span className="text-xs text-muted-foreground">{time}</span>
               </div>
               <p className="text-sm leading-relaxed">{text}</p>
            </div>
            
            <div className="flex gap-4 mt-1 px-2">
               <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-medium">
                  <ThumbsUp size={12} /> {likes}
               </button>
               <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-medium">
                  <Reply size={12} /> رد
               </button>
            </div>

            {hasReply && (
               <div className="mt-3 mr-8 pl-4 border-r-2 border-border">
                  <div className="flex gap-3">
                     <Avatar size="sm" fallback="AD" className="bg-primary text-white" />
                     <div className="bg-primary/5 p-2 rounded-lg text-sm">
                        <span className="font-bold block text-xs mb-1 text-primary">فريق Monteerly</span>
                        شكراً محمد! يسعدنا أن المقال نال إعجابك.
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

################################################################################