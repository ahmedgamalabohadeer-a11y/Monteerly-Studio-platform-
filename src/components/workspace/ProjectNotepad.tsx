'use client';
import React, { useState, useEffect } from 'react';
import { StickyNote, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProjectNotepad() {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setSaved(true);
  };

  return (
    <div className="bg-yellow-50/50 border border-yellow-200 rounded-xl h-full flex flex-col w-64">
       <div className="p-3 border-b border-yellow-200 flex justify-between items-center bg-yellow-100/50">
          <div className="flex items-center gap-2 text-yellow-800">
             <StickyNote size={16} />
             <h3 className="font-bold text-sm">مفكرة المشروع</h3>
          </div>
          {!saved && <span className="text-[10px] text-yellow-600 animate-pulse">غير محفوظ...</span>}
       </div>

       <textarea 
          className="flex-1 bg-transparent p-3 text-sm resize-none outline-none text-yellow-900 placeholder:text-yellow-700/50 leading-relaxed font-medium"
          placeholder="اكتب ملاحظات سريعة هنا..."
          value={note}
          onChange={handleChange}
       />

       <div className="p-2 border-t border-yellow-200 flex justify-end">
          <Button 
             size="sm" 
             variant="ghost" 
             className="text-yellow-800 hover:bg-yellow-200 h-8 text-xs"
             onClick={handleSave}
             disabled={saved}
             icon={<Save size={14} />}
          >
             حفظ
          </Button>
       </div>
    </div>
  );
}

################################################################################