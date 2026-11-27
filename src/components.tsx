import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import type { Activity } from "./emotions";
import { activityLabels, activityShort } from "./activity";
import { t } from "./i18n";
import somaMark from "./assets/soma.svg";

export const sources = {
  1: {
    short: "Nummenmaa i in., 2014",
    title: "Bodily maps of emotions",
  },
  2: {
    short: "Nummenmaa i in., 2018",
    title: "Maps of subjective feelings",
  },
  3: { short: "NHS", title: "Anger" },
  4: { short: "NHS inform", title: "Anxiety self-help guide" },
  5: { short: "NHS", title: "Blushing" },
} as const;
export type SourceId = keyof typeof sources;

export function Cite({ n }: { n: SourceId }) {
  return (
    <a
      className="cite"
      href={`#zrodlo-${n}`}
      aria-label={t("Źródło {n}", { n })}
    >
      [{n}]
    </a>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  const size = compact ? 26 : 40;
  return (
    <a
      href={import.meta.env.BASE_URL}
      className={`brand ${compact ? "brand-compact" : ""}`}
    >
      <img src={somaMark} alt="" width={size} height={size} />
      <span className="brand-text">
        <span className="brand-name">soma</span>
        <span className="brand-caption">{t("Atlas emocji w ciele")}</span>
      </span>
    </a>
  );
}

export function ActivityMark({ state }: { state: Activity }) {
  return (
    <span className={`activity-mark ${state}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="16" height="16">
        {state === "more" ? (
          <path d="M8 12V4M4.5 7.5 8 4l3.5 3.5" />
        ) : state === "less" ? (
          <path d="M8 4v8M4.5 8.5 8 12l3.5-3.5" />
        ) : (
          <path d="M4.5 8h7" />
        )}
      </svg>
    </span>
  );
}

export function ActivityBadge({
  state,
  short = false,
}: {
  state: Activity;
  short?: boolean;
}) {
  return (
    <span className={`activity-badge ${state}`}>
      <ActivityMark state={state} />
      {t(short ? activityShort[state] : activityLabels[state])}
    </span>
  );
}

export function Legend() {
  return (
    <ul className="legend" aria-label={t("Legenda mapy")}>
      {(["more", "less", "none"] as const).map((state) => (
        <li key={state}>
          <span className={`swatch ${state}`} aria-hidden="true" />
          {t(activityLabels[state])}
        </li>
      ))}
    </ul>
  );
}

export function CopyLink({ label }: { label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  // Bumped on every click, so a repeated copy restarts the timer and is
  // announced again.
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(
      () => setStatus("idle"),
      status === "copied" ? 2400 : 8000,
    );
    return () => window.clearTimeout(timeout);
  }, [status, attempt]);
  async function copy() {
    setAttempt((n) => n + 1);
    try {
      const url = new URL(window.location.href);
      url.hash = "";
      await navigator.clipboard.writeText(url.href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  const message =
    status === "copied"
      ? t("Link skopiowany")
      : status === "error"
        ? t("Skopiuj adres z paska przeglądarki.")
        : "";
  return (
    <div className="copy-link">
      <button
        type="button"
        className="icon-button"
        onClick={copy}
        aria-label={label}
        title={t("Kopiuj link")}
      >
        {status === "copied" ? <Check size={17} /> : <Link2 size={17} />}
      </button>
      <span className="sr-only" role="status">
        {message && <span key={attempt}>{message}</span>}
      </span>
      {status === "error" && (
        <span className="copy-error" aria-hidden="true">
          {message}
        </span>
      )}
    </div>
  );
}
