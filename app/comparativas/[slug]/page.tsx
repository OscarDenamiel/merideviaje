import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";

export const revalidate = 60;

type Props = { params: { slug: string } };

async function getArticulo(slug: string) {
  return client.fetch(
    `*[_type == "articulo" && tipo == "comparativa" && slug.current == $slug][0]{
      titulo, resumen, contenido, seoTitulo, seoDescripcion, linksAfiliado
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articulo = await getArticulo(params.slug);
  if (!articulo) return {};
  return {
    title: articulo.seoTitulo || articulo.titulo,
    description: articulo.seoDescripcion || articulo.resumen,
  };
}

export default async function ComparativaPage({ params }: Props) {
  const articulo = await getArticulo(params.slug);
  if (!articulo) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm text-ink-4">
        <a href="/comparativas" className="underline">
          Comparativas
        </a>
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{articulo.titulo}</h1>
      {articulo.resumen && (
        <p className="mt-4 text-lg text-ink-3">{articulo.resumen}</p>
      )}
      {articulo.contenido && (
        <div className="prose prose-neutral mt-10 max-w-none">
          <PortableText value={articulo.contenido} />
        </div>
      )}
      {articulo.linksAfiliado?.length > 0 && (
        <section className="mt-12 rounded-lg border border-edge p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-5">
            Opciones recomendadas
          </h2>
          <ul className="mt-3 space-y-2">
            {articulo.linksAfiliado.map(
              (link: { nombre?: string; url?: string; descuento?: string }, i: number) => (
                <li key={i}>
                  <a href={link.url} className="font-medium underline">
                    {link.nombre}
                  </a>
                  {link.descuento && <span className="text-ink-4"> — {link.descuento}</span>}
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
