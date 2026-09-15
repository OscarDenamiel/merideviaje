export type Articulo = {
  _id: string;
  titulo: string;
  slug: string;
  tipo: "guia" | "blog" | "comparativa";
  resumen?: string;
};
