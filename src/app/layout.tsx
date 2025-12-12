import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Chat - Tu Asistente de IA",
  description: "Aplicación de chat con inteligencia artificial para conversaciones inteligentes",
  keywords: ["chat", "AI", "inteligencia artificial", "asistente"],
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

