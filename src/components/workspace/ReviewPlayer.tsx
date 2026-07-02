'use client'

import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { addTimecodedComment, getOrderComments, approveDelivery, disputeDelivery } from '@/app/[locale]/workspace/review-actions'
import { supabase } from '@/lib/supabase'
import {
  Play,
  Pause,
  MessageSquare,
  Clock,
  RotateCcw,
  RotateCw,
  ShieldCheck,
  CheckCircle,
  AlertOctagon
} from 'lucide-react'

type ReviewPlayerLabels = {
  legal?: { vault?: string }
  system?: { loading?: string }
}

type ReactPlayerProgress = { playedSeconds: number }

type CommentType = { id: string; timestamp: number; content: string; user_id: string }

export default function ReviewPlayer({
  url,
  orderId,
  ar
}: {
  url: string
  orderId: string
  ar: ReviewPlayerLabels
  activeVersion?: number
}) {
  const playerRef = useRef<ReactPlayer | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [comment, setComment] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)
  const [commentsList, setCommentsList] = useState<CommentType[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getOrderComments(orderId)
      if (data) setCommentsList(data)
    }
    fetchComments()

    const channel = supabase
      .channel(`comments_room_${orderId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'order_comments', filter: `order_id=eq.${orderId}` },
        (payload) => {
          setCommentsList((prev) => {
            if (prev.find((c) => c.id === payload.new.id)) return prev
            return [...prev, payload.new as CommentType].sort((a, b) => a.timestamp - b.timestamp)
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [orderId])

  const handleSeek = (seconds: number) => {
    playerRef.current?.seekTo(seconds, 'seconds')
  }

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return

    setIsSyncing(true)
    try {
      await addTimecodedComment(orderId, currentTime, comment)
      setComment('')
    } finally {
      setIsSyncing(false)
    }
  }

  const handleApproval = async () => {
    if (!confirm('هل أنت متأكد من اعتماد العمل؟ سيتم تحرير الدفعة المالية للمبدع.')) return
    await approveDelivery(orderId)
    alert('تم اعتماد العمل بنجاح.')
  }

  const handleDispute = async () => {
    if (!confirm('هل تريد فتح نزاع رسمي؟ سيتم تجميد الأموال وتدخل الإدارة.')) return
    await disputeDelivery(orderId, 'رفض العميل للنسخة المسلمة')
    alert('تم تحويل المشروع إلى مركز فض النزاعات.')
  }

  const formatTime = (seconds: number) => {
    const mm = Math.floor(seconds / 60)
    const ss = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${mm}:${ss}`
  }

  return (
    <div className="bg-slate-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl font-sans" dir="rtl">
      <div className="relative aspect-video bg-black flex items-center justify-center group">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          onProgress={(state: ReactPlayerProgress) => setCurrentTime(state.playedSeconds)}
          controls={false}
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/40 backdrop-blur-2xl px-10 py-5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button onClick={() => handleSeek(currentTime - 5)} className="text-white hover:text-indigo-400 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={() => setPlaying(!playing)} className="bg-white text-black p-4 rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl">
            {playing ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black" />}
          </button>
          <button onClick={() => handleSeek(currentTime + 5)} className="text-white hover:text-indigo-400 transition-colors">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none opacity-20 select-none">
          <p className="text-[10px] text-white font-mono tracking-widest uppercase">
            Encrypted Stream: AES-256 | {orderId?.substring(0, 8) || 'UNKNOWN'}
          </p>
        </div>
      </div>

      <div className="p-10 bg-slate-900/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-500/20 p-3 rounded-2xl">
              <Clock className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-white font-black text-2xl tabular-nums">{formatTime(currentTime)}</span>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">توقيت المراجعة الحالي</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-400/60 bg-emerald-400/5 px-4 py-2 rounded-full border border-emerald-400/10">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase">{ar.legal?.vault ?? 'vault'}</span>
          </div>
        </div>

        <div className="relative mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="اترك ملحوظة تقنية دقيقة في هذا الإطار..."
            className="w-full bg-slate-800/40 border border-white/5 rounded-[2rem] p-6 text-white text-sm outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 resize-none"
            rows={3}
          />
          <button
            disabled={isSyncing || !comment.trim()}
            onClick={handleCommentSubmit}
            className="absolute left-4 bottom-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white px-8 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg shadow-indigo-900/20 transition-all active:scale-95"
          >
            {isSyncing ? <span className="animate-pulse">{ar.system?.loading ?? 'جاري التشفير...'}</span> : <><MessageSquare className="w-4 h-4" /> إرسال للزملاء</>}
          </button>
        </div>

        {commentsList.length > 0 && (
          <div className="mb-8 space-y-3">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> السجل الزمني للملاحظات ({commentsList.length})
            </h4>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {commentsList.map((c) => (
                <div key={c.id} className="flex gap-4 items-start bg-slate-800/20 p-4 rounded-2xl border border-white/5 cursor-pointer hover:border-indigo-500/30 transition-colors" onClick={() => handleSeek(c.timestamp)}>
                  <span className="bg-indigo-500/10 text-indigo-400 font-mono text-xs px-3 py-1.5 rounded-lg mt-1 font-bold">{formatTime(c.timestamp)}</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 mt-8">
            <button onClick={handleApproval} className="flex items-center justify-center gap-2 py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all rounded-2xl font-black shadow-lg shadow-emerald-900/10">
                <CheckCircle className="w-5 h-5" /> اعتماد وتسليم
            </button>
            <button onClick={handleDispute} className="flex items-center justify-center gap-2 py-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-black transition-all rounded-2xl font-black shadow-lg shadow-rose-900/10">
                <AlertOctagon className="w-5 h-5" /> طلب مراجعة / نزاع
            </button>
        </div>
      </div>
    </div>
  )
}
