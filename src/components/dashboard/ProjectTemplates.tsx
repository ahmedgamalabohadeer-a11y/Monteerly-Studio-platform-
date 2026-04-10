'use client';
import React from 'react';
import { Plus, Youtube, Instagram, Briefcase, Video } from 'lucide-react';

export function ProjectTemplates() {
  return (
    <div className="mb-8">
       <h3 className="font-bold text-lg mb-4">ابدأ مشروعاً جديداً</h3>
       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Blank */}
          <TemplateCard 
             icon={Plus} 
             title="مشروع فارغ" 
             color="bg-primary text-white" 
             isNew 
          />
          
          {/* YouTube */}
          <TemplateCard 
             icon={Youtube} 
             title="YouTube Video" 
             desc="16:9 • 4K"
             color="bg-red-50 text-red-600 hover:border-red-200" 
          />

          {/* Reels */}
          <TemplateCard 
             icon={Instagram} 
             title="Reels / TikTok" 
             desc="9:16 • Vertical"
             color="bg-pink-50 text-pink-600 hover:border-pink-200" 
          />

          {/* Corporate */}
          <TemplateCard 
             icon={Briefcase} 
             title="عرض شركات" 
             desc="Slideshow Ready"
             color="bg-blue-50 text-blue-600 hover:border-blue-200" 
          />

          {/* Podcast */}
          <TemplateCard 
             icon={Video} 
             title="Video Podcast" 
             desc="Multi-Cam Sync"
             color="bg-purple-50 text-purple-600 hover:border-purple-200" 
          />
       </div>
    </div>
  );
}

function TemplateCard({ icon: Icon, title, desc, color, isNew }: any) {
    return (
        <div className={`p-4 border border-border rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-center items-center text-center h-32 relative group bg-card ${!isNew && 'hover:bg-muted/20'}`}>
            <div className={`p-3 rounded-full mb-2 transition-transform group-hover:scale-110 ${color}`}>
                <Icon size={24} />
            </div>
            <h4 className="font-bold text-sm">{title}</h4>
            {desc && <p className="text-[10px] text-muted-foreground mt-1">{desc}</p>}
        </div>
    )
}
