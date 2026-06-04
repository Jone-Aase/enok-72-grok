# Klarsignal til Codex — Trinn 3 patch

Fra: Jone (via systemutvikler)
Til: Codex
Dato: 2026-06-04
Status: Gront lys

## Godkjenning

Plan: `codex/v7-lag1-plan-trinn3-parent-fallback` @ `df0a193c7b541a8b588aa44d944f760781cd684d`

Planen er godkjent.

Du kan starte patch paa:

- kodebranch: `codex/v7-lag1-trinn3-parent-fallback`
- base: `codex/v7-lag1-trinn2-prioritet-framebudget` @ `09aa947606c31a5357a0b587bbc5bed64b988511`

## Patch-detalj a huske

Foreldre-bildet maa klippes til riktig kvadrant av forelder-tilen.

En tile `(z, x, y)` er en av fire deler av forelderen pa `(z-1, x>>1, y>>1)`. Hvilken kvadrant avhenger av paritet:

- (x & 1, y & 1) = (0, 0) -> ovre venstre
- (x & 1, y & 1) = (1, 0) -> ovre hoyre
- (x & 1, y & 1) = (0, 1) -> nedre venstre
- (x & 1, y & 1) = (1, 1) -> nedre hoyre

For flere niva opp gjentar samme regel ned gjennom hvert niva mellom forelder og barn.

Forslag til losninger:

- CSS `background-image` + `background-position` + `background-size: 200% 200%` (for 1 niva opp), eller `400%` for 2 niva, og saa videre.
- alternativt `object-fit: none` + `object-position` med beregnet offset paa `img`-element.

Hvis hele forelderen vises i barnets slot uten klipping, blir bildet forskjovet. Det er den eneste implementasjons-fellen vi har flagget.

## Grenser som fortsatt gjelder

Ingen endring i:

- ankerpunkter
- aeProject
- GE-grid
- solsirklene
- transform
- skala
- rotasjon
- tile-posisjon
- kartets interne proporsjoner
- kilde-URLer
- tile-gridets matematikk

## Arbeidsform

- patch paa egen branch
- diff-sjekk og lokal browser-test for du rapporterer
- ekte SHA i rapporten

— Jone
