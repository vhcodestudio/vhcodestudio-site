import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Reveal } from "@/components/reveal";
import { Marquee, Spotlight } from "@/components/ambient";
import { projects } from "@/lib/projects";

const SERVICES = [
  ["Sites e landing pages", "Páginas rápidas, com SEO e acessibilidade resolvidos desde o começo. Bom para lançar um produto ou trocar um site que ninguém consegue editar."],
  ["Apps web e PWAs", "Ferramentas internas, painéis e apps que instalam no celular e funcionam sem internet."],
  ["Lojas", "Catálogo, carrinho e checkout com Stripe, com os preços conferidos no servidor."],
  ["Auditoria e ajustes", "Reviso acessibilidade, performance e segurança de um site que já existe e entrego a lista do que corrigir, em ordem."],
];

const PROCESS = [
  ["Conversa", "Uma chamada para entender quem vai usar, o que precisa funcionar no primeiro dia e o que pode esperar."],
  ["Direção", "Antes do código, uma página com tipografia, cores e as telas principais. Você aprova ou muda o rumo aqui, quando ainda é barato."],
  ["Construção", "Entregas curtas com link ao vivo desde a primeira semana. Testes automatizados nas partes que não podem quebrar."],
  ["Entrega", "Deploy, domínio, README em português e inglês, e uma auditoria final de acessibilidade, performance e SEO."],
];

export default function Home() {
  const live = projects.filter((p) => p.live).length;
  return (
    <>
      <nav aria-label="Principal" className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-4 py-5 text-sm sm:px-8">
          <a href="#topo" className="font-display text-lg font-bold tracking-tight">vh</a>
          <div className="flex gap-5 sm:gap-8">
            <a href="#trabalho" className="hover:underline">Trabalho</a>
            <a href="#servicos" className="hidden hover:underline sm:inline">Serviços</a>
            <a href="#processo" className="hidden hover:underline sm:inline">Processo</a>
            <a href="#contato" className="hover:underline">Contato</a>
          </div>
        </div>
      </nav>

      <main id="conteudo">
        <Spotlight />
        <div id="topo"><Hero /></div>
        <Marquee />

        <section id="trabalho" aria-labelledby="trabalho-h" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="trabalho-h" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">Trabalho</h2>
            <p className="max-w-sm text-ash">{projects.length} projetos, {live} deles no ar agora. Abra um para ver o problema, o que foi feito e o link.</p>
          </Reveal>
          <Work />
        </section>

        <section id="servicos" aria-labelledby="servicos-h" className="scroll-mt-16 bg-bone px-4 py-24 text-void sm:px-8 sm:py-32">
          <Reveal><h2 id="servicos-h" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">Serviços</h2></Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-void/15 sm:grid-cols-2">
            {SERVICES.map(([t, d], i) => (
              <li key={t} className="bg-bone p-6 sm:p-10">
                <Reveal delay={i * 0.06}>
                  <p className="text-sm tabular-nums text-void/50">0{i + 1}</p>
                  <h3 className="mt-6 font-display text-3xl font-bold tracking-tight">{t}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-void/75">{d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section id="processo" aria-labelledby="processo-h" className="scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
          <Reveal><h2 id="processo-h" className="font-display text-5xl font-bold tracking-tight sm:text-7xl">Processo</h2></Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {PROCESS.map(([t, d], i) => (
              <li key={t} className="border-t border-bone/30 pt-6">
                <Reveal delay={i * 0.08}>
                  <p className="font-display text-6xl font-extrabold text-bone/15">{i + 1}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{t}</h3>
                  <p className="mt-3 leading-relaxed text-ash">{d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="contato" aria-labelledby="contato-h" className="scroll-mt-16 border-t border-seam px-4 py-24 sm:px-8 sm:py-36">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-ash">Contato</p>
            <h2 id="contato-h" className="mt-4 max-w-5xl font-display font-extrabold leading-[0.9] tracking-[-0.04em]" style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)" }}>
              Tem um projeto parado na gaveta?
            </h2>
            <p className="mt-8 max-w-xl text-lg text-bone/85">Conte o que você quer construir. Respondo com perguntas, uma ideia de prazo e o que eu faria primeiro.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="mailto:vhcodestudio@gmail.com?subject=Projeto%20com%20a%20vhcodestudio" className="magnetic max-w-full break-all rounded-full bg-bone px-7 py-4 font-semibold text-void transition-opacity hover:opacity-85">vhcodestudio@gmail.com</a>
              <a href="https://github.com/vhcodestudio" className="rounded-full border border-bone/40 px-7 py-4 hover:bg-bone hover:text-void">GitHub ↗</a>
              <a href="#trabalho" className="rounded-full border border-bone/40 px-7 py-4 hover:bg-bone hover:text-void">Ver trabalhos de novo</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-4 border-t border-seam px-4 py-8 text-xs text-ash sm:px-8">
        <p>vhcodestudio · 2026</p>
        <p>Feito com Next.js, Tailwind e Motion. Código aberto no <a href="https://github.com/vhcodestudio/vhcodestudio-site" className="underline hover:text-bone">GitHub</a>.</p>
      </footer>
    </>
  );
}
