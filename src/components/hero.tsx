"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/projects";

const WORD = "vhcodestudio";
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-35%"]);
  const stripX = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const frames = projects.filter((p) => p.image);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24" aria-labelledby="hero-h">
      <motion.div style={{ y: titleY, opacity: fade }} className="px-4 sm:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-ash">Estúdio independente · Brasil</motion.p>
        <h1 id="hero-h" className="mt-4 font-display font-extrabold leading-[0.82] tracking-[-0.045em]" style={{ fontSize: "clamp(3.6rem, 15.5vw, 16rem)" }}>
          <span className="sr-only">{WORD}</span>
          <span aria-hidden="true" className="flex flex-wrap">
            {[...WORD].map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
                <motion.span className="inline-block" initial={{ y: reduce ? 0 : "105%" }} animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.045 }}>{ch}</motion.span>
              </span>
            ))}
          </span>
        </h1>
        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-xl text-xl leading-snug text-bone/90 sm:text-2xl">
            Eu desenho e programo produtos para a web. Sites que carregam rápido, apps que funcionam offline e ferramentas que alguém realmente usa.
          </p>
          <a href="#trabalho" className="group flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
            Ver trabalhos
            <span className="grid size-11 place-items-center rounded-full border border-bone/40 transition-colors group-hover:bg-bone group-hover:text-void" aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </motion.div>

      <div className="relative mt-14 pb-8" aria-hidden="true">
        <motion.div style={{ x: stripX }} className="flex w-max gap-3 pl-4 sm:gap-4 sm:pl-8">
          {[...frames, ...frames].map((p, i) => (
            <motion.figure key={i} initial={{ opacity: 0, y: reduce ? 0 : 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + (i % frames.length) * 0.08, duration: 0.8, ease: EASE }}
              className={`relative shrink-0 overflow-hidden rounded-lg border border-seam bg-coal ${p.shape === "phone" ? "h-56 w-28 sm:h-72 sm:w-36" : "h-56 w-80 sm:h-72 sm:w-[26rem]"}`}>
              <Image src={p.image!} alt="" aria-hidden="true" fill sizes={p.shape === "phone" ? "144px" : "416px"} priority={i < 3} className="object-cover object-top" />
              <figcaption className="absolute bottom-0 left-0 m-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ background: p.color, color: p.ink }}>{p.name}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
