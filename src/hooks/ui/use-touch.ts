'use client';
import { useRef, useEffect, useState } from 'react';

type GestureEvent = 'swipeLeft' | 'swipeRight' | 'pinch' | 'tap';

export function useTouchGestures(onGesture: (type: GestureEvent, value?: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number; dist: number } | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dist: 0 };
      } else if (e.touches.length === 2) {
        // Pinch logic (distance between two fingers)
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchStart.current = { x: 0, y: 0, dist };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;

      if (e.changedTouches.length === 1 && touchStart.current.dist === 0) {
        const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
        if (Math.abs(deltaX) > 50) {
          onGesture(deltaX > 0 ? 'swipeRight' : 'swipeLeft');
        } else {
          onGesture('tap');
        }
      }
      touchStart.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touchStart.current?.dist) {
        const newDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const scale = newDist / touchStart.current.dist;
        onGesture('pinch', scale);
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchmove', handleTouchMove);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onGesture]);

  return ref;
}
