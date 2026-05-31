# Solklokken — Enok 18-timers urskive

**Sist oppdatert:** 2026-05-27
**Referanse i kode:** `app.js` linje 706-1330
**Implementert i:** v16.24 (urskive 18) og v16.25 (konstant kjøring)

## 1. Hva solklokken er

Solklokken (`clockSol` i koden) er en **18-delt urskive** som ligger over kartdisken i Layer 1. Den drives av solens posisjon i instrumentet (`sunLonAngle`), **ikke** av vanlig klokketid.

Det betyr: når du spiller av eller skrur frem dagene i simulatoren, beveger solklokkens visere seg etter hvor langt solen har rotert i nåværende sol-runde — ikke etter PC-ens klokke.

Den er **ikke** en standard 12- eller 24-timers urskive. Den er bygget på Enok 72-systemet hvor én dag har 18 timer.

## 2. Hvorfor 18 timer

Enok 72 beskriver dagen som delt i 18 deler. Versene refererer gjentatte ganger til "deler dag" og "deler natt" som summerer til 18:

- **Vårjevndøgn / høstjevndøgn:** 9 deler dag, 9 deler natt (9/9)
- **Sommersolverv ved Krepsens vendekrets:** 9 deler dag, 9 deler natt i Enok-tekst (men 13:40 observert i Aswan — én av de fire åpne gåtene)
- **Vintersolverv ved Steinbukkens vendekrets:** speilbilde
- **Nordlig polarsirkel (port 6) ved sommersolverv:** 18 deler dag, 0 deler natt (24 timer sol) — verifisert 100 % i Fort Yukon, Bodø, Grímsey

Hver Enok-time = 1/18 av en hel sol-rotasjon.

## 3. Tall-rekkefølge på urskiven

Tallene er plassert slik på urskiven:

```
        18
   17        1
  16          2
 15            3
14              4
14   (kl 0)    4
 ...
 9 (midt nede = "middag")
```

- **18 øverst (kl 0 / midnatt)** — startpunktet
- **9 nederst (middag-posisjon)**
- Tellingen går **med klokken**: 18 → 1 → 2 → 3 → ... → 9 → 10 → ... → 17 → 18

I kode (`ENOK_NUMERALS_18`):
```javascript
['18','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17']
```

## 4. Den indre 18-delte ringen

På urskivens indre ring vises **dag-bue og natt-bue**:

| Bue | Deler | Farge | Hex | Opasitet |
|---|---|---|---|---|
| Dag-bue | 0-9 (kl 18 til kl 9) | Gylden, varm | 0xc9a247 | 0.32 |
| Natt-bue | 9-18 (kl 9 tilbake til kl 18) | Midnattblå | (dyp) | 0.32 |

Trekanter markerer **jevndøgn-aksen** (0/18-merket øverst og 9-merket nederst).

## 5. Hovedmerker og sub-tikk

| Element | Antall | Mening |
|---|---|---|
| Hovedmerker | 18 | Én Enok-time hver |
| Sub-tikk per time | 4 | Kvarter |
| Totalt antall tikk | 72 | Sammenfaller med Enok 72-systemet |

Det er **ikke tilfeldig** at 18 × 4 = 72. Dette er en designet sammenheng mellom urskivens deling og Enok-bokens nummer.

## 6. De tre viserne

Solklokken har **tre visere**, alle med hub i origo og spiss ut til ytre diameter:

| Viser | Hva den følger | Periode |
|---|---|---|
| Timeviser | Solens reelle posisjon på disken | 1 runde per sol-rotasjon |
| Minuttviser | Aktuell Enok-time-progresjon | 1 runde per 1/18 av sol-rotasjon |
| Sekundviser | Aktuell Enok-minutt-progresjon | 1 runde per 1/60 av Enok-minutt |

Solens fysiske posisjon i 3D-rommet ligger **over** timeviseren (på `subCel.sun`-laget), så timeviseren har ingen synlig stang — solen selv er spissen.

## 7. Hvordan klokken drives av sunLonAngle

```javascript
const dayFrac = (sunLonAngle % 360) / 360;
const totalEnokHours = dayFrac * 18;
const minFrac = totalEnokHours - Math.floor(totalEnokHours);
const totalEnokMinutes = minFrac * 60;
const secFrac = totalEnokMinutes - Math.floor(totalEnokMinutes);
```

- `sunLonAngle = 0` → øverst (kl 18/0 = midnatt)
- `sunLonAngle = 180` → nederst (kl 9 = middag)
- `sunLonAngle = 360` → tilbake til øverst (ny dag)

Det betyr at klokken er **deterministisk knyttet til solens posisjon**. Det er ikke mulig at solklokken viser noe som ikke stemmer med hvor solen står — det er definert slik.

## 8. Digital read-out

Sammen med 3D-urskiven vises en digital tekst:

```
HH:MM:SS Enoch (18 h)
```

Eksempler:
- Midnatt: `00:00:00 Enoch (18 h)`
- Middag: `09:00:00 Enoch (18 h)`
- Sent på dagen: `15:30:42 Enoch (18 h)`

## 9. Konstant kjøring (v16.25-regel)

En kritisk regel: **solklokken stopper aldri**.

```
// v16.25: Klokken kjører KONSTANT — også når 3D-laget er skjult visuelt.
// Visere roteres uansett (cheap), og digital read-out oppdateres alltid.
```

Det betyr:
- Hvis brukeren skjuler 3D-urskiven via UI, kjører den fortsatt i bakgrunnen
- Digital read-out viser alltid riktig Enok-tid
- Når 3D-laget aktiveres igjen, er det allerede synkronisert

Dette knyttes til master-regel 5: solen slutter aldri å lyse (`sunMesh.visible = true` alltid). Klokken er solens målepunkt, så de to henger sammen.

## 10. Visuell stil

- **Bakgrunns-skive:** mørk (0x0a0e18), opasitet 0.06 — knapt synlig
- **Ytre ring:** gylden (0xc9a247), opasitet 0.85
- **Tall-typografi:** Cormorant Garamond, serif (i indre tall-ring)
- **Plassering:** dekker hele AE-disken som default (`R_OUTER * 1.00`)

## 11. Atom-klokken (sammenlikning)

`clockAtom` er den andre klokken i systemet — den viser **sann offisiell tid** for valgt tidssone, drevet av `Date()` og brukerens tidssone-offset.

**Status:** Atom-klokken er **ikke 3D** lenger (siden v16.24). Den vises kun som et digitalt popup-vindu, formatert som 24-timers tid.

Begge klokker er knyttet sammen som verktøy for sammenligning:
- **Solklokken:** "Hva sier solens egen bevegelse?"
- **Atom-klokken:** "Hva sier den moderne tidsregningen?"

Forskjellen mellom dem (ved en gitt observasjon) er nøyaktig det 3-minutters restavviket som er én av de fire åpne gåtene (gåte nr. 3 i STATUS-NA.md).

## 12. Sammenheng med portsystemet

Når brukeren spiller av en sol-rotasjon, beveger solklokken seg én full runde (kl 18 → 9 → 18). Samtidig beveger solen seg gjennom **én port-sone** i Layer 2. Et eksempel:

- Dag 91 (sommersolverv) i port 6 ved +23,7°: solklokken viser én komplett 18-times rotasjon, mens solen ligger på Krepsens vendekrets hele dagen.
- Dag 91 er én av de **4 ekstrarundedagene** — solen tar to runder i denne banen. Det betyr at solklokken kjører to ganger gjennom 18 timer på samme dag-tall i kalenderen.

## 13. Falsifiserbar prediksjon

Solklokken predikerer at:

- Dag 1 (vårjevndøgn, port 4, ekvator): 9 timer "kl 0-9" (dag) og 9 timer "kl 9-18" (natt) — dag-natt-deling 9/9
- Dag 91 (sommersolverv, port 6, Krepsens vendekrets): tekst sier 9/9, **observasjon viser 13:40/10:20** — gåte
- Dag 182 (høstjevndøgn, port 4, ekvator): 9/9 igjen
- Dag 273 (vintersolverv, port 1, Steinbukkens): tekst sier 9/9 speilet — observasjon i Aswan ikke tilgjengelig

Sammenligningen mellom solklokken og atom-klokken på en gitt dag og et gitt sted er et av instrumentets primære testverktøy.

## 14. Hva som ikke er implementert ennå

- **Visuell markering av port-skifte** når solen passerer en vegg
- **Sammenligningsmodus** der solklokke og atom-klokke vises side ved side med differanse
- **Lokal-tid-modus:** å vise solklokken slik den ville sett ut fra et spesifikt geografisk punkt (Aswan, Antofagasta osv.)
- **Eksport av sol-bane-data per dag** som CSV (Grok-foreslått endring nr. 2 til v17)
- **Sammenligningsknapp mot ekte soldeklinasjon** (Grok-foreslått endring nr. 3 til v17)
