'use client';
import React, { useState } from 'react';
import { Tag, Check } from 'lucide-react';

export function LabelManager() {
  const [selectedLabel, setSelectedLabel] = useState('violet');

  const labels = [
    { id: 'violet', name: 'Violet', bg: 'bg-violet-500', hex: '#8b5cf6' },
    { id: 'iris', name: 'Iris', bg: 'bg-indigo-500', hex: '#6366f1' },
    { id: 'caribbean', name: 'Caribbean', bg: 'bg-emerald-500', hex: '#10b981' },
    { id: 'lavender', name: 'Lavender', bg: 'bg-fuchsia-400', hex: '#e879f9' },
    { id: 'cerulean', name: 'Cerulean', bg: 'bg-sky-500', hex: '#0ea5e9' },
    { id: 'forest', name: 'Forest', bg: 'bg-green-700', hex: '#15803d' },
    { id: 'rose', name: 'Rose', bg: 'bg-rose-500', hex: '#f43f5e' },
    { id: 'mango', name: 'Mango', bg: 'bg-orange-500', hex: '#f97316' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 w-60">
       <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <Tag size={16} className="text-muted-foreground" />
          <h3 className="font-bold text-xs uppercase text-muted-foreground">Color Labels</h3>
       </div>

       <div className="space-y-1">
          {labels.map((label) => (
             <button
                key={label.id}
                onClick={() => setSelectedLabel(label.id)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-muted/50 ${selectedLabel === label.id ? 'bg-muted' : ''}`}
             >
                <div className={`w-4 h-4 rounded-full ${label.bg} border border-white/10 shadow-sm`} />
                <span className="text-sm font-medium flex-1 text-left">{label.name}</span>
                {selectedLabel === label.id && <Check size={14} className="text-primary" />}
             </button>
          ))}
       </div>
    </div>
  );
}

################################################################################