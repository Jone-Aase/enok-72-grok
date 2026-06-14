# AGENTS-LOCAL.md — Lokal pekerfil for enok-72-grok

Denne filen er en lokal pekerfil for agenter som arbeider i den kontrollerte lokale arbeidskopien av enok-72-grok.

Fullstendig AGENTS.md ligger i:

https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/AGENTS.md

Les den før du gjør noe.

---

## Lokal arbeidskopi

Mappe:

C:\Users\a7788\Desktop\enok-72-grok-controlled-base

Repo:

Jone-Aase/enok-72-grok

Branch:

arbeidsoriginal/ge-nett-0e-2026-06-13

Basis-HEAD ved opprettelse:

f15591cf07bbdf2194d7d09c8e75c2668dc0d8fd

Kort basis-HEAD:

f15591c

Commit:

Include equator in GE latitude grid

Lokal visning:

http://127.0.0.1:5500/index.html

Viktig:

Ikke bruk C:\Users\a7788\Desktop\enok-72-norge som fasit.

Den kontrollerte arbeidsbasen er:

C:\Users\a7788\Desktop\enok-72-grok-controlled-base

---

## Koordinatorer og beslutning

- Jone-Aase = endelig beslutningstaker
- ChatGPT + Perplexity = koordinatorer / kontrolltårn
- Grok Build = primær kodeagent / penn
- Claude Sonnet 4.5 = reservepenn i hvilemodus
- Codex = release-gate og kontrollør

Ingen agent velger selv retning.

---

## Låste områder — ikke rør uten eksplisitt GO

Ikke endre uten eksplisitt GO fra Jone-Aase:

- GE-nett
- solsirkler
- geometri
- anker
- transform
- aeProject
- kartmotor
- clean-motor

---

## Arbeidsregel

- Kun eksakte oppdrag
- Maks 1–3 filer per oppdrag
- Ikke refaktorer fritt
- Ikke velg neste steg selv
- Ikke commit
- Ikke push
- Ikke merge
- Stopp etter git diff og rapport

Hvis du er usikker, stopp og spør. Ikke gjett.

---

## Første 5 minutter for ny lokal agent

1. Les AGENTS-LOCAL.md
2. Les hoved-AGENTS.md via lenken over
3. Les ARBEIDSORIGINAL.md
4. Kjør:

git branch --show-current
git rev-parse HEAD
git status --short

5. Ikke endre filer før eksplisitt ordre
6. Rapporter til Jone-Aase

---

## Standard rapportformat

Etter hvert oppdrag skal lokal agent rapportere:

1. Branch
2. HEAD
3. Endrede filer
4. Hva som ble endret
5. Hva som ikke ble rørt
6. Test/kommando-resultat hvis relevant
7. Eventuelle uklarheter

---

## Sky-workflow — bekreftet 2026-06-14

1. Plan: Jone + ChatGPT + Perplexity
2. Koding: Perplexity/Grok på GitHub feature-branch. Kun én agent skriver.
3. Preview: Vercel preview-URL fra feature-branch (bekreftet PR #4)
4. Review: ChatGPT + Perplexity. Gemini/Codex ved behov.
5. GO: Jone-Aase
6. Merge: Etter eksplisitt GO
7. Lokal VS Code: Kun nød/debug
8. Lovable: Backup-prototype/UI-demo — ikke fasit, ikke release-gate.
   Lovable skal ikke kode direkte på arbeidsoriginal før separat test er godkjent.
9. PR #4 var smoke-test — skal ikke merges.

---

Slutt på AGENTS-LOCAL.md.
