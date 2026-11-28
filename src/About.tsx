import { ArrowUpRight } from "lucide-react";
import { Cite } from "./components";
import { t } from "./i18n";
import { references } from "./sources";

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
              "Mapy emocji podstawowych i złożonych pochodzą z ryciny 2, czyli z pierwszego eksperymentu: fińskojęzyczni uczestnicy oceniali, gdzie zwykle odczuwają emocję podaną słowem — emocji nie wywoływano. Zbliżone mapy emocji podstawowych uzyskano w grupach mówiących po szwedzku i tajwańsku oraz wtedy, gdy emocje wywoływały opowiadania i filmy. Emocje złożone badano tylko na podstawie nazw.",
            )}{" "}
            <Cite n={1} />
          </p>
          <p>
            {t(
              "Mapy „z nowszych badań” powstały tą samą metodą dwóch sylwetek: nadzieja w badaniu 992 dorosłych z USA, a rozbawienie, zainteresowanie i współczucie w badaniu amerykańskich studentów z trzech grup kulturowych. Z tego drugiego badania Soma pokazuje tylko emocje, których mapy wskazały ten sam obszar we wszystkich trzech grupach. Autorzy raportują dużą zgodność map między grupami dla wszystkich badanych emocji, ale w odczycie Somy zachwyt, triumf i pożądanie nie miały obszaru wyraźnego we wszystkich trzech — najsłabsze były mapy najmniejszej, latynoskiej grupy. Zadowolenie i ulga dały niemal puste mapy. Radość, miłość i dumę Soma pokazuje z badania z 2014 roku.",
            )}{" "}
            <Cite n={6} /> <Cite n={7} />
          </p>
          <p>
            {t(
              "Mapy „innych uczuć” pochodzą z badania z 2018 roku, w którym uczestnicy zaznaczali na jednej sylwetce tylko miejsca, gdzie czują dany stan. Nie pytano o spadek, więc te mapy mają inną, złotą poświatę i nie należy ich wprost porównywać z pozostałymi. W odczycie Somy kilka uczuć związanych z innymi ludźmi — m.in. wdzięczność, tęsknota, bliskość i poczucie wspólnoty — ma najjaśniejsze miejsce w środku klatki piersiowej. Mapy m.in. poczucia winy i samotności nie przekroczyły przyjętego w Somie progu, więc ich nie pokazano.",
            )}{" "}
            <Cite n={2} />
          </p>
        </article>
        <article>
          <h3>{t("Jak czytać sylwetkę")}</h3>
          <p>
            {t(
              "Ciepła poświata oznacza wzrost odczuwanej aktywności, a chłodna i kreskowana — spadek. Złota poświata na mapach innych uczuć oznacza miejsce wyraźnych odczuć, bez kierunku zmiany. Kolory nie oznaczają temperatury. Obszar bez poświaty nie został wyróżniony: na mapach wzrostu i spadku jest w oryginale w większości czarny (bez istotnej statystycznie zmiany) albo zabarwiony tylko słabo lub w części. Nie znaczy to, że nic się tam nie czuje.",
            )}{" "}
            <Cite n={1} /> <Cite n={2} />
          </p>
          <p>
            {t(
              "Na rycinie z 2014 roku jasność koloru to statystyka t: rośnie, gdy grupa zaznaczała dane miejsce mocniej i zgodniej. Nie jest to skala natężenia odczucia u pojedynczej osoby. Soma upraszcza rycinę do kierunku zmiany w sześciu obszarach: obszar oznaczono, gdy ciepły lub chłodny kolor wyraźnie w nim przeważa. Sylwetki w badaniu nie miały podziału na obszary — to warstwa dodana w Somie.",
            )}
          </p>
          <p>
            {t(
              "Na rycinie z 2018 roku kolor oznacza wielkość efektu, a każdy kolor — istotne statystycznie odczucia, więc na wielu mapach zabarwiona jest duża część ciała. Złotą poświatą Soma oznacza tylko obszary, w których wyraźnie przeważa jasny, żółto-pomarańczowy kolor (mniej więcej górna połowa skali). To próg przyjęty w Somie, a nie natężenie odczucia u pojedynczej osoby.",
            )}{" "}
            <Cite n={2} />
          </p>
          <p>
            {t(
              "Rycina 2 z 2014 roku zawiera 14 map. Soma pokazuje z niej 12: pomija stan neutralny, który nie jest emocją, oraz depresję, która jest stanem klinicznym.",
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
              "W pierwszym eksperymencie badania z 2014 roku uczestniczyli głównie młodzi dorośli, w większości kobiety. Wąskie są też próby dwóch innych badań: w 2018 roku głównie młode kobiety mówiące po fińsku, w badaniu emocji pozytywnych amerykańscy studenci. Najbardziej zróżnicowana była próba badania nadziei: dorośli z USA, w połowie kobiety, o medianie wieku 46 lat.",
            )}{" "}
            <Cite n={1} /> <Cite n={2} /> <Cite n={7} /> <Cite n={6} />
          </p>
          <p>
            {t(
              "Soma służy edukacji i autorefleksji, nie diagnozie ani terapii.",
            )}
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
              "Pytania „Zatrzymaj się na chwilę” to proste ćwiczenia uwagi, a nie terapia. Polskie nazwy emocji są tłumaczeniem angielskich nazw z badań; w badaniach fińskich (2014 i 2018) te nazwy przetłumaczono z kolei z fińskiego.",
            )}
          </p>
        </article>
      </div>
      <p className="wider-context">
        {t(
          "Czy mapy się powtarzają? W dużym badaniu międzynarodowym (3954 osoby ze 101 krajów) mapy 13 emocji były zgodne między kulturami i płciami.",
        )}{" "}
        <Cite n={8} />{" "}
        {t(
          "Wśród 548 osób mieszkających w Polsce, które wykonywały zadanie po polsku, mapy emocji okazały się bardzo podobne do wcześniejszych wyników.",
        )}{" "}
        <Cite n={9} />
      </p>
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
