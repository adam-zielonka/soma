import type { EmotionId } from "./emotions";

export default function EmotionFace({
  id,
  size = 28,
}: {
  id: EmotionId;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="12" />
      {id === "love" ? (
        <>
          <path
            d="M8 11c0-3 4-3 4 0 0-3 4-3 4 0 0 2-4 5-4 5s-4-3-4-5ZM18 11c0-3 4-3 4 0 0-3 4-3 4 0 0 2-4 5-4 5s-4-3-4-5Z"
            strokeWidth="1"
          />
        </>
      ) : id === "anger" ? (
        <>
          <path d="m9 10 4 2m10-2-4 2" />
          <path d="M11 15h1m8 0h1" />
        </>
      ) : id === "fear" || id === "anxiety" ? (
        <>
          <path d="m9 10 4-2m10 2-4-2" />
          <ellipse cx="11.5" cy="14" rx="1" ry="2" />
          <ellipse cx="20.5" cy="14" rx="1" ry="2" />
        </>
      ) : (
        <>
          <path
            d={
              id === "joy" || id === "pride"
                ? "M9 13q2-3 4 0m6 0q2-3 4 0"
                : "M11 12v2m10-2v2"
            }
          />
        </>
      )}
      {id === "joy" || id === "love" || id === "pride" ? (
        <path d="M11 20q5 6 10 0" />
      ) : id === "shame" ? (
        <>
          <path d="M11 23q5-4 10 0M7 18l3 1m12 0 3-1" />
        </>
      ) : id === "contempt" ? (
        <path d="M11 22q6 2 11-3" />
      ) : id === "envy" ? (
        <path d="m9 9 4 1m6 0 4-1M12 22h8" />
      ) : id === "anxiety" ? (
        <path d="m11 22 3-1 3 1 4-1" />
      ) : id === "sadness" ? (
        <path d="M11 23q5-6 10 0" />
      ) : id === "fear" || id === "surprise" ? (
        <ellipse cx="16" cy="22" rx="3" ry="3.5" />
      ) : id === "disgust" ? (
        <path d="m11 21 3-2 3 3 4-2" />
      ) : (
        <path d="M12 22q4-3 8 0" />
      )}
    </svg>
  );
}
