"use client";

import { useEffect, useRef } from "react";
import { dicts, type Lang } from "@/lib/i18n";

/** Soft light that trails the pointer. Skipped on touch screens and for reduced motion. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 3, tx = x, ty = y, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    el.style.opacity = "1";
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 size-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: "radial-gradient(circle, rgb(239 236 230 / 0.07), transparent 60%)" }} />
  );
}


/** Infinite marquee of services; pure CSS so it costs nothing on the main thread. */
export function Marquee({ lang = "pt" }: { lang?: Lang }) {
  const { label, words } = dicts[lang].marquee;
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-seam py-6" aria-label={`${label}: ${words.join(", ")}`}>
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-4xl font-bold tracking-tight sm:text-6xl" aria-hidden="true">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-bone)]" : ""}>{w}</span>
            <span className="text-2xl text-ash">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
