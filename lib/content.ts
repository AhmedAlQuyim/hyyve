import "server-only";
import { db } from "./db";
import { siteContent } from "./schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

async function readKey<T>(key: string): Promise<T> {
  const rows = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
  if (rows.length === 0) throw new Error(`site_content key "${key}" not found — run pnpm db:seed`);
  return rows[0].value as T;
}

export type Contact = {
  email: string; phone: string; address: string;
  linkedin: string; substack: string; tagline: string;
};
export type Capability = { name: string; description: string };
export type Solution = {
  id: "automation" | "agentic" | "consultation";
  title: string; tagline: string; description: string;
  capabilities: Capability[];
};
export type Customer = {
  id: string; name: string; industry: string; lane: string;
  logo: string; blurb: string; quote: string; attribution: string; featured: boolean;
};
export type Principle = { title: string; body: string };
export type TeamMember = { name: string; role: string; bio: string };
export type About = { headline: string; intro: string; principles: Principle[]; team: TeamMember[] };

export const getContact = unstable_cache(
  async (): Promise<Contact> => {
    const [email, phone, address, linkedin, substack, tagline] = await Promise.all([
      readKey<string>("contact.email"),
      readKey<string>("contact.phone"),
      readKey<string>("contact.address"),
      readKey<string>("contact.linkedin"),
      readKey<string>("contact.substack"),
      readKey<string>("contact.tagline"),
    ]);
    return { email, phone, address, linkedin, substack, tagline };
  },
  ["content:contact"], { tags: ["site-content"] }
);

export const getSolutions = unstable_cache(
  () => readKey<Solution[]>("solutions"),
  ["content:solutions"], { tags: ["site-content"] }
);

export const getCustomers = unstable_cache(
  () => readKey<Customer[]>("customers"),
  ["content:customers"], { tags: ["site-content"] }
);

export const getAbout = unstable_cache(
  async (): Promise<About> => {
    const [headline, intro, principles, team] = await Promise.all([
      readKey<string>("about.headline"),
      readKey<string>("about.intro"),
      readKey<Principle[]>("about.principles"),
      readKey<TeamMember[]>("about.team"),
    ]);
    return { headline, intro, principles, team };
  },
  ["content:about"], { tags: ["site-content"] }
);
