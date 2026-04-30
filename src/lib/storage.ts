import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { supabase } from './supabase';

// إعداد عميل S3 لـ Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
});

/**
 * 1. رفع الملفات الخفيفة إلى Supabase (صور، عقود)
 */
export async function uploadLightFile(file: File, bucket: 'avatars' | 'documents', path: string) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

/**
 * 2. محرك الفيديوهات الثقيلة - Cloudflare R2
 * توليد رابط رفع مباشر (Presigned URL) صالح لمدة 15 دقيقة
 */
export async function getR2UploadUrl(fileName: string, fileType: string) {
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  
  if (!bucketName || !process.env.CLOUDFLARE_R2_ENDPOINT) {
    throw new Error('فشل إعدادات Cloudflare R2: المتغيرات مفقودة.');
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
  });

  // توليد الرابط الموقع (صالح لمدة 900 ثانية)
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
  
  // الرابط العام للملف بعد الرفع (عبر Custom Domain)
  const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN}/${fileName}`;

  return { uploadUrl, publicUrl };
}
