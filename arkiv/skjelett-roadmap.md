# Enok 72 Dashboard — Skjelett-roadmap

Alle elementer i rammen. Vi bygger skjelettet ferdig før vi fyller med data eller spesialfunksjoner.

## Allerede bygget (v2.3)

| # | Element | Status |
|---|---|---|
| 1 | Faner (ny, bytte, lukke) | OK |
| 2 | Adresselinje + tilbake/fram | OK |
| 3 | Sol-tidslinje + presets (solverv, jevndøgn) | OK |
| 4 | Søkefelt (navn + koordinat) | OK |
| 5 | Steder-tre (foldbar, klikkbar) | OK |
| 6 | Lag-sjekkbokser (Ekvator, Krepsen, Steinbukken, polarsirkler, meridianer, grid) | OK |
| 7 | Sol-kontroller (høyde, lengdegrad, sun-radius, msize) | OK |
| 8 | Eksport CSV + KML + JSON | OK |
| 9 | Del-lenke + bokmerker | OK |
| 10 | Detalj-modal | OK |
| 11 | URL-parametre ved oppstart | OK |
| 12 | Enok-kalender 5676 AM (måned, dag, solverv-merker) | OK |
| 13 | Tidslinje-panel (AM-år, uke, jubileum, ankerpunkter) | OK |

## Mangler i skjelettet — forslag til full liste

### A) Geografisk verifikasjon
- [ ] **Kontinent-lag** — vektor-omriss projisert i AE som verifikasjon av sirkel-plassering
- [ ] **Hav-/landmasse-fyll** (valgfritt, gir bedre lesbarhet)
- [ ] **Verifiserte markører** (godkjente fra teamet) som lag — Mistral-leveransen blir første test

### B) Visnings-moduser
- [ ] **Topp-ned AE-modus** (nåværende) — flat jord sett ovenfra
- [ ] **Bakke-modus** — himmel-kuppel sett fra valgt sted (sol/måne azimut + altitude)
- [ ] **Overgang mellom modus** — glatt zoom fra topp-ned til bakke

### C) Person og genealogi
- [ ] **Personliste** (alle navnene i Jub-arket, kolonner Z–EF)
- [ ] **Profilside per person** (stamtre, alder ved fødsel av sønn, alder ved død, kilder)
- [ ] **Stamtre-visualisering** (Adam → Set → Enos → ... → nålevende)
- [ ] **Hopp fra tidslinje til person** (klikk AM-år → se hvem som levde da)

### D) Hendelser og kilder
- [ ] **Hendelser-panel** (hva skjedde i valgt AM-år)
- [ ] **Vers-referanser** for valgt år (Bibel + Jubileumsbok + Enok)
- [ ] **Klikkbar vers-tekst** (åpne i tekst-modal)

### E) Tidslinje-funksjoner
- [ ] **Visuell tidslinje-graf** (horisontal linje 0–5700 med ankerpunkter)
- [ ] **Klikk på ankerpunkt** → hopp til år
- [ ] **Symmetri-visning** (vis 1100-blokker, 1310-blokker, 2850-pivot som overlegg)
- [ ] **Excel-rad-dypelenke** (når Excel er konvertert)

### F) Eksport og deling
- [x] CSV / KML / JSON (allerede bygget)
- [ ] **Eksport av full dashbord-tilstand** (alle innstillinger + bokmerker + kommentarer)
- [ ] **Importer tidligere tilstand** (last opp en eksport-fil)
- [ ] **PDF-eksport** av nåværende visning

### G) Brukeropplevelse
- [ ] **Innstillinger-panel** (språk, tema, enheter, skriftstørrelse)
- [ ] **Hjelp / intro** ("Hvordan bruke")
- [ ] **Tastatur-snarveier** (vis liste med ?)
- [ ] **Mørkt/lyst tema** (vi har mørkt, lyst som alternativ)

### H) Mobil og tilgjengelighet
- [ ] **PWA-konfigurasjon** (manifest.json finnes — sjekk om alt fungerer)
- [ ] **Installerbar app på mobil** (Add to Home Screen)
- [ ] **Offline-modus** (Service Worker — fungerer uten internett)
- [ ] **Touch-vennlige kontroller** (tap, sveip, pinch-zoom)
- [ ] **Responsiv layout** (panelene flyter pent på små skjermer)

### I) Team og samarbeid
- [ ] **Kommentar-system** per AM-år (notater fra teamet)
- [ ] **Verifikasjonsstatus per markør** (ubekreftet / verifisert / avvist)
- [ ] **Kildeangivelse for hver innlagt data** (hvem la den inn, når, fra hvor)

### J) Data-integrasjon (krever konvertert Excel)
- [ ] **JSON-database av Jub-arket** (5700 rader, kolonner som strukturerte felt)
- [ ] **CSV-eksport per ark** (B, S, S2, H, T, Jub, 12Pat)
- [ ] **Søk på tvers av arkene** (finn alle referanser til "Enok")
- [ ] **Tidslinje-bro-dypelenker** (klikk i dashbord → riktig Excel-rad)

## Min anbefaling for prioritering

Når skjelettet skal fullføres systematisk, foreslår jeg denne rekkefølgen:

**Fase 1 — Geografisk troverdighet** (gir umiddelbar visuell verifikasjon)
- A) Kontinent-lag

**Fase 2 — Mobilstøtte** (lett, gjør verktøyet tilgjengelig for alle)
- H) PWA, installerbar app, responsiv layout

**Fase 3 — Tidslinje-funksjoner som ikke krever Excel**
- E) Visuell tidslinje-graf med ankerpunkter, klikkbare

**Fase 4 — Personer og hendelser** (krever Excel-data)
- C) Personliste + profilsider
- D) Hendelser + vers-referanser

**Fase 5 — Bakke-modus** (stort, men kraftfullt)
- B) Himmel-kuppel fra valgt sted

**Fase 6 — Team-funksjoner**
- I) Kommentarer, verifikasjonsstatus
- F) Full eksport/import
