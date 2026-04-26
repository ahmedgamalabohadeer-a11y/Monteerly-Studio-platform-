"use client";
import { useState } from "react";

export default function MessagesPage() {
  const [selected, setSelected] = useState(0);
  const contacts = [
    { id: 0, name: "فريق الدعم", msg: "مرحباً، كيف يمكننا مساعدتك؟", time: "الآن", active: true },
    { id: 1, name: "أحمد محمد", msg: "تم تسليم الملفات المطلوبة.", time: "10:30 ص", active: false },
    { id: 2, name: "Sarah Smith", msg: "Can we reschedule?", time: "أمس", active: false },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex rounded-2xl border border-border bg-card overflow-hidden">
      {/* Sidebar List */}
      <div className="w-80 border-l border-border bg-muted/20 flex flex-col">
        <div className="p-4 border-b border-border font-bold">الرسائل</div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((c) => (
            <div 
              key={c.id} 
              onClick={() => setSelected(c.id)}
              className={`p-4 border-b border-border/50 cursor-pointer hover:bg-accent/50 transition-colors ${selected === c.id ? "bg-accent" : ""}`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-sm">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{c.msg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background/50">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            {contacts[selected].name.charAt(0)}
          </div>
          <span className="font-bold">{contacts[selected].name}</span>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-2xl rounded-tr-none max-w-sm text-sm">
              {contacts[selected].msg}
            </div>
          </div>
           <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tl-none max-w-sm text-sm">
              شكراً لك، سأقوم بالمراجعة.
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <input type="text" placeholder="اكتب رسالتك..." className="w-full p-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
    </div>
  );
}
