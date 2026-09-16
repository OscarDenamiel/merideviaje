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
    <a href={data.href} className="flex flex-col">
      <div className="relative mb-3.5 aspect-[4/3] w-full bg-sand">
        {data.imagenUrl ? (
          <Image
            src={data.imagenUrl}
            alt={data.imagenAlt || data.titulo}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-ink-5">
            Sin imagen todavía
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[7px]">
        <div className="flex items-center gap-2">
          <SelloBadge rotate={data.badgeRotate}>{data.paisNombre}</SelloBadge>
          {data.tipoLabel && (
            <span className="text-[10.5px] font-medium uppercase tracking-wide text-ink-4">
              {data.tipoLabel}
            </span>
          )}
        </div>
        <h3 className="font-display text-[19px] font-semibold leading-[1.28]">
          {data.titulo}
        </h3>
        {!compact && data.resumen && (
          <p className="text-sm leading-relaxed text-ink-3">{data.resumen}</p>
        )}
        {data.tiempoLectura && (
          <span className="mt-1 text-xs text-ink-4">{data.tiempoLectura}</span>
        )}
      </div>
    </a>
  );
}
