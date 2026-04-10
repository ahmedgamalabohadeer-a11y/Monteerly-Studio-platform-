#!/bin/bash

REPORT_FILE="errors_report.txt"

echo "🔍 Starting automated project check..." > "$REPORT_FILE"
echo -e "\n==================== [ 1. ESLint Check ] ====================\n" >> "$REPORT_FILE"

if npm run lint >> "$REPORT_FILE" 2>&1; then
    echo "✅ ESLint: No errors found" >> "$REPORT_FILE"
else
    echo "❌ ESLint: Errors detected" >> "$REPORT_FILE"
fi

echo -e "\n==================== [ 2. TypeScript Check ] ====================\n" >> "$REPORT_FILE"

if npx tsc --noEmit >> "$REPORT_FILE" 2>&1; then
    echo "✅ TypeScript: No errors found" >> "$REPORT_FILE"
else
    echo "❌ TypeScript: Errors detected" >> "$REPORT_FILE"
fi

echo -e "\n==================== [ 3. Next.js Build Check ] ====================\n" >> "$REPORT_FILE"

if npm run build >> "$REPORT_FILE" 2>&1; then
    echo "✅ Next.js Build: Success" >> "$REPORT_FILE"
else
    echo "❌ Next.js Build: Failed" >> "$REPORT_FILE"
fi

echo -e "\n==================== [ Summary ] ====================\n" >> "$REPORT_FILE"
echo "Report generated successfully. To view, run:" >> "$REPORT_FILE"
echo "cat $REPORT_FILE" >> "$REPORT_FILE"

cat "$REPORT_FILE"
