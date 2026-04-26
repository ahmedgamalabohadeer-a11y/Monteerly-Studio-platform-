'use client';
import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieSettingsModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
       <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
          <div className="p-6 border-b border-border flex justify-between items-center">
             <div className="flex items-center gap-2">
                <Shield className="text-primary" />
                <h3 className="font-bold text-lg">تخصيص ملفات الارتباط</h3>
             </div>
             <button onClick={onClose}><X size={20} /></button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
             <p className="text-sm text-muted-foreground">
                نستخدم الكوكيز لتحسين تجربتك. يمكنك اختيار الأنواع التي تسمح بها أدناه.
             </p>

             <CookieGroup 
                title="ضرورية جداً (Essential)" 
                desc="مطلوبة لعمل الموقع (تسجيل الدخول، السلة). لا يمكن إيقافها." 
                required 
             />
             <CookieGroup 
                title="الأداء والتحليل (Analytics)" 
                desc="تساعدنا في فهم كيفية استخدامك للموقع لتحسينه." 
             />
             <CookieGroup 
                title="التسويق والإعلانات (Marketing)" 
                desc="تستخدم لعرض إعلانات تناسب اهتماماتك خارج المنصة." 
             />
          </div>

          <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/10">
             <Button variant="ghost" onClick={onClose}>إلغاء</Button>
             <Button variant="primary" onClick={onClose}>حفظ التفضيلات</Button>
          </div>
       </div>
    </div>
  );
}

function CookieGroup({ title, desc, required }: any) {
    const [enabled, setEnabled] = useState(required || false);
    
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                   {title}
                   {required && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">مطلوب</span>}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
            <Switch checked={enabled} onChange={setEnabled} disabled={required} />
        </div>
    )
}

################################################################################