import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import BodyMap from "./BodyMap";
import { emotions, groups } from "./emotions";
import type { Emotion } from "./emotions";
import { t } from "./i18n";

// Long names would break mid-syllable in the narrow buttons; soft hyphens
// mark the Polish syllable boundaries where they may wrap instead.
const syllables: Record<string, string> = {
  Zainteresowanie: "Zain\u00ADte\u00ADre\u00ADso\u00ADwa\u00ADnie",
  Podenerwowanie: "Po\u00ADde\u00ADner\u00ADwo\u00ADwa\u00ADnie",
};
const breakable = (name: string) => syllables[name] ?? name;

// On phones the grid folds behind a single toggle, so the map stays on the
// first screen; on wider screens the toggle is hidden and the grid is shown.
export default function EmotionPicker({
  selected,
  onSelect,
}: {
  selected: Emotion;
  onSelect: (emotion: Emotion) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={`emotion-picker${open ? " open" : ""}`}>
      <button
        type="button"
        ref={toggleRef}
        className="picker-toggle"
        aria-expanded={open}
        aria-controls="emotion-groups"
        onClick={() => setOpen(!open)}
      >
        <span>
          {t("Emocja")}: <strong>{t(selected.name)}</strong>
        </span>
        <span className="picker-toggle-action">
          {t("Zmień ({count})", { count: emotions.length })}
          <ChevronDown size={16} aria-hidden="true" />
        </span>
      </button>
      <div id="emotion-groups" className="picker-groups">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className="picker-heading">
              {t(group.name)}
            </h2>
            {group.note && <p className="picker-note">{t(group.note)}</p>}
            <ul className="emotion-list">
              {emotions
                .filter((e) => e.group === group.id)
                .map((e) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      className="emotion-option"
                      aria-label={t(e.name)}
                      aria-pressed={selected.id === e.id}
                      onClick={() => {
                        setOpen(false);
                        onSelect(e);
                        // On phones the grid hides after a choice: keep focus
                        // on the toggle, which now names the chosen emotion.
                        if (toggleRef.current?.offsetParent)
                          toggleRef.current.focus();
                      }}
                    >
                      <BodyMap emotion={e} mini />
                      <span>{breakable(t(e.name))}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
