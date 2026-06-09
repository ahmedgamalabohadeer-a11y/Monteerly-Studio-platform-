import os

file_path = "src/app/[locale]/marketplace/profile/[id]/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# استبدال زر التعاقد برابط Link يعمل
fixed_button = r'''<Link href={`/ar/marketplace/escrow/${id}`} className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] text-center">التعاقد السيادي</Link>'''

# استبدال الزر القديم (الذي لا يعمل) بالرابط الجديد
updated_content = content.replace('<button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">التعاقد السيادي</button>', fixed_button)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(updated_content)
