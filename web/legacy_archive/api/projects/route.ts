import { NextResponse } from 'next/server';

// GET: جلب جميع المشاريع للمستخدم الحالي
export async function GET(request: Request) {
  // هنا نقوم بالاتصال بـ Prisma لجلب البيانات الحقيقية
  // const projects = await prisma.project.findMany({ where: { ownerId: userId } });
  
  // بيانات وهمية للمحاكاة حالياً
  const mockProjects = [
    { id: '1', title: 'إعلان رمضان 2026', status: 'ACTIVE', progress: 75 },
    { id: '2', title: 'وثائقي النيل', status: 'REVIEW', progress: 90 },
  ];

  return NextResponse.json({ data: mockProjects });
}

// POST: إنشاء مشروع جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات (Validation)
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // هنا نقوم بحفظ المشروع في الداتابيس
    // const newProject = await prisma.project.create({ data: { ... } });

    return NextResponse.json({ 
      success: true, 
      message: 'Project created successfully', 
      project: { id: 'new-id', title: body.title } 
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
