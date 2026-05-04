-- جدول التعليقات التوضيحية للفيديو (Video Annotations)
CREATE TABLE IF NOT EXISTS public.video_annotations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id),
    timecode NUMERIC NOT NULL,
    tool TEXT NOT NULL,
    color TEXT NOT NULL,
    svg_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.video_annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view annotations of their jobs" ON public.video_annotations
    FOR SELECT USING (true);

CREATE POLICY "Users can insert annotations" ON public.video_annotations
    FOR INSERT WITH CHECK (true);
