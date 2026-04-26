'use client';
import React, { useRef, useState, useEffect } from 'react';

interface SignaturePadProps {
  onSign: () => void;
  disabled?: boolean;
}

export function SignaturePad({ onSign, disabled = false }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // ضبط أبعاد اللوحة برمجياً لتناسب شاشات الهواتف
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#ffffff'; // لون حبر التوقيع (أبيض)
        ctx.lineWidth = 3; // سمك القلم
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  // بدء التوقيع (للمس والماوس)
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasSignature(true);
  };

  // حركة القلم
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  // إيقاف التوقيع
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // مسح اللوحة
  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  return (
    <div className="space-y-4">
      {/* لوحة الرسم */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`w-full h-48 bg-slate-950 border border-slate-700 rounded-xl cursor-crosshair touch-none shadow-inner ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        }`}
      />
      
      {/* أزرار التحكم */}
      <div className="flex gap-3">
        <button
          onClick={clear}
          disabled={disabled || !hasSignature}
          className="px-4 py-2 text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
        >
          مسح التوقيع
        </button>
        <button
          onClick={onSign}
          disabled={disabled || !hasSignature}
          className="flex-1 px-4 py-2 text-sm font-bold text-white bg-brand-success hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50"
        >
          اعتماد التوقيع وحفظ العقد
        </button>
      </div>
    </div>
  );
}
