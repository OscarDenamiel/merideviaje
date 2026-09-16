import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { urlDeArticulo, TIPO_LABEL } from "@/lib/types";
import { tiempoDeLectura } from "@/lib/readTime";
import { FeaturedGuides } from "@/components/FeaturedGuides";

export const revalidate = 60;

const QUICK_ACCESS = [
  { href: "/guias", label: "Guías" },
  { href: "/blog", label: "Blog" },
  { href: "/recursos", label: "Recursos y descuentos" },
  { href: "/asesoria", label: "Asesoría" },
  { href: "/tienda", label: "Tienda" },
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
      <section className="relative h-[clamp(460px,82vh,720px)] w-full overflow-hidden bg-[oklch(40%_0.03_40)]">
        <div className="absolute inset-0 flex items-center justify-center text-sm text-paper/50">
          Foto/vídeo de Meri viajando
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(15%_0.02_30_/_0.05)] to-[oklch(12%_0.02_25_/_0.72)]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <p className="mb-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[oklch(88%_0.02_45)]">
            @merideviaje · Guías de viaje reales
          </p>
          <h1 className="mb-[18px] max-w-[15ch] font-display text-[clamp(32px,5.5vw,58px)] font-semibold leading-[1.1] text-paper">
            Viajar bien, sin postureo.
          </h1>
          <p className="mb-[26px] max-w-[46ch] text-[clamp(15px,2vw,17px)] leading-relaxed text-[oklch(92%_0.012_50)]">
            Itinerarios probados, tips que sirven de verdad y los descuentos
            que uso yo misma. Sin relleno, sin cien anuncios por página.
          </p>
          <div className="flex flex-wrap items-center gap-[22px]">
            <a
              href="/guias"
              className="inline-flex min-h-[46px] items-center justify-center bg-coral px-6 text-[14.5px] font-semibold text-paper"
            >
              Ver guías
            </a>
            <a
              href="/recursos"
              className="inline-flex min-h-11 items-center border-b-[1.5px] border-[oklch(98%_0.006_60_/_0.55)] pb-0.5 text-[14.5px] font-semibold text-paper"
            >
              Descuentos y recursos →
            </a>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <nav className="mx-auto flex max-w-[1180px] flex-wrap gap-2.5 border-b border-hairline px-4 py-[22px] sm:px-6 lg:px-12">
        {QUICK_ACCESS.map((qa) => (
          <a
            key={qa.href}
            href={qa.href}
            className="inline-flex min-h-10 items-center rounded-[3px] border border-hairline-strong px-4 text-[13.5px] font-semibold text-ink-2"
          >
            {qa.label}
          </a>
        ))}
      </nav>

      <FeaturedGuides articulos={articulos} />

      {/* PARA MARCAS */}
      <section className="bg-ink-deep px-4 py-11 text-[oklch(96%_0.006_55)] sm:px-6 sm:py-[76px] lg:px-12">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 sm:grid-cols-[1.3fr_1fr] lg:gap-[52px]">
          <div>
            <p className="mb-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[oklch(72%_0.03_40)]">
              Para marcas
            </p>
            <h2 className="mb-4 font-display text-[clamp(26px,3.3vw,36px)] font-semibold leading-[1.2]">
              Contenido UGC que viaja de verdad, con una audiencia que confía.
            </h2>
            <p className="mb-[26px] max-w-[52ch] text-[15px] leading-relaxed text-[oklch(80%_0.015_45)]">
              Colaboraciones, campañas y contenido de marca en TikTok e
              Instagram. Aquí tienes mi porfolio y kit de medios.
            </p>
            <a
              href="/portfolio"
              className="inline-flex min-h-[46px] items-center justify-center bg-[oklch(96%_0.006_55)] px-6 text-[14.5px] font-semibold text-ink-deep"
            >
              Ver portfolio y kit de medios
            </a>
          </div>
          <div className="grid grid-cols-3 gap-px bg-[oklch(30%_0.02_40)]">
            {BRAND_STATS.map((stat) => (
              <div key={stat.label} className="bg-ink-deep px-2 py-[22px] text-center">
                <p className="font-display text-[clamp(24px,3vw,32px)] font-semibold">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] text-[oklch(70%_0.015_45)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
