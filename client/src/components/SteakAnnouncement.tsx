import { useState } from "react";
import "./SteakAnnouncement.css";

const STORAGE_KEY = "petit-joujou:steak-announcement:2026-10-22";

type SteakAnnouncementProps = {
  menuHref?: string | null;
};

function isValidMenuHref(menuHref: string | null | undefined): menuHref is string {
  if (!menuHref) return false;

  try {
    const url = new URL(menuHref, "https://www.petit-joujou.de");
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export default function SteakAnnouncement({ menuHref = null }: SteakAnnouncementProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === "undefined") return false;

    try {
      return window.localStorage.getItem(STORAGE_KEY) === "dismissed";
    } catch {
      return false;
    }
  });

  const dismissAnnouncement = () => {
    setIsDismissed(true);

    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Die Leiste bleibt in dieser Sitzung trotzdem geschlossen.
    }
  };

  if (isDismissed) return null;

  const hasMenuLink = isValidMenuHref(menuHref);

  return (
    <aside className="steak-announcement" aria-label="Hinweis zum Steak-Abend">
      <div className="steak-announcement__inner">
        <div className="steak-announcement__content">
          <p className="steak-announcement__text">
            Neu: donnerstags Steak-Abend im petit joujou — Weinbar geöffnet.
          </p>
          {hasMenuLink && (
            <a
              className="steak-announcement__menu-link"
              href={menuHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zur Karte
            </a>
          )}
        </div>
        <button
          className="steak-announcement__close"
          type="button"
          onClick={dismissAnnouncement}
          aria-label="Steak-Ankündigung schließen"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </aside>
  );
}
