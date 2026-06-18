# AGENT ROLES - E-Earth / Gamingmotor

Generated: 2026-06-18

## Fallback Order

## Local Control Agents

1. Codex local
   - Primary local patch and release-gate agent.

2. Codex Cloud via Remote Windows host
   - Emergency operational backup through `DESKTOP-44L36ES`.

3. Grok Build local, PowerShell
   - Local control agent nr. 3 under training.
   - Certified through Level 5C so far.
   - Must continue certification before broad coding authority.

## Full Fallback Order

1. Codex local
   - Primary local patch and release-gate agent.
   - Best for local Windows, PowerShell, VS Code, Go Live and true working-tree checks.

2. Codex Cloud via Remote Windows host
   - Emergency operational backup for local Codex.
   - Uses Jone's Windows host `DESKTOP-44L36ES` through Codex Remote Connection.
   - Verified capabilities:
     - AgentMemory MCP recall on Windows host.
     - Local write to `C:\Users\a7788\Documents\E-Earth-AgentBase`.
     - Controlled Git branch, commit and push from the Windows working copy.
   - Must start from the correct repo/path and show fresh terminal output before any work.
   - No code edits, commits, pushes, PRs, merges or deploys without explicit Jone GO and release-gate.

3. Codex Cloud / Sky detached web-container mode
   - Read-only/planning/review/GitHub-orientation backup.
   - Can read `handoff/agentmemory-sync` and GitHub handoff docs.
   - Must not assume local Windows/VS Code/Go Live state.
   - If it sees branch `work` with no remote/upstream, it must treat that as an isolated cloud worktree and avoid push.
   - Direct push from that detached container is not available in the current tested environment.

4. Grok Build local, PowerShell
   - Local control agent nr. 3 and reserve primary local substitute under training.
   - Certified through Level 5C: read-only gates, diff review, sandbox patch/cleanup, real-clone micro-patch/cleanup.
   - No commit/push/feature work without explicit Jone GO and review.

5. Perplexity GPT-5.5
   - Backup coordinator and Vercel/preview/test agent.
   - Reads AM first when available, uses GitHub for repo/diff/PR and Vercel for test.

6. ChatGPT GitHub/AM
   - Original-control coordinator for GitHub, AM, PRs, diffs, mergebase and checks.

7. External reviewers
   - Claude Opus 4.8: senior review, architecture, Vercel status.
   - Gemini 3.1 Pro Thinking: logic/scope/checks review.
   - Kimi K2.6: third independent code/diff reviewer.
   - Nemotron 3 Ultra: reserve/fourth reviewer, architecture/workflow/LOD/atlas.
   - Mistral: extra sanity/review agent.
   - Grok Expert Web Agent: external web reviewer/plan agent, distinct from local Grok Build.

8. Local support tools
   - Continue in VS Code: local assistant/support client, AM-capable when configured.
   - Ollama qwen2.5-coder:7b: local junior code reviewer/explainer.
   - Ollama llama3.1:8b: local general reasoning/summarization backup.
   - GitHub Copilot: IDE suggestions/autocomplete only, not release-gate.
   - JustDone: optional text/quality/support tool, not code authority.

## Verified Takeover Tests

```text
Codex Cloud readback from GitHub handoff:
  passed, proof phrase CLOUD-TAKEOVER-READY-2026

Remote Windows host AgentMemory/local status check:
  passed on DESKTOP-44L36ES

Remote Windows host local sandbox write:
  passed, proof phrase REMOTE-WINDOWS-WRITE-READY-2026-06-18

Remote Windows host controlled Git branch/commit/push:
  passed, commit 4f36a542999411f1bafc807caf00282afc3f162a
  branch test/remote-windows-git-push-2026-06-18
  proof phrase REMOTE-WINDOWS-GIT-PUSH-READY-2026-06-18

Detached cloud container direct push:
  not available; remote none, gh missing, GitHub HTTPS blocked by proxy
```

## Universal Rules

No agent may edit files, commit, push, create PR, merge, deploy, change branch, touch locked areas, or write AM-authoritative code conclusions without explicit Jone GO and release-gate.

No agent may use truncated MCP/API output as proof that something is missing.

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

For this handoff bridge only, `dokumenter/HANDOFF/*` may be updated after explicit Jone GO.
