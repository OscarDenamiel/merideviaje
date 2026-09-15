import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/client";

export const revalidate = 60;

type Props = { params: { pais: string } };

async function getPais(slug: string) {
  return client.fetch(
    `*[_type == "pais" && slug.current == $slug][0]{ nombre }`,
    { slug }
  );
}

async function getGuiasDelPais(slug: string) {
  return client.fetch(
    `*[_type == "articulo" && tipo == "guia" && pais->slug.current == $slug]{
      _id, titulo, resumen, "slug": slug.current
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pais = await getPais(params.pais);
  if (!pais) return {};
  return {
    title: `Guías de ${pais.nombre}`,
    description: `Todas las guías de viaje sobre ${pais.nombre}: itinerarios, tips y recomendaciones auténticas.`,
  };
}

export default async function PaisPage({ params }: Props) {
  const pais = await getPais(params.pais);
  if (!pais) notFound();

  const guias = await getGuiasDelPais(params.pais);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm text-ink-4">
        <a href="/guias" className="underline">
          Guías
        </a>{" "}
        / {pais.nombre}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">Guías de {pais.nombre}</h1>

      {guias.length === 0 ? (
        <p className="mt-6 text-ink-4">
          Aún no hay guías publicadas para {pais.nombre}.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {guias.map((guia: { _id: string; titulo: string; resumen?: string; slug: string }) => (
            <li key={guia._id}>
              <a
                href={`/guias/${params.pais}/${guia.slug}`}
                className="text-lg font-display font-bold underline underline-offset-4"
              >
                {guia.titulo}
              </a>
              {guia.resumen && <p className="text-ink-3">{guia.resumen}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
