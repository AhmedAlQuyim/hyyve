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
