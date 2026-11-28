# Soma — atlas emocji w ciele

Aplikacja edukacyjna o cielesnym wymiarze emocji, dostępna po polsku i angielsku.

**[Otwórz aplikację](https://adam-zielonka.github.io/soma/)**

- Dwanaście map emocji z ryciny 2 badania Nummenmaa i in. (2014), w kolejności ryciny: sześć emocji podstawowych i sześć złożonych.
- Cztery mapy „z nowszych badań” tą samą metodą wzrostu i spadku: nadzieja (Vik i in., 2026) oraz rozbawienie, zainteresowanie i współczucie (Zhang i in., 2025).
- Pięć map „innych uczuć” z badania Nummenmaa i in. (2018): wdzięczność, tęsknota, rozpacz, podenerwowanie i wrogość. To badanie rejestrowało tylko, gdzie uczucie jest odczuwane, więc te mapy mają osobną, złotą poświatę i legendę bez wzrostu i spadku.
- Miniatury map służą jako wybór emocji.
- Pod każdą mapą krótki opis z przypisem, a obok widoczna lista sześciu obszarów ciała (tekstowy odpowiednik mapy) z kierunkiem zmiany, autorskimi słowami opisu i tym, co o danym obszarze piszą autorzy badania.
- Widok „Obszary ciała”: dla wybranego obszaru emocje pogrupowane na wzrost, spadek i brak wyróżnienia, z miniaturami map; inne uczucia wymienione osobno.
- Zawsze widoczna sekcja „O badaniu i ograniczeniach map” z numerowanymi źródłami.
- Linki zachowują emocję, widok i obszar; linki z wcześniejszych wersji, także do usuniętego porównania, nadal się otwierają.
- Obsługa dotyku i klawiatury, responsywny układ od 320 px, ograniczone animacje, wzrost i spadek rozróżnione nie tylko kolorem (kreskowanie, strzałki, tekst).
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

W CI Chromium jest instalowany z zależnościami systemowymi. Testy obejmują komputer i telefon, wybór emocji i obszarów (sylwetka, lista, klawiatura), widok obszarów, linki, cytowania, axe (WCAG 2.2 AA), szerokości 320–1440 px, kompletność tłumaczeń bez nieużywanych kluczy oraz spójność danych (przykłady tylko dla wyróżnionych obszarów).

## Podstawa naukowa

1. Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014). _Bodily maps of emotions_. PNAS, 111(2), 646–651. [DOI](https://doi.org/10.1073/pnas.1321664111).
2. Nummenmaa, L., Hari, R., Hietanen, J. K., & Glerean, E. (2018). _Maps of subjective feelings_. PNAS, 115(37), 9198–9203. [DOI](https://doi.org/10.1073/pnas.1807390115).
3. Vik, A., Galvez-Pol, A., Park, S., & Tsakiris, M. (2026). _Politics embodied: How politics shapes and is shaped by the bodily experience of emotions_. PNAS, 123(20), e2534895123. [DOI](https://doi.org/10.1073/pnas.2534895123).
4. Zhang, Z., Zerwas, F. K., & Keltner, D. (2025). _Emotion specificity, coherence, and cultural variation in conceptualizations of positive emotions_. Cognition and Emotion, 39(5), 1127–1140. [DOI](https://doi.org/10.1080/02699931.2024.2430400).
5. Zhong, S., Tang, X., Cheng, X., & Pan, Y. (2026). _Bodily maps of subject-specific feelings and academic emotions among high school students_. BMC Psychology, 14, 499. [DOI](https://doi.org/10.1186/s40359-026-04283-1).
6. Volynets, S., Glerean, E., Hietanen, J. K., Hari, R., & Nummenmaa, L. (2020). _Bodily maps of emotions are culturally universal_. Emotion, 20(7), 1127–1136. [DOI](https://doi.org/10.1037/emo0000624).
7. Herman, A. M., Zaremba, D., Kossowski, B., & Marchewka, A. (2022). _The utility of the emBODY tool as a novel method of studying complex phenomena-related emotions_. Scientific Reports, 12, 19884. [DOI](https://doi.org/10.1038/s41598-022-23734-4).
8. [NHS — złość](https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anger/), [NHS inform — lęk](https://www.nhsinform.scot/illnesses-and-conditions/mental-health/mental-health-self-help-guides/anxiety-self-help-guide), [NHS — rumieniec](https://www.nhs.uk/symptoms/blushing/).
9. [Materiały zespołu badawczego](https://emotion.utu.fi/maps-of-subjective-feelings/).

Sylwetka i poświaty to autorskie ilustracje SVG. Przypisania w `src/emotions.ts` są jakościowym odczytem ryciny 2: obszar oznaczono jako wzrost lub spadek tylko wtedy, gdy ciepły lub chłodny kolor wyraźnie w nim przeważa; słabe lub częściowe zabarwienie pozostaje bez wyróżnienia. Odczyt sprawdzono 2026-11-27 dwoma niezależnymi odczytami ryciny. Soma pokazuje 12 z 14 map (bez stanu neutralnego i depresji). W oryginale jasność koloru to statystyka t (siła i zgodność zaznaczeń w grupie), nie natężenie odczucia — aplikacja pokazuje tylko kierunek zmiany.

Nowe mapy (odczyt 2026-11-28, dwóch niezależnych czytelników na każde źródło, rozbieżności rozstrzygał trzeci):

- Nadzieja: rycina 1A z Vik i in. (2026), mapa bez kontekstu politycznego (992 dorosłych z USA). Podobny układ, z dodatkowym wzrostem w rękach, ma mapa nadziei w Zhong i in. (2026).
- Rozbawienie, zainteresowanie, współczucie: rycina 2 z Zhang i in. (2025), trzy grupy studentów z USA (72, 79 i 57 osób). Obszar oznaczono, gdy był wyraźny w co najmniej dwóch grupach; pokazano tylko emocje, których obszar był wyraźny we wszystkich trzech. Autorzy raportują dużą zgodność map między grupami dla wszystkich emocji, ale zachwyt, triumf i pożądanie nie miały obszaru wyraźnego we wszystkich trzech (mapy najmniejszej, latynoskiej grupy były słabe); zadowolenie i ulga dały niemal puste mapy.
- Inne uczucia: rycina 3 i jej wersja w wysokiej rozdzielczości z suplementu Nummenmaa i in. (2018). Uczestnicy zaznaczali tylko, gdzie czują stan; „odczuwane” oznacza obszar, w którym wyraźnie przeważa jasny kolor (wielkość efektu około 0,5 lub więcej). Mapy m.in. poczucia winy, samotności, rozczarowania i odrzucenia nie przekroczyły tego progu; bliskość, przynależność i tęsknota za bliskością powtarzają wzór klatki piersiowej.

Replikacje opisane na stronie: Volynets i in. (2020), 3954 osoby ze 101 krajów; Herman i in. (2022), 548 osób mieszkających w Polsce, zadanie po polsku.

Notatki o obszarach (`src/research.ts`) streszczają dyskusję pracy z 2014 r. Przykładowe zdania (`src/sensationExamples.ts`) są autorskie; tam, gdzie strona NHS wymienia podobny objaw (złość, lęk, rumieniec), aplikacja podaje przypis. Nazwy emocji są tłumaczeniem angielskich nazw z badania (Anxiety — „Lęk”, Envy — „Zazdrość”). Badania dotyczą samoopisu, nie pomiarów fizjologicznych. Aplikacja nie jest narzędziem diagnostycznym ani terapeutycznym.

## Wdrożenie

Push do `main` uruchamia `.github/workflows/deploy.yml`: instalację, kompilację i testy, a następnie GitHub Pages. Źródło Pages w ustawieniach repozytorium: **GitHub Actions**. Ścieżka bazowa Vite: `/soma/`.

Kod: MIT. Fonty Bricolage Grotesque i DM Sans: SIL Open Font License, zob. `public/licenses/`.


## Language / Język

The browser version supports Polish and English. On the first visit it uses the
first supported language from the browser’s preferences, falling back to English.
The discreet English / Polski links in the footer save an explicit choice
in this application’s local storage.
Switching language preserves the current map, view and body area. If storage is blocked, language switching
still works for the current visit.
