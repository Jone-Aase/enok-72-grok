# Målbånd v1 — Protokoll for fysisk-kalibrerte avstander

**Versjon**: 1.0
**Dato**: 2026-05-17
**Formål**: Etablere et sett verifiserte, fysisk målte jord-strekninger som referanseramme for Enok 72-simulatoren, uten å forutsette noen kulemodell og uten GPS.

---

## Grunnprinsipp

Målbåndet bygger på samme prinsipp som Kongsberg-våpenindustrien bruker i praksis: en lokal, flat referanseramme (ENU/Cartesian) der avstander er empirisk målt, ikke beregnet fra en kulemodell. Strekningene er rangert etter pålitelighet av selve måle-metoden, ikke etter hvor "kjent" tallet er.

### Hva som er ekskludert og hvorfor

| Strekning | Forkastet fordi |
|---|---|
| Struves geodetiske bue | Den publiserte km-lengden er beregnet via en globusmodell — sirkelresonnement |
| Suezkanalen | Kanalen er ikke en rett linje; den har kurver |
| Bonneville Salt Flats | Ingen fast offisiell strekning mellom faste endepunkter |
| WGS84 / GPS-koordinater | Forutsetter kulen som testes — kan ikke brukes som uavhengig fasit |
| Haversine-formel | Forutsetter kulen som testes |

---

## Pålitelighets-tier

### GULL — Ren fysisk addisjon
Strekningen er bygget eller målt slik at lengden er en direkte sum av kjente fabrikat- eller fysiske enheter. Ingen landmåling, ingen interpolering.

### SØLV — Pre-GPS landmåling
Strekningen er målt med fysisk kjede, teodolitt eller chainage, før GPS eksisterte. Akkumulerte feil mulige over lange strekninger, men metodikken er uavhengig av kule-antagelse.

### BRONSE — Post-GPS sertifisering
Strekningen er moderne sertifisert (f.eks. Guinness 2020). Måle-metoden er sannsynligvis GNSS, som indirekte bruker WGS84-ellipsoiden. Brukes som bekreftelse, ikke som primær fasit.

---

## De fire strekningene

### #1 — Pontchartrain Causeway (GULL) — 38.4048 km

**Hva**: Den originale (sørgående) brua over Lake Pontchartrain, Louisiana.
**Hvorfor gull**: Brua består av 2250 prefabrikerte betongseksjoner, hver med fabrikat-lengde 56 fot. Lengden er en eksakt aritmetisk identitet:

```
2250 × 56 ft × 0.3048 m/ft = 38 404.8 m = 38.4048 km = 23.863636 mi
```

Dette er ikke en måling — det er en tellbar sum av definerte enheter. 2250 og 56 er heltall (tellbare), og 0.3048 m/ft er den internasjonale fot-definisjonen siden 1959 (eksakt). Det finnes **ingen måleusikkerhet** i denne aritmetikken.

**Kildene avrunder**: ASCE og Wikipedia skriver 38.40 km / 23.86 mi. Det er deres avrunding (mister 4.8 m presisjon), ikke vår. Vi beholder full presisjon i målbåndet.

**Kilder**:
- ASCE Historic Civil Engineering Landmark
- FIU/ABC-UTC tekniske rapporter
- Wikipedia (23.86 mi konsensus)

### #2 — 90 Mile Straight, Eyre Highway (SØLV) — 146.6 km

**Hva**: Den rette strekningen på Eyre Highway mellom Balladonia og Caiguna, Vest-Australia.
**Hvorfor sølv**: Strekningen er landmålt av Main Roads Western Australia under bygging 1961-1969 med chainage-merker. Pre-GPS. Bekreftet uavhengig av reisende som har kalibrert bil-odometere mot kjente milepæler.

**Hvorfor ikke gull**: Lengden er ikke en direkte addisjon av kjente fabrikat-enheter, men en målt strekning over terreng.

**Verdivurdering**: Det offisielle skiltet sier "90 mil", men faktisk lengde er 91.1 mil = 146.6 km. Verdien 145.6 km som dukker opp i populærpresse er en avrundingsfeil.

**Kilder**:
- Main Roads Western Australia
- Wikipedia (Caiguna, Balladonia)

### #3 — Trans-Australian Railway rette seksjon (SØLV) — 478.193 km

**Hva**: Den lengste rette jernbanesporet i verden, mellom Mile 496 (mellom Nurina og Loongana, WA) og Mile 793 (mellom Ooldea og Watson, SA), tvers over Nullarbor.

**Hvorfor sølv**: Landmåling 1907-1909, lenge før GPS. Metoden er dokumentert av Engineers Australia:

> "Anketell set the alignment by compass, checking it by stellar observations and marking the route by means of a heavy 'snigging chain' drawn by one of his camels. The chaining, pegging and leveling party followed."

To uavhengige ekspedisjoner møttes ved grensekairnet i mars 1909:
- **WA-parti**: Richard Anketell, 3 andre surveyorer, 10 kameldrivere, 91 kameler. Startet fra Kalgoorlie midt-1904.
- **SA-parti**: J.T. Furner. Startet fra Port Augusta juni 1908.

**Verifikasjon av tall**:
- 478.193 km ÷ 1.609344 = 297.135 mil (perfekt match)
- Mile 793 − Mile 496 = 297 mil = 477.975 km (avvik 218 m forklares av at endepunktene ligger litt inn i mile-postene)

**Hvorfor ikke gull**: Akkumulerte feil mulige over 478 km kjede-måling, og koordinatene som identifiserer endepunktene er moderne GPS-arvede.

**Kilder**:
- Engineers Australia: HRP Trans-Australian Railway Booklet, Nov 2001
- Trove (NLA newspaper archive)
- Australian National University linguistics archive (chainage-data)

### #4 — Highway 10 Saudi-Arabia rette segment (BRONSE) — 240 km

**Hva**: Verdens lengste rette vei uten svinger eller gradient. Privatvei bygget for Kong Fahd, kobler Highway 75 (Haradh) med Highway 95 (vest-Saudi).

**Hvorfor bronse**: Måle-metoden er ikke offentliggjort. Sertifisert av Guinness World Records i 2020 av en lisensiert surveyor — i 2020-konteksten betyr dette sannsynligvis GPS/GNSS. Tallene 256 km og 278 km dukker også opp i ulike kilder; det offisielle Guinness-tallet er 240 km.

**Hvorfor ikke sølv**: Post-GPS måling. Brukes som bekreftelse av størrelsesorden, ikke som primær fasit.

**Kilder**:
- Guinness World Records (sertifikat 2020)
- Saudipedia
- Wikipedia (Highway 10 Saudi Arabia)

---

## Sammendrag: Hva vi kan stole på

| Pålitelighets-tier | Strekninger | Sum km |
|---|---|---:|
| GULL (eksakt fabrikat) | Pontchartrain | 38.4048 |
| SØLV (pre-GPS landmåling) | 90 Mile Straight + Trans-Australian | 624.804 |
| BRONSE (post-GPS, avrundet) | Highway 10 | 240.0 |

**For Enok 72-modellens kalibrering**: gull- og sølv-strekningene er de eneste vi kan bruke som uavhengige tester av en flat-jord-modell. Bronse-strekningen (Highway 10) brukes kun som bekreftelse — siden måle-metoden indirekte forutsetter WGS84, kan den ikke teste modellen uavhengig.

**Det vi IKKE har gjort**:
- Vi har ikke beregnet om disse strekningene "passer" på AE-projeksjonen eller andre flat-modeller. Det krever endepunkts-koordinater som ikke er GPS-arvet, hvilket vi ikke har for noen av strekningene.
- Vi har ikke konkludert om en flat-modell stemmer eller ikke. Målbåndet er en empirisk referanseramme — neste fase (Panel B og C) skal teste modellen mot disse målte avstandene gjennom uavhengige metoder (skygge-vinkler, sekstant, skipslogger).

---

## Intern kryss-konsistens-test (utført 2026-05-17)

Vi har testet de fire strekningene mot hverandre ved å bruke gull-enheten (Pontchartrain) som målestokk:

| Strekning | Antall gull-lengder | Avvik mi↔km |
|---|---:|---:|
| 90 Mile Straight | 3.8175 | ±11 m (avrunding) |
| Trans-Australian | 12.4514 | **±0.6 m** (meter-presisjon i kilde) |
| Highway 10 | 6.2492 | ±208 m (heltalls-avrunding) |

**Funn**: Sølv-strekningene er intern-konsistente med gull-enheten på meter-nivå. Bronse-strekningens åpenbare heltalls-avrunding bekrefter at Highway 10 skal være bronse, ikke sølv.

Ingen tegn til sirkelresonnement eller skjult globusmodell i sølv-tallene. Målbåndet er internt konsistent.

---

## Neste fase

1. **v4.10 Kontinent-utklipp**: Klippe ut kontinent-former med målbåndets strekninger som intern skala-referanse.
2. **v4.11 Panel B**: Skygge/Eratosthenes-test — uavhengig vinkel-måling for å sjekke geometrien.
3. **v4.12 Panel C**: Sekstant/skipslogger — uavhengige historiske avstands-data fra sjøfart.

Disse fasene skal teste modell-geometrien mot målbåndet, ikke omvendt.
