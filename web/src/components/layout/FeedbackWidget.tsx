'use client';
import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, Smile, Frown, Meh } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sentiment, setSentiment] = useState<'happy' | 'neutral' | 'sad' | null>(null);

  if (!isOpen) {
    return (
      <button 
         onClick={() => setIsOpen(true)}
         className="fixed bottom-4 left-4 z-40 bg-card border border-border shadow-lg px-4 py-2 rounded-full flex items-center gap-2 hover:bg-muted transition-colors text-sm font-bold"
      >
         <MessageSquarePlus size={16} /> رأيك يهمنا
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5">
       <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30 rounded-t-2xl">
          <h3 className="font-bold text-sm">ساعدنا في تحسين Monteerly</h3>
          <button onClick={() => setIsOpen(false)}><X size={16} /></button>
       </div>

       <div className="p-4 space-y-4">
          <div>
             <p className="text-xs text-muted-foreground mb-2 font-bold">كيف كانت تجربتك اليوم؟</p>
             <div className="flex gap-2">
                <EmojiBtn icon={Smile} active={sentiment === 'happy'} onClick={() => setSentiment('happy')} />
                <EmojiBtn icon={Meh} active={sentiment === 'neutral'} onClick={() => setSentiment('neutral')} />
                <EmojiBtn icon={Frown} active={sentiment === 'sad'} onClick={() => setSentiment('sad')} />
             </div>
          </div>

          <Textarea placeholder="أخبرنا عن مشكلة واجهتها أو ميزة تود رؤيتها..." className="h-24 resize-none text-sm" />

          <Button className="w-full" variant="primary" icon={<Send size={14} />}>إرسال الملاحظات</Button>
       </div>
    </div>
  );
}

function EmojiBtn({ icon: Icon, active, onClick }: any) {
    return (
        <button 
           onClick={onClick}
           className={`flex-1 py-2 flex justify-center rounded-lg border transition-all ${active ? 'bg-primary/10 border-primary text-primary' : 'border-border hover:bg-muted text-muted-foreground'}`}
        >
           <Icon size={24} />
        </button>
    )
}

