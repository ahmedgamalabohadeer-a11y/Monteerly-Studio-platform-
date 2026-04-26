const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// وظيفة يدوية لقراءة ملف .env.local بدون مكتبات خارجية
function getEnv() {
    const content = fs.readFileSync('.env.local', 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim().replace(/"/g, '');
    });
    return env;
}

const env = getEnv();
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function audit() {
  console.log("🔍 [1/2] فحص جدول العقود القانونية...");
  const { data: contracts, error: err1 } = await supabase
    .from('legal_contracts')
    .select('id, client_name')
    .order('created_at', { ascending: false })
    .limit(1);
  
  if (err1) {
    console.error("❌ خطأ في الاتصال بـ Supabase:", err1.message);
    return;
  }

  if (contracts && contracts.length > 0) {
    const lastContract = contracts[0];
    console.log(`✅ أحدث عقد وُجد للعميل: [${lastContract.client_name}] (ID: ${lastContract.id})`);
    
    console.log("\n🔍 [2/2] فحص جدول مشاريع الإنتاج المرتبطة بهذا العقد...");
    const { data: projects, error: err2 } = await supabase
      .from('production_projects')
      .select('*')
      .eq('contract_id', lastContract.id);
    
    if (projects && projects.length > 0) {
      console.log(`✅ نتيحة إيجابية: وُجد مشروع إنتاج مرتبط باسم: [${projects[0].project_name}]`);
    } else {
      console.log("❌ فجوة تقنية: العقد موجود، ولكن لم يتم إنشاء مشروع إنتاج له.");
      console.log("💡 الاستنتاج: الجسر البرمجي في ContractWizard لم يكتمل تنفيذه.");
    }
  } else {
    console.log("❌ لم يتم العثور على أي عقود إطلاقاً في قاعدة البيانات.");
  }
}

audit();
