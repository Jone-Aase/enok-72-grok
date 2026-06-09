#!/usr/bin/env python3
import os
import re
import subprocess
import sys

MEMORY_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(MEMORY_DIR))
MODEL = os.environ.get("MEMORY_KEEPER_MODEL", "qwen3:4b")

MEMORY_FILES = [
    "OLLAMA-MEMORY-KEEPER-PROMPT.md",
    "AGENT-ONBOARDING.md",
    "STATUS-NA.md",
    "AKTIVE-GRENSER.md",
    "GE-GRID-MEMORY.md",
    "KARTMOTOR-V2-STATUS.md",
    "BESLUTNINGSLOGG.md",
    "SMOKE-TEST-STATUS.md",
    "NESTE-STEG.md",
]


def read_file(name):
    path = os.path.join(MEMORY_DIR, name)
    with open(path, "r", encoding="utf-8") as handle:
        return handle.read()


def strip_ansi(text):
    return re.sub(r"\x1b\[[0-?]*[ -/]*[@-~]", "", text)


def clean_ollama_output(text):
    text = strip_ansi(text)
    marker = "...done thinking."
    if marker in text:
        text = text.split(marker, 1)[1]
    text = text.replace("Thinking...", "")
    lines = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if len(stripped) <= 2 and any(ch in stripped for ch in "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"):
            continue
        lines.append(stripped)
    return "\n".join(lines).strip()


def build_prompt(question):
    parts = [
        "Svar kort på norsk. Ikke vis resonnering. Ikke foreslå kodeendringer.",
        f"Spørsmål: {question}",
    ]
    for name in MEMORY_FILES:
        parts.append(f"\n--- FILE: dokumenter/MEMORY/{name} ---\n{read_file(name)}")
    return "\n\n".join(parts)


def main():
    question = " ".join(sys.argv[1:]).strip() or "Gi status, låste regler, siste commit og neste trygge steg."
    prompt = build_prompt(question)
    result = subprocess.run(
        ["ollama", "run", MODEL],
        input=prompt,
        capture_output=True,
        text=True,
        cwd=REPO_ROOT,
        timeout=180,
        encoding="utf-8",
        errors="replace",
    )
    output = clean_ollama_output(result.stdout)
    if result.returncode != 0:
        error = clean_ollama_output(result.stderr)
        raise SystemExit(error or f"ollama failed with code {result.returncode}")
    print(output)


if __name__ == "__main__":
    main()
