'use client';
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface PostProps {
  author: string;
  role: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

export function PostCard({ author, role, avatar, time, content, image, likes: initialLikes, comments }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4 mb-4 hover:border-white/20 transition-all">
       {/* Header */}
       <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
             <Avatar src={avatar} fallback={author[0]} />
             <div>
                <h4 className="font-bold text-white text-sm hover:underline cursor-pointer">{author}</h4>
                <p className="text-[10px] text-slate-400">{role} • {time}</p>
             </div>
          </div>
          <button className="text-slate-500 hover:text-white"><MoreHorizontal size={16}/></button>
       </div>

       {/* Content */}
       <p className="text-sm text-slate-200 mb-3 leading-relaxed whitespace-pre-wrap">{content}</p>
       
       {image && (
          <div className="rounded-lg overflow-hidden mb-3 border border-white/5">
             <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[400px]" />
          </div>
       )}

       {/* Actions */}
       <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
          <div className="flex gap-6">
             <button 
               onClick={toggleLike}
               className={`flex items-center gap-2 text-xs font-bold transition-colors ${liked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-400'}`}
             >
                <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount}
             </button>
             <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors">
                <MessageCircle size={16} /> {comments}
             </button>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
             <Share2 size={16} /> مشاركة
          </button>
       </div>
    </div>
  );
}

################################################################################