type PortableBlock = {
  _type?: string;
  children?: { text?: string }[];
};

const PALABRAS_POR_MINUTO = 200;

export function tiempoDeLectura(contenido?: PortableBlock[]): string {
  if (!contenido || contenido.length === 0) return "";

  const palabras = contenido
    .filter((block) => block._type === "block")
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (palabras === 0) return "";

  const minutos = Math.max(1, Math.round(palabras / PALABRAS_POR_MINUTO));
  return `${minutos} min`;
}
