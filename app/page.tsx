import { client } from "@/sanity/client";
import type { Guia } from "@/lib/types";

// Esta query intenta leer guías publicadas en Sanity.
// Si el dataset todavía está vacío (normal al principio), devuelve un array vacío
// en vez de romper la build — así la web funciona desde el primer despliegue,
// antes incluso de que Meri haya publicado el primer contenido.
async function getGuias(): Promise<Guia[]> {
  try {
    return await client.fetch(
      `*[_type == "guia"]{ _id, titulo, "slug": slug.current, resumen }`
    );
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const guias = await getGuias();

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
          Guías publicadas
        </h2>

        {guias.length === 0 ? (
          <p className="mt-4 text-neutral-500">
            Aún no hay guías publicadas en Sanity. En cuanto Meri publique la
            primera, aparecerá aquí automáticamente.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {guias.map((guia) => (
              <li key={guia._id}>
                <a
                  href={`/guias/${guia.slug}`}
                  className="text-lg font-medium underline underline-offset-4"
                >
                  {guia.titulo}
                </a>
                {guia.resumen && (
                  <p className="text-neutral-600">{guia.resumen}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
