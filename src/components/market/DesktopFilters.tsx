'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

export function DesktopFilters() {
  return (
    <aside className="w-64 hidden lg:block pr-6 space-y-8 border-r border-border h-[calc(100vh-100px)] overflow-y-auto sticky top-24">
       <div>
          <h3 className="font-bold text-lg mb-4">تصفية النتائج</h3>
          
          {/* Price Range */}
          <FilterSection title="نطاق السعر">
             <div className="flex gap-2 mb-2">
                <input type="number" placeholder="Min" className="w-full p-2 text-sm bg-muted rounded border border-transparent focus:border-primary outline-none" />
                <input type="number" placeholder="Max" className="w-full p-2 text-sm bg-muted rounded border border-transparent focus:border-primary outline-none" />
             </div>
             <input type="range" className="w-full accent-primary h-1 bg-muted rounded-lg appearance-none cursor-pointer" />
          </FilterSection>

          {/* Categories */}
          <FilterSection title="التصنيف">
             <Checkbox label="مونتاج فيديو (Video Editing)" count={120} />
             <Checkbox label="موشن جرافيك (Motion)" count={85} />
             <Checkbox label="تصحيح ألوان (Grading)" count={40} />
             <Checkbox label="هندسة صوتية (Audio)" count={32} />
          </FilterSection>

          {/* Software */}
          <FilterSection title="البرامج المستخدمة">
             <Checkbox label="Adobe Premiere" />
             <Checkbox label="After Effects" />
             <Checkbox label="DaVinci Resolve" />
             <Checkbox label="Final Cut Pro" />
          </FilterSection>

          {/* Rating */}
          <FilterSection title="تقييم البائع">
             <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                   <input type="radio" name="rating" className="accent-primary" /> 
                   <span>4 نجوم وأكثر</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                   <input type="radio" name="rating" className="accent-primary" /> 
                   <span>3 نجوم وأكثر</span>
                </label>
             </div>
          </FilterSection>
       </div>
    </aside>
  );
}

function FilterSection({ title, children }: unknown) {
    return (
        <div className="mb-6">
            <button className="flex justify-between items-center w-full font-bold text-sm mb-3 text-muted-foreground hover:text-foreground">
                {title} <ChevronDown size={14} />
            </button>
            <div className="space-y-2 pl-1 animate-in slide-in-from-top-1">
                {children}
            </div>
        </div>
    )
}

function Checkbox({ label, count }: unknown) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" />
                <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{label}</span>
            </div>
            {count && <span className="text-xs text-muted-foreground">{count}</span>}
        </label>
    )
}

