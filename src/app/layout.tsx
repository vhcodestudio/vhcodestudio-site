import type { Metadata, Viewport } from "next";
import { Syne, Inter_Tight } from "next/font/google";
import "./globals.css";

const display = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["600", "700", "800"] });
const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });

const description = "Estúdio independente de produto digital. Sites, apps e ferramentas web feitos do zero, do primeiro rascunho ao deploy.";

export const metadata: Metadata = {
  title: "vhcodestudio — produto digital, do rascunho ao deploy",
  description,
  metadataBase: new URL("https://vhcodestudio.vercel.app"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  referrer: "strict-origin-when-cross-origin",
  openGraph: { title: "vhcodestudio", description, type: "website" },
  twitter: { card: "summary", title: "vhcodestudio", description },
};

export const viewport: Viewport = { themeColor: "#0b0b0c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="grain">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-bone focus:px-4 focus:py-2 focus:text-void">Pular para o conteúdo</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization", name: "vhcodestudio", url: "https://vhcodestudio.vercel.app",
          sameAs: ["https://github.com/vhcodestudio"], description,
        }) }} />
      </body>
    </html>
  );
}
