import type { SourceId } from "./sources";

export type Region = "head" | "throat" | "chest" | "belly" | "arms" | "legs";
/**
 * "more"/"less": increased or decreased felt activity (two-silhouette maps).
 * "felt": the area where a feeling is clearly felt, from maps that recorded
 * no decrease (Nummenmaa et al., 2018).
 */
export type Sensation = "more" | "less" | "felt";
export type Activity = Sensation | "none";
export type EmotionGroup = "basic" | "complex" | "later" | "feelings";
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
  | "envy"
  | "hope"
  | "amusement"
  | "interest"
  | "compassion"
  | "gratitude"
  | "longing"
  | "despair"
  | "nervousness"
  | "hostility";

export interface Emotion {
  id: EmotionId;
  name: string;
  group: EmotionGroup;
  /** The study whose figure this map redraws. */
  source: SourceId;
  /** One sentence summarising the map; must stay consistent with `regions`. */
  description: string;
  regions: Partial<Record<Region, Sensation>>;
  /** The authors' own interpretation of this map, if they gave one. */
  authorsNote?: string;
  /** Authored self-observation prompt, not derived from the study. */
  prompt: string;
  /** false when the prompt itself says the exercise can be skipped. */
  reflectionHelp?: false;
}

export const regions: { id: Region; name: string }[] = [
  { id: "head", name: "Głowa" },
  { id: "throat", name: "Gardło" },
  { id: "chest", name: "Klatka piersiowa" },
  { id: "belly", name: "Brzuch" },
  { id: "arms", name: "Ręce" },
  { id: "legs", name: "Nogi" },
];

export const groups: { id: EmotionGroup; name: string; note?: string }[] = [
  { id: "basic", name: "Emocje podstawowe" },
  { id: "complex", name: "Emocje złożone" },
  { id: "later", name: "Z nowszych badań" },
  {
    id: "feelings",
    name: "Inne uczucia",
    note: "Mapy bez podziału na wzrost i spadek",
  },
];

/** Maps that record only where a feeling is felt, without decreases. */
export function isFeltMap(emotion: Emotion) {
  return emotion.group === "feelings";
}

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
    source: 1,
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
    source: 1,
    description:
      "Wzrost odczuwanej aktywności najwyraźniejszy w szyi i klatce piersiowej, mniej wyraźny w głowie i górnej części brzucha.",
    regions: { head: "more", throat: "more", chest: "more", belly: "more" },
    prompt: "Gdzie teraz czujesz podparcie? Zauważ kontakt stóp z podłożem.",
  },
  {
    id: "disgust",
    name: "Wstręt",
    group: "basic",
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
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
    source: 1,
    description:
      "Wzrost odczuwanej aktywności w głowie i szyi oraz w jednym miejscu w środku klatki piersiowej.",
    regions: { head: "more", throat: "more", chest: "more" },
    prompt:
      "Co jest dla Ciebie ważne w tej sytuacji? Możesz zauważyć tę potrzebę bez oceniania siebie.",
  },
  // Vik et al. (2026), PNAS, Fig. 1A, non-political hope (N = 992, US).
  // Read 2026-11-28 by two independent readers, who agreed on every area.
  {
    id: "hope",
    name: "Nadzieja",
    group: "later",
    source: 6,
    description:
      "Wzrost odczuwanej aktywności w głowie, szyi i klatce piersiowej, najwyraźniejszy w środku klatki piersiowej i w głowie.",
    regions: { head: "more", throat: "more", chest: "more" },
    prompt:
      "Pomyśl o czymś, na co czekasz z nadzieją. Czy zauważasz to gdzieś w ciele?",
  },
  // Zhang, Zerwas & Keltner (2025), Cognition and Emotion, Fig. 2: three
  // groups of US students (Chinese, European and Latino/a American, n = 72,
  // 79 and 57). An area is marked when it is clear in at least two groups;
  // Soma shows only emotions whose marked area is clear in all three.
  // The authors report high agreement between the groups for all emotions,
  // but awe, triumph and desire had no area clear in all three groups here
  // (the Latino/a maps were faint); contentment and relief were almost blank.
  // Read 2026-11-28 by two independent readers.
  {
    id: "amusement",
    name: "Rozbawienie",
    group: "later",
    source: 7,
    description:
      "Wzrost odczuwanej aktywności niemal wyłącznie w głowie, najwyraźniejszy w twarzy; reszta ciała w większości bez wyróżnienia.",
    regions: { head: "more" },
    authorsNote:
      "Autorzy wiążą ze śmiechem pracę mięśni wokół ust oraz układu oddechowego i krążenia.",
    prompt:
      "Przypomnij sobie coś, co Cię ostatnio rozbawiło. Co dzieje się z Twoją twarzą?",
  },
  {
    id: "interest",
    name: "Zainteresowanie",
    group: "later",
    source: 7,
    description:
      "Wzrost odczuwanej aktywności niemal wyłącznie w głowie, najwyraźniejszy w okolicy czoła i na czubku głowy; reszta ciała w większości bez wyróżnienia.",
    regions: { head: "more" },
    prompt:
      "Przyjrzyj się uważnie jednej rzeczy obok siebie. Co zauważasz w oczach i w głowie?",
  },
  {
    id: "compassion",
    name: "Współczucie",
    group: "later",
    source: 7,
    description:
      "Wzrost odczuwanej aktywności w środku klatki piersiowej; reszta ciała w większości bez wyróżnienia.",
    regions: { chest: "more" },
    prompt:
      "Pomyśl życzliwie o kimś, komu jest teraz trudno. Czy czujesz tę życzliwość gdzieś w ciele?",
  },
  // Nummenmaa et al. (2018), PNAS, Fig. 3 and its high-resolution version in
  // the SI. Participants coloured only where a feeling is felt (no decrease);
  // "felt" marks areas where bright colour (effect size of about 0.5 or more)
  // clearly dominates. Guilt, loneliness, disappointment, sympathy, social
  // exclusion and ostracism stayed below that threshold; togetherness, closeness
  // and social longing repeat the chest pattern shown here.
  // Read 2026-11-28 by two independent readers, who agreed on every area.
  {
    id: "gratitude",
    name: "Wdzięczność",
    group: "feelings",
    source: 2,
    description:
      "Wyraźne odczucia w środku klatki piersiowej; reszta ciała bez wyróżnienia.",
    regions: { chest: "felt" },
    prompt:
      "Przypomnij sobie coś, za co czujesz wdzięczność. Co dzieje się wtedy z Twoim oddechem?",
  },
  {
    id: "longing",
    name: "Tęsknota",
    group: "feelings",
    source: 2,
    description:
      "Wyraźne odczucia w górnej i środkowej części klatki piersiowej; reszta ciała bez wyróżnienia.",
    regions: { chest: "felt" },
    prompt:
      "Pomyśl przez chwilę o kimś lub o miejscu, za którym tęsknisz. Co zauważasz w klatce piersiowej?",
  },
  {
    id: "despair",
    name: "Rozpacz",
    group: "feelings",
    source: 2,
    description:
      "Wyraźne odczucia w środku klatki piersiowej; reszta ciała bez wyróżnienia.",
    regions: { chest: "felt" },
    prompt:
      "Jeśli jest Ci teraz bardzo ciężko, nie musisz robić tego ćwiczenia. Porozmawiaj z kimś bliskim, z lekarzem albo z telefonem zaufania; w nagłym zagrożeniu zadzwoń pod 112. Jeśli chcesz, rozejrzyj się wokół i zauważ kilka spokojnych oddechów.",
    reflectionHelp: false,
  },
  {
    id: "nervousness",
    name: "Podenerwowanie",
    group: "feelings",
    source: 2,
    description:
      "Wyraźne odczucia w brzuchu, najwyraźniejsze w okolicy żołądka; reszta ciała bez wyróżnienia.",
    regions: { belly: "felt" },
    prompt:
      "Zauważ, czy coś napina się w okolicy żołądka. Możesz zrobić kilka dłuższych wydechów, ale nie musisz niczego zmieniać.",
  },
  {
    id: "hostility",
    name: "Wrogość",
    group: "feelings",
    source: 2,
    description:
      "Wyraźne odczucia w całej głowie; reszta ciała bez wyróżnienia.",
    regions: { head: "felt" },
    prompt:
      "Zauważ szczękę i czoło. Czy możesz je odrobinę rozluźnić, nie zmieniając niczego innego?",
  },
];

export const defaultEmotion = emotions.find((e) => e.id === "joy")!;

export function findEmotion(id: string | null, fallback = defaultEmotion) {
  return emotions.find((e) => e.id === id) ?? fallback;
}
