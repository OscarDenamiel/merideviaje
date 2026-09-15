import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://merideviaje.com"),
  title: {
    default: "Mary de Viaje — Guías de viaje auténticas",
    template: "%s | Mary de Viaje",
  },
  description:
    "Guías de viaje, tips y recomendaciones reales de @merideviaje: experiencias vividas, itinerarios detallados y los mejores descuentos para tu próximo viaje.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Mary de Viaje",
  },
};

const navLinks = [
  { href: "/guias", label: "Guías" },
  { href: "/blog", label: "Blog" },
  { href: "/comparativas", label: "Comparativas" },
  { href: "/recursos", label: "Recursos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/asesoria", label: "Asesoría" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contacto", label: "Contacto" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {/* Navegación provisional, solo para poder movernos por la estructura.
            El diseño real de la cabecera llega con Claude Design. */}
        <nav className="border-b border-neutral-200 px-6 py-4">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="/" className="font-semibold">
              Mary de Viaje
            </a>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-neutral-600 hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        {children}
        <footer className="mt-24 border-t border-neutral-200 px-6 py-8 text-sm text-neutral-500">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-x-4 gap-y-2">
            <a href="/legal/aviso-legal" className="hover:underline">
              Aviso legal
            </a>
            <a href="/legal/privacidad" className="hover:underline">
              Privacidad
            </a>
            <a href="/legal/cookies" className="hover:underline">
              Cookies
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
