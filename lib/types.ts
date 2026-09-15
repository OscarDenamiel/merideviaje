export type Articulo = {
  _id: string;
  titulo: string;
  slug: string;
  tipo: "guia" | "blog" | "comparativa";
  resumen?: string;
  paisSlug?: string;
  paisNombre?: string;
  tiempoLectura?: string;
  imagenUrl?: string;
  imagenAlt?: string;
};

export const TIPO_LABEL: Record<Articulo["tipo"], string> = {
  guia: "Guía",
  blog: "Blog",
  comparativa: "Comparativa",
};

export function urlDeArticulo(articulo: Pick<Articulo, "tipo" | "slug" | "paisSlug">): string {
  switch (articulo.tipo) {
    case "guia":
      return articulo.paisSlug
        ? `/guias/${articulo.paisSlug}/${articulo.slug}`
        : `/guias/${articulo.slug}`;
    case "blog":
      return `/blog/${articulo.slug}`;
    case "comparativa":
      return `/comparativas/${articulo.slug}`;
  }
}
