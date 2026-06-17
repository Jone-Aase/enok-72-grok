# CODEX CLOUD TAKEOVER - E-Earth / Gamingmotor

Generated: 2026-06-17
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

Codex Cloud/Sky may:

- read GitHub branches and handoff docs
- summarize current status
- compare diffs and PRs
- draft safe plans
- review code changes from GitHub diffs
- propose exact next commands/prompts for Jone/local agents
- prepare PR descriptions after Jone GO

Codex Cloud/Sky must say when it cannot verify local Windows, VS Code, Go Live, Vercel, or AgentMemory state directly.

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

1. Read this handoff branch from GitHub.
2. Confirm active track A.
3. Ask Jone for fresh local terminal output before trusting local state:

```text
git branch --show-current
git rev-parse HEAD
git status --short
git diff --stat
git diff --check
node --check app.js
```

4. If code work is needed, propose the smallest scoped branch/file plan.
5. Do not push or open PR unless Jone gives explicit GO.
6. Local testing should be handled by Jone, Grok Build, Perplexity/Vercel, or another local tool that can actually see the running app.

## First Takeover Prompt For Codex Cloud/Sky

```text
Read branch handoff/agentmemory-sync in Jone-Aase/enok-72-grok.
Start with dokumenter/HANDOFF/CODEX-CLOUD-TAKEOVER.md and CODEX-SKY-START-HER.md.
Report current repo, active track, locked areas, agent roles, what you can verify from GitHub, and what you cannot know without local terminal output.
Do not edit files, commit, push, create PR, merge, or deploy.
```

## Readiness Verdict

```text
Codex Cloud/Sky is ready as backup nr. 2 for read-only takeover, planning, review, GitHub orientation, and PR/diff coordination.
Codex Cloud/Sky is not yet proven as a direct push operator from its own container.
```
