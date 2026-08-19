#!/usr/bin/env bash

# 运行方式：
#   ./quick-post.sh
#
# 流程：
# 1) 启动一个本地网页（自动打开）
# 2) 选择长文或短文，填写时间与正文
# 3) 点击“发布”
# 4) 脚本自动创建文章并执行 git commit + push 到 main

set -euo pipefail

if ! command -v python3 >/dev/null 2>&1; then
  echo "未找到 python3，无法启动网页发布服务。"
  exit 1
fi

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
PORT=7865
TMP_DIR="$(mktemp -d)"
FORM_PID=""

cleanup() {
  if [ -n "${FORM_PID}" ]; then
    kill "${FORM_PID}" >/dev/null 2>&1 || true
  fi
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT INT TERM

cat > "${TMP_DIR}/publish_server.py" <<'PY'
#!/usr/bin/env python3
import datetime
import html
import http.server
import json
import os
import re
import subprocess
import sys
import threading
from pathlib import Path
from urllib.parse import unquote_plus

REPO_ROOT = Path(os.environ["REPO_ROOT"]).resolve()
PORT = int(os.environ["PORT"])

INDEX_HTML = """<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>快速发布文章</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; padding: 24px; }
    .wrap { max-width: 900px; margin: 0 auto; }
    label { display: block; margin-bottom: 12px; }
    input, select, textarea, button { width: 100%; padding: 10px; font-size: 16px; }
    textarea { min-height: 380px; line-height: 1.5; }
    .row { margin-bottom: 16px; }
    .muted { color: #666; font-size: 14px; }
    .ok { color: #1a7f37; }
    .err { color: #b00020; }
    button { background: #222; color: #fff; border: 0; border-radius: 6px; cursor: pointer; }
    .small { width: auto; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>快速发布文章</h1>
    <p class="muted">公开内容会自动生成英文版，草稿不翻译。公开长文请在 main 分支发布；私人短文请在 draft 分支发布。</p>

    <form id="postForm">
      <div class="row">
        <label for="kind">内容类型</label>
        <select id="kind" name="kind">
          <option value="article">长文（Article）</option>
          <option value="tweet">短文（Tweet）</option>
        </select>
      </div>

      <div class="row">
        <label for="title">中文标题（短文可不填）</label>
        <input id="title" name="title" type="text" placeholder="请输入长文标题" required />
      </div>

      <div class="row">
        <label for="datetime">发布时间</label>
        <input id="datetime" name="datetime" type="datetime-local" required />
      </div>

      <div class="row">
        <label for="content">中文正文（Markdown）</label>
        <textarea id="content" name="content" placeholder="在此输入完整正文..." required></textarea>
      </div>

      <button type="submit">发布</button>
      <button class="small" type="button" id="useNow">使用当前时间</button>
      <p id="status" class="muted"></p>
    </form>
  </div>

      <script>
    const dtInput = document.getElementById("datetime");
    const kindInput = document.getElementById("kind");
    const titleInput = document.getElementById("title");
    const useNowBtn = document.getElementById("useNow");
    const pad = (n) => String(n).padStart(2, "0");
    const nowLocalInput = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    dtInput.value = nowLocalInput(new Date());

    useNowBtn.addEventListener("click", () => {
      dtInput.value = nowLocalInput(new Date());
    });

    kindInput.addEventListener("change", () => {
      const isArticle = kindInput.value === "article";
      titleInput.required = isArticle;
      titleInput.placeholder = isArticle ? "请输入长文标题" : "可选；不填时自动使用发布时间";
    });

    const toOffsetDatetime = (value) => {
      const local = new Date(value);
      if (Number.isNaN(local.getTime())) return "";
      const pad = (n) => String(n).padStart(2, "0");
      const tz = -local.getTimezoneOffset();
      const sign = tz >= 0 ? "+" : "-";
      const abs = Math.abs(tz);
      const hh = pad(Math.floor(abs / 60));
      const mm = pad(abs % 60);
      const yyyy = local.getFullYear();
      const mmth = pad(local.getMonth() + 1);
      const dd = pad(local.getDate());
      const hh2 = pad(local.getHours());
      const mi = pad(local.getMinutes());
      const ss = pad(local.getSeconds());
      return `${yyyy}-${mmth}-${dd}T${hh2}:${mi}:${ss}${sign}${hh}:${mm}`;
    };

    document.getElementById("postForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const kind = kindInput.value;
      const title = document.getElementById("title").value.trim();
      const datetime = toOffsetDatetime(document.getElementById("datetime").value);
      const content = document.getElementById("content").value;
      const status = document.getElementById("status");
      status.className = "muted";
      status.textContent = "正在发布，请稍候...";

      const body = {
        kind,
        title,
        datetime,
        content
      };

      const res = await fetch("/publish", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        status.className = "ok";
        if (data.private_version) {
          status.innerHTML =
            `已提交并推送到 draft 分支。<br/>` +
            `私人版链接：<a href="${data.view_url}" target="_blank" rel="noreferrer">${data.view_url}</a>`;
        } else {
          status.innerHTML =
            `发布成功，已提交到 GitHub。<br/>` +
            `内容链接：<a href="${data.view_url}" target="_blank" rel="noreferrer">${data.view_url}</a><br/>` +
            `部署状态：<a href="${data.actions_url}" target="_blank" rel="noreferrer">Actions</a>（通常 1~2 分钟后可见）`;
        }
      } else {
        status.className = "err";
        status.textContent = `发布失败：${data.error || "请重试"}`;
      }
    });
  </script>
</body>
</html>
"""


def _safe_title_json(value: str) -> str:
  return json.dumps(value, ensure_ascii=False)


def _make_slug(title: str) -> str:
  slug = re.sub(r"\s+", "-", title.strip().lower())
  slug = re.sub(r"[^\w\-]+", "-", slug)
  slug = re.sub(r"-+", "-", slug).strip("-")
  return slug or datetime.datetime.now().strftime("%Y%m%d-%H%M%S")


def _run_git(cmd, cwd: Path):
  subprocess.run(["git", *cmd], cwd=str(cwd), check=True)


def _current_branch() -> str:
  result = subprocess.run(
    ["git", "branch", "--show-current"],
    cwd=str(REPO_ROOT),
    check=True,
    capture_output=True,
    text=True,
  )
  return result.stdout.strip()


def _publish(kind: str, title: str, date_text: str, content: str):
  if kind not in {"article", "tweet"}:
    raise ValueError("未知的内容类型")
  if kind == "article" and not title.strip():
    raise ValueError("长文标题不能为空")
  if not content.strip():
    raise ValueError("正文不能为空")
  expected_branch = "main" if kind == "article" else "draft"
  current_branch = _current_branch()
  if current_branch != expected_branch:
    raise ValueError(
      f"请先切换到 {expected_branch} 分支再发布这类内容；当前分支是 {current_branch}"
    )
  if subprocess.run(
    ["git", "diff", "--cached", "--quiet"],
    cwd=str(REPO_ROOT),
    check=False
  ).returncode != 0:
    raise ValueError("Git 暂存区已有其他修改，请先提交或取消暂存后再发布")

  if date_text:
    pub_date = date_text
  else:
    now = datetime.datetime.now().astimezone().replace(microsecond=0)
    pub_date = now.isoformat()

  if kind == "tweet" and not title.strip():
    slug = "tweet-" + re.sub(r"[^0-9]", "", pub_date[:19])
    display_title = f"Tweet · {pub_date[:16].replace('T', ' ')}"
  else:
    slug = _make_slug(title)
    display_title = title.strip()

  section = "articles" if kind == "article" else "tweets"
  posts_dir = REPO_ROOT / "content" / section
  posts_dir.mkdir(parents=True, exist_ok=True)
  post_path = posts_dir / f"{slug}.zh.md"
  i = 1
  while post_path.exists():
    post_path = posts_dir / f"{slug}-{i}.zh.md"
    i += 1

  with post_path.open("w", encoding="utf-8") as f:
    f.write("+++\n")
    f.write(f"title = {_safe_title_json(display_title)}\n")
    f.write(f"date = {_safe_title_json(pub_date)}\n")
    f.write(f"draft = {'true' if kind == 'tweet' else 'false'}\n")
    f.write("+++\n\n")
    f.write(content.rstrip("\n"))
    f.write("\n")

  translation_script = REPO_ROOT / "scripts" / "translate_content.py"
  if os.environ.get("DEEPSEEK_KEY") and translation_script.exists():
    subprocess.run(
      [sys.executable, str(translation_script), str(post_path)],
      cwd=str(REPO_ROOT),
      check=True,
    )

  slug_name = post_path.name.removesuffix(".zh.md")
  paths_to_add = [str(post_path.relative_to(REPO_ROOT))]
  english_path = post_path.with_name(slug_name + ".en.md")
  if english_path.exists():
    paths_to_add.append(str(english_path.relative_to(REPO_ROOT)))
  _run_git(["add", *paths_to_add], REPO_ROOT)
  _run_git(["commit", "-m", f"Add {kind}: {display_title}"], REPO_ROOT)
  _run_git(["push", "origin", expected_branch], REPO_ROOT)

  return {
    "ok": True,
    "private_version": kind == "tweet",
    "path": str(post_path.relative_to(REPO_ROOT)),
    "view_url": (
      f"http://localhost:1313/zh/tweets/{slug_name}/"
      if kind == "tweet"
      else f"https://chenzhao.github.io/zh/articles/{slug_name}/"
    ),
    "actions_url": "https://github.com/chenzhao/chenzhao.github.io/actions/workflows/hugo.yaml",
  }


class Handler(http.server.BaseHTTPRequestHandler):
  def _json(self, status, payload):
    body = json.dumps(payload).encode("utf-8")
    self.send_response(status)
    self.send_header("Content-Type", "application/json; charset=utf-8")
    self.send_header("Content-Length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)

  def do_GET(self):
    if self.path != "/" and self.path != "/index.html":
      self.send_response(404)
      self.send_header("Content-Type", "text/plain; charset=utf-8")
      self.end_headers()
      self.wfile.write(b"Not Found")
      return
    body = INDEX_HTML.encode("utf-8")
    self.send_response(200)
    self.send_header("Content-Type", "text/html; charset=utf-8")
    self.send_header("Content-Length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)

  def do_POST(self):
    if self.path != "/publish":
      self._json(404, {"ok": False, "error": "not found"})
      return

    length = int(self.headers.get("Content-Length", "0") or 0)
    raw = self.rfile.read(length).decode("utf-8")
    try:
      data = json.loads(raw or "{}")
    except Exception:
      self._json(400, {"ok": False, "error": "请求体不是合法 JSON"})
      return

    try:
      result = _publish(
        data.get("kind", "article"),
        data.get("title", ""),
        data.get("datetime", ""),
        data.get("content", "")
      )
      self._json(200, result)
    except subprocess.CalledProcessError:
      self._json(500, {"ok": False, "error": "Git 操作失败，请检查仓库权限/网络"})
      return
    except Exception as e:
      self._json(500, {"ok": False, "error": str(e)})
      return

    # 发布成功后关闭 server，脚本会随之退出
    threading.Thread(target=self.server.shutdown, daemon=True).start()

  def log_message(self, fmt, *args):
    return


def main():
  server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
  try:
    server.serve_forever()
  finally:
    server.server_close()


if __name__ == "__main__":
  main()
PY

cd "${PROJECT_ROOT}"
export REPO_ROOT="${PROJECT_ROOT}"
export PORT="${PORT}"

python3 "${TMP_DIR}/publish_server.py" &
FORM_PID=$!

URL="http://127.0.0.1:${PORT}"

if command -v open >/dev/null 2>&1; then
  open "${URL}"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "${URL}" >/dev/null 2>&1 || true
else
  python3 - <<PY
import webbrowser
webbrowser.open("http://127.0.0.1:${PORT}")
PY
fi

echo "已打开发布页面：${URL}"
wait "${FORM_PID}"
