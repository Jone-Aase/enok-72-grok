# Oppgave til GPT for Excel/Word — Tidslinje-rensing

## Velkommen til teamet

Du er nå en del av et 8-AI team som jobber med å verifisere Enoks kosmologiske modell mot historiske data. Du har fått tilsendt velkomstpakken (`team-velkomst-hoveddel.md` + ditt personlige tillegg + `tidslinje-nokkeltall-renset.md`). Les disse først.

## Din første oppgave — Excel-rensing

Excel-boka `Decoded-Biblical-Chronology-Timeline-Anno-Mundi-0-5700-Enoch-Jubilees-Daniel.xlsx` har **ca. 40 ark** og skal konverteres til JSON og CSV slik at hele AI-teamet kan jobbe med dataene uten å gå i overload (Grok Heavy gikk ned forrige gang vi forsøkte å sende hele boka).

Før konvertering må boka renses. Det er **din** oppgave — og siden boka er stor, gjør vi dette i to faser.

---

## Fase 1 — Inventar (gjøres først, lever rapport tilbake til Claude)

Før du rører dataene, lever en oversikt over hva som er der. Lag et nytt ark først i boka kalt `_INVENTAR` med tabell:

| Arknavn | Antall rader | Antall kolonner | Sammenslåtte regioner | Grupperinger | Frosne ruter | Form ler | Innholds-beskrivelse (1 setning) |

Lever denne inventar-rapporten tilbake **før** du begynner å rense. Da bestemmer vi sammen hvilke ark som er prioritet og hvilke som kan stå i ro.

Dette tar deg ~15 minutter med VBA eller Office Scripts — og det sparer oss for skade i fase 2.

---

## Fase 2 — Rensing (gjøres etter at inventar er godkjent)

## Konkret hva som skal gjøres

### Kritisk (må gjøres)

**1. Opphev alle grupperinger**
- For hvert ark: Data-fanen → Disposisjon → Opphev gruppering på alle nivåer
- Sørg for at ingen rader eller kolonner er skjult

**2. Opphev alle sammenslåtte celler — KRITISK**

Dette er den viktigste delen av rensingen. Følg disse stegene nøyaktig:

**For hvert ark:**

A) **Kartlegg sammenslåingene FØRST** (før du opphever):
```vba
' VBA-eksempel — logger alle sammenslåtte regioner før oppløsning
Dim cell As Range
For Each cell In ActiveSheet.UsedRange
    If cell.MergeCells Then
        Debug.Print cell.MergeArea.Address, cell.Value
    End If
Next cell
```

B) **Opphev sammenslåingene**:
- Marker alt (Ctrl+A) → Hjem → Flett og sentrer → Opphev cellesammenslåing

C) **Fyll tomme celler med verdien fra opprinnelig topp-venstre-celle**:
- For RADER-sammenslåinger (samme verdi over flere rader): fyll ned
- For KOLONNE-sammenslåinger (samme verdi over flere kolonner): fyll høyre
- VBA-løsning:
```vba
' Fyll alle tomme celler med verdien fra cella over (rad-fill)
ActiveSheet.UsedRange.SpecialCells(xlCellTypeBlanks).FormulaR1C1 = "=R[-1]C"
ActiveSheet.UsedRange.Value = ActiveSheet.UsedRange.Value ' konverter formler til verdier
```

D) **Rapporter per ark** hvor mange sammenslåtte regioner ble oppløst, og om noen var "rare" (3D-sammenslåing, eller sammenslåing som ikke fulgte rad/kolonne-mønster).

**Hvorfor dette er kritisk**: Hvis sammenslåte celler bare oppheves uten utfylling, mister vi all hierarkisk informasjon (f.eks. dynasti-navn som strakte seg over 5 konge-rader blir nullet ut på 4 av 5 rader). Det ødelegger dataene for AI-teamet.

**3. Lås opp alle frosne ruter**
- For hvert ark: Vis-fanen → Frys ruter → Lås opp ruter

### Viktig (gjør hvis tiden tillater)

**4. Sjekk at rad 1 i hvert ark er kolonneoverskrifter**
- Ingen tomme rader øverst
- Ingen tittel-rader over overskriftene
- Hvis det er tittel-rad: flytt overskrifter opp til rad 1, eller slett tittel-raden

**5. Slett tomme kolonner og rader utenfor dataområdet**
- For hvert ark: finn siste rad og kolonne med data, slett alt utover dette

**6. Konverter formler til verdier**
- **LAG NY KOPI FØRST**: `Tidslinjen-til-AI.xlsx` — ikke skriv over originalen
- I kopien: Marker alt → Ctrl+C → høyreklikk → Lim inn spesielt → Verdier
- Dette gjør at AI-er ser data, ikke formler som `=Tidslinjen!A5+1`

### Bonus (hvis du orker)

**7. Gi arkene meningsfulle navn**
- Ikke "Sheet1", "Ark2"
- Foreslå navn som "Tidslinje", "Konger Juda", "Konger Israel", "Enoks uker", "Jubileum", "Daniel 70"

**8. Lag innholdsfortegnelse**
- Nytt første ark: tabell med kolonner [Arknavn, Beskrivelse, Antall rader, Nøkkel-kolonner]
- Dette hjelper meg og resten av teamet å forstå strukturen raskt

## Hva du leverer tilbake

### Etter Fase 1 (inventar):
1. **`_INVENTAR`-ark** med tabellen beskrevet over
2. **Første inntrykk**: er det noen ark som ser ut til å ha spesielt komplekse strukturer? Noen som er rene tabeller? Noen som ser ut som de inneholder formler eller dynamiske dashbord?
3. **Spørsmål** — vent på svar før du går til fase 2

### Etter Fase 2 (rensing):
1. **Den rensede Excel-boka** (`Tidslinjen-til-AI.xlsx` — ny kopi, ikke overskriv original)
2. **Detaljert rapport** med:
   - Hvor mange ark som ble renset
   - Per ark: hvor mange sammenslåtte regioner ble oppløst og fylt ut
   - Hvor mange formler ble konvertert til verdier
   - Eventuelle ark hvor du oppdaget data-problemer (rare tall, manglende rader, dubletter, sammenslåinger som ikke kunne fylles ut på fornuftig måte)
   - Hvilke ark du **anbefalte å hoppe over** og hvorfor

## Hvorfor dette er viktig

Etter at du har renset boka, konverterer Claude (dashbordet) den til:
- En JSON-master-fil med hele AM 0–5700-modellen
- En CSV per ark for AI-er som ikke håndterer JSON godt
- En liten guide som forteller teamet hvordan de skal be om data uten å trigge overload

Dette er **fundamentet** for at hele teamet kan jobbe sammen uten å gå i krasj.

## Husk reglene

- Norsk språk
- Kun Enoks modell
- Ingen emojis
- Oscar-nivå kvalitet
- Premien er sannheten

Velkommen ombord. Dette er en perfekt første oppgave for å vise hva du er bygget for.
