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
      {/* Header sólido — nunca transparente sobre el hero, por legibilidad */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-hairline bg-paper px-4 py-4 sm:px-6 lg:px-12">
        <a href="/" className="flex items-center gap-2.5 py-1.5">
          <Logo />
          <span className="font-display text-[clamp(19px,3vw,22px)] font-semibold tracking-tight">
            Meri de Viaje
          </span>
        </a>

        {/* Nav de escritorio: visible desde 900px */}
        <nav className="hidden items-center gap-7 nav:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="py-1.5 text-sm font-semibold text-ink-2">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botón de menú: solo por debajo de 900px */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink nav:hidden"
        >
          <span>Menú</span>
          <span className="flex w-[18px] flex-col gap-1">
            <span className="h-[1.4px] bg-ink" />
            <span className="h-[1.4px] w-[70%] self-end bg-ink" />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[60] flex justify-end bg-[oklch(20%_0.02_40_/_0.5)] nav:hidden"
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-[min(360px,86vw)] flex-col gap-0.5 bg-paper px-7 pb-10 pt-7 shadow-[-24px_0_60px_oklch(20%_0.02_40_/_0.14)]"
          >
            <div className="mb-5 flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-xl text-ink"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-hairline px-1 py-[13px] font-display text-2xl font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-[26px] flex gap-3">
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.3px] border-ink text-xs font-semibold">
                IG
              </span>
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.3px] border-ink text-xs font-semibold">
                TT
              </span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
