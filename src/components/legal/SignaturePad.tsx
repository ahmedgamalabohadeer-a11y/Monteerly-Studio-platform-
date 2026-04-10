'use client';
import React, { useRef, useState } from 'react';
import { Eraser, Check, PenTool } from 'lucide-react';

export const SignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // محاكاة الرسم (لغرض العرض البصري البسيط)
  // في الإنتاج الحقيقي نستخدم مكتبة مثل react-signature-canvas
  const startDrawing = (e: any) => {
    setIsDrawing(true);
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    // Logic to clear canvas
    setHasSignature(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 text-black">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold flex items-center gap-2">
          <PenTool size={16} className="text-brand-primary" />
          توقيع الطرف الثاني
        </label>
        <button onClick={clearSignature} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
          <Eraser size={12} /> مسح
        </button>
      </div>
      
      <div 
        className="w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair relative flex items-center justify-center"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
      >
        {!hasSignature && <span className="text-gray-400 text-sm select-none">ارسم توقيعك هنا</span>}
        {hasSignature && <span className="text-brand-primary font-dancing-script text-2xl rotate-[-5deg] select-none">Ahmed Mohamed</span>}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <input type="checkbox" id="consent" className="rounded text-brand-secondary focus:ring-brand-secondary" />
        <label htmlFor="consent" className="text-xs text-gray-600">
          أوافق على الشروط والأحكام وأن هذا التوقيع ملزم قانونياً.
        </label>
      </div>
    </div>
  );
};
