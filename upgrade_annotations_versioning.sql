-- إضافة عمود رقم النسخة لجدول التعليقات
ALTER TABLE public.video_annotations 
ADD COLUMN IF NOT EXISTS version_number INT DEFAULT 1;

-- تحديث السياسات لضمان الأمان (RLS)
COMMENT ON COLUMN public.video_annotations.version_number IS 'يربط التعليق بنسخة محددة من الفيديو';
