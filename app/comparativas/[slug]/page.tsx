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
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm text-neutral-500">
        <a href="/comparativas" className="underline">
          Comparativas
        </a>
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{articulo.titulo}</h1>
      {articulo.resumen && (
        <p className="mt-4 text-lg text-neutral-600">{articulo.resumen}</p>
      )}
      {articulo.contenido && (
        <div className="prose prose-neutral mt-10 max-w-none">
          <PortableText value={articulo.contenido} />
        </div>
      )}
      {articulo.linksAfiliado?.length > 0 && (
        <section className="mt-12 rounded-lg border border-neutral-200 p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
            Opciones recomendadas
          </h2>
          <ul className="mt-3 space-y-2">
            {articulo.linksAfiliado.map(
              (link: { nombre?: string; url?: string; descuento?: string }, i: number) => (
                <li key={i}>
                  <a href={link.url} className="font-medium underline">
                    {link.nombre}
                  </a>
                  {link.descuento && <span className="text-neutral-500"> — {link.descuento}</span>}
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
