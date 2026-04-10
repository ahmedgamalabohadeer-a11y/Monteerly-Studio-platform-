'use client';
import React, { useState } from 'react';
import { Search, PlayCircle } from 'lucide-react';

export function TranscriptSearch() {
  const [query, setQuery] = useState('');
  
  const results = [
    { id: 1, time: '00:04:12', text: 'أعتقد أن الموقع الأفضل للتصوير هو ...', match: true },
    { id: 2, time: '00:15:30', text: 'هل يمكننا تغيير الإضاءة هنا؟', match: false },
    { id: 3, time: '00:18:45', text: 'نحتاج للذهاب إلى المطعم الآن.', match: true },
  ];

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
       <div className="p-4 border-b border-border">
          <h3 className="font-bold text-sm mb-3">البحث في الحوار (AI Transcript)</h3>
          <div className="relative">
             <Search className="absolute right-3 top-2.5 text-muted-foreground" size={16} />
             <input 
                className="w-full bg-muted rounded-lg py-2 pr-9 pl-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="ابحث عن كلمة منطوقة..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
             />
          </div>
       </div>

       <div className="flex-1 overflow-y-auto">
          {query && (
             <div className="p-2 space-y-1">
                <p className="text-xs text-muted-foreground px-2 py-1">تم العثور على 2 تطابق:</p>
                {results.filter(r => r.match).map((res) => (
                   <div key={res.id} className="p-3 rounded-lg hover:bg-primary/5 cursor-pointer border border-transparent hover:border-primary/20 group">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-xs font-bold font-mono text-primary bg-primary/10 px-1.5 rounded">{res.time}</span>
                         <PlayCircle size={14} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm leading-snug">
                         ...{res.text.replace('المطعم', 'MARK_STARTالمطعمMARK_END').split('MARK_START').map((part, i) => 
                            i === 1 ? <span key={i} className="bg-yellow-200 text-black px-0.5 rounded font-bold">{part.split('MARK_END')[0]}</span> : part
                         )}...
                      </p>
                   </div>
                ))}
             </div>
          )}
          
          {!query && (
             <div className="p-8 text-center text-muted-foreground text-sm">
                اكتب أي كلمة قيلت في الفيديو للبحث عنها والقفز إليها فوراً.
             </div>
          )}
       </div>
    </div>
  );
}
