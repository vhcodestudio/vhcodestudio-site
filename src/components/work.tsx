"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";
import { localizedProjects } from "@/lib/project-copy";
import { dicts, type Lang, type Dict } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

function Case({ p, i, open, onToggle, t }: { p: Project; i: number; open: boolean; onToggle: () => void; t: Dict["work"] }) {
  const reduce = useReducedMotion();
  return (
    <motion.li initial={{ opacity: 0, y: reduce ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }} className="border-t border-seam">
      <h3>
        <button onClick={onToggle} aria-expanded={open} aria-controls={`case-${p.slug}`}
          className="group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 overflow-hidden py-6 text-left sm:grid-cols-[4rem_1fr_14rem_auto] sm:py-8">
          <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100" style={{ background: p.color }} />
          <span className="relative text-sm tabular-nums text-ash transition-colors group-hover:text-[var(--ink)]" style={{ "--ink": p.ink } as React.CSSProperties}>{String(i + 1).padStart(2, "0")}</span>
          <span className="relative font-display text-4xl font-bold tracking-tight transition-colors group-hover:text-[var(--ink)] sm:text-6xl" style={{ "--ink": p.ink } as React.CSSProperties}>{p.name}</span>
          <span className="relative hidden text-sm text-ash transition-colors group-hover:text-[var(--ink)] sm:block" style={{ "--ink": p.ink } as React.CSSProperties}>{p.kind}</span>
          <span aria-hidden="true" className={`relative grid size-9 place-items-center rounded-full border border-current text-lg transition-transform group-hover:text-[var(--ink)] ${open ? "rotate-45" : ""}`} style={{ "--ink": p.ink } as React.CSSProperties}>+</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={`case-${p.slug}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} className="overflow-hidden">
            <div className="grid gap-8 pb-12 pt-2 sm:pl-16 lg:grid-cols-[1fr_1.1fr]">
              <div className="space-y-6">
                <p className="font-display text-2xl font-semibold leading-snug sm:text-3xl">{p.line}</p>
                <dl className="space-y-5 text-bone/85">
                  <div><dt className="text-xs uppercase tracking-[0.2em] text-ash">{t.problem}</dt><dd className="mt-1 leading-relaxed">{p.problem}</dd></div>
                  <div><dt className="text-xs uppercase tracking-[0.2em] text-ash">{t.built}</dt><dd className="mt-1 leading-relaxed">{p.built}</dd></div>
                  <div><dt className="text-xs uppercase tracking-[0.2em] text-ash">{t.detail}</dt><dd className="mt-1 leading-relaxed">{p.detail}</dd></div>
                </dl>
                <ul className="flex flex-wrap gap-2" aria-label="Stack">
                  {p.stack.map((s) => <li key={s} className="rounded-full border border-seam px-3 py-1 text-xs">{s}</li>)}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: p.color, color: p.ink }}>{t.open}</a>}
                  <a href={p.repo} target="_blank" rel="noreferrer" className="rounded-full border border-bone/40 px-5 py-2.5 text-sm hover:bg-bone hover:text-void">{t.code}</a>
                </div>
              </div>
              <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-xl p-6" style={{ background: p.color }}>
                {p.image ? (
                  <Image src={p.image} alt={t.shot(p.name)} sizes="(min-width: 1024px) 40vw, 90vw" width={p.shape === "phone" ? 260 : 640} height={p.shape === "phone" ? 560 : 560}
                    className={`rounded-lg shadow-2xl ${p.shape === "phone" ? "max-h-[28rem] w-auto" : "w-full"}`} />
                ) : (
                  <p className="font-display text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none tracking-tight" style={{ color: p.ink }}>{p.name}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function Work({ lang = "pt" }: { lang?: Lang }) {
  const projects = localizedProjects(lang);
  const t = dicts[lang].work;
  const [open, setOpen] = useState<string | null>(projects[0].slug);
  return (
    <ol className="border-b border-seam">
      {projects.map((p, i) => <Case key={p.slug} p={p} i={i} open={open === p.slug} onToggle={() => setOpen(open === p.slug ? null : p.slug)} t={t} />)}
    </ol>
  );
}
