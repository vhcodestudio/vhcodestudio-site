"use client";

import { useState } from "react";

/** Contact row: opens the link, and optionally copies the value to the clipboard. */
export function ContactCard({ label, value, href, copy = false, copyLabel = "Copiar", copiedLabel = "Copiado" }: { label: string; value: string; href: string; copy?: boolean; copyLabel?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);
  const external = href.startsWith("http");
  return (
    <div className="group flex items-center justify-between gap-3 rounded-2xl border border-seam bg-coal/60 p-4 transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-bone/40">
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="min-w-0 flex-1">
        <span className="block text-xs uppercase tracking-[0.2em] text-ash">{label}</span>
        <span className="mt-1 block truncate font-medium">{value}</span>
      </a>
      {copy ? (
        <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ } }}
          className="magnetic min-h-11 shrink-0 rounded-full border border-seam px-4 text-sm hover:border-bone" aria-label={`${copyLabel} ${label}`}>
          {copied ? copiedLabel : copyLabel}
        </button>
      ) : (
        <span aria-hidden="true" className="text-ash transition-transform group-hover:translate-x-0.5">↗</span>
      )}
    </div>
  );
}
