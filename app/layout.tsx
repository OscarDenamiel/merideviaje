import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://merideviaje.com"),
  title: {
    default: "Mery de Viaje — Guías de viaje auténticas",
    template: "%s | Mery de Viaje",
  },
  description:
    "Guías de viaje, tips y recomendaciones reales de @merideviaje: itinerarios probados, tips que sirven de verdad y los descuentos que uso yo misma.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Mery de Viaje",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
