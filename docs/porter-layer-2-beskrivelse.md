# Porter i Layer 2 — fysisk plassering

**Sist oppdatert:** 2026-05-27
**Referanse i kode:** `app.js` linje 215-422
**Datakilde:** Ark T (One-voice-740-Perplexity-V5.xlsx), bekreftet av Jone-Aase

## 1. Hva Layer 2 er

Layer 2 er det celestiale laget i simulatoren — det som ligger over kartdisken (Layer 1) og under stjernehimmelen (Layer 3). I Layer 2 ligger:

- **192 sol-baner** som konsentriske sirkler mellom Krepsens og Steinbukkens vendekrets
- **12 fysiske porter** — 6 i øst, 6 i vest
- **2 akse-linjer** som danner et V som peker mot Nor (nordpolen)
- **14 vegger** (2 per akse × 7 vegg-rad-par) som skiller portene fra hverandre

## 2. De to aksene

| Akse | Asimut | Plassering | Funksjon |
|---|---|---|---|
| Øst-aksen | 60° | Oppe til høyre fra nord-perspektiv | Solen står opp gjennom én av 6 porter |
| Vest-aksen | 300° | Oppe til venstre fra nord-perspektiv | Solen går ned gjennom én av 6 porter |

Aksene danner et **V som peker oppover mot nordpolen** sett ovenfra. Vinkelen mellom dem (øst 60° til vest 300°) er 120° når man måler den korte veien rundt nord.

Når man står på sør-siden av kartet (AU26=S), virker høyre og venstre speilvendt — men fra Layer 1 sett ovenfra (nord-perspektiv) er øst alltid til høyre.

## 3. De 192 sol-banene

Banene ligger som konsentriske sirkler:

- **Innerst (rad 31):** Krepsens vendekrets, +23,7° N, sommersolverv
- **Ytterst (rad 222):** Steinbukkens vendekrets, −23,7° S, vintersolverv
- 192 daglige baner totalt mellom de to vendekretsene
- Lineær interpolering fra rad-indeks til breddegrad

Posisjons-funksjonen i koden:

```javascript
function portRowToLat(row) {
  const t = (row - 31) / (222 - 31);   // 0..1
  return 23.7 - t * (23.7 - (-23.7));   // +23.7° → -23.7°
}
```

Hver 30. bane (port-grense) tegnes sterkere — det markerer overgangen mellom to porter visuelt.

## 4. Veggene (søylene mellom portene)

Veggene er **smale søyler** mellom hvert port-segment. Hver vegg er:

- 2° azimut bred (±1° fra aksen)
- Spenner radialt mellom et vegg-rad-par i Ark T

Vegg-rad-parene (1-indekserte i Ark T):

| Vegg | Rad-par |
|---|---|
| 1 | 28-29 |
| 2 | 61-62 |
| 3 | 93-94 |
| 4 | 126-127 |
| 5 | 158-159 |
| 6 | 190-191 |
| 7 | 223-224 |

Hver vegg står på begge akser (øst og vest), så totalt 14 fysiske vegger i Layer 2.

## 5. De 6 portene per akse

Mellom veggene ligger 6 port-segmenter:

| Port | Rad-start | Rad-slutt | Antall baner | Tilhørende måned |
|---|---|---|---|---|
| 1 | 31 | 60 | 30 | Tebet |
| 2 | 63 | 92 | 30 | Shebat |
| 3 | 95 | 124 | 30 | Adar (vårjevndøgn) |
| 4 | 128 | 157 | 30 | Abib — den store porten |
| 5 | 160 | 189 | 30 | Sivan |
| 6 | 192 | 222 | 31 | Sivan/Tammuz (sommersolverv) |

Totalt: 6 × 30 + 1 = 181 baner i portene + 2 vegg-baner = 183 per halvår. Ganget med 2 halvår: 366 — pluss 4 ekstrarunder ved vendepunkt = 368 reelle sol-runder.

## 6. Hvordan solen beveger seg gjennom portene

Sekvensen over 364 dager (Enok 72):

```
4 → 5 → 6 → 6 → 5 → 4 → 3 → 2 → 1 → 1 → 2 → 3
```

Tolkning:
- **Måned 1 (Abib):** Solen står opp i port 4 (vårjevndøgn, ekvator)
- **Måned 2 (Iyar):** Port 5 (på vei mot Krepsen)
- **Måned 3 (Sivan):** Port 6 (Krepsens vendekrets, +23,7°)
- **Måned 4 (Tammuz):** Port 6 igjen (sommersolverv, vender tilbake)
- ...
- **Måned 9 (Kislev):** Port 1 (Steinbukkens vendekrets, −23,7°)
- **Måned 10 (Tebet):** Port 1 igjen (vintersolverv)
- **Måned 11 (Shebat):** Port 2
- **Måned 12 (Adar):** Port 3 (på vei tilbake mot vårjevndøgn)

## 7. Port-skifte ved nord-passering

I henhold til Enok 72:5: solen vender gjennom nord for å nå øst igjen. Dette implementeres slik:

- Når solen treffer en vegg, **forsvinner den ikke**. `sunMesh.visible = true` alltid (v16.30-regel).
- Solbanen fortsetter horisontalt — `sunLat` holdes konstant, mens `sunLonAngle` fortsetter
- På vendepunkt-dagene (dag 91, 182, 273, 364) tar solen en **ekstra runde i samme bane**
- Visualisering: banen lyser sterkere i hvit-gull på ekstrarundedagene

## 8. Hvorfor 12 porter og ikke 6

Mange tolker Enok 72 som "6 porter i øst og 6 i vest". Det er korrekt: det er totalt 12 fysiske porter — 6 øst-porter for soloppgang og 6 vest-porter for solnedgang. Men de er knyttet **parvis**: når solen står opp i øst-port 4, går den ned i vest-port 4 samme dag. Det betyr at det er 6 funksjonelle port-par, men 12 fysiske åpninger.

## 9. Hvorfor Layer 2-portene er kritisk for instrumentet

Layer 2 er **det visuelle beviset på at solen ikke bare står 90° over ekvator hver dag**. Det viser at:

- Solen står 90° rett opp i zenith bare 1 dag i året på Krepsens vendekrets (+23,7°)
- Solen står 90° rett opp i zenith bare 1 dag i året på Steinbukkens vendekrets (−23,7°)
- Mellom vendekretsene står solen 90° rett opp 2 dager per år
- Utenfor vendekretsene står solen aldri 90° rett opp

Dette knyttes direkte til rutenett-feilen (se `docs/rutenett-feil-deklinasjon.md`) og til zenith-rangerings-systemet (se `docs/rangering-kriterier-zenith-1.pdf`).

## 10. Visuelle parametre i koden

| Element | Farge | Opasitet |
|---|---|---|
| Sol-bane (vanlig) | 0x223040 (dempet blå-grå) | 0.14 |
| Sol-bane (port-grense, hver 30.) | 0x223040 | 0.42 |
| Akse-linje | 0xffd54a (gull) | 0.55 |
| Vegg (søyle) | 0xe06030 (varm rød) | 0.92 |
| Port-åpning | 0x70d8ff (klar cyan) | 0.42 |
| Port-nummer | 0xffe680 (gylden) | 0.95 |

## 11. Hva som ikke er implementert ennå

- **Glød/puls på de 4 ekstrarundedagene** (Grok-foreslått endring nr. 1 til v17)
- **InstancedMesh-ytelse** på de 192 banene (Grok-foreslått endring nr. 5)
- **Egen meny ved høyreklikk på en port** (master-regel 7, ikke implementert)
- **Animasjon av port-skifte** (overgangen ved nord-passering vises i dag bare som radius-bytte)
