'use client';
import React, { useState } from 'react';
import { MessageCircle, X, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
     return (
        <button 
           onClick={() => setIsOpen(true)}
           className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
           <MessageCircle size={28} />
           <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
     );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[350px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
       {/* Header */}
       <div className="bg-primary p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
             <Avatar src="/images/support_agent.jpg" fallback="CS" className="border-2 border-white/20" />
             <div>
                <h4 className="font-bold text-sm">الدعم الفني</h4>
                <p className="text-xs text-white/80">نرد عادة خلال دقيقتين</p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={20} /></button>
       </div>

       {/* Chat Area */}
       <div className="flex-1 bg-muted/30 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-center text-xs text-muted-foreground my-2">اليوم</div>
          
          <div className="flex gap-2">
             <Avatar size="sm" fallback="CS" className="bg-primary text-white" />
             <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none text-sm shadow-sm max-w-[80%]">
                مرحباً بك في Monteerly! 👋 كيف يمكنني مساعدتك اليوم؟
             </div>
          </div>

          <div className="flex gap-2 flex-row-reverse">
             <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm max-w-[80%]">
                لدي مشكلة في رفع ملف حجمه 5GB.
             </div>
          </div>
       </div>

       {/* Input */}
       <div className="p-3 border-t border-border bg-background flex gap-2 items-center">
          <button className="text-muted-foreground hover:text-primary"><Paperclip size={20} /></button>
          <input 
             className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
             placeholder="اكتب رسالتك..."
          />
          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10" icon={<Send size={18} />} />
       </div>
    </div>
  );
}
