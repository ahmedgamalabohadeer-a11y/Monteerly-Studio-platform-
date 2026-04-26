import os

file_path = "src/app/[locale]/finance/page.tsx"

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    ledger_interface = """
interface Ledger {
  id: string | number;
  client_name: string;
  total_amount: number | string;
  paid_amount: number | string;
  remaining_amount: number | string;
  payment_status: 'pending' | 'completed' | string;
}
"""

    if 'interface Ledger' not in content:
        content = content.replace('export default function', ledger_interface + '\nexport default function')

    # تصحيح تعريف الحالة لتقبل أنواع البيانات الجديدة
    if 'useState<Ledger[]>([' not in content:
        content = content.replace('useState([])', 'useState<Ledger[]>([])')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ تم تحديث أنواع البيانات في صفحة المالية بنجاح.")
else:
    print("❌ خطأ: لم يتم العثور على ملف صفحة المالية في المسار المحدد.")
