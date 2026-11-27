export type Region = "head" | "throat" | "chest" | "belly" | "arms" | "legs";
export type Sensation = "more" | "less";
export type Activity = Sensation | "none";
export type EmotionGroup = "basic" | "complex";
export type EmotionId =
  | "anger"
  | "fear"
  | "disgust"
  | "joy"
  | "sadness"
  | "surprise"
  | "anxiety"
  | "love"
  | "contempt"
  | "pride"
  | "shame"
  | "envy";

export interface Emotion {
  id: EmotionId;
  name: string;
  group: EmotionGroup;
  /** One sentence summarising the map; must stay consistent with `regions`. */
  description: string;
  regions: Partial<Record<Region, Sensation>>;
  /** Authored self-observation prompt, not derived from the study. */
  prompt: string;
}

export const regions: { id: Region; name: string }[] = [
  { id: "head", name: "Głowa" },
  { id: "throat", name: "Gardło" },
  { id: "chest", name: "Klatka piersiowa" },
  { id: "belly", name: "Brzuch" },
  { id: "arms", name: "Ręce" },
  { id: "legs", name: "Nogi" },
];

export const groups: { id: EmotionGroup; name: string }[] = [
  { id: "basic", name: "Emocje podstawowe" },
  { id: "complex", name: "Emocje złożone" },
];

export function activityOf(emotion: Emotion, region: Region): Activity {
  return emotion.regions[region] ?? "none";
}

export function findRegion(id: string | null): Region | null {
  return regions.find((r) => r.id === id)?.id ?? null;
}

export function regionName(id: Region): string {
  return regions.find((r) => r.id === id)!.name;
}

// Qualitative editorial reading of Figure 2 in Nummenmaa et al. (2014),
// in the order used by the figure (basic emotions, then nonbasic ones).
// Rule: "more"/"less" only where warm or cool colours clearly dominate the
// area; mostly black (no significant change), faint or partial tints stay
// unmarked. Checked on 2026-11-27 by two independent readers of the figure.
// Glow geometry is illustrative, not digitized.
export const emotions: Emotion[] = [
  {
    id: "anger",
    name: "Złość",
    group: "basic",
    description:
      "Wzrost odczuwanej aktywności w górnej połowie ciała: w głowie, szyi, klatce piersiowej i rękach, najwyraźniej w dłoniach.",
    regions: { head: "more", throat: "more", chest: "more", arms: "more" },
    prompt:
      "Zauważ ułożenie dłoni i ramion. Co odczuwasz, nie próbując tego zmieniać?",
  },
  {
    id: "fear",
    name: "Strach",
    group: "basic",
    description:
      "Wzrost odczuwanej aktywności najwyraźniejszy w szyi i klatce piersiowej, mniej wyraźny w głowie i górnej części brzucha.",
    regions: { head: "more", throat: "more", chest: "more", belly: "more" },
    prompt: "Gdzie teraz czujesz podparcie? Zauważ kontakt stóp z podłożem.",
  },
  {
    id: "disgust",
    name: "Wstręt",
    group: "basic",
    description:
      "Wzrost odczuwanej aktywności najwyraźniejszy wokół ust i gardła, widoczny też w okolicy żołądka.",
    regions: { head: "more", throat: "more", chest: "more", belly: "more" },
    prompt:
      "Czy chcesz się od czegoś odsunąć? Zauważ tę reakcję bez oceniania.",
  },
  {
    id: "joy",
    name: "Radość",
    group: "basic",
    description:
      "Wzrost odczuwanej aktywności w całym ciele, najwyraźniejszy w twarzy i klatce piersiowej.",
    regions: {
      head: "more",
      throat: "more",
      chest: "more",
      belly: "more",
      arms: "more",
      legs: "more",
    },
    prompt:
      "Przypomnij sobie drobną przyjemność. Gdzie najłatwiej zauważyć jej ślad?",
  },
  {
    id: "sadness",
    name: "Smutek",
    group: "basic",
    description:
      "Wyraźny spadek odczuwanej aktywności rąk i nóg; mniej wyraźny wzrost w środku klatki piersiowej, szyi i twarzy.",
    regions: {
      head: "more",
      throat: "more",
      chest: "more",
      arms: "less",
      legs: "less",
    },
    prompt:
      "Czy ciało wydaje się dziś cięższe, lżejsze, a może nie zauważasz różnicy?",
  },
  {
    id: "surprise",
    name: "Zaskoczenie",
    group: "basic",
    description:
      "Wzrost odczuwanej aktywności w głowie, szyi i klatce piersiowej, spadek w nogach.",
    regions: { head: "more", throat: "more", chest: "more", legs: "less" },
    prompt:
      "Przypomnij sobie ostatnie zaskoczenie. Co jako pierwsze zwróciło Twoją uwagę?",
  },
  {
    id: "anxiety",
    name: "Lęk",
    group: "complex",
    description:
      "Wzrost odczuwanej aktywności najwyraźniejszy w szyi, klatce piersiowej i górnej części brzucha, spadek w nogach.",
    regions: {
      head: "more",
      throat: "more",
      chest: "more",
      belly: "more",
      legs: "less",
    },
    prompt: "Zauważ jeden przedmiot w otoczeniu. Jaki ma kolor i kształt?",
  },
  {
    id: "love",
    name: "Miłość",
    group: "complex",
    description:
      "Rozległy wzrost odczuwanej aktywności od głowy po biodra, także w rękach.",
    regions: {
      head: "more",
      throat: "more",
      chest: "more",
      belly: "more",
      arms: "more",
    },
    prompt:
      "Pomyśl o kimś bliskim lub o miejscu, w którym czujesz się dobrze. Co zauważasz?",
  },
  {
    id: "contempt",
    name: "Pogarda",
    group: "complex",
    description:
      "Wzrost odczuwanej aktywności niemal wyłącznie w głowie i szyi; reszta ciała w większości bez wyróżnienia.",
    regions: { head: "more", throat: "more" },
    prompt:
      "Zauważ wyraz twarzy i ułożenie szczęki. Co czujesz, kiedy nie próbujesz tego zmienić?",
  },
  {
    id: "pride",
    name: "Duma",
    group: "complex",
    description:
      "Wzrost odczuwanej aktywności najwyraźniejszy w głowie i klatce piersiowej, mniej wyraźny w rękach.",
    regions: { head: "more", throat: "more", chest: "more", arms: "more" },
    prompt:
      "Przypomnij sobie coś, co Ci się udało. Jak układa się teraz Twoje ciało?",
  },
  {
    id: "shame",
    name: "Wstyd",
    group: "complex",
    description:
      "Wzrost odczuwanej aktywności w twarzy, szyi i środku klatki piersiowej, spadek w rękach i nogach.",
    regions: {
      head: "more",
      throat: "more",
      chest: "more",
      arms: "less",
      legs: "less",
    },
    prompt:
      "Czy możesz znaleźć dla siebie odrobinę wygodniejszą pozycję, bez zmuszania się do czegokolwiek?",
  },
  {
    id: "envy",
    name: "Zazdrość",
    group: "complex",
    description:
      "Wzrost odczuwanej aktywności w głowie i szyi oraz w jednym miejscu w środku klatki piersiowej.",
    regions: { head: "more", throat: "more", chest: "more" },
    prompt:
      "Co jest dla Ciebie ważne w tej sytuacji? Możesz zauważyć tę potrzebę bez oceniania siebie.",
  },
];

export const defaultEmotion = emotions.find((e) => e.id === "joy")!;

export function findEmotion(id: string | null, fallback = defaultEmotion) {
  return emotions.find((e) => e.id === id) ?? fallback;
}
