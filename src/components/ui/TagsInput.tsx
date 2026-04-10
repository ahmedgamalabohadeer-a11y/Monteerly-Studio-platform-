'use client';
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagsInputProps {
  label?: string;
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagsInput({ label, placeholder = "اضغط Enter للإضافة...", tags, onChange }: TagsInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
       {label && <label className="text-sm font-medium">{label}</label>}
       
       <div className="flex flex-wrap gap-2 p-2 bg-background border border-input rounded-xl focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
          {tags.map((tag) => (
             <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={14} /></button>
             </span>
          ))}
          
          <input 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder={tags.length === 0 ? placeholder : ""}
             className="flex-1 bg-transparent outline-none text-sm min-w-[120px] h-8"
          />
       </div>
       <p className="text-[10px] text-muted-foreground">اكتب المهارة ثم اضغط Enter</p>
    </div>
  );
}
