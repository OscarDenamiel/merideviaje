import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";

export const revalidate = 60;

type Props = { params: { pais: string; slug: string } };

async function getGuia(slug: string) {
  return client.fetch(
    `*[_type == "articulo" && tipo == "guia" && slug.current == $slug][0]{
      titulo, resumen, contenido, seoTitulo, seoDescripcion,
      "pais": pais->{nombre, "slug": slug.current},
      linksAfiliado
    }`,
    { slug }
  );
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

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm text-neutral-500">
        <a href="/guias" className="underline">
          Guías
        </a>{" "}
        /{" "}
        <a href={`/guias/${params.pais}`} className="underline">
          {guia.pais?.nombre}
        </a>
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{guia.titulo}</h1>
      {guia.resumen && (
        <p className="mt-4 text-lg text-neutral-600">{guia.resumen}</p>
      )}

      {guia.contenido && (
        <div className="prose prose-neutral mt-10 max-w-none">
          <PortableText value={guia.contenido} />
        </div>
      )}

      {guia.linksAfiliado?.length > 0 && (
        <section className="mt-12 rounded-lg border border-neutral-200 p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
            Reserva y descuentos
          </h2>
          <ul className="mt-3 space-y-2">
            {guia.linksAfiliado.map(
              (link: { nombre?: string; url?: string; descuento?: string }, i: number) => (
                <li key={i}>
                  <a href={link.url} className="font-medium underline">
                    {link.nombre}
                  </a>
                  {link.descuento && (
                    <span className="text-neutral-500"> — {link.descuento}</span>
                  )}
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
