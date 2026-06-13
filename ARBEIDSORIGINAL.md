# Gjeldende arbeidsoriginal

Dato: 2026-06-13

Dette er den gjeldende arbeidsoriginalen for videre arbeid med Instrumentet.

## Repository

- GitHub: Jone-Aase/enok-72-grok
- Branch: arbeidsoriginal/ge-nett-0e-2026-06-13
- Utgangspunkt: codex/v7-kartmotor-v2-3a-single-base-tile
- Basis-commit: 3e87f517c04da4f9a764388279cb2451f4e45bb8
- Commit-melding: Record solar circle GE lock

## Status

GE-nettet er laast som koordinatfundament gjennom GE-GRID-0A, 0B, 0C, 0D og 0E.

Bekreftet status:

- GE-GRID-0A: eksisterende meridianer/lengdegrader er laast.
- GE-GRID-0B: breddegrad-ringer og polarsirkel-ankre er laast.
- GE-GRID-0C: breddegrad lik avstand er implementert og smoke-testet.
- GE-GRID-0D: 1 lengdegrad = 1 vinkelgrad er implementert og smoke-testet.
- GE-GRID-0E: intern posisjonskonvertering er implementert og smoke-testet med pass200mm = true.
- GE breddegradsgrid viser ekvator som del av gridet, ikke bare som separat Equator ring.
- Solsirklene er besluttet laast mot GE-nettet.

## Lastekilder for sannhet

Les disse foerst ved videre arbeid:

- dokumenter/MEMORY/AGENT-ONBOARDING.md
- dokumenter/MEMORY/GE-GRID-MEMORY.md
- dokumenter/MEMORY/SMOKE-TEST-STATUS.md
- dokumenter/MEMORY/NESTE-STEG.md
- dokumenter/MEMORY/AKTIVE-GRENSER.md
- dokumenter/SOL-SIRKLER-GE-LAAS.md

## Arbeidsgrenser

Ikke endre uten eksplisitt GO:

- GE-nett
- solsirklene
- geometri
- anker
- transform
- aeProject
- kartmotor
- clean-motor

Kartverket, Se Eiendom og andre kartlag skal senere legges oppaa GE-nettet. Kartbilder skal ikke definere breddegrad/lengdegrad.

## Neste arbeid

Neste trygge fase er ikke kartmotor. Neste arbeid er:

1. Ferdigstille GE-nett lokasjon/navigering.
2. SOL-SIRKLER-1A: inventar og verifikasjon for solsirkel-punkter/objekter.
3. Lage Kartverket-firkantnett basert paa spesifikasjon.

Lag plan foer kode.
