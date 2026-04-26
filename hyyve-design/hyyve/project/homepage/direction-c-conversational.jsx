// Direction C — "The Conversational"
// Bold, unconventional. The page itself behaves like a hyyve agent.
// Hero is a chat-like interface; user types their problem; an agent responds with relevant services.

const convoStyles = {
  frame: {
    background: "var(--paper-tint)",
    color: "var(--ink)",
    minHeight: 3200,
    position: "relative",
  },
  hero: {
    padding: "140px 56px 80px",
    minHeight: 880,
    position: "relative",
  },
  heroInner: {
    maxWidth: 1180,
    margin: "0 auto",
  },
  pretitle: {
    color: "var(--slate-500)",
    marginBottom: 28,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  hl: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 96,
    lineHeight: 1.0,
    letterSpacing: "-.035em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
  },
  hlAccent: { color: "var(--amber-deep)", fontStyle: "italic" },
  heroSub: {
    marginTop: 28,
    fontSize: 19,
    lineHeight: 1.55,
    color: "var(--slate-700)",
    maxWidth: 660,
  },
  // Chat scaffold
  chatStage: {
    marginTop: 56,
    background: "var(--paper)",
    border: "1px solid var(--slate-200)",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 30px 60px -28px rgba(15,27,51,.15)",
    position: "relative",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    borderBottom: "1px solid var(--slate-200)",
    marginBottom: 24,
  },
  chatHeaderL: {
    display: "flex", alignItems: "center", gap: 14,
  },
  hexBadge: {
    width: 36, height: 36,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  chatHeaderTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 18,
    letterSpacing: "-.005em",
  },
  chatLive: {
    display: "flex", alignItems: "center", gap: 8,
    color: "var(--slate-500)",
  },
  liveDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--amber)",
    boxShadow: "0 0 0 3px rgba(232,169,92,.2)",
  },
  // Messages
  msgRow: { display: "flex", gap: 14, marginBottom: 18 },
  msgRowEnd: { justifyContent: "flex-end" },
  avatar: {
    width: 32, height: 32, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  bubble: {
    padding: "14px 18px",
    borderRadius: 18,
    maxWidth: 640,
    fontSize: 15,
    lineHeight: 1.55,
  },
  bubbleAgent: {
    background: "var(--paper-2)",
    color: "var(--ink)",
    borderTopLeftRadius: 6,
  },
  bubbleUser: {
    background: "var(--midnight)",
    color: "var(--paper)",
    borderTopRightRadius: 6,
  },
  // Suggestion cards inside agent reply
  suggestion: {
    border: "1px solid var(--slate-200)",
    background: "var(--paper-tint)",
    borderRadius: 16,
    padding: 18,
    display: "grid",
    gridTemplateColumns: "40px 1fr auto",
    gap: 14,
    alignItems: "center",
    marginTop: 10,
    cursor: "pointer",
  },
  suggestionTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 17,
    letterSpacing: "-.005em",
    margin: 0,
  },
  suggestionDesc: {
    fontSize: 13, color: "var(--slate-500)", margin: "4px 0 0",
  },
  suggestionMeta: {
    fontFamily: "var(--font-mono)", fontSize: 11,
    color: "var(--slate-500)", letterSpacing: ".06em",
  },
  // Input row
  inputRow: {
    marginTop: 22,
    paddingTop: 22,
    borderTop: "1px solid var(--slate-200)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  inputWrap: {
    flex: 1,
    background: "var(--paper-tint)",
    border: "1px solid var(--slate-200)",
    borderRadius: 999,
    padding: "12px 8px 12px 22px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  inputField: {
    flex: 1,
    border: "none", outline: "none", background: "transparent",
    fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink)",
  },
  sendBtn: {
    background: "var(--midnight)", color: "var(--paper)",
    border: "none", borderRadius: 999,
    padding: "10px 18px", fontSize: 14, fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 8,
    cursor: "pointer",
  },
  // Quick chips
  chipRow: {
    marginTop: 18,
    display: "flex", flexWrap: "wrap", gap: 8,
  },
  chip: {
    padding: "8px 14px",
    border: "1px solid var(--slate-200)",
    background: "var(--paper-tint)",
    borderRadius: 999,
    color: "var(--slate-700)",
    fontSize: 13,
    cursor: "pointer",
  },
  // Below-fold sections
  proof: {
    background: "var(--paper)",
    padding: "120px 56px",
    borderTop: "1px solid var(--slate-200)",
  },
  proofGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0,
    marginTop: 56,
    border: "1px solid var(--slate-200)",
    borderRadius: 24,
    overflow: "hidden",
    background: "var(--paper-tint)",
  },
  proofCell: {
    padding: 36,
    borderRight: "1px solid var(--slate-200)",
  },
  proofCellLast: { borderRight: "none" },
  proofNum: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 64,
    lineHeight: 1,
    letterSpacing: "-.03em",
  },
  proofUnit: { color: "var(--amber-deep)", fontSize: 36 },
  proofLabel: { color: "var(--slate-700)", fontSize: 14, marginTop: 12, lineHeight: 1.5 },
  // Section
  sec: { padding: "120px 56px" },
  secEyebrow: { color: "var(--slate-500)", marginBottom: 16 },
  secTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: 56,
    lineHeight: 1.05,
    letterSpacing: "-.02em",
    margin: 0,
    fontVariationSettings: "'opsz' 144",
    maxWidth: 800,
  },
  // How it works ribbon
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 0,
    marginTop: 56,
    border: "1px solid var(--slate-200)",
    borderRadius: 24,
    overflow: "hidden",
  },
  step: {
    padding: 36,
    borderRight: "1px solid var(--slate-200)",
    background: "var(--paper-tint)",
    display: "flex", flexDirection: "column", gap: 14,
    minHeight: 240,
  },
  stepLast: { borderRight: "none" },
  stepDay: { color: "var(--amber-deep)" },
  stepTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 24,
    letterSpacing: "-.01em", margin: 0,
  },
  stepCopy: { fontSize: 14, lineHeight: 1.55, color: "var(--slate-700)", margin: 0 },
  // Big CTA
  ctaBlock: {
    background: "var(--midnight)",
    color: "var(--paper)",
    margin: "0 56px 80px",
    borderRadius: 28,
    padding: "100px 64px",
    position: "relative",
    overflow: "hidden",
  },
  ctaTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 88,
    lineHeight: 1.0,
    letterSpacing: "-.03em",
    margin: 0,
    maxWidth: 720,
    color: "var(--paper)",
  },
  ctaCopy: { color: "var(--slate-300)", fontSize: 18, marginTop: 24, maxWidth: 540 },
};

function HexBadge({size=36, glow=true}) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <polygon points="18,2 32,10 32,26 18,34 4,26 4,10"
               stroke="var(--midnight)" strokeWidth="1.5" fill="var(--paper)"/>
      <circle cx="18" cy="18" r="4" fill="var(--amber)">
        {glow && <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>}
      </circle>
    </svg>
  );
}

function ConversationalDirection() {
  return (
    <div className="hy-frame" style={convoStyles.frame}>
      <nav className="hy-nav">
        <div className="hy-logo">hyyve<span className="dot">.</span></div>
        <div className="hy-nav-links">
          <a>Solutions</a>
          <a>Customers</a>
          <a>Pricing</a>
          <a>About</a>
        </div>
        <button className="hy-cta-pill">Start a brief <span className="arrow">→</span></button>
      </nav>

      <section style={convoStyles.hero}>
        <div style={convoStyles.heroInner}>
          <div className="label-mono" style={convoStyles.pretitle}>
            <span style={{...convoStyles.liveDot}}></span>
            An AI consultancy that talks like one.
          </div>
          <h1 style={convoStyles.hl}>
            Tell us the work<br/>
            you wish you<br/>
            <span style={convoStyles.hlAccent}>didn't have to do.</span>
          </h1>
          <p style={convoStyles.heroSub}>
            Skip the discovery calls. Describe the process — we'll show you the agents, the timeline, and what your team would get back.
          </p>

          {/* Chat */}
          <div style={convoStyles.chatStage}>
            <div style={convoStyles.chatHeader}>
              <div style={convoStyles.chatHeaderL}>
                <div style={convoStyles.hexBadge}><HexBadge/></div>
                <div>
                  <div style={convoStyles.chatHeaderTitle}>hyyve concierge</div>
                  <div className="label-mono" style={{color:"var(--slate-500)",fontSize:10,marginTop:2}}>
                    Strategy agent · trained on 200+ projects
                  </div>
                </div>
              </div>
              <div className="label-mono" style={convoStyles.chatLive}>
                <span style={convoStyles.liveDot}></span>
                Live now
              </div>
            </div>

            <div style={convoStyles.msgRow}>
              <div style={convoStyles.avatar}><HexBadge size={28} glow={false}/></div>
              <div style={{...convoStyles.bubble,...convoStyles.bubbleAgent}}>
                Hi — I'm a strategy agent built by Hyyve. Tell me about a process that's eating your team's time, and I'll sketch what we'd build to handle it.
              </div>
            </div>

            <div style={{...convoStyles.msgRow, ...convoStyles.msgRowEnd}}>
              <div style={{...convoStyles.bubble,...convoStyles.bubbleUser}}>
                Our ops team spends 20+ hours a week reconciling shipment data across NetSuite, our 3PL, and a few spreadsheets. We're tired.
              </div>
              <div style={{...convoStyles.avatar,background:"var(--slate-100)",borderRadius:"50%"}}>
                <span style={{fontSize:14,fontWeight:600,color:"var(--slate-700)"}}>M</span>
              </div>
            </div>

            <div style={convoStyles.msgRow}>
              <div style={convoStyles.avatar}><HexBadge size={28} glow={false}/></div>
              <div style={{...convoStyles.bubble,...convoStyles.bubbleAgent, maxWidth: 720}}>
                Got it. This is squarely in our automation lane — we've shipped four reconciliation hives in the last 18 months. Here's what I'd&nbsp;recommend:

                <div style={convoStyles.suggestion}>
                  <div><HexBadge size={36}/></div>
                  <div>
                    <h4 style={convoStyles.suggestionTitle}>Reconciliation hive — 3 agents</h4>
                    <p style={convoStyles.suggestionDesc}>One agent per system, plus a coordinator. Runs nightly, escalates only on real anomalies.</p>
                  </div>
                  <div style={convoStyles.suggestionMeta}>
                    8–11 weeks<br/>
                    <span style={{color:"var(--amber-deep)"}}>$48k+</span>
                  </div>
                </div>

                <div style={{...convoStyles.suggestion, marginTop: 8}}>
                  <div><HexBadge size={36} glow={false}/></div>
                  <div>
                    <h4 style={convoStyles.suggestionTitle}>Two-week diagnostic first</h4>
                    <p style={convoStyles.suggestionDesc}>If you'd rather de-risk: we shadow your team for ten days and write the brief together.</p>
                  </div>
                  <div style={convoStyles.suggestionMeta}>
                    2 weeks<br/>
                    <span style={{color:"var(--amber-deep)"}}>$12k</span>
                  </div>
                </div>

                <div style={{marginTop: 14, fontSize: 13, color: "var(--slate-500)"}}>
                  Want me to draft a brief? Or jump on a 30-min call with a partner this week?
                </div>
              </div>
            </div>

            <div style={convoStyles.inputRow}>
              <div style={convoStyles.inputWrap}>
                <input style={convoStyles.inputField} placeholder="Yes — draft the brief and book us in for Thursday..."/>
                <button style={convoStyles.sendBtn}>
                  Send
                  <span style={{width:14,height:14,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9}}>→</span>
                </button>
              </div>
            </div>

            <div style={convoStyles.chipRow}>
              <span className="label-mono" style={{color:"var(--slate-500)",alignSelf:"center",marginRight:8}}>OR TRY:</span>
              <span style={convoStyles.chip}>Triage 200 inbound emails / day</span>
              <span style={convoStyles.chip}>Auto-build sales account briefs</span>
              <span style={convoStyles.chip}>Onboard new hires across 6 tools</span>
              <span style={convoStyles.chip}>QA outbound voice calls</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section style={convoStyles.proof}>
        <div className="label-mono" style={convoStyles.secEyebrow}>— Track record</div>
        <h2 style={convoStyles.secTitle}>
          Eighteen months. Fourteen<br/>customers. One playbook.
        </h2>
        <div style={convoStyles.proofGrid}>
          <div style={convoStyles.proofCell}>
            <div style={convoStyles.proofNum}>62<span style={convoStyles.proofUnit}>%</span></div>
            <div style={convoStyles.proofLabel}>Average reduction in cycle time across deployed automations</div>
          </div>
          <div style={convoStyles.proofCell}>
            <div style={convoStyles.proofNum}>$11.6<span style={convoStyles.proofUnit}>m</span></div>
            <div style={convoStyles.proofLabel}>Annualized customer savings, year-to-date 2026</div>
          </div>
          <div style={{...convoStyles.proofCell, ...convoStyles.proofCellLast}}>
            <div style={convoStyles.proofNum}>11<span style={convoStyles.proofUnit}>wks</span></div>
            <div style={convoStyles.proofLabel}>Median time from kickoff to first agent in production</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={convoStyles.sec}>
        <div className="label-mono" style={convoStyles.secEyebrow}>— How it works</div>
        <h2 style={convoStyles.secTitle}>
          Four steps. Two of them<br/>are coffee.
        </h2>
        <div style={convoStyles.steps}>
          {[
            ["Day 0", "Brief", "You describe the work, here on the page or in a 30-min call. We respond same-week."],
            ["Wk 1–2", "Diagnostic", "We sit with your team. Map the process. Confirm the agent's job description."],
            ["Wk 3–10", "Build", "Two-week loops. Real users, real data, real tools — from the first sprint forward."],
            ["Wk 11+", "Steward", "We stay on for 90 days, then hand the keys to your team. Or stick around longer."],
          ].map(([d,t,c],i,arr)=>(
            <div key={d} style={i===arr.length-1 ? {...convoStyles.step, ...convoStyles.stepLast} : convoStyles.step}>
              <div className="label-mono" style={convoStyles.stepDay}>{d}</div>
              <h3 style={convoStyles.stepTitle}>{t}</h3>
              <p style={convoStyles.stepCopy}>{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={convoStyles.ctaBlock}>
        <div className="label-mono" style={{color:"var(--amber)",marginBottom:24}}>— Or just start typing</div>
        <h2 style={convoStyles.ctaTitle}>
          The fastest way to know<br/>
          if we can help is to&nbsp;<em style={{color:"var(--amber)",fontStyle:"italic"}}>ask</em>.
        </h2>
        <p style={convoStyles.ctaCopy}>
          The concierge agent above is the same one we use internally to scope work. It's pretty good. Try it on something messy.
        </p>
        <div style={{marginTop:48, display:"flex", gap:14}}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "16px 24px", borderRadius: 999,
            background: "var(--amber)", color: "var(--midnight)",
            fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
          }}>
            Open the concierge
            <span style={{width:18,height:18,borderRadius:"50%",background:"rgba(15,27,51,.15)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>→</span>
          </button>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "16px 24px", borderRadius: 999,
            background: "transparent", color: "var(--paper)",
            border: "1px solid rgba(244,242,236,.25)",
            fontSize: 15, fontWeight: 500, cursor: "pointer",
          }}>Book a partner call</button>
        </div>
      </section>
    </div>
  );
}

window.ConversationalDirection = ConversationalDirection;
