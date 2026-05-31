#!/usr/bin/env python3
"""
Trinn 1.1 — Trekker ut kap. 72-82 fra Charles 1912 OCR-tekst,
skiller hovedvers fra Charles' kommentar, og lagrer rene per-kapittel-filer.
"""
import re
from pathlib import Path

SRC = Path("/home/user/workspace/enok-72-truth-instrument/fase1-kildemateriale/charles-1912/charles-1912-tekst.txt")
OUT_DIR = Path("/home/user/workspace/enok-72-truth-instrument/fase1-kildemateriale/charles-1912/kapitler-rene")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Kapittelgrenser i kildefilen (vers-start linje for hovedteksten):
CHAPTER_BOUNDARIES = [
    (72, 25424, 25903),    # 72 starter på 25424, slutter rett før 73
    (73, 25904, 26128),
    (74, 26129, 26447),
    (75, 26448, 26647),
    (76, 26648, 26819),
    (77, 26820, 26898),
    (78, 26899, 27223),    # kap 78 antas slutte rett før kap 79
    (79, 27224, 27275),
    (80, 27276, 27491),
    (81, 27492, 27659),
    (82, 27660, 28208),    # 82 slutter før 83
]

# Last hele filen
with open(SRC, encoding="utf-8", errors="replace") as f:
    all_lines = f.readlines()

def is_likely_verse_text(line, prev_was_verse=False):
    """Heuristikk: skiller selve oversettelsen fra Charles' kommentar."""
    s = line.strip()
    if not s:
        return None  # blank linje - bevares
    # Kommentar-markører
    if re.match(r"^(Sect\.|Chapters?\s+L|Page|\d{2,4}\s*$|\d+\s*The Book of Enoch)", s):
        return False
    if re.search(r"\[Sect\.", s):
        return False
    # Charles' kommentar starter typisk med kapittel-Roman + punktum + tekst om innholdet
    # f.eks. "LXXII. 1. As in the Parables..."
    # mens hovedteksten er: "LXXII. 1. The Book of the courses..."
    return True

# Forenklet tilnærming: vi tar HELE intervallet og MARKERER hvor kommentaren begynner
# i hver fil. Kommentaren begynner typisk ved den andre forekomsten av kap-Roman + ". 1."
# eller etter klar indikator.

for chap_num, start, end in CHAPTER_BOUNDARIES:
    raw_block = all_lines[start-1:end]
    
    # Romersk tall for kapittelet
    roman_map = {72:"LXXII", 73:"LXXIII", 74:"LXXIV", 75:"LXXV", 76:"LXXVI",
                 77:"LXXVII", 78:"LXXVIII", 79:"LXXIX", 80:"LXXX", 81:"LXXXI", 82:"LXXXII"}
    roman = roman_map[chap_num]
    
    # Finn første og andre forekomst av kapittel-overskrift som "LXXII." på egen linje-start
    main_text_lines = []
    commentary_start_idx = None
    
    # Strategi: hovedteksten har vers-numre (1., 2., 3., etc.) i prosatekst.
    # Kommentaren starter med "<roman>. 1." eller "<roman>." og diskuterer innholdet.
    # Vi looker for the pattern: hovedteksten er den FØRSTE løpende prosaen,
    # og kommentaren starter ved den andre forekomsten av "<roman>." eller ved en sed mark.
    
    # Enklere: vi lagrer hele blokken og merker den manuelt etterpå.
    cleaned = []
    for line in raw_block:
        # Rens linjeenden
        line = line.rstrip()
        cleaned.append(line)
    
    out_path = OUT_DIR / f"kap{chap_num}-charles-1912-raa.txt"
    with open(out_path, "w", encoding="utf-8") as out:
        out.write(f"# Charles 1912 — Kapittel {chap_num} ({roman}) — RÅUTDRAG\n")
        out.write(f"# Linjer {start}-{end} fra charles-1912-tekst.txt\n")
        out.write(f"# Inneholder både hovedvers og Charles' kommentar — må renses videre\n")
        out.write("=" * 70 + "\n\n")
        for line in cleaned:
            out.write(line + "\n")
    
    print(f"Kap {chap_num}: skrevet til {out_path.name} ({len(cleaned)} linjer)")

print("\nFerdig med råutdrag for kap. 72-82.")
