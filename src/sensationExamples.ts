import type { EmotionId, Region } from "./emotions";
import type { SourceId } from "./sources";

type Examples = readonly [string, string];

// Authored first-person vocabulary, not measurements or quotations from the
// study. No example is a required or exclusive sign of an emotion.
// Where an NHS page lists the same bodily symptom, `exampleSources` names it,
// so the page can cite it next to the examples.
export const exampleSources: Partial<
  Record<EmotionId, Partial<Record<Region, SourceId>>>
> = {
  // NHS "Anger": faster heartbeat, tightness in your chest, clenching your
  // fists, feeling hot, tense muscles.
  anger: { head: 3, chest: 3, arms: 3 },
  // NHS inform "Anxiety self-help guide": breathing faster, heart racing,
  // chest tight, "butterflies" in your stomach, stomach churning.
  anxiety: { chest: 4, belly: 4 },
  // NHS "Blushing": often caused by feeling embarrassed.
  shame: { head: 5 },
};

export const sourceNotes: Partial<Record<SourceId, string>> = {
  3: "Podobne objawy złości wymienia NHS.",
  4: "Podobne objawy lęku wymienia NHS inform.",
  5: "NHS opisuje rumieniec, m.in. przy zakłopotaniu.",
};

const examples: Record<EmotionId, Partial<Record<Region, Examples>>> = {
  joy: {
    head: [
      "Czuję przyjemne ciepło na twarzy.",
      "Policzki unoszą się, kiedy się uśmiecham.",
    ],
    throat: [
      "Mam ochotę się śmiać, mówić lub śpiewać.",
      "Gardło i szyja wydają się swobodne.",
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
    throat: [
      "Czuję ściśnięte gardło, jak przed płaczem.",
      "Głos staje się cichszy lub drży.",
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
    throat: [
      "Czuję napiętą szyję i kark.",
      "Głos staje się głośniejszy lub ostrzejszy.",
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
    throat: [
      "Gardło wydaje się suche lub ściśnięte.",
      "Trudniej mi przełknąć ślinę.",
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
  },
  surprise: {
    head: [
      "Czuję unoszenie brwi i otwieranie ust.",
      "Mięśnie twarzy nagle się poruszają.",
    ],
    throat: [
      "Gwałtownie nabieram powietrza, czasem z okrzykiem.",
      "Na moment zasycha mi w gardle.",
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
    throat: [
      "Głos staje się cieplejszy i łagodniejszy.",
      "Czuję wzruszenie ściskające gardło.",
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
    throat: [
      "Mówię pewniejszym, mocniejszym głosem.",
      "Szyja się prostuje, a głowa unosi.",
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
    throat: ["Czuję ucisk w gardle.", "Trudniej mi swobodnie przełknąć ślinę."],
    chest: [
      "Bicie serca jest szybsze lub bardziej zauważalne.",
      "Czuję ucisk w klatce, a oddech przyspiesza.",
    ],
    belly: [
      "Czuję motyle, ścisk lub przewracanie w brzuchu.",
      "Brzuch wydaje się ściśnięty lub napięty.",
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
    throat: [
      "Głos cichnie albo trudno mi coś powiedzieć.",
      "Czuję ściśnięte gardło.",
    ],
    chest: [
      "Czuję napięcie w klatce piersiowej.",
      "Mam odruch skulenia tułowia.",
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
    throat: ["Czuję ścisk w gardle.", "Słowa więzną mi w gardle."],
    chest: [
      "Czuję ścisk w klatce piersiowej.",
      "Zauważam napięcie podczas nabierania oddechu.",
    ],
  },
  contempt: {
    head: [
      "Zauważam napięcie kącika ust.",
      "Czuję uniesienie brody albo napinanie szczęki.",
    ],
    throat: [
      "Mam ochotę prychnąć.",
      "Czuję napiętą szyję przy uniesionej brodzie.",
    ],
  },
  hope: {
    head: [
      "Myśli wydają się jaśniejsze i bardziej otwarte.",
      "Twarz łagodnieje, czasem pojawia się uśmiech.",
    ],
    throat: [
      "Oddech swobodniej przepływa przez gardło.",
      "Mam ochotę powiedzieć komuś, na co liczę.",
    ],
    chest: [
      "Czuję ciepło lub rozszerzenie w klatce piersiowej.",
      "Oddycham głębiej i pełniej.",
    ],
  },
  amusement: {
    head: [
      "Kąciki ust same się unoszą.",
      "Twarz rozluźnia się w uśmiechu albo śmiechu.",
    ],
  },
  interest: {
    head: [
      "Unoszę brwi i przyglądam się uważniej.",
      "Czuję ożywienie w głowie, myśli przyspieszają.",
    ],
  },
  compassion: {
    chest: [
      "Czuję ciepło lub miękkość w środku klatki piersiowej.",
      "Coś ściska mnie w piersi, kiedy myślę o czyimś cierpieniu.",
    ],
  },
  gratitude: {
    chest: [
      "Czuję ciepło rozlewające się w klatce piersiowej.",
      "Oddech staje się spokojniejszy i pełniejszy.",
    ],
  },
  longing: {
    chest: [
      "Czuję ciężar albo pustkę w klatce piersiowej.",
      "Coś w piersi ciągnie mnie ku komuś lub czemuś.",
    ],
  },
  despair: {
    chest: [
      "Klatka piersiowa wydaje się ściśnięta albo ciężka.",
      "Trudno mi wziąć pełny oddech.",
    ],
  },
  nervousness: {
    belly: [
      "Czuję „motyle” albo ścisk w żołądku.",
      "Brzuch napina się w oczekiwaniu.",
    ],
  },
  hostility: {
    head: ["Czuję napięcie szczęki i czoła.", "Gorąco uderza mi do głowy."],
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

/** Examples written for this emotion and area, if the area is highlighted. */
export function emotionExamples(
  emotion: EmotionId,
  region: Region,
): Examples | undefined {
  return examples[emotion][region];
}

/** General words for an area, deliberately not tied to any emotion. */
export function areaExamples(region: Region): Examples {
  return areaVocabulary[region];
}

export const allExampleStrings = [
  ...Object.values(examples).flatMap((byRegion) =>
    Object.values(byRegion).flat(),
  ),
  ...Object.values(areaVocabulary).flat(),
];
