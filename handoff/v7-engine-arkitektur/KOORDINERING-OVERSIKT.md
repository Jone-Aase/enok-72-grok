# Koordineringsoversikt — motor v1

Systemutvikler: Claude (via Perplexity).
Sjef og endelig beslutter: Jone.

## Spor

Motor-spor (Jone + Claude + Gemini + Grok)
Kartproduksjon-spor (Jone + ChatGPT) — berøres ikke fra motor-sporet.

## Branch-modell

Frossen referanse: codex/v7-layer-diagnostics-freeze
Aktiv utviklingsbase: codex/v7-next-dev-source

Alle nye planer og patcher tar utgangspunkt i codex/v7-next-dev-source. Sammenslåing dit krever Jones godkjenning.

## Pågående arbeid

| Agent | Branch | Type | Status |
|---|---|---|---|
| Claude | claude/v7-engine-arkitektur-plan | Plan (arkitektur v1) | Godkjent av Jone |
| Claude | claude/v7-engine-koordinering | Koordineringsdokumenter | Pushes nå |
| Claude (planlagt) | claude/v7-engine-modus-toggle-plan | Steg 1-plan | Pushes nå |
| Gemini (oppdrag) | gemini/v7-lag2-cache-prefetch-plan | Lag 2 cache plus prefetch (plan) | Venter på Gemini |
| Grok (oppdrag) | grok/v7-lag3-snapshot-bro-plan | Lag 3 snapshot-bro (plan) | Venter på Grok |

## Arbeidsregler for alle agenter

- Plan først som markdown. Ingen kode før Jone godkjenner planen.
- Hver oppgave på egen branch ut fra codex/v7-next-dev-source.
- Commit-identitet skal være agentens egen, ikke Jones.
- Norsk i alt skriftlig. Ingen emojis. Ingen utropstegn.
- Ingen rammer eller markdown-tabeller med rammer rundt prosa.

## Ufravikelige forbud

Alle agenter er ansvarlige for at deres arbeid IKKE rører:

- anker
- aeProject
- transform
- skala
- rotasjon
- tile-posisjon
- GE-grid
- solsirklene
- kartflatens proporsjoner

Bryter du dette, blir patchen avvist.

## Hvordan oppdrag deles ut

Claude skriver oppdrags-MD til handoff/v7-engine-arkitektur/OPPDRAG-<AGENT>-<TEMA>.md, pusher, og gir Jone lenken. Jone limer lenken inn i agentens vindu. Agenten lager sin egen branch med plan-respons og pusher.

## Når en plan-respons kommer inn

1. Claude leser planen.
2. Claude gir tilbakemelding direkte i en kommentar-MD pushet til samme branch eller som ny MD i handoff/v7-engine-arkitektur/.
3. Jone er endelig beslutter for om planen godkjennes.
4. Etter godkjenning lager samme agent ny branch for patch — fortsatt ingen sammenslåing før Jone tester live.

## Status-rapporter

Claude oppdaterer denne KOORDINERING-OVERSIKT.md ved hver større endring. Tabellen over "Pågående arbeid" er sannhetskilden for hvem som gjør hva.
