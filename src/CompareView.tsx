import { ChevronDown } from "lucide-react";
import BodyMap from "./BodyMap";
import { activityOf, emotions, findEmotion, groups, regions } from "./emotions";
import type { Emotion, Region } from "./emotions";
import { ActivityBadge, Cite, CopyLink, Legend } from "./components";
import { Examples, MapNote } from "./ExploreView";
import { regionName } from "./emotions";
import { t } from "./i18n";

function EmotionSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Emotion;
  onChange: (emotion: Emotion) => void;
}) {
  return (
    <label className="emotion-select">
      <span>{label}</span>
      <span className="select-wrap">
        <select
          value={value.id}
          onChange={(e) => onChange(findEmotion(e.target.value))}
        >
          {groups.map((group) => (
            <optgroup key={group.id} label={t(group.name)}>
              {emotions
                .filter((e) => e.group === group.id)
                .map((option) => (
                  <option key={option.id} value={option.id}>
                    {t(option.name)}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown size={18} aria-hidden="true" />
      </span>
    </label>
  );
}

export default function CompareView({
  first,
  second,
  region,
  onFirst,
  onSecond,
  onRegion,
}: {
  first: Emotion;
  second: Emotion;
  region: Region | null;
  onFirst: (emotion: Emotion) => void;
  onSecond: (emotion: Emotion) => void;
  onRegion: (region: Region | null) => void;
}) {
  const pair = [first, second];
  const same = first.id === second.id;
  const differences = regions.filter(
    (r) => activityOf(first, r.id) !== activityOf(second, r.id),
  ).length;
  return (
    <div className="layout layout-compare">
      <div className="stage">
        <div className="stage-head">
          <h2 id="compare-title">{t("Porównanie map")}</h2>
          <CopyLink label={t("Kopiuj link do tego porównania")} />
        </div>
        <div className="pair">
          {pair.map((emotion, i) => (
            <div className="pair-item" key={i}>
              <EmotionSelect
                label={i === 0 ? t("Pierwsza emocja") : t("Druga emocja")}
                value={emotion}
                onChange={i === 0 ? onFirst : onSecond}
              />
              <div className="figure">
                <BodyMap
                  emotion={emotion}
                  selected={region}
                  onRegion={(r) => onRegion(region === r ? null : r)}
                />
              </div>
              <p className="pair-description">
                {t(emotion.description)} <Cite n={1} />
              </p>
            </div>
          ))}
        </div>
        <Legend />
        <MapNote complex={pair.some((e) => e.group === "complex")} />
      </div>
      <aside className="panel" aria-labelledby="table-title">
        <h2 id="table-title" className="panel-title">
          {t("Obszar po obszarze")}
        </h2>
        <p className="panel-hint" aria-live="polite">
          {same
            ? t("To ta sama emocja. Wybierz inną, aby zestawić dwie mapy.")
            : differences === 0
              ? t(
                  "W uproszczonych mapach tych emocji wyróżniono te same obszary; w oryginale różnią się rozkładem i jasnością koloru.",
                )
              : t("Mapy różnią się w {count} z 6 obszarów.", {
                  count: differences,
                })}
        </p>
        <table className="compare-table">
          <caption className="sr-only">
            {t("Kierunek odczuwanej aktywności")}
          </caption>
          <thead>
            <tr>
              <th scope="col">{t("Obszar")}</th>
              <th scope="col">{t(first.name)}</th>
              <th scope="col">{t(second.name)}</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((r) => {
              const a = activityOf(first, r.id);
              const b = activityOf(second, r.id);
              return (
                <tr
                  key={r.id}
                  className={`${a !== b ? "differs" : ""} ${region === r.id ? "selected" : ""}`}
                >
                  <th scope="row">
                    <button
                      type="button"
                      aria-pressed={region === r.id}
                      onClick={() => onRegion(region === r.id ? null : r.id)}
                    >
                      {t(r.name)}
                    </button>
                  </th>
                  <td>
                    <ActivityBadge state={a} short />
                  </td>
                  <td>
                    <ActivityBadge state={b} short />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!region && (
          <p className="table-note">
            {t(
              "Wybierz obszar w tabeli lub na sylwetce, aby zobaczyć słowa opisu.",
            )}
          </p>
        )}
        {region && (
          <section
            className="compare-examples"
            aria-labelledby="compare-examples-title"
          >
            <h3 id="compare-examples-title">{t(regionName(region))}</h3>
            {(same ? [first] : pair).map((emotion) => (
              <div key={emotion.id} className="compare-example">
                <h4>
                  {t(emotion.name)}
                  <ActivityBadge state={activityOf(emotion, region)} short />
                </h4>
                <Examples emotion={emotion} region={region} />
              </div>
            ))}
          </section>
        )}
      </aside>
    </div>
  );
}
