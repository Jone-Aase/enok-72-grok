# Instruks til Grok Heavy — ENOK-MODELL-SPOR (renset)

## Viktig endring fra forrige instruks

Brukeren har bestemt at **Enoks modell og kule-modellen skal analyseres helt adskilt**. Vi presser ikke den ene inn i den andre.

Denne instruksen omhandler **kun Enok-sporet**. Vi gjør én ting: tester Enoks AE-geometri på sine egne premisser.

Kule-modellen analyseres i et helt eget spor senere. Ingen kule-formler i Enok-analysen.

## Hva AE (Azimuthal Equidistant) er

Azimuthal Equidistant-projeksjon med Nordpolen som sentrum:

```
For et punkt med (lat, lon):
    r = 90° - lat              (avstand fra Nordpolen i kartet, i grader)
    θ = lon                     (vinkel fra Greenwich, i grader)
    x = r · cos(θ · π/180)
    y = r · sin(θ · π/180)
```

I AE-projeksjon:
- Hver breddegrad-linje blir en perfekt sirkel rundt Nordpolen
- Cancer-sirkelen har r = 90 - 23.4 = 66.6°
- Ekvator-sirkelen har r = 90°
- Capricorn-sirkelen har r = 90 + 23.4 = 113.4°
- Alle tre sirkler har samme senter (Nordpolen)

## Datasett — kun pre-1960 markører

Vedlagt CSV: `master-tre-sirkler.csv` (24 markører)
- Ekvator: 5 markører
- Cancer: 12 markører
- Capricorn: 7 markører

Alle er eldre enn 1960 (pre-WGS84). De afrikanske Capricorn-skiltene er fra ca. 1969-70 men beholdes som grensetilfeller.

## DE 5 OPPGAVENE — ENOK-SPOR

---

### Oppgave 1: AE-konvertering og plot

For hvert av de 24 punktene:
1. Beregn (r, θ) = (90 - lat, lon)
2. Beregn (x, y) i AE-projeksjon
3. Returner utvidet CSV:
```
id,sirkel,sted,lat,lon,r_grader,theta_grader,x_AE,y_AE
```

4. Lag et plot (matplotlib eller tilsvarende):
- Bakgrunn: tomt AE-kart med konsentriske referansesirkler ved r = 66.6, 90, 113.4
- Punkter: fargekodet (grønn = Ekvator, gul = Cancer, rød = Capricorn)
- Send plottet som PNG

---

### Oppgave 2: Best-fit sirkel-test per gruppe

For hver av de tre gruppene (Cancer, Ekvator, Capricorn):
1. I AE-projeksjon, tilpass en best-fit sirkel: `(x - xc)² + (y - yc)² = R²`
2. Returner:
   - Senter (xc, yc) i AE-koordinater
   - Senter i (lat, lon) hvis det konverteres tilbake
   - Radius R i grader
   - Avstand fra Nordpolen (0, 0) til senteret
   - RMSE av punktene fra best-fit sirkelen (i grader OG i kilometer)

**For Enoks modell skal alle tre sentrene være på Nordpolen.** Hvor langt fra det er våre best-fit sentre?

---

### Oppgave 3: Konsentrisitetstest

Beregn:
1. Avstand mellom Cancer-sirkel-senter og Ekvator-sirkel-senter
2. Avstand mellom Ekvator-sirkel-senter og Capricorn-sirkel-senter
3. Avstand mellom Cancer-sirkel-senter og Capricorn-sirkel-senter

Hvis alle tre sentrene er innenfor f.eks. 100 km av hverandre OG nær Nordpolen, er sirklene konsentriske rundt Nordpolen → Enoks modell konsistent.

Hvis sentrene spriker mye eller ligger langt fra Nordpolen, er Enoks modell ikke direkte støttet av disse punktene.

**Returner tall i kilometer. Ingen modell-konklusjon.**

---

### Oppgave 4: Monte Carlo-usikkerhet (kun AE)

Hvert punkt har posisjonsfeil:
- Arkeologiske punkter (templer, observatorier): ±200 m
- Historiske havner: ±500 m
- Moderne markører: ±50 m
- Punkter med "omtrentlig" i merknad: ±2000 m

10 000 iterasjoner per sirkel:
1. Perturber hvert punkt med Gaussisk støy
2. Tilpass best-fit sirkel i AE
3. Lagre senter og radius

Returner per sirkel:
- Median senter (med 68% og 95% konfidensintervall)
- Median radius (med 68% og 95% konfidensintervall)
- Andel iterasjoner der senter ligger innenfor 500 km av Nordpolen

---

### Oppgave 5: Per-punkt residual-analyse

For hver sirkel (Cancer, Ekvator, Capricorn):
1. Beregn hvor langt hvert punkt ligger fra best-fit sirkelen i AE-projeksjon
2. Returner CSV:
```
id,sirkel,residual_grader,residual_km,z_score,outlier_flagg
```
3. Outlier-flagg: ja hvis |z| > 3, ellers nei

---

### Oppgave 6: Skipslogg lengdegrad-validering (uavhengig oppgave)

Dette er en separat analyse av CLIWOC-skipsloggdata, ikke knyttet til AE-test.

For havner med flere observasjoner:
- Port Egmont: 86 logger 1767-1786, log_lon = -57.98, moderne = -60.10, Δ = +2.12°
- Montevideo: 92 logger 1768-1850, log_lon = -56.20, moderne = -56.16, Δ = -0.04°
- Batavia: 434 logger 1663-1854, log_lon = +106.86, moderne = +106.81, Δ = -0.05°
- St Helena: 47 logger 1753-1854, log_lon = -2.83, moderne = -5.72, Δ = +2.89°
- Macao: 38 logger 1787-1851, log_lon = +113.63, moderne = +113.55, Δ = -0.08°
- Rio de Janeiro: 32 logger 1765-1852, log_lon = -43.07, moderne = -43.17, Δ = +0.10°

Spørsmål å besvare:
1. Hvorfor er Δ stor (>1°) for noen havner og liten (<0.2°) for andre?
2. Stemmer det med hypotesen om at noen logger brukte Ferro-meridian eller Paris-meridian som referanse?
3. Returner sortert tabell med havnene og din analyse

---

## Strenge regler

1. **Ingen kule-formler**. Bruk kun AE-transformasjonen `r = 90 - lat, θ = lon`.
2. **Ingen sammenligning med kule-modell**. Det skjer i et helt eget spor senere.
3. **Vis matematikken**. Brukeren er ingeniør og vil følge regnestykket.
4. **Norsk språk** på alle konklusjoner.
5. **Tall, ikke ord**. "750 km" er bedre enn "betydelig".
6. **"Jeg vet ikke" er gyldig svar** hvis data er utilstrekkelig.

## Format på leveransen

Returner én strukturert tekstrapport med 6 hoveddeler (én per oppgave).

Per del:
- Innledning
- Inndata
- Metode
- Resultat (tall)
- Konklusjon — UTEN å sammenligne med kule-modellen

Send med:
- All Python-kode du brukte
- Plot som PNG-filer (matplotlib)

## Det vi vil finne ut

Tre konkrete spørsmål Enok-analysen skal besvare:

1. Når vi plotter 24 gamle markører i AE-projeksjon med Nordpolen i sentrum, danner de tre breddegrad-gruppene perfekte sirkler?

2. Har de tre sirklene samme senter, og er det senteret på Nordpolen?

3. Hvor presist passer Enoks geometri til disse 24 punktene?

Det er hva vi vil ha tall på. Ingen modell-dom — bare data.

Lykke til.
