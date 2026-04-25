'use client';
import React from 'react';
import { Image as ImageIcon, Video, Smile, Send } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function CreatePost() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4 mb-6">
       <div className="flex gap-3 mb-3">
          <Avatar src="/avatars/mohamed.jpg" fallback="ME" />
          <textarea 
            placeholder="شارك مشروعك الجديد، أو اطلب نصيحة من المجتمع..." 
            className="flex-1 bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none resize-none h-20"
          />
       </div>
       <div className="flex justify-between items-center">
          <div className="flex gap-2">
             <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"><ImageIcon size={18}/></button>
             <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Video size={18}/></button>
             <button className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"><Smile size={18}/></button>
          </div>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">
             نشر <Send size={14} className="ml-2"/>
          </Button>
       </div>
    </div>
  );
}

