#!/data/data/com.termux/files/usr/bin/bash
set -e
ROOT="$HOME/Monteerly-Studio-platform-"

echo "=================================================="
echo " Monteerly Ops Engine Validation"
echo "=================================================="

check_file() {
  if [ -f "$1" ]; then
    echo "✅ Found: $1"
  else
    echo "❌ Missing: $1"
  fi
}

check_exec() {
  if [ -x "$1" ]; then
    echo "✅ Executable: $1"
  else
    echo "❌ Not executable: $1"
  fi
}

check_file "$ROOT/docs/governance/Feature-Production-Blueprint-Template.md"
check_file "$ROOT/docs/governance/Feature-Registry.md"
check_file "$ROOT/docs/governance/Termux-Operations-Manual.md"
check_exec "$ROOT/tools/new_feature_blueprint.sh"
check_exec "$ROOT/tools/list_blueprints.sh"
check_exec "$ROOT/tools/validate_ops_engine.sh"
check_exec "$ROOT/tools/start_ops_session.sh"

if [ -d "$ROOT/docs/sprints" ]; then
  echo "✅ Found: $ROOT/docs/sprints"
else
  echo "❌ Missing: $ROOT/docs/sprints"
fi

echo "=================================================="
echo " Validation complete"
echo "=================================================="
