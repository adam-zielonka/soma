import type { Region } from "./emotions";

// `authors` paraphrases the Discussion of Nummenmaa et al. (2014), PNAS 111(2),
// doi:10.1073/pnas.1321664111: "Most basic emotions were associated with
// sensations of elevated activity in the upper chest area, likely
// corresponding to changes in breathing and heart rate. Similarly, sensations
// in the head area were shared across all emotions, reflecting probably both
// physiological changes in the facial area (i.e., facial musculature
// activation, skin temperature, lacrimation) as well as the felt changes in
// the contents of mind [...]. Sensations in the upper limbs were most
// prominent in approach-oriented emotions, anger and happiness, whereas
// sensations of decreased limb activity were a defining feature of sadness.
// Sensations in the digestive system and around the throat region were mainly
// found in disgust. In contrast with all of the other emotions, happiness was
// associated with enhanced sensations all over the body."
// `figure` is Soma's own reading of Figure 2 and is labelled as such.
export const regionNotes: Record<Region, { authors: string; figure?: string }> =
  {
    head: {
      authors:
        "Odczucia w głowie pojawiały się przy wszystkich emocjach. Autorzy łączą je prawdopodobnie ze zmianami w obrębie twarzy (praca mięśni, temperatura skóry, łzy) oraz z odczuwaną zmianą myśli.",
    },
    throat: {
      authors:
        "Według autorów odczucia wokół gardła — razem z odczuciami w układzie pokarmowym — występowały głównie przy wstręcie.",
      figure:
        "Szyja jest ciepła na wszystkich 12 mapach pokazanych w Somie; przy wstręcie należy do najjaśniejszych miejsc mapy.",
    },
    chest: {
      authors:
        "Większość emocji podstawowych wiązała się ze wzrostem odczuwanej aktywności w górnej części klatki piersiowej. Autorzy przypuszczają, że odpowiada on zmianom oddechu i rytmu serca.",
    },
    belly: {
      authors:
        "Według autorów odczucia w układzie pokarmowym i wokół gardła występowały głównie przy wstręcie.",
      figure:
        "Wzrost w brzuchu widać też przy radości, strachu, lęku i miłości — zwykle jako przedłużenie odczuć z klatki piersiowej.",
    },
    arms: {
      authors:
        "Odczucia w rękach były najwyraźniejsze przy emocjach skłaniających do zbliżenia się, a nie do wycofania: złości i radości. Spadek odczuwanej aktywności kończyn był cechą wyróżniającą smutek.",
    },
    legs: {
      authors:
        "Spadek odczuwanej aktywności kończyn był cechą wyróżniającą smutek. Radość jako jedyna emocja wiązała się ze wzmożonymi odczuciami w całym ciele.",
    },
  };
