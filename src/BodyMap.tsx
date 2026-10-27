import { t } from "./i18n";
import { useId } from "react";
import { regions } from "./emotions";
import type { Emotion, Region } from "./emotions";

const body =
  "M120 15 C102 15 94 29 95 46 C95 61 101 72 109 76 L108 87 C101 94 83 94 76 99 C65 105 61 117 57 136 L43 194 L26 250 C23 259 22 269 27 274 C30 277 33 271 35 264 C33 278 38 281 42 271 L49 252 L65 208 L79 158 C80 181 82 195 78 218 C74 240 74 257 79 279 L84 355 L88 446 L84 479 C82 490 86 494 98 493 C108 493 113 489 111 480 L110 449 L117 357 L120 294 L123 357 L130 449 L129 480 C127 489 132 493 142 493 C154 494 158 490 156 479 L152 446 L156 355 L161 279 C166 257 166 240 162 218 C158 195 160 181 161 158 L175 208 L191 252 L198 271 C202 281 207 278 205 264 C207 271 210 277 213 274 C218 269 217 259 214 250 L197 194 L183 136 C179 117 175 105 164 99 C157 94 139 94 132 87 L131 76 C139 72 145 61 145 46 C146 29 138 15 120 15 Z";
const positions: Record<
  Region,
  { x: number; y: number; rx: number; ry: number }[]
> = {
  head: [{ x: 120, y: 47, rx: 27, ry: 31 }],
  throat: [{ x: 120, y: 91, rx: 18, ry: 18 }],
  chest: [{ x: 120, y: 140, rx: 39, ry: 37 }],
  belly: [{ x: 120, y: 218, rx: 31, ry: 41 }],
  arms: [
    { x: 57, y: 197, rx: 17, ry: 67 },
    { x: 183, y: 197, rx: 17, ry: 67 },
  ],
  legs: [
    { x: 101, y: 374, rx: 20, ry: 106 },
    { x: 139, y: 374, rx: 20, ry: 106 },
  ],
};

export default function BodyMap({
  emotion,
  selected,
  onRegion,
  compact = false,
}: {
  emotion?: Emotion;
  selected?: Region | null;
  onRegion?: (r: Region) => void;
  compact?: boolean;
}) {
  const uid = useId().replaceAll(":", "");
  return (
    <svg
      className={`body-map ${compact ? "compact" : ""}`}
      viewBox="0 0 240 515"
      role={onRegion ? "group" : "img"}
      aria-label={
        emotion
          ? t("Mapa ciała: {emotion}", { emotion: t(emotion.name) })
          : t("Wybierz część ciała")
      }
    >
      <title>
        {emotion
          ? t("{emotion} — schemat odczuwanej aktywności", {
              emotion: t(emotion.name),
            })
          : t("Wybierz obszar na sylwetce")}
      </title>
      <desc>
        {emotion
          ? regions
              .filter((r) => emotion.regions[r.id])
              .map((r) =>
                t("{region}: {sensation} odczuwanej aktywności", {
                  region: t(r.name),
                  sensation: t(
                    emotion.regions[r.id] === "more"
                      ? t("wzrost")
                      : t("spadek"),
                  ),
                }),
              )
              .join(". ") + t(". Schemat poglądowy, bez skali liczbowej.")
          : t(
              "Sześć wybieranych obszarów ciała. Jasne zaznaczenie wskazuje wybrany obszar, nie aktywność emocji.",
            )}
      </desc>
      <defs>
        <clipPath id={`${uid}-clip`}>
          <path d={body} />
        </clipPath>
        <filter id={`${uid}-blur`} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <radialGradient id={`${uid}-warm`}>
          <stop offset="0" stopColor="#fff0ac" />
          <stop offset=".45" stopColor="#f6b951" />
          <stop offset=".75" stopColor="#e27b40" stopOpacity=".8" />
          <stop offset="1" stopColor="#de713b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-cool`}>
          <stop offset="0" stopColor="#9dc8e7" />
          <stop offset=".5" stopColor="#639bc1" />
          <stop offset="1" stopColor="#3f739f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-base`} x2="1" y2="1">
          <stop stopColor="#3d574b" />
          <stop offset="1" stopColor="#243e33" />
        </linearGradient>
      </defs>
      <path d={body} fill={`url(#${uid}-base)`} />
      {emotion ? (
        <g
          clipPath={`url(#${uid}-clip)`}
          className="heat-layer"
          key={emotion.id}
        >
          {regions.map(
            (r) =>
              emotion.regions[r.id] && (
                <g key={r.id} filter={`url(#${uid}-blur)`}>
                  {positions[r.id].map((p, i) => (
                    <ellipse
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      rx={p.rx * 1.28}
                      ry={p.ry * 1.15}
                      fill={`url(#${uid}-${emotion.regions[r.id] === "less" ? "cool" : "warm"})`}
                    />
                  ))}
                </g>
              ),
          )}
        </g>
      ) : (
        selected && (
          <g clipPath={`url(#${uid}-clip)`} aria-hidden="true">
            {positions[selected].map((p, i) => (
              <ellipse
                key={i}
                cx={p.x}
                cy={p.y}
                rx={p.rx}
                ry={p.ry}
                fill="#dce7b1"
                fillOpacity=".55"
              />
            ))}
          </g>
        )
      )}
      <path d={body} fill="none" stroke="#243e33" strokeOpacity=".14" />
      <g
        fill="none"
        stroke="#f5f3de"
        strokeOpacity=".13"
        strokeWidth=".8"
        pointerEvents="none"
      >
        <path d="M120 102v164M86 148q34 17 68 0M86 208q34 14 68 0M120 295v48" />
      </g>
      {onRegion &&
        regions.map((r) => (
          <g
            key={r.id}
            role="button"
            tabIndex={0}
            aria-label={t(r.name)}
            aria-pressed={selected === r.id}
            className={`body-region ${selected === r.id ? "selected" : ""}`}
            onClick={() => onRegion(r.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onRegion(r.id);
              }
            }}
          >
            <title>
              {t(r.name)} {t("— kliknij, aby poznać szczegóły")}
            </title>
            {positions[r.id].map((p, i) => (
              <ellipse
                key={i}
                cx={p.x}
                cy={p.y}
                rx={p.rx}
                ry={p.ry}
                fill="transparent"
                strokeWidth="1.5"
              />
            ))}
          </g>
        ))}
    </svg>
  );
}
