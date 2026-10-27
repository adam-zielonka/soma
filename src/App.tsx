import { useEffect, useState } from "react";
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
  Sparkles,
} from "lucide-react";
import BodyMap from "./BodyMap";
import EmotionFace from "./EmotionFace";
import { emotions, findEmotion, regions } from "./emotions";
import type { Region } from "./emotions";

function readLocation() {
  const p = new URLSearchParams(window.location.search);
  return {
    emotion: findEmotion(p.get("emocja")),
    comparison: findEmotion(p.get("z") ?? "sadness"),
    compare: p.has("z"),
  };
}

export default function App() {
  const [initial] = useState(readLocation);
  const [emotion, setEmotion] = useState(initial.emotion);
  const [other, setOther] = useState(initial.comparison);
  const [compare, setCompare] = useState(initial.compare);
  const [region, setRegion] = useState<Region | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [reflection, setReflection] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("emocja", emotion.id);
    if (compare) url.searchParams.set("z", other.id);
    else url.searchParams.delete("z");
    window.history.replaceState(null, "", url);
  }, [emotion, compare, other]);
  useEffect(() => {
    function restore() {
      const state = readLocation();
      setEmotion(state.emotion);
      setOther(state.comparison);
      setCompare(state.compare);
      setRegion(null);
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
  const activeRegion = regions.find((r) => r.id === region);
  return (
    <>
      <a className="skip-link" href="#atlas">
        Przejdź do mapy emocji
      </a>
      <header className="header wrap">
        <a
          href={import.meta.env.BASE_URL}
          className="brand"
          aria-label="Soma — strona główna"
        >
          <span className="brand-mark">s</span>
          <span>
            soma<span className="brand-dot">.</span>
          </span>
          <span className="brand-caption">ATLAS EMOCJI</span>
        </a>
        <nav aria-label="Nawigacja główna">
          <a className="nav-current" href="#atlas">
            Odkrywaj
          </a>
          <a href="#nauka">
            Podstawy naukowe <ArrowUpRight size={14} />
          </a>
        </nav>
        <span className="header-note">
          <span /> Bliżej siebie
        </span>
      </header>

      <main>
        <section className="hero wrap" aria-labelledby="title">
          <div>
            <p className="eyebrow">
              <span className="tiny-star">✳</span> MAŁY ATLAS WEWNĘTRZNEGO
              ŚWIATA
            </p>
            <h1 id="title">
              Emocje mają
              <br />
              swój <em>adres.</em>
            </h1>
          </div>
          <div className="hero-aside">
            <p>
              Motyle w brzuchu. Ciepło w klatce piersiowej.
              <br className="desktop-break" /> Poznaj cielesny wymiar tego, co
              czujesz.
            </p>
            <a href="#atlas">
              Zacznij od jednej emocji <ArrowDown size={16} />
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
          aria-label="Interaktywny atlas emocji"
        >
          <div className="atlas-top">
            <div className="mode-switch" aria-label="Tryb mapy">
              <button aria-pressed={!compare} onClick={() => setCompare(false)}>
                <Sparkles size={15} /> Odkrywaj
              </button>
              <button aria-pressed={compare} onClick={() => setCompare(true)}>
                <Layers2 size={15} /> Porównaj emocje
              </button>
            </div>
            <span className="atlas-note">
              <span /> Schematy oparte na badaniach
            </span>
          </div>
          <div className={`explorer ${compare ? "is-comparing" : ""}`}>
            <aside className="emotion-picker" aria-labelledby="picker-title">
              <p className="step-label">01 / WYBIERZ EMOCJĘ</p>
              <h2 id="picker-title">Co chcesz poznać?</h2>
              <p className="muted picker-intro">
                Każda emocja opowiada
                <br />
                inną historię w ciele.
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
                      setRegion(null);
                    }}
                  >
                    <EmotionFace id={e.id} />
                    <span>{e.name}</span>
                    {emotion.id === e.id && <span className="selection-dot" />}
                  </button>
                ))}
              </div>
              <div className="picker-foot">
                <Info size={15} />
                <p>
                  Nie ma dobrych ani złych emocji.
                  <br />
                  Każda jest częścią doświadczenia.
                </p>
              </div>
            </aside>

            <div className="map-panel">
              <div className="map-heading">
                <span className="step-label">02 / ZOBACZ W CIELE</span>
                <span className="map-view">WIDOK Z PRZODU</span>
              </div>
              {compare ? (
                <div className="comparison-maps">
                  <div className="comparison-item">
                    <span className="map-name">{emotion.name}</span>
                    <BodyMap emotion={emotion} compact />
                  </div>
                  <span className="versus">&</span>
                  <div className="comparison-item">
                    <label className="select-label">
                      <span className="sr-only">Druga emocja</span>
                      <select
                        aria-label="Druga emocja"
                        value={other.id}
                        onChange={(e) => setOther(findEmotion(e.target.value))}
                      >
                        {emotions.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
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
                      Twoje ciało,
                      <br />
                      wiele odczuć.
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
                      Kliknij obszar,
                      <br />
                      aby go odkryć.
                    </span>
                    <MoveUpRight size={17} />
                  </div>
                </div>
              )}
              <div className="legend" aria-label="Legenda mapy">
                <span>
                  <i className="warm" /> Wzrost odczuć
                </span>
                <span>
                  <i className="cool" /> Spadek odczuć
                </span>
                <span>
                  <i className="neutral" /> Bez wyróżnienia
                </span>
              </div>
              <p className="map-caption">
                Odczuwana aktywność · schemat poglądowy, bez skali liczbowej
              </p>
            </div>

            <aside className="emotion-detail" aria-labelledby="detail-title">
              <div className="detail-top">
                <span className="step-label">
                  {compare
                    ? "03 / ZAUWAŻ RÓŻNICE"
                    : "03 / PRZYJRZYJ SIĘ BLIŻEJ"}
                </span>
                <button
                  className="icon-button"
                  onClick={copyLink}
                  aria-label="Kopiuj link do tej mapy"
                  title="Kopiuj link"
                >
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
              </div>
              <div className="copy-status" role="status">
                {copied
                  ? "Link skopiowany"
                  : copyError
                    ? "Skopiuj adres z paska przeglądarki."
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
                  {emotion.name}
                  {compare && (
                    <span className="comparison-title">
                      {" "}
                      i {other.name.toLocaleLowerCase("pl")}
                    </span>
                  )}
                </h2>
                <p className="detail-word">{emotion.word}</p>
                <p className="detail-description">
                  {emotion.description.replace(" [1]", "")}{" "}
                  <a
                    className="citation"
                    href="#source-1"
                    aria-label="Źródło: Bodily maps of emotions"
                  >
                    [1]
                  </a>
                </p>
              </div>
              {compare ? (
                <div className="comparison-details">
                  <p className="small-label">JAK CZYTAĆ PORÓWNANIE</p>
                  {emotion.id === other.id ? (
                    <p className="muted">
                      To ta sama emocja. Wybierz inną nad prawą sylwetką, aby
                      zestawić dwa schematy.
                    </p>
                  ) : (
                    <>
                      <p className="comparison-description">
                        {other.description.replace(" [1]", "")}{" "}
                        <a className="citation" href="#source-1">
                          [1]
                        </a>
                      </p>
                      <div className="region-comparison">
                        <div className="comparison-row table-head">
                          <span>Obszar</span>
                          <span>{emotion.name}</span>
                          <span>{other.name}</span>
                        </div>
                        {regions.map((r) => (
                          <div className="comparison-row" key={r.id}>
                            <span>{r.name}</span>
                            {[emotion, other].map((e, i) => (
                              <span
                                key={i}
                                className={`sensation ${e.regions[r.id] ?? "none"}`}
                                aria-label={`${r.name}, ${e.name}: ${e.regions[r.id] === "more" ? "wzrost odczuć" : e.regions[r.id] === "less" ? "spadek odczuć" : "bez wyróżnienia"}`}
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
                </div>
              ) : (
                <div className="regions-detail">
                  <p className="small-label">ODKRYWAJ OBSZARY CIAŁA</p>
                  <div className="region-chips">
                    {regions.map((r) => (
                      <button
                        key={r.id}
                        aria-pressed={region === r.id}
                        onClick={() => setRegion(region === r.id ? null : r.id)}
                      >
                        <i className={emotion.regions[r.id] ?? "none"} />
                        {r.name}
                      </button>
                    ))}
                  </div>
                  <div className="region-info" aria-live="polite">
                    {activeRegion ? (
                      <>
                        <strong>{activeRegion.name}</strong>
                        <p>
                          {emotion.regions[activeRegion.id] === "more"
                            ? "W tym schemacie: wzrost odczuwanej aktywności."
                            : emotion.regions[activeRegion.id] === "less"
                              ? "W tym schemacie: spadek odczuwanej aktywności."
                              : "Ten obszar nie został wyróżniony w uproszczonym schemacie. Nie oznacza to braku odczuć."}
                        </p>
                      </>
                    ) : (
                      <p>Dotknij sylwetki lub wybierz obszar powyżej.</p>
                    )}
                  </div>
                </div>
              )}
              <a href="#nauka" className="detail-source">
                <BookOpen size={15} /> Skąd to wiemy? <ArrowUpRight size={15} />
              </a>
            </aside>
          </div>
          <div className="atlas-bottom">
            <Info size={16} />
            <p>
              To zaproszenie do uważności, nie wzorzec do spełnienia. Twoje
              odczucia mogą być inne. <a href="#metoda">Jak powstały mapy?</a>
            </p>
            <span>01 — 08</span>
          </div>
        </section>

        <section className="reflection wrap" aria-labelledby="reflection-title">
          <div className="reflection-symbol" aria-hidden="true">
            <Heart size={25} strokeWidth={1.2} />
          </div>
          <div>
            <p className="eyebrow">CHWILA DLA CIEBIE</p>
            <h2 id="reflection-title">A jak jest u Ciebie?</h2>
            <p>
              Mapa jest punktem wyjścia. Najciekawsze jest Twoje własne
              doświadczenie.
            </p>
          </div>
          <button
            className="reflection-toggle"
            aria-expanded={reflection}
            aria-controls="reflection-content"
            onClick={() => setReflection(!reflection)}
          >
            {reflection ? "Zwiń wskazówkę" : "Zatrzymaj się na chwilę"}
            <ArrowDownRight size={18} />
          </button>
          {reflection && (
            <div id="reflection-content" className="reflection-content">
              <span className="reflection-number">30 sek.</span>
              <div>
                <h3>{emotion.prompt}</h3>
                <p>
                  Możesz zostać z otwartymi oczami. Zauważ jedno odczucie — lub
                  jego brak. Nie musisz niczego zmieniać ani dopasowywać do
                  mapy. Jeśli to nieprzyjemne, przerwij i rozejrzyj się wokół.
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
              <p className="eyebrow">CIEKAWOŚĆ POPARTA BADANIAMI</p>
              <h2 id="science-title">
                Mniej domysłów.
                <br />
                <em>Więcej nauki.</em>
              </h2>
            </div>
            <p>
              Jak badać coś tak osobistego jak odczuwanie?
              <br />
              Zacząć od zapytania ludzi o ich doświadczenia.
            </p>
          </div>
          <div className="source-grid">
            <article id="source-1" className="source-card">
              <div className="source-meta">
                <span>01 / BADANIE ŹRÓDŁOWE</span>
                <span>PNAS · 2014</span>
              </div>
              <h3>Bodily maps of emotions</h3>
              <p className="source-authors">
                L. Nummenmaa, E. Glerean, R. Hari, J. K. Hietanen
              </p>
              <p>
                W pięciu eksperymentach 701 uczestników zaznaczało na sylwetkach
                wzrost i spadek odczuwanej aktywności. Powstały różniące się
                mapy emocji.
              </p>
              <a
                href="https://doi.org/10.1073/pnas.1321664111"
                target="_blank"
                rel="noreferrer"
              >
                Przeczytaj publikację <ArrowUpRight size={17} />
              </a>
            </article>
            <article className="source-card">
              <div className="source-meta">
                <span>02 / SZERSZA PERSPEKTYWA</span>
                <span>PNAS · 2018</span>
              </div>
              <h3>Maps of subjective feelings</h3>
              <p className="source-authors">
                L. Nummenmaa, R. Hari, J. K. Hietanen, E. Glerean
              </p>
              <p>
                1026 osób wzięło udział w badaniu 100 subiektywnych stanów.
                Wyniki wskazują na związek doświadczeń psychicznych z odczuciami
                w ciele — także poza samymi emocjami.
              </p>
              <a
                href="https://doi.org/10.1073/pnas.1807390115"
                target="_blank"
                rel="noreferrer"
              >
                Przeczytaj publikację <ArrowUpRight size={17} />
              </a>
            </article>
          </div>
          <details id="metoda" className="method">
            <summary>
              <span>
                <Info size={17} /> Jak powstały te mapy i jakie mają
                ograniczenia?
              </span>
              <ChevronDown size={18} />
            </summary>
            <div className="method-content">
              <p>
                Sylwetki w Somie to autorskie, jakościowe schematy inspirowane
                ryciną 2 pracy z 2014 roku. Rozmieszczenie poświaty i podział na
                sześć obszarów są uproszczeniem redakcyjnym. Nie odtworzono
                danych liczbowych, granic istotności ani oryginalnej skali
                statystycznej. Kolory wskazują jedynie kierunek odczuwanej
                zmiany.
              </p>
              <p>
                Badania opierają się na samoopisie. Mapy nie są pomiarami
                temperatury, pracy narządów ani aktywności mózgu. Uśrednione
                wzorce nie opisują każdej osoby; kontekst i indywidualne
                doświadczenia mają znaczenie. Na podstawie miejsca odczucia nie
                można ustalić emocji ani postawić diagnozy.
              </p>
              <p>
                Soma służy edukacji i autorefleksji. Wskazówki do obserwacji są
                autorskimi pytaniami, nie procedurą terapeutyczną.{" "}
                <a
                  href="https://emotion.utu.fi/maps-of-subjective-feelings/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Poznaj materiały zespołu badawczego <ArrowUpRight size={13} />
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
        <p>Trochę nauki. Trochę uważności. Bliżej siebie.</p>
        <a
          href="https://github.com/adam-zielonka/soma"
          target="_blank"
          rel="noreferrer"
        >
          Otwarty kod <ArrowRight size={15} />
        </a>
      </footer>
    </>
  );
}
