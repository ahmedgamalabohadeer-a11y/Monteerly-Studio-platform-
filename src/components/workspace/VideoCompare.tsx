'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRightLeft, X } from 'lucide-react'

interface VideoCompareProps {
  srcOld?: string
  srcNew?: string
  onClose?: () => void
}

const FALLBACK_OLD = '/images/features/workspace.jpg'
const FALLBACK_NEW = '/images/features/workspace.jpg'

export function VideoCompare({ srcOld, srcNew, onClose }: VideoCompareProps) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const oldSource = srcOld || FALLBACK_OLD
  const newSource = srcNew || FALLBACK_NEW

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const pos = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.min(100, Math.max(0, pos)))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updateSlider(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updateSlider(e.touches[0].clientX)
  }

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden group select-none border border-white/10 shadow-2xl">
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <span className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur border border-white/10">
          v1.0 (Original)
        </span>
      </div>

      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <span className="bg-indigo-600/80 text-white text-xs px-2 py-1 rounded backdrop-blur border border-indigo-400/30">
          v2.0 (Graded)
        </span>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق المقارنة"
            className="bg-red-500/80 p-1 rounded hover:bg-red-600 transition"
          >
            <X size={12} />
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize"
        onMouseDown={(e) => {
          setIsDragging(true)
          updateSlider(e.clientX)
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => updateSlider(e.touches[0].clientX)}
        onTouchMove={handleTouchMove}
        aria-label="مقارنة بين النسخة الأصلية والنسخة المعدلة"
      >
        <div className="absolute inset-0">
          <Image
            src={oldSource}
            alt="النسخة الأصلية"
            fill
            sizes="100vw"
            className="w-full h-full object-cover grayscale opacity-50"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/20">
            V1
          </div>
        </div>

        <div
          className="absolute inset-0 border-l-2 border-white bg-black"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <Image
            src={newSource}
            alt="النسخة المعدلة"
            fill
            sizes="100vw"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-indigo-500/50">
            V2
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-40 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPos}%` }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-indigo-900">
            <ArrowRightLeft size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
