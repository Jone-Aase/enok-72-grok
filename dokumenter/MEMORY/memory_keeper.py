#!/usr/bin/env python3
import os
import subprocess
from datetime import datetime

MEMORY_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(MEMORY_DIR))


def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=REPO_ROOT)
    return result.stdout.strip(), result.stderr.strip()


def get_git_info():
    info = {}
    info["branch"], _ = run_cmd("git branch --show-current")
    info["commits"], _ = run_cmd("git log --oneline -10")
    info["status"], _ = run_cmd("git status --porcelain")
    info["memory_diff"], _ = run_cmd("git diff -- dokumenter/MEMORY/")
    info["last_commit"], _ = run_cmd("git log -1 --pretty=format:%H%n%s")
    return info


def read_memory_file(name):
    path = os.path.join(MEMORY_DIR, name)
    if not os.path.exists(path):
        return f"[MISSING] {name}"
    with open(path, "r", encoding="utf-8") as handle:
        return handle.read().strip()


def update_draft():
    git_info = get_git_info()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    last_commit_lines = git_info["last_commit"].splitlines()
    last_hash = last_commit_lines[0][:8] if last_commit_lines else "unknown"
    last_subject = last_commit_lines[1] if len(last_commit_lines) > 1 else ""

    content = f"""# Memory Keeper Draft - {timestamp}

## Git Status

- Branch: {git_info["branch"]}
- Last commit: {last_hash} {last_subject}

## Last 10 commits

```text
{git_info["commits"]}
```

## Working tree status

```text
{git_info["status"] or "clean"}
```

## Memory update checklist

- [ ] STATUS-NA.md
- [ ] AKTIVE-GRENSER.md
- [ ] GE-GRID-MEMORY.md
- [ ] KARTMOTOR-V2-STATUS.md
- [ ] BESLUTNINGSLOGG.md
- [ ] SMOKE-TEST-STATUS.md
- [ ] NESTE-STEG.md

## Current memory snapshot

### STATUS-NA.md

{read_memory_file("STATUS-NA.md")}

### NESTE-STEG.md

{read_memory_file("NESTE-STEG.md")}
"""
    out_path = os.path.join(MEMORY_DIR, "MEMORY-KEEPER-DRAFT.md")
    with open(out_path, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(content)
    print("MEMORY-KEEPER-DRAFT.md oppdatert")


def main():
    update_draft()
    print("Memory Keeper oppsett fullfort")


if __name__ == "__main__":
    main()
