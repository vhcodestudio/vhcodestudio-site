import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "./projects";

const NEW = ["echo", "habitflow", "outreach", "lumen", "docsmith", "a11y-lens"];

describe("projects", () => {
  it("has unique slugs", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });
  it("every new project has a live vercel.app link and an image that exists", () => {
    for (const slug of NEW) {
      const p = projects.find((x) => x.slug === slug)!;
      expect(p.live, slug).toMatch(/^https:\/\/[a-z0-9-]+-vhcode\.vercel\.app$/);
      expect(existsSync(join(process.cwd(), "public", p.image!)), slug).toBe(true);
    }
  });
  it("links point to the vhcodestudio GitHub account", () => {
    for (const p of projects) expect(p.repo).toMatch(/^https:\/\/github\.com\/vhcodestudio\/[\w.-]+$/);
  });
  it("copy has no em dashes (house style)", () => {
    for (const p of projects) for (const t of [p.line, p.problem, p.built, p.detail]) expect(t, p.slug).not.toMatch(/[—–]/);
  });
});
