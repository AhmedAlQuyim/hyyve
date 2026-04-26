# Phase 1 — Foundation & Public Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next.js project, design system, database, and the three public pages (Homepage / Solutions / About) reading content from Postgres. End-state is a deployable site that visually matches the prototype.

**Architecture:** Next.js 15 App Router + TypeScript + React 19. Tailwind v4 holds the design tokens from `homepage/shared-styles.css`. Drizzle + Postgres stores `site_content` (key/jsonb singletons) seeded from the prototype's `HYYVE_DEFAULTS`. Server Components render pages by reading `lib/content.ts`. Brief Wizard CTA buttons exist as no-op placeholders — Phase 2 wires them up. Admin is unbuilt — Phase 3 adds it.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Drizzle ORM, Postgres (Docker for dev, Railway for prod), Vitest, Playwright, pnpm.

**Scope notes:**
- The prototype renders with React-via-CDN at a fixed 1440px frame. We rebuild it as proper React Server Components with a fluid 1024+ desktop scale and reflows for tablet/mobile.
- All visual values (colors, spacing, font sizes, radii) come from `hyyve-design/hyyve/project/homepage/`. **Implementers must read the source `.jsx` files for each section.** This plan does not duplicate every style value.
- The prototype's `dark` toggle came from the design tweaks panel. We do **not** ship dark mode in Phase 1 — light theme only.
- The "Customers" nav link in the prototype goes nowhere. Leave it as `<a>` without `href` (matches prototype).

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, postcss.config.js
.env.example, .env.local (gitignored)
docker-compose.yml                       # local Postgres
drizzle.config.ts

app/
  layout.tsx                             # root layout: fonts, <html>/<body>, Nav, Footer
  globals.css                            # Tailwind v4 + design tokens
  page.tsx                               # Homepage (Direction C)
  solutions/page.tsx
  about/page.tsx
  not-found.tsx

components/
  layout/
    Nav.tsx                              # sticky top nav, mobile drawer
    Footer.tsx                           # 4-column grid, mobile stack
    Logo.tsx                             # "hyyve." with amber dot
  ui/
    CtaPill.tsx                          # midnight pill button
    CtaPrimary.tsx                       # amber CTA button
    CtaSecondary.tsx                     # outline CTA button
    LabelMono.tsx                        # JetBrains Mono uppercase eyebrow
    LiveDot.tsx                          # amber pulse dot
  home/
    Hero.tsx
    LiveNetwork.tsx                      # animated SVG agent network
    SolutionsGrid.tsx                    # 3-card grid
    CellIcon.tsx                         # automation/agentic/consultation icons
    ProcessSteps.tsx                     # 4-step strip
    QuoteBlock.tsx
    FinalCta.tsx
  solutions/
    SolutionDetail.tsx                   # one block per service lane
  about/
    Principles.tsx
    Team.tsx
  brief/
    StartBriefButton.tsx                 # placeholder — wires up in Phase 2

lib/
  db.ts                                  # drizzle client (singleton)
  schema.ts                              # site_content + briefs tables
  content.ts                             # getContent(), getContact(), getSolutions(), getCustomers(), getAbout()
  fonts.ts                               # next/font/google config

db/
  seed.ts                                # writes HYYVE_DEFAULTS into site_content

tests/
  unit/
    content.test.ts                      # vitest — content lib round-trips
    schema.test.ts                       # vitest — drizzle schema parses
  e2e/
    homepage.spec.ts                     # playwright
    solutions.spec.ts
    about.spec.ts
    nav.spec.ts                          # nav link routing + mobile drawer
playwright.config.ts
vitest.config.ts
```

---

## Task 1: Project scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.js`, `.gitignore` (already exists, append)
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Initialize Next.js with pnpm**

```bash
cd C:/Users/ahmed/Documents/Claude/Projects/hyyve
pnpm dlx create-next-app@latest . --ts --tailwind --app --eslint --src-dir false --import-alias "@/*" --turbopack --no-git
# When prompted "directory not empty, continue?" → yes (existing files: .git, .gitignore, docs/, hyyve-design/)
```

Expected: scaffolding adds `package.json`, `tsconfig.json`, `next.config.ts`, `app/`, `public/`, `node_modules/`, `postcss.config.mjs`, etc. without disturbing `docs/`, `hyyve-design/`, `.git/`.

- [ ] **Step 2: Verify dev server boots**

```bash
pnpm dev
```

Expected: server starts on http://localhost:3000, default Next.js placeholder renders. Stop with Ctrl+C.

- [ ] **Step 3: Append to .gitignore**

Append the following lines to `.gitignore` (some may already exist — keep one copy):

```
.next/
node_modules/
.env
.env.local
.env.*.local
playwright-report/
test-results/
coverage/
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind v4 + TypeScript"
git push
```

---

## Task 2: Design tokens, fonts, and global CSS

The prototype's tokens live in `hyyve-design/hyyve/project/homepage/shared-styles.css`. We port them as CSS custom properties + Tailwind v4 `@theme` directives so utilities like `bg-paper`, `text-ink`, `font-display` work.

**Files:**
- Modify: `app/globals.css`
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0B1220;
  --color-midnight: #0F1B33;
  --color-slate-900: #1B2742;
  --color-slate-700: #354766;
  --color-slate-500: #6B7C9B;
  --color-slate-300: #B6C0D2;
  --color-slate-200: #D6DCE6;
  --color-slate-100: #E9ECF2;
  --color-slate-50: #F4F6FA;
  --color-paper: #F4F2EC;
  --color-paper-2: #ECE8DE;
  --color-paper-tint: #FBF9F4;
  --color-amber: #E8A95C;
  --color-amber-soft: #F4D9A8;
  --color-amber-deep: #C68838;

  --font-display: "Fraunces", "Times New Roman", serif;
  --font-body: "Inter Tight", -apple-system, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", Menlo, monospace;
}

@layer base {
  html { background: var(--color-paper-tint); color: var(--color-ink); }
  body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  .label-mono {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .display {
    font-family: var(--font-display);
    font-weight: 400;
    letter-spacing: -0.02em;
    font-variation-settings: "opsz" 144;
  }
  .display-light { font-weight: 300; }
}

@keyframes hyyve-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: .4; }
  40% { transform: translateY(-4px); opacity: 1; }
}
@keyframes hyyve-tickin {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Create `lib/fonts.ts`**

```ts
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display-loaded",
  display: "swap",
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
});
```

- [ ] **Step 3: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { fraunces, interTight, jetBrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "hyyve. — A calmer way to run AI",
  description: "Hyyve designs and ships AI agents and automations for mid-market operations teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Replace `app/page.tsx` with a token-smoke-test**

```tsx
export default function Home() {
  return (
    <main className="p-14">
      <span className="label-mono text-slate-500">— design tokens smoke test</span>
      <h1 className="display display-light text-ink mt-4" style={{ fontSize: 96, lineHeight: 0.93, letterSpacing: "-0.04em" }}>
        Tell us the work<br />you wish you<br /><em className="text-amber-deep">didn't have to do.</em>
      </h1>
      <p className="mt-8 text-slate-700 max-w-[540px]" style={{ fontSize: 19, lineHeight: 1.55 }}>
        If this paragraph is in Inter Tight on a paper-tint background, the smoke test passes.
      </p>
    </main>
  );
}
```

- [ ] **Step 5: Visually verify**

Run `pnpm dev`, open http://localhost:3000, confirm:
- Background is warm cream (`#FBF9F4`)
- Headline is in Fraunces, "didn't have to do." in italic amber
- Paragraph is in Inter Tight, slate color

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: design tokens, fonts, and global styles"
git push
```

---

## Task 3: Local Postgres + Drizzle setup

**Files:**
- Create: `docker-compose.yml`, `drizzle.config.ts`, `lib/db.ts`, `lib/schema.ts`
- Modify: `package.json` (deps + scripts), `.env.example`, `.env.local`

- [ ] **Step 1: Install dependencies**

```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit @types/pg dotenv tsx
```

- [ ] **Step 2: Create `docker-compose.yml`**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    ports: ["5432:5432"]
    environment:
      POSTGRES_USER: hyyve
      POSTGRES_PASSWORD: hyyve
      POSTGRES_DB: hyyve
    volumes:
      - hyyve_pg:/var/lib/postgresql/data
volumes:
  hyyve_pg:
```

- [ ] **Step 3: Create `.env.example`**

```
DATABASE_URL=postgres://hyyve:hyyve@localhost:5432/hyyve
OPENROUTER_API_KEY=
OPENROUTER_MODEL=anthropic/claude-sonnet-4.6
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
RESEND_API_KEY=
BRIEF_NOTIFICATION_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

Copy to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` — at minimum, the `DATABASE_URL` is already correct for the Docker compose service.

- [ ] **Step 4: Start Postgres**

```bash
docker compose up -d
docker compose ps
```

Expected: `postgres` service listed as `running` on port 5432.

- [ ] **Step 5: Create `lib/db.ts`**

```ts
import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const client = postgres(url, { max: 10 });
export const db = drizzle(client, { schema });
export type DB = typeof db;
```

- [ ] **Step 6: Create `lib/schema.ts`**

```ts
import { pgTable, text, jsonb, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const briefs = pgTable("briefs", {
  id: uuid("id").primaryKey().defaultRandom(),
  payload: jsonb("payload").notNull(),
  briefOutput: jsonb("brief_output"),
  email: text("email"),
  name: text("name"),
  company: text("company"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  emailSent: boolean("email_sent").notNull().default(false),
  emailError: text("email_error"),
});

export type SiteContentRow = typeof siteContent.$inferSelect;
export type BriefRow = typeof briefs.$inferSelect;
```

- [ ] **Step 7: Create `drizzle.config.ts`**

```ts
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
```

- [ ] **Step 8: Add db scripts to `package.json`**

In `"scripts"`, add:

```json
"db:generate": "drizzle-kit generate",
"db:migrate":  "drizzle-kit migrate",
"db:push":     "drizzle-kit push",
"db:seed":     "tsx -r dotenv/config db/seed.ts dotenv_config_path=.env.local",
"db:studio":   "drizzle-kit studio"
```

- [ ] **Step 9: Generate and apply initial migration**

```bash
pnpm db:generate
pnpm db:migrate
```

Expected: a `drizzle/0000_*.sql` file is created and applied; both tables now exist.

- [ ] **Step 10: Verify tables exist**

```bash
docker compose exec postgres psql -U hyyve -d hyyve -c "\dt"
```

Expected output includes `site_content` and `briefs`.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: postgres + drizzle setup with site_content and briefs schemas"
git push
```

---

## Task 4: Content seed script

**Files:**
- Create: `db/seed.ts`

The seed mirrors `HYYVE_DEFAULTS` from `hyyve-design/hyyve/project/homepage/content-store.jsx`. We flatten the nested structure into key/value rows so admin (Phase 3) can edit any field without schema changes.

- [ ] **Step 1: Create `db/seed.ts`**

```ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { siteContent } from "../lib/schema";
import { sql } from "drizzle-orm";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const client = postgres(url, { max: 1 });
const db = drizzle(client);

// Mirrors HYYVE_DEFAULTS in hyyve-design/hyyve/project/homepage/content-store.jsx.
// Each row is one editable field. Group keys are dot-namespaced.
const seedRows: Array<{ key: string; value: unknown }> = [
  { key: "contact.email",    value: "hello@hyyve.co" },
  { key: "contact.phone",    value: "+1 (415) 555-0142" },
  { key: "contact.address",  value: "Remote-first · GMT-aligned" },
  { key: "contact.linkedin", value: "linkedin.com/company/hyyve" },
  { key: "contact.substack", value: "hyyve.substack.com" },
  { key: "contact.tagline",  value: "A small studio building AI agents for mid-market operations teams." },

  { key: "solutions", value: [
    {
      id: "automation",
      title: "Automation",
      tagline: "Repeatable work, replaced by agents that learn the rules.",
      description: "The day-to-day work that's mostly rules and exceptions — invoicing, reconciliation, lead routing, ticket triage. We replace it with agents that learn from your team and improve quietly over time.",
      capabilities: [
        { name: "Process discovery", description: "We sit with the people who do the work. Before any code, we have the agent's job description on one page." },
        { name: "Agent design & build", description: "Custom agents on Claude or your model of choice, with the tools and guardrails to do the actual job." },
        { name: "Tool & data integration", description: "We connect to your CRM, ERP, ticketing, docs, and inboxes — properly, not via brittle scrapers." },
        { name: "Stewardship & QA", description: "Eval suites, exception queues, drift monitoring. The agent gets better; it doesn't quietly get worse." },
      ],
    },
    {
      id: "agentic",
      title: "Agentic systems",
      tagline: "Multi-agent setups for the complex, judgement-heavy work.",
      description: "When the work involves planning, deciding, and coordinating across systems — research, sales ops, supply chain — a single agent isn't enough. We design hives: small teams of specialised agents that hand work to each other.",
      capabilities: [
        { name: "Architecture & planning", description: "We map the work, the agents, the tools, and the handoffs before we build a thing." },
        { name: "Custom tool servers", description: "MCP servers for your internal systems. Your agents work with the same tools your team does." },
        { name: "Multi-agent orchestration", description: "Supervisor patterns, parallel branches, escalation flows — built around how decisions actually get made." },
        { name: "Eval & observability", description: "Trace every decision. Replay any run. Know what each agent actually did, and why." },
      ],
    },
    {
      id: "consultation",
      title: "Consultation",
      tagline: "A roadmap your team can ship — not a deck that sits on a shelf.",
      description: "For leadership wrestling with where AI should sit in the org. Five-week engagements, one tight deliverable: a roadmap you can act on. No vendor pitch at the end.",
      capabilities: [
        { name: "Opportunity mapping", description: "Workshops with the people closest to the work. We surface where AI fits — and where it really doesn't." },
        { name: "ROI modeling", description: "Conservative numbers, named assumptions, sensitivity ranges. The kind of model your CFO will actually trust." },
        { name: "Vendor / build assessment", description: "Off-the-shelf, framework-on-top, or build-from-scratch. We'll tell you which one each opportunity needs." },
        { name: "12-month roadmap", description: "Sequenced, costed, with named owners. Designed to be handed to your team and executed without us." },
      ],
    },
  ] },

  { key: "customers", value: [
    { id: "lyra",      name: "Lyra Manufacturing", industry: "Industrial · 220 ppl", lane: "Automation",   logo: "L", blurb: "Replaced a 4-person AP team's manual reconciliation work with a 3-way-match agent. Cycle time fell from 9 days to 11 hours.", quote: "We thought we were buying agents. We ended up with a team that understands our operations better than most of our own people do.", attribution: "Maren Holst · COO", featured: true },
    { id: "northwind", name: "Northwind Logistics", industry: "3PL · 480 ppl",        lane: "Agentic",      logo: "N", blurb: "Agentic dispatcher that re-plans routes when a driver calls in late. 18% reduction in missed pickup windows in the first quarter.", quote: "It does the boring half of dispatch. Our humans get the interesting half back.", attribution: "Aram Patel · VP Operations", featured: true },
    { id: "vera",      name: "VERA Health",        industry: "Insurance · 1,200 ppl", lane: "Consultation", logo: "V", blurb: "Five-week roadmap engagement. Identified 14 candidate processes, prioritised 4, killed 3 vendor pilots that were going nowhere.", quote: "We asked for a strategy. They gave us a calendar.", attribution: "Dr. Imani Olufemi · CIO", featured: false },
    { id: "halberd",   name: "Halberd & Co.",      industry: "Legal · 95 ppl",        lane: "Automation",   logo: "H", blurb: "Document intake agent for litigation matters. Cut first-pass review from 4 hours to 11 minutes per file.", quote: "I trusted it after the first week. That has not happened before.", attribution: "Theo Andersen · Managing Partner", featured: false },
  ] },

  { key: "about.headline", value: "We build the agents we'd want to work with." },
  { key: "about.intro",    value: "Hyyve is a small studio. We started in 2024, after spending years on the inside — building ML platforms, scaling operations teams, trying to ship AI inside companies that weren't built for it. We saw what worked, and what didn't, and wanted to do it differently." },
  { key: "about.principles", value: [
    { title: "The work, then the tech.",         body: "We don't lead with models or frameworks. We lead with the actual job to be done — and we pick tools that fit, not the other way around." },
    { title: "Two-week loops, no demos.",        body: "Real users, real data, real tools from week one. If something can't survive contact with the team, it isn't real." },
    { title: "Small teams, high context.",       body: "Three people who know your operations cold will out-ship a team of fifteen who don't. We staff to context, not to invoice." },
    { title: "Honest about what AI can't do.",   body: "We've turned down work where the right answer was a spreadsheet. We'd rather lose the project than oversell the technology." },
  ] },
  { key: "about.team", value: [
    { name: "Sasha Reyes",   role: "Co-founder · Strategy",     bio: "Former head of AI ops at a Series D logistics company. Spent two years finding out what doesn't work." },
    { name: "Devraj Mehta",  role: "Co-founder · Engineering",  bio: "Ten years in ML platform infra. Believes most AI failures are integration failures wearing a costume." },
    { name: "Linnea Brask",  role: "Principal · Design",        bio: "Designs the operator-facing surfaces of every agent. Thinks about exception queues more than is healthy." },
    { name: "Wole Adeyemi",  role: "Engineering Lead",          bio: "Builds the tool servers and the eval suites. The reason our agents don't quietly drift." },
  ] },
];

async function main() {
  console.log(`Seeding ${seedRows.length} content rows…`);
  for (const row of seedRows) {
    await db.insert(siteContent)
      .values({ key: row.key, value: row.value as object })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value: sql`excluded.value`, updatedAt: sql`now()` },
      });
  }
  console.log("Done.");
  await client.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 2: Run the seed**

```bash
pnpm db:seed
```

Expected: prints `Seeding 12 content rows…` then `Done.`

- [ ] **Step 3: Verify rows landed**

```bash
docker compose exec postgres psql -U hyyve -d hyyve -c "SELECT key FROM site_content ORDER BY key;"
```

Expected: 12 rows including `contact.email`, `solutions`, `customers`, `about.headline`, etc.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seed script for default site content"
git push
```

---

## Task 5: Content read library + tests

**Files:**
- Create: `lib/content.ts`, `tests/unit/content.test.ts`, `vitest.config.ts`
- Modify: `package.json` (add vitest + test scripts)

- [ ] **Step 1: Install Vitest**

```bash
pnpm add -D vitest @vitest/ui
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    setupFiles: ["dotenv/config"],
  },
});
```

Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json` scripts.

- [ ] **Step 3: Write the failing test (`tests/unit/content.test.ts`)**

```ts
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
```

- [ ] **Step 4: Run test to verify it fails**

```bash
pnpm test
```

Expected: FAIL with "Cannot find module '@/lib/content'".

- [ ] **Step 5: Implement `lib/content.ts`**

```ts
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
```

- [ ] **Step 6: Run test to verify it passes**

```bash
pnpm test
```

Expected: 4 passing tests.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: content read library with cached server functions + tests"
git push
```

---

## Task 6: Layout primitives (Logo, Nav, Footer)

**Files:**
- Create: `components/layout/Logo.tsx`, `components/layout/Nav.tsx`, `components/layout/Footer.tsx`
- Create: `components/ui/CtaPill.tsx`, `components/ui/LiveDot.tsx`, `components/ui/LabelMono.tsx`
- Create: `components/brief/StartBriefButton.tsx`

Visual reference: `home-c.jsx` lines 14–32 (nav), 246–260 (footer). Tailwind utilities + the existing CSS custom properties cover all the styling.

- [ ] **Step 1: Create `components/ui/LiveDot.tsx`**

```tsx
export function LiveDot() {
  return (
    <span
      aria-hidden
      className="inline-block w-2 h-2 rounded-full bg-amber"
      style={{ boxShadow: "0 0 0 4px rgba(232,169,92,.18)" }}
    />
  );
}
```

- [ ] **Step 2: Create `components/ui/LabelMono.tsx`**

```tsx
export function LabelMono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`label-mono ${className}`}>{children}</span>;
}
```

- [ ] **Step 3: Create `components/layout/Logo.tsx`**

```tsx
import Link from "next/link";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="display display-light text-ink no-underline" style={{ fontSize: size, letterSpacing: "-0.04em" }}>
      hyyve<span className="text-amber">.</span>
    </Link>
  );
}
```

- [ ] **Step 4: Create `components/brief/StartBriefButton.tsx` (Phase 2 placeholder)**

```tsx
"use client";

type Props = { className?: string; children: React.ReactNode };

// Phase 2 will replace this onClick with the Brief Wizard modal.
export function StartBriefButton({ className = "", children }: Props) {
  return (
    <button
      type="button"
      onClick={() => alert("Brief Wizard arrives in Phase 2.")}
      className={className}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Create `components/layout/Nav.tsx`**

Sticky top nav with backdrop blur. Mobile: hamburger button reveals a drawer. Read `home-c.jsx:15–32, 388–400` for visual reference.

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { StartBriefButton } from "@/components/brief/StartBriefButton";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "#",          label: "Customers" }, // matches prototype — no destination yet
  { href: "/about",     label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-5 border-b border-slate-200"
      style={{ background: "rgba(251,249,244,.7)", backdropFilter: "blur(12px)" }}
    >
      <Logo />

      <div className="hidden md:flex gap-9 text-sm font-medium">
        {links.map(l => (
          <Link key={l.label} href={l.href} className="text-ink no-underline">{l.label}</Link>
        ))}
      </div>

      <div className="hidden md:block">
        <StartBriefButton className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-midnight text-paper text-sm font-medium">
          Start a Brief
          <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[11px]" style={{ background: "rgba(255,255,255,.15)" }}>→</span>
        </StartBriefButton>
      </div>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden p-2"
        onClick={() => setOpen(v => !v)}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-paper-tint border-b border-slate-200 md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {links.map(l => (
              <Link key={l.label} href={l.href} className="text-ink no-underline text-base" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <StartBriefButton className="mt-2 inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-midnight text-paper text-sm font-medium">
              Start a Brief →
            </StartBriefButton>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 6: Create `components/layout/Footer.tsx`**

Visual reference: `home-c.jsx:246–260, 547–571`.

```tsx
import { getContact } from "@/lib/content";
import { Logo } from "./Logo";
import { LabelMono } from "@/components/ui/LabelMono";

export async function Footer() {
  const contact = await getContact();
  return (
    <footer className="px-6 md:px-14 py-16 border-t border-slate-200 grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]">
      <div>
        <Logo size={28} />
        <p className="mt-3 text-[13px] text-slate-700 max-w-[280px]">{contact.tagline}</p>
      </div>
      <FooterCol title="Studio" items={["About", "Field notes", "Careers"]} />
      <FooterCol title="Solutions" items={["Automation", "Agentic systems", "Consultation"]} />
      <div className="text-[13px] text-slate-700 leading-loose">
        <LabelMono className="text-slate-500 block mb-3">Reach</LabelMono>
        <div>{contact.email}</div>
        <div>LinkedIn · Substack</div>
        <div className="mt-3 text-[11px] text-slate-500">© 2026 Hyyve Studio Ltd.</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="text-[13px] text-slate-700 leading-loose">
      <LabelMono className="text-slate-500 block mb-3">{title}</LabelMono>
      {items.map(i => <div key={i}>{i}</div>)}
    </div>
  );
}
```

- [ ] **Step 7: Mount Nav + Footer in `app/layout.tsx`**

Replace the `<body>` body:

```tsx
<body>
  <Nav />
  {children}
  <Footer />
</body>
```

Add the imports at the top.

- [ ] **Step 8: Verify**

```bash
pnpm dev
```

Open http://localhost:3000. Confirm:
- Sticky cream nav with `hyyve.` logo, three links, dark "Start a Brief" pill
- Footer renders 4 columns with seeded contact data
- Resize to <768px: nav links collapse into hamburger drawer that opens/closes
- Clicking "Start a Brief" alerts "Brief Wizard arrives in Phase 2."

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: layout primitives (Nav, Footer, Logo, CTA placeholders)"
git push
```

---

## Task 7: Homepage — Hero section

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/LiveNetwork.tsx`
- Modify: `app/page.tsx`

Visual reference: `home-c.jsx:33–94` (styles), 263–380 (LiveNetwork SVG), 402–428 (Hero JSX).

- [ ] **Step 1: Create `components/home/LiveNetwork.tsx`**

Port the entire `LiveNetwork` function from `home-c.jsx:263–380` to a Client Component. Replace inline `homeStyles.*` with Tailwind classes + minimal inline styles where the prototype uses computed values. Preserve the SVG paths, animations (`<animate>` elements), and the rotating ticker (`useEffect` setInterval).

```tsx
"use client";

import { useEffect, useState } from "react";
import { LabelMono } from "@/components/ui/LabelMono";
import { LiveDot } from "@/components/ui/LiveDot";

const TICKS = [
  "Reconciling 240 invoices · Lyra Mfg · 2s ago",
  "Drafting 18 sales briefs · Northwind · just now",
  "Triaging 312 support tickets · VERA · 4s ago",
  "QA-ing 47 outbound calls · Halberd&Co · just now",
  "Routing 96 inbound emails · Plinth · 1s ago",
];

export function LiveNetwork() {
  const [tickIdx, setTickIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTickIdx(t => (t + 1) % TICKS.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="relative w-full max-w-[600px] justify-self-end rounded-[28px] border border-slate-200 overflow-hidden p-6"
      style={{ aspectRatio: "1 / 1", background: "linear-gradient(135deg, var(--color-paper) 0%, var(--color-paper-2) 100%)" }}
    >
      <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-tint border border-slate-200">
        <LiveDot />
        <LabelMono className="text-slate-500" >47 agents · live</LabelMono>
      </div>

      {/* SVG identical to home-c.jsx:289–370 — include defs, hex grid, connecting lines with <animate>,
          outer/mid/center cells, labels (CRM/ERP/DOCS/CHAT/HYYVE). */}
      <svg viewBox="0 0 560 560" width="100%" height="100%" className="block">
        {/* PORT THE FULL <svg> CHILDREN VERBATIM FROM home-c.jsx:289-370 */}
      </svg>

      <div
        className="absolute bottom-4 left-4 right-4 backdrop-blur rounded-2xl px-4 h-10 flex items-center gap-2.5 font-mono text-[11px] text-slate-700"
        style={{ background: "rgba(244,242,236,.85)", border: "1px solid var(--color-slate-200)" }}
      >
        <LiveDot />
        <span key={tickIdx} style={{ animation: "hyyve-tickin .5s ease both" }}>{TICKS[tickIdx]}</span>
      </div>
    </div>
  );
}
```

**The implementer must paste the full `<svg>` inner content from `home-c.jsx:289–370` where commented.** Do not reinvent it.

- [ ] **Step 2: Create `components/home/Hero.tsx`**

Visual reference: `home-c.jsx:402–428`.

```tsx
import { LabelMono } from "@/components/ui/LabelMono";
import { LiveDot } from "@/components/ui/LiveDot";
import { StartBriefButton } from "@/components/brief/StartBriefButton";
import { LiveNetwork } from "./LiveNetwork";
import Link from "next/link";

export function Hero() {
  return (
    <section className="px-6 md:px-14 pt-12 md:pt-20 pb-12 md:pb-16 grid gap-10 md:gap-12 lg:grid-cols-[1.15fr_1fr] items-center">
      <div>
        <LabelMono className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-paper-2 border border-slate-200 text-slate-500">
          <LiveDot />
          AI consultancy · Made for mid-market ops
        </LabelMono>

        <h1
          className="display display-light mt-8"
          style={{ fontSize: "clamp(56px, 9vw, 120px)", lineHeight: 0.93, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144" }}
        >
          Tell us the work<br />
          you wish you<br />
          <em className="text-amber-deep not-italic" style={{ fontStyle: "italic" }}>didn't have to do.</em>
        </h1>

        <p className="mt-8 text-slate-700 max-w-[540px]" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Hyyve designs and ships the AI agents and automations that mid-market teams use every day.
          Skip the discovery deck — describe the work, and we'll come back with a real, scoped brief.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <StartBriefButton className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-amber text-midnight text-base font-semibold" >
            Start a Brief →
          </StartBriefButton>
          <Link href="/solutions" className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-transparent text-ink border border-slate-300 text-base font-medium no-underline">
            Our Solutions →
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <LiveNetwork />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire Hero into `app/page.tsx`**

```tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Visually verify**

`pnpm dev` → http://localhost:3000. Confirm:
- Headline reads "Tell us the work / you wish you / *didn't have to do.*" with the italic phrase in amber-deep
- Pretitle pill above headline shows live dot + "AI consultancy · Made for mid-market ops"
- Two CTA buttons (amber pill + outline pill)
- Live Network SVG renders on the right at lg breakpoint with hex grid + animated dashed lines + center pulsing circle + bottom ticker rotating every 2.4s
- At <1024px: Live Network is hidden, headline reflows

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: homepage hero + live agent network"
git push
```

---

## Task 8: Homepage — Solutions grid section

**Files:**
- Create: `components/home/CellIcon.tsx`, `components/home/SolutionsGrid.tsx`
- Modify: `app/page.tsx`

Visual reference: `home-c.jsx:430–481` (JSX), 576–611 (CellIcon SVGs).

- [ ] **Step 1: Create `components/home/CellIcon.tsx`**

Port `CellIcon` from `home-c.jsx:576–611`. Three SVG variants keyed by `type: "automation" | "agentic" | "consultation"`. Stroke = midnight, fill = paper, accent = amber.

```tsx
type IconType = "automation" | "agentic" | "consultation";

export function CellIcon({ type }: { type: IconType }) {
  // PORT THE THREE SVGs VERBATIM FROM home-c.jsx:579-610
  // - automation: hex with center amber circle + crosshair
  // - agentic:    hex with central amber + 4 corner nodes + lines
  // - consultation: hex with amber arc + center node
  if (type === "automation") return <svg width="48" height="48" viewBox="0 0 56 56" fill="none">{/* paste from source */}</svg>;
  if (type === "agentic")    return <svg width="48" height="48" viewBox="0 0 56 56" fill="none">{/* paste from source */}</svg>;
  return <svg width="48" height="48" viewBox="0 0 56 56" fill="none">{/* paste from source */}</svg>;
}
```

- [ ] **Step 2: Create `components/home/SolutionsGrid.tsx`**

```tsx
import Link from "next/link";
import { LabelMono } from "@/components/ui/LabelMono";
import { CellIcon } from "./CellIcon";
import { getSolutions } from "@/lib/content";

const SUMMARIES: Record<string, { copy: string; bullets: string[]; linkLabel: string; linkHash: string }> = {
  automation: {
    copy: "The repeatable work — invoicing, reconciliation, lead routing, ticket triage. We replace it with agents that learn the rules, then keep getting better.",
    bullets: ["— Process discovery", "— Agent design & build", "— Tool & data integration", "— Stewardship & QA"],
    linkLabel: "Explore automation →",
    linkHash: "#automation",
  },
  agentic: {
    copy: "Multi-agent setups that plan, decide, and execute. Bespoke architectures for the complex, judgement-heavy work — research, sales ops, supply chain.",
    bullets: ["— Architecture & planning", "— Custom tool servers", "— Multi-agent orchestration", "— Eval & observability"],
    linkLabel: "Explore agentic →",
    linkHash: "#agentic",
  },
  consultation: {
    copy: "For leadership wrestling with where AI should sit in the org. Five-week engagements, one tight deliverable: a roadmap your team can ship.",
    bullets: ["— Opportunity mapping", "— ROI modeling", "— Vendor / build assessment", "— 12-month roadmap"],
    linkLabel: "Explore consulting →",
    linkHash: "#consultation",
  },
};

export async function SolutionsGrid() {
  const solutions = await getSolutions();
  return (
    <section className="px-6 md:px-14 py-20 md:py-28">
      <LabelMono className="text-slate-500">— 01 / Our Solutions</LabelMono>
      <h2 className="display mt-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 800 }}>
        Three cells, one hive.<br />
        Whatever shape the work takes.
      </h2>
      <div className="mt-14 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map(s => {
          const meta = SUMMARIES[s.id];
          return (
            <div key={s.id} className="border border-slate-200 bg-paper rounded-3xl p-8 min-h-[360px] flex flex-col gap-4 transition-all">
              <CellIcon type={s.id} />
              <h3 className="display m-0" style={{ fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p className="text-slate-700" style={{ fontSize: 15, lineHeight: 1.55 }}>{meta.copy}</p>
              <ul className="font-mono text-slate-500 list-none p-0 m-0" style={{ fontSize: 12, lineHeight: 1.9, letterSpacing: "0.04em" }}>
                {meta.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <Link href={`/solutions${meta.linkHash}`} className="mt-auto pt-3 border-t border-slate-200 text-ink no-underline font-medium text-sm inline-flex items-center gap-2">
                {meta.linkLabel}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/home/Hero";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <SolutionsGrid />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Confirm 3-card grid renders, each with CellIcon, title, copy, bullet list, and link. Grid is 3-up at lg, 2-up at md, 1-up at sm.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: homepage solutions grid"
git push
```

---

## Task 9: Homepage — Process steps + Quote + Final CTA

**Files:**
- Create: `components/home/ProcessSteps.tsx`, `components/home/QuoteBlock.tsx`, `components/home/FinalCta.tsx`
- Modify: `app/page.tsx`

Visual reference: `home-c.jsx:484–544`.

- [ ] **Step 1: Create `components/home/ProcessSteps.tsx`**

```tsx
import { LabelMono } from "@/components/ui/LabelMono";

const STEPS: Array<[string, string, string]> = [
  ["Day 0",   "The Brief",   "You describe the work — here on the page or in a 30-min call. Our concierge agent scopes it in real time."],
  ["Wk 1–2",  "Diagnostic",  "We sit with your team, map the process, and confirm the agent's job description before any code is written."],
  ["Wk 3–10", "Build",       "Two-week loops. Real users, real data, real tools — from the first sprint forward. No demos."],
  ["Wk 11+",  "Steward",     "We stay on for 90 days, then hand the keys to your team. Or stick around longer — your call."],
];

export function ProcessSteps() {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28">
      <LabelMono className="text-slate-500">— 02 / How it works</LabelMono>
      <h2 className="display mt-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 800 }}>
        Four steps. Two of them<br />are coffee.
      </h2>
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-3xl overflow-hidden">
        {STEPS.map(([day, title, copy], i) => (
          <div
            key={day}
            className="p-8 bg-paper flex flex-col gap-3.5 min-h-[220px]"
            style={{ borderRight: i < STEPS.length - 1 ? "1px solid var(--color-slate-200)" : undefined }}
          >
            <LabelMono className="text-amber-deep">{day}</LabelMono>
            <h3 className="display m-0" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{title}</h3>
            <p className="m-0 text-slate-700" style={{ fontSize: 13.5, lineHeight: 1.55 }}>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/home/QuoteBlock.tsx`**

Visual reference: `home-c.jsx:506–518`. Pulls quote/attribution from the featured Lyra customer.

```tsx
import { getCustomers } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export async function QuoteBlock() {
  const customers = await getCustomers();
  const featured = customers.find(c => c.id === "lyra")!;
  const [name, role] = featured.attribution.split(" · ");

  return (
    <section className="px-6 md:px-14 py-20 md:py-28 bg-paper-2 text-center">
      <LabelMono className="text-slate-500">— What customers say</LabelMono>
      <blockquote
        className="display display-light mx-auto mt-4"
        style={{ fontSize: "clamp(28px, 4.5vw, 48px)", lineHeight: 1.18, letterSpacing: "-0.02em", maxWidth: 1100, fontVariationSettings: "'opsz' 144" }}
      >
        “We thought we were buying agents. We ended up with a&nbsp;team that{" "}
        <em className="text-amber-deep">understands our operations</em>{" "}
        better than most of our&nbsp;own people&nbsp;do.”
      </blockquote>
      <div className="mt-10 flex items-center justify-center gap-3.5">
        <div className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, var(--color-amber-soft), var(--color-amber-deep))" }} />
        <div className="text-left">
          <div className="font-medium">{name}</div>
          <LabelMono className="text-slate-500" >{role} · {featured.name}</LabelMono>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/home/FinalCta.tsx`**

Visual reference: `home-c.jsx:520–544`.

```tsx
import { LabelMono } from "@/components/ui/LabelMono";
import { StartBriefButton } from "@/components/brief/StartBriefButton";

export function FinalCta() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-6 md:mx-14 px-6 md:px-14 py-20 md:py-28 bg-midnight text-paper rounded-3xl relative overflow-hidden">
        <LabelMono className="text-amber block mb-6">— The fastest way to know</LabelMono>
        <h2
          className="display display-light m-0 text-paper"
          style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em", maxWidth: 820 }}
        >
          The fastest way to know<br />
          if we can help is to&nbsp;<em className="text-amber" style={{ fontStyle: "italic" }}>ask</em>.
        </h2>
        <p className="text-slate-300 mt-6 max-w-[560px]" style={{ fontSize: 18 }}>
          The Brief takes about three minutes. Five questions, real answers, a scoped engagement at the end. No sales call required to start.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <StartBriefButton className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-amber text-midnight text-base font-semibold">
            Start a Brief →
          </StartBriefButton>
          <button className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-transparent text-paper border border-paper/25 text-base font-medium">
            Book a partner call
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/home/Hero";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { QuoteBlock } from "@/components/home/QuoteBlock";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <SolutionsGrid />
      <ProcessSteps />
      <QuoteBlock />
      <FinalCta />
    </main>
  );
}
```

- [ ] **Step 5: Verify**

`pnpm dev` → confirm all five sections render in order and look right at desktop, tablet, and mobile widths.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: homepage process steps, quote, final CTA"
git push
```

---

## Task 10: Solutions page

**Files:**
- Create: `components/solutions/SolutionDetail.tsx`, `app/solutions/page.tsx`

Visual reference: `hyyve-design/hyyve/project/homepage/solutions.jsx` (read top to bottom). The page has a hero, then three deep blocks (one per service lane) with anchor IDs matching `/solutions#automation`, `/solutions#agentic`, `/solutions#consultation`.

- [ ] **Step 1: Read the source**

```bash
# implementer reads hyyve-design/hyyve/project/homepage/solutions.jsx end-to-end
```

- [ ] **Step 2: Create `components/solutions/SolutionDetail.tsx`**

A server component that takes a `Solution` and renders one detail block: lane title, tagline, description, capabilities list. Style decisions come from the source. Anchor `id={solution.id}` for in-page navigation.

```tsx
import type { Solution } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export function SolutionDetail({ solution, index }: { solution: Solution; index: number }) {
  return (
    <section id={solution.id} className="px-6 md:px-14 py-16 md:py-24 border-t border-slate-200">
      <LabelMono className="text-slate-500">— 0{index + 1} / {solution.title}</LabelMono>
      <h2 className="display mt-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 800 }}>
        {solution.tagline}
      </h2>
      <p className="mt-6 text-slate-700 max-w-[760px]" style={{ fontSize: 18, lineHeight: 1.6 }}>
        {solution.description}
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {solution.capabilities.map(cap => (
          <div key={cap.name} className="border border-slate-200 bg-paper rounded-2xl p-6">
            <h3 className="display m-0" style={{ fontSize: 20, letterSpacing: "-0.01em" }}>{cap.name}</h3>
            <p className="mt-2 text-slate-700" style={{ fontSize: 14, lineHeight: 1.55 }}>{cap.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `app/solutions/page.tsx`**

```tsx
import { getSolutions } from "@/lib/content";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";
import { LabelMono } from "@/components/ui/LabelMono";
import { StartBriefButton } from "@/components/brief/StartBriefButton";

export const metadata = { title: "Solutions — hyyve." };

export default async function SolutionsPage() {
  const solutions = await getSolutions();
  return (
    <main>
      <section className="px-6 md:px-14 pt-16 md:pt-24 pb-12">
        <LabelMono className="text-slate-500">— Solutions</LabelMono>
        <h1
          className="display display-light mt-4"
          style={{ fontSize: "clamp(56px, 9vw, 120px)", lineHeight: 0.93, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144" }}
        >
          Three cells, one hive.
        </h1>
        <p className="mt-6 text-slate-700 max-w-[680px]" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Whatever shape your work takes — repeatable, complex, or strategic — there's a Hyyve service lane built for it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <StartBriefButton className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-amber text-midnight text-base font-semibold">
            Start a Brief →
          </StartBriefButton>
        </div>
      </section>
      {solutions.map((s, i) => <SolutionDetail key={s.id} solution={s} index={i} />)}
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Open http://localhost:3000/solutions. Confirm three detail blocks render with `#automation`, `#agentic`, `#consultation` anchors that scroll-to when linked from the homepage.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: solutions page"
git push
```

---

## Task 11: About page

**Files:**
- Create: `components/about/Principles.tsx`, `components/about/Team.tsx`, `app/about/page.tsx`

Visual reference: `hyyve-design/hyyve/project/homepage/about.jsx` (read top to bottom).

- [ ] **Step 1: Create `components/about/Principles.tsx`**

```tsx
import type { Principle } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export function Principles({ principles }: { principles: Principle[] }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28 border-t border-slate-200">
      <LabelMono className="text-slate-500">— How we work</LabelMono>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {principles.map(p => (
          <div key={p.title}>
            <h3 className="display m-0" style={{ fontSize: 28, letterSpacing: "-0.015em", lineHeight: 1.15 }}>{p.title}</h3>
            <p className="mt-3 text-slate-700" style={{ fontSize: 16, lineHeight: 1.6 }}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/about/Team.tsx`**

```tsx
import type { TeamMember } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export function Team({ team }: { team: TeamMember[] }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28 border-t border-slate-200">
      <LabelMono className="text-slate-500">— The team</LabelMono>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map(m => (
          <div key={m.name} className="border border-slate-200 bg-paper rounded-2xl p-6">
            <div className="w-14 h-14 rounded-full mb-4" style={{ background: "linear-gradient(135deg, var(--color-amber-soft), var(--color-amber-deep))" }} />
            <h3 className="display m-0" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{m.name}</h3>
            <LabelMono className="text-slate-500 block mt-1">{m.role}</LabelMono>
            <p className="mt-3 text-slate-700" style={{ fontSize: 14, lineHeight: 1.55 }}>{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `app/about/page.tsx`**

```tsx
import { getAbout } from "@/lib/content";
import { Principles } from "@/components/about/Principles";
import { Team } from "@/components/about/Team";
import { LabelMono } from "@/components/ui/LabelMono";

export const metadata = { title: "About — hyyve." };

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <main>
      <section className="px-6 md:px-14 pt-16 md:pt-24 pb-12">
        <LabelMono className="text-slate-500">— About</LabelMono>
        <h1
          className="display display-light mt-4"
          style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144" }}
        >
          {about.headline}
        </h1>
        <p className="mt-8 text-slate-700 max-w-[760px]" style={{ fontSize: 19, lineHeight: 1.6 }}>
          {about.intro}
        </p>
      </section>
      <Principles principles={about.principles} />
      <Team team={about.team} />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

http://localhost:3000/about renders headline, intro, 4 principles, 4 team cards. Mobile reflows to 1-column principles + team cards stack.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: about page"
git push
```

---

## Task 12: Playwright E2E happy paths

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/homepage.spec.ts`, `tests/e2e/solutions.spec.ts`, `tests/e2e/about.spec.ts`, `tests/e2e/nav.spec.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Install Playwright**

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile",  use: { ...devices["iPhone 14"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

Add to `package.json` scripts:

```json
"test:e2e": "playwright test"
```

- [ ] **Step 3: Write `tests/e2e/homepage.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("homepage renders all five sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Tell us the work/ })).toBeVisible();
  await expect(page.getByText("AI consultancy · Made for mid-market ops")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Three cells, one hive/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Four steps/ })).toBeVisible();
  await expect(page.getByText(/We thought we were buying agents/)).toBeVisible();
  await expect(page.getByRole("heading", { name: /The fastest way to know/ })).toBeVisible();
});

test("Start a Brief button is present (placeholder behavior in Phase 1)", async ({ page }) => {
  await page.goto("/");
  const buttons = page.getByRole("button", { name: /Start a Brief/i });
  await expect(buttons.first()).toBeVisible();
});
```

- [ ] **Step 4: Write `tests/e2e/solutions.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("solutions page lists all three lanes with anchors", async ({ page }) => {
  await page.goto("/solutions");
  for (const id of ["automation", "agentic", "consultation"]) {
    const section = page.locator(`section#${id}`);
    await expect(section).toBeVisible();
  }
});

test("anchor link from /solutions#automation focuses the right section", async ({ page }) => {
  await page.goto("/solutions#agentic");
  const target = page.locator("section#agentic");
  await expect(target).toBeInViewport();
});
```

- [ ] **Step 5: Write `tests/e2e/about.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("about page renders headline, principles, and team", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /We build the agents/ })).toBeVisible();
  // 4 principles, 4 team cards (any 8 display-style headings inside main, plus the H1)
  const headings = page.locator("main h3");
  await expect(headings).toHaveCount(8);
});
```

- [ ] **Step 6: Write `tests/e2e/nav.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.describe("desktop nav", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("nav links route to the right pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Solutions" }).click();
    await expect(page).toHaveURL(/\/solutions$/);
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
  });
});

test.describe("mobile nav", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("hamburger reveals drawer with links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: "Solutions" })).toBeVisible();
  });
});
```

- [ ] **Step 7: Run E2E**

```bash
pnpm test:e2e
```

Expected: all tests pass on both `desktop` and `mobile` projects.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "test: playwright e2e for homepage, solutions, about, nav"
git push
```

---

## Task 13: Production build verification + Railway prep

**Files:**
- Modify: `package.json`, `next.config.ts`
- Create: `README.md`

- [ ] **Step 1: Verify production build succeeds**

```bash
pnpm build
```

Expected: `next build` completes without TS or lint errors. If it fails, fix the errors before continuing.

- [ ] **Step 2: Verify production server**

```bash
pnpm start
```

Open http://localhost:3000, click through all 3 pages, confirm everything renders. Stop with Ctrl+C.

- [ ] **Step 3: Add Railway-friendly start to `package.json`**

Ensure these scripts exist (Railway runs `start` by default):

```json
"build": "next build",
"start": "next start -p ${PORT:-3000}",
"db:migrate:deploy": "drizzle-kit migrate"
```

- [ ] **Step 4: Create `README.md`**

```markdown
# Hyyve Company Site

Next.js 15 + Postgres marketing site for Hyyve.

## Local dev

\`\`\`bash
cp .env.example .env.local
docker compose up -d         # local Postgres
pnpm install
pnpm db:migrate              # apply schema
pnpm db:seed                 # seed default content
pnpm dev                     # http://localhost:3000
\`\`\`

## Tests

\`\`\`bash
pnpm test                    # vitest unit tests
pnpm test:e2e                # playwright (boots dev server)
\`\`\`

## Deployment (Railway)

1. Provision a Railway Postgres plugin → copy `DATABASE_URL` into the service env.
2. Set env vars from `.env.example` (Phase 1 only needs `DATABASE_URL`).
3. Build command: `pnpm build`. Start command: `pnpm db:migrate:deploy && pnpm db:seed && pnpm start` (seed is idempotent — safe to re-run).

## Phases

- **Phase 1 (this PR):** Foundation + public site (Homepage, Solutions, About).
- **Phase 2:** Brief Wizard (chat UI + OpenRouter + Resend).
- **Phase 3:** Admin CMS (login + content editing).

See `docs/superpowers/specs/2026-04-26-hyyve-company-site-design.md` for the full spec.
\`\`\`
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: production build verified + README + Railway start script"
git push
```

---

## Phase 1 Done — what's left

After this plan completes, the public site is live and content comes from the database. Two remaining phases:

- **Phase 2 — Brief Wizard:** modal chat UI replicating `brief-wizard.jsx`, `POST /api/brief` calling OpenRouter (`openai` SDK pointed at OpenRouter base URL) with the prototype's exact `SYSTEM_PROMPT`, persistence to `briefs` table, Resend notification email, replace `StartBriefButton` placeholder.
- **Phase 3 — Admin CMS:** `/admin/login` with shared password + signed cookie, `/admin` page replicating `admin.jsx` for editing every `site_content` key, `revalidateTag("site-content")` on save so public pages reflect edits.

Each phase gets its own plan written before implementation begins.
