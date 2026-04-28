import sys
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: python tools/gen_file.py <relative_path>")
        sys.exit(1)

    rel_path = sys.argv[1]
    target = Path(rel_path)
    content = sys.stdin.read()
    
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")
    print(f"✅ [MCOS Scaffold] تم بناء الملف بنجاح: {target} ({len(content)} حرف)")

if __name__ == "__main__":
    main()
