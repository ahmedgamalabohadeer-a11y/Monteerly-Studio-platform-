import fs from 'fs';
import path from 'path';

const IGNORE_DIRS = ['.git', 'node_modules', '.next', 'scripts', '.cto-logs'];

function generateTree(dir, prefix = '') {
    let tree = '';
    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        return '';
    }

    const filteredFiles = files.filter(f => !IGNORE_DIRS.includes(f));
    
    filteredFiles.forEach((file, index) => {
        const isLast = index === filteredFiles.length - 1;
        const fullPath = path.join(dir, file);
        const marker = isLast ? '└── ' : '├── ';
        const childPrefix = prefix + (isLast ? '    ' : '│   ');
        
        tree += `${prefix}${marker}${file}\n`;
        
        if (fs.statSync(fullPath).isDirectory()) {
            tree += generateTree(fullPath, childPrefix);
        }
    });
    return tree;
}

console.log('🔍 جاري مسح البنية التحتية للمشروع...\n');
const treeMap = generateTree(process.cwd());
const report = `=== خريطة مشروع Monteerly OS ===\n\n${treeMap}\n===============================`;

fs.writeFileSync('project-map.txt', report);
console.log('✅ تم إنشاء التقرير بنجاح!\n\n');
console.log(report);
console.log('\n📌 أرجو نسخ الخريطة أعلاه وإرسالها للمهندس المعماري.');
