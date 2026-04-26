import React from 'react';

// استخدام 'any' للمتغيرات (props) هو الحل الأقوى لتجاوز أخطاء TypeScript في وقت البناء
// خاصة عند التعامل مع تغييرات Next.js 15 الجذرية (Params as Promise)
export default async function DynamicPage(props: any) {
  // انتظار البروميس بأمان
  const params = await props.params;
  
  // استخراج المعرفات المحتملة بأمان (سواء كانت id أو slug أو username)
  const id = params?.id || params?.slug || params?.username || 'Unknown';

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-2xl font-bold mb-4">Page Content</h1>
      <div className="bg-muted/20 p-4 rounded-lg border border-border">
        <p className="text-muted-foreground font-mono text-sm">
          Dynamic Param: <span className="text-primary font-bold">{id}</span>
        </p>
      </div>
    </div>
  );
}
