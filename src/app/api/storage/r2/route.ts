import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { withAuthGuard } from '@/lib/security/apiGuard';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL || 'https://dummy.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'dummy',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'dummy',
  },
});

export async function POST(req: Request) {
  return withAuthGuard(req, async (req, user) => {
    try {
      const { fileName, fileType, projectId } = await req.json();
      if (!fileName || !fileType) return NextResponse.json({ error: 'بيانات ناقصة.' }, { status: 400 });

      // تأمين المسار وربطه بهوية المستخدم
      const secureKey = `projects/${projectId || 'general'}/${user.id}_${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'monteerly-vault',
        Key: secureKey,
        ContentType: fileType,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

      return NextResponse.json({ 
        uploadUrl: presignedUrl, 
        finalFileUrl: `${process.env.R2_PUBLIC_DOMAIN || 'https://pub-domain.r2.dev'}/${secureKey}`,
        secureKey 
      }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: 'فشل في توليد بوابة الرفع.' }, { status: 500 });
    }
  }); // هنا يمكن إضافة ['editor', 'agency'] إذا أردنا قصر الرفع عليهم فقط
}
