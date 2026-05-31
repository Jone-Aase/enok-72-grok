# Rutenett-feilen og soldeklinasjon

**Sist oppdatert:** 2026-05-27
**Forfatter:** Jone-Aase (formulering 27. mai 2026), redigert av Perplexity-agent
**Status:** Kjerneprinsipp for instrumentet

## 1. Kjernen i feilen

Det moderne lat/lon-rutenettet behandler **ekvator som solens primære akse**. Det er feil.

Solen står 90° rett opp i zenith:

- **Bare 1 dag per år på Krepsens vendekrets** (+23,7°) — sommersolverv
- **Bare 1 dag per år på Steinbukkens vendekrets** (−23,7°) — vintersolverv
- **2 dager per år overalt mellom vendekretsene** — én på vei opp, én på vei ned
- **Aldri utenfor vendekretsene**

Ekvator (0°) er **ikke** solens primære akse. Det er midtlinjen mellom de to vendekretsene. Solen passerer ekvator to ganger per år (vårjevndøgn og høstjevndøgn) — som to av de uendelig mange punktene den krysser mellom vendekretsene.

## 2. Konsekvensen i breddegrad-beregning

Når en sjømann eller landmåler bruker sextant for å bestemme breddegrad, måler hun **solens høyde over horisonten** (h). Formelen som har vært brukt i moderne navigasjon:

```
breddegrad = 90° − h + δ
```

der δ er solens deklinasjon for den dagen.

**Problemet:** δ-tabellene forutsetter at solens årlige bevegelse er regnet ut fra et bestemt geometrisk system. Hvis det systemet selv er feil kalibrert, blir δ feil, og dermed blir breddegraden også feil — men internt konsistent. Resultatet blir sirkulær logikk.

## 3. Den 47,4° bevegelsen

Solen vandrer årlig over 47,4° (fra +23,7° til −23,7° og tilbake). Det skjer i to halvdeler:

| Periode | Dager | Bevegelse | Hastighet |
|---|---|---|---|
| Sommersolverv → vintersolverv | 182,5 dager | −47,4° | −0,2597°/dag |
| Vintersolverv → sommersolverv | 182,5 dager | +47,4° | +0,2597°/dag |

I Enoks ark T er den daglige verdien forfinert: **0,2604° per dag** når man tar hensyn til den 364-dagers strukturen pluss 4 ekstrarunder (samlet 368 sol-runder per år, ikke 365,25).

## 4. Jone-Aases formulering (27. mai 2026, 23:58)

> *"Man må legge til 1 grad av 180 grader som ark T viser fra sommersolverv for å vite hvilken breddegrad man er på. Siden de brukte kun Ekvator som er midt mellom disse vendekretsene blir breddegradene feil også på en kule modell."*

Dette betyr at hver av de 180 dagene fra sommersolverv til vintersolverv inneholder 1° av en 180°-måling i Ark T. Hver dag er en grad — men det er en grad av solens egen vandring, **ikke en grad av ekvator-avstand**.

## 5. Hvorfor det rammer både AE og kule-modellen

Dette er ikke en kritikk av kule-modellen som geometri, men av **rutenett-konvensjonen** som brukes uavhengig av geometri:

- Hvis ekvator-konvensjonen brukes som referanse i en kule-modell, blir breddegradene forskjøvet med den uregnede daglige deklinasjonen.
- Hvis ekvator-konvensjonen brukes i en AE-modell, blir feilen den samme.
- **Feilen sitter i tolkningen av solens posisjon på en gitt dag**, ikke i selve jord-geometrien.

Dette stemmer med omkrets-rapport v3.1 sin observasjon: WGS84 sier 40 075 km omkrets (som krever R=6 378 km), mens Google Earth selv oppgir R=10 001,47 km (kalibrert mot Pontchartrain Causeway). Begge kan ikke være riktige. Når begge tallene har offisiell støtte, betyr det at det er et internt motsigende kalibreringsproblem — ikke nødvendigvis ett "rett" og ett "feil" tall, men et system som er bygget på en falsk antagelse om hva ekvator er.

## 6. 45°-regelen og dens kobling

Omkrets-rapport v3.1 formulerer dette som:

```
sol-høyde = 90° − vinkelavstand til zenith-punktet
```

Det er **ikke** "90° − vinkelavstand til ekvator". Det er avstand til det punktet der solen faktisk står 90° i zenith den dagen.

Hvis det punktet ligger på +18° (en sommer-dag før vendekretsen er nådd), og du måler solen 50° over horisonten, så er du:

```
90° − 50° = 40° vinkelavstand fra +18° = breddegrad enten +58° eller −22°
```

Den moderne formelen ville gitt:

```
90° − 50° + 18° = 58° (kun nordlig)
```

Forskjellen ligger i hvilken akse man måler avstanden til. Mellom vendekretsene blir feilen statistisk skjult fordi forskjellige observasjoner gjennom året midler hverandre ut.

## 7. Falsifiserbar prediksjon

Instrumentet predikerer at **15 710,40 km er max avstand solstrålene er synlige med GE-skalering**. Dette er buestreng-uretting i AE-modellen, der ekvator ligger på halve ytre radius:

```
R_OUTER_KM = 31 420,55
R_EKVATOR = R_OUTER / 2 = 15 710,28
```

Dette er ikke abstrakt geometri — det er en testbar avstand. Hvis solen i flat-modell skinner over hele jorden, men ikke når lenger enn 15 710 km fra solens fotpunkt, da vil natt-grensen ved sommersolverv ligge på en bestemt avstand fra Krepsens vendekrets.

## 8. Testbare implikasjoner

Hvis rutenett-feilen er reell, så skal følgende være observerbart:

1. **Vendekrets-monumenter står stille:** 14 monumenter på 4 kontinenter dokumenterer dette (se `docs/vendekretser-vitnesbyrd-2.pdf`).
2. **Binært zenith-fenomen:** overgangen fra 1 til 2 zenith-dager skjer skarpt på +23,7° og −23,7° (se `docs/rangering-kriterier-zenith-1.pdf`).
3. **Sentrum-orientert sirkelbevegelse:** 15° per time fra et felles senter (se `docs/meridian-gull-rapport-1.pdf`).
4. **Krepsens avvik:** Aswan ved sommersolverv har 13:40 dag, ikke 12:00 som Enok 9/9 forutsetter — dette er en av de fire åpne gåtene som rutenett-feilen kan forklare.

## 9. Hva som mangler ennå

- Numerisk korreksjons-tabell: hva blir nye breddegrader for et utvalg punkter hvis vi korrigerer for rutenett-feilen?
- Simulator-knapp som viser breddegrad i "korrigert Enok-system" vs. "moderne rutenett"
- Sammenligning med Eratosthenes' opprinnelige måling (240 f.Kr., Aswan på Krepsens vendekrets)
- Test av sekulær drift: hvorfor flytter ikke vendekretsene seg slik moderne astronomi sier de skal (15 m/år)?

## 10. Kobling til Enok-tekstens "stigninger"

Enok 72 beskriver at solen "stiger gjennom porter" og "synker gjennom porter". I lys av rutenett-feilen kan dette tolkes som at:

- Solens daglige zenith-fotpunkt vandrer mellom +23,7° og −23,7°
- Hver "port" representerer en sone av denne vandringen, ikke en fast geografisk lengdegrad
- Når Enok sier "9 deler dag, 9 deler natt", forutsetter han at solen står på Krepsens vendekrets med Krepsen-zenith. Men målt fra Aswan (også på Krepsen) er dagen 13:40, ikke 12:00 — én av de fire åpne gåtene.

Den åpne hypotesen (Jone-Aase): kontinentene er forskjøvet i havområdene, ikke breddegradene per se. Dette må testes mot direkte observatorier (Aswan, Modhera, Chiayi, Ujjain — 88° lengde-spredning).
