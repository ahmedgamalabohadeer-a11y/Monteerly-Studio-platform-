import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { supabase } from '@/lib/supabase';

// إعداد الاتصال بـ Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL || 'https://<ACCOUNT_ID>.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'dummy_access_key',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'dummy_secret_key',
  },
});

export async function POST(req: Request) {
  try {
    // 1. التحقق من أن المستخدم مسجل دخول (الأمان أولاً)
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'غير مصرح لك بتوليد روابط تخزين.' }, { status: 401 });
    }

    const { fileName, fileType, projectId } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ error: 'بيانات الملف ناقصة.' }, { status: 400 });
    }

    // 2. تأمين مسار الملف: (يُخزن داخل مجلد يحمل اسم المشروع لمنع الاختلاط)
    const secureKey = `projects/${projectId || 'general'}/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // 3. إعداد أمر الرفع
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || 'monteerly-vault',
      Key: secureKey,
      ContentType: fileType,
    });

    // 4. توليد الرابط المؤقت المشفر (صالح لـ 15 دقيقة فقط)
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    // 5. إعادة الرابط للمتصفح ليبدأ الرفع المباشر
    return NextResponse.json({ 
      uploadUrl: presignedUrl, 
      finalFileUrl: `${process.env.R2_PUBLIC_DOMAIN || 'https://pub-domain.r2.dev'}/${secureKey}`,
      secureKey: secureKey
    }, { status: 200 });

  } catch (error: any) {
    console.error("R2 Presign Error:", error);
    return NextResponse.json({ error: 'فشل في توليد بوابة الرفع الآمنة.' }, { status: 500 });
  }
}
