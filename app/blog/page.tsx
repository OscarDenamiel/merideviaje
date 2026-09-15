import { client } from "@/sanity/client";

export const revalidate = 60;

export const metadata = {
  title: "Blog de viajes",
  description: "Tips, itinerarios y recomendaciones reales de Mary de Viaje.",
};

async function getArticulosBlog() {
  try {
    return await client.fetch(
      `*[_type == "articulo" && tipo == "blog"] | order(fechaPublicacion desc){
        _id, titulo, resumen, "slug": slug.current
      }`
    );
  } catch {
    return [];
  }
}

export default async function BlogIndexPage() {
  const articulos = await getArticulosBlog();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Blog</h1>

      {articulos.length === 0 ? (
        <p className="mt-6 text-neutral-500">Aún no hay artículos publicados.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {articulos.map((a: { _id: string; titulo: string; resumen?: string; slug: string }) => (
            <li key={a._id}>
              <a href={`/blog/${a.slug}`} className="text-lg font-medium underline underline-offset-4">
                {a.titulo}
              </a>
              {a.resumen && <p className="text-neutral-600">{a.resumen}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
