import { defineField, defineType } from "sanity";

export default defineType({
  name: "pais",
  title: "País",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nombre" },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "nombre" },
  },
});
