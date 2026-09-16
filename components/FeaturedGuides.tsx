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
    <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 sm:py-10 lg:px-12">
      <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(25px,3.2vw,32px)] font-semibold">
          Guías y artículos
        </h2>
        <a href="/guias" className="border-b-[1.5px] border-current pb-0.5 text-[13.5px] font-semibold">
          Ver todo →
        </a>
      </div>

      <div className="mb-[30px] flex flex-col gap-2.5">
        <div className="flex gap-[22px] overflow-x-auto border-b border-hairline pb-1">
          {paises.map((pais) => {
            const active = countryFilter === pais;
            return (
              <button
                key={pais}
                onClick={() => setCountryFilter(pais)}
                className={`min-h-10 flex-none whitespace-nowrap border-b-2 text-[13.5px] font-semibold ${
                  active ? "border-coral text-ink" : "border-transparent text-ink-5"
                }`}
              >
                {pais}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 overflow-x-auto pt-0.5">
          {TIPOS.map((tipo) => {
            const active = typeFilter === tipo.key;
            return (
              <button
                key={tipo.key}
                onClick={() => setTypeFilter(tipo.key)}
                className={`min-h-[34px] flex-none whitespace-nowrap rounded-[3px] border px-3.5 text-xs font-semibold ${
                  active
                    ? "border-coral bg-coral text-paper"
                    : "border-hairline-strong bg-transparent text-ink-5"
                }`}
              >
                {tipo.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="py-10 text-center text-[15px] text-ink-4">
          No hay artículos con esta combinación de filtros todavía — vuelve
          pronto.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-[clamp(20px,2.5vw,28px)] gap-y-[clamp(24px,3vw,36px)]">
          {filtrados.map((articulo, i) => (
            <GuideCard key={articulo.href} data={{ ...articulo, badgeRotate: selloRotation(i) }} />
          ))}
        </div>
      )}
    </section>
  );
}
