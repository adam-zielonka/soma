import { t, language } from "./i18n";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { useChoiceStrip } from "./useChoiceStrip";
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
  const pickerRef = useChoiceStrip(region, language);
  const selectedRegion = regions.find((r) => r.id === region)!;
  const matching = emotions.filter((e) => e.regions[region]);
  const remaining = emotions.filter((e) => !e.regions[region]);
  const groups: { id: Sensation; title: string }[] = [
    {
      id: "more",
      title: t("Wzrost odczuwanej aktywności"),
    },
    {
      id: "less",
      title: t("Spadek odczuwanej aktywności"),
    },
  ];
  return (
    <div className="region-explorer">
      <aside className="body-area-picker" aria-labelledby="body-picker-title">
        <h2 id="body-picker-title">{t("Wybierz obszar")}</h2>
        <div
          className="body-area-buttons"
          ref={pickerRef}
          aria-label={t("Części ciała")}
        >
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
      </aside>
      <div className="map-panel">
        <h2 id="body-results-title">{t(selectedRegion.name)}</h2>
        <div className="single-map">
          <BodyMap selected={region} onRegion={onRegion} />
        </div>
        <a className="region-jump" href="#related-emotions">
          {t("Powiązane emocje")} ({matching.length}) <ArrowRight size={14} />
        </a>
        <p className="body-picker-caption">
          {t("Autorski schemat na podstawie samoopisów uczestników badania.")}{" "}
          <a className="citation" href="#source-1">
            [1]
          </a>
        </p>
      </div>
      <section
        className="body-area-results"
        aria-labelledby="body-results-title"
      >
        <div className="body-results-heading">
          <h2 id="related-emotions" tabIndex={-1}>
            {t("Powiązane emocje")}
          </h2>
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
              <details
                className={`body-emotion-group ${group.id}`}
                key={group.id}
                aria-labelledby={`body-group-${group.id}`}
              >
                <summary id={`body-group-${group.id}`}>
                  {group.title} ({matches.length})
                </summary>

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
                      <details>
                        <summary>{t("Przykładowe odczucia")}</summary>
                        <ul>
                          {getSensationExamples(e.id, region).map((example) => (
                            <li key={t(example)}>{t(example)}</li>
                          ))}
                        </ul>
                      </details>
                      <button onClick={() => onEmotion(e)}>
                        {t("Zobacz mapę emocji")} <ArrowUpRight size={14} />
                      </button>
                    </article>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
        <details className="fold">
          <summary>{t("O przykładach i ich źródłach")}</summary>
          <p>
            {t(
              "Miejsce odczucia nie pozwala rozpoznać emocji. Przykłady są propozycjami opisu, nie wynikami pomiaru ani listą doznań, które musisz odczuwać.",
            )}{" "}
            <a href="#source-3">{t("O przykładach i ich źródłach")}</a>
          </p>
        </details>
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
