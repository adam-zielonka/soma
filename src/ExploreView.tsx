import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import BodyMap from "./BodyMap";
import EmotionPicker from "./EmotionPicker";
import { activityOf, regions } from "./emotions";
import type { Emotion, Region } from "./emotions";
import { ActivityBadge, Cite, CopyLink, Legend } from "./components";
import { regionNotes } from "./research";
import {
  areaExamples,
  emotionExamples,
  exampleSources,
  sourceNotes,
} from "./sensationExamples";
import { t } from "./i18n";

export function MapNote({ complex = false }: { complex?: boolean }) {
  return (
    <p className="map-note">
      {t(
        "Autorski schemat na podstawie ryciny 2 z badania. Pokazuje kierunek zmiany, bez natężenia.",
      )}{" "}
      {complex &&
        t(
          "Emocje złożone badano tylko na podstawie ich nazw; ich mapy były słabsze i mniej odrębne niż mapy emocji podstawowych.",
        )}{" "}
      <Cite n={1} />
    </p>
  );
}

export function ResearchNote({
  region,
  lead = false,
}: {
  region: Region;
  lead?: boolean;
}) {
  const note = regionNotes[region];
  return (
    <div className={`research-note${lead ? " lead" : ""}`}>
      <p className="research-label">{t("Co piszą autorzy badania")}</p>
      <p>
        {t(note.authors)} <Cite n={1} />
      </p>
      {note.figure && (
        <>
          <p className="research-label">
            {t("Co widać na rycinie (odczyt Somy)")}
          </p>
          <p>
            {t(note.figure)} <Cite n={1} />
          </p>
        </>
      )}
    </div>
  );
}

export function Examples({
  emotion,
  region,
}: {
  emotion: Emotion;
  region: Region;
}) {
  const own = emotionExamples(emotion.id, region);
  const source = exampleSources[emotion.id]?.[region];
  return (
    <div className="examples">
      <p className="examples-label">
        {own
          ? t("Jak można to opisać")
          : t("Ogólne słowa dla tego obszaru, bez związku z tą emocją")}
      </p>
      <ul>
        {(own ?? areaExamples(region)).map((example) => (
          <li key={example}>{t(example)}</li>
        ))}
      </ul>
      {source && (
        <p className="examples-source">
          {t(sourceNotes[source] ?? "")} <Cite n={source} />
        </p>
      )}
    </div>
  );
}

type Anchor = { region: Region; top: number } | null;

function RegionList({
  emotion,
  region,
  onRegion,
  onShowRegion,
  anchor,
}: {
  emotion: Emotion;
  region: Region | null;
  onRegion: (region: Region | null) => void;
  onShowRegion: (region: Region) => void;
  anchor: React.MutableRefObject<Anchor>;
}) {
  return (
    <ul className="region-list">
      {regions.map((r) => {
        const state = activityOf(emotion, r.id);
        const open = region === r.id;
        const preview = emotionExamples(emotion.id, r.id)?.[0];
        return (
          <li
            key={r.id}
            className={`region-item ${state} ${open ? "open" : ""}`}
            data-region={r.id}
          >
            <button
              type="button"
              className="region-toggle"
              aria-expanded={open}
              aria-controls={open ? `region-${r.id}` : undefined}
              onClick={(event) => {
                anchor.current = {
                  region: r.id,
                  top: event.currentTarget.getBoundingClientRect().top,
                };
                onRegion(open ? null : r.id);
              }}
            >
              <span className="region-name">{t(r.name)}</span>
              <ActivityBadge state={state} short />
              {!open && preview && (
                <span className="region-preview">{t(preview)}</span>
              )}
            </button>
            {open && (
              <div className="region-detail" id={`region-${r.id}`}>
                <Examples emotion={emotion} region={r.id} />
                <ResearchNote region={r.id} />
                <button
                  type="button"
                  className="text-button"
                  onClick={() => onShowRegion(r.id)}
                >
                  {t("Ten obszar we wszystkich emocjach")}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Reflection({ emotion }: { emotion: Emotion }) {
  return (
    <section className="reflection" aria-labelledby="reflection-title">
      <h3 id="reflection-title">{t("Zatrzymaj się na chwilę")}</h3>
      <p className="reflection-prompt">{t(emotion.prompt)}</p>
      <p className="reflection-help">
        {t(
          "Wystarczy pół minuty, z otwartymi oczami. Zauważ jedno odczucie albo jego brak — nie musi pasować do mapy. Jeśli to nieprzyjemne, przerwij i rozejrzyj się wokół.",
        )}
      </p>
    </section>
  );
}

export default function ExploreView({
  emotion,
  region,
  onEmotion,
  onRegion,
  onShowRegion,
}: {
  emotion: Emotion;
  region: Region | null;
  onEmotion: (emotion: Emotion) => void;
  onRegion: (region: Region | null) => void;
  onShowRegion: (region: Region) => void;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const pendingReveal = useRef(false);
  const anchor = useRef<Anchor>(null);
  // When an item above the tapped one collapses, keep the tapped toggle where
  // the finger was instead of letting the list jump.
  useLayoutEffect(() => {
    const kept = anchor.current;
    anchor.current = null;
    if (!kept) return;
    const toggle = panelRef.current?.querySelector<HTMLElement>(
      `[data-region="${kept.region}"] .region-toggle`,
    );
    const shift = toggle ? toggle.getBoundingClientRect().top - kept.top : 0;
    if (shift) window.scrollBy({ top: shift, behavior: "instant" });
  }, [region]);
  // On narrow screens the list sits below the figure: bring the area chosen
  // on the figure into view.
  useEffect(() => {
    const reveal = pendingReveal.current;
    pendingReveal.current = false;
    if (!reveal || !region) return;
    const item = panelRef.current?.querySelector<HTMLElement>(
      `[data-region="${region}"]`,
    );
    if (!item) return;
    const bounds = item.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight)
      item.scrollIntoView({
        block: bounds.height > window.innerHeight ? "start" : "nearest",
      });
  }, [region]);
  function selectFromFigure(next: Region) {
    pendingReveal.current = window.matchMedia("(max-width: 1100px)").matches;
    onRegion(region === next ? null : next);
  }
  return (
    <div className="layout layout-explore">
      <EmotionPicker selected={emotion} onSelect={onEmotion} />
      <div className="stage">
        <div className="stage-head">
          <h2 id="emotion-title">{t(emotion.name)}</h2>
          <CopyLink label={t("Kopiuj link do tej mapy")} />
        </div>
        <p className="stage-description">
          {t(emotion.description)} <Cite n={1} />
        </p>
        <div className="figure">
          <BodyMap
            emotion={emotion}
            selected={region}
            onRegion={selectFromFigure}
          />
        </div>
        <Legend />
        <MapNote complex={emotion.group === "complex"} />
      </div>
      <aside className="panel" ref={panelRef} aria-labelledby="regions-title">
        <h2 id="regions-title" className="panel-title">
          {t("Obszar po obszarze")}
        </h2>
        <p className="panel-hint">
          {t("Wybierz obszar na liście lub na sylwetce.")}
        </p>
        <RegionList
          emotion={emotion}
          region={region}
          onRegion={onRegion}
          onShowRegion={onShowRegion}
          anchor={anchor}
        />
        <Reflection emotion={emotion} />
      </aside>
    </div>
  );
}
