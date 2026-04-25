#!/bin/bash
PROJECT_DIR="$HOME/Monteerly-Studio-platform-"
ARCHIVE_DIR="/data/data/com.termux/files/home/storage/shared/_archive"
EXCLUDES=(
    --exclude='src/components/dashboard/KanbanBoard.tsx'
    --exclude='src/components/dashboard/AiMorningBrief.tsx'
    --exclude='src/components/contracts/DigitalSigner.tsx'
    --exclude='src/components/admin/InvoiceBuilder.tsx'
    --exclude='src/components/academy/CertificateCard.tsx'
    --exclude='src/components/academy/ContentLock.tsx'
    --exclude='src/components/academy/SkillTree.tsx'
    --exclude='src/components/academy/CourseCard.tsx'
    --exclude='src/components/academy/CoursePlayer.tsx'
    --exclude='src/components/agency/AgencyTeamList.tsx'
    --exclude='src/components/agency/WhiteLabelConfig.tsx'
    --exclude='src/components/admin/god-mode/LiveOpsMap.tsx'
    --exclude='src/components/admin/god-mode/TrafficControl.tsx'
)
echo "🚀 جاري بدء عملية الدمج الجراحي..."
tar -czf "${PROJECT_DIR}_backup.tar.gz" -C "$PROJECT_DIR" . 2>/dev/null
rsync -avu "${EXCLUDES[@]}" "$ARCHIVE_DIR/" "$PROJECT_DIR/"
echo "✅ تم الدمج بنجاح."
