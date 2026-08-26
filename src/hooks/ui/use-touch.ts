import { useEffect, useRef } from 'react';

export type TouchGesture = 'swipeLeft' | 'swipeRight' | 'pinch' | 'tap';

type TouchGestureCallback = (type: TouchGesture, value?: number) => void;

function getDistance(first: Touch, second: Touch) {
  return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
}

export const useTouchGestures = (callback?: TouchGestureCallback) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let moved = false;
    let pinchDistance: number | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        pinchDistance = getDistance(event.touches[0], event.touches[1]);
        return;
      }

      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      moved = false;
      pinchDistance = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && pinchDistance) {
        const distance = getDistance(event.touches[0], event.touches[1]);
        callbackRef.current?.('pinch', distance / pinchDistance);
        return;
      }

      const touch = event.touches[0];
      if (!touch) return;
      moved = moved || Math.hypot(touch.clientX - startX, touch.clientY - startY) > 8;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (pinchDistance !== null) {
        pinchDistance = null;
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        callbackRef.current?.(deltaX < 0 ? 'swipeLeft' : 'swipeRight');
      } else if (!moved) {
        callbackRef.current?.('tap');
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return elementRef;
};
