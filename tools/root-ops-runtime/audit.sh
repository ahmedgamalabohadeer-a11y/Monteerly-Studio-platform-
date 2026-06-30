#!/bin/bash

# المسارات الأساسية
PROJECT_DIR="$HOME/Monteerly-Studio-platform-"
ARCHIVE_DIR="/data/data/com.termux/files/home/storage/shared/_archive"
LOG_FILE="surgical_audit_$(date +%Y%m%d).log"

# قائمة الملفات المحمية (TypeUI)
PROTECTED_FILES=(
    "src/components/dashboard/KanbanBoard.tsx"
    "src/components/dashboard/AiMorningBrief.tsx"
    "src/components/contracts/DigitalSigner.tsx"
    "src/components/admin/InvoiceBuilder.tsx"
    "src/components/academy/CertificateCard.tsx"
    "src/components/academy/ContentLock.tsx"
    "src/components/academy/SkillTree.tsx"
    "src/components/academy/CourseCard.tsx"
    "src/components/academy/CoursePlayer.tsx"
    "src/components/agency/AgencyTeamList.tsx"
    "src/components/agency/WhiteLabelConfig.tsx"
    "src/components/admin/god-mode/LiveOpsMap.tsx"
    "src/components/admin/god-mode/TrafficControl.tsx"
)

echo "--- [بدء الفحص والتحقق من التبعيات لـ Monteerly Studio] ---" | tee $LOG_FILE

validate_imports() {
    local file=$1
    if [ ! -f "$file" ]; then return; fi
    echo "  [فحص التبعيات لـ: $(basename "$file")]" >> $LOG_FILE
    
    grep -E "from ['\"](@/|\.\.?/)" "$file" | sed -E "s/.*from ['\"](.*)['\"].*/\1/" | while read -r import_path; do
        actual_path=$import_path
        [[ $import_path == @/* ]] && actual_path="${import_path/@/src}"
        
        if [ ! -f "$PROJECT_DIR/$actual_path.tsx" ] && [ ! -f "$PROJECT_DIR/$actual_path.ts" ] && \
           [ ! -f "$ARCHIVE_DIR/$actual_path.tsx" ] && [ ! -f "$ARCHIVE_DIR/$actual_path.ts" ] && \
           [[ $import_path == @/* ]]; then
            echo "    ⚠️ تنبيه: التبعية [$import_path] مفقودة." | tee -a $LOG_FILE
        fi
    done
}

# المسح والدمج الافتراضي
find "$ARCHIVE_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.json" \) | while read -r src_file; do
    rel_path="${src_file#$ARCHIVE_DIR/}"
    dest_file="$PROJECT_DIR/$rel_path"

    is_protected=false
    for p in "${PROTECTED_FILES[@]}"; do
        if [[ "$rel_path" == "$p" ]]; then is_protected=true; break; fi
    done

    if [ "$is_protected" = true ]; then
        echo "[تخطي - محمي] $rel_path" >> $LOG_FILE
    else
        if [ ! -f "$dest_file" ]; then
            echo "[إضافة جديدة] $rel_path" | tee -a $LOG_FILE
            validate_imports "$src_file"
        else
            echo "[تحديث/تطوير] $rel_path" | tee -a $LOG_FILE
            validate_imports "$src_file"
        fi
    fi
done

echo "--- [انتهى الفحص. التقرير جاهز في: $LOG_FILE] ---"
