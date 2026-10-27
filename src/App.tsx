import { t, language, setLanguage, subscribe } from "./i18n";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Heart,
  Info,
  Layers2,
  MoveUpRight,
  PersonStanding,
  Sparkles,
} from "lucide-react";
import BodyMap from "./BodyMap";
import EmotionFace from "./EmotionFace";
import RegionExperience from "./RegionExperience";
import RegionExplorer from "./RegionExplorer";
import { emotions, findEmotion, regions } from "./emotions";
import type { Emotion, Region } from "./emotions";

type AtlasMode = "explore" | "compare" | "body";

function readLocation() {
  const p = new URLSearchParams(window.location.search);
  return {
    emotion: findEmotion(p.get("emocja")),
    comparison: findEmotion(p.get("z") ?? "sadness"),
    mode: (p.get("widok") === "cialo"
      ? "body"
      : p.has("z")
        ? "compare"
        : "explore") as AtlasMode,
    region: regions.find((r) => r.id === p.get("obszar"))?.id ?? "chest",
  };
}

export default function App() {
  useSyncExternalStore(subscribe, () => language);
  const [initial] = useState(readLocation);
  const [emotion, setEmotion] = useState(initial.emotion);
  const [other, setOther] = useState(initial.comparison);
  const [mode, setMode] = useState<AtlasMode>(initial.mode);
  const compare = mode === "compare";
  const [region, setRegion] = useState<Region>(initial.region);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [reflection, setReflection] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("emocja", emotion.id);
    if (compare) url.searchParams.set("z", other.id);
    else url.searchParams.delete("z");
    if (mode === "body") url.searchParams.set("widok", "cialo");
    else url.searchParams.delete("widok");
    url.searchParams.set("obszar", region);
    window.history.replaceState(null, "", url);
  }, [emotion, compare, other, mode, region]);
  useEffect(() => {
    function restore() {
      const state = readLocation();
      setEmotion(state.emotion);
      setOther(state.comparison);
      setMode(state.mode);
      setRegion(state.region);
    }
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timeout);
  }, [copied]);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  function showEmotion(selected: Emotion) {
    setEmotion(selected);
    setMode("explore");
    document.getElementById("atlas")?.scrollIntoView({ block: "start" });
  }
  return (
    <>
      <a className="skip-link" href="#atlas">
        {t("Przejdź do mapy emocji")}{" "}
      </a>
      <header className="header wrap">
        <a
          href={import.meta.env.BASE_URL}
          className="brand"
          aria-label={t("Soma — strona główna")}
        >
          <span className="brand-mark">s</span>
          <span>
            soma<span className="brand-dot">.</span>
          </span>
          <span className="brand-caption">{t("ATLAS EMOCJI")}</span>
        </a>
        <nav aria-label={t("Nawigacja główna")}>
          <a className="nav-current" href="#atlas">
            {t("Odkrywaj")}{" "}
          </a>
          <a href="#nauka">
            {t("Podstawy naukowe")} <ArrowUpRight size={14} />
          </a>
        </nav>
        <span className="header-note">
          <span /> {t("Bliżej siebie")}{" "}
        </span>
      </header>

      <main>
        <section className="hero wrap" aria-labelledby="title">
          <div>
            <p className="eyebrow">
              <span className="tiny-star">✳</span>{" "}
              {t("MAŁY ATLAS WEWNĘTRZNEGO ŚWIATA")}{" "}
            </p>
            <h1 id="title">
              {t("Emocje mają")} <br />
              {t("swój")} <em>{t("adres.")}</em>
            </h1>
          </div>
          <div className="hero-aside">
            <p>
              {t("Motyle w brzuchu. Ciepło w klatce piersiowej.")}{" "}
              <br className="desktop-break" />{" "}
              {t("Poznaj cielesny wymiar tego, co czujesz.")}{" "}
            </p>
            <a href="#atlas">
              {t("Zacznij od jednej emocji")} <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>

        <section
          id="atlas"
          className="atlas wrap"
          aria-label={t("Interaktywny atlas emocji")}
        >
          <div className="atlas-top">
            <div className="mode-switch" aria-label={t("Tryb mapy")}>
              <button
                aria-pressed={mode === "explore"}
                onClick={() => setMode("explore")}
              >
                <Sparkles size={15} /> {t("Odkrywaj")}{" "}
              </button>
              <button aria-pressed={compare} onClick={() => setMode("compare")}>
                <Layers2 size={15} /> {t("Porównaj emocje")}{" "}
              </button>
              <button
                aria-pressed={mode === "body"}
                onClick={() => setMode("body")}
              >
                <PersonStanding size={16} /> {t("Według części ciała")}{" "}
              </button>
            </div>
            <span className="atlas-note">
              <span /> {t("Schematy oparte na badaniach")}{" "}
            </span>
          </div>
          {mode === "body" ? (
            <RegionExplorer
              region={region}
              onRegion={setRegion}
              onEmotion={showEmotion}
              onCopy={copyLink}
              copied={copied}
              copyError={copyError}
            />
          ) : (
            <div className={`explorer ${compare ? "is-comparing" : ""}`}>
              <aside className="emotion-picker" aria-labelledby="picker-title">
                <p className="step-label">{t("01 / WYBIERZ EMOCJĘ")}</p>
                <h2 id="picker-title">{t("Co chcesz poznać?")}</h2>
                <p className="muted picker-intro">
                  {t("Każda emocja opowiada")} <br />
                  {t("inną historię w ciele.")}{" "}
                </p>
                <div className="emotion-grid">
                  {emotions.map((e) => (
                    <button
                      key={e.id}
                      className={`emotion-button ${emotion.id === e.id ? "active" : ""}`}
                      style={
                        {
                          "--emotion-color": e.color,
                          "--emotion-light": e.light,
                        } as React.CSSProperties
                      }
                      aria-pressed={emotion.id === e.id}
                      onClick={() => {
                        setEmotion(e);
                      }}
                    >
                      <EmotionFace id={e.id} />
                      <span>{t(e.name)}</span>
                      {emotion.id === e.id && (
                        <span className="selection-dot" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="picker-foot">
                  <Info size={15} />
                  <p>
                    {t("Nie ma dobrych ani złych emocji.")} <br />
                    {t("Każda jest częścią doświadczenia.")}{" "}
                  </p>
                </div>
              </aside>

              <div className="map-panel">
                <div className="map-heading">
                  <span className="step-label">{t("02 / ZOBACZ W CIELE")}</span>
                  <span className="map-view">{t("WIDOK Z PRZODU")}</span>
                </div>
                {compare ? (
                  <div className="comparison-maps">
                    <div className="comparison-item">
                      <span className="map-name">{t(emotion.name)}</span>
                      <BodyMap emotion={emotion} compact />
                    </div>
                    <span className="versus">&</span>
                    <div className="comparison-item">
                      <label className="select-label">
                        <span className="sr-only">{t("Druga emocja")}</span>
                        <select
                          aria-label={t("Druga emocja")}
                          value={other.id}
                          onChange={(e) =>
                            setOther(findEmotion(e.target.value))
                          }
                        >
                          {emotions.map((e) => (
                            <option key={e.id} value={e.id}>
                              {t(e.name)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} />
                      </label>
                      <BodyMap emotion={other} compact />
                    </div>
                  </div>
                ) : (
                  <div className="single-map">
                    <div className="map-side-label">
                      <span>
                        {t("Twoje ciało,")} <br />
                        {t("wiele odczuć.")}{" "}
                      </span>
                      <span className="fine-line" />
                    </div>
                    <BodyMap
                      emotion={emotion}
                      selected={region}
                      onRegion={setRegion}
                    />
                    <div className="map-side-label right">
                      <span className="fine-line" />
                      <span>
                        {t("Kliknij obszar,")} <br />
                        {t("aby go odkryć.")}{" "}
                      </span>
                      <MoveUpRight size={17} />
                    </div>
                  </div>
                )}
                <div className="legend" aria-label={t("Legenda mapy")}>
                  <span>
                    <i className="warm" /> {t("Wzrost odczuć")}{" "}
                  </span>
                  <span>
                    <i className="cool" /> {t("Spadek odczuć")}{" "}
                  </span>
                  <span>
                    <i className="neutral" /> {t("Bez wyróżnienia")}{" "}
                  </span>
                </div>
                <p className="map-caption">
                  {t(
                    "Odczuwana aktywność · schemat poglądowy, bez skali liczbowej",
                  )}{" "}
                </p>
              </div>

              <aside className="emotion-detail" aria-labelledby="detail-title">
                <div className="detail-top">
                  <span className="step-label">
                    {compare
                      ? t("03 / ZAUWAŻ RÓŻNICE")
                      : t("03 / PRZYJRZYJ SIĘ BLIŻEJ")}
                  </span>
                  <button
                    className="icon-button"
                    onClick={copyLink}
                    aria-label={t("Kopiuj link do tej mapy")}
                    title={t("Kopiuj link")}
                  >
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                </div>
                <div className="copy-status" role="status">
                  {copied
                    ? t("Link skopiowany")
                    : copyError
                      ? t("Skopiuj adres z paska przeglądarki.")
                      : ""}
                </div>
                <div
                  className="detail-face"
                  style={{ background: emotion.light, color: emotion.color }}
                >
                  <EmotionFace id={emotion.id} size={34} />
                </div>
                <div aria-live="polite" aria-atomic="true">
                  <p className="english-label">{emotion.english}</p>
                  <h2 id="detail-title">
                    {t(emotion.name)}
                    {compare && (
                      <span className="comparison-title">
                        {" "}
                        {t("i")} {t(other.name).toLocaleLowerCase(language)}
                      </span>
                    )}
                  </h2>
                  <p className="detail-word">{t(emotion.word)}</p>
                  <p className="detail-description">
                    {t(emotion.description).replace(" [1]", "")}{" "}
                    <a
                      className="citation"
                      href="#source-1"
                      aria-label={t("Źródło: Bodily maps of emotions")}
                    >
                      [1]
                    </a>
                  </p>
                </div>
                {compare ? (
                  <div className="comparison-details">
                    <p className="small-label">{t("JAK CZYTAĆ PORÓWNANIE")}</p>
                    {emotion.id === other.id ? (
                      <p className="muted">
                        {t(
                          "To ta sama emocja. Wybierz inną nad prawą sylwetką, aby zestawić dwa schematy.",
                        )}{" "}
                      </p>
                    ) : (
                      <>
                        <p className="comparison-description">
                          {t(other.description).replace(" [1]", "")}{" "}
                          <a className="citation" href="#source-1">
                            [1]
                          </a>
                        </p>
                        <div className="region-comparison">
                          <div className="comparison-row table-head">
                            <span>{t("Obszar")}</span>
                            <span>{t(emotion.name)}</span>
                            <span>{t(other.name)}</span>
                          </div>
                          {regions.map((r) => (
                            <div className="comparison-row" key={r.id}>
                              <span>{t(r.name)}</span>
                              {[emotion, other].map((e, i) => (
                                <span
                                  key={i}
                                  className={`sensation ${e.regions[r.id] ?? "none"}`}
                                  aria-label={`${t(r.name)}, ${t(e.name)}: ${e.regions[r.id] === "more" ? t("wzrost odczuć") : e.regions[r.id] === "less" ? t("spadek odczuć") : t("bez wyróżnienia")}`}
                                >
                                  {e.regions[r.id] === "more"
                                    ? "↑"
                                    : e.regions[r.id] === "less"
                                      ? "↓"
                                      : "—"}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <details className="comparison-examples">
                      <summary>
                        {t("Przykłady odczuć w tym samym obszarze")}{" "}
                        <ChevronDown size={14} />
                      </summary>
                      <label className="example-area-select">
                        {t("Obszar ciała")}{" "}
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value as Region)}
                        >
                          {regions.map((r) => (
                            <option key={r.id} value={r.id}>
                              {t(r.name)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div aria-live="polite">
                        <h3>{t(emotion.name)}</h3>
                        <RegionExperience emotion={emotion} region={region} />
                        {emotion.id !== other.id && (
                          <>
                            <h3>{t(other.name)}</h3>
                            <RegionExperience emotion={other} region={region} />
                          </>
                        )}
                      </div>
                      <p className="examples-note">
                        {t("To propozycje opisu, nie wyniki pomiaru.")}{" "}
                        <a href="#source-3">
                          {t("O przykładach i ich źródłach")}
                        </a>
                      </p>
                    </details>
                  </div>
                ) : (
                  <div className="regions-detail">
                    <p className="small-label">{t("ODKRYWAJ OBSZARY CIAŁA")}</p>
                    <div className="region-chips">
                      {regions.map((r) => (
                        <button
                          key={r.id}
                          aria-pressed={region === r.id}
                          onClick={() => setRegion(r.id)}
                        >
                          <i className={emotion.regions[r.id] ?? "none"} />
                          {t(r.name)}
                        </button>
                      ))}
                    </div>
                    <div aria-live="polite">
                      <RegionExperience emotion={emotion} region={region} />
                    </div>
                    <p className="examples-note">
                      {t(
                        "To propozycje opisu, nie wyniki pomiaru. Możesz czuć coś innego albo nic wyraźnego.",
                      )}{" "}
                      <a href="#source-3">
                        {t("O przykładach i ich źródłach")}
                      </a>
                    </p>
                  </div>
                )}
                <a href="#nauka" className="detail-source">
                  <BookOpen size={15} /> {t("Skąd to wiemy?")}{" "}
                  <ArrowUpRight size={15} />
                </a>
              </aside>
            </div>
          )}
          <div className="atlas-bottom">
            <Info size={16} />
            <p>
              {t(
                "To zaproszenie do uważności, nie wzorzec do spełnienia. Twoje odczucia mogą być inne.",
              )}{" "}
              <a href="#metoda">{t("Jak powstały mapy?")}</a>
            </p>
            <span>01 — {String(emotions.length).padStart(2, "0")}</span>
          </div>
        </section>

        <section className="reflection wrap" aria-labelledby="reflection-title">
          <div className="reflection-symbol" aria-hidden="true">
            <Heart size={25} strokeWidth={1.2} />
          </div>
          <div>
            <p className="eyebrow">{t("CHWILA DLA CIEBIE")}</p>
            <h2 id="reflection-title">{t("A jak jest u Ciebie?")}</h2>
            <p>
              {t(
                "Mapa jest punktem wyjścia. Najciekawsze jest Twoje własne doświadczenie.",
              )}{" "}
            </p>
          </div>
          <button
            className="reflection-toggle"
            aria-expanded={reflection}
            aria-controls="reflection-content"
            onClick={() => setReflection(!reflection)}
          >
            {reflection ? t("Zwiń wskazówkę") : t("Zatrzymaj się na chwilę")}
            <ArrowDownRight size={18} />
          </button>
          {reflection && (
            <div id="reflection-content" className="reflection-content">
              <span className="reflection-number">{t("30 sek.")}</span>
              <div>
                <h3>{t(emotion.prompt)}</h3>
                <p>
                  {t(
                    "Możesz zostać z otwartymi oczami. Zauważ jedno odczucie — lub jego brak. Nie musisz niczego zmieniać ani dopasowywać do mapy. Jeśli to nieprzyjemne, przerwij i rozejrzyj się wokół.",
                  )}{" "}
                </p>
              </div>
            </div>
          )}
        </section>

        <section
          id="nauka"
          className="science wrap"
          aria-labelledby="science-title"
        >
          <div className="science-heading">
            <div>
              <p className="eyebrow">{t("CIEKAWOŚĆ POPARTA BADANIAMI")}</p>
              <h2 id="science-title">
                {t("Mniej domysłów.")} <br />
                <em>{t("Więcej nauki.")}</em>
              </h2>
            </div>
            <p>
              {t("Jak badać coś tak osobistego jak odczuwanie?")} <br />
              {t("Zacząć od zapytania ludzi o ich doświadczenia.")}{" "}
            </p>
          </div>
          <div className="source-grid">
            <article id="source-1" className="source-card">
              <div className="source-meta">
                <span>{t("01 / BADANIE ŹRÓDŁOWE")}</span>
                <span>PNAS · 2014</span>
              </div>
              <h3>Bodily maps of emotions</h3>
              <p className="source-authors">
                L. Nummenmaa, E. Glerean, R. Hari, J. K. Hietanen
              </p>
              <p>
                {t(
                  "W pięciu eksperymentach 701 uczestników zaznaczało na sylwetkach wzrost i spadek odczuwanej aktywności. Powstały różniące się mapy emocji.",
                )}{" "}
              </p>
              <a
                href="https://doi.org/10.1073/pnas.1321664111"
                target="_blank"
                rel="noreferrer"
              >
                {t("Przeczytaj publikację")} <ArrowUpRight size={17} />
              </a>
            </article>
            <article className="source-card">
              <div className="source-meta">
                <span>{t("02 / SZERSZA PERSPEKTYWA")}</span>
                <span>PNAS · 2018</span>
              </div>
              <h3>Maps of subjective feelings</h3>
              <p className="source-authors">
                L. Nummenmaa, R. Hari, J. K. Hietanen, E. Glerean
              </p>
              <p>
                {t(
                  "1026 osób wzięło udział w badaniu 100 subiektywnych stanów. Wyniki wskazują na związek doświadczeń psychicznych z odczuciami w ciele — także poza samymi emocjami.",
                )}{" "}
              </p>
              <a
                href="https://doi.org/10.1073/pnas.1807390115"
                target="_blank"
                rel="noreferrer"
              >
                {t("Przeczytaj publikację")} <ArrowUpRight size={17} />
              </a>
            </article>
          </div>
          <section
            id="source-3"
            className="examples-sources"
            aria-labelledby="examples-source-title"
          >
            <p className="eyebrow">
              {t("03 / OD MAPY DO WŁASNEGO DOŚWIADCZENIA")}
            </p>
            <h3 id="examples-source-title">
              {t("Jak rozumieć przykłady odczuć?")}
            </h3>
            <p>
              {t(
                "Mapa z badania pokazuje lokalizację odczuwanej zmiany, nie określa jej dokładnej postaci. Przykłady w Somie są autorskimi propozycjami słów do autorefleksji. Nie wywnioskowano ich z koloru sylwetki i nie są listą doznań, które muszą towarzyszyć danej emocji.",
              )}{" "}
            </p>
            <p>
              {t(
                "Dodatkowego kontekstu dla opisów napięcia, bicia serca, odczuć w brzuchu i rumieńca dostarczają materiały NHS:",
              )}{" "}
            </p>
            <div className="examples-source-links">
              <a
                href="https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anger/"
                target="_blank"
                rel="noreferrer"
              >
                {t("Złość: napięcie, zaciskanie dłoni, ciepło")}{" "}
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://www.nhsinform.scot/illnesses-and-conditions/mental-health/mental-health-self-help-guides/anxiety-self-help-guide"
                target="_blank"
                rel="noreferrer"
              >
                {t("Niepokój: oddech, serce i brzuch")}{" "}
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://www.nhs.uk/symptoms/blushing/"
                target="_blank"
                rel="noreferrer"
              >
                {t("Rumieniec przy zakłopotaniu")} <ArrowUpRight size={14} />
              </a>
            </div>
          </section>
          <details id="metoda" className="method">
            <summary>
              <span>
                <Info size={17} />{" "}
                {t("Jak powstały te mapy i jakie mają ograniczenia?")}{" "}
              </span>
              <ChevronDown size={18} />
            </summary>
            <div className="method-content">
              <p>
                {t(
                  "Sylwetki w Somie to autorskie, jakościowe schematy inspirowane ryciną 2 pracy z 2014 roku. Rozmieszczenie poświaty i podział na sześć obszarów są uproszczeniem redakcyjnym. Nie odtworzono danych liczbowych, granic istotności ani oryginalnej skali statystycznej. Kolory wskazują jedynie kierunek odczuwanej zmiany.",
                )}{" "}
              </p>
              <p>
                {t(
                  "Badania opierają się na samoopisie. Mapy nie są pomiarami temperatury, pracy narządów ani aktywności mózgu. Uśrednione wzorce nie opisują każdej osoby; kontekst i indywidualne doświadczenia mają znaczenie. Na podstawie miejsca odczucia nie można ustalić emocji ani postawić diagnozy.",
                )}{" "}
              </p>
              <p>
                {t(
                  "Soma służy edukacji i autorefleksji. Wskazówki do obserwacji są autorskimi pytaniami, a przykłady odczuć — propozycjami języka opisu, nie odtworzeniem wyników badania ani procedurą terapeutyczną.",
                )}{" "}
                <a
                  href="https://emotion.utu.fi/maps-of-subjective-feelings/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Poznaj materiały zespołu badawczego")}{" "}
                  <ArrowUpRight size={13} />
                </a>
              </p>
            </div>
          </details>
        </section>
      </main>
      <footer className="footer wrap">
        <a href={import.meta.env.BASE_URL} className="brand footer-brand">
          soma<span className="brand-dot">.</span>
        </a>
        <p>{t("Trochę nauki. Trochę uważności. Bliżej siebie.")}</p>
        <div
          className="language-switch"
          role="group"
          aria-label="Language / Język"
        >
          <button
            type="button"
            lang="en"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            lang="pl"
            aria-pressed={language === "pl"}
            onClick={() => setLanguage("pl")}
          >
            Polski
          </button>
        </div>
        <a
          href="https://github.com/adam-zielonka/soma"
          target="_blank"
          rel="noreferrer"
        >
          {t("Otwarty kod")} <ArrowRight size={15} />
        </a>
      </footer>
    </>
  );
}
