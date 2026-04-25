'use client';
import React, { useState } from 'react';
import { Mail, Smartphone } from 'lucide-react';

export function NotificationPrefs() {
  const [prefs, setPrefs] = useState({
    email_projects: true,
    email_marketing: false,
    push_messages: true,
  });

  const Toggle = ({ checked, onChange }: any) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-primary' : 'bg-gray-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );

  return (
    <div className="space-y-6">
       <h3 className="text-lg font-bold">تفضيلات التنبيهات</h3>
       
       <div className="space-y-4 divide-y divide-border">
          <div className="flex justify-between items-center pt-4 first:pt-0">
             <div className="flex gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit"><Mail size={18} /></div>
                <div>
                   <p className="font-bold text-sm">تحديثات المشاريع (Email)</p>
                   <p className="text-xs text-muted-foreground">عند استلام عرض جديد أو رسالة.</p>
                </div>
             </div>
             <Toggle checked={prefs.email_projects} onChange={(v:boolean) => setPrefs({...prefs, email_projects: v})} />
          </div>

          <div className="flex justify-between items-center pt-4">
             <div className="flex gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg h-fit"><Smartphone size={18} /></div>
                <div>
                   <p className="font-bold text-sm">إشعارات التطبيق (Push)</p>
                   <p className="text-xs text-muted-foreground">تنبيهات فورية على المتصفح.</p>
                </div>
             </div>
             <Toggle checked={prefs.push_messages} onChange={(v:boolean) => setPrefs({...prefs, push_messages: v})} />
          </div>
       </div>
    </div>
  );
}

