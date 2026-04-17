import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🔌 [Prisma] جاري الاتصال بقاعدة بيانات Supabase...");
    await prisma.$connect();
    console.log("✅ [Prisma] تم الاتصال بنجاح!");
    
    // محاولة قراءة عدد المستخدمين كاختبار للاتصال
    const userCount = await prisma.users.count();
    console.log(`📊 [Data Flow] إجمالي المستخدمين في قاعدة البيانات: ${userCount}`);
    
  } catch (error) {
    console.error("❌ [Prisma] فشل الاتصال بقاعدة البيانات. التفاصيل:");
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
