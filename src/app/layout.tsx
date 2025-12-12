import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bolívar Chat - Asistente Virtual | Seguros Bolívar",
  description: "Tu asistente virtual de Seguros Bolívar para consultas inteligentes y atención personalizada",
  keywords: ["chat", "Seguros Bolívar", "asistente virtual", "atención al cliente"],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

