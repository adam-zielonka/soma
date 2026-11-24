import { regions, type Emotion, type Region } from "./emotions";
import { t } from "./i18n";
import { getSensationExamples } from "./sensationExamples";

export function SensationBubbles({
  emotion,
  selected,
  onRegion,
}: {
  emotion: Emotion;
  selected: Region | null;
  onRegion: (region: Region) => void;
}) {
  const highlighted = regions.filter((r) => emotion.regions[r.id]);
  const upper = highlighted.filter((r) =>
    ["head", "throat", "chest"].includes(r.id),
  );
  const lower = highlighted.filter((r) =>
    ["belly", "arms", "legs"].includes(r.id),
  );
  const pair = [
    upper.find((r) => r.id === selected) ??
      upper.find((r) => r.id === "throat") ??
      upper[0],
    lower.find((r) => r.id === selected) ?? lower.at(-1),
  ];

  return pair.map((region, index) => {
    if (!region) return null;
    const [first, second] = getSensationExamples(emotion.id, region.id).map(
      (example) => t(example),
    );
    return (
      <div
        key={index}
        className={`bubble-lane ${index === 0 ? "left" : "right"}`}
        data-region={region.id}
      >
        <button
          type="button"
          className="sensation-bubble"
          aria-pressed={selected === region.id}
          onClick={() => onRegion(region.id)}
        >
          <strong>{t(region.name)}</strong>
          <span>{first.length <= second.length ? first : second}</span>
        </button>
      </div>
    );
  });
}

export function EmotionBubbles({
  matches,
  onEmotion,
}: {
  matches: Emotion[];
  onEmotion: (emotion: Emotion) => void;
}) {
  return ["left", "right"].map((side, index) => (
    <div key={side} className={`emotion-cloud bubble-lane ${side}`}>
      {matches
        .filter((_, i) => i % 2 === index)
        .map((emotion) => (
          <button
            key={emotion.id}
            type="button"
            className="emotion-bubble"
            aria-label={t("Zobacz mapę: {emotion}", {
              emotion: t(emotion.name),
            })}
            onClick={() => onEmotion(emotion)}
          >
            {t(emotion.name)}
          </button>
        ))}
    </div>
  ));
}
