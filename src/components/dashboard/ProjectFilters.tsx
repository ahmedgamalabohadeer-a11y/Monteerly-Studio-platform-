'use client';
import React from 'react';
import { Archive, CheckCircle, PlayCircle, Grid, List } from 'lucide-react';

interface FilterProps {
  activeTab: 'active' | 'completed' | 'archived';
  onTabChange: (tab: 'active' | 'completed' | 'archived') => void;
  viewMode: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ProjectFilters({ activeTab, onTabChange, viewMode, onViewChange }: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      
      {/* Tabs */}
      <div className="flex p-1 bg-muted/50 rounded-xl border border-border w-full sm:w-auto">
        <button
          onClick={() => onTabChange('active')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <PlayCircle size={16} /> نشطة
        </button>
        <button
          onClick={() => onTabChange('completed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'completed' ? 'bg-white shadow-sm text-emerald-600' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <CheckCircle size={16} /> مكتملة
        </button>
        <button
          onClick={() => onTabChange('archived')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'archived' ? 'bg-white shadow-sm text-orange-600' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Archive size={16} /> الأرشيف
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border">
         <button 
           onClick={() => onViewChange('grid')}
           className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
         >
            <Grid size={18} />
         </button>
         <button 
           onClick={() => onViewChange('list')}
           className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
         >
            <List size={18} />
         </button>
      </div>
    </div>
  );
}
