import { ArrowUpRight } from "lucide-react";
import { Cite } from "./components";
import { t } from "./i18n";

const references = [
  {
    id: 1,
    authors: "Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014).",
    title: "Bodily maps of emotions.",
    venue: "PNAS, 111(2), 646–651.",
    href: "https://doi.org/10.1073/pnas.1321664111",
    link: "doi:10.1073/pnas.1321664111",
  },
  {
    id: 2,
    authors: "Nummenmaa, L., Hari, R., Hietanen, J. K., & Glerean, E. (2018).",
    title: "Maps of subjective feelings.",
    venue: "PNAS, 115(37), 9198–9203.",
    href: "https://doi.org/10.1073/pnas.1807390115",
    link: "doi:10.1073/pnas.1807390115",
  },
  {
    id: 3,
    authors: "NHS.",
    title: "Anger.",
    venue: "",
    href: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anger/",
    link: "nhs.uk",
  },
  {
    id: 4,
    authors: "NHS inform.",
    title: "Anxiety self-help guide.",
    venue: "",
    href: "https://www.nhsinform.scot/illnesses-and-conditions/mental-health/mental-health-self-help-guides/anxiety-self-help-guide",
    link: "nhsinform.scot",
  },
  {
    id: 5,
    authors: "NHS.",
    title: "Blushing.",
    venue: "",
    href: "https://www.nhs.uk/symptoms/blushing/",
    link: "nhs.uk",
  },
];

export default function About() {
  return (
    <section id="o-badaniu" className="about" aria-labelledby="about-title">
      <div className="about-head">
        <h2 id="about-title">{t("O badaniu i ograniczeniach map")}</h2>
        <p>
          {t(
            "Soma przekłada wyniki badań na prosty, poglądowy język. Oto, na czym się opiera i czego nie mówi.",
          )}
        </p>
      </div>
      <div className="about-grid">
        <article>
          <h3>{t("Skąd pochodzą mapy")}</h3>
          <p>
            {t(
              "W badaniu z 2014 roku uczestnicy widzieli dwie puste sylwetki i kolorowali miejsca, w których czują wzrost lub spadek aktywności przy danej emocji. W czterech eksperymentach wzięło w nich udział 701 osób; w piątym inna grupa próbowała rozpoznawać emocje na podstawie uśrednionych map.",
            )}{" "}
            <Cite n={1} />
          </p>
          <p>
            {t(
              "Soma opiera się na rycinie 2, czyli na pierwszym eksperymencie: fińskojęzyczni uczestnicy oceniali, gdzie zwykle odczuwają emocję podaną słowem — emocji nie wywoływano. Zbliżone mapy emocji podstawowych uzyskano w grupach mówiących po szwedzku i tajwańsku oraz wtedy, gdy emocje wywoływały opowiadania i filmy. Emocje złożone badano tylko na podstawie nazw.",
            )}{" "}
            <Cite n={1} />
          </p>
        </article>
        <article>
          <h3>{t("Jak czytać sylwetkę")}</h3>
          <p>
            {t(
              "Ciepła poświata oznacza wzrost odczuwanej aktywności, chłodna i kreskowana — spadek. Kolory nie oznaczają temperatury. Obszar bez poświaty nie został wyróżniony: w oryginale jest w większości czarny (bez istotnej statystycznie zmiany) albo zabarwiony tylko słabo lub w części. Nie znaczy to, że nic się tam nie czuje.",
            )}{" "}
            <Cite n={1} />
          </p>
          <p>
            {t(
              "W oryginale jasność koloru to statystyka t: rośnie, gdy grupa zaznaczała dane miejsce mocniej i zgodniej. Nie jest to skala natężenia odczucia u pojedynczej osoby. Soma upraszcza rycinę do kierunku zmiany w sześciu obszarach: obszar oznaczono, gdy ciepły lub chłodny kolor wyraźnie w nim przeważa. Sylwetki w badaniu nie miały podziału na obszary — to warstwa dodana w Somie.",
            )}
          </p>
          <p>
            {t(
              "Rycina zawiera 14 map. Soma pokazuje 12: pomija stan neutralny, który nie jest emocją, oraz depresję, która jest stanem klinicznym.",
            )}
          </p>
        </article>
        <article>
          <h3>{t("Czego mapy nie mówią")}</h3>
          <p>
            {t(
              "To uśrednione samoopisy, a nie pomiary temperatury, pracy narządów ani aktywności mózgu. Pojedyncza osoba może czuć daną emocję inaczej albo nie czuć nic wyraźnego.",
            )}
          </p>
          <p>
            {t(
              "Z miejsca odczucia nie da się rozpoznać emocji ani postawić diagnozy. Nawet na podstawie uśrednionych map uczestnicy trafnie rozpoznawali emocję średnio w 46% prób (przypadek dawałby 14%), a strachu nie rozpoznawali lepiej niż losowo.",
            )}{" "}
            <Cite n={1} />
          </p>
          <p>
            {t(
              "W pierwszym eksperymencie uczestniczyli głównie młodzi dorośli, w większości kobiety. Soma służy edukacji i autorefleksji, nie diagnozie ani terapii.",
            )}{" "}
            <Cite n={1} />
          </p>
          <p>
            {t(
              "Jeśli silne lub niepokojące odczucia z ciała — na przykład ból w klatce piersiowej albo duszność — utrzymują się lub wracają, skonsultuj je z lekarzem.",
            )}
          </p>
        </article>
        <article>
          <h3>{t("Słowa opisu i pytania")}</h3>
          <p>
            {t(
              "Zdania przy obszarach ciała są autorskimi propozycjami Somy, a nie wynikami badania: mapa pokazuje miejsce zmiany, nie jej charakter. Część z nich odpowiada objawom, które NHS wymienia przy złości (szybsze bicie serca, ucisk w klatce piersiowej, zaciskanie pięści, uczucie gorąca) i lęku (szybszy oddech, kołatanie serca, „motyle” w brzuchu), a także opisowi rumieńca.",
            )}{" "}
            <Cite n={3} /> <Cite n={4} /> <Cite n={5} />
          </p>
          <p>
            {t(
              "Pytania „Zatrzymaj się na chwilę” to proste ćwiczenia uwagi, a nie terapia. Polskie nazwy emocji są tłumaczeniem angielskich nazw z badania, które z kolei przetłumaczono z fińskiego.",
            )}
          </p>
        </article>
      </div>
      <p className="wider-context">
        {t(
          "Szerszy kontekst: w pracy z 2018 roku ten sam zespół zbadał 100 różnych stanów — od emocji po stany somatyczne i choroby — z udziałem 1026 osób. Odczucia w ciele okazały się, obok przyjemności lub przykrości i doświadczenia psychicznego, jednym z wymiarów porządkujących to, jak przeżywamy uczucia.",
        )}{" "}
        <Cite n={2} />
      </p>
      <div className="references">
        <h3 id="zrodla">{t("Źródła")}</h3>
        <ol>
          {references.map((ref) => (
            <li key={ref.id} id={`zrodlo-${ref.id}`} tabIndex={-1}>
              <span className="ref-number">[{ref.id}]</span>
              <span>
                {ref.authors} <cite lang="en">{ref.title}</cite> {ref.venue}{" "}
                <a href={ref.href} target="_blank" rel="noreferrer">
                  {ref.link}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </span>
            </li>
          ))}
        </ol>
        <p className="more-materials">
          <a
            href="https://emotion.utu.fi/maps-of-subjective-feelings/"
            target="_blank"
            rel="noreferrer"
          >
            {t("Materiały zespołu badawczego z Uniwersytetu w Turku")}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
