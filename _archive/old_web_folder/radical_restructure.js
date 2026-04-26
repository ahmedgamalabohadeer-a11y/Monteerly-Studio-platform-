const fs = require('fs');
const path = require('path');

console.log("🟦 [1/4] تحديث الدستور البرمجي (tsconfig.json)...");
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
    let ts = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    if (!ts.compilerOptions) ts.compilerOptions = {};
    ts.compilerOptions.baseUrl = ".";
    if (!ts.compilerOptions.paths) ts.compilerOptions.paths = {};
    ts.compilerOptions.paths["@/*"] = ["./src/*"];
    fs.writeFileSync(tsconfigPath, JSON.stringify(ts, null, 2));
    console.log("✅ تم توثيق المسارات السيادية (@/*).");
} else {
    console.log("❌ ملف tsconfig.json مفقود!");
    process.exit(1);
}

console.log("\n🟦 [2/4] إعادة التسليك الهيكلي للمشروع بالكامل...");
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
let fixedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // استبدال احترافي لأي مسار نسبي معقد بمسار مطلق ثابت ودائم
    content = content.replace(/from\s+['"](\.\.\/)+components\/(.*?)['"]/g, "from '@/components/$2'");
    content = content.replace(/from\s+['"](\.\.\/)+lib\/(.*?)['"]/g, "from '@/lib/$2'");
    content = content.replace(/from\s+['"](\.\.\/)+utils\/(.*?)['"]/g, "from '@/utils/$2'");
    content = content.replace(/from\s+['"](\.\.\/)+hooks\/(.*?)['"]/g, "from '@/hooks/$2'");
    content = content.replace(/from\s+['"](\.\.\/)+types\/(.*?)['"]/g, "from '@/types/$2'");
    content = content.replace(/from\s+['"](\.\.\/)+store\/(.*?)['"]/g, "from '@/store/$2'");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
});
console.log(`✅ تمت إعادة بناء مسارات الاستيراد من الجذور لـ (${fixedCount}) ملف.`);

console.log("\n🟦 [3/4] تفعيل الحدود التفاعلية ('use client')...");
let clientCount = 0;
files.forEach(file => {
    if (file.includes(path.join('src', 'app', '[locale]'))) {
        let content = fs.readFileSync(file, 'utf8');
        // إذا كان الملف يحتوي على أدوات تفاعل ولم يتم تعريفه كـ client
        if ((content.includes('useState') || content.includes('useEffect') || content.includes('useRouter')) && !content.includes('use client')) {
            fs.writeFileSync(file, "'use client';\n" + content, 'utf8');
            clientCount++;
        }
    }
});
console.log(`✅ تم تأمين (${clientCount}) واجهة كـ Client Components.`);
