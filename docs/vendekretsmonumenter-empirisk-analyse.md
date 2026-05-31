# Vendekretsmonumenter — empirisk analyse av 14 dokumenterte zenith-punkter

**Dato:** 2026-05-28
**Kilde:** vendekretser-vitnesbyrd-3.pdf (Jone-Aase)
**Formål:** Avgjøre empirisk hvor Cancer- og Capricorn-banene faktisk ligger, basert på 14 fysisk dokumenterte zenith-monumenter på fire kontinenter.

## Sammendrag

| Bane | Antall monumenter | Snitt breddegrad (absolutt) | Spredning | Best match |
|---|---|---|---|---|
| Cancer (nord) | 6 | 23,5614° N | 0,656° (72,5 km) | Klassisk 23,50° |
| Capricorn (sør) | 8 | 23,4409° S | 0,122° (13,5 km) | Moderne kule 23,4365° |
| Snitt begge baner | 14 | 23,5011° | – | Klassisk 23,50° |

**Capricorn-spredningen er bemerkelsesverdig lav** (13,5 km mellom ytterste punkter) — sterkt empirisk støtte for at vendekretsen er en fast sirkel.

## Cancer-banen (nord) — 6 monumenter

| Sted | Land | Lat (°N) | Avvik 23,70° | Avvik 23,50° | Avvik 23,4365° |
|---|---|---|---|---|---|
| San Luis Potosí | Mexico | 23,44944 | −27,7 km | −5,6 km | +1,4 km |
| Santiago (BCS) | Mexico | 23,50000 | −22,1 km | +0,0 km | +7,0 km |
| Aswan (Syene) | Egypt | 24,08889 | +43,0 km | +65,1 km | +72,1 km |
| Shantou (Guangdong) | Kina | 23,44240 | −28,5 km | −6,4 km | +0,7 km |
| Nan'ao Island | Kina | 23,43300 | −29,5 km | −7,4 km | −0,4 km |
| Chiayi | Taiwan | 23,45462 | −27,1 km | −5,0 km | +2,0 km |

**Snitt (inkl. Aswan):** 23,5614° N
**Snitt (eks. Aswan):** 23,4577° N — kraftig konvergens mot 23,4365°

Aswan er utligger. Mulige forklaringer:
- Eratosthenes-måling fra 240 f.Kr. ble gjort fra ulike steder (Syene by, ikke nøyaktig samme punkt som dagens Aswan-koordinater)
- Wikipedia-koordinatene 24,08889° N gjelder selve byen Aswan, ikke Eratosthenes' opprinnelige observasjonsbrønn
- Den klassiske formuleringen «vendekretsen går gjennom Syene» kan ha referert til en bredere sone

## Capricorn-banen (sør) — 8 monumenter

| Sted | Land | Lat (°S) | Avvik 23,70° | Avvik 23,50° | Avvik 23,4365° |
|---|---|---|---|---|---|
| Antofagasta | Chile | 23,44310 | −28,4 km | −6,3 km | +0,7 km |
| Belén | Paraguay | 23,43752 | −29,0 km | −6,9 km | +0,1 km |
| Huacalera | Argentina | 23,43830 | −28,9 km | −6,8 km | +0,2 km |
| São Paulo | Brasil | 23,46257 | −26,3 km | −4,1 km | +2,9 km |
| Maringá | Brasil | 23,42530 | −30,4 km | −8,3 km | −1,2 km |
| Rockhampton | Australia | 23,37810 | −35,6 km | −13,5 km | −6,5 km |
| Alice Springs | Australia | 23,44189 | −28,5 km | −6,4 km | +0,6 km |
| Solitaire | Namibia | 23,50023 | −22,1 km | +0,0 km | +7,1 km |

**Snitt:** 23,4409° S — avvik fra 23,4365° er 0,1 km. Praktisk talt eksakt match med moderne kule-vendekrets.

## Hypotese-sammenligning

| Hypotese | Cancer-avvik | Capricorn-avvik | Symmetri (C - C) |
|---|---|---|---|
| **Ark T H212: 23,70°** | −15,3 km | −28,7 km | 13,3 km |
| **Klassisk: 23,50°** | +6,8 km | −6,5 km | 13,3 km |
| **Moderne kule: 23,4365°** | +13,4 km (Aswan-justert: +2,4 km) | +0,1 km | 13,3 km |

**Konklusjon:** De empiriske data passer best med **moderne kule-verdi 23,4365°**, hverken Ark T-verdien 23,7° eller klassisk 23,50°.

## Konsekvenser for instrumentet

### Hvis vi beholder Ark T 23,7° som ankerverdi
- 14 monumenter ligger i snitt 15–29 km nærmere ekvator enn 23,7°-ringen
- Cancer-ring i instrumentet (radius 11 608 km i dagens kode) treffer ikke monumentene
- Krever forklaring: hvorfor avviker fysiske vendekrets-markører fra Ark T?

### Hvis vi justerer til empirisk Capricorn-snitt 23,44°
- Cancer-radius (AE-formel): R_OUTER × (90 − 23,44) / 180 = **11 614,75 km**
- Capricorn-radius: R_OUTER × (90 + 23,44) / 180 = **19 805,80 km**
- Dette er **6,71 km MER** for Cancer enn dagens 11 608 km
- Dette er **6,20 km MINDRE** for Capricorn enn dagens 19 812 km

### Hvis vi tester GE-skala (110,593 km/grad) på empirisk snitt
- Cancer fra ekvator: 23,4409 × 110,593 = **2 592,17 km bue**
- Capricorn fra ekvator: 23,4409 × 110,593 = samme
- På AE-disken med 174,559 km/° = **4 091,76 km** fra ekvator-ringen

## Symmetri-anomalien

Cancer-snittet er 0,12° nord for Capricorn-snittet (etter speilvending) = **13,3 km nord-skjevhet**.

To mulige tolkninger:
1. **Måleskjevhet:** Aswan-utliggeren skjevheter Cancer-snittet oppover; uten Aswan blir diff = +0,02° (2,3 km)
2. **Reell fysisk skjevhet:** Solen treffer Cancer-banen marginalt lenger fra ekvator enn Capricorn-banen — passer en hypotese om at sør er strukket på flat-modellen

## Anbefaling

1. **Beholde Ark T 23,70° som referanse-ankerverdi** (regelhierarki)
2. **Plotte alle 14 monumenter på AE-disken** og se hvilken sirkel de faktisk faller på
3. **Markere både Ark T-ringen (23,70°) og empirisk ring (23,44°)** for visuell sammenligning
4. **Dokumentere avviket** — det er en sannhet i seg selv: enten må Ark T-verdien revideres, eller så må monumentene være systematisk feilplassert

## Kilder

Se vendekretser-vitnesbyrd-3.pdf side 3–6 for individuelle kilde-lenker per monument.
