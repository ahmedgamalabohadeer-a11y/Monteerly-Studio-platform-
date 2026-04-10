'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ items }: { items: AccordionItemProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
       {items.map((item, index) => (
          <div key={index} className="border border-border rounded-xl overflow-hidden bg-card">
             <button 
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 text-left font-bold hover:bg-muted/50 transition-colors"
             >
                {item.title}
                <ChevronDown 
                   size={18} 
                   className={`text-muted-foreground transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
             </button>
             <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
             >
                <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-transparent">
                   {item.children}
                </div>
             </div>
          </div>
       ))}
    </div>
  );
}
