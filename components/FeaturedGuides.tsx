"use client";

import { useMemo, useState } from "react";
import { GuideCard, type GuideCardData } from "./GuideCard";
import { selloRotation } from "./SelloBadge";

type Articulo = GuideCardData & { paisFiltro: string; tipoFiltro: string };

const TIPOS = [
  { key: "Todos", label: "Todos los tipos" },
  { key: "guia", label: "Guías" },
  { key: "blog", label: "Blog / tips" },
  { key: "comparativa", label: "Comparativas" },
];

export function FeaturedGuides({ articulos }: { articulos: Articulo[] }) {
  const [countryFilter, setCountryFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState("Todos");

  const paises = useMemo(
    () => ["Todos", ...Array.from(new Set(articulos.map((a) => a.paisFiltro)))],
    [articulos]
  );

  const filtrados = articulos.filter(
    (a) =>
      (countryFilter === "Todos" || a.paisFiltro === countryFilter) &&
      (typeFilter === "Todos" || a.tipoFiltro === typeFilter)
  );

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-12">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(26px,3.5vw,36px)] font-bold">
          Guías y artículos
        </h2>
        <a href="/guias" className="border-b-[1.5px] border-current pb-0.5 text-sm font-bold">
          Ver todo →
        </a>
      </div>

      <div className="mb-7 flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {paises.map((pais) => {
            const active = countryFilter === pais;
            return (
              <button
                key={pais}
                onClick={() => setCountryFilter(pais)}
                className={`min-h-11 flex-none whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold ${
                  active
                    ? "border-maroon bg-maroon text-cloud"
                    : "border-edge-strong bg-cream-card text-[oklch(32%_0.07_22)]"
                }`}
              >
                {pais}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TIPOS.map((tipo) => {
            const active = typeFilter === tipo.key;
            return (
              <button
                key={tipo.key}
                onClick={() => setTypeFilter(tipo.key)}
                className={`min-h-11 flex-none whitespace-nowrap rounded-full border border-dashed px-3.5 text-[12.5px] font-semibold ${
                  active
                    ? "border-coral bg-coral text-cloud"
                    : "border-edge-strong bg-cream-card text-[oklch(32%_0.07_22)]"
                }`}
              >
                {tipo.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="py-10 text-center text-[15px] text-ink-3">
          No hay artículos con esta combinación de filtros todavía — vuelve
          pronto.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] gap-[clamp(16px,2.5vw,28px)]">
          {filtrados.map((articulo, i) => (
            <GuideCard key={articulo.href} data={{ ...articulo, badgeRotate: selloRotation(i) }} />
          ))}
        </div>
      )}
    </section>
  );
}
