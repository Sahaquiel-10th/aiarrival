#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="aiarrival-website"
APP_ROOT="/opt/aiarrival-website"
REPOSITORY="$APP_ROOT/repository"
RELEASES="$APP_ROOT/releases"
CURRENT="$APP_ROOT/current"
REQUESTED_REF="${1:-origin/main}"

mkdir -p "$RELEASES"

exec 9>"$APP_ROOT/.deploy.lock"
if ! flock -n 9; then
  echo "Another deployment is already running."
  exit 1
fi

if [[ ! -d "$REPOSITORY/.git" ]]; then
  echo "Repository is missing at $REPOSITORY. Run the bootstrap steps first."
  exit 1
fi

git -C "$REPOSITORY" fetch origin main --prune

if [[ "$REQUESTED_REF" =~ ^[0-9a-f]{40}$ ]]; then
  git -C "$REPOSITORY" cat-file -e "$REQUESTED_REF^{commit}"
  DEPLOY_SHA="$REQUESTED_REF"
else
  DEPLOY_SHA="$(git -C "$REPOSITORY" rev-parse 'origin/main^{commit}')"
fi

git -C "$REPOSITORY" show "$DEPLOY_SHA:deploy/server-deploy.sh" > "$APP_ROOT/deploy.sh.next"
chmod 755 "$APP_ROOT/deploy.sh.next"
mv -Tf "$APP_ROOT/deploy.sh.next" "$APP_ROOT/deploy.sh"

RELEASE_ID="$(date -u +%Y%m%d%H%M%S)-${DEPLOY_SHA:0:12}"
RELEASE_DIR="$RELEASES/$RELEASE_ID"
PREVIOUS_RELEASE="$(readlink -f "$CURRENT" 2>/dev/null || true)"

mkdir -p "$RELEASE_DIR"
git -C "$REPOSITORY" archive "$DEPLOY_SHA" | tar -x -C "$RELEASE_DIR"

cd "$RELEASE_DIR"
npm ci --no-audit --no-fund
npm run build

if [[ ! -f "$RELEASE_DIR/dist/server/index.js" ]]; then
  echo "Build validation failed: dist/server/index.js was not created."
  exit 1
fi

ln -sfn "$RELEASE_DIR" "$APP_ROOT/current.next"
mv -Tf "$APP_ROOT/current.next" "$CURRENT"

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 startOrReload "$RELEASE_DIR/ecosystem.config.cjs" --update-env
else
  pm2 start "$RELEASE_DIR/ecosystem.config.cjs"
fi

HEALTHY=false
for _ in {1..15}; do
  if curl -fsS --max-time 5 http://127.0.0.1:3020/ >/dev/null; then
    HEALTHY=true
    break
  fi
  sleep 2
done

if [[ "$HEALTHY" != "true" ]]; then
  echo "Health check failed. Restoring the previous release."
  if [[ -n "$PREVIOUS_RELEASE" && -d "$PREVIOUS_RELEASE" ]]; then
    ln -sfn "$PREVIOUS_RELEASE" "$APP_ROOT/current.next"
    mv -Tf "$APP_ROOT/current.next" "$CURRENT"
    pm2 startOrReload "$PREVIOUS_RELEASE/ecosystem.config.cjs" --update-env
  else
    pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
  fi
  exit 1
fi

pm2 save

mapfile -t OLD_RELEASES < <(ls -1dt "$RELEASES"/* 2>/dev/null | tail -n +6 || true)
for OLD_RELEASE in "${OLD_RELEASES[@]}"; do
  if [[ "$OLD_RELEASE" == "$RELEASES/"* && "$OLD_RELEASE" != "$(readlink -f "$CURRENT")" ]]; then
    rm -rf -- "$OLD_RELEASE"
  fi
done

echo "Deployment succeeded: $DEPLOY_SHA"
