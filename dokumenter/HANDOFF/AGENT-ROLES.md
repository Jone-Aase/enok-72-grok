# AGENT ROLES - E-Earth / Gamingmotor

Generated: 2026-06-17

## Fallback Order

1. Codex local
   - Primary local patch and release-gate agent.
   - Best for local Windows, PowerShell, VS Code, Go Live and true working-tree checks.

2. Codex Sky
   - Backup nr. 2.
   - Best for GitHub-oriented branch, diff, PR, review and coordination work.
   - Must not assume local Windows/VS Code/Go Live state.
   - Handoff readback test passed: it can read handoff/agentmemory-sync and act as backup nr. 2 for planning/review/GitHub orientation.
   - If it sees branch work with no remote/upstream, it must treat that as an isolated cloud worktree and avoid push until Jone sets safe auth.

3. Grok Build local, PowerShell
   - Reserve primary local substitute under training.
   - Certified through Level 5C: read-only gates, diff review, sandbox patch/cleanup, real-clone micro-patch/cleanup.
   - No commit/push/feature work without explicit Jone GO and review.

4. Perplexity GPT-5.5
   - Backup coordinator and Vercel/preview/test agent.
   - Reads AM first when available, uses GitHub for repo/diff/PR and Vercel for test.

5. ChatGPT GitHub/AM
   - Original-control coordinator for GitHub, AM, PRs, diffs, mergebase and checks.

6. External reviewers
   - Claude Opus 4.8: senior review, architecture, Vercel status.
   - Gemini 3.1 Pro Thinking: logic/scope/checks review.
   - Kimi K2.6: third independent code/diff reviewer.
   - Nemotron 3 Ultra: reserve/fourth reviewer, architecture/workflow/LOD/atlas.
   - Mistral: extra sanity/review agent.
   - Grok Expert Web Agent: external web reviewer/plan agent, distinct from local Grok Build.

7. Local support tools
   - Continue in VS Code: local assistant/support client, AM-capable when configured.
   - Ollama qwen2.5-coder:7b: local junior code reviewer/explainer.
   - Ollama llama3.1:8b: local general reasoning/summarization backup.
   - GitHub Copilot: IDE suggestions/autocomplete only, not release-gate.
   - JustDone: optional text/quality/support tool, not code authority.

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
