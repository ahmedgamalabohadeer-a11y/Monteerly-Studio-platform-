'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Mic, Square, Disc, Settings } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function VoiceoverRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    if (!isRecording) return

    let tick = 0
    const interval = window.setInterval(() => {
      tick += 1
      setDuration((prev) => prev + 1)
      setVolume((tick * 17) % 100)
    }, 100)

    return () => window.clearInterval(interval)
  }, [isRecording])

  const startRecording = () => {
    setDuration(0)
    setVolume(0)
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setVolume(0)
  }

  const formatTime = (timeUnits: number) => {
    const mins = Math.floor(timeUnits / 600)
    const secs = Math.floor((timeUnits % 600) / 10)
    const ms = timeUnits % 10
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}.${ms}`
  }

  const bars = useMemo(
    () =>
      Array.from({ length: 15 }, (_, index) => {
        if (!isRecording) return 10

        const variance = ((volume + index * 11) % 90) + 10
        return variance
      }),
    [isRecording, volume]
  )

  return (
    <div className="bg-card border border-border rounded-xl p-4 w-64">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <Mic
            size={16}
            className={isRecording ? 'text-red-500 animate-pulse' : 'text-primary'}
          />
          <h3 className="font-bold text-sm">تسجيل تعليق (VO)</h3>
        </div>

        <button
          type="button"
          className="text-muted-foreground hover:text-primary"
          aria-label="إعدادات التسجيل"
        >
          <Settings size={14} />
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg p-4 mb-4 relative overflow-hidden">
        <div className="flex items-end justify-center gap-1 h-12 mb-2">
          {bars.map((barHeight, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-75 ${
                isRecording ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
              style={{ height: `${barHeight}%` }}
            />
          ))}
        </div>

        <div className="text-center font-mono text-xl font-bold text-white">
          {formatTime(duration)}
        </div>
      </div>

      <div className="flex gap-2">
        {!isRecording ? (
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white border-none"
            onClick={startRecording}
          >
            <Disc size={16} className="mr-2" /> بدء التسجيل
          </Button>
        ) : (
          <Button
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 border-none"
            onClick={stopRecording}
          >
            <Square size={16} className="mr-2 fill-current" /> إيقاف وحفظ
          </Button>
        )}
      </div>
    </div>
  )
}
