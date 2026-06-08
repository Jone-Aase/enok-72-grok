# GE-GRID 0A/0B - låseprotokoll

Status: LÅST
Dato: 2026-06-08

## Låste fundamentpunkter

### GE-GRID-0A - eksisterende meridianer

Status: LÅST.

Eksisterende GE-meridianer/lengdegrader i edderkoppnettet er godkjent som riktig orientert og skal ikke endres i videre arbeid.

Dette betyr:

- Nord er senter for edderkoppnettet.
- Meridianene er stråler ut fra Nord.
- Lengdegrad-retningen skal ikke justeres, roteres, strekkes eller omberegnes.
- GE-gridets meridianstruktur er fasit for videre navigasjon/posisjonsarbeid.

### Greenwich / 0° / 180°

Status: LÅST.

GE-lengdegradssystemet bruker Instrumentets eksisterende Greenwich-orientering.

Dette betyr:

- Greenwich er hovedmeridian.
- 0°-linjen beholdes slik den står i Instrumentet nå.
- 180°-linjen beholdes som motsatt hovedakse slik den står i Instrumentet nå.
- Øst/vest-lengdegradene følger Instrumentets eksisterende system.
- Fremtidig fininndeling av lengdegrader skal legges inn mellom eksisterende meridianer.
- Fremtidig fininndeling får ikke rotere, flytte eller omdefinere Greenwich, 0° eller 180°.

### GE-GRID-0B - eksisterende breddegrad-ringer

Status: LÅST.

Eksisterende målte breddegrad-ringer i høyre Instrument-meny er godkjent som målt fundament.

Dette gjelder spesielt:

- Polarsirklene.
- Vendekretsene.
- De målte radius-/circumference-verdiene som vises i Instrumentets høyre målepanel.

Disse ringene skal brukes som låste referanser når neste fase deler breddegradene inn i eksakt like avstander.

## Låste polarsirkel-ankerpunkter

Status: LÅST.

Matematisk polarsirkel-breddegrad er låst til:

```text
66°33'0.00"N
```

Dette er fasitbredden for selve GE-polarsirkelringen. Eventuelle hundredels-sekunder i objektavlesninger behandles som måle-/objektpresisjon rundt samme matematiske ring, ikke som en ny breddegrad for GE-nettet.

Disse punktene er objekter i Instrumentet og er låste ankerpunkter på polarsirkelen. GE-nettet skal vise samme grader, minutter og sekunder, og senere arbeid skal bare øke presisjon rundt disse punktene - ikke flytte dem.

| Punkt | Låst breddegrad | Låst lengdegrad | Desimal breddegrad | Desimal lengdegrad |
| --- | --- | --- | ---: | ---: |
| Selsøygården | 66°33'0.01"N | 12°50'54.28"E | 66.550002778 | 12.848411111 |
| Kveitanosen | 66°33'0.00"N | 12°38'17.89"E | 66.550000000 | 12.638302778 |
| Nordskarven Hammervika | 66°33'0.02"N | 12°15'28.76"E | 66.550005556 | 12.257988889 |
| Grímsey | 66°33'0.04"N | 18°1'4.76"W | 66.550011111 | -18.017988889 |
| Arctic Circle Center | 66°33'0.02"N | 15°19'37.21"E | 66.550005556 | 15.327002778 |

Merk: Kveitanosen ble oppgitt som 66°32'60.00"N. Dette er matematisk samme punkt som 66°33'0.00"N og er normalisert slik i låseprotokollen.

Regel:

- Disse fem punktene er polarsirkel-ankre.
- GE-polarsirkelringen er matematisk låst til 66°33'0.00"N.
- De skal ikke flyttes av kartmotor, tile-rutenett, pixelflater eller senere firkantnett.
- GE-nettet skal bruke dem som kontrollpunkter for polarsirkelringen.
- Hvis visningen blir mer nøyaktig, skal den konvergere mot disse koordinatene, ikke erstatte dem.

## Neste fase

Neste arbeid skal ikke flytte GE-meridianene eller de låste referanseringene.

Neste arbeid er:

GE-GRID-0C - definere og teste eksakt lik avstandsdeling mellom breddegrad-ringer.

## Forbud uten opplåsingsnøkkel

Uten opplåsingsnøkkel er det ikke tillatt å:

- Flytte, rotere eller endre GE-meridianer.
- Endre Nord som senter for GE-edderkoppnettet.
- Endre polarsirkel-/vendekrets-ringene som referanse.
- Endre målte radius-/circumference-verdier i høyre målepanel.
- La kartmotor, Kartverket-tiles, Se Eiendom eller pixelflater bli fasit over GE-gridet.

Kartbilder kan senere legges oppå GE-gridet, men GE-gridet er fundamentet.

## Opplåsingsnøkkel

For å låse opp GE-GRID-0A/0B må bruker skrive denne nøkkelen eksplisitt:

```text
LÅS OPP GE-GRID-0A-0B: JONE BEKREFTER AT MERIDIANER OG MÅLTE BREDDEGRAD-RINGER KAN ENDRES
```

Uten denne eksakte nøkkelen skal alle agenter behandle GE-GRID-0A og GE-GRID-0B som låst.
