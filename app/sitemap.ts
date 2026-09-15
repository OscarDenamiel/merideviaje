import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const SITE_URL = "https://merideviaje.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let guias: { slug: string }[] = [];
  try {
    guias = await client.fetch(
      `*[_type == "guia"]{ "slug": slug.current }`
    );
  } catch {
    guias = [];
  }

  const guiaUrls = guias.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...guiaUrls,
  ];
}
