import Image from "next/image";
import { SelloBadge } from "./SelloBadge";

export type GuideCardData = {
  href: string;
  titulo: string;
  resumen?: string;
  paisNombre: string;
  tipoLabel: string;
  tiempoLectura?: string;
  imagenUrl?: string;
  imagenAlt?: string;
  badgeRotate?: string;
};

export function GuideCard({ data, compact = false }: { data: GuideCardData; compact?: boolean }) {
  return (
    <a
      href={data.href}
      className="flex flex-col overflow-hidden rounded-[16px] border border-edge-card bg-cream-card sm:rounded-[18px]"
    >
      <div className="relative aspect-[4/3] w-full bg-edge-card/40">
        {data.imagenUrl ? (
          <Image
            src={data.imagenUrl}
            alt={data.imagenAlt || data.titulo}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-ink-4">
            Sin imagen todavía
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-[18px] pb-5 pt-4">
        <div className="flex items-center gap-2">
          <SelloBadge rotate={data.badgeRotate}>{data.paisNombre}</SelloBadge>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">
            {data.tipoLabel}
          </span>
        </div>
        <h3 className="font-display text-[19px] font-bold leading-snug">
          {data.titulo}
        </h3>
        {!compact && data.resumen && (
          <p className="text-sm leading-relaxed text-ink-3">{data.resumen}</p>
        )}
        {data.tiempoLectura && (
          <span className="mt-auto pt-1.5 text-xs text-ink-4">
            {data.tiempoLectura}
          </span>
        )}
      </div>
    </a>
  );
}
