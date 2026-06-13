'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { MoveHorizontal } from 'lucide-react'

export function SplitScreenPlayer() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const pos = ((clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, pos)))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updateSliderPosition(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden cursor-col-resize select-none border border-white/10 group"
      onMouseDown={(e) => {
        setIsDragging(true)
        updateSliderPosition(e.clientX)
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(e) => updateSliderPosition(e.touches[0].clientX)}
      onTouchMove={handleTouchMove}
      aria-label="مقارنة بصرية بين نسختين من الفيديو"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/features/live.jpg"
          alt="النسخة الثانية بعد التلوين والمعالجة"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs font-bold text-white">
          V2 (Color Graded)
        </div>
      </div>

      <div
        className="absolute inset-0 overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/features/live.jpg"
            alt="النسخة الأولى الخام قبل التلوين"
            fill
            sizes="100vw"
            className="object-cover grayscale"
            priority
          />
        </div>
        <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold text-slate-300">
          V1 (RAW)
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-transparent cursor-col-resize flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
        aria-hidden="true"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl -ml-0.5">
          <MoveHorizontal size={16} className="text-black" />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        اسحب للمقارنة
      </div>
    </div>
  )
}
