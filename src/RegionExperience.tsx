import { t } from "./i18n";
import { regions } from "./emotions";
import type { Emotion, Region } from "./emotions";
import { getSensationExamples } from "./sensationExamples";

export default function RegionExperience({
  emotion,
  region,
}: {
  emotion: Emotion;
  region: Region;
}) {
  const sensation = emotion.regions[region];
  return (
    <div className="region-info">
      <strong>{t(regions.find((r) => r.id === region)!.name)}</strong>
      <p>
        {sensation === "more"
          ? t("W tym schemacie: wzrost odczuwanej aktywności.")
          : sensation === "less"
            ? t("W tym schemacie: spadek odczuwanej aktywności.")
            : t(
                "Ten obszar nie został wyróżniony w uproszczonym schemacie. Nie oznacza to braku odczuć.",
              )}
      </p>
      <p className="example-label">
        {sensation
          ? t("Przykładowe odczucia — jak można je nazwać")
          : t("Słownik odczuć dla tego obszaru")}
      </p>
      <ul className="sensation-examples">
        {getSensationExamples(emotion.id, region).map((example) => (
          <li key={t(example)}>{t(example)}</li>
        ))}
      </ul>
      {!sensation && (
        <p className="example-context">
          {t(
            "Ogólne propozycje słów, bez przypisania do wybranej emocji.",
          )}{" "}
        </p>
      )}
    </div>
  );
}
