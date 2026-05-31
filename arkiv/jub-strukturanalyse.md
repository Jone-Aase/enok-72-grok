# Jub-arket — strukturanalyse (status 21. mai 2026)

Fra `One-voice-740-renset-for-Perplexity.xlsx`, arket `Jub`.

## Bokas innhold (7 ark)

| Ark | Innhold | Rader | Kol | Sammensl. |
|---|---|---:|---:|---:|
| B | Nye testamentet | 23 657 | 49 | 3 436 |
| S | Jubileumsboken + GT del 1 (parallell) | 69 755 | 50 | 13 120 |
| S2 | GT del 2 | 42 195 | 43 | 7 288 |
| H | Enoks bok (trenger fortsatt rensing) | 10 169 | 75 | 1 601 |
| T | Enok-kalenderen | 611 | 89 | 8 |
| **Jub** | **Tidslinjen (AM 0–5700)** | **5 784** | **204** | **0** |
| 12Pat | 12 Patriarkers testamenter | 3 934 | 27 | 885 |

## Jub-arket — kjernen i hele prosjektet

### Rad-struktur
- **Rad 1–4**: Sammensatte headere (multi-rad)
- **Rad 5–51**: Intro, personer-deklarasjon, oppsett
- **Rad 35**: Adam-rad (1Adam i Z og AA)
- **Rad 52**: AM 1 (første data-rad)
- **Rad 5751**: AM 5700 = 2050 AD = SLUTT
- **Rad 5752–5784**: AM 5701–5733 — etterslep, ikke del av modellen, skal IKKE konverteres

### Konverteringsformel
- `excel_rad = AM + 51`
- `AM = excel_rad − 51`
- `gregoriansk = AM − 3650`
- Verifisert: AM 5676 = rad 5727 = 2026 AD

### Kolonne-grupper

| Kolonner | Innhold |
|---|---|
| B–O (2–15) | Bibel-vers og tekst, parallelle spalter |
| P–U (16–21) | Enok-uker, jubileum, uke-av-50, uke-av-7, jubileums-år |
| **V–Y (22–25)** | **Year AM** — fire kolonner for redundans/validering og plass til hyperlenker når mange hendelser krasjer på samme år |
| Z–EF (26–136) | **Genealogien** — par av Bibel+Jubileumsbok-kolonner per person, prefiks = generasjonsnummer |
| EH–EU (138–151) | Daniels 70 uker / Enoks 70 hyrder (tall 8–53) |
| EV–FE (152–161) | Fortsettelse (tall 52–61) |
| FF–FM (162–169) | Andre etasje: 0→tempel 2850, 400-årsserien, 1310/1100-blokker, Vekterne (450 AM), 70 uker Daniel + Enoks hyrder, ukedag, 490 år |
| FO+ (171+) | Mer 70-hyrder/Daniels detaljer |

### H og HS — ikke datakilder, men fjernede navigasjonsmerker
- **H = Home-link**, pekte på personlig profilside med stamtre + all info om personen
- **HS = Home → S-ark**, lenke videre til riktig kolonne i S-arket
- Disse arkene er FJERNET i denne versjonen for å unngå AI-overload
- **400 backups eksisterer** — ingenting er tapt
- Profil-sidene kan rekonstrueres i dashbordet i stedet for i Excel

### Eksempel-celler (verifisert lest)
- `Jub!Z35` = "1Adam" (Bibelen)
- `Jub!AA35` = "1Adam" (Jubileumsboken)
- `Jub!Z31` = 930 (Adam død, Bibelen)
- `Jub!AA31` = 930 (Adam død, Jubileumsboken)
- `Jub!Z34` = 130 (Adam fikk Seth, Bibelen)
- `Jub!AH35` = "2Seth" (Bibelen)
- `Jub!AI35` = "Seth" (Jubileumsboken)
- `Jub!V52` til `Jub!Y52` = 1, 1, (blank), (blank) — AM 1

## Bugfix som må gjøres i dashbordet (v2.4)

`app.js`, `jumpToExcelRow()`-funksjonen:
- Nåværende: `Rad-nummer: ${am + 2}`
- Korrekt: `Rad-nummer: ${am + 51}`

Sjekk også at `timeline.json` har riktig offset: `amToGregorianOffset: -3650` (det er riktig allerede).

## Neste konkrete steg (når brukeren er våken)

1. **Fikse v2.4 Excel-rad-mapping** (1 min)
2. **Bygge full JSON-konvertering av Jub-arket** med all kolonne-merking
3. **Konvertere de andre 6 arkene** i prioritert rekkefølge
4. **Vurdere rekonstruksjon av profil-sider** i dashbordet (erstatter H/HS-lenkene)

## Brukerens status ved overlevering
- 16 timer kontinuerlig arbeid 20.–21. mai 2026
- Skal hvile før vi går videre
- Boka, inventar og strukturanalyse ligger trygt i workspace
- 400 backups av original-versjoner finnes — ingen tap mulig
