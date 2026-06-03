/* ============================================================
   FIRE400 — Home Page · Multi-Theme Edition
   5 themes: RUSTY · NEON · BLACK · BONE · INFERNO
   Theme switcher fixed bottom-center, always visible.
   ============================================================ */

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Flame, Wine, Users, Clock, GlassWater } from "lucide-react";
import { useState } from "react";

// ── Theme Definitions ────────────────────────────────────────
type Theme = {
  name: string;
  label: string;
  bg: string;
  bgCard: string;
  bgSmoke: string;
  fg: string;
  fgMuted: string;
  accent1: string;   // primary CTA / ember
  accent2: string;   // secondary / gold
  border: string;
  btnBg: string;
  btnText: string;
  btn2Border: string;
  btn2Text: string;
  dividerGrad: string;
  heroBg: string;    // left hero overlay
  heroRight: string; // right hero overlay
};

const themes: Record<string, Theme> = {
  rusty: {
    name: "rusty",
    label: "RUSTY",
    bg: "#0d0b09",
    bgCard: "#1a1612",
    bgSmoke: "#2a2420",
    fg: "#f0ece4",
    fgMuted: "#a09080",
    accent1: "#ff4500",
    accent2: "#c8841a",
    border: "#2a2420",
    btnBg: "#ff4500",
    btnText: "#f0ece4",
    btn2Border: "#d4a843",
    btn2Text: "#d4a843",
    dividerGrad: "linear-gradient(90deg, #c8841a, #d4a843, #c8841a)",
    heroBg: "linear-gradient(to bottom, rgba(13,11,9,0.3) 0%, rgba(13,11,9,0.75) 100%)",
    heroRight: "linear-gradient(to bottom, rgba(13,11,9,0.3) 0%, rgba(13,11,9,0.75) 100%)",
  },
  neon: {
    name: "neon",
    label: "NEON",
    bg: "#050510",
    bgCard: "#0a0a1e",
    bgSmoke: "#14142a",
    fg: "#e8e0ff",
    fgMuted: "#8878cc",
    accent1: "#00ffcc",
    accent2: "#ff00aa",
    border: "#1e1e3a",
    btnBg: "#00ffcc",
    btnText: "#050510",
    btn2Border: "#ff00aa",
    btn2Text: "#ff00aa",
    dividerGrad: "linear-gradient(90deg, #00ffcc, #ff00aa, #00ffcc)",
    heroBg: "linear-gradient(to bottom, rgba(5,5,16,0.4) 0%, rgba(5,5,16,0.8) 100%)",
    heroRight: "linear-gradient(to bottom, rgba(5,5,16,0.4) 0%, rgba(5,5,16,0.8) 100%)",
  },
  black: {
    name: "black",
    label: "BLACK",
    bg: "#000000",
    bgCard: "#0a0a0a",
    bgSmoke: "#111111",
    fg: "#ffffff",
    fgMuted: "#666666",
    accent1: "#ffffff",
    accent2: "#888888",
    border: "#1a1a1a",
    btnBg: "#ffffff",
    btnText: "#000000",
    btn2Border: "#ffffff",
    btn2Text: "#ffffff",
    dividerGrad: "linear-gradient(90deg, #333, #fff, #333)",
    heroBg: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
    heroRight: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
  },
  bone: {
    name: "bone",
    label: "BONE",
    bg: "#f5f0e8",
    bgCard: "#ece5d6",
    bgSmoke: "#d8cfc0",
    fg: "#1a1510",
    fgMuted: "#6b5e4e",
    accent1: "#8b2500",
    accent2: "#5c3d1e",
    border: "#c8bfb0",
    btnBg: "#8b2500",
    btnText: "#f5f0e8",
    btn2Border: "#5c3d1e",
    btn2Text: "#5c3d1e",
    dividerGrad: "linear-gradient(90deg, #8b2500, #5c3d1e, #8b2500)",
    heroBg: "linear-gradient(to bottom, rgba(245,240,232,0.2) 0%, rgba(245,240,232,0.7) 100%)",
    heroRight: "linear-gradient(to bottom, rgba(245,240,232,0.2) 0%, rgba(245,240,232,0.7) 100%)",
  },
  inferno: {
    name: "inferno",
    label: "INFERNO",
    bg: "#0a0000",
    bgCard: "#1a0500",
    bgSmoke: "#2a0a00",
    fg: "#fff5e0",
    fgMuted: "#cc7744",
    accent1: "#ff6600",
    accent2: "#ffaa00",
    border: "#3a1000",
    btnBg: "#ff6600",
    btnText: "#0a0000",
    btn2Border: "#ffaa00",
    btn2Text: "#ffaa00",
    dividerGrad: "linear-gradient(90deg, #ff6600, #ffaa00, #ff6600)",
    heroBg: "linear-gradient(to bottom, rgba(10,0,0,0.2) 0%, rgba(10,0,0,0.7) 100%)",
    heroRight: "linear-gradient(to bottom, rgba(10,0,0,0.2) 0%, rgba(10,0,0,0.7) 100%)",
  },
};

// ── Component ────────────────────────────────────────────────
export default function Home() {
  const [activeTheme, setActiveTheme] = useState<string>("rusty");
  const [weight, setWeight] = useState([1000]);
  const [guests, setGuests] = useState("2");

  const t = themes[activeTheme];
  const price = (weight[0] / 100) * 10;
  const pricePerPerson = Math.round(price / parseInt(guests));

  const cocktails = [
    { name: "EMBER OLD FASHIONED", base: "Rye Whiskey", desc: "Geräucherter Ahornsirup · Angostura · Rauchsalz · Orangenzeste", note: "Signature" },
    { name: "FIRE NEGRONI", base: "Gin · Campari · Vermouth", desc: "Getrocknete Blutorange · Rosmarin-Infusion · Fleur de Sel", note: "Klassiker" },
    { name: "400 SPRITZ", base: "Pfalz Riesling · Aperol", desc: "Holunderblüte · Zitronengras · Prosecco · Limette", note: "Leicht" },
  ];

  return (
    <div style={{ backgroundColor: t.bg, color: t.fg, minHeight: "100vh", overflowX: "hidden", transition: "background-color 0.4s ease, color 0.4s ease" }}>

      {/* ── HERO: Split Screen ─────────────────────────────── */}
      <div className="relative h-screen flex flex-col md:flex-row">

        {/* Left: FIRE */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden" style={{ borderRight: `1px solid ${t.border}` }}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/manus-storage/fire-grill-night_4dc64405.jpg')" }} />
          <div className="absolute inset-0 transition-colors duration-500" style={{ background: t.heroBg }} />

          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
            <Flame className="w-14 h-14 mb-4" style={{ color: t.accent1 }} />
            <h1 className="font-display mb-2 tracking-tight" style={{ fontSize: "clamp(4rem,10vw,7rem)", lineHeight: 1, color: t.fg }}>FIRE</h1>
            <p className="font-body mb-8 max-w-sm" style={{ fontSize: "1.15rem", color: t.fgMuted }}>
              Ein Steak. Eine Gruppe. Ein Erlebnis.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="font-display tracking-wider uppercase px-8 py-4 text-lg" style={{ backgroundColor: t.btnBg, color: t.btnText, border: "none", cursor: "pointer", transition: "opacity 0.2s" }}>
                  Tisch reservieren
                </button>
              </DialogTrigger>
              <DialogContent style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}`, color: t.fg, borderRadius: 0, maxWidth: "28rem" }}>
                <DialogHeader>
                  <DialogTitle className="font-display text-center uppercase tracking-wider" style={{ fontSize: "1.75rem", color: t.fg }}>
                    Fire400 Reservierung
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="p-4" style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: t.accent2 }}>Die Regel:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: t.fgMuted }}>
                      <li>Nur für Gruppen (2–4 Personen)</li>
                      <li>Nur Tomahawk (800–1500g)</li>
                      <li>Do–Fr ab 18 Uhr, Sa–So ab 12 Uhr</li>
                      <li>Passt nicht? <span className="font-bold" style={{ color: t.accent1 }}>Move on.</span></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label style={{ color: t.fgMuted }}>Wie viele Personen seid ihr?</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger style={{ backgroundColor: t.bg, border: `1px solid ${t.border}`, borderRadius: 0, color: t.fg }}>
                          <SelectValue placeholder="Wähle Anzahl" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 0 }}>
                          <SelectItem value="2">2 Personen</SelectItem>
                          <SelectItem value="3">3 Personen</SelectItem>
                          <SelectItem value="4">4 Personen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label style={{ color: t.fgMuted }}>Wähle dein Gewicht</Label>
                        <span className="font-display text-xl" style={{ color: t.accent1 }}>{weight[0]}g</span>
                      </div>
                      <Slider value={weight} onValueChange={setWeight} min={800} max={1500} step={100} className="py-4" />
                      <div className="flex justify-between text-xs uppercase tracking-wider" style={{ color: t.fgMuted }}>
                        <span>800g</span><span>1500g</span>
                      </div>
                    </div>
                    <div className="p-4 text-center" style={{ backgroundColor: t.bg, border: `1px solid ${t.accent2}` }}>
                      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: t.fgMuted }}>Preis (10€ / 100g)</div>
                      <div className="font-display mb-1" style={{ fontSize: "2.5rem", color: t.fg }}>{price}€</div>
                      <div className="text-sm font-bold" style={{ color: t.accent2 }}>ca. {pricePerPerson}€ pro Person</div>
                    </div>
                    <div className="text-xs text-center italic" style={{ color: t.fgMuted }}>
                      *Falls das Steak größer ist als bestellt, gehen die Extra-Gramm aufs Haus.
                    </div>
                    <button className="w-full font-display uppercase tracking-wider text-lg py-4" style={{ backgroundColor: t.btnBg, color: t.btnText, border: "none", cursor: "pointer" }}>
                      Jetzt Anfragen
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Right: 400 */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/manus-storage/hero-wine_885d2a21.jpg')" }} />
          <div className="absolute inset-0 transition-colors duration-500" style={{ background: t.heroRight }} />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
            <Wine className="w-14 h-14 mb-4" style={{ color: t.accent2 }} />
            <h1 className="font-display mb-2 tracking-tight" style={{ fontSize: "clamp(4rem,10vw,7rem)", lineHeight: 1, color: t.fg }}>400</h1>
            <p className="font-body mb-8 max-w-sm" style={{ fontSize: "1.15rem", color: t.fgMuted }}>
              400 Bio-Weine. Gewölbekeller. Walk-in.
            </p>
            <button className="font-display uppercase tracking-wider text-lg px-8 py-4" style={{ border: `2px solid ${t.btn2Border}`, color: t.btn2Text, backgroundColor: "transparent", cursor: "pointer" }}>
              Weinbar Entdecken
            </button>
          </div>
        </div>

        {/* Center Diamond */}
        <div className="absolute top-1/2 left-1/2 z-20 hidden md:block"
          style={{ backgroundColor: t.bg, border: `1px solid ${t.accent2}`, padding: "1rem", transform: "translate(-50%, -50%) rotate(45deg)" }}>
          <div className="font-display tracking-widest" style={{ transform: "rotate(-45deg)", fontSize: "1.1rem", color: t.fg }}>
            FIRE<span style={{ color: t.accent1 }}>400</span>
          </div>
        </div>
      </div>

      {/* ── MANIFESTO ──────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ backgroundColor: t.bg, borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ height: "2px", background: t.dividerGrad, width: "4rem", margin: "0 auto 2rem" }} />
          <h2 className="font-display mb-8 leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: t.fg }}>
            Das sicherlich <span style={{ color: t.accent1 }}>nachhaltigste</span> und <span style={{ color: t.accent1 }}>kurioseste</span> Steakerlebnis Deutschlands.
          </h2>
          <p className="font-body leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "1.2rem", color: t.fgMuted }}>
            Wir sind kein Steakhaus. Wir sind ein Ritual.<br />
            Du kommst nicht alleine. Du kommst mit deiner Crew.<br />
            Ihr teilt euch ein riesiges Tomahawk vom Bio-Weiderind.<br />
            Unser Service schneidet es am Tisch auf.<br />
            Ihr esst zusammen, trinkt Bio-Wein – und ab 20 Uhr eskaliert die Musik.
          </p>
          <div style={{ height: "2px", background: t.dividerGrad, width: "4rem", margin: "2rem auto 0" }} />
        </div>
      </section>

      {/* ── DETAILS GRID ───────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: `1px solid ${t.border}` }}>
        {[
          { icon: <Users className="w-10 h-10" style={{ color: t.accent1 }} />, title: "Nur Gruppen", text: "Fire400 ist ein soziales Event. Reservierungen nur für 2 bis 4 Personen. Solo-Esser? Besuche unser JouJou Restaurant am Samstag." },
          { icon: <Flame className="w-10 h-10" style={{ color: t.accent1 }} />, title: "Nur Tomahawk", text: "Keine Karte. Keine Auswahl. Nur das beste Stück vom LandLuft Bio-Weiderind. Dry Aged. 800g bis 1500g. Am Tisch tranchiert." },
          { icon: <Clock className="w-10 h-10" style={{ color: t.accent1 }} />, title: "Nur Do–So", text: "Do & Fr ab 18 Uhr. Sa & So ab 12 Uhr. Maximal 26 Gäste gleichzeitig. Reservierung zwingend erforderlich." },
        ].map((item, i) => (
          <div key={i} className="p-12" style={{ backgroundColor: t.bgCard, borderRight: i < 2 ? `1px solid ${t.border}` : undefined, borderBottom: `1px solid ${t.border}` }}>
            {item.icon}
            <h3 className="font-display mt-6 mb-4" style={{ fontSize: "1.5rem", color: t.fg }}>{item.title}</h3>
            <p style={{ color: t.fgMuted, lineHeight: 1.7 }}>{item.text}</p>
          </div>
        ))}
      </section>

      {/* ── COCKTAILS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/manus-storage/cocktail-bar-amber_6ece2f29.jpg')" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${t.bg}ee 0%, ${t.bgCard}cc 50%, ${t.bg}ee 100%)` }} />
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <GlassWater className="w-12 h-12 mx-auto mb-4" style={{ color: t.accent2 }} />
              <h2 className="font-display mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", color: t.fg, letterSpacing: "0.05em" }}>COCKTAILS</h2>
              <div style={{ height: "2px", background: t.dividerGrad, width: "5rem", margin: "0 auto 1.5rem" }} />
              <p className="font-body max-w-xl mx-auto" style={{ fontSize: "1.1rem", color: t.fgMuted }}>
                Handcrafted. Kein Kompromiss. Genau wie das Steak.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: `1px solid ${t.border}` }}>
              {cocktails.map((c, i) => (
                <div key={i} className="p-10" style={{ backgroundColor: `${t.bgCard}dd`, borderRight: i < 2 ? `1px solid ${t.border}` : undefined }}>
                  <div className="text-xs uppercase tracking-widest mb-3 font-body" style={{ color: t.accent2 }}>{c.note}</div>
                  <h3 className="font-display mb-2" style={{ fontSize: "1.3rem", color: t.fg, letterSpacing: "0.05em" }}>{c.name}</h3>
                  <div className="text-sm mb-3 font-body" style={{ color: t.accent2 }}>{c.base}</div>
                  <p className="text-sm leading-relaxed" style={{ color: t.fgMuted }}>{c.desc}</p>
                  <div className="mt-6" style={{ height: "1px", background: `linear-gradient(90deg, ${t.accent1}, transparent)` }} />
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="font-body text-sm" style={{ color: t.fgMuted }}>
                Alle Cocktails auch alkoholfrei verfügbar · Saisonale Specials auf der Tafel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SHOWCASE ─────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ height: "60vh" }}>
        <div className="relative group overflow-hidden" style={{ backgroundImage: "url('/manus-storage/fire-grill-night_4dc64405.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.3)" }} />
          <div className="absolute bottom-0 left-0 p-8 z-10">
            <h3 className="font-display mb-2" style={{ fontSize: "2.5rem", color: "#ffffff" }}>The Cut</h3>
            <p style={{ color: "#cccccc" }}>LandLuft Bio-Weiderind · 5 Wochen Dry Aged</p>
          </div>
        </div>
        <div className="relative group overflow-hidden" style={{ backgroundImage: "url('/manus-storage/event-barn-party_39ecd5b3.jpg')", backgroundSize: "cover", backgroundPosition: "center", borderLeft: `1px solid ${t.border}` }}>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.3)" }} />
          <div className="absolute bottom-0 left-0 p-8 z-10">
            <h3 className="font-display mb-2" style={{ fontSize: "2.5rem", color: "#ffffff" }}>The Vibe</h3>
            <p style={{ color: "#cccccc" }}>Grooviger Sound · Ab 20 Uhr drehen wir auf</p>
          </div>
        </div>
      </section>

      {/* ── COCKTAIL HERO BANNER ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "50vh", borderTop: `1px solid ${t.border}` }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/manus-storage/cocktails-hero_f246c9de.png')" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${t.bg}dd 0%, ${t.bg}66 60%, ${t.bg}11 100%)` }} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <p className="font-body uppercase tracking-widest text-sm mb-3" style={{ color: t.accent2 }}>Come as you are</p>
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: t.fg, maxWidth: "20ch", lineHeight: 1.1 }}>
            Erst das Steak.<br />Dann die Nacht.
          </h2>
          <p className="font-body" style={{ color: t.fgMuted, maxWidth: "30ch", lineHeight: 1.7 }}>
            Fire400 ist kein Restaurant. Es ist der Beginn eines Abends, der eskaliert.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="py-12" style={{ backgroundColor: t.bg, borderTop: `1px solid ${t.border}` }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display tracking-widest" style={{ fontSize: "1.5rem", color: t.fg }}>
            FIRE<span style={{ color: t.accent1 }}>400</span>
          </div>
          <div style={{ height: "2px", background: t.dividerGrad, width: "6rem" }} className="hidden md:block" />
          <div className="text-sm text-center md:text-right" style={{ color: t.fgMuted }}>
            <p>Eine Marke von JouJou Pfalz</p>
            <p>Leistadt · Deutschland</p>
            <p className="mt-2 font-bold" style={{ color: t.accent1 }}>Passt nicht? Move on.</p>
          </div>
        </div>
      </footer>

      {/* ── THEME SWITCHER (fixed) ──────────────────────────── */}
      <div
        className="fixed bottom-6 left-1/2 z-50 flex gap-2 px-4 py-3"
        style={{
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "2px",
        }}
      >
        {Object.values(themes).map((th) => (
          <button
            key={th.name}
            onClick={() => setActiveTheme(th.name)}
            className="font-display text-xs tracking-widest uppercase px-3 py-2 transition-all duration-200"
            style={{
              backgroundColor: activeTheme === th.name ? th.accent1 : "transparent",
              color: activeTheme === th.name ? (th.name === "black" ? "#000" : th.name === "bone" ? "#f5f0e8" : "#fff") : "rgba(255,255,255,0.5)",
              border: activeTheme === th.name ? "none" : "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              minWidth: "4.5rem",
            }}
          >
            {th.label}
          </button>
        ))}
      </div>

    </div>
  );
}
