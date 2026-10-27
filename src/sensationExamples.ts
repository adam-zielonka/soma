import type { EmotionId, Region } from "./emotions";

type Examples = readonly [string, string];

// Authored first-person vocabulary, not measurements or quotations from the study.
// NHS sources linked in #source-3 provide additional context for anger, anxiety
// and blushing. No example is a required or exclusive sign of an emotion.
const examples: Record<EmotionId, Partial<Record<Region, Examples>>> = {
  joy: {
    head: [
      "Czuję przyjemne ciepło na twarzy.",
      "Policzki unoszą się, kiedy się uśmiecham.",
    ],
    chest: [
      "Czuję ciepło lub przestrzeń w klatce piersiowej.",
      "Oddech wydaje się swobodniejszy.",
    ],
    belly: [
      "W brzuchu czuję lekkie łaskotanie.",
      "Zauważam miękkość lub rozluźnienie.",
    ],
    arms: [
      "Mam ochotę poruszać rękami lub kogoś objąć.",
      "Dłonie wydają się lekkie i rozluźnione.",
    ],
    legs: [
      "Czuję sprężystość w nogach.",
      "Mam ochotę chodzić, podskoczyć lub tańczyć.",
    ],
  },
  sadness: {
    head: [
      "Czuję łzy pod powiekami.",
      "Twarz wydaje się ciężka, a jej mięśnie mniej ruchliwe.",
    ],
    chest: [
      "Czuję ciężar w klatce piersiowej.",
      "Zauważam potrzebę westchnienia.",
    ],
    arms: [
      "Ręce wydają się ciężkie lub bezwładne.",
      "Trudniej mi zebrać energię do ruchu dłoni.",
    ],
    legs: [
      "Nogi wydają się ciężkie, jakby trudniej było ruszyć.",
      "Mam ochotę usiąść lub zwolnić krok.",
    ],
  },
  anger: {
    head: [
      "Twarz wydaje się gorąca.",
      "Zauważam napięcie szczęki lub zaciskanie zębów.",
    ],
    chest: [
      "Czuję mocniejsze lub szybsze bicie serca.",
      "Zauważam napięcie w klatce piersiowej.",
    ],
    arms: ["Zaciskam dłonie w pięści.", "Czuję napięcie przedramion i ramion."],
  },
  fear: {
    head: [
      "Czuję napięcie mięśni twarzy.",
      "Zauważam, że oczy otwierają się szerzej.",
    ],
    chest: [
      "Wyraźniej czuję bicie serca.",
      "Oddech wydaje się szybszy lub płytszy.",
    ],
    belly: [
      "Czuję ścisk albo skręcanie w brzuchu.",
      "Zauważam motyle w brzuchu lub mdłości.",
    ],
  },
  disgust: {
    head: [
      "Marszczę nos lub napinam okolice ust.",
      "Czuję, że odruchowo odwracam twarz.",
    ],
    throat: [
      "Czuję zaciskanie w gardle.",
      "Pojawia się odruch krztuszenia lub potrzeba przełknięcia śliny.",
    ],
    chest: [
      "Zauważam napięcie w górnej części tułowia.",
      "Mam odruch cofnięcia się lub odsunięcia.",
    ],
    belly: [
      "Czuję mdłości lub przewracanie w żołądku.",
      "Brzuch wydaje się ściśnięty.",
    ],
    legs: [
      "Nogi wydają się na chwilę mniej pewne.",
      "Mam ochotę zatrzymać się lub odsunąć.",
    ],
  },
  surprise: {
    head: [
      "Czuję unoszenie brwi i otwieranie ust.",
      "Mięśnie twarzy nagle się poruszają.",
    ],
    chest: [
      "Na chwilę wstrzymuję oddech albo gwałtownie go nabieram.",
      "Zauważam nagły skok odczuć w klatce piersiowej.",
    ],
    legs: [
      "Nogi jakby na chwilę zamierają.",
      "Zatrzymuję krok i potrzebuję chwili, żeby ruszyć dalej.",
    ],
  },
  love: {
    head: [
      "Twarz wydaje się ciepła.",
      "Zauważam delikatny uśmiech i rozluźnienie szczęki.",
    ],
    chest: [
      "Czuję rozchodzące się ciepło.",
      "Bicie serca staje się bardziej zauważalne.",
    ],
    belly: [
      "Czuję lekkie motyle w brzuchu.",
      "Zauważam przyjemne ciepło lub łaskotanie.",
    ],
    arms: [
      "Mam ochotę wyciągnąć ręce lub kogoś objąć.",
      "Dłonie wydają się ciepłe i rozluźnione.",
    ],
  },
  pride: {
    head: [
      "Zauważam uśmiech i unoszenie głowy.",
      "Twarz wydaje się cieplejsza.",
    ],
    chest: [
      "Czuję przestrzeń w klatce piersiowej.",
      "Zauważam, że prostuję tułów i łatwiej nabieram oddechu.",
    ],
    arms: [
      "Czuję energię do gestykulowania.",
      "Ramiona układają się swobodniej, a dłonie otwierają.",
    ],
  },
  anxiety: {
    head: [
      "Zauważam napięcie twarzy lub szczęki.",
      "Czuję napięcie w okolicy czoła.",
    ],
    chest: [
      "Bicie serca jest szybsze lub bardziej zauważalne.",
      "Czuję napięcie, a oddech wydaje się płytszy.",
    ],
    belly: [
      "Czuję motyle, ścisk lub przewracanie w brzuchu.",
      "Brzuch jest napięty albo pojawiają się mdłości.",
    ],
    arms: [
      "Ręce wydają się słabsze lub mniej pewne.",
      "Mam trudność ze swobodnym ruchem dłoni.",
    ],
    legs: [
      "Nogi wydają się miękkie lub mniej pewne.",
      "Czuję, że trudniej swobodnie zrobić krok.",
    ],
  },
  shame: {
    head: [
      "Czuję gorąco na policzkach.",
      "Zauważam rumieniec i chęć spuszczenia wzroku.",
    ],
    chest: [
      "Czuję napięcie w klatce piersiowej.",
      "Mam odruch skulenia tułowia.",
    ],
    belly: [
      "Czuję ścisk w brzuchu.",
      "Mięśnie brzucha napinają się, kiedy się kulę.",
    ],
    arms: [
      "Ręce wydają się ciężkie lub mniej ruchliwe.",
      "Mam ochotę schować dłonie blisko ciała.",
    ],
    legs: ["Nogi jakby zastygają.", "Trudniej mi swobodnie ruszyć z miejsca."],
  },
  envy: {
    head: [
      "Zauważam napięcie szczęki.",
      "Czuję ciepło lub napięcie mięśni twarzy.",
    ],
    chest: [
      "Czuję ścisk w klatce piersiowej.",
      "Zauważam napięcie podczas nabierania oddechu.",
    ],
    legs: ["Nogi wydają się cięższe.", "Mam mniej ochoty na swobodny ruch."],
  },
  contempt: {
    head: [
      "Zauważam napięcie kącika ust.",
      "Czuję uniesienie brody albo napinanie szczęki.",
    ],
    legs: [
      "Dolna część ciała wydaje się mniej ruchliwa.",
      "Zauważam, że zastygam w miejscu.",
    ],
  },
};

// For areas not highlighted on a map, offer general vocabulary without
// implying a researched association with the selected emotion.
const areaVocabulary: Record<Region, Examples> = {
  head: [
    "Twarz jest ciepła, chłodna albo bez wyraźnych zmian.",
    "Mięśnie szczęki są napięte lub rozluźnione.",
  ],
  throat: [
    "Czuję suchość, ścisk albo swobodę w gardle.",
    "Zauważam potrzebę przełknięcia śliny.",
  ],
  chest: [
    "Czuję ciepło, ciężar albo przestrzeń w klatce piersiowej.",
    "Zauważam ruch oddechu lub bicie serca.",
  ],
  belly: [
    "Brzuch jest miękki, napięty albo bez wyraźnych zmian.",
    "Czuję łaskotanie, ścisk lub ciepło.",
  ],
  arms: [
    "Dłonie są ciepłe, chłodne, napięte lub rozluźnione.",
    "Ręce wydają się lekkie albo ciężkie.",
  ],
  legs: [
    "Nogi wydają się lekkie, ciężkie lub sprężyste.",
    "Zauważam napięcie mięśni albo kontakt stóp z podłożem.",
  ],
};

export function getSensationExamples(
  emotion: EmotionId,
  region: Region,
): Examples {
  return examples[emotion][region] ?? areaVocabulary[region];
}
