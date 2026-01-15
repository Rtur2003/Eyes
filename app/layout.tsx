import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURUM NEXUS | Neural Dream Journal",
  description: "Advanced consciousness exploration through dream analysis and lucid dreaming mastery",
  keywords: ["dream journal", "lucid dreaming", "consciousness", "dream analysis", "sleep"],
  authors: [{ name: "Aurum Nexus" }],
  openGraph: {
    title: "AURUM NEXUS | Neural Dream Journal",
    description: "Advanced consciousness exploration through dream analysis and lucid dreaming mastery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className="font-sans bg-obsidian text-gold-50 antialiased"
        suppressHydrationWarning
      >
        {/* Skip link for keyboard navigation - accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Global background gradient */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/15 via-obsidian to-obsidian pointer-events-none" aria-hidden="true" />
        
        {/* Neural mesh pattern */}
        <div className="fixed inset-0 z-[-1] neural-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}
