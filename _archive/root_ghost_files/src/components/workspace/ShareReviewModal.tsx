'use client';
import React, { useState } from 'react';
import { Link2, Lock, Eye, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export function ShareReviewModal({ isOpen, onClose, projectTitle }: Props) {
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const link = `monteerly.com/review/${projectTitle.replace(/\s+/g, '-').toLowerCase()}/x8z9`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
       <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border">
          <div className="mb-6">
             <h3 className="text-lg font-bold flex items-center gap-2">
                <Link2 className="text-primary" /> مشاركة رابط للمراجعة
             </h3>
             <p className="text-sm text-muted-foreground">أنشئ رابطاً للضيوف لمشاهدة المشروع والتعليق عليه دون تسجيل دخول.</p>
          </div>

          <div className="space-y-6 mb-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-muted rounded"><Lock size={16} /></div>
                   <div className="text-sm">
                      <span className="font-bold block">حماية بكلمة مرور</span>
                      <span className="text-xs text-muted-foreground">يتطلب كود للدخول</span>
                   </div>
                </div>
                <Switch checked={passwordEnabled} onChange={setPasswordEnabled} />
             </div>
             
             {passwordEnabled && (
                <Input placeholder="أدخل كلمة المرور..." type="password" className="mt-2" />
             )}

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-muted rounded"><Eye size={16} /></div>
                   <div className="text-sm">
                      <span className="font-bold block">السماح بالتحميل</span>
                      <span className="text-xs text-muted-foreground">يمكن للضيف تحميل الفيديو الأصلي</span>
                   </div>
                </div>
                <Switch checked={downloadEnabled} onChange={setDownloadEnabled} />
             </div>
          </div>

          <div className="bg-muted p-3 rounded-xl border border-border flex items-center gap-2">
             <input value={link} readOnly className="flex-1 bg-transparent text-sm outline-none text-muted-foreground truncate" />
             <Button 
                size="sm" 
                variant={copied ? "primary" : "outline"} 
                onClick={handleCopy}
                icon={copied ? <Check size={14} /> : <Copy size={14} />}
             >
                {copied ? 'منسوخ' : 'نسخ'}
             </Button>
          </div>

          <div className="flex justify-end mt-6">
             <Button variant="ghost" onClick={onClose}>تم</Button>
          </div>
       </div>
    </div>
  );
}

################################################################################