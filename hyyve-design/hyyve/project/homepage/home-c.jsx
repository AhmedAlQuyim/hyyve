// Direction C — DEEPENED — "The Conversational"
// New hero: huge headline + 2 CTAs + live agent-network panel.
// "Start a Brief" launches the working AI wizard.

const homeStyles = {
  frame: (dark) => ({
    background: dark ? "var(--midnight)" : "var(--paper-tint)",
    color: dark ? "var(--paper)" : "var(--ink)",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    transition: "background .4s ease, color .4s ease"
  }),
  // Nav
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
  // Hero
  hero: {
    padding: "80px 56px 64px",
    minHeight: 760,
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1.15fr 1fr",
    gap: 48,
    alignItems: "center"
  },
  pretitle: (dark) => ({
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    marginBottom: 32,
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "8px 14px",
    borderRadius: 999,
    background: dark ? "rgba(244,242,236,.06)" : "var(--paper-2)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`
  }),
  liveDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--amber)",
    boxShadow: "0 0 0 4px rgba(232,169,92,.18)"
  },
  hl: (size) => ({
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: size,
    lineHeight: 0.93,
    letterSpacing: "-.04em",
    margin: 0,
    fontVariationSettings: "'opsz' 144"
  }),
  hlAccent: { color: "var(--amber-deep)", fontStyle: "italic" },
  hlAccentDark: { color: "var(--amber)", fontStyle: "italic" },
  heroSub: (dark) => ({
    marginTop: 32, fontSize: 19, lineHeight: 1.55,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    maxWidth: 540
  }),
  heroCtas: { marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" },
  ctaPrimary: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "18px 28px", borderRadius: 999,
    background: "var(--amber)", color: "var(--midnight)",
    fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer",
    boxShadow: "0 12px 32px -10px rgba(232,169,92,.4)"
  },
  ctaSecondary: (dark) => ({
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "18px 28px", borderRadius: 999,
    background: "transparent",
    color: dark ? "var(--paper)" : "var(--ink)",
    border: `1px solid ${dark ? "rgba(244,242,236,.25)" : "var(--slate-300)"}`,
    fontSize: 16, fontWeight: 500, cursor: "pointer"
  }),
  arrow: (light) => ({
    width: 20, height: 20, borderRadius: "50%",
    background: light ? "rgba(15,27,51,.15)" : "rgba(255,255,255,.15)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 12
  }),
  // network panel (right side)
  networkPanel: (dark) => ({
    position: "relative",
    aspectRatio: "1 / 1",
    width: "100%",
    maxWidth: 600,
    justifySelf: "end",
    borderRadius: 28,
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    background: dark ?
    "linear-gradient(135deg, rgba(232,169,92,.06), rgba(15,27,51,.4))" :
    "linear-gradient(135deg, var(--paper) 0%, var(--paper-2) 100%)",
    overflow: "hidden",
    padding: 24
  }),
  netBadge: (dark) => ({
    position: "absolute", top: 20, left: 20, zIndex: 2,
    fontFamily: "var(--font-mono)", fontSize: 10,
    letterSpacing: ".1em", textTransform: "uppercase",
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "6px 12px", borderRadius: 999,
    background: dark ? "rgba(244,242,236,.06)" : "var(--paper-tint)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`
  }),
  ticker: (dark) => ({
    position: "absolute", bottom: 16, left: 16, right: 16,
    background: dark ? "rgba(11,18,32,.6)" : "rgba(244,242,236,.85)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    backdropFilter: "blur(8px)",
    borderRadius: 16,
    padding: "12px 16px",
    fontFamily: "var(--font-mono)", fontSize: 11,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    letterSpacing: ".02em",
    height: 40, overflow: "hidden",
    display: "flex", alignItems: "center", gap: 10
  }),
  // Stats strip
  statStrip: (dark) => ({
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`,
    borderBottom: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`
  }),
  statCell: (dark, last) => ({
    padding: "32px 32px",
    borderRight: last ? "none" : `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`
  }),
  statNum: {
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 44,
    lineHeight: 1, letterSpacing: "-.025em"
  },
  statLabel: (dark) => ({
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    fontSize: 13, marginTop: 8, lineHeight: 1.45
  }),
  // Sections
  sec: { padding: "120px 56px" },
  secEyebrow: (dark) => ({
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    marginBottom: 16
  }),
  secTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400,
    fontSize: 56, lineHeight: 1.05, letterSpacing: "-.02em",
    margin: 0, fontVariationSettings: "'opsz' 144", maxWidth: 800
  },
  // Solutions cells
  solutionsGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20, marginTop: 56
  },
  solCell: (dark) => ({
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper)",
    borderRadius: 24, padding: 32, minHeight: 360,
    display: "flex", flexDirection: "column", gap: 18,
    transition: "all .3s ease"
  }),
  solTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 32,
    lineHeight: 1.05, letterSpacing: "-.02em", margin: 0
  },
  solCopy: (dark) => ({
    fontSize: 15, lineHeight: 1.55,
    color: dark ? "var(--slate-300)" : "var(--slate-700)"
  }),
  solList: (dark) => ({
    listStyle: "none", padding: 0, margin: 0,
    fontSize: 12, fontFamily: "var(--font-mono)",
    color: dark ? "var(--slate-500)" : "var(--slate-500)",
    lineHeight: 1.9, letterSpacing: ".04em"
  }),
  solLink: (dark) => ({
    marginTop: "auto",
    display: "inline-flex", alignItems: "center", gap: 8,
    color: dark ? "var(--paper)" : "var(--ink)",
    textDecoration: "none", fontWeight: 500, fontSize: 14,
    paddingTop: 12,
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`
  }),
  // Process steps
  steps: (dark) => ({
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
    marginTop: 56,
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    borderRadius: 24, overflow: "hidden"
  }),
  step: (dark, last) => ({
    padding: 32,
    borderRight: last ? "none" : `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper)",
    display: "flex", flexDirection: "column", gap: 14, minHeight: 220
  }),
  stepDay: { color: "var(--amber-deep)" },
  stepTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22,
    letterSpacing: "-.01em", margin: 0
  },
  stepCopy: (dark) => ({
    fontSize: 13.5, lineHeight: 1.55,
    color: dark ? "var(--slate-300)" : "var(--slate-700)", margin: 0
  }),
  // Quote
  quoteBlock: (dark) => ({
    padding: "120px 56px",
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper-2)",
    textAlign: "center"
  }),
  quoteText: (dark) => ({
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 48,
    lineHeight: 1.18, letterSpacing: "-.02em",
    margin: "0 auto", maxWidth: 1100,
    color: dark ? "var(--paper)" : "var(--ink)",
    fontVariationSettings: "'opsz' 144"
  }),
  // Final CTA
  ctaBlock: (dark) => ({
    padding: "120px 56px",
    background: dark ? "rgba(232,169,92,.06)" : "var(--midnight)",
    color: "var(--paper)",
    margin: dark ? "0" : "0 56px 80px",
    borderRadius: dark ? 0 : 28,
    position: "relative", overflow: "hidden"
  }),
  ctaTitle: {
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 88,
    lineHeight: 1.0, letterSpacing: "-.03em", margin: 0,
    maxWidth: 820, color: "var(--paper)"
  },
  ctaCopy: { color: "var(--slate-300)", fontSize: 18, marginTop: 24, maxWidth: 560 },
  // Footer
  footer: (dark) => ({
    padding: "64px 56px 40px",
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`,
    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32
  }),
  footerColTitle: (dark) => ({
    color: dark ? "var(--slate-500)" : "var(--slate-500)",
    marginBottom: 14
  }),
  footerCol: (dark) => ({
    fontSize: 13,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    lineHeight: 2
  })
};

// Live network — bigger, animated, with rotating ticker
function LiveNetwork({ dark }) {
  const [tickIdx, setTickIdx] = React.useState(0);
  const ticks = [
  "Reconciling 240 invoices · Lyra Mfg · 2s ago",
  "Drafting 18 sales briefs · Northwind · just now",
  "Triaging 312 support tickets · VERA · 4s ago",
  "QA-ing 47 outbound calls · Halberd&Co · just now",
  "Routing 96 inbound emails · Plinth · 1s ago"];

  React.useEffect(() => {
    const i = setInterval(() => setTickIdx((t) => (t + 1) % ticks.length), 2400);
    return () => clearInterval(i);
  }, []);

  const fg = dark ? "rgba(244,242,236,.7)" : "var(--midnight)";
  const fgFaint = dark ? "rgba(244,242,236,.18)" : "rgba(15,27,51,.18)";
  const fgMid = dark ? "rgba(244,242,236,.4)" : "rgba(15,27,51,.4)";
  const labelFill = dark ? "rgba(244,242,236,.5)" : "rgba(15,27,51,.5)";

  return (
    <div style={homeStyles.networkPanel(dark)}>
      <div style={homeStyles.netBadge(dark)}>
        <span style={homeStyles.liveDot}></span>
        47 agents · live
      </div>

      <svg viewBox="0 0 560 560" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,169,92,.3)" />
            <stop offset="100%" stopColor="rgba(232,169,92,0)" />
          </radialGradient>
          <pattern id="hgrid" width="80" height="92.4" patternUnits="userSpaceOnUse">
            <polygon points="40,2 78,24 78,68 40,90 2,68 2,24" fill="none" stroke={fgFaint} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="560" height="560" fill="url(#hgrid)" />
        <circle cx="280" cy="280" r="220" fill="url(#ng)" />

        {/* connecting lines */}
        <g stroke="rgba(232,169,92,.55)" strokeWidth="1" strokeDasharray="3,5">
          <line x1="280" y1="280" x2="160" y2="200">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="400" y2="200">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.2s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="160" y2="360">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="400" y2="360">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>
        <g stroke={fgMid} strokeWidth="1" strokeDasharray="3,5">
          <line x1="280" y1="280" x2="280" y2="120">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.4s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="280" y2="440">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.9s" repeatCount="indefinite" />
          </line>
        </g>

        {/* outer cells (faint) */}
        <g stroke={fgFaint} fill="none" strokeWidth="1">
          <polygon points="80,80 120,103 120,150 80,173 40,150 40,103" />
          <polygon points="480,80 520,103 520,150 480,173 440,150 440,103" />
          <polygon points="80,387 120,410 120,457 80,480 40,457 40,410" />
          <polygon points="480,387 520,410 520,457 480,457 480,457 480,387" />
          <polygon points="280,40 320,63 320,110 280,133 240,110 240,63" />
          <polygon points="280,427 320,450 320,497 280,520 240,497 240,450" />
        </g>

        {/* mid cells */}
        <g>
          <polygon points="160,160 200,183 200,230 160,253 120,230 120,183"
          stroke={fgMid} strokeWidth="1.4" fill="none" />
          <circle cx="160" cy="207" r="3.5" fill={fg} />
          <text x="160" y="148" textAnchor="middle" fontSize="9" fill={labelFill} fontFamily="JetBrains Mono" letterSpacing="1">CRM</text>

          <polygon points="400,160 440,183 440,230 400,253 360,230 360,183"
          stroke={fgMid} strokeWidth="1.4" fill="none" />
          <circle cx="400" cy="207" r="3.5" fill={fg} />
          <text x="400" y="148" textAnchor="middle" fontSize="9" fill={labelFill} fontFamily="JetBrains Mono" letterSpacing="1">ERP</text>

          <polygon points="160,320 200,343 200,390 160,413 120,390 120,343"
          stroke={fgMid} strokeWidth="1.4" fill="none" />
          <circle cx="160" cy="367" r="3.5" fill={fg} />
          <text x="160" y="426" textAnchor="middle" fontSize="9" fill={labelFill} fontFamily="JetBrains Mono" letterSpacing="1">DOCS</text>

          <polygon points="400,320 440,343 440,390 400,413 360,390 360,343"
          stroke={fgMid} strokeWidth="1.4" fill="none" />
          <circle cx="400" cy="367" r="3.5" fill={fg} />
          <text x="400" y="426" textAnchor="middle" fontSize="9" fill={labelFill} fontFamily="JetBrains Mono" letterSpacing="1">CHAT</text>
        </g>

        {/* center cell — active */}
        <g>
          <polygon points="280,210 340,243 340,317 280,350 220,317 220,243"
          fill="rgba(232,169,92,.18)" stroke="#E8A95C" strokeWidth="2" />
          <circle cx="280" cy="280" r="10" fill="#E8A95C">
            <animate attributeName="r" values="7;14;7" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;.4;1" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="280" r="5" fill={dark ? "var(--paper)" : "var(--paper)"} />
          <text x="280" y="200" textAnchor="middle" fontSize="11" fill="#E8A95C" fontFamily="JetBrains Mono" letterSpacing="1.5">HYYVE</text>
        </g>
      </svg>

      <div style={homeStyles.ticker(dark)}>
        <span style={homeStyles.liveDot}></span>
        <span key={tickIdx} style={{ animation: "hyyve-tickin .5s ease both" }}>
          {ticks[tickIdx]}
        </span>
      </div>
    </div>);

}

function HomeC({ dark, onOpenBrief }) {
  const accent = dark ? homeStyles.hlAccentDark : homeStyles.hlAccent;

  return (
    <div style={homeStyles.frame(dark)}>
      {/* Nav */}
      <nav style={homeStyles.nav(dark)}>
        <div className="hy-logo" style={{ color: dark ? "var(--paper)" : "var(--ink)" }}>
          hyyve<span className="dot">.</span>
        </div>
        <div style={homeStyles.navLinks}>
          <a href="Hyyve Solutions.html" style={{ color: "inherit", textDecoration: "none" }}>Solutions</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Customers</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>About</a>
        </div>
        <button style={homeStyles.navCta(dark)} onClick={onOpenBrief}>
          Start a Brief <span style={homeStyles.arrow(dark)}>→</span>
        </button>
      </nav>

      {/* HERO */}
      <section style={homeStyles.hero}>
        <div>
          <span className="label-mono" style={homeStyles.pretitle(dark)}>
            <span style={homeStyles.liveDot}></span>
            AI consultancy · Made for mid-market ops
          </span>
          <h1 style={homeStyles.hl(120)}>
            Tell us the work<br />
            you wish you<br />
            <span style={accent}>didn't have to do.</span>
          </h1>
          <p style={homeStyles.heroSub(dark)}>
            Hyyve designs and ships the AI agents and automations that mid-market teams use every day. Skip the discovery deck — describe the work, and we'll come back with a real, scoped brief.
          </p>
          <div style={homeStyles.heroCtas}>
            <button style={{ ...homeStyles.ctaPrimary, backgroundColor: "rgb(15, 27, 51)", color: "rgb(244, 242, 236)" }} onClick={onOpenBrief}>
              Start a Brief <span style={homeStyles.arrow(true)}>→</span>
            </button>
            <a href="Hyyve Solutions.html" style={{...homeStyles.ctaSecondary(dark), textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10}}>
              Our Solutions <span style={homeStyles.arrow(false)}>→</span>
            </a>
          </div>
        </div>

        <LiveNetwork dark={dark} />
      </section>

      {/* Solutions */}
      <section style={homeStyles.sec}>
        <div className="label-mono" style={homeStyles.secEyebrow(dark)}>— 01 / Our Solutions</div>
        <h2 style={homeStyles.secTitle}>
          Three cells, one hive.<br />
          Whatever shape the work takes.
        </h2>
        <div style={homeStyles.solutionsGrid}>
          <div style={homeStyles.solCell(dark)}>
            <CellIcon type="automation" dark={dark} />
            <h3 style={homeStyles.solTitle}>Automation</h3>
            <p style={homeStyles.solCopy(dark)}>
              The repeatable work — invoicing, reconciliation, lead routing, ticket triage. We replace it with agents that learn the rules, then keep getting better.
            </p>
            <ul style={homeStyles.solList(dark)}>
              <li>— Process discovery</li>
              <li>— Agent design &amp; build</li>
              <li>— Tool &amp; data integration</li>
              <li>— Stewardship &amp; QA</li>
            </ul>
            <a href="Hyyve Solutions.html#automation" style={homeStyles.solLink(dark)}>Explore automation →</a>
          </div>
          <div style={homeStyles.solCell(dark)}>
            <CellIcon type="agentic" dark={dark} />
            <h3 style={homeStyles.solTitle}>Agentic systems</h3>
            <p style={homeStyles.solCopy(dark)}>
              Multi-agent setups that plan, decide, and execute. Bespoke architectures for the complex, judgement-heavy work — research, sales ops, supply&nbsp;chain.
            </p>
            <ul style={homeStyles.solList(dark)}>
              <li>— Architecture &amp; planning</li>
              <li>— Custom tool servers</li>
              <li>— Multi-agent orchestration</li>
              <li>— Eval &amp; observability</li>
            </ul>
            <a href="Hyyve Solutions.html#agentic" style={homeStyles.solLink(dark)}>Explore agentic →</a>
          </div>
          <div style={homeStyles.solCell(dark)}>
            <CellIcon type="consultation" dark={dark} />
            <h3 style={homeStyles.solTitle}>Consultation</h3>
            <p style={homeStyles.solCopy(dark)}>
              For leadership wrestling with where AI should sit in the org. Five-week engagements, one tight deliverable: a roadmap your team can&nbsp;ship.
            </p>
            <ul style={homeStyles.solList(dark)}>
              <li>— Opportunity mapping</li>
              <li>— ROI modeling</li>
              <li>— Vendor / build assessment</li>
              <li>— 12-month roadmap</li>
            </ul>
            <a href="Hyyve Solutions.html#consultation" style={homeStyles.solLink(dark)}>Explore consulting →</a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={homeStyles.sec}>
        <div className="label-mono" style={homeStyles.secEyebrow(dark)}>— 02 / How it works</div>
        <h2 style={homeStyles.secTitle}>
          Four steps. Two of them<br />are coffee.
        </h2>
        <div style={homeStyles.steps(dark)}>
          {[
          ["Day 0", "The Brief", "You describe the work — here on the page or in a 30-min call. Our concierge agent scopes it in real time."],
          ["Wk 1–2", "Diagnostic", "We sit with your team, map the process, and confirm the agent's job description before any code is written."],
          ["Wk 3–10", "Build", "Two-week loops. Real users, real data, real tools — from the first sprint forward. No demos."],
          ["Wk 11+", "Steward", "We stay on for 90 days, then hand the keys to your team. Or stick around longer — your call."]].
          map(([d, t, c], i, arr) =>
          <div key={d} style={homeStyles.step(dark, i === arr.length - 1)}>
              <div className="label-mono" style={homeStyles.stepDay}>{d}</div>
              <h3 style={homeStyles.stepTitle}>{t}</h3>
              <p style={homeStyles.stepCopy(dark)}>{c}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quote */}
      <section style={homeStyles.quoteBlock(dark)}>
        <div className="label-mono" style={homeStyles.secEyebrow(dark)}>— What customers say</div>
        <blockquote style={homeStyles.quoteText(dark)}>
          "We thought we were buying agents. We ended up with a&nbsp;team that <em style={{ color: "var(--amber-deep)" }}>understands our operations</em> better than most of our&nbsp;own people&nbsp;do."
        </blockquote>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,var(--amber-soft),var(--amber-deep))" }}></div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 500 }}>Maren Holst</div>
            <div className="label-mono" style={{ color: dark ? "var(--slate-300)" : "var(--slate-500)", fontSize: 11 }}>COO · Lyra Manufacturing</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: dark ? 0 : "60px 0" }}>
        <div style={homeStyles.ctaBlock(dark)}>
          <div className="label-mono" style={{ color: "var(--amber)", marginBottom: 24 }}>— The fastest way to know</div>
          <h2 style={homeStyles.ctaTitle}>
            The fastest way to know<br />
            if we can help is to&nbsp;<em style={{ color: "var(--amber)", fontStyle: "italic" }}>ask</em>.
          </h2>
          <p style={homeStyles.ctaCopy}>
            The Brief takes about three minutes. Five questions, real answers, a scoped engagement at the end. No sales call required to start.
          </p>
          <div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={homeStyles.ctaPrimary} onClick={onOpenBrief}>
              Start a Brief <span style={homeStyles.arrow(true)}>→</span>
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
      <footer style={homeStyles.footer(dark)}>
        <div>
          <div className="hy-logo" style={{ color: dark ? "var(--paper)" : "var(--ink)", fontSize: 28, marginBottom: 12 }}>
            hyyve<span className="dot">.</span>
          </div>
          <div style={{ fontSize: 13, maxWidth: 280, color: dark ? "var(--slate-300)" : "var(--slate-700)" }}>
            A small studio building AI agents for mid-market operations teams. Remote-first, GMT-aligned.
          </div>
        </div>
        <div style={homeStyles.footerCol(dark)}>
          <div className="label-mono" style={homeStyles.footerColTitle(dark)}>Studio</div>
          <div>About</div><div>Field notes</div><div>Careers</div>
        </div>
        <div style={homeStyles.footerCol(dark)}>
          <div className="label-mono" style={homeStyles.footerColTitle(dark)}>Solutions</div>
          <div>Automation</div><div>Agentic systems</div><div>Consultation</div>
        </div>
        <div style={homeStyles.footerCol(dark)}>
          <div className="label-mono" style={homeStyles.footerColTitle(dark)}>Reach</div>
          <div>hello@hyyve.co</div><div>LinkedIn · Substack</div>
          <div style={{ marginTop: 14, fontSize: 11, color: dark ? "var(--slate-500)" : "var(--slate-500)" }}>
            © 2026 Hyyve Studio Ltd.
          </div>
        </div>
      </footer>
    </div>);

}

function CellIcon({ type, dark }) {
  const stroke = dark ? "var(--paper)" : "var(--midnight)";
  const fill = dark ? "var(--midnight)" : "var(--paper)";
  if (type === "automation") {
    return (
      <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5" fill={fill} />
        <circle cx="28" cy="28" r="6" fill="var(--amber)" />
        <path d="M28 14 v8 M28 34 v8 M14 28 h8 M34 28 h8" stroke={stroke} strokeWidth="1.2" />
      </svg>);

  }
  if (type === "agentic") {
    return (
      <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5" fill={fill} />
        <circle cx="28" cy="28" r="3" fill="var(--amber)" />
        <circle cx="16" cy="20" r="3" fill={stroke} />
        <circle cx="40" cy="20" r="3" fill={stroke} />
        <circle cx="16" cy="36" r="3" fill={stroke} />
        <circle cx="40" cy="36" r="3" fill={stroke} />
        <line x1="16" y1="20" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="40" y1="20" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="16" y1="36" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="40" y1="36" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
      </svg>);

  }
  return (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
      <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <path d="M28 8 a20 20 0 0 1 20 20" stroke="var(--amber)" strokeWidth="2.4" fill="none" />
      <circle cx="28" cy="28" r="4" fill={stroke} />
    </svg>);

}

window.HomeC = HomeC;