'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Mail, UserPlus, Link, Check, Shield, Eye, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type RoleType = 'viewer' | 'editor' | 'admin';

interface RoleBtnProps {
  id: RoleType;
  label: string;
  desc: string;
  icon: React.ReactNode;
  current: RoleType;
  set: React.Dispatch<React.SetStateAction<RoleType>>;
}

const inviteRoles: Array<{
  id: RoleType;
  label: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'viewer',
    label: 'مشاهد',
    desc: 'عرض فقط',
    icon: <Eye size={14} />,
  },
  {
    id: 'editor',
    label: 'محرر',
    desc: 'تعديل ورفع',
    icon: <Pencil size={14} />,
  },
  {
    id: 'admin',
    label: 'مدير',
    desc: 'تحكم كامل',
    icon: <Shield size={14} />,
  },
];

export function InviteMemberModal({ isOpen, onClose }: Props) {
  const [role, setRole] = useState<RoleType>('editor');
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const inviteLink = useMemo(
    () => 'https://monteerly.com/invite/x8z-team-access',
    []
  );

  const resetForm = useCallback(() => {
    setEmail('');
    setRole('editor');
    setCopied(false);
    setSending(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [copied]);

  const selectedRoleMeta = useMemo(
    () => inviteRoles.find((item) => item.id === role),
    [role]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleInvite = async () => {
    setSending(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-member-title"
        aria-describedby="invite-member-description"
        className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <UserPlus size={24} />
            </div>
            <div>
              <h3 id="invite-member-title" className="font-bold text-lg">
                دعوة أعضاء للفريق
              </h3>
              <p
                id="invite-member-description"
                className="text-sm text-muted-foreground"
              >
                أضف متعاونين لمشروعك وحدد مستوى الوصول المناسب لكل عضو.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="إغلاق نافذة الدعوة"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            label="البريد الإلكتروني"
            placeholder="colleague@example.com"
            icon={<Mail size={16} />}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <div className="text-xs text-muted-foreground mb-1">
              الدور المحدد حالياً
            </div>
            <div className="flex items-center gap-2 text-sm font-bold">
              {selectedRoleMeta?.icon}
              <span>{selectedRoleMeta?.label}</span>
              <span className="text-xs font-normal text-muted-foreground">
                — {selectedRoleMeta?.desc}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">الصلاحية (الدور)</label>
            <div className="grid grid-cols-3 gap-2">
              {inviteRoles.map((item) => (
                <RoleBtn
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  desc={item.desc}
                  icon={item.icon}
                  current={role}
                  set={setRole}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/40 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Link size={16} className="text-muted-foreground" />
            <span className="text-sm font-bold">رابط دعوة مباشر</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border">
            <input
              value={inviteLink}
              readOnly
              className="flex-1 bg-transparent text-sm outline-none text-muted-foreground"
              aria-label="رابط دعوة الفريق"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-bold text-primary hover:underline whitespace-nowrap"
            >
              {copied ? 'تم النسخ' : 'نسخ الرابط'}
            </button>
          </div>

          <p className="text-[11px] text-muted-foreground mt-2">
            مناسب للدعوات السريعة عند العمل مع مستقلين أو مراجعين خارجيين.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={handleClose}>
            إلغاء
          </Button>
          <Button
            variant="primary"
            onClick={handleInvite}
            disabled={!email.trim() || sending}
            icon={sending ? <Check size={16} /> : <UserPlus size={16} />}
          >
            {sending ? 'جارٍ الإرسال...' : 'إرسال الدعوة'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function RoleBtn({
  id,
  label,
  desc,
  icon,
  current,
  set,
}: RoleBtnProps) {
  const active = current === id;

  return (
    <button
      type="button"
      onClick={() => set(id)}
      className={`p-3 rounded-lg border text-right transition-all ${
        active
          ? 'border-primary bg-primary/5 ring-1 ring-primary'
          : 'border-border hover:border-primary/50'
      }`}
      aria-pressed={active}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="font-bold text-sm">{label}</div>
        <div className={active ? 'text-primary' : 'text-muted-foreground'}>
          {icon}
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground">{desc}</div>
    </button>
  );
}
