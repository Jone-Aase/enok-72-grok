# Målbånd v1 — Sporbarhetslogg

## Verifiseringskjede for hver strekning

### #1 Pontchartrain Causeway
**Tall**: 38.4048 km (23.863636 mi) — EKSAKT
**Verifikasjons-aritmetikk**:
```
2250 seksjoner × 56 ft × 0.3048 m/ft = 38 404.8 m = 38.4048 km
23.863636 mi = 38.4048 km (konvertering: × 1.609344)
```
- ASCE: bekrefter 23.86 mi (avrundet), listet som Historic Civil Engineering Landmark
- FIU/ABC-UTC PDF: bekrefter 2250 seksjoner og 56 ft modullengde
- Wikipedia: bekrefter 23.86 mi (avrundet)
**Konflikt mellom kilder**: ingen (alle avrunder til 38.40 / 23.86, vi beholder eksakt verdi)
**GPS-avhengighet**: NEI — eksakt fabrikat-aritmetikk uten måleusikkerhet

### #2 90 Mile Straight
**Tall**: 146.6 km (91.1 mi)
**Verifikasjons-aritmetikk**:
```
91.1 mi × 1.609344 km/mi = 146.611 km
```
- Main Roads WA: chainage-merker langs veien
- Wikipedia: bekrefter 91.1 mi
- Reisende-blogger: bekrefter via odometer-kalibrering
**Konflikt mellom kilder**: Skiltet sier "90 mil", men faktisk lengde er 91.1 mil. Populærpresse-tall 145.6 km er avrundingsfeil.
**GPS-avhengighet**: NEI — landmåling 1961-1969

### #3 Trans-Australian Railway
**Tall**: 478.193 km (297.135 mi)
**Verifikasjons-aritmetikk**:
```
478.193 km ÷ 1.609344 km/mi = 297.135 mi (perfekt match)
Mile 793 − Mile 496 = 297 mi = 477.975 km
(Differanse 218 m forklart av at endepunktene ligger litt inn i mile-postene)
```
- Engineers Australia HRP Booklet (Nov 2001): bekrefter "478 km 193 m", metoden "compass + stellar observations + snigging chain"
- ANU lingvistikk-arkiv: bekrefter chainage-data ("316 miles 70 chains" som standard-format)
- Wikipedia: bekrefter rute Port Augusta - Kalgoorlie, surveyår 1907-1909
**Konflikt mellom kilder**: ingen på 478.193 km
**GPS-avhengighet**: NEI — kjede-måling 1907-1909

### #4 Highway 10 Saudi-Arabia
**Tall**: 240 km (149 mi)
**Verifikasjons-aritmetikk**:
```
149 mi × 1.609344 = 239.79 km ≈ 240 km
```
- Guinness World Records 2020: 240 km, sertifisert av lisensiert surveyor
- Saudipedia: bekrefter 240 km, ingen svinger, ingen gradient
- Wikipedia: 240 km
**Konflikt mellom kilder**: 256 km og 278 km dukker også opp i ulike kilder, men Guinness-sertifikatet sier 240 km
**GPS-avhengighet**: SANNSYNLIG JA — 2020-sertifisering med lisensiert surveyor betyr i praksis GNSS

---

## Liste over forkastede strekninger og begrunnelse

| Strekning | Vurdert km | Forkastet fordi |
|---|---:|---|
| Struves geodetiske bue | 2820 km | Publisert km beregnet via globusmodell — sirkelresonnement |
| Suezkanalen | 193.3 km | Kanalen er ikke rett, har kurver |
| Bonneville Salt Flats | n/a | Ingen fast offisiell strekning mellom faste endepunkter |

---

## Kryss-konsistens-test (gull mot sølv mot bronse)

Utført 2026-05-17 etter forslag fra bruker.

**Metode**: Gull-enheten (Pontchartrain 38.4048 km) brukt som målestokk på de øvrige strekningene. Sjekket også mi↔km-konsistens internt i hver kilde.

| Strekning | mi↔km-konsistens | Antall gull-lengder | Vurdering |
|---|---:|---:|---|
| Pontchartrain (gull) | eksakt (fabrikat) | 1.0000 | ingen måleusikkerhet |
| 90 Mile Straight (sølv) | ±11.2 m | 3.8175 | normal avrunding |
| Trans-Australian (sølv) | ±0.6 m | 12.4514 | meter-presisjon i kilde |
| Highway 10 (bronse) | ±207.7 m | 6.2492 | heltalls-avrunding |

**Funn**:
1. Sølv-strekningene er intern-konsistente med gull-enheten på meter-nivå.
2. Trans-Australian har usedvanlig presis kilde-konsistens (avvik 0.6 m mellom kildens mi-tall og km-tall) — Engineers Australia publiserte med full meter-presisjon, ikke avrundet.
3. Bronse-tallet 240 km er åpenbart heltalls-avrundet. Avvik mot 149 mi er 208 m — bekrefter at Highway 10 skal være bronse.
4. Ingen tegn til sirkelresonnement i sølv-tallene.

**Konklusjon**: Målbåndet er internt konsistent. Ingen feil avslørt i sammensetningen.

---

## Metode-historikk i denne fasen

1. Vi startet med 7 kandidat-strekninger og søkte etter offisielle målinger
2. Vi forsøkte først å bruke Haversine-formelen som "fasit" — dette var en feil, fordi Haversine forutsetter kulen som testes
3. Vi forsøkte deretter AE-flat-modellen med fasit-radius 10.000 km — men koordinatene som ble brukt som input var WGS84/GPS-arvet, så testen var ikke uavhengig
4. Vi konkluderte: kun fysisk-målte avstander (målbåndet) kan brukes som uavhengig referanseramme
5. Vi droppet Struve, Suez, Bonneville av grunnene listet over
6. Vi rangerte de gjenværende 4 etter pålitelighet av måle-metoden

## Hva som IKKE er gjort ennå

- Vi har ikke testet modell-geometrien (AE-flat eller andre) mot målbåndet
- Vi har ikke uavhengige endepunkts-koordinater (alle er GPS-arvet)
- Vi har ikke avgjort om en flat-modell stemmer eller ikke

Dette gjøres i Panel B (skygge-test) og Panel C (sekstant/skipslogger).
