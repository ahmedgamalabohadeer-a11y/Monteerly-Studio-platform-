import { NextResponse } from 'next/server';
import { getR2UploadUrl } from '@/lib/storage';

type PresignRequestBody = {
  fileName: string;
  fileType: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PresignRequestBody;
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'بيانات الملف غير مكتملة (fileName, fileType)' },
        { status: 400 }
      );
    }

    const { uploadUrl, publicUrl } = await getR2UploadUrl(fileName, fileType);

    return NextResponse.json(
      {
        success: true,
        uploadUrl,
        publicUrl,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Presign API Error:', getErrorMessage(error));
    return NextResponse.json(
      { error: 'فشل في توليد رابط الرفع اللامركزي' },
      { status: 500 }
    );
  }
}
