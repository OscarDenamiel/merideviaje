import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";

export const revalidate = 60;

type Props = { params: { slug: string } };

async function getArticulo(slug: string) {
  return client.fetch(
    `*[_type == "articulo" && tipo == "blog" && slug.current == $slug][0]{
      titulo, resumen, contenido, seoTitulo, seoDescripcion
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

export default async function BlogArticuloPage({ params }: Props) {
  const articulo = await getArticulo(params.slug);
  if (!articulo) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm text-neutral-500">
        <a href="/blog" className="underline">
          Blog
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
    </main>
  );
}
