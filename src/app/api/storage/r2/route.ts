import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { withAuthGuard } from '@/lib/security/apiGuard';
import { createClient } from '@/lib/supabase/server';

type R2UploadRequest = {
  fileName: string;
  fileType: string;
  projectId: string;
};

type OrderMembership = {
  client_id: string;
  freelancer_id: string | null;
};

export async function POST(req: Request) {
  return withAuthGuard(req, async (request, user) => {
    try {
      const body = (await request.json()) as Partial<R2UploadRequest>;
      const fileName =
        typeof body.fileName === 'string' ? body.fileName.trim() : '';
      const fileType =
        typeof body.fileType === 'string' ? body.fileType.trim() : '';
      const orderId =
        typeof body.projectId === 'string' ? body.projectId.trim() : '';
      const allowedType = ['video/', 'audio/', 'image/'].some((prefix) =>
        fileType.startsWith(prefix)
      );

      if (!fileName || !allowedType || !orderId || orderId.length > 128) {
        return NextResponse.json(
          { error: 'بيانات الرفع أو معرّف الطلب غير صالحة.' },
          { status: 400 }
        );
      }

      const supabase = await createClient();
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('client_id, freelancer_id')
        .eq('id', orderId)
        .maybeSingle<OrderMembership>();

      if (
        orderError ||
        !order ||
        (order.client_id !== user.id && order.freelancer_id !== user.id)
      ) {
        return NextResponse.json(
          { error: 'لا تملك عضوية في هذا الطلب.' },
          { status: 403 }
        );
      }

      const endpoint = process.env.R2_ENDPOINT_URL;
      const accessKeyId = process.env.R2_ACCESS_KEY_ID;
      const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
      const bucket = process.env.R2_BUCKET_NAME;
      const publicDomain = process.env.R2_PUBLIC_DOMAIN?.replace(/\/$/, '');

      if (!endpoint || !accessKeyId || !secretAccessKey || !bucket || !publicDomain) {
        return NextResponse.json(
          { error: 'خدمة التخزين غير مهيأة.' },
          { status: 503 }
        );
      }

      const sanitizedFileName = fileName
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .slice(-180);

      if (!sanitizedFileName) {
        return NextResponse.json(
          { error: 'اسم الملف غير صالح.' },
          { status: 400 }
        );
      }

      const secureKey =
        `orders/${orderId}/${user.id}/${Date.now()}_${sanitizedFileName}`;
      const s3Client = new S3Client({
        region: 'auto',
        endpoint,
        credentials: { accessKeyId, secretAccessKey },
      });
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: secureKey,
        ContentType: fileType,
      });
      const uploadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 900,
      });

      return NextResponse.json(
        {
          uploadUrl,
          finalFileUrl: `${publicDomain}/${secureKey}`,
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
