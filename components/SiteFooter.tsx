import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-paper px-4 pb-8 pt-11 sm:px-6 sm:pt-16 lg:px-12">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-10">
        <div className="max-w-[280px]">
          <div className="mb-3 flex items-center gap-2.5">
            <Logo />
            <p className="font-display text-xl font-semibold">Meri de Viaje</p>
          </div>
          <p className="text-[13.5px] leading-relaxed text-ink-3">
            Guías, tips y descuentos reales para viajar mejor. Contenido
            primero, siempre.
          </p>
          <div className="mt-4 flex gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-[1.3px] border-ink text-[11px] font-semibold">
              IG
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-[1.3px] border-ink text-[11px] font-semibold">
              TT
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col gap-[11px]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-5">
              Explorar
            </p>
            <a href="/guias" className="py-1 text-sm">Guías</a>
            <a href="/blog" className="py-1 text-sm">Blog</a>
            <a href="/recursos" className="py-1 text-sm">Recursos</a>
          </div>
          <div className="flex flex-col gap-[11px]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-5">
              Trabaja conmigo
            </p>
            <a href="/asesoria" className="py-1 text-sm">Asesoría</a>
            <a href="/sobre-mi" className="py-1 text-sm">Sobre mí / Prensa</a>
            <a href="/tienda" className="py-1 text-sm">Tienda</a>
          </div>
          <div className="flex flex-col gap-[11px]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-5">
              Contacto
            </p>
            <a href="/contacto" className="py-1 text-sm">Contacto</a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1180px] text-center text-xs text-ink-5">
        © {new Date().getFullYear()} Meri de Viaje. Algunos enlaces son de
        afiliado — no cambia lo que pagas, y solo recomiendo lo que uso yo
        misma.
      </p>
    </footer>
  );
}
