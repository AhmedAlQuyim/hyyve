// Hyyve content store — single source of truth for editable site content.
// The homepage / solutions / about pages read from it.
// The admin page writes to it. Persists in localStorage.

const HYYVE_CONTENT_KEY = "hyyve.content.v1";
const HYYVE_BRIEFS_KEY = "hyyve.briefs.v1";

const HYYVE_DEFAULTS = {
  contact: {
    email: "hello@hyyve.co",
    phone: "+1 (415) 555-0142",
    address: "Remote-first · GMT-aligned",
    linkedin: "linkedin.com/company/hyyve",
    substack: "hyyve.substack.com",
    tagline: "A small studio building AI agents for mid-market operations teams.",
  },
  solutions: [
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
  ],
  customers: [
    {
      id: "lyra",
      name: "Lyra Manufacturing",
      industry: "Industrial · 220 ppl",
      lane: "Automation",
      logo: "L",
      blurb: "Replaced a 4-person AP team's manual reconciliation work with a 3-way-match agent. Cycle time fell from 9 days to 11 hours.",
      quote: "We thought we were buying agents. We ended up with a team that understands our operations better than most of our own people do.",
      attribution: "Maren Holst · COO",
      featured: true,
    },
    {
      id: "northwind",
      name: "Northwind Logistics",
      industry: "3PL · 480 ppl",
      lane: "Agentic",
      logo: "N",
      blurb: "Agentic dispatcher that re-plans routes when a driver calls in late. 18% reduction in missed pickup windows in the first quarter.",
      quote: "It does the boring half of dispatch. Our humans get the interesting half back.",
      attribution: "Aram Patel · VP Operations",
      featured: true,
    },
    {
      id: "vera",
      name: "VERA Health",
      industry: "Insurance · 1,200 ppl",
      lane: "Consultation",
      logo: "V",
      blurb: "Five-week roadmap engagement. Identified 14 candidate processes, prioritised 4, killed 3 vendor pilots that were going nowhere.",
      quote: "We asked for a strategy. They gave us a calendar.",
      attribution: "Dr. Imani Olufemi · CIO",
      featured: false,
    },
    {
      id: "halberd",
      name: "Halberd & Co.",
      industry: "Legal · 95 ppl",
      lane: "Automation",
      logo: "H",
      blurb: "Document intake agent for litigation matters. Cut first-pass review from 4 hours to 11 minutes per file.",
      quote: "I trusted it after the first week. That has not happened before.",
      attribution: "Theo Andersen · Managing Partner",
      featured: false,
    },
  ],
  about: {
    headline: "We build the agents we'd want to work with.",
    intro: "Hyyve is a small studio. We started in 2024, after spending years on the inside — building ML platforms, scaling operations teams, trying to ship AI inside companies that weren't built for it. We saw what worked, and what didn't, and wanted to do it differently.",
    principles: [
      { title: "The work, then the tech.", body: "We don't lead with models or frameworks. We lead with the actual job to be done — and we pick tools that fit, not the other way around." },
      { title: "Two-week loops, no demos.", body: "Real users, real data, real tools from week one. If something can't survive contact with the team, it isn't real." },
      { title: "Small teams, high context.", body: "Three people who know your operations cold will out-ship a team of fifteen who don't. We staff to context, not to invoice." },
      { title: "Honest about what AI can't do.", body: "We've turned down work where the right answer was a spreadsheet. We'd rather lose the project than oversell the technology." },
    ],
    team: [
      { name: "Sasha Reyes", role: "Co-founder · Strategy", bio: "Former head of AI ops at a Series D logistics company. Spent two years finding out what doesn't work." },
      { name: "Devraj Mehta", role: "Co-founder · Engineering", bio: "Ten years in ML platform infra. Believes most AI failures are integration failures wearing a costume." },
      { name: "Linnea Brask", role: "Principal · Design", bio: "Designs the operator-facing surfaces of every agent. Thinks about exception queues more than is healthy." },
      { name: "Wole Adeyemi", role: "Engineering Lead", bio: "Builds the tool servers and the eval suites. The reason our agents don't quietly drift." },
    ],
  },
};

function loadContent() {
  try {
    const raw = localStorage.getItem(HYYVE_CONTENT_KEY);
    if (!raw) return HYYVE_DEFAULTS;
    return { ...HYYVE_DEFAULTS, ...JSON.parse(raw) };
  } catch (e) {
    return HYYVE_DEFAULTS;
  }
}

function saveContent(content) {
  try {
    localStorage.setItem(HYYVE_CONTENT_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event("hyyve:content-updated"));
  } catch (e) { console.warn("Couldn't save content", e); }
}

function resetContent() {
  localStorage.removeItem(HYYVE_CONTENT_KEY);
  window.dispatchEvent(new Event("hyyve:content-updated"));
}

function useContent() {
  const [content, setContent] = React.useState(loadContent);
  React.useEffect(() => {
    const reload = () => setContent(loadContent());
    window.addEventListener("hyyve:content-updated", reload);
    window.addEventListener("storage", reload);
    return () => {
      window.removeEventListener("hyyve:content-updated", reload);
      window.removeEventListener("storage", reload);
    };
  }, []);
  return content;
}

// Briefs ────────────────────────────────────────────────────
function loadBriefs() {
  try {
    return JSON.parse(localStorage.getItem(HYYVE_BRIEFS_KEY) || "[]");
  } catch (e) { return []; }
}

function saveBrief(brief) {
  const all = loadBriefs();
  all.unshift({ ...brief, id: `B-${Date.now().toString(36).toUpperCase()}`, status: "new", createdAt: new Date().toISOString() });
  localStorage.setItem(HYYVE_BRIEFS_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("hyyve:briefs-updated"));
}

function updateBrief(id, patch) {
  const all = loadBriefs();
  const i = all.findIndex(b => b.id === id);
  if (i >= 0) {
    all[i] = { ...all[i], ...patch };
    localStorage.setItem(HYYVE_BRIEFS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("hyyve:briefs-updated"));
  }
}

function deleteBrief(id) {
  const all = loadBriefs().filter(b => b.id !== id);
  localStorage.setItem(HYYVE_BRIEFS_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("hyyve:briefs-updated"));
}

window.HYYVE_DEFAULTS = HYYVE_DEFAULTS;
window.loadContent = loadContent;
window.saveContent = saveContent;
window.resetContent = resetContent;
window.useContent = useContent;
window.loadBriefs = loadBriefs;
window.saveBrief = saveBrief;
window.updateBrief = updateBrief;
window.deleteBrief = deleteBrief;
