'use client'
import React, { useMemo, useState } from 'react'
import { Copy, Check, X, Share2, Mail, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ShareProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

interface ShareBtnProps {
  icon: LucideIcon
  color: string
  label: string
  href: string
}

const FacebookIcon: LucideIcon = Share2
const TwitterIcon: LucideIcon = Share2
const LinkedinIcon: LucideIcon = Share2

export function SocialShare({ isOpen, onClose, url, title }: ShareProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = useMemo(
    () => ({
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`,
    }),
    [title, url]
  )

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-share-title"
        className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl border border-border relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق نافذة المشاركة"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h3 id="social-share-title" className="font-bold text-lg mb-1 flex items-center gap-2">
          <Share2 size={20} className="text-primary" />
          مشاركة المحتوى
        </h3>

        <p className="text-sm text-muted-foreground mb-6">
          شارك <strong>{title}</strong> مع شبكتك.
        </p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <ShareBtn
            icon={FacebookIcon}
            color="bg-blue-600"
            label="Facebook"
            href={shareLinks.facebook}
          />
          <ShareBtn
            icon={TwitterIcon}
            color="bg-sky-500"
            label="Twitter"
            href={shareLinks.twitter}
          />
          <ShareBtn
            icon={LinkedinIcon}
            color="bg-blue-700"
            label="LinkedIn"
            href={shareLinks.linkedin}
          />
          <ShareBtn
            icon={Mail}
            color="bg-slate-500"
            label="Email"
            href={shareLinks.email}
          />
        </div>

        <div className="flex items-center gap-2 p-2 bg-muted rounded-xl border border-border">
          <input
            value={url}
            readOnly
            aria-label="رابط المشاركة"
            className="flex-1 bg-transparent text-sm outline-none px-2 text-muted-foreground"
          />
          <Button
            size="sm"
            variant={copied ? 'primary' : 'outline'}
            onClick={copyToClipboard}
            icon={copied ? <Check size={14} /> : <Copy size={14} />}
          >
            {copied ? 'منسوخ' : 'نسخ'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function ShareBtn({ icon: Icon, color, label, href }: ShareBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group"
      aria-label={`مشاركة عبر ${label}`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${color}`}
      >
        <Icon size={20} />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </a>
  )
}
