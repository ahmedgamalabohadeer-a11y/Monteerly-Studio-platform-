const { Project } = require("ts-morph");
const fs = require("fs");

const project = new Project();
project.addSourceFilesAtPaths("src/**/*.tsx");
project.addSourceFilesAtPaths("src/**/*.ts");

let auditReport = "=== التقرير الهيكلي العميق للنواقص والميزات المعزولة ===\n\n";

project.getSourceFiles().forEach(sourceFile => {
    const filePath = sourceFile.getFilePath();
    let hasIssues = false;
    let fileReport = `\n[الملف]: ${filePath}\n`;

    // فحص الدوال لاكتشاف المكونات الوهمية والنواقص
    sourceFile.getFunctions().forEach(func => {
        const body = func.getBodyText();
        if (!body || body.includes("TODO") || body.includes("mock") || body.includes("console.log")) {
            fileReport += `  - ميزة معطلة/تحتاج دمج: ${func.getName()}\n`;
            hasIssues = true;
        }
    });

    // اكتشاف الواجهات التي لم يتم ربطها بالنهايات الخلفية (Backend)
    const fileText = sourceFile.getText().toLowerCase();
    if (filePath.includes("components") && (!fileText.includes("supabase") && !fileText.includes("fetch"))) {
        fileReport += `  - مكون معزول (يحتاج إلى ربط تكاملي بالبيانات)\n`;
        hasIssues = true;
    }

    if (hasIssues) {
        auditReport += fileReport;
    }
});

const outputPath = "/sdcard/Download/mcos_ai_analysis/deep_structural_audit.txt";
fs.writeFileSync(outputPath, auditReport);
console.log(`تم استخراج الحقيقة المطلقة للكود وحفظها في: ${outputPath}`);
