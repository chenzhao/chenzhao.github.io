#!/usr/bin/env python3
"""Add Google Analytics to HTML files in the deployment artifact."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


HEAD_CLOSE = re.compile(r"</head\s*>", re.IGNORECASE)
MEASUREMENT_ID = re.compile(r"^G-[A-Z0-9]+$")
GTAG_LOADER = re.compile(
    r"https://www\.googletagmanager\.com/gtag/js\?id=([^\"'&<>\s]+)",
    re.IGNORECASE,
)


def analytics_snippet(measurement_id: str) -> str:
    return f"""<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={measurement_id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());

  gtag('config', '{measurement_id}');
</script>"""


def inject_file(path: Path, measurement_id: str) -> str:
    html = path.read_text(encoding="utf-8")
    loader_ids = GTAG_LOADER.findall(html)

    if loader_ids:
        if len(loader_ids) != 1:
            raise RuntimeError(f"{path} contains {len(loader_ids)} Google tag loaders")
        if loader_ids[0].upper() != measurement_id:
            raise RuntimeError(
                f"{path} contains Google tag {loader_ids[0]}, expected {measurement_id}"
            )
        return "existing"

    if measurement_id in html:
        raise RuntimeError(f"{path} contains {measurement_id} without its loader")

    head_close = HEAD_CLOSE.search(html)
    if head_close is None:
        return "no-head"

    snippet = analytics_snippet(measurement_id)
    updated = f"{html[:head_close.start()]}{snippet}\n{html[head_close.start():]}"
    path.write_text(updated, encoding="utf-8")
    return "injected"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("html_root", type=Path)
    parser.add_argument("measurement_id")
    args = parser.parse_args()

    measurement_id = args.measurement_id.upper()
    if not MEASUREMENT_ID.fullmatch(measurement_id):
        parser.error("measurement_id must be a GA4 ID such as G-XXXXXXXXXX")
    if not args.html_root.is_dir():
        parser.error(f"HTML root does not exist: {args.html_root}")

    results = {"injected": 0, "existing": 0, "no-head": 0}
    html_files = sorted(args.html_root.rglob("*.html"))
    if not html_files:
        parser.error(f"No HTML files found under {args.html_root}")

    for path in html_files:
        results[inject_file(path, measurement_id)] += 1

    print(
        "Google Analytics: "
        f"injected={results['injected']}, "
        f"existing={results['existing']}, "
        f"without_head={results['no-head']}"
    )
    if results["no-head"]:
        raise RuntimeError(
            f"{results['no-head']} HTML file(s) did not contain a closing </head> tag"
        )


if __name__ == "__main__":
    main()
