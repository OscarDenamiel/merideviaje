import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { urlDeArticulo, type Articulo } from "@/lib/types";

export const revalidate = 60;

const SITE_URL = "https://merideviaje.com";

const PAGINAS_FIJAS = [
  "",
  "/guias",
  "/blog",
  "/comparativas",
  "/recursos",
  "/asesoria",
  "/tienda",
  "/sobre-mi",
  "/portfolio",
  "/contacto",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articulos: Articulo[] = [];
  let paises: { slug: string }[] = [];
  try {
    articulos = await client.fetch(
      `*[_type == "articulo"]{ _id, titulo, tipo, "slug": slug.current, "paisSlug": pais->slug.current }`
    );
    paises = await client.fetch(`*[_type == "pais"]{ "slug": slug.current }`);
  } catch {
    articulos = [];
    paises = [];
  }

  const urlsFijas = PAGINAS_FIJAS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const urlsPaises = paises.map((p) => ({
    url: `${SITE_URL}/guias/${p.slug}`,
    lastModified: new Date(),
  }));

  const urlsArticulos = articulos.map((a) => ({
    url: `${SITE_URL}${urlDeArticulo(a)}`,
    lastModified: new Date(),
  }));

  return [...urlsFijas, ...urlsPaises, ...urlsArticulos];
}
