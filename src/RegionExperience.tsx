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
      <strong>{regions.find((r) => r.id === region)!.name}</strong>
      <p>
        {sensation === "more"
          ? "W tym schemacie: wzrost odczuwanej aktywności."
          : sensation === "less"
            ? "W tym schemacie: spadek odczuwanej aktywności."
            : "Ten obszar nie został wyróżniony w uproszczonym schemacie. Nie oznacza to braku odczuć."}
      </p>
      <p className="example-label">
        {sensation
          ? "Przykładowe odczucia — jak można je nazwać"
          : "Słownik odczuć dla tego obszaru"}
      </p>
      <ul className="sensation-examples">
        {getSensationExamples(emotion.id, region).map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
      {!sensation && (
        <p className="example-context">
          Ogólne propozycje słów, bez przypisania do wybranej emocji.
        </p>
      )}
    </div>
  );
}
