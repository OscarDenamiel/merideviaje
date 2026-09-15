import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/client";

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

async function getGuia(slug: string) {
  return client.fetch(
    `*[_type == "articulo" && slug.current == $slug][0]{ titulo, resumen, contenido }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const guia = await getGuia(params.slug);
  if (!guia) return {};
  return {
    title: guia.titulo,
    description: guia.resumen,
  };
}

export default async function GuiaPage({ params }: Props) {
  const guia = await getGuia(params.slug);
  if (!guia) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">{guia.titulo}</h1>
      {guia.resumen && (
        <p className="mt-4 text-lg text-neutral-600">{guia.resumen}</p>
      )}
    </main>
  );
}
