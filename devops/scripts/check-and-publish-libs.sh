#!/bin/bash
set -euo pipefail

base_ref=${1:-"HEAD~1"}
head_ref=${2:-"HEAD"}
dry_run=${3:-true}

mapfile -t CHANGED_FILES < <(git diff --name-only "$base_ref" "$head_ref" -- 'libs/**/package.json')

if [ ${#CHANGED_FILES[@]} -eq 0 ]; then
  echo "No package.json changes detected."
  exit 0
fi

FAILED=false
declare -a PACKAGES_TO_PUBLISH=()

for file in "${CHANGED_FILES[@]}"; do
  package_name=$(jq -r '.name' "$file")
  new_version=$(jq -r '.version' "$file")

  if git cat-file -e "$base_ref:$file" 2>/dev/null; then
    old_version=$(git show "$base_ref:$file" | jq -r '.version')
    old_name=$(git show "$base_ref:$file" | jq -r '.name')

    if [ "$package_name" != "$old_name" ]; then
      echo "📦 New package name detected: $package_name@$new_version"
      PACKAGES_TO_PUBLISH+=("$file")
    else
      if [ "$new_version" == "$old_version" ]; then
        echo "❌ Version not changed for $package_name (still $new_version)"
        FAILED=true
      elif [ "$(printf '%s\n%s' "$old_version" "$new_version" | sort -V | head -n1)" != "$old_version" ]; then
        echo "❌ Version decreased for $package_name ($old_version → $new_version)"
        FAILED=true
      else
        echo "✅ Version increased for $package_name ($old_version → $new_version)"
        PACKAGES_TO_PUBLISH+=("$file")
      fi
    fi
  else
    echo "📦 Completely new package detected: $package_name@$new_version"
    PACKAGES_TO_PUBLISH+=("$file")
  fi
done

if [ "${FAILED:-false}" = true ]; then
  echo "Version issues found, exiting."
  exit 1
fi

if [ ${#PACKAGES_TO_PUBLISH[@]} -eq 0 ]; then
  echo "No packages to publish."
  exit 0
fi

npm install

if [ "$dry_run" = true ]; then
  echo "🛠️ Building packages (CI mode)..."
  npm run build:deploy-libs
else
  echo "🛠️ Building packages (CD mode)..."
  npm run build:deploy-libs:ci
fi

echo "📌 Packages ready for publish:"
for file in "${PACKAGES_TO_PUBLISH[@]}"; do
  pkg=$(jq -r '.name + "@" + .version' "$file")
  dist_dir="dist/$(dirname "$file")"
  echo "🔍 Testing publish for $pkg..."

  if [ ! -d "$dist_dir" ]; then
    echo "❌ Missing build directory for $pkg at $dist_dir"
    FAILED=true
    continue
  fi

  cd "$dist_dir"
  if npm publish --dry-run --no-git-checks; then
    echo "✅ Dry-run publish successful for $pkg"
  else
    echo "❌ Dry-run publish FAILED for $pkg"
    FAILED=true
  fi
  cd - > /dev/null
done

if [ "${FAILED:-false}" = true ]; then
  echo "One or more dry-run publishes failed. Exiting."
  exit 1
fi

if [ "$dry_run" = true ]; then
  echo "🚧 Dry-run mode enabled, skipping actual publish."
  exit 0
fi

echo "🚀 Publishing packages for real..."
for file in "${PACKAGES_TO_PUBLISH[@]}"; do
  pkg=$(jq -r '.name + "@" + .version' "$file")
  dist_dir="dist/$(dirname "$file")"
  cd "$dist_dir"
  echo "Publishing $pkg..."
  npm publish --access=public || { echo "❌ Failed to publish $pkg"; exit 1; }
  echo "✅ Published $pkg"
  cd - > /dev/null
done

echo "🎉 All packages published successfully."
