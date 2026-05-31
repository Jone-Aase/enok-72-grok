# Instruks til Grok Heavy — Enok 72, FASE 1 (kun visualisering)

## Viktig — hva denne fasen IKKE er

Dette er **ikke** en test av Enoks modell. Det er heller ikke en sammenligning med kule-modellen.

Dette er **kun ren visualisering**:
- Plotte 24 gamle markører i AE-projeksjon med Nordpolen som sentrum
- Beregne hvor de ligger geometrisk
- Vise resultatet som klart og lesbart plot

Du skal IKKE:
- Konkludere om Enoks modell stemmer eller ikke
- Sammenligne med kule-modell
- Sammenligne med ortografisk projeksjon
- Bruke cosinusfaktorer, WGS84-justeringer eller ellipsoide-formler
- Foreslå hypoteser om presesjon eller drift

Du skal kun:
- Konvertere lat/lon til AE-koordinater
- Plotte
- Levere koordinat-tabell

Brukeren skal selv tolke visualiseringen. Senere faser vil legge til uavhengige avstandsdata.

## Hva AE-projeksjon er

Azimuthal Equidistant-projeksjon med Nordpolen som sentrum:

```
r = 90 - lat                           (i grader)
θ = lon · π/180                        (radianer)
x = r · cos(θ)
y = r · sin(θ)
```

Resultat:
- Nordpolen ligger i (0, 0)
- Hver breddegrad-linje blir en sirkel rundt origo
- Hver lengdegrad-linje blir en stråle ut fra origo
- Sørpolen ligger på y-aksen/x-aksen som en omkrets med radius 180°

## Datasett

Vedlagt: `master-tre-sirkler.csv` (24 punkter)
- Ekvator: 5 punkter
- Cancer: 12 punkter
- Capricorn: 7 punkter

Alle pre-1960. Inkludert eldgamle observatorier (Catequilla år 800, Dholavira 2650 f.Kr.), gamle havner (Mazatlán, Havana, Macao), og koloni-tids monumenter.

## Dine tre oppgaver

### Oppgave 1: AE-konvertering

For hvert av de 24 punktene:
1. Beregn r = 90 - lat
2. Beregn θ = lon (i grader OG radianer)
3. Beregn x = r · cos(θ_radianer)
4. Beregn y = r · sin(θ_radianer)

Returner CSV med disse 9 kolonnene:
```
id,sirkel,sted,lat,lon,r_grader,theta_grader,x_AE,y_AE
```

### Oppgave 2: Plot i AE-projeksjon

Lag ett enkelt plot:
- **Akser**: x_AE og y_AE i grader
- **Origo**: Nordpolen (merket tydelig)
- **Referansesirkler** (tegnet som tynne grå linjer):
  - r = 66.6° (Enoks forventede Cancer-sirkel)
  - r = 90° (Enoks forventede Ekvator-sirkel)
  - r = 113.4° (Enoks forventede Capricorn-sirkel)
- **Punktene**:
  - Cancer: gule prikker
  - Ekvator: grønne prikker
  - Capricorn: røde prikker
- **Etiketter**: ID per punkt (CAN-01, EKV-01, etc.)
- **Tittel**: "Enok 72 — 24 gamle markører i AE-projeksjon (Fase 1, ren visualisering)"

Lagre som PNG, helst 1500x1500 piksler eller større.

### Oppgave 3: Beskrivende statistikk per gruppe

For hver av de tre breddegrad-gruppene (Cancer, Ekvator, Capricorn), beregn:
- Antall punkter
- Gjennomsnittlig r (avstand fra Nordpolen)
- Standardavvik på r
- Min og maks r
- Spenn i θ (hvor stort av "klokken" rundt Nordpolen dekker punktene)

Returner som tabell:
```
sirkel,n,mean_r,std_r,min_r,max_r,theta_spenn_grader
```

## Strenge regler

1. **Ingen kule-formler**. Bruk kun AE-transformasjonen `r = 90 - lat, θ = lon`.
2. **Ingen modell-konklusjoner**. Bare tall og plot.
3. **Norsk språk** på kommentarer.
4. **Vis Python-koden** du brukte.
5. **Hvis lat/lon mangler** for et punkt, hopp over og noter i merknad.

## Leveranse

Returner i denne rekkefølgen:
1. **Python-koden** du brukte (klar til å kjøres på nytt)
2. **CSV-tabellen** fra Oppgave 1 (alle 24 rader)
3. **PNG-plottet** fra Oppgave 2
4. **Statistikk-tabellen** fra Oppgave 3
5. **Korte norske observasjoner** om hva plottet viser visuelt
   - Ingen tolkning av om Enoks modell stemmer
   - Bare beskrivelse: "punktene ligger ca. her", "spennet er ca. så stort"

## Hva vi gjør med dataene senere

Når Fase 1 er ferdig:
- Brukeren inspiserer plottet
- Senere faser legger til uavhengige fysiske avstandsmålinger (skipslogger, basislinjer)
- Først DA kan vi virkelig teste Enoks geometri

Akkurat nå er målet kun å se hvordan dataene ser ut i AE-projeksjon.

Lykke til.
