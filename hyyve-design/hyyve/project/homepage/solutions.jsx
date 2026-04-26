// Hyyve Solutions page — three solution lanes + use cases
// Reuses the visual system from home-c.jsx; lifts CellIcon and tone into a sibling page.

const solStyles = {
  frame: (dark) => ({
    background: dark ? "var(--midnight)" : "var(--paper-tint)",
    color: dark ? "var(--paper)" : "var(--ink)",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    transition: "background .4s ease, color .4s ease"
  }),
  nav: (dark) => ({
    position: "sticky", top: 0, zIndex: 50,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "22px 56px",
    background: dark ? "rgba(15,27,51,.7)" : "rgba(251,249,244,.7)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${dark ? "rgba(244,242,236,.08)" : "var(--slate-200)"}`
  }),
  navLinks: { display: "flex", gap: 36, fontSize: 14, fontWeight: 500 },
  navCta: (dark) => ({
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "10px 18px", borderRadius: 999,
    background: dark ? "var(--paper)" : "var(--midnight)",
    color: dark ? "var(--midnight)" : "var(--paper)",
    fontSize: 14, fontWeight: 500,
    border: "none", cursor: "pointer"
  }),
  arrow: (light) => ({
    width: 20, height: 20, borderRadius: "50%",
    background: light ? "rgba(15,27,51,.15)" : "rgba(255,255,255,.15)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 12
  }),

  // Hero (page header)
  hero: { padding: "120px 56px 80px", maxWidth: 1240, margin: "0 auto" },
  pretitle: (dark) => ({
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    marginBottom: 32,
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "8px 14px", borderRadius: 999,
    background: dark ? "rgba(244,242,236,.06)" : "var(--paper-2)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`
  }),
  liveDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--amber)",
    boxShadow: "0 0 0 4px rgba(232,169,92,.18)"
  },
  hl: {
    fontFamily: "var(--font-display)", fontWeight: 300,
    fontSize: 96, lineHeight: 0.96, letterSpacing: "-.04em",
    margin: 0, fontVariationSettings: "'opsz' 144", maxWidth: 1100
  },
  heroSub: (dark) => ({
    marginTop: 32, fontSize: 19, lineHeight: 1.55,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    maxWidth: 660
  }),

  // Lane jump-bar
  jumpBar: (dark) => ({
    margin: "48px 56px 0",
    padding: "8px",
    display: "inline-flex", gap: 4,
    background: dark ? "rgba(244,242,236,.04)" : "var(--paper)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    borderRadius: 999
  }),
  jumpBtn: (dark, active) => ({
    padding: "10px 20px", borderRadius: 999,
    background: active ? (dark ? "var(--paper)" : "var(--midnight)") : "transparent",
    color: active ? (dark ? "var(--midnight)" : "var(--paper)") : "inherit",
    border: "none", cursor: "pointer",
    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
    letterSpacing: "-.005em",
    transition: "all .2s ease"
  }),

  // Lane block
  lane: (dark) => ({
    padding: "120px 56px",
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`,
    scrollMarginTop: 80
  }),
  laneHead: { display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start", maxWidth: 1240, margin: "0 auto" },
  laneNum: (dark) => ({
    fontFamily: "var(--font-mono)", fontSize: 11,
    letterSpacing: ".12em", textTransform: "uppercase",
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    marginBottom: 24,
    display: "flex", alignItems: "center", gap: 8
  }),
  laneTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 64,
    lineHeight: 1.02, letterSpacing: "-.025em", margin: 0,
    fontVariationSettings: "'opsz' 144"
  },
  laneIntro: (dark) => ({
    fontSize: 18, lineHeight: 1.55,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    maxWidth: 540, margin: 0
  }),
  laneIcon: (dark) => ({
    width: 88, height: 88,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 24,
    background: dark ? "rgba(244,242,236,.04)" : "var(--paper)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    marginBottom: 32
  }),

  // Capability list
  capRow: (dark, last) => ({
    display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 32,
    padding: "32px 0",
    borderBottom: last ? "none" : `1px solid ${dark ? "rgba(244,242,236,.08)" : "var(--slate-200)"}`,
    alignItems: "start"
  }),
  capNum: (dark) => ({
    fontFamily: "var(--font-mono)", fontSize: 11,
    letterSpacing: ".12em", color: dark ? "var(--slate-500)" : "var(--slate-500)",
    paddingTop: 4
  }),
  capName: { fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 24, letterSpacing: "-.015em", margin: 0, lineHeight: 1.2 },
  capCopy: (dark) => ({ fontSize: 14, lineHeight: 1.6, color: dark ? "var(--slate-300)" : "var(--slate-700)", margin: "8px 0 0" }),

  // Use cases
  useCaseGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 56, maxWidth: 1240, marginLeft: "auto", marginRight: "auto" },
  useCard: (dark) => ({
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper)",
    borderRadius: 24, padding: 32,
    display: "flex", flexDirection: "column", gap: 16,
    transition: "all .25s ease"
  }),
  useTag: (dark) => ({
    display: "inline-flex", fontFamily: "var(--font-mono)", fontSize: 10,
    letterSpacing: ".12em", textTransform: "uppercase",
    padding: "4px 10px", borderRadius: 999,
    background: dark ? "rgba(232,169,92,.12)" : "var(--amber-soft)",
    color: dark ? "var(--amber)" : "var(--amber-deep)",
    alignSelf: "flex-start"
  }),
  useTitle: { fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 26, lineHeight: 1.15, letterSpacing: "-.015em", margin: 0 },
  useBody: (dark) => ({ fontSize: 14, lineHeight: 1.6, color: dark ? "var(--slate-300)" : "var(--slate-700)", margin: 0 }),
  useStats: (dark) => ({
    marginTop: "auto", paddingTop: 18,
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`,
    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12
  }),
  useStat: { display: "flex", flexDirection: "column", gap: 4 },
  useStatNum: { fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, lineHeight: 1, letterSpacing: "-.02em" },
  useStatLabel: (dark) => ({ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: dark ? "var(--slate-500)" : "var(--slate-500)" }),

  // CTA + Footer (mirror home-c)
  ctaBlock: (dark) => ({
    background: "var(--midnight)", color: "var(--paper)",
    borderRadius: dark ? 0 : 28,
    padding: "120px 56px",
    textAlign: "center",
    margin: dark ? 0 : "0 56px"
  }),
  ctaTitle: { fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 80, lineHeight: 1, letterSpacing: "-.035em", margin: 0, fontVariationSettings: "'opsz' 144" },
  ctaCopy: { fontSize: 18, lineHeight: 1.5, color: "var(--slate-300)", maxWidth: 560, margin: "32px auto 0" },
  ctaPrimary: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "18px 28px", borderRadius: 999,
    background: "var(--amber)", color: "var(--midnight)",
    fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer",
    boxShadow: "0 12px 32px -10px rgba(232,169,92,.4)"
  },
  footer: (dark) => ({
    padding: "60px 56px 40px",
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`,
    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40,
    fontSize: 13, color: dark ? "var(--slate-300)" : "var(--slate-700)"
  }),
  footerCol: (dark) => ({ display: "flex", flexDirection: "column", gap: 8 }),
  footerColTitle: (dark) => ({ color: dark ? "var(--slate-500)" : "var(--slate-500)", marginBottom: 6 })
};

// Data ----

const LANES = [
  {
    id: "automation",
    num: "01",
    title: "Automation",
    icon: "automation",
    intro: "The repeatable work — invoicing, reconciliation, lead routing, ticket triage. We replace it with agents that learn the rules, then keep getting better.",
    capabilities: [
      ["Process discovery", "We sit with the team for two weeks. We watch, we ask, we map every exception. The work is rarely what the org chart says it is."],
      ["Agent design & build", "One agent per process, scoped tightly. Tool access, memory, guardrails, evals — designed to do one job and do it well."],
      ["Tool & data integration", "Native connectors for the systems already in use — NetSuite, Salesforce, Snowflake, Zendesk, Slack, Drive. We don't ask you to switch."],
      ["Stewardship & QA", "Once an agent is live, we keep watching. Weekly review of edge cases, accuracy drift, and new exceptions. Agents get better in production."]
    ],
    useCases: [
      {
        tag: "Logistics · Mid-market manufacturing",
        title: "Three-way invoice match across NetSuite + a 3PL",
        body: "20+ hours a week reconciling shipment, PO, and invoice data across systems that don't talk. Agent reads inbound shipment files, matches to POs, flags variances above tolerance, posts the rest. Operator reviews exceptions only.",
        stats: [["94%", "auto-matched"], ["18hrs", "saved per week"]]
      },
      {
        tag: "Support · B2B SaaS",
        title: "Tier-1 ticket triage and resolution",
        body: "Inbound tickets classified, deduped, and resolved when the answer lives in docs. Escalations are summarized so a human picks up the thread instead of starting it.",
        stats: [["64%", "resolved without escalation"], ["4.2 min", "median first reply"]]
      },
      {
        tag: "Sales ops · Series-B fintech",
        title: "Lead enrichment + routing",
        body: "Inbound lead → enriched in 6 sources → scored against ICP → routed to the right rep with a one-paragraph context brief. Replaces a process that took ops 3hrs each morning.",
        stats: [["3hrs → 4min", "queue clear time"], ["+22%", "lead-to-meeting"]]
      },
      {
        tag: "Finance · 80-person consultancy",
        title: "Expense report classification & policy review",
        body: "Receipts read, line items classified, policy-violations flagged with the specific clause cited. Auto-approves clean reports under threshold. Finance sees only what needs eyes.",
        stats: [["91%", "auto-approved"], ["6 days → same day", "reimbursement SLA"]]
      }
    ]
  },
  {
    id: "agentic",
    num: "02",
    title: "Agentic systems",
    icon: "agentic",
    intro: "Multi-agent setups that plan, decide, and execute. Bespoke architectures for the complex, judgement-heavy work — research, sales ops, supply chain.",
    capabilities: [
      ["Architecture & planning", "We design the system before we build it. Which agent owns what, where state lives, how decisions get audited. Boring up-front work that prevents expensive surprises."],
      ["Custom tool servers", "Most off-the-shelf integrations are too thin. We build MCP-compliant tool servers tuned to the way your team actually uses each system."],
      ["Multi-agent orchestration", "Planner + specialist + reviewer patterns, with explicit handoffs and a human-in-the-loop checkpoint where the work warrants it."],
      ["Eval & observability", "Every decision logged, every output graded against a rubric. You see what the system did and why — not a black box."]
    ],
    useCases: [
      {
        tag: "Investment research · Long-only fund",
        title: "Earnings call analyst",
        body: "Five agents — transcript ingestor, financial extractor, sentiment grader, peer comparator, analyst writer — produce a draft note within 90 minutes of a call ending. Analysts edit, don't write from scratch.",
        stats: [["6hrs → 45min", "draft turnaround"], ["3×", "coverage per analyst"]]
      },
      {
        tag: "Supply chain · Specialty retailer",
        title: "Demand-signal monitor",
        body: "Continuous-loop system reads POS, weather, social, competitor pricing. Flags emerging signals (a SKU spiking in a region) before the planner's weekly review would have caught it. Recommends a reallocation; planner approves.",
        stats: [["8 days", "earlier signal detection"], ["$2.1m", "Q1 inventory recapture"]]
      },
      {
        tag: "Outbound sales · 200-person SaaS",
        title: "Account-research and outreach drafting",
        body: "Researcher agent builds a 1-pager on each target account (10-Q themes, hiring signals, recent press, named contacts). Writer agent drafts a cold email tied to one specific signal. SDR sends or rewrites.",
        stats: [["12 → 60", "researched accounts per day per SDR"], ["+38%", "reply rate"]]
      },
      {
        tag: "Compliance · Regional bank",
        title: "KYC/AML adverse-media review",
        body: "Daily sweep against a list of monitored entities. Reader agent ingests articles, classifier scores for relevance, summarizer drafts a finding, reviewer agent challenges the draft. Compliance officer signs off in minutes, not hours.",
        stats: [["94%", "true-positive rate"], ["73%", "officer time reclaimed"]]
      }
    ]
  },
  {
    id: "consultation",
    num: "03",
    title: "Consultation",
    icon: "consultation",
    intro: "For leadership wrestling with where AI should sit in the org. Five-week engagements, one tight deliverable: a roadmap your team can ship.",
    capabilities: [
      ["Opportunity mapping", "Two weeks shadowing the work. We come back with the 6–10 places AI is genuinely useful and the 30 places it isn't. Specific, costed, ranked."],
      ["ROI modeling", "Not vendor-supplied numbers. We model the actual hours, the actual error rate, the actual cost — and we tell you when something doesn't pencil."],
      ["Vendor / build assessment", "For each opportunity: buy, build, or wait? We have no commercial relationships. The recommendation is what we'd do if it were our money."],
      ["12-month roadmap", "Sequenced, with explicit dependencies, owners, success metrics, and review gates. Designed to be picked up by your team — not us."]
    ],
    useCases: [
      {
        tag: "PE-backed services co.",
        title: "Where to deploy AI without breaking margins",
        body: "Five-week engagement post-acquisition. Mapped every workflow, identified eight automation candidates with hard ROI, killed three pilot ideas the prior team had been pushing for nine months.",
        stats: [["8 → 3", "shortlisted initiatives"], ["$1.4m", "modeled annual savings"]]
      },
      {
        tag: "Series-C marketplace",
        title: "Build vs. buy on customer support AI",
        body: "Eight-week sprint comparing four vendors against an in-house build. Recommended buy, with a custom routing layer. Avoided a 14-month build the eng team had already started scoping.",
        stats: [["14mo", "build avoided"], ["6wks", "to live in production"]]
      },
      {
        tag: "Insurer · 1,200 employees",
        title: "AI policy + governance framework",
        body: "Regulatory-grade governance for ML and LLM use. Risk taxonomy, model registry, eval cadence, escalation paths. Designed with general counsel; passed external audit on first review.",
        stats: [["First", "audit pass — clean"], ["3", "model-risk tiers defined"]]
      },
      {
        tag: "Healthcare network",
        title: "12-month AI roadmap for clinical ops",
        body: "Not the EMR. The thousand small operational tasks around it — referrals, prior auth, intake forms, scheduling. Sequenced 18 initiatives by ROI and clinical risk; staffed phase one in-house.",
        stats: [["18", "initiatives ranked"], ["3", "phases, with owners"]]
      }
    ]
  }
];

// Components ----

function Solutions({ dark, onOpenBrief }) {
  const [activeLane, setActiveLane] = React.useState(null);

  // On mount, scroll to hash if any
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && LANES.find(l => l.id === hash)) {
      setActiveLane(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const jumpTo = (id) => {
    setActiveLane(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={solStyles.frame(dark)}>
      {/* Nav */}
      <nav style={solStyles.nav(dark)}>
        <a href="Hyyve Homepage.html" className="hy-logo" style={{ color: dark ? "var(--paper)" : "var(--ink)", textDecoration: "none" }}>
          hyyve<span className="dot">.</span>
        </a>
        <div style={solStyles.navLinks}>
          <a href="Hyyve Solutions.html" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>Solutions</a>
          <a style={{ color: "inherit", textDecoration: "none", opacity: .6 }}>Customers</a>
          <a style={{ color: "inherit", textDecoration: "none", opacity: .6 }}>About</a>
        </div>
        <button style={solStyles.navCta(dark)} onClick={onOpenBrief}>
          Start a Brief <span style={solStyles.arrow(dark)}>→</span>
        </button>
      </nav>

      {/* Hero */}
      <section style={solStyles.hero}>
        <span className="label-mono" style={solStyles.pretitle(dark)}>
          <span style={solStyles.liveDot}></span>
          Solutions · Three lanes
        </span>
        <h1 style={solStyles.hl}>
          Three shapes the<br />
          work tends to take.
        </h1>
        <p style={solStyles.heroSub(dark)}>
          Most engagements fall into one of three lanes. The lane shapes the team, the timeline, and the deliverable. Pick a starting point — or skip ahead and tell us what you're working on.
        </p>
      </section>

      {/* Jump bar */}
      <div style={{ padding: "0 56px" }}>
        <div style={solStyles.jumpBar(dark)}>
          {LANES.map(l => (
            <button key={l.id} style={solStyles.jumpBtn(dark, activeLane === l.id)} onClick={() => jumpTo(l.id)}>
              {l.num} · {l.title}
            </button>
          ))}
        </div>
      </div>

      {/* Lanes */}
      {LANES.map(lane => (
        <section key={lane.id} id={lane.id} style={solStyles.lane(dark)}>
          <div style={solStyles.laneHead}>
            <div>
              <div style={solStyles.laneIcon(dark)}>
                <CellIcon type={lane.icon} dark={dark} />
              </div>
              <div style={solStyles.laneNum(dark)}>— {lane.num} / Solution lane</div>
              <h2 style={solStyles.laneTitle}>{lane.title}</h2>
            </div>
            <div>
              <p style={solStyles.laneIntro(dark)}>{lane.intro}</p>
              <div style={{ marginTop: 32 }}>
                {lane.capabilities.map(([name, copy], i, arr) => (
                  <div key={name} style={solStyles.capRow(dark, i === arr.length - 1)}>
                    <div style={solStyles.capNum(dark)}>{String(i + 1).padStart(2, "0")}</div>
                    <h3 style={solStyles.capName}>{name}</h3>
                    <p style={solStyles.capCopy(dark)}>{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1240, margin: "80px auto 0", padding: "0 0" }}>
            <div className="label-mono" style={{ color: dark ? "var(--slate-300)" : "var(--slate-500)", marginBottom: 16 }}>
              — Use cases · {lane.title}
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 40,
              lineHeight: 1.05, letterSpacing: "-.02em", margin: 0,
              maxWidth: 700, fontVariationSettings: "'opsz' 144"
            }}>
              Where this lane shows up<br />in the wild.
            </h3>
            <div style={solStyles.useCaseGrid}>
              {lane.useCases.map((uc, i) => (
                <div key={i} style={solStyles.useCard(dark)}>
                  <div style={solStyles.useTag(dark)}>{uc.tag}</div>
                  <h4 style={solStyles.useTitle}>{uc.title}</h4>
                  <p style={solStyles.useBody(dark)}>{uc.body}</p>
                  <div style={solStyles.useStats(dark)}>
                    {uc.stats.map(([n, l], j) => (
                      <div key={j} style={solStyles.useStat}>
                        <div style={solStyles.useStatNum}>{n}</div>
                        <div style={solStyles.useStatLabel(dark)}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: dark ? 0 : "80px 0" }}>
        <div style={solStyles.ctaBlock(dark)}>
          <div className="label-mono" style={{ color: "var(--amber)", marginBottom: 24 }}>— Not sure which lane fits?</div>
          <h2 style={solStyles.ctaTitle}>
            Describe the work.<br />
            <em style={{ color: "var(--amber)", fontStyle: "italic" }}>We'll pick the lane.</em>
          </h2>
          <p style={solStyles.ctaCopy}>
            Five questions, three minutes. The Brief returns with the lane that fits, a scoped engagement, and a partner who can confirm by Thursday.
          </p>
          <div style={{ marginTop: 48, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={solStyles.ctaPrimary} onClick={onOpenBrief}>
              Start a Brief <span style={{ ...solStyles.arrow(true), background: "rgba(15,27,51,.15)" }}>→</span>
            </button>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "18px 28px", borderRadius: 999,
              background: "transparent", color: "var(--paper)",
              border: "1px solid rgba(244,242,236,.25)",
              fontSize: 16, fontWeight: 500, cursor: "pointer"
            }}>Book a partner call</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={solStyles.footer(dark)}>
        <div>
          <a href="Hyyve Homepage.html" className="hy-logo" style={{ color: dark ? "var(--paper)" : "var(--ink)", fontSize: 28, marginBottom: 12, display: "block", textDecoration: "none" }}>
            hyyve<span className="dot">.</span>
          </a>
          <div style={{ fontSize: 13, maxWidth: 280, color: dark ? "var(--slate-300)" : "var(--slate-700)" }}>
            A small studio building AI agents for mid-market operations teams. Remote-first, GMT-aligned.
          </div>
        </div>
        <div style={solStyles.footerCol(dark)}>
          <div className="label-mono" style={solStyles.footerColTitle(dark)}>Studio</div>
          <div>About</div><div>Field notes</div><div>Careers</div>
        </div>
        <div style={solStyles.footerCol(dark)}>
          <div className="label-mono" style={solStyles.footerColTitle(dark)}>Solutions</div>
          <a href="#automation" style={{ color: "inherit", textDecoration: "none" }}>Automation</a>
          <a href="#agentic" style={{ color: "inherit", textDecoration: "none" }}>Agentic systems</a>
          <a href="#consultation" style={{ color: "inherit", textDecoration: "none" }}>Consultation</a>
        </div>
        <div style={solStyles.footerCol(dark)}>
          <div className="label-mono" style={solStyles.footerColTitle(dark)}>Reach</div>
          <div>hello@hyyve.co</div><div>LinkedIn · Substack</div>
          <div style={{ marginTop: 14, fontSize: 11, color: dark ? "var(--slate-500)" : "var(--slate-500)" }}>
            © 2026 Hyyve Studio Ltd.
          </div>
        </div>
      </footer>
    </div>
  );
}

window.Solutions = Solutions;
