import type { Metadata } from "next";
import { Orbitron, Cinzel } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUREUS | Sovereign Interface",
  description: "The Gold Standard in Digital Asset & Reputation Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${cinzel.variable} font-sans bg-obsidian text-gold-50 antialiased selection:bg-gold-400/30 selection:text-gold-100`}>
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/20 via-obsidian to-obsidian pointer-events-none" />
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
