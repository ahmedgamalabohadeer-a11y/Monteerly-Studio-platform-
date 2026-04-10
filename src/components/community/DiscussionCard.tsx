'use client';
import React from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface DiscussionProps {
  author: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  image?: string;
}

export function DiscussionCard({ author, avatar, time, title, content, likes, comments, tags, image }: DiscussionProps) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-colors mb-4">
       <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
             <Avatar src={avatar} fallback={author[0]} />
             <div>
                <h4 className="font-bold text-white text-sm">{author}</h4>
                <p className="text-xs text-slate-500">{time}</p>
             </div>
          </div>
          <button className="text-slate-500 hover:text-white"><MoreHorizontal size={16} /></button>
       </div>
       
       <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
       <p className="text-slate-300 text-sm leading-relaxed mb-4">{content}</p>
       
       {image && (
          <div className="mb-4 rounded-lg overflow-hidden border border-white/5">
             <img src={image} alt="Discussion Attachment" className="w-full h-auto object-cover" />
          </div>
       )}
       
       <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
             <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-indigo-300">#{tag}</span>
          ))}
       </div>
       
       <div className="flex items-center gap-6 border-t border-white/5 pt-3">
          <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors">
             <Heart size={16} /> {likes}
          </button>
          <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors">
             <MessageSquare size={16} /> {comments}
          </button>
          <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors ml-auto">
             <Share2 size={16} /> مشاركة
          </button>
       </div>
    </div>
  );
}
