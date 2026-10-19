/* Freigegebene Originalfassung: joujou.restaurant/agb.html, Stand Oktober 2026.
   Der Haupttext ist wortgetreu übernommen; nur die lokale Marke/Navigation unterscheiden sich. */
import { useEffect } from "react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function AGB() {
  usePageMeta({
    title: "Allgemeine Geschäftsbedingungen — petit joujou",
    description: "Allgemeine Geschäftsbedingungen der Joujou GmbH für Reservierungen, Veranstaltungen und Gutscheine.",
    canonical: "https://www.petit-joujou.de/agb",
  });
  useEffect(() => {
    let active = true;
    const scrollToAnchor = () => {
      if (!active) return;
      const id = window.location.hash.slice(1);
      if (["widerruf", "storno", "veranstaltungen"].includes(id)) {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };
    const frame = requestAnimationFrame(scrollToAnchor);
    void document.fonts.ready.then(scrollToAnchor);
    window.addEventListener("hashchange", scrollToAnchor);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToAnchor);
    };
  }, []);
  return (
    <div className="winebar-legal-page">
      <header className="winebar-legal-header">
        <div className="winebar-legal-wrap">
          <Link className="winebar-legal-brand" href="/">petit joujou <span>organic wine bar</span></Link>
          <Link href="/">Zurück zur Seite</Link>
        </div>
      </header>
      <main className="winebar-legal-wrap" data-agb-content>
<h1>{"Allgemeine Geschäftsbedingungen"}</h1>
<p className="lead">{"Für Reservierungen, Veranstaltungen und Gutscheine der Joujou GmbH.\n    Wir duzen hier genauso wie überall sonst bei uns."}</p>
<h2>{"1. Wer wir sind und wofür das hier gilt"}</h2>
<p>{"Diese Bedingungen gelten für alle Verträge zwischen dir und der "}<b>{"Joujou GmbH"}</b>{",\n    Hauptstraße 34, 67098 Bad Dürkheim (Leistadt) — also für das Joujou Restaurant, die\n    Weinbar petit joujou, unsere Veranstaltungen und unsere Gutscheine."}</p>
<p>{"Wenn du bei uns reservierst, einen Platz bei einer Veranstaltung buchst oder einen\n    Gutschein kaufst, gelten sie in der Fassung, die zu diesem Zeitpunkt auf unserer Seite\n    steht. Eigene Bedingungen von Gästen gelten nur, wenn wir ihnen schriftlich zustimmen."}</p>
<h2>{"2. Reservierung"}</h2>
<p>{"Reservieren kannst du über unser Reservierungsfenster oder per E-Mail.\n    Der Vertrag kommt zustande, sobald wir deine Reservierung bestätigen — im Fenster\n    passiert das sofort per E-Mail. Kommt keine Bestätigung an, schau bitte in den\n    Spam-Ordner oder melde dich bei uns."}</p>
<p>{"Wir halten den Tisch nach der vereinbarten Zeit noch eine angemessene Zeit frei. Wenn\n    es später wird, sag uns kurz Bescheid — dann halten wir ihn, so gut es geht."}</p>
<p>{"Ob ihr drinnen oder draußen sitzt, können wir nicht fest zusagen. Wir setzen euch nach\n    Wetter und Besetzung; euren Wunsch notieren wir gern."}</p>
<h2 id="storno">{"3. Wenn etwas dazwischenkommt"}</h2>
<p>{"Sag uns bitte Bescheid, wenn du deine Reservierung nicht wahrnehmen kannst oder sich\n    die Zahl der Gäste ändert. Bis "}<b>{"24 Stunden"}</b>{" vor dem Termin ist das jederzeit\n    kostenfrei möglich."}</p>
<p>{"Bei kurzfristiger Absage innerhalb von 24 Stunden, bei einer Verkleinerung der Runde\n    oder bei Nichterscheinen behalten wir uns vor, einen pauschalierten Schadensersatz zu\n    berechnen:"}</p>
<div className="block">{"\n"}<p><b>{"Brunch:"}</b>{" 30 Euro pro Person"}<br />{"\n"}<b>{"Dinner:"}</b>{" 50 Euro pro Person"}</p>{"\n"}</div>
<p>{"Der Grund ist einfach: Wir kochen und backen frisch und kaufen für die Zahl der\n    angemeldeten Gäste ein. Bleiben Plätze leer, bleibt die Ware liegen."}</p>
<p>{"Zwei Dinge, die dir offenstehen: Du kannst deine Reservierung "}<b>{"jederzeit an andere\n    weitergeben"}</b>{" — das freut uns sogar. Und wir versuchen bei einer kurzfristigen Absage,\n    den Platz über unsere Warteliste zu füllen; gelingt das, entfällt die Pauschale."}</p>
<p>{"Dir steht es frei nachzuweisen, dass uns gar kein oder ein geringerer Schaden\n    entstanden ist. Umgekehrt dürfen wir einen tatsächlich höheren Schaden nachweisen und\n    geltend machen."}</p>
<h2 id="veranstaltungen">{"4. Veranstaltungen und Vorbestellungen"}</h2>
<p>{"Für Weinabende, Brunch-Termine, Kitchenpartys und ähnliche Veranstaltungen buchst du\n    einen festen Platz. Die Anmeldung ist verbindlich, sobald wir sie bestätigt haben.\n    Bezahlen kannst du direkt im Buchungsfenster oder nach Absprache mit uns."}</p>
<p>{"Weil wir für solche Abende lange vorher einkaufen und planen, gilt:"}</p>
<div className="block">{"\n"}<p>{"Rücktritt bis "}<b>{"14 Tage"}</b>{" vor dem Termin: kostenfrei"}<br />{"\n"}<b>{"13 bis 7 Tage"}</b>{" vorher: 50 Prozent des Preises"}<br />{"\n"}<b>{"ab 6 Tagen"}</b>{" vorher und bei Nichterscheinen: der volle Preis"}</p>{"\n"}</div>
<p>{"Auch hier gilt: Gib deinen Platz gern an jemand anderen weiter, dann wird nichts\n    fällig. Sag uns nur kurz, wer kommt. Und auch hier darfst du nachweisen, dass uns kein\n    oder ein geringerer Schaden entstanden ist."}</p>
<p>{"Müssen wir eine Veranstaltung absagen — etwa weil zu wenige Anmeldungen zusammenkommen\n    oder jemand krank wird —, erstatten wir dir den gezahlten Betrag vollständig. Weitere\n    Ansprüche bestehen nicht, außer wir haben die Absage vorsätzlich oder grob fahrlässig zu\n    verantworten."}</p>
<p><b>{"Kein Widerrufsrecht:"}</b>{" Buchungen von Tischen und Veranstaltungsplätzen sind\n    Dienstleistungen im Zusammenhang mit der Lieferung von Speisen und Getränken und mit\n    Freizeitbetätigungen zu einem festen Termin. Dafür besteht nach\n    § 312g Absatz 2 Nummer 9 BGB kein Widerrufsrecht. Unsere Stornoregeln oben gelten\n    trotzdem und sind großzügiger, als das Gesetz verlangt."}</p>
<h2>{"5. Preise und Zahlung"}</h2>
<p>{"Alle Preise verstehen sich in Euro und enthalten die gesetzliche Mehrwertsteuer.\n    Im Haus zahlst du nach der Bewirtung. Bei Veranstaltungen und Gutscheinen kannst du\n    online über den angebotenen Zahlungsdienst zahlen; die Zahlung wird dort abgewickelt,\n    wir erhalten keine vollständigen Zahlungsdaten."}</p>
<p>{"Die Karten auf unserer Seite geben den Stand zum Zeitpunkt der Veröffentlichung\n    wieder. Saison, Markt und Verfügbarkeit ändern sich — es gilt die Karte, die am Tag\n    deines Besuchs im Haus liegt."}</p>
<h2>{"6. Gutscheine"}</h2>
<p>{"Unsere Gutscheine stellen wir über einen frei wählbaren Betrag aus. Sie gelten\n    "}<b>{"drei Jahre"}</b>{" ab Ende des Jahres, in dem sie gekauft wurden, und können in\n    Teilbeträgen eingelöst werden; einen Restbetrag schreiben wir dir gut. Eine Auszahlung\n    in bar ist nicht möglich."}</p>
<p>{"Gutscheine gelten für Speisen und Getränke im Haus und für unsere Veranstaltungen.\n    In fremden Onlineshops sind sie nicht einlösbar. Geht ein Gutschein verloren, können wir\n    ihn nur ersetzen, wenn er sich eindeutig zuordnen lässt und noch nicht eingelöst wurde."}</p>
<h2 id="widerruf">{"7. Widerruf beim Kauf von Gutscheinen"}</h2>
<p>{"Kaufst du einen Gutschein über unser Online-Fenster, hast du als Verbraucher ein\n    gesetzliches Widerrufsrecht. "}<b>{"Für Tischreservierungen und für Plätze bei unseren\n    Veranstaltungen gilt es nicht"}</b>{" — dort greifen stattdessen die Regeln in den\n    Abschnitten 3 und 4 (§ 312g Absatz 2 Nummer 9 BGB)."}</p>
<p>{"Die beiden folgenden Kästen sind die amtliche Fassung aus der Anlage zum EGBGB. Sie\n    siezen, weil wir am Gesetzestext nichts ändern dürfen, ohne seine Schutzwirkung zu\n    verlieren."}</p>
<div className="block">{"\n"}<h3>{"Widerrufsbelehrung"}</h3>{"\n"}<p><b>{"Widerrufsrecht"}</b></p>{"\n"}<p>{"Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu\n      widerrufen."}</p>{"\n"}<p>{"Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses."}</p>{"\n"}<p>{"Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Joujou GmbH, Hauptstraße 34,\n      67098 Bad Dürkheim, Telefon +49 6322 7906693, E-Mail hallo@joujou-pfalz.de) mittels einer\n      eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über\n      Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das\n      beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist."}</p>{"\n"}<p>{"Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung\n      des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden."}</p>{"\n"}<p><b>{"Folgen des Widerrufs"}</b></p>{"\n"}<p>{"Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen\n      erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die\n      sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene,\n      günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn\n      Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags\n      bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das\n      Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde\n      ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser\n      Rückzahlung Entgelte berechnet."}</p>{"\n"}</div>
<div className="block">{"\n"}<h3>{"Muster-Widerrufsformular"}</h3>{"\n"}<p>{"(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und\n      senden Sie es zurück.)"}</p>{"\n"}<p>{"An Joujou GmbH, Hauptstraße 34, 67098 Bad Dürkheim, hallo@joujou-pfalz.de:"}</p>{"\n"}<p>{"Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den\n      Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)"}</p>{"\n"}<p>{"Bestellt am (*)/erhalten am (*)"}<br />{"\n      Name des/der Verbraucher(s)"}<br />{"\n      Anschrift des/der Verbraucher(s)"}<br />{"\n      Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)"}<br />{"\n      Datum"}</p>{"\n"}<p>{"(*) Unzutreffendes streichen."}</p>{"\n"}</div>
<h2>{"8. Allergien und Unverträglichkeiten"}</h2>
<p>{"Sag uns Unverträglichkeiten bitte "}<b>{"bei der Reservierung"}</b>{", nicht erst am Tisch —\n    im Reservierungsfenster gibt es dafür das Feld „Anmerkung\". Dann können wir vorher\n    planen. Über Allergene und Zusatzstoffe informieren wir dich auf Nachfrage; unsere Küche\n    arbeitet in einem Betrieb, in dem viele Zutaten verarbeitet werden, Spuren lassen sich\n    deshalb nicht in jedem Fall ausschließen."}</p>
<h2>{"9. Haftung"}</h2>
<p>{"Wir haften unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder\n    der Gesundheit sowie für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.\n    Bei leicht fahrlässiger Verletzung einer Pflicht, auf deren Erfüllung du vertrauen darfst\n    und die für die Durchführung des Vertrags wesentlich ist, haften wir der Höhe nach\n    begrenzt auf den vertragstypischen, vorhersehbaren Schaden. Im Übrigen ist unsere\n    Haftung ausgeschlossen."}</p>
<p>{"Für Garderobe und mitgebrachte Gegenstände haften wir nur nach den gesetzlichen\n    Vorschriften. Lass Wertsachen bitte nicht unbeaufsichtigt liegen."}</p>
<h2>{"10. Bilder im Haus"}</h2>
<p>{"Bei öffentlichen Veranstaltungen fotografieren wir gelegentlich. Wenn du nicht\n    abgebildet werden möchtest, sag es uns oder der Person mit der Kamera — das genügt, und\n    wir halten uns daran."}</p>
<h2>{"11. Streitbeilegung"}</h2>
<p>{"Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer\n    Verbraucherschlichtungsstelle teilzunehmen."}</p>
<h2>{"12. Schlussbestimmungen"}</h2>
<p>{"Es gilt deutsches Recht. Ist eine Bestimmung dieser Bedingungen unwirksam, bleiben die\n    übrigen wirksam. Gerichtsstand ist Bad Dürkheim, wenn du Kaufmann, juristische Person des\n    öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen bist oder keinen\n    allgemeinen Gerichtsstand in Deutschland hast."}</p>
<p className="stand">{"Stand: Oktober 2026"}</p>
      </main>
      <footer className="winebar-legal-wrap">
        <span>Joujou GmbH, Mareile Haider und Frank Püschel</span>
        <nav aria-label="Rechtliche Seiten">
          <Link href="/impressum">Impressum</Link>{" · "}
          <Link href="/datenschutz">Datenschutz</Link>{" · "}
          <Link href="/barrierefreiheit">Barrierefreiheit</Link>{" · "}
          <Link href="/">Startseite</Link>
        </nav>
      </footer>
    </div>
  );
}
