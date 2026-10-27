export type Region = "head" | "throat" | "chest" | "belly" | "arms" | "legs";
export type Sensation = "more" | "less";
export type EmotionId =
  | "joy"
  | "sadness"
  | "anger"
  | "fear"
  | "disgust"
  | "surprise"
  | "love"
  | "pride";
export interface Emotion {
  id: EmotionId;
  name: string;
  english: string;
  color: string;
  light: string;
  word: string;
  description: string;
  regions: Partial<Record<Region, Sensation>>;
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
// Qualitative editorial interpretation of Fig. 2, Nummenmaa et al. (2014).
// Categories and glow geometry are illustrative, not digitized measurements.
export const emotions: Emotion[] = [
  {
    id: "joy",
    name: "Radość",
    english: "Happiness",
    color: "#9b651d",
    light: "#f4e7bb",
    word: "Ciepło, które się rozchodzi.",
    description:
      "Radość wyróżniała się wzrostem odczuwanej aktywności w niemal całym ciele. [1]",
    regions: {
      head: "more",
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
    english: "Sadness",
    color: "#57748d",
    light: "#e3eaf0",
    word: "Gdy ciało zwalnia.",
    description:
      "Smutkowi towarzyszył spadek odczuwanej aktywności kończyn; górna część ciała pozostawała aktywna. [1]",
    regions: { head: "more", chest: "more", arms: "less", legs: "less" },
    prompt:
      "Czy ciało wydaje się dziś cięższe, lżejsze, a może nie zauważasz różnicy?",
  },
  {
    id: "anger",
    name: "Złość",
    english: "Anger",
    color: "#b65b45",
    light: "#f5dfd5",
    word: "Energia gotowa do ruchu.",
    description:
      "W mapach złości wyróżniały się głowa, klatka piersiowa i ręce. [1]",
    regions: { head: "more", chest: "more", arms: "more" },
    prompt:
      "Zauważ ułożenie dłoni i ramion. Co odczuwasz, nie próbując tego zmieniać?",
  },
  {
    id: "fear",
    name: "Strach",
    english: "Fear",
    color: "#8270a4",
    light: "#ebe5f2",
    word: "Ciało w gotowości.",
    description:
      "Strach wiązał się ze wzrostem odczuwanej aktywności, zwłaszcza w górnej części tułowia. [1]",
    regions: { head: "more", chest: "more", belly: "more" },
    prompt: "Gdzie teraz czujesz podparcie? Zauważ kontakt stóp z podłożem.",
  },
  {
    id: "disgust",
    name: "Wstręt",
    english: "Disgust",
    color: "#6c7b4e",
    light: "#e5e9d6",
    word: "Wyraźny sygnał odsunięcia.",
    description:
      "Przy wstręcie wyróżniały się okolice gardła i układu pokarmowego. [1]",
    regions: {
      head: "more",
      throat: "more",
      chest: "more",
      belly: "more",
      legs: "less",
    },
    prompt:
      "Czy chcesz się od czegoś odsunąć? Zauważ tę reakcję bez oceniania.",
  },
  {
    id: "surprise",
    name: "Zaskoczenie",
    english: "Surprise",
    color: "#b27745",
    light: "#f4e4d2",
    word: "Chwila, która zatrzymuje.",
    description:
      "Przy zaskoczeniu wyróżniały się odczucia w głowie i klatce piersiowej oraz spadek aktywności nóg. [1]",
    regions: { head: "more", chest: "more", legs: "less" },
    prompt:
      "Przypomnij sobie ostatnie zaskoczenie. Co jako pierwsze zwróciło Twoją uwagę?",
  },
  {
    id: "love",
    name: "Miłość",
    english: "Love",
    color: "#b36d79",
    light: "#f3dfe3",
    word: "Bliskość odczuwana w ciele.",
    description:
      "Miłość wiązała się z rozległymi odczuciami wzrostu aktywności, szczególnie w górnej części ciała. [1]",
    regions: { head: "more", chest: "more", belly: "more", arms: "more" },
    prompt:
      "Pomyśl o kimś bliskim lub o miejscu, w którym czujesz się dobrze. Co zauważasz?",
  },
  {
    id: "pride",
    name: "Duma",
    english: "Pride",
    color: "#8b7851",
    light: "#ede6d3",
    word: "Miejsce na własne osiągnięcia.",
    description:
      "W mapie dumy wzrost odczuwanej aktywności koncentrował się w głowie i klatce piersiowej. [1]",
    regions: { head: "more", chest: "more", arms: "more" },
    prompt:
      "Przypomnij sobie coś, co Ci się udało. Jak układa się teraz Twoje ciało?",
  },
];
export function findEmotion(id: string | null): Emotion {
  return emotions.find((e) => e.id === id) ?? emotions[0];
}
