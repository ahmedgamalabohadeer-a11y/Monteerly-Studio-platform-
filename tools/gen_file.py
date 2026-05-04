import os
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: gen_file.py <filepath>")
        return

    filepath = sys.argv[1]

    directory = os.path.dirname(filepath)

    # ✅ الحل هنا: لا تنشئ مجلد إذا كان المسار فارغ
    if directory:
        os.makedirs(directory, exist_ok=True)

    content = sys.stdin.read()

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print("File created:", filepath)

if __name__ == "__main__":
    main()
