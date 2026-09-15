import { client } from "@/sanity/client";
import { urlDeArticulo, type Articulo } from "@/lib/types";

// Vuelve a comprobar Sanity como máximo cada 60 segundos, en vez de quedarse
// con los datos del momento del despliegue. Así el contenido nuevo que
// publique Meri aparece solo, sin necesidad de volver a desplegar la web.
export const revalidate = 60;

async function getArticulos(): Promise<Articulo[]> {
  try {
    return await client.fetch(
      `*[_type == "articulo"] | order(fechaPublicacion desc){
        _id, titulo, "slug": slug.current, tipo, resumen,
        "paisSlug": pais->slug.current
      }`
    );
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const articulos = await getArticulos();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Mary de Viaje</h1>
      <p className="mt-4 text-lg text-neutral-600">
        Guías de viaje auténticas, tips reales y los mejores descuentos para
        tu próximo viaje. (Esqueleto técnico — el diseño final llega en la
        siguiente fase.)
      </p>

      <section className="mt-16">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
          Contenido publicado
        </h2>

        {articulos.length === 0 ? (
          <p className="mt-4 text-neutral-500">
            Aún no hay contenido publicado en Sanity. En cuanto Meri publique
            el primer artículo, aparecerá aquí automáticamente.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {articulos.map((articulo) => (
              <li key={articulo._id}>
                <a
                  href={urlDeArticulo(articulo)}
                  className="text-lg font-medium underline underline-offset-4"
                >
                  {articulo.titulo}
                </a>
                {articulo.resumen && (
                  <p className="text-neutral-600">{articulo.resumen}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
