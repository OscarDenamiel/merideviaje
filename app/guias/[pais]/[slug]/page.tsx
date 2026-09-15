import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { urlDeArticulo } from "@/lib/types";
import { tiempoDeLectura } from "@/lib/readTime";
import { FlightDivider } from "@/components/FlightDivider";
import { SelloBadge, selloRotation } from "@/components/SelloBadge";
import { GuideCard } from "@/components/GuideCard";

export const revalidate = 60;

type Props = { params: { pais: string; slug: string } };

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-10 font-display text-[clamp(24px,3vw,28px)] font-bold leading-snug">
        {children}
      </h2>
    ),
    normal: ({ children }: any) => <p className="mb-5">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-[3px] border-maroon py-1 pl-[22px]">
        <p className="font-sans text-[21px] font-bold leading-relaxed text-[oklch(28%_0.1_22)]">
          {children}
        </p>
      </blockquote>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-2">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
          <Image
            src={urlForImage(value).width(900).height(600).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-[13px] text-ink-4">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

async function getGuia(slug: string) {
  return client.fetch(
    `*[_type == "articulo" && tipo == "guia" && slug.current == $slug][0]{
      titulo, resumen, contenido, seoTitulo, seoDescripcion,
      imagenDestacada, fechaPublicacion, linksAfiliado,
      "pais": pais->{nombre, "slug": slug.current}
    }`,
    { slug }
  );
}

async function getRelacionadas(slug: string) {
  try {
    return await client.fetch(
      `*[_type == "articulo" && slug.current != $slug] | order(fechaPublicacion desc)[0...3]{
        titulo, tipo, "slug": slug.current, imagenDestacada,
        "paisSlug": pais->slug.current, "paisNombre": pais->nombre
      }`,
      { slug }
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guia = await getGuia(params.slug);
  if (!guia) return {};
  return {
    title: guia.seoTitulo || guia.titulo,
    description: guia.seoDescripcion || guia.resumen,
  };
}

export default async function GuiaPage({ params }: Props) {
  const guia = await getGuia(params.slug);
  if (!guia) notFound();

  const relacionadas = await getRelacionadas(params.slug);

  const fecha = guia.fechaPublicacion
    ? new Date(guia.fechaPublicacion).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const minutos = tiempoDeLectura(guia.contenido);

  return (
    <>
      <FlightDivider maxWidth={200} />

      <div className="mx-auto max-w-[720px] px-4 pt-3 sm:px-6">
        <nav className="flex flex-wrap items-center gap-2 text-[13px] text-ink-4">
          <a href="/guias" className="inline-block px-0.5 py-1.5 font-semibold">
            Guías
          </a>
          <span>/</span>
          <a href={`/guias/${params.pais}`} className="inline-block px-0.5 py-1.5 font-semibold">
            {guia.pais?.nombre}
          </a>
          <span>/</span>
          <span className="text-[oklch(32%_0.07_22)]">{guia.titulo}</span>
        </nav>
      </div>

      {guia.imagenDestacada && (
        <div className="mx-auto mt-4 max-w-[900px] px-4 sm:px-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px]">
            <Image
              src={urlForImage(guia.imagenDestacada).width(1400).height(875).url()}
              alt={guia.imagenDestacada.alt || guia.titulo}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[720px] px-4 pb-2 pt-7 sm:px-6">
        <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
          <SelloBadge rotate="-1.5deg">{guia.pais?.nombre}</SelloBadge>
          <span className="text-xs text-ink-4">
            Guía de destino
            {minutos && ` · ${minutos} de lectura`}
            {fecha && ` · ${fecha}`}
          </span>
        </div>
        <h1 className="mb-4 font-display text-[clamp(30px,5vw,46px)] font-bold leading-[1.12]">
          {guia.titulo}
        </h1>
        {guia.resumen && (
          <p className="text-[clamp(17px,2.2vw,20px)] font-bold leading-relaxed text-[oklch(35%_0.07_25)]">
            {guia.resumen}
          </p>
        )}
      </div>

      {guia.contenido && (
        <article className="mx-auto max-w-[680px] px-4 pt-6 text-[17px] leading-[1.75] text-[oklch(26%_0.06_22)] sm:px-6">
          <PortableText value={guia.contenido} components={portableTextComponents} />
        </article>
      )}

      {guia.linksAfiliado?.length > 0 && (
        <div className="mx-auto max-w-[680px] px-4 sm:px-6">
          <div className="my-11 rounded-[22px] bg-blush p-5 sm:p-8">
            <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-coral">
              Para este viaje
            </p>
            <h3 className="mb-2 font-display text-2xl font-bold">
              Lo que reservé yo, con mi descuento
            </h3>
            <p className="mb-[22px] text-[14.5px] leading-relaxed text-[oklch(40%_0.06_22)]">
              Son enlaces de afiliado: no pagas más, y solo dejo lo que uso de
              verdad.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
              {guia.linksAfiliado.map(
                (
                  link: { nombre?: string; url?: string; descuento?: string; nota?: string },
                  i: number
                ) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex flex-col gap-2.5 rounded-2xl border border-edge-strong bg-cream-card p-[18px]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display text-[17px] font-bold leading-snug">
                        {link.nombre}
                      </span>
                      {link.descuento && (
                        <SelloBadge rotate={selloRotation(i)} className="flex-none whitespace-nowrap">
                          {link.descuento}
                        </SelloBadge>
                      )}
                    </div>
                    {link.nota && (
                      <span className="text-[13.5px] leading-snug text-ink-3">{link.nota}</span>
                    )}
                    <span className="mt-1 self-start border-b-[1.5px] border-current text-[13px] font-bold">
                      Reservar →
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {relacionadas.length > 0 && (
        <section className="mx-auto max-w-[900px] px-4 pb-14 pt-5 sm:px-6">
          <h2 className="mb-[18px] font-display text-2xl font-bold">Sigue leyendo</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
            {relacionadas.map((r: any, i: number) => (
              <GuideCard
                key={r.slug}
                compact
                data={{
                  href: urlDeArticulo({ tipo: r.tipo, slug: r.slug, paisSlug: r.paisSlug }),
                  titulo: r.titulo,
                  paisNombre: r.paisNombre || "General",
                  tipoLabel: "",
                  imagenUrl: r.imagenDestacada
                    ? urlForImage(r.imagenDestacada).width(480).height(360).url()
                    : undefined,
                  imagenAlt: r.imagenDestacada?.alt,
                  badgeRotate: selloRotation(i),
                }}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
