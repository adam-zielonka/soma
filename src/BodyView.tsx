import { ArrowRight } from "lucide-react";
import BodyMap from "./BodyMap";
import { activityOf, emotions, regionName, regions } from "./emotions";
import type { Activity, Emotion, Region } from "./emotions";
import { ActivityMark, CopyLink } from "./components";
import { activityLabels } from "./activity";
import { ResearchNote } from "./ExploreView";
import { emotionExamples } from "./sensationExamples";
import { t } from "./i18n";

function EmotionRow({
  emotion,
  region,
  onEmotion,
}: {
  emotion: Emotion;
  region: Region;
  onEmotion: (emotion: Emotion) => void;
}) {
  const example = emotionExamples(emotion.id, region)?.[0];
  return (
    <li>
      <button
        type="button"
        className="emotion-row"
        onClick={() => onEmotion(emotion)}
      >
        <BodyMap emotion={emotion} selected={region} mini />
        <span className="emotion-row-text">
          <strong>{t(emotion.name)}</strong>
          {example && <span>{t(example)}</span>}
        </span>
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </li>
  );
}

export default function BodyView({
  region,
  onRegion,
  onEmotion,
}: {
  region: Region;
  onRegion: (region: Region) => void;
  onEmotion: (emotion: Emotion) => void;
}) {
  const byState = (state: Activity) =>
    emotions.filter((e) => activityOf(e, region) === state);
  const unmarked = byState("none");
  return (
    <div className="layout layout-body">
      <div className="stage">
        <div className="stage-head">
          <h2 id="region-title">{t(regionName(region))}</h2>
          <CopyLink label={t("Kopiuj link do tego obszaru")} />
        </div>
        <div
          className="region-picker"
          role="group"
          aria-label={t("Obszary ciała")}
        >
          {regions.map((r) => (
            <button
              type="button"
              key={r.id}
              aria-pressed={region === r.id}
              onClick={() => onRegion(r.id)}
            >
              {t(r.name)}
            </button>
          ))}
        </div>
        <div className="figure">
          <BodyMap selected={region} onRegion={onRegion} />
        </div>
        <p className="map-note">
          {t("Jasne pole pokazuje wybrany obszar, nie odczucia.")}
        </p>
      </div>
      <aside className="panel" aria-labelledby="body-results-title">
        <h2 id="body-results-title" className="panel-title">
          {t("Emocje i ten obszar")}
        </h2>
        <ResearchNote region={region} lead />
        <p className="panel-hint" aria-live="polite">
          {t(
            "W uproszczonych mapach Somy ten obszar wyróżniono przy {count} z {total} emocji.",
            {
              count: emotions.length - unmarked.length,
              total: emotions.length,
            },
          )}
        </p>
        {(["more", "less"] as const).map((state) => {
          const list = byState(state);
          if (!list.length) return null;
          return (
            <section
              key={state}
              className={`state-group ${state}`}
              aria-labelledby={`state-${state}`}
            >
              <h3 id={`state-${state}`}>
                <ActivityMark state={state} />
                {t(activityLabels[state])} ({list.length})
              </h3>
              <ul className="emotion-rows">
                {list.map((e) => (
                  <EmotionRow
                    key={e.id}
                    emotion={e}
                    region={region}
                    onEmotion={onEmotion}
                  />
                ))}
              </ul>
            </section>
          );
        })}
        {unmarked.length > 0 && (
          <section className="state-group none" aria-labelledby="state-none">
            <h3 id="state-none">
              <ActivityMark state="none" />
              {t(activityLabels.none)} ({unmarked.length})
            </h3>
            <p className="unmarked-list">
              {unmarked.map((e, i) => (
                <span key={e.id}>
                  <button
                    type="button"
                    className="text-button inline"
                    onClick={() => onEmotion(e)}
                  >
                    {t(e.name)}
                  </button>
                  {i < unmarked.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="table-note">
              {t(
                "Brak wyróżnienia oznacza, że w uproszczonej mapie nie zaznaczono wyraźnej zmiany — nie to, że nic się tam nie dzieje.",
              )}
            </p>
          </section>
        )}
      </aside>
    </div>
  );
}
