import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-edge bg-cream px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-10">
        <div className="max-w-[280px]">
          <div className="mb-2.5 flex items-center gap-2.5">
            <Logo size={38} />
            <p className="font-display text-[22px] font-bold">Mery de Viaje</p>
          </div>
          <p className="text-[13.5px] leading-relaxed text-ink-3">
            Guías, tips y descuentos reales para viajar mejor. Contenido
            primero, siempre.
          </p>
          <div className="mt-4 flex gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-xs font-bold text-cloud">
              IG
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-xs font-bold text-cloud">
              TT
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-5">
              Explorar
            </p>
            <a href="/guias" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Guías
            </a>
            <a href="/blog" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Blog
            </a>
            <a href="/recursos" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Recursos
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-5">
              Trabaja conmigo
            </p>
            <a href="/asesoria" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Asesoría
            </a>
            <a href="/sobre-mi" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Sobre mí / Prensa
            </a>
            <a href="/tienda" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Tienda
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-5">
              Contacto
            </p>
            <a href="/contacto" className="py-1 text-sm text-[oklch(28%_0.07_22)]">
              Contacto
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1200px] text-center text-[12.5px] text-ink-4">
        © {new Date().getFullYear()} Mery de Viaje. Algunos enlaces son de
        afiliado — no cambia lo que pagas, y solo recomiendo lo que uso yo
        misma.
      </p>
    </footer>
  );
}
