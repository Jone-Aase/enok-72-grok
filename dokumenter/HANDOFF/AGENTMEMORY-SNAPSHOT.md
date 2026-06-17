# AGENTMEMORY SNAPSHOT - Sanitized

Generated: 2026-06-17
Bridge direction: AgentMemory -> GitHub handoff
Status: Stage 1 local file creation only. Not committed. Not pushed.

This file is a sanitized snapshot for agents that cannot directly access local AgentMemory.
It must not contain tokens, passwords, secret paths, or full raw conversation logs.

## Governance

AgentMemory is used only for experience transfer, project status, rules, paths, decisions and handoff.
It is not the source of truth for code.
It cannot approve code changes.

GitHub is truth for repo, branches, commits, PRs and diffs.
Vercel is preview/test.
Local clone is used for patching/testing after explicit Jone GO.

## Key Active Memory IDs

```text
mem_mqi86e34_3b4e3b9dde72  Felles arbeidsmodell: GitHub truth, Vercel preview, AM handoff/status.
mem_mqi86jyu_2973d77c4bb7  Correct GE-GPS working copy, repo, branch and locked areas.
mem_mqify1ca_09b8e5bd0ab5  Next programming plan: GE-GPS-1B -> 1C -> 1D -> SOL-SIRKLER-1A.
mem_mqig20jp_f0481b5c83c5  Web-agent workflow/status including Vercel/Claude/Perplexity.
mem_mqihddsv_c797ff2d4e28  Updated agent roles including Kimi and Nemotron.
mem_mqihfy4l_7a5ea16cc9a7  Grok Build as reserve primary local substitute under training.
mem_mqihhwf2_d2f18039ebd6  Fallback order with Codex Sky as backup nr. 2.
mem_mqihk45s_2095b2820d0f  Local tools: Continue, Ollama qwen2.5-coder:7b, llama3.1:8b.
mem_mqihnnea_443218cae104  Extra agents: Mistral, Grok Expert Web, JustDone, Copilot.
mem_mqiilgl7_60dc1672f5a1  Codex Sky onboarding.
mem_mqik0lj3_2eff72808712  AM governance: AM is status/handoff only, not code truth.
mem_mqikvv4j_edacd9d9c317  Codex Sky environment note: branch work, no remote/upstream, no gh; use safe GitHub auth only if needed.
```

## Current Local Status Reported By Local Codex

```text
workingCopy: C:\Users\a7788\Desktop\enok-72-grok-ge-gps-1a-format-alias-clean
repo: Jone-Aase/enok-72-grok
branch before bridge stage: feature/ge-gps-1a-format-alias
HEAD before bridge stage: c79bfc6f1144c276d25afc1eefd926afe0275677
status before bridge stage: clean
handoff branch created locally for this stage: handoff/agentmemory-sync
```

Codex Sky must not assume this local status is still current unless Jone/local Codex/Grok provides fresh terminal output.


## Memory/NESTE-STEG Status Nuance

Current repo contains `dokumenter/MEMORY/` files that were not present in an earlier Codex Sky `/workspace/enok-72-grok` container. Important current files include:

```text
dokumenter/MEMORY/KARTMOTOR-V2-STATUS.md
dokumenter/MEMORY/GE-GRID-MEMORY.md
dokumenter/MEMORY/NESTE-STEG.md
dokumenter/MEMORY/AKTIVE-GRENSER.md
dokumenter/MEMORY/SMOKE-TEST-STATUS.md
dokumenter/MEMORY/STATUS-NA.md
```

`NESTE-STEG.md` says SOL-SIRKLER-1A is the recommended next step after GE-GRID-0D/0E, with Kartmotor V2 paused. Later GE-GPS documents say GE-GPS-1B/1C are next inside the Gamingmotor GPS sequence. Treat this as a planning nuance requiring Jone confirmation before code.
## Next Programming Plan

1. GE-GPS-1B - read-only camera aim point -> lat/lon.
2. GE-GPS-1C - camera height / zoom / internal LOD value.
3. GE-GPS-1D - tile/firkantnett selection after 1B and 1C are verified.
4. SOL-SIRKLER-1A after GE-GPS foundation is locked.


## Codex Sky Environment Caveat

A previous Codex Sky/cloud discussion reported an isolated Linux container at `/workspace/enok-72-grok`, on branch `work`, with no remote, no upstream, no `gh`, SSH available, and Git 2.43.0.

This is useful environment guidance, not repo truth. If Codex Sky sees this again, it should not assume it can push safely. Preferred bridge flow remains local Codex/Grok -> GitHub handoff branch -> Codex Sky reads GitHub.
## Security Notes

The remote AgentMemory MCP URL and secret path are intentionally not stored here.
Do not expose local AgentMemory REST or viewer ports publicly.
Do not paste tokens, secret paths or passwords into GitHub.
