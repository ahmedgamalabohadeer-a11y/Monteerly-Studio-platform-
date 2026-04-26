'use client';
import React from 'react';
import { UploadCloud, UserPlus, FolderPlus, Film } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProjectEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
       <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <Film size={48} className="text-primary" />
       </div>

       <h2 className="text-3xl font-black font-heading mb-3">ابدأ رحلتك الإبداعية</h2>
       <p className="text-muted-foreground max-w-md mb-10 text-lg">
          هذا المشروع فارغ حالياً. قم بإضافة ملفاتك أو دعوة فريقك لبدء السحر.
       </p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <ActionCard 
             icon={UploadCloud} 
             title="رفع ملفات" 
             desc="فيديو، صوت، صور" 
             primary 
          />
          <ActionCard 
             icon={UserPlus} 
             title="دعوة الفريق" 
             desc="تعاون لحظي" 
          />
          <ActionCard 
             icon={FolderPlus} 
             title="إنشاء مجلدات" 
             desc="تنظيم المكتبة" 
          />
       </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, primary }: any) {
    return (
        <button className={`flex flex-col items-center p-6 rounded-xl border transition-all hover:scale-105 hover:shadow-lg group ${primary ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' : 'bg-card border-border hover:border-primary/50'}`}>
            <div className={`p-3 rounded-full mb-3 ${primary ? 'bg-white/20' : 'bg-muted group-hover:bg-primary/10 group-hover:text-primary'}`}>
               <Icon size={24} />
            </div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className={`text-sm ${primary ? 'text-white/80' : 'text-muted-foreground'}`}>{desc}</p>
        </button>
    )
}

