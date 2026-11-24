import { regions } from "./emotions";
import type { Emotion } from "./emotions";
import { t } from "./i18n";

export const activityLabels = {
  more: "Wzrost odczuć",
  less: "Spadek odczuć",
  none: "Bez wyróżnienia",
};

export function ActivityTable({ emotions }: { emotions: Emotion[] }) {
  return (
    <details className="region-comparison fold">
      <summary>{t("Tabela obszarów ciała")}</summary>
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
                return <td key={i}>{t(activityLabels[state])}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="activity-note">
        {t("Bez wyróżnienia w schemacie nie oznacza braku odczuć.")}
      </p>
    </details>
  );
}
