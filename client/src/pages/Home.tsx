/* ============================================================
   FIRE400 — Home Page · Amber Edition
   Design: Warm charcoal base, ember red + amber gold accents,
   bokeh cocktail atmosphere. Sections: Hero (split), Manifesto,
   Details Grid, NEW Cocktails Section, Image Showcase, Footer.
   ============================================================ */

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Flame, Wine, Users, Clock, GlassWater } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [weight, setWeight] = useState([1000]);
  const [guests, setGuests] = useState("2");

  const price = (weight[0] / 100) * 10;
  const pricePerPerson = Math.round(price / parseInt(guests));

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0d0b09", color: "#f0ece4" }}>

      {/* ── HERO: Split Screen ─────────────────────────────── */}
      <div className="relative h-screen flex flex-col md:flex-row">

        {/* Left: FIRE */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden" style={{ borderRight: "1px solid #2a2420" }}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/manus-storage/fire-grill-night_4dc64405.jpg')" }}
          />
          <div className="absolute inset-0 transition-colors duration-500" style={{ background: "linear-gradient(to bottom, rgba(13,11,9,0.3) 0%, rgba(13,11,9,0.75) 100%)" }} />

          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
            <Flame className="w-14 h-14 mb-4" style={{ color: "#ff4500" }} />
            <h1 className="font-display mb-2 tracking-tight" style={{ fontSize: "clamp(4rem,10vw,7rem)", lineHeight: 1, color: "#f0ece4" }}>FIRE</h1>
            <p className="font-body mb-8 max-w-sm" style={{ fontSize: "1.15rem", color: "#c8b8a0" }}>
              Ein Steak. Eine Gruppe. Ein Erlebnis.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn-ember px-8 py-4 text-lg font-display tracking-wider uppercase" style={{ backgroundColor: "#ff4500", color: "#f0ece4" }}>
                  Tisch reservieren
                </button>
              </DialogTrigger>
              <DialogContent style={{ backgroundColor: "#1a1612", border: "1px solid #2a2420", color: "#f0ece4", borderRadius: 0, maxWidth: "28rem" }}>
                <DialogHeader>
                  <DialogTitle className="font-display text-center uppercase tracking-wider" style={{ fontSize: "1.75rem", color: "#f0ece4" }}>
                    Fire400 Reservierung
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="p-4" style={{ backgroundColor: "#0d0b09", border: "1px solid #2a2420" }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#c8841a" }}>Die Regel:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: "#c8b8a0" }}>
                      <li>Nur für Gruppen (2–4 Personen)</li>
                      <li>Nur Tomahawk (800–1500g)</li>
                      <li>Do–Fr ab 18 Uhr, Sa–So ab 12 Uhr</li>
                      <li>Passt nicht? <span className="font-bold" style={{ color: "#ff4500" }}>Move on.</span></li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label style={{ color: "#c8b8a0" }}>Wie viele Personen seid ihr?</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger style={{ backgroundColor: "#0d0b09", border: "1px solid #2a2420", borderRadius: 0, color: "#f0ece4" }}>
                          <SelectValue placeholder="Wähle Anzahl" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: "#1a1612", border: "1px solid #2a2420", borderRadius: 0 }}>
                          <SelectItem value="2">2 Personen</SelectItem>
                          <SelectItem value="3">3 Personen</SelectItem>
                          <SelectItem value="4">4 Personen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label style={{ color: "#c8b8a0" }}>Wähle dein Gewicht</Label>
                        <span className="font-display text-xl" style={{ color: "#ff4500" }}>{weight[0]}g</span>
                      </div>
                      <Slider
                        value={weight}
                        onValueChange={setWeight}
                        min={800}
                        max={1500}
                        step={100}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs uppercase tracking-wider" style={{ color: "#a09080" }}>
                        <span>800g</span>
                        <span>1500g</span>
                      </div>
                    </div>

                    <div className="p-4 text-center" style={{ backgroundColor: "#0d0b09", border: "1px solid #c8841a" }}>
                      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#a09080" }}>Preis (10€ / 100g)</div>
                      <div className="font-display mb-1" style={{ fontSize: "2.5rem", color: "#f0ece4" }}>{price}€</div>
                      <div className="text-sm font-bold" style={{ color: "#c8841a" }}>ca. {pricePerPerson}€ pro Person</div>
                    </div>

                    <div className="text-xs text-center italic" style={{ color: "#a09080" }}>
                      *Falls das Steak größer ist als bestellt, gehen die Extra-Gramm aufs Haus.
                    </div>

                    <button
                      className="w-full font-display uppercase tracking-wider text-lg py-4"
                      style={{ backgroundColor: "#ff4500", color: "#f0ece4", border: "none", cursor: "pointer" }}
                    >
                      Jetzt Anfragen
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Right: 400 (Wine) */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/manus-storage/hero-wine_885d2a21.jpg')" }}
          />
          <div className="absolute inset-0 transition-colors duration-500" style={{ background: "linear-gradient(to bottom, rgba(13,11,9,0.3) 0%, rgba(13,11,9,0.75) 100%)" }} />

          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
            <Wine className="w-14 h-14 mb-4" style={{ color: "#d4a843" }} />
            <h1 className="font-display mb-2 tracking-tight" style={{ fontSize: "clamp(4rem,10vw,7rem)", lineHeight: 1, color: "#f0ece4" }}>400</h1>
            <p className="font-body mb-8 max-w-sm" style={{ fontSize: "1.15rem", color: "#c8b8a0" }}>
              400 Bio-Weine. Gewölbekeller. Walk-in.
            </p>
            <button
              className="font-display uppercase tracking-wider text-lg px-8 py-4"
              style={{ border: "2px solid #d4a843", color: "#d4a843", backgroundColor: "transparent", cursor: "pointer" }}
            >
              Weinbar Entdecken
            </button>
          </div>
        </div>

        {/* Center Diamond Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
          style={{ backgroundColor: "#0d0b09", border: "1px solid #c8841a", padding: "1rem", transform: "translate(-50%, -50%) rotate(45deg)" }}>
          <div className="font-display tracking-widest" style={{ transform: "rotate(-45deg)", fontSize: "1.1rem", color: "#f0ece4" }}>
            FIRE<span style={{ color: "#ff4500" }}>400</span>
          </div>
        </div>
      </div>

      {/* ── MANIFESTO ──────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ backgroundColor: "#0d0b09", borderBottom: "1px solid #2a2420" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="amber-line mb-8 mx-auto" style={{ width: "4rem" }} />
          <h2 className="font-display mb-8 leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f0ece4" }}>
            Das sicherlich <span style={{ color: "#ff4500" }}>nachhaltigste</span> und <span style={{ color: "#ff4500" }}>kurioseste</span> Steakerlebnis Deutschlands.
          </h2>
          <p className="font-body leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "1.2rem", color: "#a09080" }}>
            Wir sind kein Steakhaus. Wir sind ein Ritual.<br />
            Du kommst nicht alleine. Du kommst mit deiner Crew.<br />
            Ihr teilt euch ein riesiges Tomahawk vom Bio-Weiderind.<br />
            Unser Service schneidet es am Tisch auf.<br />
            Ihr esst zusammen, trinkt Bio-Wein – und ab 20 Uhr eskaliert die Musik.
          </p>
          <div className="amber-line mt-8 mx-auto" style={{ width: "4rem" }} />
        </div>
      </section>

      {/* ── DETAILS GRID ───────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: "1px solid #2a2420" }}>
        {[
          {
            icon: <Users className="w-10 h-10" style={{ color: "#ff4500" }} />,
            title: "Nur Gruppen",
            text: "Fire400 ist ein soziales Event. Reservierungen nur für 2 bis 4 Personen. Solo-Esser? Besuche unser JouJou Restaurant am Samstag.",
          },
          {
            icon: <Flame className="w-10 h-10" style={{ color: "#ff4500" }} />,
            title: "Nur Tomahawk",
            text: "Keine Karte. Keine Auswahl. Nur das beste Stück vom LandLuft Bio-Weiderind. Dry Aged. 800g bis 1500g. Am Tisch tranchiert.",
          },
          {
            icon: <Clock className="w-10 h-10" style={{ color: "#ff4500" }} />,
            title: "Nur Do–So",
            text: "Do & Fr ab 18 Uhr. Sa & So ab 12 Uhr. Maximal 26 Gäste gleichzeitig. Reservierung zwingend erforderlich.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-12"
            style={{
              backgroundColor: "#1a1612",
              borderRight: i < 2 ? "1px solid #2a2420" : undefined,
              borderBottom: "1px solid #2a2420",
            }}
          >
            {item.icon}
            <h3 className="font-display mt-6 mb-4" style={{ fontSize: "1.5rem", color: "#f0ece4" }}>{item.title}</h3>
            <p style={{ color: "#a09080", lineHeight: 1.7 }}>{item.text}</p>
          </div>
        ))}
      </section>

      {/* ── COCKTAILS SECTION ──────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ borderBottom: "1px solid #2a2420" }}>
        {/* Background image with warm overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/manus-storage/cocktail-bar-amber_6ece2f29.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(13,11,9,0.92) 0%, rgba(26,22,18,0.80) 50%, rgba(13,11,9,0.92) 100%)" }}
        />

        <div className="relative z-10 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <GlassWater className="w-12 h-12 mx-auto mb-4" style={{ color: "#d4a843" }} />
              <h2 className="font-display mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#f0ece4", letterSpacing: "0.05em" }}>
                COCKTAILS
              </h2>
              <div className="amber-line mx-auto mb-6" style={{ width: "5rem" }} />
              <p className="font-body max-w-xl mx-auto" style={{ fontSize: "1.1rem", color: "#c8b8a0" }}>
                Handcrafted. Kein Kompromiss. Genau wie das Steak.
              </p>
            </div>

            {/* Cocktail cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: "1px solid #2a2420" }}>
              {[
                {
                  name: "EMBER OLD FASHIONED",
                  base: "Rye Whiskey",
                  desc: "Geräucherter Ahornsirup · Angostura · Rauchsalz · Orangenzeste",
                  color: "#c8841a",
                  note: "Signature",
                },
                {
                  name: "FIRE NEGRONI",
                  base: "Gin · Campari · Vermouth",
                  desc: "Getrocknete Blutorange · Rosmarin-Infusion · Fleur de Sel",
                  color: "#ff4500",
                  note: "Klassiker",
                },
                {
                  name: "400 SPRITZ",
                  base: "Pfalz Riesling · Aperol",
                  desc: "Holunderblüte · Zitronengras · Prosecco · Limette",
                  color: "#d4a843",
                  note: "Leicht",
                },
              ].map((cocktail, i) => (
                <div
                  key={i}
                  className="p-10"
                  style={{
                    backgroundColor: "rgba(26,22,18,0.85)",
                    borderRight: i < 2 ? "1px solid #2a2420" : undefined,
                  }}
                >
                  <div className="text-xs uppercase tracking-widest mb-3 font-body" style={{ color: cocktail.color }}>
                    {cocktail.note}
                  </div>
                  <h3 className="font-display mb-2" style={{ fontSize: "1.3rem", color: "#f0ece4", letterSpacing: "0.05em" }}>
                    {cocktail.name}
                  </h3>
                  <div className="text-sm mb-3 font-body" style={{ color: "#d4a843" }}>{cocktail.base}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#a09080" }}>{cocktail.desc}</p>
                  <div className="mt-6" style={{ height: "1px", background: `linear-gradient(90deg, ${cocktail.color}, transparent)` }} />
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="text-center mt-10">
              <p className="font-body text-sm" style={{ color: "#a09080" }}>
                Alle Cocktails auch alkoholfrei verfügbar · Saisonale Specials auf der Tafel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SHOWCASE ─────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ height: "60vh" }}>
        <div
          className="relative group overflow-hidden"
          style={{ backgroundImage: "url('/manus-storage/fire-grill-night_4dc64405.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: "rgba(13,11,9,0.3)" }} />
          <div className="absolute bottom-0 left-0 p-8 z-10">
            <h3 className="font-display mb-2" style={{ fontSize: "2.5rem", color: "#f0ece4" }}>The Cut</h3>
            <p style={{ color: "#c8b8a0" }}>LandLuft Bio-Weiderind · 5 Wochen Dry Aged</p>
          </div>
        </div>
        <div
          className="relative group overflow-hidden"
          style={{ backgroundImage: "url('/manus-storage/event-barn-party_39ecd5b3.jpg')", backgroundSize: "cover", backgroundPosition: "center", borderLeft: "1px solid #2a2420" }}
        >
          <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: "rgba(13,11,9,0.3)" }} />
          <div className="absolute bottom-0 left-0 p-8 z-10">
            <h3 className="font-display mb-2" style={{ fontSize: "2.5rem", color: "#f0ece4" }}>The Vibe</h3>
            <p style={{ color: "#c8b8a0" }}>Grooviger Sound · Ab 20 Uhr drehen wir auf</p>
          </div>
        </div>
      </section>

      {/* ── COCKTAIL HERO BANNER ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "50vh", borderTop: "1px solid #2a2420" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/manus-storage/cocktails-hero_f246c9de.png')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(13,11,9,0.85) 0%, rgba(13,11,9,0.4) 60%, rgba(13,11,9,0.1) 100%)" }}
        />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <p className="font-body uppercase tracking-widest text-sm mb-3" style={{ color: "#c8841a" }}>Come as you are</p>
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f0ece4", maxWidth: "20ch", lineHeight: 1.1 }}>
            Erst das Steak.<br />Dann die Nacht.
          </h2>
          <p className="font-body" style={{ color: "#c8b8a0", maxWidth: "30ch", lineHeight: 1.7 }}>
            Fire400 ist kein Restaurant. Es ist der Beginn eines Abends, der eskaliert.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="py-12" style={{ backgroundColor: "#0d0b09", borderTop: "1px solid #2a2420" }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display tracking-widest" style={{ fontSize: "1.5rem", color: "#f0ece4" }}>
            FIRE<span style={{ color: "#ff4500" }}>400</span>
          </div>
          <div className="amber-line hidden md:block" style={{ width: "6rem" }} />
          <div className="text-sm text-center md:text-right" style={{ color: "#a09080" }}>
            <p>Eine Marke von JouJou Pfalz</p>
            <p>Leistadt · Deutschland</p>
            <p className="mt-2 font-bold" style={{ color: "#ff4500" }}>Passt nicht? Move on.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
