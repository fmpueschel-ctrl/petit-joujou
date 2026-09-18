/* ============================================================
   petit joujou — Shop „Coming Soon", in The-One-Identität
   Der Headless-Shop wird zu The One (eigenständig, theone.shop).
   Bis The One öffentlich ist, führen alle /shop-Links hierher.
   Design: Büttenpapier + Tinte #1F3D5C + Clash Display/Archivo +
   die echte Drei-Flaschen-Zeichnung (aus marketing\theone_shop_startseite.html),
   die rechte tritt deckend hervor — „es kann nur eines".
   Rückbau: in App.tsx die /shop-Routen wieder auf Shop/ProductDetail zeigen.
   ============================================================ */

import { useEffect } from "react";
import { Link } from "wouter";

const PAPIER = "#F5F0E6";
const TINTE = "#1F3D5C";
const TINTE_SOFT = "#5a7089";

// Echte The-One-Flaschenkontur (Symbol #flasche-umriss)
const BOTTLE_PATH =
  "M 56.75 104.027344 C 56.746094 104.074219 56.738281 104.121094 56.734375 104.167969 C 56.722656 104.351562 56.710938 104.527344 56.824219 104.703125 C 56.894531 104.8125 56.890625 104.972656 56.90625 105.109375 C 57.054688 106.597656 57.070312 108.09375 57.121094 109.589844 C 57.128906 109.847656 57.121094 109.863281 56.859375 109.949219 C 56.582031 110.039062 56.296875 110.105469 56.035156 110.246094 C 55.917969 110.308594 55.8125 110.25 55.796875 110.121094 C 55.761719 109.890625 55.726562 109.660156 55.71875 109.425781 C 55.652344 107.964844 55.539062 106.507812 55.511719 105.042969 C 55.507812 104.777344 55.472656 104.515625 55.453125 104.25 C 55.449219 104.171875 55.433594 104.09375 55.4375 104.019531 C 55.445312 103.808594 55.5 103.742188 55.707031 103.707031 C 55.921875 103.675781 56.136719 103.648438 56.351562 103.628906 C 56.699219 103.59375 56.773438 103.550781 56.75 104.027344 Z M 53.316406 112.109375 C 53.386719 111.316406 53.375 110.519531 53.359375 109.726562 C 53.335938 108.808594 53.367188 107.890625 53.382812 106.976562 C 53.394531 106.152344 53.421875 105.328125 53.40625 104.503906 C 53.394531 103.707031 53.488281 102.921875 53.605469 102.140625 C 53.648438 101.851562 53.660156 101.550781 53.816406 101.285156 C 53.878906 101.179688 53.945312 101.074219 54.007812 100.96875 C 54.046875 100.90625 54.09375 100.914062 54.164062 100.917969 C 54.425781 100.929688 54.5625 100.816406 54.621094 100.585938 C 54.667969 100.402344 54.671875 100.214844 54.671875 100.027344 C 54.664062 98.53125 54.65625 97.035156 54.648438 95.539062 C 54.648438 95.414062 54.644531 95.289062 54.648438 95.164062 C 54.648438 95.117188 54.6875 95.066406 54.738281 95.082031 C 54.941406 95.136719 55.152344 94.914062 55.320312 95.046875 C 55.492188 95.179688 55.390625 95.421875 55.402344 95.617188 C 55.429688 96.238281 55.484375 96.863281 55.5 97.484375 C 55.523438 98.226562 55.582031 98.976562 55.472656 99.722656 C 55.558594 100.058594 55.5 100.402344 55.53125 100.738281 C 55.542969 100.882812 55.664062 100.953125 55.796875 100.917969 C 56.011719 100.855469 56.066406 100.78125 56.074219 100.550781 C 56.082031 100.433594 56.035156 100.304688 56.117188 100.195312 C 56.316406 100.222656 56.324219 100.402344 56.382812 100.535156 C 56.539062 100.914062 56.570312 101.320312 56.617188 101.722656 C 56.652344 102.015625 56.65625 102.316406 56.664062 102.613281 C 56.671875 102.910156 56.640625 102.9375 56.363281 102.960938 C 56.128906 102.980469 55.898438 102.996094 55.667969 103.03125 C 55.4375 103.0625 55.21875 103.140625 55.023438 103.28125 C 54.816406 103.425781 54.710938 103.621094 54.691406 103.867188 C 54.6875 103.914062 54.6875 103.960938 54.6875 104.007812 C 54.710938 104.910156 54.726562 105.808594 54.75 106.710938 C 54.753906 107.007812 54.789062 107.300781 54.824219 107.59375 C 54.867188 107.933594 54.855469 108.277344 54.855469 108.617188 C 54.859375 109.355469 54.988281 110.078125 55.027344 110.808594 C 55.035156 110.925781 55.085938 111.015625 55.160156 111.097656 C 55.226562 111.175781 55.304688 111.21875 55.40625 111.191406 C 55.570312 111.148438 55.734375 111.101562 55.898438 111.050781 C 56.191406 110.957031 56.484375 110.851562 56.785156 110.765625 C 56.898438 110.734375 57.019531 110.675781 57.171875 110.734375 C 57.207031 110.933594 57.246094 111.144531 57.273438 111.359375 C 57.332031 111.839844 57.367188 112.320312 57.445312 112.796875 C 57.480469 113.003906 57.347656 113.191406 57.425781 113.390625 C 57.449219 113.457031 57.386719 113.511719 57.324219 113.527344 C 56.871094 113.625 56.445312 113.839844 55.972656 113.855469 C 55.894531 113.855469 55.816406 113.871094 55.742188 113.894531 C 55.144531 114.09375 54.542969 114.039062 53.945312 113.917969 C 53.25 113.78125 53.378906 113.890625 53.300781 113.183594 C 53.261719 112.832031 53.285156 112.46875 53.316406 112.113281 Z";

function Bottle({ accent = false }: { accent?: boolean }) {
  return (
    <svg className={accent ? "tos-bottle tos-bottle--accent" : "tos-bottle"} viewBox="53 94.6 4.8 19.8" aria-hidden="true">
      <path
        d={BOTTLE_PATH}
        fill={accent ? TINTE : "none"}
        stroke={TINTE}
        strokeWidth="0.28"
        strokeLinecap="round"
      />
      <line x1="56.7" y1="102.7" x2="57.18" y2="110.8" stroke={accent ? PAPIER : TINTE} strokeWidth="0.28" strokeLinecap="round" />
    </svg>
  );
}

export default function ComingSoon() {
  useEffect(() => {
    document.title = "The One — bald verfügbar | petit joujou";
    // Clash Display + Archivo (Fontshare) nur für diese Seite nachladen
    const id = "theone-fontshare";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://api.fontshare.com/v2/css?f[]=clash-display@600&f[]=archivo@300,400,500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <style>{`
        .tos-root{background:${PAPIER};color:${TINTE};min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem 1.5rem;position:relative;overflow:hidden;font-family:'Archivo',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .tos-grain{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;opacity:.05;mix-blend-mode:multiply;z-index:0}
        .tos-wrap{position:relative;z-index:1;max-width:560px}
        .tos-bottles{display:flex;align-items:flex-end;justify-content:center;gap:clamp(10px,2.4vw,22px);margin-bottom:2.25rem}
        .tos-bottle{height:clamp(112px,18vh,150px);width:auto}
        .tos-bottle--accent{height:clamp(126px,20vh,168px)}
        .tos-h1{font-family:'Clash Display',sans-serif;font-weight:600;font-size:clamp(2.1rem,5.4vw,3.1rem);line-height:1.1;letter-spacing:-0.01em;margin:0 0 1rem}
        .tos-lead{font-size:1rem;line-height:1.8;opacity:.82;max-width:40ch;margin:0 auto 1.6rem}
        .tos-claim{font-family:'Clash Display',sans-serif;font-weight:600;font-size:1rem;letter-spacing:.01em;margin:0 0 2.4rem}
        .tos-soon{display:inline-block;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:${TINTE};border:1px solid ${TINTE};padding:.6rem 1.3rem;margin-bottom:2.4rem}
        .tos-back{display:block;font-size:.82rem;color:${TINTE_SOFT};text-decoration:none;letter-spacing:.03em}
        .tos-back:hover{color:${TINTE}}
      `}</style>

      <section className="tos-root">
        <svg className="tos-grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="tos-korn">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#tos-korn)" />
        </svg>

        <div className="tos-wrap">
          <div className="tos-bottles" aria-hidden="true">
            <Bottle />
            <Bottle />
            <Bottle accent />
          </div>

          <h1 className="tos-h1">Der Shop zieht um.</h1>
          <p className="tos-lead">Unser Shop wird eigenständig als The One. Die Weinbar hat weiter geöffnet.</p>
          <p className="tos-claim">Es kann nur eines geben – der Shop</p>
          <span className="tos-soon">theone.shop · bald</span>
          <Link href="/" className="tos-back">Zurück zur Weinbar</Link>
        </div>
      </section>
    </>
  );
}
