# Czytelność kierunku odczuwanej aktywności — 2026-10-29 UTC

Źródła aplikacji: [`7297d1de5a949d1532cad551ada582346ed15dbd`](https://github.com/adam-zielonka/soma/commit/7297d1de5a949d1532cad551ada582346ed15dbd), pakiet `1.0.0`.
Dowody wykonania [zadania #26](https://github.com/adam-zielonka/server-knowledge/issues/26).

Zrzuty przedstawiają istniejące jakościowe dane atlasu, bez osobistych danych.
Wykonano je lokalnie z produkcyjnego buildu Vite w Chromium `156.0.8078.4`,
z lokalnymi fontami, językiem PL, `deviceScaleFactor=1` i `reducedMotion=reduce`.
Desktop: viewport 1280×1000; telefon: 390×844 z `isMobile` i `hasTouch`.
Zrzut całego `#atlas` może być wyższy od viewportu, aby pokazać mapę i tabelę.
Istnieje jeden jasny motyw. Każda para przedstawia ten sam stan i układ:
kolor oraz filtr `html { filter: grayscale(1) }`. To symulacja przeglądarki,
nie test fizycznego panelu monochromatycznego ani pełny audyt WCAG.

| Widok | Desktop — kolor / grayscale | Telefon — kolor / grayscale |
| --- | --- | --- |
| Eksploracja Smutku, Nogi | [kolor](desktop-explore-color.png) / [grayscale](desktop-explore-grayscale.png) | [kolor](phone-explore-color.png) / [grayscale](phone-explore-grayscale.png) |
| Smutek / Radość | [kolor](desktop-compare-color.png) / [grayscale](desktop-compare-grayscale.png) | [kolor](phone-compare-color.png) / [grayscale](phone-compare-grayscale.png) |
| Smutek / Smutek | [kolor](desktop-same-color.png) / [grayscale](desktop-same-grayscale.png) | [kolor](phone-same-color.png) / [grayscale](phone-same-grayscale.png) |

Sprawdzono zgodność mapy, legendy i tekstowej tabeli sześciu regionów:
Smutek: głowa/klatka piersiowa ↑, ręce/nogi ↓, gardło/brzuch —.
Porównanie z Radością i z tą samą emocją zachowuje dwie kolumny tabeli.
Bez wyróżnienia nie oznacza braku odczuć. Dane `emotions.ts`, ich interpretacja
naukowa, neutralna sylwetka wyboru części ciała i przykłady po wyborze nie zostały zmienione.

`pnpm check` przeszedł: TypeScript/build i 28/28 testów Playwright (desktop/mobile),
w tym axe, szerokości 320–1440 px, zgodność stanów i PL/EN.
Dodatkowo sześć powyższych scenariuszy renderu: Enter/Space na desktopie,
dotknięcie gardła na telefonie, przełączenie PL/EN bez zmiany URL,
neutralny wybór części ciała, brak JS errors i poziomego przepełnienia.
Najmniejszy symbol mapy w porównaniu na telefonie: 15,4 CSS px.

Kontrast policzono z rzeczywistych `getComputedStyle` kolorów/fill i nieprzezroczystych
teł przodków (plakietki SVG mają własne pełne tło), liniaryzacja sRGB i luminancja
WCAG. Dla CSS grayscale przeliczono sRGB wagami 0,2126 / 0,7152 / 0,0722 przed liniaryzacją.
Minimum z sześciu scenariuszy:

| Element | Kolor | CSS grayscale |
| --- | ---: | ---: |
| Znak mapy do tła plakietki | 11,36:1 | 11,55:1 |
| Tekst tabeli | 10,79:1 | 10,90:1 |
| Notatka tabeli | 6,86:1 | 6,90:1 |
| Tekst legendy | 4,91:1 | 4,93:1 |

Publiczne wdrożenie i jego dokładny końcowy SHA/run są rozliczane oddzielnie
w komentarzach zadania; sam zrzut lokalnego buildu ich nie potwierdza.
