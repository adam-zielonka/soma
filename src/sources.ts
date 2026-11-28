// Numbered references cited on the page as [n]. The numbers are stable, so
// citations in data files and translations keep pointing to the same work.
export const references = [
  {
    id: 1,
    authors: "Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014).",
    year: 2014,
    title: "Bodily maps of emotions.",
    venue: "PNAS, 111(2), 646–651.",
    href: "https://doi.org/10.1073/pnas.1321664111",
    link: "doi:10.1073/pnas.1321664111",
  },
  {
    id: 2,
    authors: "Nummenmaa, L., Hari, R., Hietanen, J. K., & Glerean, E. (2018).",
    year: 2018,
    title: "Maps of subjective feelings.",
    venue: "PNAS, 115(37), 9198–9203.",
    href: "https://doi.org/10.1073/pnas.1807390115",
    link: "doi:10.1073/pnas.1807390115",
  },
  {
    id: 3,
    authors: "NHS.",
    year: null,
    title: "Anger.",
    venue: "",
    href: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anger/",
    link: "nhs.uk",
  },
  {
    id: 4,
    authors: "NHS inform.",
    year: null,
    title: "Anxiety self-help guide.",
    venue: "",
    href: "https://www.nhsinform.scot/illnesses-and-conditions/mental-health/mental-health-self-help-guides/anxiety-self-help-guide",
    link: "nhsinform.scot",
  },
  {
    id: 5,
    authors: "NHS.",
    year: null,
    title: "Blushing.",
    venue: "",
    href: "https://www.nhs.uk/symptoms/blushing/",
    link: "nhs.uk",
  },
  {
    id: 6,
    authors: "Vik, A., Galvez-Pol, A., Park, S., & Tsakiris, M. (2026).",
    year: 2026,
    title:
      "Politics embodied: How politics shapes and is shaped by the bodily experience of emotions.",
    venue: "PNAS, 123(20), e2534895123.",
    href: "https://doi.org/10.1073/pnas.2534895123",
    link: "doi:10.1073/pnas.2534895123",
  },
  {
    id: 7,
    authors: "Zhang, Z., Zerwas, F. K., & Keltner, D. (2025).",
    year: 2025,
    title:
      "Emotion specificity, coherence, and cultural variation in conceptualizations of positive emotions: a study of body sensations and emotion recognition.",
    venue: "Cognition and Emotion, 39(5), 1127–1140.",
    href: "https://doi.org/10.1080/02699931.2024.2430400",
    link: "doi:10.1080/02699931.2024.2430400",
  },
  {
    id: 8,
    authors:
      "Volynets, S., Glerean, E., Hietanen, J. K., Hari, R., & Nummenmaa, L. (2020).",
    year: 2020,
    title: "Bodily maps of emotions are culturally universal.",
    venue: "Emotion, 20(7), 1127–1136.",
    href: "https://doi.org/10.1037/emo0000624",
    link: "doi:10.1037/emo0000624",
  },
  {
    id: 9,
    authors:
      "Herman, A. M., Zaremba, D., Kossowski, B., & Marchewka, A. (2022).",
    year: 2022,
    title:
      "The utility of the emBODY tool as a novel method of studying complex phenomena-related emotions.",
    venue: "Scientific Reports, 12, 19884.",
    href: "https://doi.org/10.1038/s41598-022-23734-4",
    link: "doi:10.1038/s41598-022-23734-4",
  },
  {
    id: 10,
    authors: "Zhong, S., Tang, X., Cheng, X., & Pan, Y. (2026).",
    year: 2026,
    title:
      "Bodily maps of subject-specific feelings and academic emotions among high school students.",
    venue: "BMC Psychology, 14, 499.",
    href: "https://doi.org/10.1186/s40359-026-04283-1",
    link: "doi:10.1186/s40359-026-04283-1",
  },
] as const;

export type SourceId = (typeof references)[number]["id"];

export function referenceYear(id: SourceId) {
  return references.find((ref) => ref.id === id)!.year;
}
