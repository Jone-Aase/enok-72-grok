# Pakke til Grok — Havfarge-palett for Enok 72 Truth Instrument v16.75

## Kontekst
Vi bygger et AE-projisert kart (8192x8192) av jorden sentrert på Nordpolen.
Land brukes uberørt fra Natural Earth HYP_HR (GE-stil hypsometriske tinter).
Havet skal etterligne Google Earth sin dyphavs-presentasjon: dypt = mørk
marineblå, grunt = lys turkisblå, med tydelige kontraster mellom dyphavs-
bassenger og kontinentalsokler/midthavsrygger.

## Hva vi har gjort
Sample fra Natural Earth Ocean Bottom (OB_LR.tif, 16200x8100): vi ekstraherer
B-kanalen (blå) som dybde-proxy. Vi har målt at OB-bildet komprimerer
dybde-informasjonen i intervallet B=117 (dypest, Marianagraven 10920m) til
B=218 (grunnest, sokkel <200m). Vi normaliserer dette til [0,1] og slår opp
i en lineær fargerampe.

Nåværende rampe (v16.74 = v1e-b):
- idx=0   (dypest):  RGB(5, 20, 60)    — mørk marineblå
- idx=128 (mellom):  RGB(40, 95, 155)  — klassisk havblå
- idx=255 (grunnest): RGB(130, 195, 230) — lys turkisblå

## Måledata: RGB-verdier ved kjente dybdepunkter

| Punkt                           | Dybde   | v16.73 (NE HYP) | v16.74 (vår rampe v1e-b) |
|---------------------------------|---------|-----------------|--------------------------|
| Mariana-graven                  | 10920m  | (54, 94, 131)   | (5, 40, 78)              |
| Puerto Rico-graven              |  8400m  | (90, 145, 183)  | (60, 117, 171)           |
| Java-graven                     |  7290m  | (107, 163, 199) | (67, 128, 174)           |
| Sør-Atlanteren dyp              |  5500m  | (96, 160, 202)  | (97, 161, 203)           |
| Nord-Atlanteren dyp             |  4500m  | (102, 166, 208) | (104, 168, 210)          |
| Stillehavet sentralt            |  5000m  | (109, 171, 214) | (104, 168, 210)          |
| Mid-Atlantic Ridge              |  2500m  | (108, 172, 212) | (123, 187, 227)          |
| Bering-havet                    |  3500m  | (117, 176, 217) | (115, 177, 217)          |
| Nordsjøen                       |   150m  | (199, 228, 243) | (128, 192, 229)          |
| Persiagulfen                    |    50m  | (209, 234, 246) | (126, 191, 228)          |
| Karibhavet                      |  4000m  | (114, 174, 213) | (109, 173, 213)          |
| Sørishavet sør                  |  4500m  | (116, 178, 217) | (112, 177, 214)          |

Observasjon: Mariana-graven (dypest punkt på jorden) er nå mørkere i v16.74
enn i v16.73, men brukeren synes fortsatt det er for lyst sammenlignet med GE.
GE viser typisk Mariana-graven og dyphavsbassenger som veldig mørk
midnattsblå/svart-blå (B-verdier rundt 40-90 i mørke områder).

## Spørsmål til Grok
1. Sammenlign vår nåværende fargerampe med Google Earth sin standard hav-
   presentasjon. Hvilke RGB-verdier bør vi bruke for å matche GE bedre?

2. Bør rampen være lineær, eller bør vi bruke en gamma-korreksjon (f.eks.
   gamma 0.5-0.7) som fremhever dyphavet mer? Hvis ja, hvilken gamma?

3. GE bruker tilsynelatende ikke samme hue gjennom hele dybdeområdet — har
   du observert hue-skift (f.eks. mer turkis i grunt vann, mer cyan/marine
   i dypt vann)? Foreslå konkrete RGB-stopp i en 3-5-punkts rampe.

4. Bør grunne områder (sokkel <200m) være MYE lysere/mer turkis enn i v16.74
   for å matche GE? I v16.73 er Nordsjøen (199,228,243), i v16.74 (128,192,229)
   — v16.73 er mye lysere men har ikke dybde-kontrast i dyphavet.

5. Konkret oppgave: gi oss 5 RGB-stopp (med dybde-prosent-posisjon 0-100%)
   som vi kan implementere i build_combo_v1f.py for å få et resultat som
   matcher GE best mulig.

## Format på svaret
Vi trenger en Python-snutt med fargerampen, for eksempel:

```python
GE_STOPS = [
    (0.0,   (R, G, B)),  # dypest
    (0.25,  (R, G, B)),
    (0.50,  (R, G, B)),
    (0.75,  (R, G, B)),
    (1.0,   (R, G, B)),  # grunnest
]
GAMMA = 0.6  # eller annen verdi
```

## Vedlegg
- v73-vs-v74-sammenligning.png (visuelt resultat)
- havfarger-v73-v74.csv (rå sample-data)
