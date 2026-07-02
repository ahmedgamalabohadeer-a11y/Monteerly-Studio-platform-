'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Mic, Square, Disc, Settings, AlertCircle, Save, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

type ExtendedWindow = Window & {
  webkitAudioContext?: typeof AudioContext
}

export function VoiceoverRecorder({ projectId = 'general' }: { projectId?: string }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [duration, setDuration] = useState(0)
  const [volumeLevels, setVolumeLevels] = useState<number[]>(Array(15).fill(10))
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const drawAudioMeterRef = useRef<() => void>(() => {})

  const drawAudioMeter = useCallback(() => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    const step = Math.max(1, Math.floor(dataArray.length / 15))
    const newLevels = Array.from({ length: 15 }, (_, i) => {
      let sum = 0
      for (let j = 0; j < step; j++) {
        const value = dataArray[i * step + j] ?? 0
        sum += value
      }
      const avg = sum / step
      return Math.max(10, Math.min(100, (avg / 255) * 100))
    })

    setVolumeLevels(newLevels)
    animationFrameRef.current = requestAnimationFrame(() => drawAudioMeterRef.current())
  }, [])

  useEffect(() => {
    drawAudioMeterRef.current = drawAudioMeter
  }, [drawAudioMeter])

  const startRecording = async () => {
    try {
      setErrorMsg(null)
      setSuccessMsg(null)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
      }

      const AudioContextClass =
        window.AudioContext || (window as ExtendedWindow).webkitAudioContext

      if (!AudioContextClass) {
        throw new Error('AudioContext is not supported in this browser.')
      }

      const audioContext = new AudioContextClass()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)

      source.connect(analyser)
      analyser.fftSize = 64

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      sourceRef.current = source

      mediaRecorder.start()
      setIsRecording(true)
      setDuration(0)
      setAudioUrl(null)
      setAudioBlob(null)

      timerRef.current = window.setInterval(() => setDuration((prev) => prev + 1), 1000)
      drawAudioMeterRef.current()
    } catch {
      setErrorMsg('الرجاء السماح للمتصفح باستخدام المايكروفون.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)

      if (timerRef.current) window.clearInterval(timerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      setVolumeLevels(Array(15).fill(10))
    }
  }

  const handleSaveToCloud = async () => {
    if (!audioBlob) return

    setIsSaving(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData?.user) {
        throw new Error('عملية مرفوضة: يجب تسجيل الدخول بهوية سيادية لرفع الملفات إلى الخزنة.')
      }

      const fileName = `voiceovers/${projectId}_vo_${Date.now()}.webm`

      const { error } = await supabase.storage
        .from('secure-vault')
        .upload(fileName, audioBlob, {
          contentType: 'audio/webm',
          upsert: false,
        })

      if (error) {
        if (error.message.includes('row-level security')) {
          throw new Error('تم الحظر: ليس لديك صلاحية الرفع في هذه الخزنة.')
        }
        throw error
      }

      setSuccessMsg('تم تأمين وحفظ المقطع السحابي بنجاح!')
      setAudioUrl(null)
      setAudioBlob(null)
    } catch (error: unknown) {
      console.error(error)
      setErrorMsg(error instanceof Error ? error.message : 'حدث خطأ أثناء الرفع للسحابة.')
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close()
      }
    }
  }, [])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 w-full max-w-sm font-sans shadow-2xl" dir="rtl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-colors ${isRecording ? 'bg-rose-500/20 text-rose-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
            <Mic size={20} className={isRecording ? 'animate-pulse' : ''} />
          </div>
          <h3 className="font-black text-white text-sm">التسجيل السيادي (VO)</h3>
        </div>
        <button type="button" className="text-slate-500 hover:text-white transition-colors">
          <Settings size={16} />
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 text-xs font-bold text-rose-400 bg-rose-500/10 p-3 rounded-lg flex items-start gap-2 leading-relaxed">
          <AlertCircle size={16} className="shrink-0 mt-0.5" /> {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-lg flex items-center gap-2">
          <CheckCircle size={14} /> {successMsg}
        </div>
      )}

      <div className="bg-[#12121A] border border-white/5 rounded-xl p-6 mb-6 relative overflow-hidden shadow-inner">
        <div className="flex items-end justify-center gap-1.5 h-16 mb-4">
          {volumeLevels.map((barHeight, i) => (
            <div
              key={i}
              className={`w-2 rounded-t-sm transition-all duration-75 ${isRecording ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}
              style={{ height: `${barHeight}%` }}
            />
          ))}
        </div>
        <div className="text-center font-mono text-3xl font-black text-white tracking-widest">
          {formatTime(duration)}
        </div>
      </div>

      {audioUrl && !isRecording && (
        <div className="mb-6 animate-in fade-in zoom-in-95">
          <audio src={audioUrl} controls className="w-full h-10 rounded-lg outline-none mb-3" />
          <button
            disabled={isSaving}
            onClick={handleSaveToCloud}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-[#12121A] disabled:text-slate-500 text-white py-3 rounded-xl text-sm font-black transition-colors flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(5,150,105,0.2)]"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
            {isSaving ? 'جاري التشفير والرفع...' : 'حفظ المقطع سحابياً'}
          </button>
        </div>
      )}

      <div className="flex gap-3">
        {!isRecording ? (
          <Button
            className="w-full bg-rose-600 hover:bg-rose-500 text-white border-none py-6 rounded-xl font-black text-base shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all"
            onClick={startRecording}
          >
            <Disc size={20} className="mr-2" /> تسجيل الصوت الآن
          </Button>
        ) : (
          <Button
            className="w-full bg-slate-200 hover:bg-white text-black border-none py-6 rounded-xl font-black text-base transition-all"
            onClick={stopRecording}
          >
            <Square size={20} className="mr-2 fill-current" /> إيقاف المايكروفون
          </Button>
        )}
      </div>
    </div>
  )
}
