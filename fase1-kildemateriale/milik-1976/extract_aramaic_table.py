#!/usr/bin/env python3
"""
Bygger oversiktstabell over aramaiske 4Q208-211 (4QEnastr a-d) fragmenter
fra Milik 1976, koblet til Enoks bok kapitler 72-82.
"""
import re
from pathlib import Path

TEXT = Path("/home/user/workspace/enok-72-truth-instrument/fase1-kildemateriale/milik-1976/milik-1976-tekst.txt").read_text()
lines = TEXT.splitlines()

# Finn alle linjer som inneholder fragment-til-vers-mapping
patterns = [
    # Direkte vers-referanser
    (r"(4QEnastr[a-zA-Z?\*\.°abcd]+)\s*[\dij]*[—=]\s*(En\.?\s*\d+\s*[:\.]\s*\d+(?:[-–]\s*\d+(?:\s*[:\.]\s*\d+)?)?)", "frag→vers"),
    # Vers-til-fragment (motsatt retning)
    (r"(En\.?\s*\d+\s*[:\.]\s*\d+(?:[-–]\s*\d+(?:\s*[:\.]\s*\d+)?)?)[—=]\s*(4QEnastr[a-zA-Z?\*\.°abcd]+)", "vers→frag"),
]

matches = []
for i, line in enumerate(lines, 1):
    for pat, label in patterns:
        for m in re.finditer(pat, line):
            matches.append((i, label, m.group(0).strip(), line.strip()[:150]))

# Skriv ut alle treff
print(f"Funnet {len(matches)} fragment-vers-koblinger i Milik 1976:\n")
for lnum, label, match, context in matches[:50]:
    print(f"L{lnum:6} [{label}] {match}")
    
# Lag oversiktstabell
print("\n" + "="*70)
print("OVERSIKTSTABELL: Aramaiske 4Q-fragmenter ↔ Enoks bok kap 72-82")
print("="*70)
