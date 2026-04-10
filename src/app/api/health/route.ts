import { NextResponse } from 'next/server';

export async function GET() {
  // هنا يمكن إضافة فحص اتصال الداتابيس والذاكرة المؤقتة
  // const dbStatus = await prisma.$queryRaw`SELECT 1`;
  
  return NextResponse.json(
    { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'Monteerly Core OS',
      version: '2.0.0'
    },
    { status: 200 }
  );
}
