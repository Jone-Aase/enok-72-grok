# PROJECT ROOT INDEX - E-Earth / Gamingmotor

Generated: 2026-06-18
Purpose: Sanitized index of the local E-Earth control-room structure for agents that read through GitHub handoff.

## Local Control Room

```text
C:\Users\a7788\Documents\E-Earth-AgentBase
```

This folder is the local coordination root for E-Earth / Enok 72 / Gamingmotor work.

Codex Cloud cannot automatically read this Windows folder directly. Cloud agents should use this file and the rest of `dokumenter/HANDOFF/*` as the sanitized GitHub-readable map unless a separate Codex Remote Connection to the Windows host is active and verified.

## Current Official Line

```text
Active repo: Jone-Aase/enok-72-grok
Active development branch: feature/ge-gps-1b-camera-readout
Base / arbeidsoriginal: arbeidsoriginal/ge-nett-0e-2026-06-13
Handoff/status branch: handoff/agentmemory-sync
Active track: GE-GPS-1B -> GE-GPS-1C -> GE-GPS-1D -> SOL-SIRKLER-1A
```

## Current Local Working Copy

```text
C:\Users\a7788\Desktop\enok-72-grok-ge-gps-1a-format-alias-clean
```

This path was verified clean during setup. Future clones may be placed under the control-room `projects/` folder, but do not move or replace the working copy without an explicit migration plan and Jone GO.

## Local Structure

```text
E-Earth-AgentBase
├─ projects
│  ├─ enok-72-grok-active
│  ├─ enok-72-grok-backups
│  ├─ enok-72-norge-history
│  └─ future-modules
├─ handoff
│  ├─ codex-cloud
│  ├─ agentmemory
│  ├─ grok
│  ├─ perplexity
│  ├─ chatgpt
│  └─ codex-local
├─ reports
│  ├─ vercel
│  ├─ github
│  ├─ release-gates
│  └─ diagnostics
├─ patches
│  ├─ unapproved
│  └─ archived
├─ agentmemory
│  ├─ exports
│  └─ snapshots
├─ ngrok
├─ cloudflare
├─ mcp-bridge
└─ notes
```

Additional existing local support folders may also be present, including `agentmemory-runtime`, `cloudflared`, `continue-tools`, and `localtunnel`.

## Truth Model

```text
GitHub = repo, branch, commit, PR and diff truth
AgentMemory = status, decisions, lessons, paths and handoff
Vercel = preview/test signal
Local clone = patch/test/Go Live truth after fresh terminal output
E-Earth-AgentBase = local control room and index
```

## Safety Rules

- Do not store tokens, passwords, secret URLs or private keys in GitHub handoff files.
- Do not use AgentMemory as code truth.
- Do not use truncated MCP/API output as proof that something is missing.
- No agent edits, commits, pushes, creates PRs, merges or deploys without explicit Jone GO.
- Codex Cloud must say when it cannot verify local Windows, VS Code, Go Live, Vercel, or AgentMemory state directly.

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

Exception: `dokumenter/HANDOFF/*` may be updated only after explicit Jone GO for handoff work.
