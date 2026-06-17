# CODEX SKY START HER - E-Earth / Gamingmotor

Generated: 2026-06-17
Source: Sanitized AgentMemory project status via local Codex
Purpose: Give Codex Sky enough project context to act as backup nr. 2 without direct local AM access.

## Role

Codex Sky is backup nr. 2 after local Codex.

Codex Sky may help with GitHub-oriented repo, branch, diff, PR and planning work, but must not assume local Windows, VS Code, PowerShell, Go Live, or clean working-tree state unless Jone or local Codex/Grok provides terminal output.



## Historical GitHub Setup Notes - Do Not Treat As Current Truth

Older Codex Sky/setup conversations mention `Jone-Aase/enok-72-norge`, `Jone-Aase/enok-72-truth-instrument`, a blocked proxy, and attempts to install/use `gh` in an isolated container. Treat those notes as historical setup context only.

Current GE-GPS work remains on `Jone-Aase/enok-72-grok`, local working copy `C:\Users\a7788\Desktop\enok-72-grok-ge-gps-1a-format-alias-clean`, and the branches named in this handoff. Do not use `enok-72-norge` or `truth-instrument` as current GE-GPS working original unless Jone explicitly changes the plan.

## Known Codex Sky Environment Caveat

A previous Codex Sky/container session reported:

```text
cwd: /workspace/enok-72-grok
branch: work
remote: none
upstream: none
gh CLI: not installed
ssh: available
git: 2.43.0
```

If Codex Sky sees this shape again, it must treat it as an isolated cloud/container worktree, not as Jone's local machine and not as the authoritative local GE-GPS clone.

Codex Sky should not push from that environment unless Jone explicitly sets up safe authentication. Preferred current bridge flow: local Codex/Grok pushes the sanitized handoff branch, then Codex Sky reads it from GitHub.

## Repository

Repo:

```text
Jone-Aase/enok-72-grok
```

Base / arbeidsoriginal:

```text
arbeidsoriginal/ge-nett-0e-2026-06-13
```

Current local clean GE-GPS branch reported by local Codex:

```text
feature/ge-gps-1a-format-alias
```

Current local HEAD reported by local Codex:

```text
c79bfc6f1144c276d25afc1eefd926afe0275677
```

## Next Project Plan

1. GE-GPS-1B - camera readout: camera aim point on Layer 1 plane -> lat/lon.
2. GE-GPS-1C - camera height / zoom / internal LOD value.
3. GE-GPS-1D - tile / firkantnett selection based on camera GE lat/lon + height/LOD.
4. SOL-SIRKLER-1A after the GE-GPS foundation is verified.

Do not start Kartverket/firkantnett/tile selection before GE-GPS-1B and GE-GPS-1C are verified.


## Status Reconciliation: Memory vs GE-GPS Plan

There are two valid status layers:

1. `dokumenter/MEMORY/NESTE-STEG.md` from 2026-06-09 says the recommended next step after GE-GRID-0E is `SOL-SIRKLER-1A`: inventory and verification of sol-circle points/objects. It also says Kartmotor V2 remains paused and no kartmotor/clean-motor/anchor/geometry/transform changes should be made.

2. `dokumenter/KOORDINATOR-OPPSTART.md` and `dokumenter/GAMING-MOTOR-LAYER1-GE-EDDERKOPPNETT-GPS-PLAN.md` from the later Gamingmotor/GE-GPS track say the immediate GPS sequence is `GE-GPS-1B` (camera aim point -> lat/lon), then `GE-GPS-1C` (height/zoom/LOD), then `GE-GPS-1D` (tile/firkantnett), with `SOL-SIRKLER-1A` after the GPS foundation.

Codex Sky must not resolve this conflict alone. Before code work, ask Jone which track is active for the current task:

- GE-GPS continuation: 1B -> 1C -> 1D, or
- Memory/NESTE-STEG continuation: SOL-SIRKLER-1A plan/inventory first.

In both cases, kartmotor, clean-motor, anchors, geometry, transform, aeProject, MARKERS, solbaner and `dokumenter/*` remain locked unless Jone gives explicit scoped GO.

## Locked Areas

Do not touch without explicit Jone GO:

```text
kartmotor
clean-motor
Leaflet/Norgeskart
geometri
anker
transform
aeProject
MARKERS
solbaner
dokumenter/*
```

This handoff branch is an exception only for files under:

```text
dokumenter/HANDOFF/*
```

## AgentMemory Rule

AgentMemory is for experience transfer, project status, rules, paths, decisions and handoff.

AgentMemory is not code truth and must not be used as proof of actual repo file content.

GitHub is truth for repo, branches, commits, PRs and diffs.
Vercel is preview/test.
Local clone is used for patching/testing after explicit Jone GO.

## Codex Sky First Task

Before doing any code work, report:

1. Which repo you see.
2. Which relevant branches you see.
3. Whether `arbeidsoriginal/ge-nett-0e-2026-06-13` exists.
4. Whether `feature/ge-gps-1a-format-alias` exists.
5. Whether `feature/ge-gps-1b-camera-readout` exists.
6. What the next project plan is.
7. What you cannot know without local terminal output.
8. Verdict: KLAR SOM CODEX SKY BACKUP NR. 2 / IKKE KLAR / TRENGER JONE-AVGJORELSE.

## Strict No-Go Without Explicit Jone GO

Do not edit files.
Do not commit.
Do not push.
Do not create PR.
Do not merge.
Do not deploy.
Do not change branch.
Do not touch locked areas.
Do not use truncated API/MCP output as proof that something is missing.
