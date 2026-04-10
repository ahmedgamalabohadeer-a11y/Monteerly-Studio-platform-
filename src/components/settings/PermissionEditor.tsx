'use client';
import React from 'react';
import { Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch'; // نفترض وجوده مسبقاً

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}

export function PermissionEditor({ isOpen, onClose, roleName }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
       <div className="bg-card w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-border">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-primary/10 rounded-lg text-primary"><Shield size={24} /></div>
             <div>
                <h3 className="font-bold text-lg">تعديل صلاحيات: {roleName}</h3>
                <p className="text-xs text-muted-foreground">حدد ما يمكن لهذا الدور القيام به في مساحة العمل.</p>
             </div>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-6 pr-2">
             <PermissionGroup title="المشاريع والملفات">
                <PermRow label="إنشاء مشاريع جديدة" checked={true} />
                <PermRow label="رفع ملفات" checked={true} />
                <PermRow label="حذف ملفات (Danger)" checked={false} />
             </PermissionGroup>

             <PermissionGroup title="المالية والعقود">
                <PermRow label="مشاهدة الفواتير" checked={true} />
                <PermRow label="سحب الأرباح" checked={false} />
                <PermRow label="توقيع عقود جديدة" checked={false} />
             </PermissionGroup>
             
             <PermissionGroup title="إدارة الفريق">
                <PermRow label="دعوة أعضاء جدد" checked={false} />
             </PermissionGroup>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
             <Button variant="ghost" onClick={onClose}>إلغاء</Button>
             <Button variant="primary" icon={<Save size={16} />} onClick={onClose}>حفظ التغييرات</Button>
          </div>
       </div>
    </div>
  );
}

function PermissionGroup({ title, children }: any) {
    return (
        <div className="space-y-3">
            <h4 className="font-bold text-sm text-muted-foreground bg-muted/30 p-2 rounded">{title}</h4>
            {children}
        </div>
    )
}

function PermRow({ label, checked }: any) {
    return (
        <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium">{label}</span>
            <Switch checked={checked} onChange={() => {}} />
        </div>
    )
}
