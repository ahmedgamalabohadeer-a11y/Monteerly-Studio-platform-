const fs = require('fs');
const file = 'src/components/legal/ContractWizard.tsx';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(/addToast\('error', 'حدث خطأ أثناء حفظ العقد\.'\);/g, "addToast('error', 'رفض Supabase: ' + (err.message || JSON.stringify(err)));");
fs.writeFileSync(file, code);
