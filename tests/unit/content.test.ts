import { describe, it, expect } from "vitest";
import { getContact, getSolutions, getCustomers, getAbout } from "@/lib/content";

describe("content lib", () => {
  it("getContact returns the seeded contact object", async () => {
    const c = await getContact();
    expect(c.email).toBe("hello@hyyve.co");
    expect(c.tagline).toMatch(/small studio/);
  });

  it("getSolutions returns 3 lanes with the expected ids", async () => {
    const s = await getSolutions();
    expect(s.map(x => x.id)).toEqual(["automation", "agentic", "consultation"]);
    expect(s[0].capabilities).toHaveLength(4);
  });

  it("getCustomers returns 4 customers, 2 featured", async () => {
    const c = await getCustomers();
    expect(c).toHaveLength(4);
    expect(c.filter(x => x.featured)).toHaveLength(2);
  });

  it("getAbout returns headline, intro, principles, team", async () => {
    const a = await getAbout();
    expect(a.headline).toMatch(/agents/);
    expect(a.principles).toHaveLength(4);
    expect(a.team).toHaveLength(4);
  });
});
