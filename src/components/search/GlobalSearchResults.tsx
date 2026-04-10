'use client';
import React, { useState } from 'react';
import { Search, File, Folder, User, Layout, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function GlobalSearchResults() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="container mx-auto p-6 max-w-5xl">
       <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
             <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
             <input 
                className="w-full bg-card border border-border rounded-xl py-3 pr-10 pl-4 text-lg outline-none focus:ring-2 focus:ring-primary"
                defaultValue="إعلان رمضان"
                placeholder="ابحث في كل شيء..."
             />
          </div>
          <Button variant="outline" icon={<Filter size={18} />}>تصفية</Button>
       </div>

       <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto pb-1">
          <TabButton label="الكل" id="all" active={activeTab} onClick={setActiveTab} />
          <TabButton label="المشاريع (3)" id="projects" active={activeTab} onClick={setActiveTab} />
          <TabButton label="الملفات (12)" id="files" active={activeTab} onClick={setActiveTab} />
          <TabButton label="الأعضاء (1)" id="people" active={activeTab} onClick={setActiveTab} />
       </div>

       <div className="space-y-4">
          {/* Project Result */}
          <ResultItem 
             icon={Layout} 
             title="مشروع إعلان رمضان 2026" 
             path="المشاريع > العملاء > بيبسي" 
             meta="تم التحديث منذ يومين" 
             type="project"
          />
          
          {/* File Result */}
          <ResultItem 
             icon={File} 
             title="Ramadan_Logo_Reveal.aep" 
             path="المشاريع > إعلان رمضان > Assets > Graphics" 
             meta="After Effects • 24 MB" 
             type="file"
          />
          
          {/* Folder Result */}
          <ResultItem 
             icon={Folder} 
             title="Music Tracks" 
             path="المكتبة العامة > صوتيات" 
             meta="54 عنصر" 
             type="folder"
          />
          
          {/* User Result */}
          <ResultItem 
             icon={User} 
             title="أحمد محمد (Colorist)" 
             path="فريق العمل" 
             meta="متصل الآن" 
             type="user"
          />
       </div>
    </div>
  );
}

function TabButton({ label, id, active, onClick }: any) {
    return (
        <button 
           onClick={() => onClick(id)}
           className={`px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${active === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
           {label}
        </button>
    )
}

function ResultItem({ icon: Icon, title, path, meta, type }: any) {
    return (
        <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group">
           <div className="p-3 bg-muted/50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Icon size={24} />
           </div>
           <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1 font-mono bg-muted/30 w-fit px-2 py-0.5 rounded">
                 {path}
              </p>
              <p className="text-xs text-muted-foreground">{meta}</p>
           </div>
        </div>
    )
}
