#!/bin/bash
# ─────────────────────────────────────────────────────────────
# CIHE Survey — One-click GitHub deploy script
# Run this from the folder containing index.html
# ─────────────────────────────────────────────────────────────

echo ""
echo "🎓 CIHE RES 901 — Survey App Deploy"
echo "────────────────────────────────────"

# Check git is installed
if ! command -v git &> /dev/null; then
  echo "❌  Git is not installed. Download it from https://git-scm.com"
  exit 1
fi

# Init repo and push
git init
git add index.html README.md google-apps-script.js
git commit -m "Deploy CIHE RES 901 survey app"
git branch -M main
git remote add origin https://github.com/Rajkumarb7/cihe-survey.git
git push -u origin main --force

echo ""
echo "✅  Done! Enable GitHub Pages:"
echo "   → github.com/Rajkumarb7/cihe-survey → Settings → Pages"
echo "   → Source: Deploy from branch → main → / (root) → Save"
echo ""
echo "🔗  Your survey will be live at:"
echo "   https://rajkumarb7.github.io/cihe-survey"
echo ""
