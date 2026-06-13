'use client'
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const progressKey = `${pathname}?${searchParams.toString()}`

  return (
    <div
      key={progressKey}
      className="fixed top-0 left-0 w-full h-1 z-[99999] bg-transparent pointer-events-none"
    >
      <div className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-[loading_500ms_ease-in-out_1] w-1/2" />
      <style jsx global>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0; opacity: 1; }
          50% { width: 70%; margin-left: 30%; opacity: 1; }
          100% { width: 0%; margin-left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
