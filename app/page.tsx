import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { urlDeArticulo, TIPO_LABEL } from "@/lib/types";
import { tiempoDeLectura } from "@/lib/readTime";
import { FlightDivider } from "@/components/FlightDivider";
import { FeaturedGuides } from "@/components/FeaturedGuides";

// Vuelve a comprobar Sanity como máximo cada 60 segundos, en vez de quedarse
// con los datos del momento del despliegue.
export const revalidate = 60;

const QUICK_ACCESS = [
  { href: "/guias", label: "Guías", glyph: "G", tint: "bg-maroon", rotate: "-2deg" },
  { href: "/blog", label: "Blog", glyph: "B", tint: "bg-coral", rotate: "1.5deg" },
  { href: "/recursos", label: "Recursos", glyph: "R", tint: "bg-coral", rotate: "-1.5deg" },
  { href: "/asesoria", label: "Asesoría", glyph: "A", tint: "bg-maroon", rotate: "2deg" },
  { href: "/tienda", label: "Tienda", glyph: "T", tint: "bg-coral", rotate: "-1.8deg" },
];

const BRAND_STATS = [
  { value: "210K", label: "Comunidad total" },
  { value: "4.2%", label: "Engagement medio" },
  { value: "35+", label: "Marcas" },
];

async function getArticulosDestacados() {
  try {
    return await client.fetch(
      `*[_type == "articulo"] | order(fechaPublicacion desc){
        titulo, tipo, resumen, contenido, imagenDestacada,
        "slug": slug.current,
        "paisSlug": pais->slug.current,
        "paisNombre": pais->nombre
      }`
    );
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const articulosRaw = await getArticulosDestacados();

  const articulos = articulosRaw.map((a: any) => ({
    href: urlDeArticulo({ tipo: a.tipo, slug: a.slug, paisSlug: a.paisSlug }),
    titulo: a.titulo,
    resumen: a.resumen,
    paisNombre: a.paisNombre || "General",
    paisFiltro: a.paisNombre || "General",
    tipoLabel: TIPO_LABEL[a.tipo as keyof typeof TIPO_LABEL] ?? a.tipo,
    tipoFiltro: a.tipo,
    tiempoLectura: tiempoDeLectura(a.contenido),
    imagenUrl: a.imagenDestacada ? urlForImage(a.imagenDestacada).width(640).height(480).url() : undefined,
    imagenAlt: a.imagenDestacada?.alt,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative h-[clamp(480px,88vh,760px)] w-full overflow-hidden bg-[oklch(45%_0.04_40)]">
        <div className="absolute inset-0 flex items-center justify-center text-sm text-cloud/60">
          Vídeo o foto de Meri viajando
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(20%_0.03_30_/_0.05)] to-[oklch(18%_0.04_25_/_0.75)]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[oklch(90%_0.03_50)]">
            @merideviaje · Guías de viaje reales
          </p>
          <h1 className="mb-[18px] max-w-[14ch] font-display text-[clamp(34px,6vw,64px)] font-bold leading-[1.05] text-cloud">
            Viajar bien, sin postureo.
          </h1>
          <p className="mb-7 max-w-[46ch] text-[clamp(15px,2vw,18px)] leading-relaxed text-[oklch(94%_0.015_55)]">
            Itinerarios probados, tips que sirven de verdad y los descuentos
            que uso yo misma. Sin relleno, sin cien anuncios por página.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/guias"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-cloud px-[26px] text-[15px] font-bold text-ink"
            >
              Ver guías
            </a>
            <a
              href="/recursos"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-[1.5px] border-[oklch(90%_0.02_55)] px-[26px] text-[15px] font-bold text-cloud"
            >
              Descuentos y recursos
            </a>
          </div>
        </div>
      </section>

      <FlightDivider />

      {/* QUICK ACCESS */}
      <section className="px-4 pb-2 pt-5 sm:px-6 sm:pt-8 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
          {QUICK_ACCESS.map((qa) => (
            <a
              key={qa.href}
              href={qa.href}
              className="flex flex-col items-start gap-2.5 rounded-2xl border border-edge-card bg-cream-card p-4"
            >
              <span
                className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] text-[15px] font-bold text-cloud ${qa.tint}`}
                style={{ transform: `rotate(${qa.rotate})` }}
              >
                {qa.glyph}
              </span>
              <span className="font-display text-base font-bold">{qa.label}</span>
            </a>
          ))}
        </div>
      </section>

      <FeaturedGuides articulos={articulos} />

      {/* PARA MARCAS */}
      <section className="bg-maroon-deep px-4 py-10 text-[oklch(96%_0.015_55)] sm:px-6 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 sm:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[oklch(82%_0.08_30)]">
              Para marcas
            </p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.5vw,38px)] font-bold leading-tight">
              Contenido UGC que viaja de verdad, con una audiencia que confía.
            </h2>
            <p className="mb-6 max-w-[52ch] text-[15px] leading-relaxed text-[oklch(80%_0.05_35)]">
              Colaboraciones, campañas y contenido de marca en TikTok e
              Instagram. Aquí tienes mi porfolio y kit de medios.
            </p>
            <a
              href="/portfolio"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[oklch(96%_0.015_55)] px-[26px] text-[15px] font-bold text-maroon-deep"
            >
              Ver portfolio y kit de medios
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            {BRAND_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-maroon-card px-2 py-[18px] text-center"
              >
                <p className="font-display text-[clamp(22px,3vw,30px)] font-bold">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11.5px] text-[oklch(80%_0.05_35)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
