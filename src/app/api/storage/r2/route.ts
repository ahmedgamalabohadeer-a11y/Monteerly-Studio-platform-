import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { withAuthGuard } from '@/lib/security/apiGuard';

const s3Client = new S3Client({
  region: 'auto',
  endpoint:
    process.env.R2_ENDPOINT_URL ||
    'https://dummy.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'dummy',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'dummy',
  },
});

type AuthenticatedUser = {
  id: string;
};

type R2UploadRequest = {
  fileName: string;
  fileType: string;
  projectId?: string;
};

export async function POST(req: Request) {
  return withAuthGuard(req, async (request: Request, user: unknown) => {
    try {
      const body = (await request.json()) as Partial<R2UploadRequest>;
      const fileName = body.fileName;
      const fileType = body.fileType;
      const projectId = body.projectId;

      if (
        typeof fileName !== 'string' ||
        typeof fileType !== 'string' ||
        !fileName.trim() ||
        !fileType.trim()
      ) {
        return NextResponse.json(
          { error: 'بيانات ناقصة.' },
          { status: 400 }
        );
      }

      const currentUser = user as AuthenticatedUser;

      if (!currentUser?.id) {
        return NextResponse.json(
          { error: 'بيانات المستخدم غير صالحة.' },
          { status: 401 }
        );
      }

      const safeProjectId =
        typeof projectId === 'string' && projectId.trim()
          ? projectId.trim()
          : 'general';

      const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

      const secureKey = `projects/${safeProjectId}/${currentUser.id}_${Date.now()}_${sanitizedFileName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'monteerly-vault',
        Key: secureKey,
        ContentType: fileType,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 900,
      });

      return NextResponse.json(
        {
          uploadUrl: presignedUrl,
          finalFileUrl: `${
            process.env.R2_PUBLIC_DOMAIN || 'https://pub-domain.r2.dev'
          }/${secureKey}`,
          secureKey,
        },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('R2 Generation Error:', error);

      return NextResponse.json(
        { error: 'فشل في توليد بوابة الرفع.' },
        { status: 500 }
      );
    }
  });
}
