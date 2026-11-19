import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Reveal } from "@/components/reveal";
import { Marquee, Spotlight } from "@/components/ambient";
import { QuoteForm, QUOTE_EMAIL } from "@/components/quote-form";
import { ContactCard } from "@/components/contact-card";
import { projects } from "@/lib/projects";
import { dicts, htmlLang, langLabel, langPath, LANGS, type Lang } from "@/lib/i18n";

function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  return (
    <ul aria-label={label} className="flex gap-1 text-xs uppercase tracking-[0.15em]">
      {LANGS.map((l) => (
        <li key={l}>
          {/* Plain links: each language is its own document, so a full load is expected. */}
          <a href={langPath(l)} hrefLang={htmlLang[l]} lang={htmlLang[l]} aria-current={l === lang ? "page" : undefined} title={langLabel[l]}
            className={`grid min-h-9 min-w-9 place-items-center rounded-full px-2 ${l === lang ? "bg-bone text-void" : "hover:underline"}`}>
            <span aria-hidden="true">{l}</span><span className="sr-only">{langLabel[l]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Home({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const live = projects.filter((p) => p.live).length;
  return (
    <>
      <nav aria-label={d.nav.label} className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between gap-4 px-4 py-4 text-sm sm:px-8">
          <a href="#topo" className="font-display text-lg font-bold tracking-tight">vh</a>
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="#trabalho" className="hover:underline">{d.nav.work}</a>
            <a href="#servicos" className="hidden hover:underline sm:inline">{d.nav.services}</a>
            <a href="#processo" className="hidden hover:underline sm:inline">{d.nav.process}</a>
            <a href="#contato" className="hover:underline">{d.nav.contact}</a>
            <LangSwitch lang={lang} label={d.nav.language} />
          </div>
        </div>
      </nav>

      <main id="conteudo">
        <Spotlight />
        <div id="topo"><Hero lang={lang} /></div>
        <Marquee lang={lang} />

        <section id="trabalho" aria-labelledby="trabalho-h" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="trabalho-h" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">{d.work.title}</h2>
            <p className="max-w-sm text-ash">{d.work.intro(projects.length, live)}</p>
          </Reveal>
          <Work lang={lang} />
        </section>

        <section id="servicos" aria-labelledby="servicos-h" className="scroll-mt-16 bg-bone px-4 py-24 text-void sm:px-8 sm:py-32">
          <Reveal><h2 id="servicos-h" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">{d.services.title}</h2></Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-void/15 sm:grid-cols-2">
            {d.services.items.map(([t, desc], i) => (
              <li key={t} className="bg-bone p-6 sm:p-10">
                <Reveal delay={i * 0.06}>
                  <p className="text-sm tabular-nums text-void/50">0{i + 1}</p>
                  <h3 className="mt-6 font-display text-3xl font-bold tracking-tight">{t}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-void/75">{desc}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="processo" aria-labelledby="processo-h" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
          <Reveal><h2 id="processo-h" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">{d.process.title}</h2></Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {d.process.items.map(([t, desc], i) => (
              <li key={t} className="border-t border-bone/30 pt-6">
                <Reveal delay={i * 0.08}>
                  <p className="font-display text-6xl font-extrabold text-bone/15">{i + 1}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{t}</h3>
                  <p className="mt-3 leading-relaxed text-ash">{desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="contato" aria-labelledby="contato-h" className="scroll-mt-16 border-t border-seam px-4 py-24 sm:px-8 sm:py-36">
          <p className="text-xs uppercase tracking-[0.3em] text-ash">{d.contact.eyebrow}</p>
          <h2 id="contato-h" className="mt-4 font-display font-extrabold leading-[0.86] tracking-[-0.045em]" style={{ fontSize: "clamp(3rem, min(12vw, 22vh), 11rem)" }}>
            {d.contact.title[0]}<br /><span className="text-transparent [-webkit-text-stroke:2px_var(--color-bone)]">{d.contact.title[1]}</span>
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <p className="mb-8 max-w-xl text-lg text-bone/85">{d.contact.intro}</p>
              <QuoteForm lang={lang} />
            </div>
            <aside aria-label={d.contact.others} className="space-y-3 lg:pt-16">
              <ContactCard label={d.contact.email} value={QUOTE_EMAIL} href={`mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(d.contact.subject)}`} copy copyLabel={d.contact.copy} copiedLabel={d.contact.copied} />
              <ContactCard label="GitHub" value="github.com/vhcodestudio" href="https://github.com/vhcodestudio" />
              <ContactCard label={d.contact.works} value={d.contact.worksValue} href="#trabalho" />
            </aside>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-4 border-t border-seam px-4 py-8 text-xs text-ash sm:px-8">
        <p>vhcodestudio · 2026</p>
        <p>{d.footer.made} <a href="https://github.com/vhcodestudio/vhcodestudio-site" className="underline hover:text-bone">GitHub</a>.</p>
      </footer>
    </>
  );
}
