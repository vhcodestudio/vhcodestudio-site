"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { dicts, type Lang } from "../lib/i18n";

export const QUOTE_EMAIL = "vhcodestudio@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${QUOTE_EMAIL}`;
const LANG_NAME: Record<Lang, string> = { pt: "Português", en: "Inglês", es: "Espanhol" };

type Errors = Partial<Record<"service" | "name" | "email" | "message" | "consent", string>>;
type Status = "idle" | "sending" | "sent" | "error";

/** Validates the quote request; returns one message per invalid field, in the page language. */
export function validateQuote(f: { service: string; name: string; email: string; message: string; consent: boolean }, lang: Lang = "pt"): Errors {
  const m = dicts[lang].form.errors;
  const e: Errors = {};
  if (!f.service) e.service = m.service;
  if (f.name.trim().length < 2) e.name = m.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = m.email;
  if (f.message.trim().length < 20) e.message = m.message;
  if (!f.consent) e.consent = m.consent;
  return e;
}

function Chips({ name, label, options, value, onChange, error }: { name: string; label: string; options: string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined}>
      <legend className="text-sm text-ash">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={`magnetic cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bone ${value === o ? "border-bone bg-bone text-void" : "border-seam hover:border-bone/60"}`}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {error && <p id={`${name}-err`} className="mt-2 text-sm text-[#ff8a7a]">{error}</p>}
    </fieldset>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-ash">{label}</label>
      <div className="mt-2">{children}</div>
      {error && <p id={`${id}-err`} className="mt-2 text-sm text-[#ff8a7a]">{error}</p>}
    </div>
  );
}

const input = "w-full rounded-2xl border border-seam bg-coal px-4 py-3.5 text-base text-bone outline-none transition-colors placeholder:text-ash/60 focus:border-bone";
const EMPTY = { service: "", budget: "", deadline: "", name: "", email: "", phone: "", message: "", consent: false, honey: "" };

export function QuoteForm({ lang = "pt" }: { lang?: Lang }) {
  const t = dicts[lang].form;
  const reduce = useReducedMotion();
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => { setF((x) => ({ ...x, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (f.honey) return; // bots fill the hidden field
    const e = validateQuote(f, lang);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`q-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    setNote("");
    try {
      // The email to the studio stays in Portuguese; "Idioma" says which language to reply in.
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Pedido de orçamento (${lang.toUpperCase()}): ${f.service}`,
          _template: "table",
          _captcha: "false",
          _replyto: f.email.trim(),
          Idioma: LANG_NAME[lang],
          Projeto: f.service,
          Investimento: f.budget || "Não informado",
          Prazo: f.deadline || "Não informado",
          Nome: f.name.trim(),
          "E-mail": f.email.trim(),
          WhatsApp: f.phone.trim() || "Não informado",
          Ideia: f.message.trim(),
        }),
      });
      const data = (await r.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (!r.ok || String(data.success) !== "true") throw new Error(data.message || "rejected");
      setStatus("sent");
    } catch {
      setStatus("error");
      setNote(t.fail(QUOTE_EMAIL));
    }
  }

  if (status === "sent") {
    return (
      <motion.div role="status" initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-seam bg-coal p-8 sm:p-12">
        <svg viewBox="0 0 52 52" className="size-14 text-bone" aria-hidden="true">
          <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
        </svg>
        <h3 className="mt-6 font-display text-3xl font-bold">{t.done(f.name.trim().split(" ")[0])}</h3>
        <p className="mt-3 max-w-md text-bone/80">{t.doneText(f.email.trim())}{f.phone.trim() ? t.doneWhats : ""}</p>
        <button type="button" onClick={() => { setStatus("idle"); setF(EMPTY); }}
          className="magnetic mt-8 min-h-11 rounded-full border border-bone/40 px-6 py-3 hover:bg-bone hover:text-void">{t.again}</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-8 rounded-[2rem] border border-seam bg-coal/60 p-6 sm:p-10" aria-label={t.label}>
      <div id="q-service" tabIndex={-1} className="outline-none">
        <Chips name="service" label={t.service} options={t.services} value={f.service} onChange={(v) => set("service", v)} error={errors.service} />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Chips name="budget" label={t.budget} options={t.budgets} value={f.budget} onChange={(v) => set("budget", v)} />
        <Chips name="deadline" label={t.deadline} options={t.deadlines} value={f.deadline} onChange={(v) => set("deadline", v)} />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Field id="q-name" label={t.name} error={errors.name}>
          <input id="q-name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "q-name-err" : undefined} className={input} maxLength={80} />
        </Field>
        <Field id="q-email" label={t.email} error={errors.email}>
          <input id="q-email" type="email" autoComplete="email" inputMode="email" value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "q-email-err" : undefined} className={input} maxLength={120} />
        </Field>
        <Field id="q-phone" label={t.phone}>
          <input id="q-phone" type="tel" autoComplete="tel" inputMode="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className={input} maxLength={30} />
        </Field>
      </div>
      <Field id="q-message" label={t.message} error={errors.message}>
        <textarea id="q-message" rows={5} value={f.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "q-message-err" : undefined}
          placeholder={t.placeholder} className={`${input} resize-y`} maxLength={3000} />
      </Field>
      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={f.honey} onChange={(e) => set("honey", e.target.value)} className="hidden" aria-hidden="true" />
      <div>
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-bone/85">
          <input id="q-consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "q-consent-err" : undefined} className="mt-0.5 size-5 shrink-0 accent-[var(--color-bone)]" />
          {t.consent}
        </label>
        {errors.consent && <p id="q-consent-err" className="mt-2 text-sm text-[#ff8a7a]">{errors.consent}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="magnetic min-h-12 rounded-full bg-bone px-8 py-4 font-semibold text-void transition-opacity disabled:opacity-60">
          {status === "sending" ? t.sending : t.submit}
        </button>
        <AnimatePresence>
          {note && <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-[#ff8a7a]">{note}</motion.p>}
        </AnimatePresence>
      </div>
    </form>
  );
}
