import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  Code2,
  Layers2,
  PersonStanding,
  ScanFace,
} from "lucide-react";
import { t, language, setLanguage, subscribe } from "./i18n";
import { findEmotion, findRegion } from "./emotions";
import type { Emotion, Region } from "./emotions";
import { Brand, Cite } from "./components";
import ExploreView from "./ExploreView";
import CompareView from "./CompareView";
import BodyView from "./BodyView";
import About from "./About";

type Mode = "explore" | "compare" | "body";

function focusElement(element: HTMLElement | null) {
  if (!element) return;
  if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });
}

const defaultBodyRegion: Region = "chest";

// URL parameters stay compatible with links shared from earlier versions:
// ?emocja=<id>&z=<id> (comparison), ?widok=cialo (body view), ?obszar=<id>.
function readLocation() {
  const p = new URLSearchParams(window.location.search);
  const mode: Mode =
    p.get("widok") === "cialo" ? "body" : p.has("z") ? "compare" : "explore";
  return {
    mode,
    emotion: findEmotion(p.get("emocja")),
    other: findEmotion(p.get("z"), findEmotion("sadness")),
    // Only an explicitly chosen area is stored; the body view falls back to
    // the chest for display without turning it into a choice elsewhere.
    region: findRegion(p.get("obszar")),
  };
}

const modes: { id: Mode; label: string; Icon: typeof ScanFace }[] = [
  { id: "explore", label: "Emocje", Icon: ScanFace },
  { id: "compare", label: "Porównanie", Icon: Layers2 },
  { id: "body", label: "Obszary ciała", Icon: PersonStanding },
];

export default function App() {
  useSyncExternalStore(subscribe, () => language);
  const [initial] = useState(readLocation);
  const [mode, setMode] = useState<Mode>(initial.mode);
  const [emotion, setEmotion] = useState(initial.emotion);
  const [other, setOther] = useState(initial.other);
  const [region, setRegion] = useState<Region | null>(initial.region);

  useEffect(() => {
    const url = new URL(window.location.href);
    const p = url.searchParams;
    p.set("emocja", emotion.id);
    if (mode === "compare") p.set("z", other.id);
    else p.delete("z");
    if (mode === "body") p.set("widok", "cialo");
    else p.delete("widok");
    if (region) p.set("obszar", region);
    else p.delete("obszar");
    if (url.href !== window.location.href)
      window.history.replaceState(null, "", url);
  }, [mode, emotion, other, region]);

  // Move focus to the heading of a view the user jumped to, so keyboard and
  // screen-reader users continue from the new content.
  const pendingFocus = useRef<string | null>(null);
  useEffect(() => {
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    document.getElementById("atlas")?.scrollIntoView({ block: "start" });
    focusElement(document.getElementById(id));
  });

  // In-page links scroll and move focus without adding history entries, so
  // the Back button never restores an older emotion or area.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element).closest?.('a[href^="#"]');
      const target = link
        ? document.getElementById(link.getAttribute("href")!.slice(1))
        : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ block: "start" });
      focusElement(target);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    function restore() {
      const state = readLocation();
      setMode(state.mode);
      setEmotion(state.emotion);
      setOther(state.other);
      setRegion(state.region);
    }
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  function openEmotion(next: Emotion) {
    // Coming from the body view: open the area whose list the user was reading.
    setRegion((current) => current ?? defaultBodyRegion);
    setEmotion(next);
    setMode("explore");
    pendingFocus.current = "emotion-title";
  }

  function openRegion(next: Region) {
    setRegion(next);
    setMode("body");
    pendingFocus.current = "region-title";
  }

  return (
    <>
      <a className="skip-link" href="#atlas">
        {t("Przejdź do atlasu")}
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <div
            className="mode-tabs"
            role="group"
            aria-label={t("Widok atlasu")}
          >
            {modes.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={mode === id}
                onClick={() => setMode(id)}
              >
                <Icon size={16} aria-hidden="true" />
                {t(label)}
              </button>
            ))}
          </div>
          <a className="about-link" href="#o-badaniu">
            {t("O badaniu")}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <div className="wrap intro">
          <h1>{t("Gdzie w ciele czujemy emocje?")}</h1>
          <p>
            {t(
              "Poglądowe mapy odczuć na podstawie badania, w którym uczestnicy zaznaczali na sylwetkach, gdzie emocja wzmaga lub osłabia doznania z ciała.",
            )}{" "}
            <Cite n={1} />
          </p>
        </div>
        <section
          id="atlas"
          className="wrap atlas"
          aria-label={t("Atlas emocji")}
        >
          {mode === "explore" && (
            <ExploreView
              emotion={emotion}
              region={region}
              onEmotion={setEmotion}
              onRegion={setRegion}
              onShowRegion={openRegion}
            />
          )}
          {mode === "compare" && (
            <CompareView
              first={emotion}
              second={other}
              region={region}
              onFirst={setEmotion}
              onSecond={setOther}
              onRegion={setRegion}
            />
          )}
          {mode === "body" && (
            <BodyView
              region={region ?? defaultBodyRegion}
              onRegion={setRegion}
              onEmotion={openEmotion}
            />
          )}
        </section>
        <div className="wrap">
          <About />
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Brand compact />
          <p className="footer-note">
            {t("Bez kont, analityki i zapisywania Twoich odczuć.")}
          </p>
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
            className="footer-link"
            href="https://github.com/adam-zielonka/soma"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={15} aria-hidden="true" />
            {t("Kod źródłowy")}
          </a>
        </div>
      </footer>
    </>
  );
}
