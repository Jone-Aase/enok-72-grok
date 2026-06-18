# ORGANIZATION MAP - E-Earth / Gamingmotor

Generated: 2026-06-18
Purpose: One-page agent responsibility map for E-Earth / GE-GPS work.

## Current Official Line

```text
Active repo: Jone-Aase/enok-72-grok
Active development branch: feature/ge-gps-1b-camera-readout
Base / arbeidsoriginal: arbeidsoriginal/ge-nett-0e-2026-06-13
Handoff/status branch: handoff/agentmemory-sync
Active track: GE-GPS-1B -> GE-GPS-1C -> GE-GPS-1D -> SOL-SIRKLER-1A
```

## Command Structure

1. Jone Aase
   - Final decision maker.
   - Only Jone can give GO for edits, commits, pushes, PRs, merges, deploys or locked-area work.

2. Local Codex
   - Primary local coding/release-gate agent.
   - Best for Windows, PowerShell, local repo, VS Code, Go Live, AgentMemory and exact working-tree truth.

3. Codex Cloud via Remote Windows host
   - Emergency operational backup for Local Codex.
   - Host: `DESKTOP-44L36ES`.
   - Verified:
     - AgentMemory MCP recall.
     - Local AgentBase sandbox write.
     - Controlled Git branch/commit/push.
   - Can take over local coordination temporarily if Local Codex is unavailable, but must use explicit path/branch/status gates and Jone GO.

4. Codex Cloud / Sky detached container
   - Read-only/planning/review/GitHub-orientation backup.
   - Can read handoff branch and GitHub files.
   - Cannot assume local Windows state.
   - Direct push from detached container is not available in the tested environment.

5. Grok Build local PowerShell
   - Reserve primary local substitute under training.
   - Certified through Level 5C.
   - May help with local review and, after scoped GO, controlled local tasks.

6. Perplexity GPT-5.5
   - Backup coordinator and Vercel/preview/test reporter.
   - Uses GitHub, Vercel and AgentMemory where available.

7. ChatGPT GitHub/AM
   - GitHub/AgentMemory control-plane coordinator.
   - Good for PR, branch, diff, mergebase and status reasoning.

8. External reviewers
   - Claude Opus 4.8: senior review and architecture.
   - Gemini 3.1 Pro Thinking: logic/scope/check review.
   - Kimi K2.6: third independent diff reviewer.
   - Nemotron 3 Ultra: reserve architecture/review.
   - Mistral: extra sanity/review.
   - Grok Expert Web Agent: external web reviewer/plan agent.

9. Local support tools
   - Continue in VS Code: local assistant/support client.
   - Ollama qwen2.5-coder:7b: local junior code review/explanation.
   - Ollama llama3.1:8b: local general reasoning/summarization backup.
   - GitHub Copilot: IDE suggestions only.
   - JustDone: optional text/quality/support tool.

## Verified Backup Chain

```text
Local Codex primary
  -> Codex Cloud via Remote Windows host
  -> Grok Build local PowerShell
  -> Codex Cloud/Sky detached read-only GitHub backup
  -> Perplexity / ChatGPT / external reviewers
```

## Codex Cloud Capability Split

```text
Remote Windows host mode:
  local access: yes
  AgentMemory MCP: yes
  local write sandbox: yes
  controlled Git push: yes
  requires Jone GO: always

Detached cloud-container mode:
  GitHub handoff read: yes
  planning/review: yes
  local Windows access: no
  direct push: no, not in tested environment
```

## Universal No-Go Without Jone GO

```text
edit files
commit
push
create PR
merge
deploy
change branches
touch locked areas
claim local app testing without local evidence
use truncated MCP/API output as proof something is missing
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

Exception: `dokumenter/HANDOFF/*` may be updated only after explicit Jone GO for handoff work.
