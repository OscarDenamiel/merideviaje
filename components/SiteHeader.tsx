"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/guias", label: "Guías" },
  { href: "/blog", label: "Blog" },
  { href: "/recursos", label: "Recursos" },
  { href: "/asesoria", label: "Asesoría" },
  { href: "/tienda", label: "Tienda" },
  { href: "/sobre-mi", label: "Sobre mí / Prensa" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-edge bg-cream/90 px-4 py-[18px] backdrop-blur-sm sm:px-6 lg:px-12">
        <a href="/" className="flex items-center gap-2.5 py-1.5">
          <Logo />
          <span className="font-display text-[clamp(20px,3vw,26px)] font-bold tracking-tight">
            Mery de Viaje
          </span>
        </a>
        <button
          onClick={() => setMenuOpen(true)}
          className="flex min-h-11 items-center gap-2 rounded-full border border-[oklch(75%_0.05_40)] px-[18px] text-sm font-semibold text-ink"
        >
          <span>Menú</span>
          <span className="text-base leading-none">☰</span>
        </button>
      </header>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[60] flex justify-end bg-[oklch(20%_0.02_40_/_0.55)]"
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-[min(360px,86vw)] flex-col gap-1 bg-[oklch(94%_0.035_78)] px-7 pb-10 pt-7 shadow-[-20px_0_50px_oklch(20%_0.02_40_/_0.2)]"
          >
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-[22px] text-ink"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-edge-card px-1 py-3 font-display text-[26px] font-semibold"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-7 flex gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-[13px] font-bold text-cloud">
                IG
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-[13px] font-bold text-cloud">
                TT
              </span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
