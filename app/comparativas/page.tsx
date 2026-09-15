import { client } from "@/sanity/client";

export const revalidate = 60;

export const metadata = {
  title: "Comparativas de viaje",
  description: "Seguros, e-SIMs y otros esenciales de viaje, comparados.",
};

async function getComparativas() {
  try {
    return await client.fetch(
      `*[_type == "articulo" && tipo == "comparativa"] | order(fechaPublicacion desc){
        _id, titulo, resumen, "slug": slug.current
      }`
    );
  } catch {
    return [];
  }
}

export default async function ComparativasIndexPage() {
  const articulos = await getComparativas();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Comparativas</h1>

      {articulos.length === 0 ? (
        <p className="mt-6 text-neutral-500">Aún no hay comparativas publicadas.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {articulos.map((a: { _id: string; titulo: string; resumen?: string; slug: string }) => (
            <li key={a._id}>
              <a href={`/comparativas/${a.slug}`} className="text-lg font-medium underline underline-offset-4">
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
