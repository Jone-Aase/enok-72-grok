# Instruks til Justdone — Enok 72 prosjektet (smal, avgrenset oppgave)

## Status — vær oppmerksom
Du har levert data til oss tidligere. **10 av 12 rader var feil** — Mombasa, Zanzibar og Dar es Salaam ble klassifisert som Cancer/Capricorn (de ligger nær ekvator, ikke disse sirklene). Alle 8 URL-er var hallusinerte (404). Avstandsberegninger var 5-44 ganger feil.

Vi gir deg én ny mulighet med en **mye smalere oppgave**.

## Din rolle nå
Du har én eneste oppgave: **sjekke koordinater på en kort liste over kjente steder**.

Ingen frie søk. Ingen hallusinerte URL-er. Bare nøyaktig oppslag på Wikipedia eller Google Maps.

## Konteksten (kort)
Et team på 9 AI-er hjelper en norsk forsker. Vi samler gamle markører nær tre breddegrader (Ekvator, Cancer på 23.4°N, Capricorn på 23.4°S). Vi plotter på Google Earth.

## Din konkrete oppgave

Slå opp **eksakte koordinater** for disse 20 stedene. For hver, returner én CSV-rad.

### Liste å verifisere

```
JD-001: Mérida, Yucatán, Mexico
JD-002: Campeche, Mexico
JD-003: La Paz, Baja California Sur, Mexico
JD-004: Santiago de Cuba, Cuba
JD-005: Castillo del Morro, Havana, Cuba
JD-006: San Juan, Puerto Rico (gammelt fort)
JD-007: Cap-Haïtien, Haiti
JD-008: Santo Domingo, Dominikanske Republikk
JD-009: Nassau, Bahamas (gammelt fort)
JD-010: Key West Lighthouse, Florida
JD-011: Tropic of Capricorn marker Rockhampton, Australia
JD-012: Stanthorpe, Queensland, Australia
JD-013: Alice Springs, Australia
JD-014: Antofagasta havn, Chile
JD-015: Iquique havn, Chile
JD-016: Asunción, Paraguay
JD-017: Salta, Argentina (kolonialfort)
JD-018: Ouro Preto, Brasil (gammel gullby)
JD-019: Salvador, Brasil (kolonialby, 1549)
JD-020: Recife, Brasil
```

## Format på leveransen — eksakt CSV (12 kolonner)

```
id,sted,lat,lon,naerme_sirkel,avvik_km,byggeaar,kilde_url,verifisert_dato,merknad
```

**Eksempel rad:**
```
JD-001,"Mérida, Mexico",20.9674,-89.5926,Cancer,275.2,1542,https://en.wikipedia.org/wiki/M%C3%A9rida%2C_Yucat%C3%A1n,2026-05-20,Spansk koloniby. 275 km sør for Cancer.
```

**For hver av de 20 stedene:**
- `lat/lon`: hent fra Wikipedia eller Google Maps. Minst 4 desimaler.
- `naerme_sirkel`: regn ut. Hvis lat er mellom -15° og +15°, er nærmeste "Ekvator". Hvis mellom +15° og +35°, "Cancer". Hvis mellom -35° og -15°, "Capricorn".
- `avvik_km`: avstand fra stedets lat til sirkelens lat, i kilometer. Formel: `(stedets_lat - sirkel_lat) * 111.32`. Sirkel-lat: Cancer = +23.4394, Ekvator = 0, Capricorn = -23.4394.
- `byggeaar`: når ble byen/fortet grunnlagt? Hent fra Wikipedia.
- `kilde_url`: Wikipedia-URL — sjekk at den fungerer ved å åpne den
- `merknad`: én norsk setning som beskriver stedet

## Strenge regler — VIKTIG

1. **IKKE finn på URL-er**. Hvis Wikipedia-siden ikke eksisterer for stedet, skriv "INGEN_URL" og hent koordinatene fra Google Maps.
2. **Sjekk avstanden**. Bruk formelen `(stedets_lat - sirkel_lat) * 111.32`. Hvis Mérida er 20.97°N og Cancer er 23.44°N, er forskjellen 2.47° × 111.32 = 275 km. Hvis du får et tall 5-44 ganger større eller mindre, har du regnefeil.
3. **Klassifiser sirkel riktig**. Hvis et sted ligger på 4°S, er det NÆRE EKVATOR, ikke Capricorn. Capricorn er 23.4°S.
4. **Norsk på merknader**.
5. **Ingen ekstra søk**. Bare disse 20.

## Hva du blir kvalitetskontrollert på

ChatGPT vil sjekke hver rad:
- Eksisterer URL-en?
- Stemmer koordinatene med Wikipedia?
- Er avstandsberegningen riktig?
- Er nærmeste sirkel klassifisert korrekt?

Hvis 10/20 rader er rett denne gang, regner vi det som godt. Hvis 18/20 er rett, regner vi det som utmerket.

## Output

Returner ren CSV som tekst i svaret. 21 linjer (1 header + 20 data).

Lykke til. Ta deg god tid. Sjekk avstandene før du sender.
