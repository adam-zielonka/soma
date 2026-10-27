import { ArrowRight, ArrowUpRight, Check, Copy, Info } from "lucide-react";
import BodyMap from "./BodyMap";
import EmotionFace from "./EmotionFace";
import { emotions, regions } from "./emotions";
import type { Emotion, Region, Sensation } from "./emotions";
import { getSensationExamples } from "./sensationExamples";

export default function RegionExplorer({
  region,
  onRegion,
  onEmotion,
  onCopy,
  copied,
  copyError,
}: {
  region: Region;
  onRegion: (region: Region) => void;
  onEmotion: (emotion: Emotion) => void;
  onCopy: () => void;
  copied: boolean;
  copyError: boolean;
}) {
  const selectedRegion = regions.find((r) => r.id === region)!;
  const matching = emotions.filter((e) => e.regions[region]);
  const remaining = emotions.filter((e) => !e.regions[region]);
  const groups: { id: Sensation; title: string; description: string }[] = [
    {
      id: "more",
      title: "Wzrost odczuwanej aktywności",
      description: "W schemacie wyróżniono więcej odczuć w tym obszarze.",
    },
    {
      id: "less",
      title: "Spadek odczuwanej aktywności",
      description: "W schemacie wyróżniono mniej odczuć w tym obszarze.",
    },
  ];
  return (
    <div className="region-explorer">
      <aside className="body-area-picker" aria-labelledby="body-picker-title">
        <p className="step-label">01 / WYBIERZ CZĘŚĆ CIAŁA</p>
        <h2 id="body-picker-title">Zacznij od ciała.</h2>
        <p className="body-picker-intro">
          Dotknij sylwetki lub wybierz obszar. Zobacz, przy których emocjach
          pojawia się na mapach.
        </p>
        <div className="body-area-buttons" aria-label="Części ciała">
          {regions.map((r) => (
            <button
              key={r.id}
              aria-pressed={region === r.id}
              onClick={() => onRegion(r.id)}
            >
              {r.name}
              <ArrowRight size={13} />
            </button>
          ))}
        </div>
        <BodyMap selected={region} onRegion={onRegion} compact />
        <p className="body-picker-caption">
          Jasny obszar oznacza wybór części ciała.
        </p>
      </aside>
      <section
        className="body-area-results"
        aria-labelledby="body-results-title"
      >
        <div className="body-results-heading">
          <div>
            <p className="step-label">02 / ODKRYWAJ EMOCJE I ODCZUCIA</p>
            <h2 id="body-results-title">{selectedRegion.name}</h2>
          </div>
          <button
            className="icon-button"
            onClick={onCopy}
            aria-label="Kopiuj link do tej części ciała"
            title="Kopiuj link"
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
          </button>
        </div>
        <p className="body-result-count" aria-live="polite">
          {matching.length} z {emotions.length} emocji w atlasie wyróżnia ten
          obszar.
        </p>
        <p className="body-results-intro">
          Jedno miejsce może wiązać się z różnymi emocjami. Poniżej znajdziesz
          wzorce z uproszczonych map i przykłady słów do opisania własnych
          odczuć.{" "}
          <a className="citation" href="#source-1">
            [1]
          </a>
        </p>
        <div className="body-copy-status" role="status">
          {copied
            ? "Link skopiowany"
            : copyError
              ? "Skopiuj adres z paska przeglądarki."
              : ""}
        </div>
        <div className="body-emotion-groups" aria-live="polite">
          {groups.map((group) => {
            const matches = matching.filter(
              (e) => e.regions[region] === group.id,
            );
            if (!matches.length) return null;
            return (
              <section
                className={`body-emotion-group ${group.id}`}
                key={group.id}
                aria-labelledby={`body-group-${group.id}`}
              >
                <h3 id={`body-group-${group.id}`}>
                  <span aria-hidden="true">
                    {group.id === "more" ? "↑" : "↓"}
                  </span>
                  {group.title}
                </h3>
                <p>{group.description}</p>
                <div className="body-emotion-cards">
                  {matches.map((e) => (
                    <article
                      className="body-emotion-card"
                      key={e.id}
                      aria-labelledby={`body-emotion-${e.id}`}
                    >
                      <div className="body-emotion-card-heading">
                        <span
                          className="body-emotion-face"
                          style={{ color: e.color, background: e.light }}
                        >
                          <EmotionFace id={e.id} size={27} />
                        </span>
                        <h4 id={`body-emotion-${e.id}`}>{e.name}</h4>
                      </div>
                      <p className="body-example-label">Przykładowe odczucia</p>
                      <ul>
                        {getSensationExamples(e.id, region).map((example) => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                      <button onClick={() => onEmotion(e)}>
                        Zobacz mapę emocji <ArrowUpRight size={14} />
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <div className="body-results-note">
          <Info size={16} />
          <p>
            Miejsce odczucia nie pozwala rozpoznać emocji. Przykłady są
            propozycjami opisu, nie wynikami pomiaru ani listą doznań, które
            musisz odczuwać.{" "}
            <a href="#source-3">O przykładach i ich źródłach</a>
          </p>
        </div>
        {remaining.length > 0 && (
          <details className="body-unmarked">
            <summary>Pozostałe emocje w atlasie ({remaining.length})</summary>
            <p>
              {remaining.map((e) => e.name).join(", ")}. W ich uproszczonych
              schematach nie wyróżniono tego obszaru. Nie oznacza to, że nie
              można w nim niczego odczuwać.
            </p>
          </details>
        )}
      </section>
    </div>
  );
}
