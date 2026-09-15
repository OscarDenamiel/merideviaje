import { defineField, defineType } from "sanity";

export default defineType({
  name: "articulo",
  title: "Artículo",
  type: "document",
  groups: [
    { name: "contenido", title: "Contenido", default: true },
    { name: "afiliados", title: "Links de afiliado" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      group: "contenido",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "contenido",
      options: { source: "titulo", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo de contenido",
      type: "string",
      group: "contenido",
      options: {
        list: [
          { title: "Guía de destino", value: "guia" },
          { title: "Blog / tips", value: "blog" },
          { title: "Comparativa (seguros, e-SIM, etc.)", value: "comparativa" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pais",
      title: "País / destino",
      type: "reference",
      to: [{ type: "pais" }],
      group: "contenido",
    }),
    defineField({
      name: "resumen",
      title: "Resumen corto",
      description: "Se usa en las tarjetas de la web y como descripción por defecto para buscadores.",
      type: "text",
      rows: 3,
      group: "contenido",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "imagenDestacada",
      title: "Imagen destacada",
      type: "image",
      group: "contenido",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (para SEO y accesibilidad)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "array",
      group: "contenido",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "fechaPublicacion",
      title: "Fecha de publicación",
      type: "datetime",
      group: "contenido",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "linksAfiliado",
      title: "Links de afiliado",
      type: "array",
      group: "afiliados",
      of: [
        {
          type: "object",
          name: "linkAfiliado",
          fields: [
            defineField({ name: "nombre", title: "Nombre (ej. IATI Seguros)", type: "string" }),
            defineField({ name: "url", title: "URL de afiliado", type: "url" }),
            defineField({ name: "descuento", title: "Texto del descuento (ej. 15% dto.)", type: "string" }),
          ],
          preview: {
            select: { title: "nombre", subtitle: "descuento" },
          },
        },
      ],
    }),
    defineField({
      name: "seoTitulo",
      title: "Título SEO (opcional)",
      description: "Si lo dejas vacío, se usa el título normal.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescripcion",
      title: "Descripción SEO (opcional)",
      description: "Si lo dejas vacío, se usa el resumen corto.",
      type: "text",
      rows: 2,
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "tipo", media: "imagenDestacada" },
  },
});
