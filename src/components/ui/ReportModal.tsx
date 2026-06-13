'use client'
import React, { useMemo, useState } from 'react'
import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'

interface ReportProps {
  isOpen: boolean
  onClose: () => void
  targetName: string
}

const REPORT_REASONS = [
  'محتوى مسروق أو ينتهك الحقوق',
  'احتيال أو خداع',
  'سلوك مسيء أو غير لائق',
  'بريد عشوائي (Spam)',
] as const

export function ReportModal({ isOpen, onClose, targetName }: ReportProps) {
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dialogTitleId = useMemo(
    () => `report-modal-title-${targetName.replace(/\s+/g, '-').toLowerCase()}`,
    [targetName]
  )

  const canSubmit = selectedReason.trim().length > 0 && !isSubmitting

  const handleClose = () => {
    setSelectedReason('')
    setDetails('')
    setIsSubmitting(false)
    onClose()
  }

  const handleSubmit = async () => {
    if (!canSubmit) return

    setIsSubmitting(true)

    try {
      const payload = {
        targetName,
        reason: selectedReason,
        details: details.trim() || null,
        submittedAt: new Date().toISOString(),
      }

      console.log('Report Submitted:', payload)
      alert('تم إرسال البلاغ بنجاح')
      handleClose()
    } catch (error) {
      console.error('Report submission failed:', error)
      alert('تعذر إرسال البلاغ حاليًا')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        className="bg-card w-full max-w-md rounded-2xl p-6 shadow-xl border border-border"
      >
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <Flag size={24} />
          <h3 id={dialogTitleId} className="font-bold text-lg">
            الإبلاغ عن محتوى
          </h3>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          أنت على وشك الإبلاغ عن <strong>{targetName}</strong>. يرجى تحديد السبب لمساعدة
          فريقنا في المراجعة.
        </p>

        <div className="space-y-4 mb-6">
          <label className="text-sm font-bold block">سبب البلاغ</label>

          <div className="space-y-2">
            {REPORT_REASONS.map((reason) => (
              <RadioOption
                key={reason}
                label={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
              />
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="report-details" className="text-sm font-bold block">
              تفاصيل إضافية
            </label>
            <Textarea
              id="report-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="أضف تفاصيل إضافية (اختياري)..."
              className="h-24"
            />
          </div>
        </div>

        <div className="rounded-xl bg-muted/40 border border-border p-3 mb-6 text-xs text-muted-foreground">
          سيتم إرسال سبب البلاغ والملاحظات المرتبطة به لمراجعتها داخليًا.
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleSubmit} disabled={!canSubmit}>
            {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال البلاغ'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
      <input
        type="radio"
        name="report_reason"
        checked={checked}
        onChange={onChange}
        className="accent-red-500 w-4 h-4"
      />
      <span className="text-sm">{label}</span>
    </label>
  )
}
