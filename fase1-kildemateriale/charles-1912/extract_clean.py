#!/usr/bin/env python3
"""
Ekstraherer ren verstekst fra pplx-fetched JSON-filer og lagrer som .md per kapittel.
"""
import json
import re
from pathlib import Path

BASE = Path("/home/user/workspace/enok-72-truth-instrument/fase1-kildemateriale/charles-1912/kapitler-rene-final")

ROMAN = {72:"LXXII",73:"LXXIII",74:"LXXIV",75:"LXXV",76:"LXXVI",77:"LXXVII",78:"LXXVIII",79:"LXXIX",80:"LXXX",81:"LXXXI",82:"LXXXII"}

for kap in range(72, 83):
    src = BASE / f"kap{kap}-fetched.json"
    if not src.exists():
        print(f"Mangler: {src}")
        continue
    data = json.loads(src.read_text())
    content = data.get("content", "")
    
    # Tell antall vers i hentet tekst
    verses = re.findall(r"(?:^|\n)\s*(\d+)\.\s", content)
    
    md = f"""# Enoks bok kapittel {kap} ({ROMAN[kap]})
# Kilde: R.H. Charles 1917 (Sacred Texts Archive)
# URL: {data.get('url', '')}
# Fase 1 — Trinn 1.1: Ren verstekst, INGEN kommentar
# Antall vers identifisert i automatisk parsing: {len(verses)}

---

{content}
"""
    out = BASE / f"kap{kap}-charles-1917-ren.md"
    out.write_text(md)
    print(f"kap{kap}: {len(content)} tegn, vers-nummer funnet: {sorted(set(int(v) for v in verses))}")
