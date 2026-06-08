# Vibe absolute path handoff

Purpose: Vibe/Copilot file tools in VS Code require absolute Windows paths. Do not use relative paths such as `dokumenter/FILE.md` when asking Vibe to read or create files.

## Correct workspace folder

Open this folder in VS Code / Mistral Vibe:

```text
C:\Users\a7788\Documents\Codex\2026-05-31\use-github-to-review-recent-notebook\work\enok-72-norge-main\clean-motor-lab-leaflet-engine-ARBEID-20260607-051347
```

## Git context

```text
Repo: https://github.com/Jone-Aase/enok-72-grok
Branch: codex/v7-kartmotor-v2-3a-single-base-tile
Current reviewed commit: 9bb330e
```

## Files Vibe should read with absolute paths

```text
C:\Users\a7788\Documents\Codex\2026-05-31\use-github-to-review-recent-notebook\work\enok-72-norge-main\clean-motor-lab-leaflet-engine-ARBEID-20260607-051347\app.js
C:\Users\a7788\Documents\Codex\2026-05-31\use-github-to-review-recent-notebook\work\enok-72-norge-main\clean-motor-lab-leaflet-engine-ARBEID-20260607-051347\index.html
C:\Users\a7788\Documents\Codex\2026-05-31\use-github-to-review-recent-notebook\work\enok-72-norge-main\clean-motor-lab-leaflet-engine-ARBEID-20260607-051347\dokumenter\KARTMOTOR-V2-3E-CONCURRENT-BASE-LOADING-MAX2-PLAN.md
C:\Users\a7788\Documents\Codex\2026-05-31\use-github-to-review-recent-notebook\work\enok-72-norge-main\clean-motor-lab-leaflet-engine-ARBEID-20260607-051347\dokumenter\KARTMOTOR-V2-3F-CONCURRENT-BASE-LOADING-MAX4-PLAN.md
```

## Files Vibe may create with absolute paths

If Vibe needs to create the old 3E PR brief, use this absolute path:

```text
C:\Users\a7788\Documents\Codex\2026-05-31\use-github-to-review-recent-notebook\work\enok-72-norge-main\clean-motor-lab-leaflet-engine-ARBEID-20260607-051347\dokumenter\PR-3E-brief.md
```

## Review instruction for Vibe

Review Kartmotor V2 3F at commit `9bb330e`.

Scope:

- maxConcurrent = 4
- same 24 base tiles as 3E
- 16 base:visible + 8 base:keep
- visible before keep
- no overlay
- no Se Eiendom / Matrikkel
- no retry, fallback, prune, cache, retiring
- clean-motor remains visible as backup

Do not change:

- clean-motor
- Instrument geometry
- anchors
- GE-grid
- aeProject
- transform
- scale
- rotation
- tile positions
- map proportions

## Why the previous tool calls failed

The VS Code log showed errors like:

```text
Invalid input path: dokumenter/KARTMOTOR-V2-3E-CONCURRENT-BASE-LOADING-MAX2-PLAN.md.
Be sure to use an absolute path.
```

Fix: pass the full absolute path listed above.
