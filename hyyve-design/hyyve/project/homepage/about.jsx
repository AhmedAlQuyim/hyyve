// About page — Hyyve story, principles, team, manifesto
// Reuses tokens from shared-styles.css; minimal new styles.

const aboutStyles = {
  frame: (dark) => ({
    background: dark ? "var(--midnight)" : "var(--paper-tint)",
    color: dark ? "var(--paper)" : "var(--ink)",
    minHeight: "100vh",
    transition: "background .4s ease, color .4s ease",
  }),
  nav: (dark) => ({
    position: "sticky", top: 0, zIndex: 50,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "22px 56px",
    background: dark ? "rgba(15,27,51,.7)" : "rgba(251,249,244,.7)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${dark ? "rgba(244,242,236,.08)" : "var(--slate-200)"}`,
  }),
  navLinks: { display: "flex", gap: 36, fontSize: 14, fontWeight: 500 },
  navCta: (dark) => ({
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "10px 18px", borderRadius: 999,
    background: dark ? "var(--paper)" : "var(--midnight)",
    color: dark ? "var(--midnight)" : "var(--paper)",
    fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer",
    textDecoration: "none",
  }),
  // Hero
  hero: { padding: "120px 56px 80px", maxWidth: 1280 },
  pretitle: (dark) => ({
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    marginBottom: 32,
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "8px 14px",
    borderRadius: 999,
    background: dark ? "rgba(244,242,236,.06)" : "var(--paper-2)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
  }),
  liveDot: { width: 8, height: 8, borderRadius: "50%", background: "var(--amber)", boxShadow: "0 0 0 4px rgba(232,169,92,.18)" },
  heroH: {
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 96,
    lineHeight: 0.98, letterSpacing: "-.035em", margin: 0,
    fontVariationSettings: "'opsz' 144", maxWidth: 1100,
  },
  heroAccent: { color: "var(--amber-deep)", fontStyle: "italic" },
  heroAccentDark: { color: "var(--amber)", fontStyle: "italic" },
  heroSub: (dark) => ({
    marginTop: 40, fontSize: 22, lineHeight: 1.5, maxWidth: 720,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
  }),

  // Two-col story spread
  storySpread: {
    padding: "80px 56px",
    display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80,
    alignItems: "start",
  },
  storyEyebrow: (dark) => ({
    color: dark ? "var(--slate-300)" : "var(--slate-500)",
    marginBottom: 18,
  }),
  storyH: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 48,
    lineHeight: 1.05, letterSpacing: "-.02em", margin: 0,
    fontVariationSettings: "'opsz' 144",
  },
  storyBody: (dark) => ({
    fontSize: 17, lineHeight: 1.65,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
    display: "flex", flexDirection: "column", gap: 18,
  }),

  // Principles
  principles: { padding: "120px 56px" },
  principlesGrid: {
    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0,
    marginTop: 56,
  },
  principleCard: (dark, idx) => {
    const top = idx < 2;
    const left = idx % 2 === 0;
    return {
      padding: 48,
      borderTop: top ? `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}` : "none",
      borderBottom: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
      borderRight: left ? `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}` : "none",
      display: "flex", flexDirection: "column", gap: 16,
      minHeight: 220,
    };
  },
  principleNum: { color: "var(--amber-deep)" },
  principleTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28,
    lineHeight: 1.1, letterSpacing: "-.015em", margin: 0,
  },
  principleBody: (dark) => ({
    fontSize: 15, lineHeight: 1.6,
    color: dark ? "var(--slate-300)" : "var(--slate-700)", margin: 0,
  }),

  // Team
  team: { padding: "120px 56px" },
  teamGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
    marginTop: 56,
  },
  teamCard: (dark) => ({
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper)",
    border: `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    borderRadius: 24, padding: 28,
    display: "flex", flexDirection: "column", gap: 14,
    minHeight: 320,
  }),
  teamPortrait: {
    width: "100%", aspectRatio: "1 / 1", borderRadius: 18,
    background: "linear-gradient(135deg, var(--amber-soft), var(--amber-deep))",
    position: "relative", overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  teamInitials: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 56,
    color: "var(--midnight)", letterSpacing: "-.02em",
    fontVariationSettings: "'opsz' 144",
  },
  teamHex: {
    position: "absolute", inset: 0, opacity: .14,
  },
  teamName: { fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, letterSpacing: "-.01em", margin: 0 },
  teamRole: (dark) => ({ color: "var(--amber-deep)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase" }),
  teamBio: (dark) => ({ fontSize: 13.5, lineHeight: 1.55, color: dark ? "var(--slate-300)" : "var(--slate-700)", margin: 0 }),

  // Manifesto / quote section
  manifesto: (dark) => ({
    padding: "140px 56px",
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper-2)",
    textAlign: "center",
  }),
  manifestoText: (dark) => ({
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 56,
    lineHeight: 1.15, letterSpacing: "-.025em",
    margin: "0 auto", maxWidth: 1100,
    color: dark ? "var(--paper)" : "var(--ink)",
    fontVariationSettings: "'opsz' 144",
  }),
  // Numbers we like
  numbers: { padding: "120px 56px" },
  numbersGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
    marginTop: 48,
    border: "1px solid var(--slate-200)", borderRadius: 24, overflow: "hidden",
  },
  numCell: (dark, last) => ({
    padding: 40,
    borderRight: last ? "none" : `1px solid ${dark ? "rgba(244,242,236,.12)" : "var(--slate-200)"}`,
    background: dark ? "rgba(244,242,236,.03)" : "var(--paper)",
  }),
  numBig: {
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 64,
    lineHeight: 1, letterSpacing: "-.03em",
  },
  numLabel: {
    fontFamily: "var(--font-mono)", fontSize: 11,
    letterSpacing: ".1em", textTransform: "uppercase",
    color: "var(--amber-deep)", marginTop: 12,
  },
  numCopy: (dark) => ({
    fontSize: 14, lineHeight: 1.55, marginTop: 14,
    color: dark ? "var(--slate-300)" : "var(--slate-700)",
  }),

  // CTA
  cta: { padding: "60px 0" },
  ctaBlock: {
    padding: "100px 56px",
    margin: "0 56px 80px",
    borderRadius: 28,
    background: "var(--midnight)", color: "var(--paper)",
  },
  ctaTitle: {
    fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 76,
    lineHeight: 1, letterSpacing: "-.03em", margin: 0,
    color: "var(--paper)", maxWidth: 800,
  },
  ctaP: { color: "var(--slate-300)", fontSize: 17, marginTop: 24, maxWidth: 560 },
  ctaPrimary: {
    display: "inline-flex", alignItems: "center", gap: 12,
    padding: "18px 28px", borderRadius: 999,
    background: "var(--amber)", color: "var(--midnight)",
    fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer",
    textDecoration: "none",
  },
  arrow: (light) => ({
    width: 20, height: 20, borderRadius: "50%",
    background: light ? "rgba(15,27,51,.15)" : "rgba(255,255,255,.15)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 12,
  }),

  // Footer
  footer: (dark) => ({
    padding: "64px 56px 40px",
    borderTop: `1px solid ${dark ? "rgba(244,242,236,.1)" : "var(--slate-200)"}`,
    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32,
  }),
  footerColTitle: (dark) => ({
    color: dark ? "var(--slate-500)" : "var(--slate-500)", marginBottom: 14,
  }),
  footerCol: (dark) => ({
    fontSize: 13, color: dark ? "var(--slate-300)" : "var(--slate-700)", lineHeight: 2,
  }),
};

function HexPattern({ opacity = 0.14 }) {
  return (
    <svg style={aboutStyles.teamHex} viewBox="0 0 200 200">
      <defs>
        <pattern id="hexp-about" width="40" height="46.2" patternUnits="userSpaceOnUse">
          <polygon points="20,1 39,12 39,34 20,45 1,34 1,12" fill="none" stroke="var(--midnight)" strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#hexp-about)" opacity={opacity}/>
    </svg>
  );
}

function AboutPage({ dark, onOpenBrief }) {
  const content = useContent();
  const accent = dark ? aboutStyles.heroAccentDark : aboutStyles.heroAccent;
  const about = content.about;
  const contact = content.contact;

  return (
    <div style={aboutStyles.frame(dark)}>
      <nav style={aboutStyles.nav(dark)}>
        <a href="Hyyve Homepage.html" className="hy-logo" style={{ color: dark ? "var(--paper)" : "var(--ink)", textDecoration: "none" }}>
          hyyve<span className="dot">.</span>
        </a>
        <div style={aboutStyles.navLinks}>
          <a href="Hyyve Solutions.html" style={{ color: "inherit", textDecoration: "none" }}>Solutions</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Customers</a>
          <a href="Hyyve About.html" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>About</a>
        </div>
        <button style={aboutStyles.navCta(dark)} onClick={onOpenBrief}>
          Start a Brief <span style={aboutStyles.arrow(dark)}>→</span>
        </button>
      </nav>

      {/* Hero */}
      <section style={aboutStyles.hero}>
        <span className="label-mono" style={aboutStyles.pretitle(dark)}>
          <span style={aboutStyles.liveDot}></span>
          About hyyve · est. 2024
        </span>
        <h1 style={aboutStyles.heroH}>
          We build the <span style={accent}>agents</span><br/>
          we'd want to <span style={accent}>work with.</span>
        </h1>
        <p style={aboutStyles.heroSub(dark)}>
          {about.intro}
        </p>
      </section>

      {/* Story two-col */}
      <section style={aboutStyles.storySpread}>
        <div>
          <div className="label-mono" style={aboutStyles.storyEyebrow(dark)}>— 01 / Why we started</div>
          <h2 style={aboutStyles.storyH}>The work was already there.<br/>The patience to do it&nbsp;wasn't.</h2>
        </div>
        <div style={aboutStyles.storyBody(dark)}>
          <p style={{margin:0}}>
            Most AI projects fail in the same place. Not in the model — in the decade-old database, the API that was never meant to be called from the outside, the SOP that lives in three people's heads.
          </p>
          <p style={{margin:0}}>
            We started Hyyve because the work of getting AI to actually <em style={{fontFamily:"var(--font-display)",color:dark?"var(--amber)":"var(--amber-deep)"}}>fit</em> a business is craft work. It rewards small teams who stay close to operations, who write fewer slides, and who ship one thing every two weeks.
          </p>
          <p style={{margin:0}}>
            We're not trying to be a 200-person consultancy. We're trying to be the team you'd quietly recommend to a peer when they ask who's actually shipping.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section style={aboutStyles.principles}>
        <div className="label-mono" style={aboutStyles.storyEyebrow(dark)}>— 02 / How we work</div>
        <h2 style={{...aboutStyles.storyH, fontSize:56, maxWidth:880}}>
          Four principles. We say them out loud so you can hold us to them.
        </h2>
        <div style={aboutStyles.principlesGrid}>
          {about.principles.map((p, i) => (
            <div key={i} style={aboutStyles.principleCard(dark, i)}>
              <div className="label-mono" style={aboutStyles.principleNum}>0{i+1}</div>
              <h3 style={aboutStyles.principleTitle}>{p.title}</h3>
              <p style={aboutStyles.principleBody(dark)}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section style={aboutStyles.numbers}>
        <div className="label-mono" style={aboutStyles.storyEyebrow(dark)}>— 03 / What we've shipped</div>
        <h2 style={{...aboutStyles.storyH, fontSize:48, maxWidth:760}}>
          Two years in. Small numbers, kept&nbsp;honest.
        </h2>
        <div style={aboutStyles.numbersGrid}>
          <div style={aboutStyles.numCell(dark, false)}>
            <div className="label-mono" style={aboutStyles.numLabel}>Engagements</div>
            <div style={aboutStyles.numBig}>23</div>
            <p style={aboutStyles.numCopy(dark)}>
              Mid-market customers, mostly North America and EMEA. We turned down nine more than we took.
            </p>
          </div>
          <div style={aboutStyles.numCell(dark, false)}>
            <div className="label-mono" style={aboutStyles.numLabel}>Median time-to-live</div>
            <div style={aboutStyles.numBig}>11<span style={{fontSize:32, marginLeft:4}}>wks</span></div>
            <p style={aboutStyles.numCopy(dark)}>
              From kickoff call to first agent in real production use. Two-week loops, no big-bang launches.
            </p>
          </div>
          <div style={aboutStyles.numCell(dark, true)}>
            <div className="label-mono" style={aboutStyles.numLabel}>Team headcount</div>
            <div style={aboutStyles.numBig}>11</div>
            <p style={aboutStyles.numCopy(dark)}>
              Small on purpose. We staff to context, not to invoice. We hire roughly one new person a quarter.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={aboutStyles.team}>
        <div className="label-mono" style={aboutStyles.storyEyebrow(dark)}>— 04 / The people</div>
        <h2 style={{...aboutStyles.storyH, fontSize:56, maxWidth:760}}>
          The hive is small. That's the&nbsp;point.
        </h2>
        <div style={aboutStyles.teamGrid}>
          {about.team.map((t, i) => {
            const initials = t.name.split(" ").map(s => s[0]).join("").slice(0,2);
            return (
              <div key={i} style={aboutStyles.teamCard(dark)}>
                <div style={aboutStyles.teamPortrait}>
                  <HexPattern/>
                  <span style={aboutStyles.teamInitials}>{initials}</span>
                </div>
                <div className="label-mono" style={aboutStyles.teamRole(dark)}>{t.role}</div>
                <h3 style={aboutStyles.teamName}>{t.name}</h3>
                <p style={aboutStyles.teamBio(dark)}>{t.bio}</p>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 48, fontSize: 14, color: dark ? "var(--slate-300)" : "var(--slate-700)"}}>
          Plus seven engineers, designers, and operators who'd rather not be on a website. We're hiring quietly — <a style={{color:"inherit", textDecoration:"underline", textUnderlineOffset:3}}>{contact.email}</a>.
        </div>
      </section>

      {/* Manifesto */}
      <section style={aboutStyles.manifesto(dark)}>
        <div className="label-mono" style={aboutStyles.storyEyebrow(dark)}>— A short manifesto</div>
        <blockquote style={aboutStyles.manifestoText(dark)}>
          The future of AI in your company won't be a product you buy. It'll be a&nbsp;<em style={{color:dark?"var(--amber)":"var(--amber-deep)"}}>set of small habits</em> your operators take on, supported by software that&nbsp;disappears.
        </blockquote>
      </section>

      {/* CTA */}
      <section style={aboutStyles.cta}>
        <div style={aboutStyles.ctaBlock}>
          <div className="label-mono" style={{ color: "var(--amber)", marginBottom: 24 }}>— Want to see if it fits?</div>
          <h2 style={aboutStyles.ctaTitle}>
            The fastest way to<br/>know is to&nbsp;<em style={{color:"var(--amber)",fontStyle:"italic"}}>ask</em>.
          </h2>
          <p style={aboutStyles.ctaP}>
            Three minutes, five questions, a real scoped engagement at the end. The same Brief our partners use on a discovery call.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={aboutStyles.ctaPrimary} onClick={onOpenBrief}>
              Start a Brief <span style={aboutStyles.arrow(true)}>→</span>
            </button>
          </div>
        </div>
      </section>

      <footer style={aboutStyles.footer(dark)}>
        <div>
          <div className="hy-logo" style={{ color: dark ? "var(--paper)" : "var(--ink)", fontSize: 28, marginBottom: 12 }}>
            hyyve<span className="dot">.</span>
          </div>
          <div style={{ fontSize: 13, maxWidth: 280, color: dark ? "var(--slate-300)" : "var(--slate-700)" }}>
            {contact.tagline}
          </div>
        </div>
        <div style={aboutStyles.footerCol(dark)}>
          <div className="label-mono" style={aboutStyles.footerColTitle(dark)}>Studio</div>
          <div><a href="Hyyve About.html" style={{color:"inherit", textDecoration:"none"}}>About</a></div>
          <div>Field notes</div><div>Careers</div>
        </div>
        <div style={aboutStyles.footerCol(dark)}>
          <div className="label-mono" style={aboutStyles.footerColTitle(dark)}>Solutions</div>
          {content.solutions.map(s => (
            <div key={s.id}><a href={`Hyyve Solutions.html#${s.id}`} style={{color:"inherit", textDecoration:"none"}}>{s.title}</a></div>
          ))}
        </div>
        <div style={aboutStyles.footerCol(dark)}>
          <div className="label-mono" style={aboutStyles.footerColTitle(dark)}>Reach</div>
          <div>{contact.email}</div>
          <div>{contact.linkedin.split("/").pop()} · {contact.substack.split(".")[0]}</div>
          <div style={{ marginTop: 14, fontSize: 11, color: dark ? "var(--slate-500)" : "var(--slate-500)" }}>
            © 2026 Hyyve Studio Ltd.
          </div>
        </div>
      </footer>
    </div>
  );
}

window.AboutPage = AboutPage;
