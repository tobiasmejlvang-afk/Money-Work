# Min Økonomi & Arbejde

En mørk, responsiv PWA til privat økonomi og arbejdsregistrering. Appen virker i en almindelig browser på Windows og Samsung/Android-tablet og kan installeres som en app, når den ligger på en webadresse.

## Funktioner

- Alle ønskede sider under **Økonomi** og **Arbejde**
- Opret, rediger og slet alle registreringer
- Automatisk beregning af arbejdstimer, overarbejde og samlet antal tømninger
- Kalender med arbejdsdage, lønningsdage, fravær, fridage og ferie
- Diagrammer og månedsfiltre
- Eksport af arbejdsregistrering som CSV
- Eksport/import af komplet sikkerhedskopi som JSON
- Lokal autosave i browseren
- PWA/offline-understøttelse

## Hurtig test på Windows

1. Pak ZIP-filen ud.
2. Dobbeltklik på `START_APP.bat`.
3. Appen åbner på `http://localhost:8080`.

Har computeren ikke Python installeret, kan `index.html` åbnes direkte. Appen virker stadig, men PWA-installation og offline-cache kræver en webserver.

## Brug på både Windows og Samsung tablet

Den nemmeste løsning er at udgive mappen gratis på Netlify:

1. Gå til Netlify Drop på computeren.
2. Træk hele den udpakkede mappe ind på siden.
3. Netlify giver dig en webadresse.
4. Åbn adressen i Edge/Chrome på Windows og vælg **Installer app**.
5. Åbn samme adresse i Chrome på Samsung-tabletten og vælg **Føj til startskærm / Installer app**.

## Vigtigt om data mellem enheder

Data gemmes lokalt på den enkelte enhed. Brug **Indstillinger → Eksporter alle data** og **Importer sikkerhedskopi** for at flytte data mellem enheder. Automatisk cloud-synkronisering kræver en database og brugerlogin, som ikke er koblet på denne version.
