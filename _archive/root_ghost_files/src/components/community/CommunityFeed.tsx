'use client';
import React from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Filter } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function CommunityFeed() {
  const posts = [
    { 
      author: 'سارة علي', 
      role: 'Motion Designer',
      time: 'منذ ساعتين', 
      content: 'ما رأيكم في آخر مشروع قمت به باستخدام Blender؟ حاولت دمج الـ 2D مع 3D. النقد البناء مطلوب! 🎨', 
      image: '/images/features/ai-brain.jpg',
      tags: ['Blender', '3D', 'Showcase'],
      likes: 124,
      comments: 45 
    },
    { 
      author: 'خالد عمر', 
      role: 'Video Editor',
      time: 'منذ 5 ساعات', 
      content: 'هل يواجه أحد مشكلة في تصدير ProRes من النسخة الأخيرة لـ Premiere؟ الألوان تظهر باهتة.', 
      tags: ['Help', 'Premiere', 'Tech'],
      likes: 12,
      comments: 8 
    }
  ];

  return (
    <div className="space-y-6">
       {/* Composer */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex gap-4">
          <Avatar src="/avatars/ahmed.jpg" fallback="ME" />
          <div className="flex-1">
             <input 
               type="text" 
               placeholder="شارك شيئاً مع المجتمع... (سؤال، عمل، أو نصيحة)" 
               className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
             />
             <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                   <button className="text-xs text-slate-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-full">📷 صورة</button>
                   <button className="text-xs text-slate-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-full">🔗 رابط</button>
                </div>
                <Button size="sm" className="bg-white text-black hover:bg-slate-200">نشر</Button>
             </div>
          </div>
       </div>

       {/* Feed */}
       <div className="space-y-4">
          {posts.map((post, i) => (
             <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <Avatar src="/avatars/user.jpg" fallback={post.author[0]} />
                      <div>
                         <h4 className="font-bold text-white text-sm">{post.author}</h4>
                         <p className="text-[10px] text-slate-400">{post.role} • {post.time}</p>
                      </div>
                   </div>
                   <button className="text-slate-500 hover:text-white"><MoreHorizontal size={16} /></button>
                </div>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{post.content}</p>
                
                {post.image && (
                   <div className="mb-4 rounded-lg overflow-hidden border border-white/5">
                      <img src={post.image} alt="Post" className="w-full object-cover max-h-80" />
                   </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                   {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">#{tag}</span>
                   ))}
                </div>
                
                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                   <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors">
                      <Heart size={16} /> {post.likes}
                   </button>
                   <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                      <MessageSquare size={16} /> {post.comments}
                   </button>
                   <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors ml-auto">
                      <Share2 size={16} /> مشاركة
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################