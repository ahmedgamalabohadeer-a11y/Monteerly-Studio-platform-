'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Pen, Circle, Square, Eraser } from 'lucide-react'

type AnnotationTool = 'pen' | 'circle' | 'square'
type AnnotationColor = '#ef4444' | '#22c55e' | '#3b82f6' | '#eab308'

interface AnnotationItem {
  id?: string
  timecode: number
  tool: AnnotationTool
  color: string
  svg_path: string
  version_number: number
  timestamp: number
}

const COLOR_OPTIONS: AnnotationColor[] = ['#ef4444', '#22c55e', '#3b82f6', '#eab308']

export function VideoAnnotation({ activeVersion = 1 }: { activeVersion?: number }) {
  const [activeTool, setActiveTool] = useState<AnnotationTool>('pen')
  const [color, setColor] = useState<AnnotationColor>('#ef4444')
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([])

  useEffect(() => {
    const channel = supabase
      .channel(`annotations-sync-${activeVersion}`)
      .on('broadcast', { event: 'new_draw' }, (payload) => {
        const nextAnnotation = payload.payload as AnnotationItem
        setAnnotations((prev) => [...prev, nextAnnotation])
      })
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'video_annotations',
          filter: `version_number=eq.${activeVersion}`,
        },
        (payload) => {
          const nextAnnotation = payload.new as AnnotationItem
          setAnnotations((prev) => [...prev, nextAnnotation])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeVersion])

  const buildAnnotation = (): AnnotationItem => {
    if (activeTool === 'circle') {
      return {
        timecode: 0,
        tool: 'circle',
        color,
        svg_path: 'M500 300 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0',
        version_number: activeVersion,
        timestamp: Date.now(),
      }
    }

    if (activeTool === 'square') {
      return {
        timecode: 0,
        tool: 'square',
        color,
        svg_path: 'M420 220 H580 V380 H420 Z',
        version_number: activeVersion,
        timestamp: Date.now(),
      }
    }

    return {
      timecode: 0,
      tool: 'pen',
      color,
      svg_path: 'M100 100 Q150 50 200 100 T300 100',
      version_number: activeVersion,
      timestamp: Date.now(),
    }
  }

  const handleDraw = async (annotation: AnnotationItem) => {
    const channel = supabase.channel(`annotations-sync-${activeVersion}`)

    channel.send({
      type: 'broadcast',
      event: 'new_draw',
      payload: annotation,
    })

    await supabase.from('video_annotations').insert(annotation)
    setAnnotations((prev) => [...prev, annotation])
  }

  const handleAddDemoAnnotation = async () => {
    const annotation = buildAnnotation()
    await handleDraw(annotation)
  }

  const handleClearLocalAnnotations = () => {
    setAnnotations([])
  }

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10 pointer-events-auto shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveTool('pen')}
          className={`p-2 rounded-lg transition-colors ${
            activeTool === 'pen'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="أداة القلم"
        >
          <Pen size={20} />
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('circle')}
          className={`p-2 rounded-lg transition-colors ${
            activeTool === 'circle'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="أداة الدائرة"
        >
          <Circle size={20} />
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('square')}
          className={`p-2 rounded-lg transition-colors ${
            activeTool === 'square'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="أداة المربع"
        >
          <Square size={20} />
        </button>

        <div className="h-px bg-white/10 my-1" />

        {COLOR_OPTIONS.map((optionColor) => (
          <button
            key={optionColor}
            type="button"
            onClick={() => setColor(optionColor)}
            aria-label={`اختيار اللون ${optionColor}`}
            className={`w-6 h-6 rounded-full border-2 transition-transform ${
              color === optionColor
                ? 'border-white scale-110'
                : 'border-transparent'
            }`}
            style={{ backgroundColor: optionColor }}
          />
        ))}

        <div className="h-px bg-white/10 my-1" />

        <button
          type="button"
          onClick={handleAddDemoAnnotation}
          className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
          aria-label="إضافة تعليق توضيحي"
        >
          <Pen size={20} />
        </button>

        <button
          type="button"
          onClick={handleClearLocalAnnotations}
          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
          aria-label="مسح التعليقات المحلية"
        >
          <Eraser size={20} />
        </button>
      </div>

      <div className="w-full h-full pointer-events-none">
        <svg className="w-full h-full opacity-80" viewBox="0 0 1280 720" fill="none">
          {annotations.map((annotation, index) => (
            <path
              key={`${annotation.timestamp}-${index}`}
              d={annotation.svg_path}
              fill="none"
              stroke={annotation.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {annotations.length === 0 && (
            <>
              <path
                d="M100 100 Q150 50 200 100 T300 100"
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle
                cx="500"
                cy="300"
                r="40"
                fill="none"
                stroke={color}
                strokeWidth="4"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
