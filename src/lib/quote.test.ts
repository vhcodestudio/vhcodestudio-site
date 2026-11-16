import { describe, expect, it } from "vitest";
import { validateQuote } from "../components/quote-form";

const ok = { service: "Site ou landing page", name: "Ana Souza", email: "ana@exemplo.com", message: "Quero um site para minha confeitaria com cardápio.", consent: true };

describe("validateQuote", () => {
  it("accepts a complete request", () => {
    expect(validateQuote(ok)).toEqual({});
  });
  it("flags each missing field on its own", () => {
    const e = validateQuote({ service: "", name: "A", email: "ana@", message: "curto", consent: false });
    expect(Object.keys(e).sort()).toEqual(["consent", "email", "message", "name", "service"]);
  });
  it("rejects e-mails without a domain ending", () => {
    expect(validateQuote({ ...ok, email: "ana@exemplo" }).email).toBeDefined();
  });
});
