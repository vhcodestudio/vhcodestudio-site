import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Inter_Tight } from "next/font/google";
import { dicts, htmlLang, langPath, LANGS, type Lang } from "@/lib/i18n";

const display = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["600", "700", "800"] });
const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });

const OG_LOCALE: Record<Lang, string> = { pt: "pt_BR", en: "en_US", es: "es_ES" };

export function metadataFor(lang: Lang): Metadata {
  const { title, description } = dicts[lang].meta;
  return {
    title,
    description,
    metadataBase: new URL("https://vhcodestudio.vercel.app"),
    alternates: {
      canonical: langPath(lang),
      languages: { ...Object.fromEntries(LANGS.map((l) => [htmlLang[l], langPath(l)])), "x-default": "/" },
    },
    robots: { index: true, follow: true },
    referrer: "strict-origin-when-cross-origin",
    openGraph: { title: "vhcodestudio", description, type: "website", locale: OG_LOCALE[lang] },
    twitter: { card: "summary", title: "vhcodestudio", description },
  };
}

/** The <html> document shared by the three language root layouts. */
export function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const d = dicts[lang];
  return (
    <html lang={htmlLang[lang]} className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="grain">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-bone focus:px-4 focus:py-2 focus:text-void">{d.skip}</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization", name: "vhcodestudio", url: "https://vhcodestudio.vercel.app",
          sameAs: ["https://github.com/vhcodestudio"], description: d.meta.description,
        }) }} />
      </body>
    </html>
  );
}
