import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Wine, Users, Calendar, Clock, ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [weight, setWeight] = useState([1000]);
  const [guests, setGuests] = useState("2");
  
  const price = (weight[0] / 100) * 10;
  const pricePerPerson = Math.round(price / parseInt(guests));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section - Split Screen */}
      <div className="relative h-screen flex flex-col md:flex-row">
        
        {/* Left Side: FIRE (Steak) */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b md:border-b-0 md:border-r border-border">
          <div className="absolute inset-0 bg-[url('/images/hero-tomahawk-plancha.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
            <Flame className="w-16 h-16 text-primary mb-4 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-display text-white mb-2 tracking-tighter">FIRE</h1>
            <p className="text-xl md:text-2xl font-body text-gray-200 mb-8 max-w-md">
              Ein Steak. Eine Gruppe. Ein Erlebnis.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none text-lg px-8 py-6 h-auto font-display tracking-wide uppercase rounded-none">
                  Tisch reservieren
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border text-foreground max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-display text-center uppercase tracking-wide">
                    Fire400 Reservierung
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="bg-muted/50 p-4 border border-border">
                    <p className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-wider">Die Regel:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-200">
                      <li>Nur für Gruppen (2-4 Personen)</li>
                      <li>Nur Tomahawk (800-1500g)</li>
                      <li>Do-Fr ab 18 Uhr, Sa-So ab 12 Uhr</li>
                      <li>Passt nicht? <span className="text-primary font-bold">Move on.</span></li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Wie viele Personen seid ihr?</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger className="bg-input border-border rounded-none">
                          <SelectValue placeholder="Wähle Anzahl" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border rounded-none">
                          <SelectItem value="2">2 Personen</SelectItem>
                          <SelectItem value="3">3 Personen</SelectItem>
                          <SelectItem value="4">4 Personen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Wähle dein Gewicht</Label>
                        <span className="text-primary font-bold font-display text-xl">{weight[0]}g</span>
                      </div>
                      <Slider 
                        value={weight} 
                        onValueChange={setWeight} 
                        min={800} 
                        max={1500} 
                        step={100}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider">
                        <span>800g</span>
                        <span>1500g</span>
                      </div>
                    </div>

                    <div className="bg-secondary p-4 border border-border text-center">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Preis (10€ / 100g)</div>
                      <div className="text-4xl font-display text-white mb-1">{price}€</div>
                      <div className="text-sm text-primary font-bold">ca. {pricePerPerson}€ pro Person</div>
                    </div>
                    
                    <div className="text-xs text-center text-muted-foreground italic">
                      *Falls das Steak größer ist als bestellt, gehen die Extra-Gramm aufs Haus.
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-display uppercase tracking-wide text-lg py-6 rounded-none">
                      Jetzt Anfragen
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Right Side: 400 (Wine) */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-wine.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10">
            <Wine className="w-16 h-16 text-white mb-4" />
            <h1 className="text-6xl md:text-8xl font-display text-white mb-2 tracking-tighter">400</h1>
            <p className="text-xl md:text-2xl font-body text-gray-300 mb-8 max-w-md">
              400 Bio-Weine. Gewölbekeller. Walk-in.
            </p>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto font-display tracking-wide uppercase rounded-none bg-transparent">
              Weinbar Entdecken
            </Button>
          </div>
        </div>

        {/* Center Divider / Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black border border-border p-4 rotate-45 hidden md:block">
          <div className="-rotate-45 text-2xl font-display tracking-widest text-white">
            FIRE<span className="text-primary">400</span>
          </div>
        </div>
      </div>

      {/* Manifesto Section */}
      <section className="py-24 px-4 bg-background border-b border-border">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
            Das sicherlich <span className="text-primary">nachhaltigste</span> und <span className="text-primary">kurioseste</span> Steakerlebnis Deutschlands.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            Wir sind kein Steakhaus. Wir sind ein Ritual. <br/>
            Du kommst nicht alleine. Du kommst mit deiner Crew. <br/>
            Ihr teilt euch ein riesiges Tomahawk vom Bio-Weiderind. <br/>
            Unser Service schneidet es am Tisch auf. <br/>
            Ihr esst zusammen, trinkt Bio-Wein, und ab 21 Uhr eskaliert die Musik.
          </p>
        </div>
      </section>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-border">
        <div className="p-12 border-b md:border-b-0 md:border-r border-border bg-card hover:bg-secondary transition-colors">
          <Users className="w-12 h-12 text-primary mb-6" />
          <h3 className="text-2xl font-display text-white mb-4">Nur Gruppen</h3>
          <p className="text-gray-400">
            Fire400 ist ein soziales Event. Reservierungen nur für 2 bis 4 Personen. 
            Solo-Esser? Besuche unser <a href="#" className="text-white underline decoration-primary">JouJou Restaurant</a> am Samstag.
          </p>
        </div>
        <div className="p-12 border-b md:border-b-0 md:border-r border-border bg-card hover:bg-secondary transition-colors">
          <Flame className="w-12 h-12 text-primary mb-6" />
          <h3 className="text-2xl font-display text-white mb-4">Nur Tomahawk</h3>
          <p className="text-gray-400">
            Keine Karte. Keine Auswahl. Nur das beste Stück vom LandLuft Bio-Weiderind. 
            Dry Aged. 800g bis 1500g. Am Tisch tranchiert.
          </p>
        </div>
        <div className="p-12 bg-card hover:bg-secondary transition-colors">
          <Clock className="w-12 h-12 text-primary mb-6" />
          <h3 className="text-2xl font-display text-white mb-4">Nur Do-So</h3>
          <p className="text-gray-400">
            Do & Fr ab 18 Uhr. Sa & So ab 12 Uhr.
            Maximal 26 Gäste gleichzeitig. 
            Reservierung zwingend erforderlich.
          </p>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[60vh]">
        <div className="bg-[url('/images/steak-cut.jpg')] bg-cover bg-center relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-4xl font-display text-white mb-2">The Cut</h3>
            <p className="text-gray-300">LandLuft Bio-Weiderind. 5 Wochen Dry Aged.</p>
          </div>
        </div>
        <div className="bg-[url('/images/party-vibe.jpg')] bg-cover bg-center relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="text-4xl font-display text-white mb-2">The Vibe</h3>
            <p className="text-gray-300">Grooviger Sound. Ab 20 Uhr drehen wir auf.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-display tracking-widest text-white mb-4 md:mb-0">
            FIRE<span className="text-primary">400</span>
          </div>
          <div className="text-gray-500 text-sm text-center md:text-right">
            <p>Eine Marke von JouJou Pfalz</p>
            <p>Leistadt | Deutschland</p>
            <p className="mt-2">Passt nicht? <span className="text-primary font-bold">Move on.</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
