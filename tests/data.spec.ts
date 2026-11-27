import { readdirSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { PAGE_DESCRIPTION, PAGE_TITLE, translations } from "../src/i18n";
import { emotions, groups, regions } from "../src/emotions";
import { regionNotes } from "../src/research";
import { activityLabels, activityShort } from "../src/activity";
import {
  allExampleStrings,
  areaExamples,
  emotionExamples,
  exampleSources,
  sourceNotes,
} from "../src/sensationExamples";

// Pure data checks; they do not need a browser, so run them once.
test.skip(({ isMobile }) => isMobile, "data checks run in the desktop project");

const normalise = (text: string) => text.replace(/\s+/g, " ").trim();

test("every user-visible Polish string has exactly one English translation", () => {
  const sourceDir = new URL("../src/", import.meta.url);
  const literals = readdirSync(sourceDir)
    .filter((file) => /\.(tsx|ts)$/.test(file) && file !== "i18n.ts")
    .flatMap((file) =>
      [
        ...readFileSync(new URL(file, sourceDir), "utf8").matchAll(
          // t("…") calls and `label: "…"` fields that are passed to t() later.
          /(?:\bt\(\s*|\blabel:\s*)"((?:[^"\\]|\\.)*)"/g,
        ),
      ].map((match) => match[1]),
    );
  const data = [
    ...emotions.flatMap((e) => [e.name, e.description, e.prompt]),
    ...regions.map((r) => r.name),
    ...groups.map((g) => g.name),
    ...Object.values(regionNotes).flatMap((note) =>
      note.figure ? [note.authors, note.figure] : [note.authors],
    ),
    ...Object.values(activityLabels),
    ...Object.values(activityShort),
    ...allExampleStrings,
    ...Object.values(sourceNotes),
  ];
  const used = new Set(
    [...literals, ...data, PAGE_TITLE, PAGE_DESCRIPTION].map(normalise),
  );
  const missing = [...used].filter((key) => !(key in translations));
  expect(missing).toEqual([]);
  const unused = Object.keys(translations).filter((key) => !used.has(key));
  expect(unused, "translation keys that nothing uses").toEqual([]);
  expect(literals.length).toBeGreaterThan(50);
});

test("examples exist exactly for the areas each map highlights", () => {
  for (const emotion of emotions)
    for (const region of regions) {
      const highlighted = Boolean(emotion.regions[region.id]);
      expect(
        Boolean(emotionExamples(emotion.id, region.id)),
        `${emotion.id}/${region.id}`,
      ).toBe(highlighted);
      expect(areaExamples(region.id)).toHaveLength(2);
    }
  for (const [emotion, byRegion] of Object.entries(exampleSources))
    for (const region of Object.keys(byRegion!))
      expect(
        emotions.find((e) => e.id === emotion)!.regions[
          region as keyof typeof byRegion
        ],
      ).toBeTruthy();
});

test("descriptions mention every highlighted limb area and no unmarked one", () => {
  const words: Record<string, RegExp> = {
    arms: /rękach|rąk|dłoniach/,
    legs: /nogach|nóg|nogi|\buda\b|udach|udami/,
  };
  for (const emotion of emotions)
    for (const [region, pattern] of Object.entries(words)) {
      const marked = Boolean(emotion.regions[region as "arms" | "legs"]);
      const mentioned = pattern.test(emotion.description);
      if (emotion.id === "joy") continue; // "w całym ciele" covers the limbs
      expect(mentioned, `${emotion.id} ${region}`).toBe(marked);
    }
});
