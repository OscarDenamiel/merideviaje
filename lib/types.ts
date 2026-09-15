export type Articulo = {
  _id: string;
  titulo: string;
  slug: string;
  tipo: "guia" | "blog" | "comparativa";
  resumen?: string;
  paisSlug?: string;
};

export function urlDeArticulo(articulo: Articulo): string {
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
