import os
from PIL import Image, ImageDraw, ImageFont

# المجلد المستهدف لباقي صفحات المنصة
output_dir = "public/images/platform"
os.makedirs(output_dir, exist_ok=True)

# قائمة الصور المطلوبة لباقي الصفحات (الاسم، النص المكتوب، ألوان التدرج)
pages_assets = [
    ("marketplace_hero.png", "Talent Marketplace", (30, 58, 138), (14, 165, 233)),
    ("studio_timeline.png", "Cloud Video Editor", (88, 28, 135), (217, 70, 239)),
    ("wallet_dashboard.png", "Financial Escrow & Wallet", (6, 78, 59), (16, 185, 129)),
    ("agency_management.png", "Agency Dashboard", (15, 23, 42), (71, 85, 105)),
    ("consultation_booking.png", "Expert Consultations", (127, 29, 29), (248, 113, 113)),
    ("course_thumbnail_1.png", "Advanced Premiere Pro", (23, 37, 84), (59, 130, 246)),
    ("course_thumbnail_2.png", "Color Grading Masterclass", (66, 32, 6), (245, 158, 11)),
    ("auth_login_bg.png", "Secure Login", (10, 10, 10), (38, 38, 38)),
    ("error_404_bg.png", "Page Not Found", (69, 10, 10), (220, 38, 38))
]

def create_gradient_image(filename, text, color1, color2, width=1200, height=800):
    img = Image.new("RGB", (width, height), color1)
    draw = ImageDraw.Draw(img)
    
    # إنشاء تدرج لوني عمودي
    for y in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * y / height)
        g = int(color1[1] + (color2[1] - color1[1]) * y / height)
        b = int(color1[2] + (color2[2] - color1[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # كتابة النص في المنتصف
    try:
        font = ImageFont.truetype("arial.ttf", 60)
    except:
        font = ImageFont.load_default()
    
    # حساب أبعاد النص لتوسيطه
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) / 2
    y = (height - text_height) / 2
    
    # إضافة ظل للنص (Drop shadow)
    draw.text((x+4, y+4), text, fill=(0, 0, 0), font=font)
    draw.text((x, y), text, fill=(255, 255, 255), font=font)
    
    filepath = os.path.join(output_dir, filename)
    img.save(filepath)
    print(f"تم إنشاء: {filepath}")

for asset in pages_assets:
    create_gradient_image(asset[0], asset[1], asset[2], asset[3])

print("✅ تم تصنيع جميع الصور الإضافية بنجاح! جاهزة للاستخدام في باقي الصفحات.")
