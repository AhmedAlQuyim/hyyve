// Direction A — "The Quiet Editorial"
// Magazine-like, type-forward, scroll-driven storytelling.
// Bold typographic moments, generous whitespace, calm pacing.

const editorialStyles = {
  frame: {
    background: "var(--paper)",
    color: "var(--ink)",
    minHeight: 3600,
    position: "relative",
  },
  hero: {
    padding: "180px 56px 120px",
    position: "relative",
  },
  heroLabel: {
    color: "var(--slate-500)",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  heroDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--amber)",
    boxShadow: "0 0 0 4px rgba(232,169,92,.18)",
  },
  hl: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 156,
    lineHeight: 0.92,
    letterSpacing: "-.04em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
    maxWidth: 1280,
  },
  hlAmber: { color: "var(--amber-deep)", fontStyle: "italic", fontWeight: 300 },
  heroFoot: {
    marginTop: 80,
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 48,
    alignItems: "end",
  },
  lede: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 26,
    lineHeight: 1.35,
    color: "var(--slate-700)",
    maxWidth: 620,
    margin: 0,
    letterSpacing: "-.005em",
  },
  ctaCol: { display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" },
  primaryBtn: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "16px 24px",
    borderRadius: 999,
    background: "var(--midnight)",
    color: "var(--paper)",
    fontSize: 15, fontWeight: 500,
    border: "none", cursor: "pointer",
  },
  secondaryBtn: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "16px 24px",
    borderRadius: 999,
    background: "transparent",
    color: "var(--ink)",
    border: "1px solid var(--slate-300)",
    fontSize: 15, fontWeight: 500,
    cursor: "pointer",
  },
  marquee: {
    borderTop: "1px solid var(--slate-200)",
    borderBottom: "1px solid var(--slate-200)",
    padding: "28px 56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 56,
    marginTop: 60,
  },
  marqueeLabel: {
    color: "var(--slate-500)",
    whiteSpace: "nowrap",
  },
  logos: {
    display: "flex",
    gap: 48,
    flex: 1,
    justifyContent: "space-around",
    fontFamily: "var(--font-display)",
    fontSize: 24,
    color: "var(--slate-500)",
    letterSpacing: "-.01em",
  },
  // Section: Manifesto split
  section: { padding: "140px 56px" },
  sectionHead: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    gap: 48,
    marginBottom: 80,
  },
  sectionNum: {
    color: "var(--slate-500)",
  },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 72,
    lineHeight: 1.0,
    letterSpacing: "-.02em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
  },
  manifestoGrid: {
    display: "grid",
    gridTemplateColumns: "180px 1fr 1fr",
    gap: 48,
  },
  manifestoCol: { fontSize: 17, lineHeight: 1.6, color: "var(--slate-700)" },
  pullquote: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 38,
    lineHeight: 1.2,
    letterSpacing: "-.015em",
    color: "var(--ink)",
    margin: 0,
  },
  // Services — one per row, large
  serviceRow: {
    display: "grid",
    gridTemplateColumns: "120px 80px 1fr 280px",
    gap: 32,
    padding: "44px 0",
    borderTop: "1px solid var(--slate-200)",
    alignItems: "baseline",
  },
  serviceRowLast: { borderBottom: "1px solid var(--slate-200)" },
  serviceNum: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 64,
    lineHeight: 0.9,
    color: "var(--slate-300)",
    letterSpacing: "-.02em",
  },
  serviceName: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 56,
    lineHeight: 1,
    letterSpacing: "-.02em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
  },
  serviceDesc: {
    fontSize: 16,
    lineHeight: 1.55,
    color: "var(--slate-700)",
    margin: 0,
    maxWidth: 560,
  },
  serviceLink: {
    color: "var(--ink)",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 8,
    borderBottom: "1px solid var(--slate-300)",
    paddingBottom: 4,
    width: "fit-content",
  },
  // Case study spread
  caseStudy: {
    background: "var(--midnight)",
    color: "var(--paper)",
    borderRadius: 28,
    padding: "80px 64px",
    margin: "0 56px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    position: "relative",
    overflow: "hidden",
  },
  caseStudyEyebrow: { color: "var(--amber)", marginBottom: 24 },
  caseStudyTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 64,
    lineHeight: 1.0,
    letterSpacing: "-.025em",
    margin: 0,
    color: "var(--paper)",
  },
  caseStudyCopy: { color: "var(--slate-300)", fontSize: 17, lineHeight: 1.6, margin: "32px 0 0" },
  // Stats grid
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 32,
    marginTop: 56,
    paddingTop: 32,
    borderTop: "1px solid rgba(244,242,236,.15)",
  },
  statNum: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 56,
    lineHeight: 1,
    letterSpacing: "-.03em",
    color: "var(--paper)",
  },
  statLabel: { color: "var(--slate-300)", fontSize: 13, marginTop: 6 },
  // Process — vertical timeline-ish
  process: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 40,
    marginTop: 60,
  },
  processCard: {
    paddingTop: 28,
    borderTop: "2px solid var(--ink)",
  },
  processWeek: { color: "var(--slate-500)", marginBottom: 12 },
  processTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 28,
    lineHeight: 1.1,
    letterSpacing: "-.015em",
    margin: "0 0 16px",
  },
  processCopy: { fontSize: 15, lineHeight: 1.55, color: "var(--slate-700)", margin: 0 },
  // Footer CTA
  footerCta: {
    padding: "180px 56px 120px",
    textAlign: "left",
    position: "relative",
  },
  footerHl: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 184,
    lineHeight: 0.9,
    letterSpacing: "-.045em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
  },
  footerSub: {
    marginTop: 48,
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  footer: {
    borderTop: "1px solid var(--slate-200)",
    padding: "40px 56px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 32,
  },
  footerCol: { fontSize: 13, color: "var(--slate-700)", lineHeight: 1.9 },
  footerColTitle: { color: "var(--slate-500)", marginBottom: 14 },
};

function EditorialDirection() {
  return (
    <div className="hy-frame" style={editorialStyles.frame}>
      {/* Nav */}
      <nav className="hy-nav">
        <div className="hy-logo">hyyve<span className="dot">.</span></div>
        <div className="hy-nav-links">
          <a>Work</a>
          <a>Services</a>
          <a>Approach</a>
          <a>Field notes</a>
        </div>
        <button className="hy-cta-pill">Book intro call <span className="arrow">→</span></button>
      </nav>

      {/* Hero */}
      <section style={editorialStyles.hero}>
        <div className="label-mono" style={editorialStyles.heroLabel}>
          <span style={editorialStyles.heroDot}></span>
          AI consultancy · Remote-first · Est. 2024
        </div>
        <h1 style={editorialStyles.hl}>
          A calmer<br/>way to&nbsp;run<br/>
          <span style={editorialStyles.hlAmber}>artificial </span>intelligence.
        </h1>
        <div style={editorialStyles.heroFoot}>
          <p style={editorialStyles.lede}>
            We design, ship, and steward the AI agents and automations that mid-market teams use every day. No platforms to buy. No fluffy decks. Just the work, made&nbsp;quieter.
          </p>
          <div style={editorialStyles.ctaCol}>
            <button style={editorialStyles.primaryBtn}>
              Book a 30-min intro
              <span style={{width:18,height:18,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
            </button>
            <button style={editorialStyles.secondaryBtn}>
              Read the field notes
              <span style={{width:18,height:18,borderRadius:"50%",background:"var(--slate-100)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={editorialStyles.marquee}>
        <div className="label-mono" style={editorialStyles.marqueeLabel}>— Trusted by operators at</div>
        <div style={editorialStyles.logos}>
          <span>Northwind</span>
          <span style={{fontStyle:"italic"}}>Lyra Mfg.</span>
          <span style={{fontWeight:500}}>Halberd&amp;Co</span>
          <span>VERA</span>
          <span style={{letterSpacing:".15em",fontSize:18,fontFamily:"var(--font-mono)"}}>FORM/8</span>
          <span>Plinth</span>
        </div>
      </div>

      {/* Manifesto */}
      <section style={editorialStyles.section}>
        <div style={editorialStyles.sectionHead}>
          <div className="label-mono" style={editorialStyles.sectionNum}>— 01<br/>The premise</div>
          <h2 style={editorialStyles.sectionTitle}>
            Most teams don't need<br/>more AI. They need&nbsp;less<br/>
            <em style={{fontWeight:400}}>noise around it.</em>
          </h2>
        </div>
        <div style={editorialStyles.manifestoGrid}>
          <div></div>
          <p style={editorialStyles.pullquote}>
            "We build agents the way a good agency builds a brand — with research, restraint, and a deep respect for the people doing the actual work."
          </p>
          <div style={editorialStyles.manifestoCol}>
            <p>Hyyve is a small studio of operators, engineers, and designers. We embed with one client at a time. We pick one process, ship the agent that runs it, and only move on once your team trusts the system enough to forget we built&nbsp;it.</p>
            <p>That's the bar. Not "AI-powered." Trusted.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={editorialStyles.section}>
        <div style={editorialStyles.sectionHead}>
          <div className="label-mono" style={editorialStyles.sectionNum}>— 02<br/>What we do</div>
          <h2 style={editorialStyles.sectionTitle}>
            Three ways<br/>to put us to&nbsp;work.
          </h2>
        </div>
        <div>
          <div style={editorialStyles.serviceRow}>
            <div className="label-mono" style={{color:"var(--slate-500)"}}>SVC / 01</div>
            <div style={editorialStyles.serviceNum}>01</div>
            <div>
              <h3 style={editorialStyles.serviceName}>Automation</h3>
              <p style={{...editorialStyles.serviceDesc, marginTop: 16}}>
                Recurring, brittle, manual — the work that nobody wants but everybody does. We replace it with agents that learn your operating logic and keep getting better with every run.
              </p>
            </div>
            <a style={editorialStyles.serviceLink}>See the playbook →</a>
          </div>
          <div style={editorialStyles.serviceRow}>
            <div className="label-mono" style={{color:"var(--slate-500)"}}>SVC / 02</div>
            <div style={editorialStyles.serviceNum}>02</div>
            <div>
              <h3 style={editorialStyles.serviceName}>Agentic systems</h3>
              <p style={{...editorialStyles.serviceDesc, marginTop: 16}}>
                Bespoke multi-agent setups that plan, decide, and execute against your tools — CRMs, ERPs, internal APIs. Built to operate inside your business, not next to it.
              </p>
            </div>
            <a style={editorialStyles.serviceLink}>See the playbook →</a>
          </div>
          <div style={{...editorialStyles.serviceRow, ...editorialStyles.serviceRowLast}}>
            <div className="label-mono" style={{color:"var(--slate-500)"}}>SVC / 03</div>
            <div style={editorialStyles.serviceNum}>03</div>
            <div>
              <h3 style={editorialStyles.serviceName}>Consultation</h3>
              <p style={{...editorialStyles.serviceDesc, marginTop: 16}}>
                Strategy work for leadership: where AI will pay back, where it won't, and what the team should do first. Five-week engagements, one tight deliverable, no fluff.
              </p>
            </div>
            <a style={editorialStyles.serviceLink}>See the playbook →</a>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section style={{padding:"60px 0"}}>
        <div style={editorialStyles.caseStudy}>
          <div>
            <div className="label-mono" style={editorialStyles.caseStudyEyebrow}>— Field note · 04 / 26</div>
            <h3 style={editorialStyles.caseStudyTitle}>
              How a logistics ops team got their <em style={{color:"var(--amber)"}}>weekends back</em>.
            </h3>
            <p style={editorialStyles.caseStudyCopy}>
              Lyra Manufacturing was burning 60+ ops-hours a week reconciling shipment data across four systems. We built a three-agent reconciliation hive that runs nightly. The team didn't even know it was on for the first month.
            </p>
            <div style={editorialStyles.statsRow}>
              <div>
                <div style={editorialStyles.statNum}>62<span style={{fontSize:32,color:"var(--amber)"}}>%</span></div>
                <div style={editorialStyles.statLabel}>Reduction in ops cycle time</div>
              </div>
              <div>
                <div style={editorialStyles.statNum}>$840k</div>
                <div style={editorialStyles.statLabel}>Annualized savings, year one</div>
              </div>
              <div>
                <div style={editorialStyles.statNum}>11<span style={{fontSize:32,color:"var(--slate-500)"}}>wks</span></div>
                <div style={editorialStyles.statLabel}>From kickoff to handoff</div>
              </div>
            </div>
          </div>
          <div style={{
            position:"relative",
            background:"linear-gradient(135deg, rgba(232,169,92,.12) 0%, rgba(232,169,92,.02) 100%)",
            borderRadius: 16,
            padding: 32,
            border: "1px solid rgba(232,169,92,.2)",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            minHeight: 380,
          }}>
            <div className="label-mono" style={{color:"var(--amber)"}}>// agent.network — live</div>
            <svg viewBox="0 0 320 280" width="100%" height="280">
              {/* hex network */}
              <g stroke="rgba(244,242,236,.25)" fill="none" strokeWidth="1">
                <polygon points="160,30 220,60 220,120 160,150 100,120 100,60"/>
                <polygon points="60,90 120,120 120,180 60,210 0,180 0,120"/>
                <polygon points="260,90 320,120 320,180 260,210 200,180 200,120"/>
              </g>
              {/* active cells */}
              <polygon points="160,30 220,60 220,120 160,150 100,120 100,60"
                       stroke="#E8A95C" strokeWidth="1.5" fill="rgba(232,169,92,.12)"/>
              <circle cx="160" cy="90" r="6" fill="#E8A95C">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="60" cy="150" r="3" fill="#F4F2EC"/>
              <circle cx="260" cy="150" r="3" fill="#F4F2EC"/>
              <line x1="160" y1="90" x2="60" y2="150" stroke="#E8A95C" strokeWidth="1" strokeDasharray="3,4"/>
              <line x1="160" y1="90" x2="260" y2="150" stroke="#E8A95C" strokeWidth="1" strokeDasharray="3,4"/>
            </svg>
            <div className="label-mono" style={{color:"var(--slate-300)",fontSize:10}}>
              3 agents · 47 runs today · 0 escalations
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={editorialStyles.section}>
        <div style={editorialStyles.sectionHead}>
          <div className="label-mono" style={editorialStyles.sectionNum}>— 03<br/>The shape of it</div>
          <h2 style={editorialStyles.sectionTitle}>
            Twelve weeks. One process.<br/>One handoff.
          </h2>
        </div>
        <div style={editorialStyles.process}>
          {[
            ["W 01–02", "Listen", "We sit with your team. Watch the work. Ask the dumb questions. No slides yet."],
            ["W 03–05", "Scope", "We pick one process — the painful one — and write the agent's job description."],
            ["W 06–10", "Build", "We ship in two-week loops. Real tools, real data, real users from day one."],
            ["W 11–12", "Hand off", "Documentation, dashboards, and a 90-day stewardship plan. Then we get out of the way."],
          ].map(([w,t,c],i) => (
            <div key={i} style={editorialStyles.processCard}>
              <div className="label-mono" style={editorialStyles.processWeek}>{w}</div>
              <h4 style={editorialStyles.processTitle}>{t}</h4>
              <p style={editorialStyles.processCopy}>{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={editorialStyles.footerCta}>
        <h2 style={editorialStyles.footerHl}>
          Let's<br/>
          <em style={{fontWeight:300, color:"var(--amber-deep)"}}>begin</em>.
        </h2>
        <div style={editorialStyles.footerSub}>
          <button style={editorialStyles.primaryBtn}>
            Book a 30-min intro
            <span style={{width:18,height:18,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
          </button>
          <span className="label-mono" style={{color:"var(--slate-500)"}}>or write — hello@hyyve.co</span>
        </div>
      </section>

      <footer style={editorialStyles.footer}>
        <div>
          <div className="hy-logo" style={{fontSize:24}}>hyyve<span className="dot">.</span></div>
          <p style={{fontSize:12,color:"var(--slate-500)",marginTop:12}}>© 2026 Hyyve Studio Ltd.</p>
        </div>
        <div style={editorialStyles.footerCol}>
          <div className="label-mono" style={editorialStyles.footerColTitle}>Studio</div>
          <div>About</div>
          <div>Field notes</div>
          <div>Careers</div>
        </div>
        <div style={editorialStyles.footerCol}>
          <div className="label-mono" style={editorialStyles.footerColTitle}>Work</div>
          <div>Automation</div>
          <div>Agentic systems</div>
          <div>Consultation</div>
        </div>
        <div style={editorialStyles.footerCol}>
          <div className="label-mono" style={editorialStyles.footerColTitle}>Reach</div>
          <div>hello@hyyve.co</div>
          <div>Remote · GMT-aligned</div>
          <div>LinkedIn · Substack</div>
        </div>
      </footer>
    </div>
  );
}

window.EditorialDirection = EditorialDirection;
