# CODEX CLOUD TAKEOVER - E-Earth / Gamingmotor

Generated: 2026-06-18
Purpose: Make Codex Cloud/Sky ready to take over coordination if local Codex is temporarily unavailable.

## Active Decision

Jone chose active track A on 2026-06-17:

```text
GE-GPS-1B -> GE-GPS-1C -> GE-GPS-1D -> SOL-SIRKLER-1A
```

AgentMemory record:

```text
mem_mqim70x8_96c1acb34445
```

The older `dokumenter/MEMORY/NESTE-STEG.md` SOL-SIRKLER-1A-first recommendation remains important context, but current work follows GE-GPS first unless Jone later changes the plan.

## Read First

When Codex Cloud/Sky starts, read these files from branch `handoff/agentmemory-sync`:

```text
dokumenter/HANDOFF/CODEX-SKY-START-HER.md
dokumenter/HANDOFF/LATEST-STATUS.md
dokumenter/HANDOFF/AGENT-ROLES.md
dokumenter/HANDOFF/AGENTMEMORY-SNAPSHOT.md
dokumenter/HANDOFF/CODEX-CLOUD-TAKEOVER.md
```

Then inspect current GitHub branches as read-only, especially:

```text
arbeidsoriginal/ge-nett-0e-2026-06-13
feature/ge-gps-1a-format-alias
feature/ge-gps-1b-camera-readout
handoff/agentmemory-sync
```

## Current Truth Model

```text
GitHub = repo/branch/commit/PR/diff truth
AgentMemory = status, decisions, lessons, paths, handoff
Vercel = preview/test signal
Local clone = patch/test/Go Live truth after fresh terminal output
```

Do not use AgentMemory as code truth. Do not use truncated API/MCP output as proof that something is missing.

## What Codex Cloud/Sky Can Do

Codex Cloud/Sky has two different modes. Keep them separate.

### Mode A - Remote Windows host

When Codex Cloud/Sky is connected to Jone's Windows host `DESKTOP-44L36ES` through Codex Remote Connection, it may act as an emergency operational backup for local Codex.

Verified capabilities:

```text
AgentMemory MCP recall on Windows host: passed
Local AgentBase sandbox write: passed
Controlled Git branch/commit/push: passed
```

Important verified commits / records:

```text
Remote Git push test commit: 4f36a542999411f1bafc807caf00282afc3f162a
Remote Git push test branch: test/remote-windows-git-push-2026-06-18
Remote write proof phrase: REMOTE-WINDOWS-WRITE-READY-2026-06-18
Remote Git proof phrase: REMOTE-WINDOWS-GIT-PUSH-READY-2026-06-18
```

In this mode it may, after explicit Jone GO and release-gate:

- run local read-only terminal checks
- read AgentMemory through local MCP
- write inside approved sandbox/control-room paths
- create test/feature branches
- commit and push scoped changes
- help operate the local backup workflow

It must still start from the correct path and prove state first.

### Mode B - Detached cloud/web container

When Codex Cloud/Sky sees:

```text
cwd: /workspace/enok-72-grok
branch: work
remote: none
gh CLI: not installed
```

it is a detached cloud/container workspace. In this mode it may:

- read GitHub branches and handoff docs
- summarize current status
- compare diffs and PRs
- draft safe plans
- review code changes from GitHub diffs
- propose exact next commands/prompts for Jone/local agents
- prepare PR descriptions after Jone GO

It must not push from that detached container. Direct push from that environment failed safely because remote was missing, `gh` was not installed, and GitHub HTTPS was blocked by proxy.

Codex Cloud/Sky must always say when it cannot verify local Windows, VS Code, Go Live, Vercel, or AgentMemory state directly.

## What Codex Cloud/Sky Must Not Do Without Explicit Jone GO

Do not:

```text
edit files
commit
push
create PR
merge
deploy
change branches
touch locked areas
claim local app testing happened unless Jone/local agent provides output
```

## Locked Areas

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

Exception: this handoff bridge may update `dokumenter/HANDOFF/*` only after explicit Jone GO.

## If Local Codex Is Unavailable

1. Prefer Codex Cloud via Remote Windows host `DESKTOP-44L36ES`.
2. Read this handoff branch from GitHub.
3. Confirm active track A.
4. Change/open the active working copy before work:

```text
C:\Users\a7788\Desktop\enok-72-grok-ge-gps-1a-format-alias-clean
```

5. Ask Jone for fresh local terminal output before trusting local state:

```text
git branch --show-current
git rev-parse HEAD
git status --short
git diff --stat
git diff --check
node --check app.js
```

6. If code work is needed, propose the smallest scoped branch/file plan.
7. Do not push or open PR unless Jone gives explicit GO.
8. Local UI testing should be handled on the Windows host, by Jone, Grok Build, Perplexity/Vercel, or another tool that can actually see the running app.

## First Takeover Prompt For Codex Cloud/Sky

```text
Read branch handoff/agentmemory-sync in Jone-Aase/enok-72-grok.
Start with dokumenter/HANDOFF/CODEX-CLOUD-TAKEOVER.md and CODEX-SKY-START-HER.md.
Report current repo, active track, locked areas, agent roles, what you can verify from GitHub, and what you cannot know without local terminal output.
Do not edit files, commit, push, create PR, merge, or deploy.
```

## Readiness Verdict

```text
Codex Cloud/Sky via Remote Windows host is ready as emergency operational backup for local Codex after explicit Jone GO and release-gate.
Codex Cloud/Sky detached web-container mode remains read-only/planning/review/GitHub-orientation only.
Direct push from the detached container is not available in the currently tested environment.
```
