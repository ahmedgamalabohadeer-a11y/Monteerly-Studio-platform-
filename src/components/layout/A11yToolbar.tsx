'use client';
import React, { useState, useEffect } from 'react';
import { Eye, Type, Contrast, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function A11yToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100); // Percentage
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Apply Font Size
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // Apply High Contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <div className="fixed top-1/2 right-0 z-[9990] transform -translate-y-1/2">
       {/* Toggle Button */}
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="bg-primary text-white p-2 rounded-l-lg shadow-lg hover:bg-primary/90 transition-all"
         aria-label="Accessibility Tools"
       >
          <Eye size={20} />
       </button>

       {/* Tools Panel */}
       {isOpen && (
          <div className="absolute right-full top-0 mr-2 bg-card border border-border p-4 rounded-xl shadow-2xl w-64 animate-in slide-in-from-right-4">
             <h3 className="font-bold mb-4 flex items-center gap-2"><Eye size={16} /> تسهيلات الاستخدام</h3>
             
             <div className="space-y-4">
                {/* Font Size Control */}
                <div>
                   <label className="text-xs font-bold mb-2 block flex items-center gap-1"><Type size={12} /> حجم النص</label>
                   <div className="flex items-center justify-between bg-muted rounded-lg p-1">
                      <Button size="sm" variant="ghost" onClick={() => setFontSize(Math.max(80, fontSize - 10))}><Minus size={14} /></Button>
                      <span className="text-xs font-mono">{fontSize}%</span>
                      <Button size="sm" variant="ghost" onClick={() => setFontSize(Math.min(150, fontSize + 10))}><Plus size={14} /></Button>
                   </div>
                </div>

                {/* Contrast Control */}
                <div className="flex items-center justify-between">
                   <label className="text-xs font-bold flex items-center gap-1"><Contrast size={12} /> تباين عالي</label>
                   <input 
                      type="checkbox" 
                      checked={highContrast} 
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="accent-primary w-4 h-4"
                   />
                </div>
                
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => { setFontSize(100); setHighContrast(false); }}>
                   إعادة تعيين
                </Button>
             </div>
          </div>
       )}
    </div>
  );
}

################################################################################