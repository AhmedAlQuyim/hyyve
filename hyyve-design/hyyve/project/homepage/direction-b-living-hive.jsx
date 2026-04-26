// Direction B — "The Living Hive"
// Animated agent-network hero, interactive cells, more product-forward.
// Dark hero, paper sections below.

const hiveStyles = {
  frame: {
    background: "var(--paper)",
    color: "var(--ink)",
    minHeight: 3400,
    position: "relative",
  },
  hero: {
    background: "var(--midnight)",
    color: "var(--paper)",
    padding: "180px 56px 140px",
    position: "relative",
    overflow: "hidden",
    minHeight: 920,
  },
  pill: {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "8px 16px",
    borderRadius: 999,
    background: "rgba(244,242,236,.06)",
    border: "1px solid rgba(244,242,236,.15)",
    color: "var(--slate-300)",
    marginBottom: 36,
  },
  pillDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--amber)",
    boxShadow: "0 0 0 4px rgba(232,169,92,.18)",
  },
  hl: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 124,
    lineHeight: 0.95,
    letterSpacing: "-.035em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
    maxWidth: 980,
    color: "var(--paper)",
  },
  hlAccent: {
    color: "var(--amber)",
    fontWeight: 300,
    fontStyle: "italic",
  },
  heroSub: {
    marginTop: 36,
    fontSize: 20,
    lineHeight: 1.5,
    color: "var(--slate-300)",
    maxWidth: 560,
  },
  heroCtas: {
    marginTop: 48,
    display: "flex",
    gap: 14,
    alignItems: "center",
  },
  primaryAmber: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "16px 24px",
    borderRadius: 999,
    background: "var(--amber)",
    color: "var(--midnight)",
    fontSize: 15, fontWeight: 600,
    border: "none", cursor: "pointer",
  },
  ghostBtn: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "16px 24px",
    borderRadius: 999,
    background: "transparent",
    color: "var(--paper)",
    border: "1px solid rgba(244,242,236,.25)",
    fontSize: 15, fontWeight: 500,
    cursor: "pointer",
  },
  // Live network panel — right side of hero
  networkPanel: {
    position: "absolute",
    right: -40,
    top: 80,
    bottom: -40,
    width: 720,
    pointerEvents: "none",
  },
  // Stat strip
  statStrip: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: "32px 56px",
    borderTop: "1px solid rgba(244,242,236,.1)",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 32,
    background: "rgba(11,18,32,.6)",
    backdropFilter: "blur(6px)",
  },
  statNum: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 38,
    color: "var(--paper)",
    letterSpacing: "-.02em",
    lineHeight: 1,
  },
  statLabel: { color: "var(--slate-300)", fontSize: 12, marginTop: 6, lineHeight: 1.4 },

  // Sections
  section: { padding: "120px 56px" },
  sectionEyebrow: { color: "var(--slate-500)", marginBottom: 16 },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 64,
    lineHeight: 1.0,
    letterSpacing: "-.02em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
    maxWidth: 800,
  },
  // Service grid — three cards as "cells"
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 64,
  },
  cell: {
    border: "1px solid var(--slate-200)",
    background: "var(--paper-tint)",
    borderRadius: 24,
    padding: 36,
    minHeight: 380,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    position: "relative",
    overflow: "hidden",
  },
  cellHex: {
    width: 56, height: 56,
  },
  cellTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 32,
    lineHeight: 1.05,
    letterSpacing: "-.02em",
    margin: 0,
  },
  cellCopy: { fontSize: 15, lineHeight: 1.55, color: "var(--slate-700)" },
  cellList: {
    listStyle: "none", padding: 0, margin: 0,
    fontSize: 13, color: "var(--slate-500)",
    fontFamily: "var(--font-mono)",
    lineHeight: 1.9,
    letterSpacing: ".02em",
  },
  cellLink: {
    marginTop: "auto",
    display: "inline-flex", alignItems: "center", gap: 8,
    color: "var(--ink)", textDecoration: "none",
    fontWeight: 500, fontSize: 14,
  },
  // Capabilities — split layout
  capabilities: {
    background: "var(--paper-2)",
    padding: "120px 56px",
  },
  capGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    marginTop: 56,
    alignItems: "start",
  },
  capList: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  capRow: {
    display: "grid",
    gridTemplateColumns: "60px 1fr auto",
    alignItems: "center",
    padding: "20px 0",
    borderTop: "1px solid var(--slate-200)",
    gap: 16,
  },
  capRowLast: { borderBottom: "1px solid var(--slate-200)" },
  capNum: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--slate-500)",
    letterSpacing: ".08em",
  },
  capName: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 22,
    letterSpacing: "-.01em",
  },
  capCheck: {
    width: 22, height: 22, borderRadius: "50%",
    background: "var(--amber)",
    color: "var(--midnight)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700,
  },
  // Big quote
  quoteBlock: {
    padding: "140px 56px",
    textAlign: "center",
  },
  quoteText: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 56,
    lineHeight: 1.15,
    letterSpacing: "-.02em",
    margin: "0 auto",
    maxWidth: 1100,
    fontVariationSettings: "'opsz' 144",
  },
  quoteAttr: {
    marginTop: 48,
    color: "var(--slate-500)",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
  },
  // Footer CTA
  footerCta: {
    background: "var(--midnight)",
    color: "var(--paper)",
    padding: "120px 56px 80px",
    position: "relative",
    overflow: "hidden",
  },
  footerHl: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 96,
    lineHeight: 1.0,
    letterSpacing: "-.03em",
    margin: 0,
    color: "var(--paper)",
    maxWidth: 900,
  },
  footerCols: {
    marginTop: 80,
    paddingTop: 32,
    borderTop: "1px solid rgba(244,242,236,.15)",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 32,
    color: "var(--slate-300)",
    fontSize: 13,
    lineHeight: 2,
  },
  footerColTitle: { color: "var(--slate-500)", marginBottom: 14 },
};

// Hex network SVG used in hero
function HiveNetwork() {
  // generates a soft 3-tier hex cluster with one bright "active" cell
  return (
    <svg viewBox="0 0 720 800" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,169,92,.35)"/>
          <stop offset="100%" stopColor="rgba(232,169,92,0)"/>
        </radialGradient>
        <pattern id="hexbg" width="80" height="92.4" patternUnits="userSpaceOnUse">
          <polygon points="40,2 78,24 78,68 40,90 2,68 2,24" fill="none" stroke="rgba(244,242,236,.05)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="720" height="800" fill="url(#hexbg)"/>
      <circle cx="360" cy="400" r="260" fill="url(#glow)"/>

      {/* connecting lines */}
      <g stroke="rgba(232,169,92,.5)" strokeWidth="1" strokeDasharray="3,5">
        <line x1="360" y1="400" x2="240" y2="320">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.8s" repeatCount="indefinite"/>
        </line>
        <line x1="360" y1="400" x2="480" y2="320">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.2s" repeatCount="indefinite"/>
        </line>
        <line x1="360" y1="400" x2="240" y2="480">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="360" y1="400" x2="480" y2="480">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.6s" repeatCount="indefinite"/>
        </line>
        <line x1="360" y1="400" x2="360" y2="280" stroke="rgba(244,242,236,.2)">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.4s" repeatCount="indefinite"/>
        </line>
        <line x1="360" y1="400" x2="360" y2="520" stroke="rgba(244,242,236,.2)">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.9s" repeatCount="indefinite"/>
        </line>
      </g>

      {/* outer cells (faint) */}
      <g stroke="rgba(244,242,236,.18)" fill="none" strokeWidth="1">
        <polygon points="120,180 180,210 180,270 120,300 60,270 60,210"/>
        <polygon points="600,180 660,210 660,270 600,300 540,270 540,210"/>
        <polygon points="120,520 180,550 180,610 120,640 60,610 60,550"/>
        <polygon points="600,520 660,550 660,610 600,640 540,610 540,550"/>
        <polygon points="360,120 420,150 420,210 360,240 300,210 300,150"/>
        <polygon points="360,580 420,610 420,670 360,700 300,670 300,610"/>
      </g>

      {/* mid cells */}
      <g>
        <polygon points="240,300 300,330 300,390 240,420 180,390 180,330"
                 stroke="rgba(244,242,236,.5)" strokeWidth="1.2" fill="none"/>
        <circle cx="240" cy="360" r="3" fill="rgba(244,242,236,.8)"/>
        <text x="240" y="345" textAnchor="middle" fontSize="9" fill="rgba(244,242,236,.4)" fontFamily="JetBrains Mono">CRM</text>

        <polygon points="480,300 540,330 540,390 480,420 420,390 420,330"
                 stroke="rgba(244,242,236,.5)" strokeWidth="1.2" fill="none"/>
        <circle cx="480" cy="360" r="3" fill="rgba(244,242,236,.8)"/>
        <text x="480" y="345" textAnchor="middle" fontSize="9" fill="rgba(244,242,236,.4)" fontFamily="JetBrains Mono">ERP</text>

        <polygon points="240,460 300,490 300,550 240,580 180,550 180,490"
                 stroke="rgba(244,242,236,.5)" strokeWidth="1.2" fill="none"/>
        <circle cx="240" cy="520" r="3" fill="rgba(244,242,236,.8)"/>
        <text x="240" y="505" textAnchor="middle" fontSize="9" fill="rgba(244,242,236,.4)" fontFamily="JetBrains Mono">DOCS</text>

        <polygon points="480,460 540,490 540,550 480,580 420,550 420,490"
                 stroke="rgba(244,242,236,.5)" strokeWidth="1.2" fill="none"/>
        <circle cx="480" cy="520" r="3" fill="rgba(244,242,236,.8)"/>
        <text x="480" y="505" textAnchor="middle" fontSize="9" fill="rgba(244,242,236,.4)" fontFamily="JetBrains Mono">CHAT</text>
      </g>

      {/* center cell — active */}
      <g>
        <polygon points="360,340 420,370 420,430 360,460 300,430 300,370"
                 fill="rgba(232,169,92,.15)" stroke="#E8A95C" strokeWidth="1.8"/>
        <circle cx="360" cy="400" r="8" fill="#E8A95C">
          <animate attributeName="r" values="6;12;6" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;.5;1" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="360" cy="400" r="4" fill="var(--paper)"/>
        <text x="360" y="380" textAnchor="middle" fontSize="10" fill="#E8A95C" fontFamily="JetBrains Mono" letterSpacing="1">HYYVE</text>
      </g>
    </svg>
  );
}

function CellIcon({type}) {
  const stroke = "var(--midnight)";
  if (type === "automation") {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5"/>
        <circle cx="28" cy="28" r="6" fill="var(--amber)"/>
        <path d="M28 14 v8 M28 34 v8 M14 28 h8 M34 28 h8" stroke={stroke} strokeWidth="1.2"/>
      </svg>
    );
  }
  if (type === "agentic") {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5"/>
        <circle cx="28" cy="28" r="3" fill="var(--amber)"/>
        <circle cx="16" cy="20" r="3" fill={stroke}/>
        <circle cx="40" cy="20" r="3" fill={stroke}/>
        <circle cx="16" cy="36" r="3" fill={stroke}/>
        <circle cx="40" cy="36" r="3" fill={stroke}/>
        <line x1="16" y1="20" x2="28" y2="28" stroke={stroke} strokeWidth="1"/>
        <line x1="40" y1="20" x2="28" y2="28" stroke={stroke} strokeWidth="1"/>
        <line x1="16" y1="36" x2="28" y2="28" stroke={stroke} strokeWidth="1"/>
        <line x1="40" y1="36" x2="28" y2="28" stroke={stroke} strokeWidth="1"/>
      </svg>
    );
  }
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5"/>
      <path d="M28 8 a20 20 0 0 1 20 20" stroke="var(--amber)" strokeWidth="2.4" fill="none"/>
      <circle cx="28" cy="28" r="4" fill={stroke}/>
    </svg>
  );
}

function LivingHiveDirection() {
  return (
    <div className="hy-frame" style={hiveStyles.frame}>
      <nav className="hy-nav" style={{color:"var(--paper)"}}>
        <div className="hy-logo">hyyve<span className="dot">.</span></div>
        <div className="hy-nav-links">
          <a>Platform</a>
          <a>Services</a>
          <a>Customers</a>
          <a>Pricing</a>
        </div>
        <button className="hy-cta-pill" style={{background:"var(--amber)",color:"var(--midnight)"}}>
          Start with us <span className="arrow" style={{background:"rgba(15,27,51,.15)",color:"var(--midnight)"}}>→</span>
        </button>
      </nav>

      <section style={hiveStyles.hero}>
        <div className="label-mono" style={hiveStyles.pill}>
          <span style={hiveStyles.pillDot}></span>
          Live network · 47 agents deployed across 12 customers
        </div>
        <h1 style={hiveStyles.hl}>
          One hive.<br/>
          <span style={hiveStyles.hlAccent}>Many minds.</span><br/>
          The work, done.
        </h1>
        <p style={hiveStyles.heroSub}>
          Hyyve designs multi-agent systems that operate inside mid-market businesses — automating the work nobody wants, freeing the people who do it for what only they can.
        </p>
        <div style={hiveStyles.heroCtas}>
          <button style={hiveStyles.primaryAmber}>
            See it work
            <span style={{width:18,height:18,borderRadius:"50%",background:"rgba(15,27,51,.15)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
          </button>
          <button style={hiveStyles.ghostBtn}>
            Book intro call
            <span style={{width:18,height:18,borderRadius:"50%",background:"rgba(244,242,236,.1)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
          </button>
        </div>

        <div style={hiveStyles.networkPanel}>
          <HiveNetwork />
        </div>

        <div style={hiveStyles.statStrip}>
          <div>
            <div style={hiveStyles.statNum}>47</div>
            <div style={hiveStyles.statLabel}>agents in production</div>
          </div>
          <div>
            <div style={hiveStyles.statNum}>2.4m</div>
            <div style={hiveStyles.statLabel}>tasks executed last quarter</div>
          </div>
          <div>
            <div style={hiveStyles.statNum}>$11.6m</div>
            <div style={hiveStyles.statLabel}>customer savings, year-to-date</div>
          </div>
          <div>
            <div style={hiveStyles.statNum}>0<span style={{fontSize:24,color:"var(--amber)"}}>esc</span></div>
            <div style={hiveStyles.statLabel}>customer escalations this week</div>
          </div>
        </div>
      </section>

      {/* Services as cells */}
      <section style={hiveStyles.section}>
        <div className="label-mono" style={hiveStyles.sectionEyebrow}>— 01 / Three cells, one hive</div>
        <h2 style={hiveStyles.sectionTitle}>
          Whatever shape the work takes,<br/>
          we build the cell that fits it.
        </h2>
        <div style={hiveStyles.serviceGrid}>
          <div style={hiveStyles.cell}>
            <CellIcon type="automation"/>
            <h3 style={hiveStyles.cellTitle}>Automation</h3>
            <p style={hiveStyles.cellCopy}>
              The repeatable work — invoicing, reconciliation, lead routing, ticket triage. We replace it with agents that learn the rules, then keep getting better.
            </p>
            <ul style={hiveStyles.cellList}>
              <li>— Process discovery</li>
              <li>— Agent design &amp; build</li>
              <li>— Tool &amp; data integration</li>
              <li>— Stewardship &amp; QA</li>
            </ul>
            <a style={hiveStyles.cellLink}>Explore automation →</a>
          </div>
          <div style={hiveStyles.cell}>
            <CellIcon type="agentic"/>
            <h3 style={hiveStyles.cellTitle}>Agentic systems</h3>
            <p style={hiveStyles.cellCopy}>
              Multi-agent setups that plan, decide, and execute. Bespoke architectures for the complex, judgement-heavy work — research, sales ops, supply&nbsp;chain.
            </p>
            <ul style={hiveStyles.cellList}>
              <li>— Architecture &amp; planning</li>
              <li>— Custom tool servers</li>
              <li>— Multi-agent orchestration</li>
              <li>— Eval &amp; observability</li>
            </ul>
            <a style={hiveStyles.cellLink}>Explore agentic →</a>
          </div>
          <div style={hiveStyles.cell}>
            <CellIcon type="consultation"/>
            <h3 style={hiveStyles.cellTitle}>Consultation</h3>
            <p style={hiveStyles.cellCopy}>
              For leadership wrestling with where AI should sit in the org. Five-week engagements, one tight deliverable: a roadmap your team can&nbsp;ship.
            </p>
            <ul style={hiveStyles.cellList}>
              <li>— Opportunity mapping</li>
              <li>— ROI modeling</li>
              <li>— Vendor / build assessment</li>
              <li>— 12-month roadmap</li>
            </ul>
            <a style={hiveStyles.cellLink}>Explore consulting →</a>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={hiveStyles.capabilities}>
        <div className="label-mono" style={hiveStyles.sectionEyebrow}>— 02 / What's inside</div>
        <h2 style={hiveStyles.sectionTitle}>
          Everything you'd expect.<br/>
          Some things you won't.
        </h2>
        <div style={hiveStyles.capGrid}>
          <div style={hiveStyles.capList}>
            {[
              ["01", "Agent design & prompt engineering"],
              ["02", "Custom tool integrations"],
              ["03", "RAG & knowledge orchestration"],
              ["04", "Multi-agent planning & coordination"],
              ["05", "Voice & telephony agents"],
              ["06", "Eval pipelines & regression tests"],
            ].map(([n,t],i,arr)=>(
              <div key={n} style={i===arr.length-1 ? {...hiveStyles.capRow,...hiveStyles.capRowLast} : hiveStyles.capRow}>
                <div style={hiveStyles.capNum}>{n}</div>
                <div style={hiveStyles.capName}>{t}</div>
                <div style={hiveStyles.capCheck}>✓</div>
              </div>
            ))}
          </div>
          <div style={hiveStyles.capList}>
            {[
              ["07", "Process discovery workshops"],
              ["08", "Change management & training"],
              ["09", "On-call stewardship (90-day default)"],
              ["10", "Audit & data-governance review"],
              ["11", "Cost modeling & spend control"],
              ["12", "Off-boarding plan, day one"],
            ].map(([n,t],i,arr)=>(
              <div key={n} style={i===arr.length-1 ? {...hiveStyles.capRow,...hiveStyles.capRowLast} : hiveStyles.capRow}>
                <div style={hiveStyles.capNum}>{n}</div>
                <div style={hiveStyles.capName}>{t}</div>
                <div style={hiveStyles.capCheck}>✓</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={hiveStyles.quoteBlock}>
        <div className="label-mono" style={{color:"var(--slate-500)",marginBottom:32}}>— What customers say</div>
        <blockquote style={hiveStyles.quoteText}>
          "We thought we were buying agents. We ended up with a&nbsp;team that <em style={{color:"var(--amber-deep)"}}>understands our operations</em> better than most of our&nbsp;own people&nbsp;do."
        </blockquote>
        <div style={hiveStyles.quoteAttr}>
          <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,var(--amber-soft),var(--amber-deep))"}}></div>
          <div style={{textAlign:"left"}}>
            <div style={{fontWeight:500,color:"var(--ink)"}}>Maren Holst</div>
            <div className="label-mono" style={{color:"var(--slate-500)",fontSize:11}}>COO · Lyra Manufacturing</div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={hiveStyles.footerCta}>
        <h2 style={hiveStyles.footerHl}>
          Ready to build<br/>
          <em style={{color:"var(--amber)",fontStyle:"italic",fontWeight:300}}>your hive</em>?
        </h2>
        <div style={{marginTop:48,display:"flex",gap:14}}>
          <button style={hiveStyles.primaryAmber}>
            Book a 30-min intro
            <span style={{width:18,height:18,borderRadius:"50%",background:"rgba(15,27,51,.15)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
          </button>
          <button style={hiveStyles.ghostBtn}>Download capabilities deck</button>
        </div>
        <div style={hiveStyles.footerCols}>
          <div>
            <div className="hy-logo" style={{color:"var(--paper)",fontSize:28,marginBottom:12}}>hyyve<span className="dot">.</span></div>
            <div style={{fontSize:13,maxWidth:260}}>A small studio building AI agents for mid-market operations teams. Remote-first, GMT-aligned.</div>
          </div>
          <div>
            <div className="label-mono" style={hiveStyles.footerColTitle}>Studio</div>
            <div>About</div><div>Field notes</div><div>Careers</div>
          </div>
          <div>
            <div className="label-mono" style={hiveStyles.footerColTitle}>Work</div>
            <div>Automation</div><div>Agentic</div><div>Consulting</div>
          </div>
          <div>
            <div className="label-mono" style={hiveStyles.footerColTitle}>Reach</div>
            <div>hello@hyyve.co</div><div>LinkedIn</div><div>Substack</div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.LivingHiveDirection = LivingHiveDirection;
