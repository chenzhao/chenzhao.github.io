#!/usr/bin/env python3

"""Generate English Hugo content files from Chinese .zh.md sources."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"
API_URL = "https://api.deepseek.com/chat/completions"
DEFAULT_MODEL = "deepseek-v4-pro"
TITLE_MARKER = "<<<TITLE>>>"
BODY_MARKER = "<<<BODY>>>"

INSTRUCTIONS = """You are the English translator and literary editor for a bilingual personal website.
Translate Chinese into natural, publication-quality English. Preserve the author's voice, pacing,
ambiguity, argument structure, imagery, paragraph breaks, Markdown formatting, links, HTML, Hugo
shortcodes, LaTeX, code, tables, and proper nouns. Do not summarize, omit, explain, censor, or add
new claims. For fiction and reflective prose, favor precise literary English over literal stiffness.
Return only the two requested marker sections and no commentary."""


def split_front_matter(text: str) -> tuple[str, str]:
  if not text.startswith("+++\n"):
    raise ValueError("expected TOML front matter starting with +++")
  end = text.find("\n+++\n", 4)
  if end < 0:
    raise ValueError("unterminated TOML front matter")
  return text[4:end], text[end + 5:].lstrip("\n")


def get_string_field(front_matter: str, key: str) -> str | None:
  match = re.search(
    rf"(?m)^{re.escape(key)}\s*=\s*(['\"])(.*?)\1\s*$", front_matter
  )
  return match.group(2) if match else None


def get_title(front_matter: str) -> str:
  match = get_string_field(front_matter, "title")
  if not match:
    raise ValueError("front matter has no simple title field")
  return match


def set_string_field(front_matter: str, key: str, value: str) -> str:
  encoded = json.dumps(value, ensure_ascii=False)
  pattern = re.compile(rf"(?m)^{re.escape(key)}\s*=.*$")
  replacement = f"{key} = {encoded}"
  if pattern.search(front_matter):
    return pattern.sub(replacement, front_matter, count=1)
  return front_matter.rstrip() + "\n" + replacement


def remove_field(front_matter: str, key: str) -> str:
  pattern = re.compile(rf"(?m)^{re.escape(key)}\s*=.*\n?")
  return pattern.sub("", front_matter)


def existing_source_hash(path: Path) -> str | None:
  if not path.exists():
    return None
  front_matter, _ = split_front_matter(path.read_text(encoding="utf-8"))
  match = re.search(
    r'(?m)^translation_source_hash\s*=\s*["\']([0-9a-f]+)["\']\s*$',
    front_matter,
  )
  return match.group(1) if match else None


def response_text(payload: dict) -> str:
  try:
    text = payload["choices"][0]["message"]["content"]
  except (KeyError, IndexError, TypeError) as error:
    raise RuntimeError("DeepSeek response did not contain message content") from error
  if not text:
    raise RuntimeError("DeepSeek returned empty message content")
  return text.strip()


def translate(title: str, body: str, api_key: str, model: str) -> tuple[str, str]:
  prompt = f"""Translate the following Hugo page from Chinese to English.

Return exactly this structure:
{TITLE_MARKER}
<translated title, one line>
{BODY_MARKER}
<translated Markdown body>

SOURCE TITLE:
{title}

SOURCE MARKDOWN BODY:
{body}
"""
  request_body = json.dumps({
    "model": model,
    "messages": [
      {"role": "system", "content": INSTRUCTIONS},
      {"role": "user", "content": prompt},
    ],
    "thinking": {"type": "enabled"},
    "reasoning_effort": "high",
    "max_tokens": 50000,
    "stream": False,
  }).encode("utf-8")
  request = urllib.request.Request(
    API_URL,
    data=request_body,
    headers={
      "Authorization": f"Bearer {api_key}",
      "Content-Type": "application/json",
    },
    method="POST",
  )
  try:
    with urllib.request.urlopen(request, timeout=600) as response:
      result = json.load(response)
  except urllib.error.HTTPError as error:
    detail = error.read().decode("utf-8", errors="replace")
    raise RuntimeError(f"DeepSeek API returned HTTP {error.code}: {detail}") from error

  output = response_text(result)
  if TITLE_MARKER not in output or BODY_MARKER not in output:
    raise RuntimeError("translation response is missing required markers")
  _, after_title = output.split(TITLE_MARKER, 1)
  translated_title, translated_body = after_title.split(BODY_MARKER, 1)
  return translated_title.strip(), translated_body.strip()


def target_for(source: Path) -> Path:
  if not source.name.endswith(".zh.md"):
    raise ValueError(f"not a Chinese source file: {source}")
  return source.with_name(source.name.removesuffix(".zh.md") + ".en.md")


def translate_file(source: Path, api_key: str, model: str, force: bool) -> bool:
  source = source.resolve()
  raw = source.read_text(encoding="utf-8")
  digest = hashlib.sha256(raw.encode("utf-8")).hexdigest()
  target = target_for(source)
  if not force and existing_source_hash(target) == digest:
    print(f"up to date: {source.relative_to(ROOT)}")
    return False

  front_matter, body = split_front_matter(raw)
  title = get_title(front_matter)
  title_override = get_string_field(front_matter, "translation_title")
  body_override = get_string_field(front_matter, "translation_body")
  print(f"translating: {source.relative_to(ROOT)} -> {target.relative_to(ROOT)}")
  translated_title, translated_body = translate(title, body, api_key, model)
  if title_override is not None:
    translated_title = title_override
  if body_override is not None:
    translated_body = body_override
  elif not body.strip():
    translated_body = ""

  translated_front_matter = set_string_field(front_matter, "title", translated_title)
  translated_front_matter = remove_field(translated_front_matter, "translation_title")
  translated_front_matter = remove_field(translated_front_matter, "translation_body")
  translated_front_matter = set_string_field(
    translated_front_matter, "translation_source_hash", digest
  )
  rendered = f"+++\n{translated_front_matter.rstrip()}\n+++\n"
  if translated_body:
    rendered += f"\n{translated_body.rstrip()}\n"
  target.write_text(rendered, encoding="utf-8")
  return True


def parse_args() -> argparse.Namespace:
  parser = argparse.ArgumentParser()
  parser.add_argument("paths", nargs="*", type=Path)
  parser.add_argument("--force", action="store_true")
  parser.add_argument(
    "--check",
    action="store_true",
    help="fail when a Chinese source does not have an English counterpart",
  )
  parser.add_argument(
    "--model", default=os.environ.get("DEEPSEEK_TRANSLATION_MODEL", DEFAULT_MODEL)
  )
  return parser.parse_args()


def main() -> int:
  args = parse_args()
  sources = args.paths or sorted(CONTENT_DIR.rglob("*.zh.md"))
  if args.check:
    missing = []
    stale = []
    for source in sources:
      path = source if source.is_absolute() else ROOT / source
      target = target_for(path)
      if not target.exists():
        missing.append(path.relative_to(ROOT))
        continue
      digest = hashlib.sha256(path.read_bytes()).hexdigest()
      if existing_source_hash(target) != digest:
        stale.append(path.relative_to(ROOT))
    if missing or stale:
      if missing:
        print("Missing English translations:", file=sys.stderr)
      for path in missing:
        print(f"  {path}", file=sys.stderr)
      if stale:
        print("Outdated English translations:", file=sys.stderr)
      for path in stale:
        print(f"  {path}", file=sys.stderr)
      return 1
    print(f"all {len(sources)} Chinese content files have English counterparts")
    return 0

  api_key = os.environ.get("DEEPSEEK_KEY", "").strip()
  if not api_key:
    print(
      "DEEPSEEK_KEY is required. Configure it locally or as a GitHub Actions secret.",
      file=sys.stderr,
    )
    return 2

  changed = 0
  for source in sources:
    path = source if source.is_absolute() else ROOT / source
    changed += int(translate_file(path, api_key, args.model, args.force))
  print(f"generated {changed} English translation(s)")
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
