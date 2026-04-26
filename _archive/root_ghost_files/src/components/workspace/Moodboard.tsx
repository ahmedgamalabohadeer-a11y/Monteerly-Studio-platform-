'use client';
import React from 'react';
import Image from 'next/image';
import { Plus, Image as ImageIcon, Palette, Type } from 'lucide-react';

export function Moodboard() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
       <div className="flex justify-between items-center mb-8">
          <div>
             <h2 className="text-2xl font-bold font-heading">Moodboard: Project Alpha</h2>
             <p className="text-muted-foreground text-sm">التوجه البصري والفني للمشروع</p>
          </div>
          <div className="flex gap-2">
             <ToolBtn icon={ImageIcon} label="صورة" />
             <ToolBtn icon={Palette} label="لون" />
             <ToolBtn icon={Type} label="نص" />
          </div>
       </div>

       {/* Masonry Grid Simulation */}
       <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <MoodItem type="image" src="/images/ref1.jpg" caption="الإضاءة السينمائية المطلوبة" />
          <MoodItem type="color" color="#FF5733" caption="لون التوكيد الرئيسي" />
          <MoodItem type="text" content="الجو العام: غامض، سريع، تقني." caption="نغمة الفيديو" />
          <MoodItem type="image" src="/images/ref2.jpg" caption="زاوية التصوير المقترحة" />
          <MoodItem type="color" color="#1A1A2E" caption="لون الخلفية" />
          
          {/* Add Placeholder */}
          <div className="border-2 border-dashed border-border rounded-xl h-48 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/10 transition-colors">
             <Plus size={32} />
             <span className="text-sm font-bold mt-2">إضافة عنصر</span>
          </div>
       </div>
    </div>
  );
}

function ToolBtn({ icon: Icon, label }: any) {
    return (
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg shadow-sm hover:bg-muted transition-colors text-sm font-bold">
            <Icon size={16} /> {label}
        </button>
    )
}

function MoodItem({ type, src, color, content, caption }: any) {
    return (
        <div className="break-inside-avoid bg-white p-3 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow group">
            {type === 'image' && (
               <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-slate-200">
                  <Image src={src || ''} alt="Mood" fill className="object-cover" />
               </div>
            )}
            {type === 'color' && (
               <div className="h-24 rounded-lg mb-2 shadow-inner" style={{ backgroundColor: color }} />
            )}
            {type === 'text' && (
               <div className="p-4 bg-muted/20 rounded-lg mb-2 text-sm font-serif italic text-center">
                  "{content}"
               </div>
            )}
            <p className="text-xs text-muted-foreground font-medium text-center">{caption}</p>
        </div>
    )
}

################################################################################