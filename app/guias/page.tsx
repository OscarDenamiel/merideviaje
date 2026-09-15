import { client } from "@/sanity/client";

export const revalidate = 60;

export const metadata = {
  title: "Guías de viaje por destino",
  description: "Todas las guías de viaje de Mary de Viaje, organizadas por país.",
};

async function getPaises() {
  try {
    return await client.fetch(
      `*[_type == "pais"]{ nombre, "slug": slug.current }`
    );
  } catch {
    return [];
  }
}

export default async function GuiasIndexPage() {
  const paises = await getPaises();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Guías de viaje</h1>

      {paises.length === 0 ? (
        <p className="mt-6 text-neutral-500">
          Aún no hay países con guías publicadas.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {paises.map((pais: { nombre: string; slug: string }) => (
            <li key={pais.slug}>
              <a
                href={`/guias/${pais.slug}`}
                className="text-lg font-medium underline underline-offset-4"
              >
                {pais.nombre}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
