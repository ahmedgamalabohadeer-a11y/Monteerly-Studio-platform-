#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
from pathlib import Path

ROOT = Path("/data/data/com.termux/files/home/monteerlyStudioPlatform")
APP  = ROOT / "src/app"
GOOD = APP / "[locale]"

def step(n, t):
    print(f"\n{'='*50}\n[{n}] {t}")

def say(m):
    print(m)

step(1, "Diagnosis: src/app contents")

if not APP.exists():
    print("APP folder not found")
    exit(1)

entries = list(APP.iterdir())
for e in sorted(entries):
    print(f"{'DIR' if e.is_dir() else 'FILE'} | {e.name}")

bad = None
for e in entries:
    if "locale" in e.name and e.name != "[locale]" and e.is_dir():
        bad = e
        break

say(f"\nBAD  = {bad}")
say(f"GOOD = {GOOD} -> exists: {GOOD.exists()}")

# إنشاء [locale] لو غير موجود
GOOD.mkdir(parents=True, exist_ok=True)

# نقل الملفات من المجلد الخطأ إن وجد
if bad and bad.exists():
    for item in bad.iterdir():
        dest = GOOD / item.name
        if item.exists():
            shutil.move(str(item), str(dest))
            say(f"moved: {item.name}")

    try:
        bad.rmdir()
        say("old folder removed")
    except:
        say("could not remove old folder")

say("DONE")
