import { supabase } from './supabase';

/**
 * Monteerly Storage Engine (Dual-Strategy)
 * 1. Supabase Storage: For avatars and light documents.
 * 2. Cloudflare R2 (via S3 API): For heavy video files.
 */

// رفع الملفات الخفيفة إلى Supabase
export async function uploadLightFile(file: File, bucket: 'avatars' | 'documents', path: string) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

// توليد رابط رفع مباشر (Pre-signed URL) لـ Cloudflare R2 للفيديوهات الثقيلة
// (يتم استدعاؤها من السيرفر، لكي يقوم العميل بالرفع مباشرة لـ R2 لتخفيف الحمل)
export async function getR2UploadUrl(fileName: string, fileType: string) {
  // ملاحظة: سيتم دمج مكتبة AWS SDK (S3 Client) هنا للتواصل مع Cloudflare R2
  // الكود أدناه هو الهيكل الاستراتيجي للعملية
  const r2Endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
  
  if (!r2Endpoint) {
    throw new Error('لم يتم إعداد Cloudflare R2 في متغيرات البيئة.');
  }

  // TODO: Implement AWS S3 getSignedUrl logic
  return {
    uploadUrl: `${r2Endpoint}/${fileName}?signature=...`,
    publicUrl: `https://media.monteerly.com/${fileName}`
  };
}
