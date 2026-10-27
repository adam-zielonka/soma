import { t } from "./i18n";
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
      title: t("Wzrost odczuwanej aktywności"),
      description: t("W schemacie wyróżniono więcej odczuć w tym obszarze."),
    },
    {
      id: "less",
      title: t("Spadek odczuwanej aktywności"),
      description: t("W schemacie wyróżniono mniej odczuć w tym obszarze."),
    },
  ];
  return (
    <div className="region-explorer">
      <aside className="body-area-picker" aria-labelledby="body-picker-title">
        <p className="step-label">{t("01 / WYBIERZ CZĘŚĆ CIAŁA")}</p>
        <h2 id="body-picker-title">{t("Zacznij od ciała.")}</h2>
        <p className="body-picker-intro">
          {t(
            "Dotknij sylwetki lub wybierz obszar. Zobacz, przy których emocjach pojawia się na mapach.",
          )}{" "}
        </p>
        <div className="body-area-buttons" aria-label={t("Części ciała")}>
          {regions.map((r) => (
            <button
              key={r.id}
              aria-pressed={region === r.id}
              onClick={() => onRegion(r.id)}
            >
              {t(r.name)}
              <ArrowRight size={13} />
            </button>
          ))}
        </div>
        <BodyMap selected={region} onRegion={onRegion} compact />
        <p className="body-picker-caption">
          {t("Jasny obszar oznacza wybór części ciała.")}{" "}
        </p>
      </aside>
      <section
        className="body-area-results"
        aria-labelledby="body-results-title"
      >
        <div className="body-results-heading">
          <div>
            <p className="step-label">{t("02 / ODKRYWAJ EMOCJE I ODCZUCIA")}</p>
            <h2 id="body-results-title">{t(selectedRegion.name)}</h2>
          </div>
          <button
            className="icon-button"
            onClick={onCopy}
            aria-label={t("Kopiuj link do tej części ciała")}
            title={t("Kopiuj link")}
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
          </button>
        </div>
        <p className="body-result-count" aria-live="polite">
          {t("{count} z {total} emocji w atlasie wyróżnia ten obszar.", {
            count: matching.length,
            total: emotions.length,
          })}
        </p>
        <p className="body-results-intro">
          {t(
            "Jedno miejsce może wiązać się z różnymi emocjami. Poniżej znajdziesz wzorce z uproszczonych map i przykłady słów do opisania własnych odczuć.",
          )}{" "}
          <a className="citation" href="#source-1">
            [1]
          </a>
        </p>
        <div className="body-copy-status" role="status">
          {copied
            ? t("Link skopiowany")
            : copyError
              ? t("Skopiuj adres z paska przeglądarki.")
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
                        <h4 id={`body-emotion-${e.id}`}>{t(e.name)}</h4>
                      </div>
                      <p className="body-example-label">
                        {t("Przykładowe odczucia")}
                      </p>
                      <ul>
                        {getSensationExamples(e.id, region).map((example) => (
                          <li key={t(example)}>{t(example)}</li>
                        ))}
                      </ul>
                      <button onClick={() => onEmotion(e)}>
                        {t("Zobacz mapę emocji")} <ArrowUpRight size={14} />
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
            {t(
              "Miejsce odczucia nie pozwala rozpoznać emocji. Przykłady są propozycjami opisu, nie wynikami pomiaru ani listą doznań, które musisz odczuwać.",
            )}{" "}
            <a href="#source-3">{t("O przykładach i ich źródłach")}</a>
          </p>
        </div>
        {remaining.length > 0 && (
          <details className="body-unmarked">
            <summary>
              {t("Pozostałe emocje w atlasie ({count})", {
                count: remaining.length,
              })}
            </summary>
            <p>
              {remaining.map((e) => t(e.name)).join(", ")}
              {t(
                ". W ich uproszczonych schematach nie wyróżniono tego obszaru. Nie oznacza to, że nie można w nim niczego odczuwać.",
              )}{" "}
            </p>
          </details>
        )}
      </section>
    </div>
  );
}
