import { useId } from "react";
import { activityOf, regions, regionName } from "./emotions";
import type { Emotion, Region } from "./emotions";
import { t } from "./i18n";
import { activityLabels } from "./activity";

// Original, symmetric front-view outline (viewBox 240×515), generated as a
// smooth curve through hand-placed points; not traced from any source.
const body =
  "M120 16C124.3 16 129.5 16.7 133 19C136.5 21.3 139.2 25.5 141 30C142.8 34.5 144 40.8 144 46C144 51.2 142.5 56.8 141 61C139.5 65.2 136.8 68.3 135 71C133.2 73.7 130.7 74.7 130 77C129.3 79.3 130.5 82.3 131 85C131.5 87.7 130.8 90.8 133 93C135.2 95.2 139.2 96.5 144 98C148.8 99.5 157 100.2 162 102C167 103.8 170.8 105.7 174 109C177.2 112.3 179.2 115.8 181 122C182.8 128.2 183.5 137.5 185 146C186.5 154.5 188.3 164 190 173C191.7 182 193.2 191 195 200C196.8 209 199.2 218.3 201 227C202.8 235.7 204.5 245.5 206 252C207.5 258.5 209.2 261.2 210 266C210.8 270.8 211.5 276.5 211 281C210.5 285.5 209 290.5 207 293C205 295.5 201.3 297 199 296C196.7 295 194.3 290.8 193 287C191.7 283.2 191.7 277.3 191 273C190.3 268.7 190.3 267.2 189 261C187.7 254.8 185 244.8 183 236C181 227.2 179.2 217.3 177 208C174.8 198.7 172.3 188.8 170 180C167.7 171.2 164.8 155.7 163 155C161.2 154.3 160.3 168 159 176C157.7 184 156.2 194.3 155 203C153.8 211.7 152 220.5 152 228C152 235.5 153.8 241.7 155 248C156.2 254.3 158 259 159 266C160 273 161 279.3 161 290C161 300.7 159.8 317 159 330C158.2 343 156.7 356 156 368C155.3 380 155.7 390 155 402C154.3 414 153.2 429 152 440C150.8 451 148.2 461.3 148 468C147.8 474.7 150.8 476 151 480C151.2 484 151.7 489.7 149 492C146.3 494.3 138 495.3 135 494C132 492.7 131.5 488.3 131 484C130.5 479.7 131.7 475.3 132 468C132.3 460.7 132.8 451 133 440C133.2 429 133.3 414 133 402C132.7 390 132 380.7 131 368C130 355.3 128.3 339 127 326C125.7 313 124.2 298.7 123 290C121.8 281.3 121 274 120 274C119 274 118.2 281.3 117 290C115.8 298.7 114.3 313 113 326C111.7 339 110 355.3 109 368C108 380.7 107.3 390 107 402C106.7 414 106.8 429 107 440C107.2 451 107.7 460.7 108 468C108.3 475.3 109.5 479.7 109 484C108.5 488.3 108 492.7 105 494C102 495.3 93.7 494.3 91 492C88.3 489.7 88.8 484 89 480C89.2 476 92.2 474.7 92 468C91.8 461.3 89.2 451 88 440C86.8 429 85.7 414 85 402C84.3 390 84.7 380 84 368C83.3 356 81.8 343 81 330C80.2 317 79 300.7 79 290C79 279.3 80 273 81 266C82 259 83.8 254.3 85 248C86.2 241.7 88 235.5 88 228C88 220.5 86.2 211.7 85 203C83.8 194.3 82.3 184 81 176C79.7 168 78.8 154.3 77 155C75.2 155.7 72.3 171.2 70 180C67.7 188.8 65.2 198.7 63 208C60.8 217.3 59 227.2 57 236C55 244.8 52.3 254.8 51 261C49.7 267.2 49.7 268.7 49 273C48.3 277.3 48.3 283.2 47 287C45.7 290.8 43.3 295 41 296C38.7 297 35 295.5 33 293C31 290.5 29.5 285.5 29 281C28.5 276.5 29.2 270.8 30 266C30.8 261.2 32.5 258.5 34 252C35.5 245.5 37.2 235.7 39 227C40.8 218.3 43.2 209 45 200C46.8 191 48.3 182 50 173C51.7 164 53.5 154.5 55 146C56.5 137.5 57.2 128.2 59 122C60.8 115.8 62.8 112.3 66 109C69.2 105.7 73 103.8 78 102C83 100.2 91.2 99.5 96 98C100.8 96.5 104.8 95.2 107 93C109.2 90.8 108.5 87.7 109 85C109.5 82.3 110.7 79.3 110 77C109.3 74.7 106.8 73.7 105 71C103.2 68.3 100.5 65.2 99 61C97.5 56.8 96 51.2 96 46C96 40.8 97.2 34.5 99 30C100.8 25.5 103.5 21.3 107 19C110.5 16.7 115.7 16 120 16Z";

type Rect = { x: number; y: number; w: number; h: number };
const rectPath = ({ x, y, w, h }: Rect) => `M${x} ${y}h${w}v${h}h${-w}Z`;
type Glow = { x: number; y: number; rx: number; ry: number; rotate?: number };

// Each simplified area is a feathered mask (clipped to the outline) with a
// glow inside it, so a glow never spills into a neighbouring area.
// Masks are rectangles or, for the arms, paths that keep the torso out.
const areas: Record<Region, { mask: string[]; glow: Glow[] }> = {
  head: {
    mask: [rectPath({ x: 84, y: 0, w: 72, h: 78 })],
    glow: [{ x: 120, y: 46, rx: 30, ry: 38 }],
  },
  throat: {
    mask: [rectPath({ x: 100, y: 76, w: 40, h: 18 })],
    glow: [{ x: 120, y: 85, rx: 17, ry: 13 }],
  },
  chest: {
    mask: [rectPath({ x: 78, y: 94, w: 84, h: 92 })],
    glow: [{ x: 120, y: 138, rx: 46, ry: 46 }],
  },
  belly: {
    mask: [rectPath({ x: 76, y: 186, w: 88, h: 96 })],
    glow: [{ x: 120, y: 232, rx: 42, ry: 54 }],
  },
  arms: {
    mask: ["M0 94H78L78 155L64 304H0Z", "M240 94H162L162 155L176 304H240Z"],
    glow: [
      { x: 52, y: 200, rx: 24, ry: 108, rotate: 8.5 },
      { x: 188, y: 200, rx: 24, ry: 108, rotate: -8.5 },
    ],
  },
  legs: {
    mask: [rectPath({ x: 60, y: 282, w: 120, h: 233 })],
    glow: [
      { x: 101, y: 386, rx: 26, ry: 118 },
      { x: 139, y: 386, rx: 26, ry: 118 },
    ],
  },
};

const underlay = { more: "#e08a63", less: "#3f7fb3", felt: "#d4a84a" };

export function describeMap(emotion: Emotion) {
  return regions
    .map(
      (r) =>
        `${t(r.name)}: ${t(activityLabels[activityOf(emotion, r.id)]).toLowerCase()}`,
    )
    .join("; ");
}

/**
 * Original illustration of a qualitative body map. Warm glow = increased felt
 * activity, cool hatched glow = decreased felt activity, golden glow = where a
 * feeling is felt (maps without decreases). Without an emotion it renders a
 * neutral figure for choosing a body area.
 */
export default function BodyMap({
  emotion,
  selected = null,
  onRegion,
  mini = false,
}: {
  emotion?: Emotion;
  selected?: Region | null;
  onRegion?: (region: Region) => void;
  mini?: boolean;
}) {
  const id = `m${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const url = (name: string) => `url(#${id}-${name})`;
  const label = emotion
    ? t("Mapa ciała: {emotion}", { emotion: t(emotion.name) })
    : t("Sylwetka do wyboru obszaru ciała");
  return (
    <svg
      className={`body-map${mini ? " mini" : ""}`}
      viewBox="0 0 240 515"
      role={mini ? undefined : "img"}
      aria-hidden={mini ? true : undefined}
      aria-label={mini ? undefined : label}
      focusable="false"
    >
      {!mini && (
        <desc>
          {emotion
            ? `${describeMap(emotion)}. ${t("Schemat poglądowy, bez skali natężenia.")}`
            : selected
              ? t("Zaznaczony obszar: {region}.", {
                  region: t(regionName(selected)),
                })
              : t("Sylwetka bez zaznaczonego obszaru.")}
        </desc>
      )}
      <defs>
        <clipPath id={`${id}-body`}>
          <path d={body} />
        </clipPath>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={mini ? 6 : 8} />
        </filter>
        <filter
          id={`${id}-feather`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
        {regions.map((r) => (
          <mask
            key={r.id}
            id={`${id}-${r.id}`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="240"
            height="515"
          >
            <g filter={url("feather")}>
              {areas[r.id].mask.map((d) => (
                <path key={d} d={d} fill="#fff" />
              ))}
            </g>
          </mask>
        ))}
        <radialGradient id={`${id}-more`}>
          <stop offset="0" stopColor="#fff1c9" />
          <stop offset=".4" stopColor="#ffbd78" />
          <stop offset=".75" stopColor="#ef7656" stopOpacity=".8" />
          <stop offset="1" stopColor="#d9604f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-felt`}>
          <stop offset="0" stopColor="#fff8d6" />
          <stop offset=".4" stopColor="#f5d572" />
          <stop offset=".75" stopColor="#d9a93f" stopOpacity=".8" />
          <stop offset="1" stopColor="#c7922f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-less`}>
          <stop offset="0" stopColor="#bfe8f5" />
          <stop offset=".45" stopColor="#58acd6" />
          <stop offset=".8" stopColor="#3a7bb0" stopOpacity=".75" />
          <stop offset="1" stopColor="#2f659c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-base`} x2="1" y2="1">
          <stop stopColor="#7d7284" />
          <stop offset="1" stopColor="#655a6e" />
        </linearGradient>
        <pattern
          id={`${id}-hatch`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            stroke="#12314f"
            strokeWidth="1.8"
          />
        </pattern>
      </defs>
      <path d={body} fill={url("base")} />
      <g clipPath={url("body")}>
        {emotion && (
          <g className="heat-layer" key={emotion.id}>
            {regions.map((r) => {
              const state = emotion.regions[r.id];
              if (!state) return null;
              return (
                <g key={r.id} mask={url(r.id)}>
                  {/* Flat tint under the glow, so neighbouring highlighted
                      areas meet in colour rather than in a dark seam. */}
                  <rect
                    width="240"
                    height="515"
                    fill={underlay[state]}
                    opacity=".4"
                  />
                  <g filter={url("blur")}>
                    {areas[r.id].glow.map((g, i) => (
                      <ellipse
                        key={i}
                        cx={g.x}
                        cy={g.y}
                        rx={g.rx}
                        ry={g.ry}
                        transform={
                          g.rotate
                            ? `rotate(${g.rotate} ${g.x} ${g.y})`
                            : undefined
                        }
                        fill={url(state)}
                      />
                    ))}
                  </g>
                  {state === "less" && !mini && (
                    <rect
                      width="240"
                      height="515"
                      fill={url("hatch")}
                      opacity=".3"
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}
        {selected && (
          <g mask={url(selected)} className="selected-area">
            <rect
              width="240"
              height="515"
              fill={emotion ? "#ffffff" : "#efe2f6"}
              fillOpacity={emotion ? 0.2 : 0.55}
            />
          </g>
        )}
        {selected && !mini && (
          <g className="selected-edge" aria-hidden="true">
            {areas[selected].mask.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )}
      </g>
      <path d={body} fill="none" className="body-outline" />
      {selected && (
        <g mask={url(selected)} aria-hidden="true">
          <path d={body} fill="none" className="selected-outline" />
        </g>
      )}
      {onRegion && (
        <g className="hit-areas" clipPath={url("body")}>
          {regions.map((r) => (
            <g
              key={r.id}
              className="hit-area"
              data-region={r.id}
              filter={url("feather")}
              onClick={() => onRegion(r.id)}
            >
              <title>{t(r.name)}</title>
              {areas[r.id].mask.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
