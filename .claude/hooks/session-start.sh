#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR}"

echo "==> Installing Ruby gem dependencies..."
bundle install

if [ -f "dashboard/package.json" ]; then
  echo "==> Installing Node.js dependencies for dashboard..."
  npm ci --prefix dashboard
fi

echo "==> Dependencies installed."
