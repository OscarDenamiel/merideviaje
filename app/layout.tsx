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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
