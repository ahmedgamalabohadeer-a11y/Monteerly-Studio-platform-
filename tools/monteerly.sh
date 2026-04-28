#!/data/data/com.termux/files/usr/bin/bash
CMD="$1"; ARG="$2"
case "$CMD" in
  init) echo "🧩 MCOS: Initializing..."; ./tools/validate_ops_engine.sh ;;
  build) echo "🚀 MCOS: Building $ARG..."; ./tools/new_feature_blueprint.sh "$ARG" ;;
  sync) echo "🔄 MCOS: Syncing..."; git pull origin main && git status ;;
  audit) echo "📊 MCOS: Financial Audit..."; curl -s "https://monteerly-studio-platform.vercel.app/api/db-health" | jq . ;;
  *) echo "Usage: monteerly [init|build|sync|audit]" ;;
esac
