'use client';
import React from 'react';
import { FileText, Trash, Edit, LogIn } from 'lucide-react';

export function ActivityLog() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
       <div className="p-4 bg-muted/10 border-b border-border">
          <h3 className="font-bold text-sm">سجل النشاطات (Audit Log)</h3>
       </div>

       <div className="divide-y divide-border">
          <LogItem 
             action="قام بتسجيل الدخول" 
             user="أحمد جمال" 
             time="الآن" 
             icon={LogIn} 
             color="text-emerald-500" 
          />
          <LogItem 
             action="حذف ملف 'Intro_v1.mp4'" 
             user="سارة محمد" 
             time="منذ 15 دقيقة" 
             icon={Trash} 
             color="text-red-500" 
          />
          <LogItem 
             action="تعديل ميزانية مشروع 'Pepsi'" 
             user="Admin" 
             time="منذ ساعتين" 
             icon={Edit} 
             color="text-blue-500" 
          />
          <LogItem 
             action="إنشاء عقد جديد" 
             user="أحمد جمال" 
             time="أمس، 04:30 م" 
             icon={FileText} 
             color="text-purple-500" 
          />
       </div>
    </div>
  );
}

function LogItem({ action, user, time, icon: Icon, color }: unknown) {
   return (
      <div className="p-4 flex items-center gap-4 text-sm hover:bg-muted/5 transition-colors">
         <Icon size={16} className={color} />
         <div className="flex-1">
            <span className="font-bold">{user}</span> <span className="text-muted-foreground">{action}</span>
         </div>
         <div className="text-xs text-muted-foreground font-mono">{time}</div>
      </div>
   );
}

