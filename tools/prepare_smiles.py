#!/usr/bin/env python3
"""Extract a small, named set of original ICQ animations for the promo."""
from __future__ import annotations
import argparse
import zipfile
from pathlib import Path

WANTED = ["YAHOO", "DANCE", "ROFL", "IN LOVE", "WINK", "THUMBS UP", "BYE"]

def parse_names(path: Path):
    rows = []
    for raw in path.read_text(encoding="utf-8-sig").splitlines():
        raw = raw.strip().lstrip("\ufeff")
        if not raw or raw.startswith((";", "#")):
            continue
        aliases = [x.strip().strip("*").upper() for x in raw.split(",") if x.strip()]
        rows.append(aliases)
    return rows

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--zip", type=Path, required=True)
    p.add_argument("--ini", type=Path, required=True)
    p.add_argument("--out", type=Path, default=Path("public/smiles"))
    args = p.parse_args()
    names = parse_names(args.ini)
    args.out.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(args.zip) as z:
        gifs = sorted((n for n in z.namelist() if n.lower().endswith(".gif")),
                      key=lambda n: Path(n).name.lower())
        if len(gifs) < len(names) + 1:
            raise SystemExit(f"GIF count mismatch: {len(gifs)} files, {len(names)} INI entries")
        # Match the verified one-file offset used by the catalogue builder.
        paired = gifs[1:1 + len(names)]
        found = {}
        for gif, aliases in zip(paired, names):
            for alias in aliases:
                found.setdefault(alias, gif)
        missing = [name for name in WANTED if name not in found]
        if missing:
            raise SystemExit("Missing requested ICQ animations: " + ", ".join(missing))
        for i, name in enumerate(WANTED, 1):
            target = args.out / f"{i:02d}-{name.lower().replace(' ', '-')}.gif"
            target.write_bytes(z.read(found[name]))
            print(f"{name}: {found[name]} -> {target} ({target.stat().st_size} bytes)")
        print(f"Extracted {len(WANTED)} original animated GIFs.")
if __name__ == "__main__":
    main()
