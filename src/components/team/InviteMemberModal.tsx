'use client';
import React, { useState } from 'react';
import { Mail, UserPlus, Link, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteMemberModal({ isOpen, onClose }: Props) {
  const [role, setRole] = useState('editor');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95">
       <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-3 bg-primary/10 rounded-full text-primary"><UserPlus size={24} /></div>
             <div>
                <h3 className="font-bold text-lg">دعوة أعضاء للفريق</h3>
                <p className="text-sm text-muted-foreground">أضف متعاونين لمشروعك.</p>
             </div>
          </div>

          <div className="space-y-4 mb-6">
             <Input label="البريد الإلكتروني" placeholder="colleague@example.com" icon={<Mail size={16} />} />
             
             <div className="space-y-2">
                <label className="text-sm font-bold">الصلاحية (الدور)</label>
                <div className="grid grid-cols-3 gap-2">
                   <RoleBtn id="viewer" label="مشاهد" desc="عرض فقط" current={role} set={setRole} />
                   <RoleBtn id="editor" label="محرر" desc="تعديل ورفع" current={role} set={setRole} />
                   <RoleBtn id="admin" label="مدير" desc="تحكم كامل" current={role} set={setRole} />
                </div>
             </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted rounded-xl border border-border mb-6">
             <Link size={16} className="text-muted-foreground" />
             <input value="https://monteerly.com/invite/x8z..." readOnly className="flex-1 bg-transparent text-sm outline-none text-muted-foreground" />
             <button 
                onClick={() => { navigator.clipboard.writeText('...'); setCopied(true); }}
                className="text-xs font-bold text-primary hover:underline"
             >
                {copied ? 'تم النسخ' : 'نسخ الرابط'}
             </button>
          </div>

          <div className="flex justify-end gap-3">
             <Button variant="ghost" onClick={onClose}>إلغاء</Button>
             <Button variant="primary" onClick={onClose} icon={<UserPlus size={16} />}>إرسال الدعوة</Button>
          </div>
       </div>
    </div>
  );
}

function RoleBtn({ id, label, desc, current, set }: any) {
    const active = current === id;
    return (
        <button 
           onClick={() => set(id)}
           className={`p-2 rounded-lg border text-right transition-all ${active ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
        >
           <div className="font-bold text-sm">{label}</div>
           <div className="text-[10px] text-muted-foreground">{desc}</div>
        </button>
    )
}

################################################################################