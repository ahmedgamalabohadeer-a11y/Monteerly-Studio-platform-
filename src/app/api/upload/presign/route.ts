import { NextResponse } from 'next/server';
import { getR2UploadUrl } from '@/lib/storage';
import { withAuthGuard } from '@/lib/security/apiGuard';

type PresignRequestBody = {
  fileName: string;
  fileType: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error';
}

export async function POST(req: Request) {
  return withAuthGuard(req, async (request, user) => {
    try {
      const body = (await request.json()) as Partial<PresignRequestBody>;
      const fileName = typeof body.fileName === 'string' ? body.fileName : '';
      const fileType = typeof body.fileType === 'string' ? body.fileType : '';
      const normalizedName = fileName
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .slice(-180);
      const allowedType = ['video/', 'audio/', 'image/'].some((prefix) =>
        fileType.startsWith(prefix)
      );

      if (!normalizedName || !allowedType) {
        return NextResponse.json(
          { error: 'بيانات الملف غير صالحة' },
          { status: 400 }
        );
      }

      const path = `uploads/${user.id}/${Date.now()}_${normalizedName}`;
      const { uploadUrl, publicUrl } = await getR2UploadUrl(path, fileType);

      return NextResponse.json(
        { success: true, uploadUrl, publicUrl, path },
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error('Presign API Error:', getErrorMessage(error));
      return NextResponse.json(
        { error: 'فشل في توليد رابط الرفع اللامركزي' },
        { status: 500 }
      );
    }
  });
}
