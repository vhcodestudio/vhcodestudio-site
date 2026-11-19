import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { projectCopy } from "./project-copy";
import { dicts, LANGS } from "./i18n";
import { validateQuote } from "../components/quote-form";

describe("translations", () => {
  it("every project has English and Spanish copy without em dashes", () => {
    for (const lang of ["en", "es"] as const) for (const p of projects) {
      const c = projectCopy[lang][p.slug];
      expect(c, `${lang}:${p.slug}`).toBeDefined();
      for (const t of [c.line, c.problem, c.built, c.detail]) expect(t, `${lang}:${p.slug}`).not.toMatch(/[—–]/);
    }
  });
  it("lists line up across languages", () => {
    for (const l of LANGS) {
      expect(dicts[l].form.services).toHaveLength(dicts.pt.form.services.length);
      expect(dicts[l].services.items).toHaveLength(4);
      expect(dicts[l].process.items).toHaveLength(4);
    }
  });
  it("form errors come in the page language", () => {
    expect(validateQuote({ service: "", name: "", email: "", message: "", consent: false }, "en").name).toBe("Write your name.");
    expect(validateQuote({ service: "", name: "", email: "", message: "", consent: false }, "es").name).toBe("Escribe tu nombre.");
  });
});
