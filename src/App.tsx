import { t, language, setLanguage, subscribe } from "./i18n";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Info,
  Layers2,
  PersonStanding,
  Sparkles,
} from "lucide-react";
import BodyMap from "./BodyMap";
import { ActivityTable } from "./Activity";
import EmotionFace from "./EmotionFace";
import RegionExperience from "./RegionExperience";
import RegionExplorer from "./RegionExplorer";
import { emotions, findEmotion, regions } from "./emotions";
import type { Emotion, Region } from "./emotions";

type AtlasMode = "explore" | "compare" | "body";

function readLocation() {
  const p = new URLSearchParams(window.location.search);
  const selectedRegion = regions.find((r) => r.id === p.get("obszar"));
  return {
    regionOpen: !!selectedRegion,
    emotion: findEmotion(p.get("emocja")),
    comparison: findEmotion(p.get("z") ?? "sadness"),
    mode: (p.get("widok") === "cialo"
      ? "body"
      : p.has("z")
        ? "compare"
        : "explore") as AtlasMode,
    region: selectedRegion?.id ?? "chest",
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
  const [regionOpen, setRegionOpen] = useState(initial.regionOpen);
  const [reflection, setReflection] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("emocja", emotion.id);
    if (compare) url.searchParams.set("z", other.id);
    else url.searchParams.delete("z");
    if (mode === "body") url.searchParams.set("widok", "cialo");
    else url.searchParams.delete("widok");
    if (mode !== "explore" || regionOpen)
      url.searchParams.set("obszar", region);
    else url.searchParams.delete("obszar");
    window.history.replaceState(null, "", url);
  }, [emotion, compare, other, mode, region, regionOpen]);
  useEffect(() => {
    function restore() {
      const state = readLocation();
      setEmotion(state.emotion);
      setOther(state.comparison);
      setMode(state.mode);
      setRegion(state.region);
      setRegionOpen(state.regionOpen);
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
    setRegionOpen(true);
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
          <a href="#nauka">
            {t("Podstawy naukowe")} <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        <h1 className="sr-only">{t("Interaktywny atlas emocji")}</h1>
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
            <div className="explorer">
              <aside className="emotion-picker" aria-labelledby="picker-title">
                <h2 id="picker-title">{t("Wybierz emocję")}</h2>
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
              </aside>

              <div className="map-panel">
                {!compare && (
                  <h2 id="detail-title" aria-live="polite">
                    {t(emotion.name)}
                  </h2>
                )}
                {compare ? (
                  <div className="comparison-maps">
                    <div className="comparison-item">
                      <span className="map-name">{t(emotion.name)}</span>
                      <BodyMap emotion={emotion} />
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
                      <BodyMap emotion={other} />
                    </div>
                  </div>
                ) : (
                  <div className="single-map">
                    <BodyMap
                      emotion={emotion}
                      selected={regionOpen ? region : null}
                      onRegion={(r) => {
                        setRegion(r);
                        setRegionOpen(true);
                      }}
                    />
                  </div>
                )}
                <div className="legend" aria-label={t("Legenda mapy")}>
                  <span>
                    <i className="swatch more" aria-hidden="true" />{" "}
                    {t("Wzrost odczuć")}{" "}
                  </span>
                  <span>
                    <i className="swatch less" aria-hidden="true" />{" "}
                    {t("Spadek odczuć")}{" "}
                  </span>
                  <span>
                    <i className="swatch none" aria-hidden="true" />{" "}
                    {t("Bez wyróżnienia")}{" "}
                  </span>
                </div>
                <p className="map-caption">
                  {t(
                    "Autorski schemat na podstawie samoopisów uczestników badania.",
                  )}{" "}
                  <a className="citation" href="#source-1">
                    [1]
                  </a>
                </p>
              </div>

              <aside
                className="emotion-detail"
                aria-label={t("Szczegóły mapy")}
              >
                <div className="detail-top">
                  <h2>{t("Szczegóły mapy")}</h2>
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
                <details className="fold">
                  <summary>{t("Opis mapy")}</summary>
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
                  {compare && emotion.id !== other.id && (
                    <p className="detail-description">
                      {t(other.description).replace(" [1]", "")}{" "}
                      <a className="citation" href="#source-1">
                        [1]
                      </a>
                    </p>
                  )}
                </details>
                <ActivityTable
                  emotions={compare ? [emotion, other] : [emotion]}
                />
                {compare ? (
                  <div className="comparison-details">
                    {emotion.id === other.id && (
                      <p className="muted">
                        {t(
                          "To ta sama emocja. Wybierz inną nad prawą sylwetką, aby zestawić dwa schematy.",
                        )}{" "}
                      </p>
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
                  <details
                    className="regions-detail fold"
                    open={regionOpen}
                    onToggle={(e) => setRegionOpen(e.currentTarget.open)}
                  >
                    <summary>{t("Odczucia w obszarze ciała")}</summary>
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
                  </details>
                )}
              </aside>
            </div>
          )}
        </section>
        <section
          className="reflection wrap"
          aria-label={t("A jak jest u Ciebie?")}
        >
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
          aria-label={t("Podstawy naukowe")}
        >
          <details className="sources fold">
            <summary>{t("Badania i źródła")}</summary>
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
          </details>
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
