# Soma — atlas emocji w ciele

Polska aplikacja edukacyjna o cielesnym wymiarze emocji.

**[Otwórz aplikację](https://adam-zielonka.github.io/soma/)**

- Dwanaście emocji i interaktywna sylwetka z sześcioma obszarami ciała.
- Widok „Według części ciała”: wybór obszaru, lista powiązanych emocji z podziałem na wzrost i spadek odczuć oraz przykładowe opisy. Link zachowuje widok i obszar.
- Przykłady odczuć dla konkretnych obszarów: np. ciepło twarzy, napięcie dłoni lub ciężkość nóg.
- Porównanie dwóch map, tekstowe zestawienie zmian oraz przykłady dla tego samego obszaru.
- Linki zachowujące wybraną emocję i tryb porównania.
- Obsługa dotyku i klawiatury, responsywny układ, ograniczone animacje.
- Publikacje naukowe oraz widoczne wyjaśnienie ograniczeń map.
- Bez kont, analityki, bazy danych i zapisu osobistych odczuć. Fonty są hostowane wraz z aplikacją.

## Rozwój

Node.js 24 i pnpm 12.15.0.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

```sh
pnpm check    # TypeScript, build, testy Playwright
pnpm preview # lokalny podgląd wersji produkcyjnej
```

W CI Chromium jest instalowany z zależnościami systemowymi. Testy obejmują komputer i telefon, zmianę emocji, klikalne obszary, klawiaturę, porównania, odnośniki i szerokości 320–1440 px.

## Podstawa naukowa

1. Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014). _Bodily maps of emotions_. PNAS, 111(2), 646–651. [DOI](https://doi.org/10.1073/pnas.1321664111).
2. Nummenmaa, L., Hari, R., Hietanen, J. K., & Glerean, E. (2018). _Maps of subjective feelings_. PNAS, 115(37), 9198–9203. [DOI](https://doi.org/10.1073/pnas.1807390115).
3. [NHS — złość](https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anger/), [NHS inform — niepokój](https://www.nhsinform.scot/illnesses-and-conditions/mental-health/mental-health-self-help-guides/anxiety-self-help-guide), [NHS — rumieniec](https://www.nhs.uk/symptoms/blushing/).
4. [Materiały zespołu badawczego](https://emotion.utu.fi/maps-of-subjective-feelings/).

Mapy SVG i przypisania kategorii w `src/emotions.ts` stanowią uproszczoną interpretację jakościową ryciny 2 badania z 2014 r. Kształty poświaty, podział na sześć obszarów, pytania do autorefleksji i przykładowy słownik odczuć są autorskimi elementami aplikacji. Opisy konkretnych doznań nie są wynikami badania map; wybrane przykłady uzupełniają materiały NHS. Dla niewyróżnionych obszarów wyświetlany jest ogólny słownik, bez przypisywania go do danej emocji. Nie odtworzono oryginalnych map statystycznych. Kolory oznaczają kierunek odczuwanej zmiany, bez skali intensywności. Badania dotyczą samoopisu, nie bezpośrednich pomiarów fizjologicznych. Aplikacja nie jest narzędziem diagnostycznym ani terapeutycznym.

## Wdrożenie

Push do `main` uruchamia `.github/workflows/deploy.yml`: instalację, kompilację i testy, a następnie GitHub Pages. Źródło Pages w ustawieniach repozytorium: **GitHub Actions**. Ścieżka bazowa Vite: `/soma/`.

Kod: MIT. Fonty Instrument Serif i DM Sans: SIL Open Font License, zob. `public/licenses/`.
