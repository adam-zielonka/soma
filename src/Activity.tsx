import { regions } from "./emotions";
import type { Emotion } from "./emotions";
import { t } from "./i18n";

export const activityStates = {
  more: { symbol: "↑", label: "Wzrost odczuć" },
  less: { symbol: "↓", label: "Spadek odczuć" },
  none: { symbol: "—", label: "Bez wyróżnienia" },
};

export function ActivitySymbol({
  state,
}: {
  state: keyof typeof activityStates;
}) {
  return (
    <span className={`activity-symbol ${state}`} aria-hidden="true">
      {activityStates[state].symbol}
    </span>
  );
}

export function ActivityTable({ emotions }: { emotions: Emotion[] }) {
  return (
    <div className="region-comparison">
      <table className="activity-table">
        <caption>{t("Kierunek odczuwanej aktywności")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("Obszar")}</th>
            {emotions.map((emotion, i) => (
              <th scope="col" key={i}>
                {t(emotion.name)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => (
            <tr key={region.id}>
              <th scope="row">{t(region.name)}</th>
              {emotions.map((emotion, i) => {
                const state = emotion.regions[region.id] ?? "none";
                return (
                  <td key={i}>
                    <span className="activity-state">
                      <ActivitySymbol state={state} />
                      <span>{t(activityStates[state].label)}</span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="activity-note">
        {t("Bez wyróżnienia w schemacie nie oznacza braku odczuć.")}
      </p>
    </div>
  );
}
