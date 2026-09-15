import { createClient } from "next-sanity";
import { dataset, projectId, apiVersion } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // 'published' = solo contenido publicado por Meri, nunca borradores a medias
  useCdn: true,
  perspective: "published",
});
