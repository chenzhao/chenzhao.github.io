#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "${PROJECT_ROOT}"

BRANCH="$(git branch --show-current)"
COMMON_ARGS=(
  --renderToMemory
  --bind 127.0.0.1
  --port 1313
  --disableFastRender
)

case "${BRANCH}" in
  main)
    echo "正在预览公开版（main）：草稿内容不会渲染。"
    exec hugo server --environment public "${COMMON_ARGS[@]}"
    ;;
  draft)
    echo "正在预览私人版（draft）：包含草稿内容。"
    exec hugo server --environment private --buildDrafts "${COMMON_ARGS[@]}"
    ;;
  *)
    echo "当前分支是 ${BRANCH}。请切换到 main（公开版）或 draft（私人版）。"
    exit 1
    ;;
esac
