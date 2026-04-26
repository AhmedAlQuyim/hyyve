// Hyyve Admin Backend
// Tabs: Overview · Briefs · Solutions · Customers · About · Contact · Settings
// Reads/writes the content store. Simple passphrase gate.

const ADMIN_PASS = "hyyve2026"; // demo only — real implementation would auth server-side

const adminStyles = {
  app: {
    fontFamily: "var(--font-body)",
    color: "var(--ink)",
    background: "var(--slate-50)",
    minHeight: "100vh",
    display: "flex",
  },
  // Sidebar
  sidebar: {
    width: 240,
    background: "var(--midnight)",
    color: "var(--paper)",
    display: "flex", flexDirection: "column",
    flexShrink: 0,
    position: "sticky", top: 0, height: "100vh",
    overflow: "auto",
  },
  brand: {
    padding: "26px 24px 22px",
    borderBottom: "1px solid rgba(244,242,236,.1)",
    fontFamily: "var(--font-display)", fontWeight: 300,
    fontSize: 28, letterSpacing: "-.04em",
  },
  brandTag: {
    fontFamily: "var(--font-mono)", fontSize: 9,
    letterSpacing: ".15em", textTransform: "uppercase",
    color: "var(--amber)", marginTop: 4, fontWeight: 500,
  },
  navList: { padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 },
  navItem: (active) => ({
    padding: "10px 14px", borderRadius: 10,
    fontSize: 14, fontWeight: 500,
    color: active ? "var(--midnight)" : "var(--paper)",
    background: active ? "var(--amber)" : "transparent",
    cursor: "pointer", border: "none", textAlign: "left",
    display: "flex", alignItems: "center", gap: 10,
    fontFamily: "inherit",
    transition: "background .15s",
  }),
  navIcon: { width: 16, height: 16, opacity: .9 },
  navCount: (active) => ({
    marginLeft: "auto",
    fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 500,
    background: active ? "var(--midnight)" : "rgba(244,242,236,.1)",
    color: active ? "var(--amber)" : "var(--slate-300)",
    padding: "2px 8px", borderRadius: 999,
  }),
  sidebarFoot: {
    marginTop: "auto", padding: 16,
    borderTop: "1px solid rgba(244,242,236,.1)",
    fontSize: 11, color: "var(--slate-300)",
    display: "flex", flexDirection: "column", gap: 8,
  },
  sidebarBtn: {
    background: "transparent", color: "var(--paper)",
    border: "1px solid rgba(244,242,236,.2)",
    padding: "8px 12px", borderRadius: 8,
    cursor: "pointer", fontSize: 12, fontFamily: "inherit",
    textAlign: "left",
  },

  // Main
  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar: {
    background: "white",
    borderBottom: "1px solid var(--slate-200)",
    padding: "20px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 10,
  },
  pageTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 26,
    letterSpacing: "-.015em", margin: 0,
  },
  pageDesc: {
    fontSize: 13, color: "var(--slate-500)", marginTop: 2,
  },
  topRight: {
    display: "flex", alignItems: "center", gap: 12,
    fontSize: 13, color: "var(--slate-700)",
  },
  liveDot: { width: 8, height: 8, borderRadius: "50%", background: "var(--amber)", boxShadow: "0 0 0 4px rgba(232,169,92,.18)" },

  content: { padding: 32, maxWidth: 1240 },

  // Cards / forms
  card: {
    background: "white", border: "1px solid var(--slate-200)",
    borderRadius: 16, padding: 28, marginBottom: 20,
  },
  cardHeader: {
    display: "flex", alignItems: "baseline", justifyContent: "space-between",
    marginBottom: 18, gap: 16,
  },
  cardTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22,
    letterSpacing: "-.01em", margin: 0,
  },
  cardSub: { fontSize: 13, color: "var(--slate-500)", marginTop: 4 },
  cardActions: { display: "flex", gap: 8, flexShrink: 0 },

  // Forms
  fieldset: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldsetFull: { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontSize: 11, fontFamily: "var(--font-mono)",
    letterSpacing: ".08em", textTransform: "uppercase",
    color: "var(--slate-500)", fontWeight: 500,
  },
  input: {
    border: "1px solid var(--slate-200)", borderRadius: 8,
    padding: "10px 12px", fontFamily: "inherit", fontSize: 14,
    background: "white", color: "var(--ink)", outline: "none",
  },
  textarea: {
    border: "1px solid var(--slate-200)", borderRadius: 8,
    padding: "10px 12px", fontFamily: "inherit", fontSize: 14,
    background: "white", color: "var(--ink)", outline: "none",
    resize: "vertical", minHeight: 70, lineHeight: 1.5,
  },

  // Buttons
  btn: {
    padding: "9px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
    border: "1px solid var(--slate-200)", background: "white",
    cursor: "pointer", fontFamily: "inherit",
    display: "inline-flex", alignItems: "center", gap: 6,
  },
  btnPrimary: {
    background: "var(--midnight)", color: "var(--paper)",
    border: "1px solid var(--midnight)",
  },
  btnDanger: {
    background: "white", color: "#B23A3A",
    border: "1px solid #E6C8C8",
  },
  btnAccent: {
    background: "var(--amber)", color: "var(--midnight)",
    border: "1px solid var(--amber)", fontWeight: 600,
  },

  // Stats overview
  statGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
    marginBottom: 24,
  },
  stat: {
    background: "white", border: "1px solid var(--slate-200)",
    borderRadius: 16, padding: 22,
  },
  statLabel: {
    fontSize: 11, fontFamily: "var(--font-mono)",
    letterSpacing: ".08em", textTransform: "uppercase",
    color: "var(--slate-500)", marginBottom: 10,
  },
  statBig: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 38,
    letterSpacing: "-.02em", lineHeight: 1,
  },
  statTrend: {
    fontSize: 12, color: "var(--amber-deep)", marginTop: 6,
    fontWeight: 500,
  },

  // Briefs table
  table: {
    width: "100%", borderCollapse: "collapse",
    background: "white", border: "1px solid var(--slate-200)",
    borderRadius: 12, overflow: "hidden",
  },
  th: {
    fontSize: 11, fontFamily: "var(--font-mono)",
    letterSpacing: ".08em", textTransform: "uppercase",
    color: "var(--slate-500)", textAlign: "left",
    padding: "12px 16px", borderBottom: "1px solid var(--slate-200)",
    background: "var(--slate-50)", fontWeight: 500,
  },
  td: {
    padding: "14px 16px", borderBottom: "1px solid var(--slate-100)",
    fontSize: 13, color: "var(--ink)", verticalAlign: "middle",
  },
  badge: (color) => ({
    display: "inline-block", padding: "3px 10px", borderRadius: 999,
    fontSize: 11, fontWeight: 500, fontFamily: "var(--font-mono)",
    letterSpacing: ".04em",
    background: color === "amber" ? "rgba(232,169,92,.18)" :
                color === "slate" ? "var(--slate-100)" :
                color === "green" ? "rgba(60,150,90,.15)" : "var(--slate-100)",
    color: color === "amber" ? "var(--amber-deep)" :
           color === "green" ? "#2D7A4A" : "var(--slate-700)",
  }),

  // Repeating items (solutions / customers / capabilities)
  itemRow: {
    background: "white", border: "1px solid var(--slate-200)",
    borderRadius: 14, padding: 18,
    marginBottom: 12,
    display: "flex", alignItems: "flex-start", gap: 16,
  },
  itemHandle: {
    width: 28, height: 28, borderRadius: 6,
    background: "var(--paper-2)", color: "var(--slate-500)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--font-mono)", fontSize: 11, flexShrink: 0,
  },

  // Detail drawer for briefs
  drawer: {
    position: "fixed", top: 0, right: 0, bottom: 0,
    width: 540, background: "white", zIndex: 100,
    boxShadow: "-30px 0 80px -20px rgba(0,0,0,.25)",
    display: "flex", flexDirection: "column",
    transform: "translateX(0)",
  },
  drawerHd: {
    padding: "22px 28px",
    borderBottom: "1px solid var(--slate-200)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  drawerBody: {
    flex: 1, padding: 28, overflow: "auto",
    display: "flex", flexDirection: "column", gap: 24,
  },
  drawerOverlay: {
    position: "fixed", inset: 0, background: "rgba(11,18,32,.45)",
    backdropFilter: "blur(4px)", zIndex: 99,
  },
};

// ───────────── Auth ─────────────
function AuthGate({ onAuth }) {
  const [pwd, setPwd] = React.useState("");
  const [err, setErr] = React.useState("");
  const tryAuth = (e) => {
    e?.preventDefault();
    if (pwd === ADMIN_PASS) {
      sessionStorage.setItem("hyyve.admin", "1");
      onAuth();
    } else {
      setErr("That isn't right.");
      setPwd("");
    }
  };
  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--midnight)", fontFamily:"var(--font-body)"}}>
      <form onSubmit={tryAuth} style={{
        width: 380, background: "white", borderRadius: 20, padding: 40,
        boxShadow: "0 30px 80px -20px rgba(0,0,0,.5)",
      }}>
        <div style={{fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 36, letterSpacing: "-.04em", marginBottom: 4}}>
          hyyve<span style={{color:"var(--amber)"}}>.</span>
        </div>
        <div style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:".15em", textTransform:"uppercase", color:"var(--slate-500)", marginBottom:28}}>
          Admin · Restricted
        </div>
        <label style={adminStyles.label}>Passphrase</label>
        <input
          autoFocus
          type="password"
          value={pwd}
          onChange={e => { setPwd(e.target.value); setErr(""); }}
          placeholder="Enter admin passphrase"
          style={{...adminStyles.input, marginTop: 8, marginBottom: 4, fontSize: 15}}
        />
        {err && <div style={{fontSize: 12, color: "#B23A3A", marginBottom: 8}}>{err}</div>}
        <button type="submit" style={{...adminStyles.btn, ...adminStyles.btnPrimary, width:"100%", justifyContent:"center", marginTop: 16, padding:"12px"}}>
          Sign in
        </button>
        <div style={{fontSize: 11, color: "var(--slate-500)", marginTop: 18, lineHeight: 1.5}}>
          Demo passphrase: <code style={{background:"var(--slate-50)", padding:"2px 6px", borderRadius: 4, fontFamily:"var(--font-mono)"}}>hyyve2026</code>
        </div>
      </form>
    </div>
  );
}

// ───────────── Sidebar ─────────────
function Sidebar({ active, setActive, briefCount, onLogout }) {
  const nav = [
    { id: "overview", label: "Overview" },
    { id: "briefs", label: "Briefs", count: briefCount },
    { id: "solutions", label: "Solutions" },
    { id: "customers", label: "Customers" },
    { id: "about", label: "About page" },
    { id: "contact", label: "Contact info" },
    { id: "settings", label: "Settings" },
  ];
  return (
    <aside style={adminStyles.sidebar}>
      <div style={adminStyles.brand}>
        hyyve<span style={{color:"var(--amber)"}}>.</span>
        <div style={adminStyles.brandTag}>Admin · v1.0</div>
      </div>
      <nav style={adminStyles.navList}>
        {nav.map(n => (
          <button key={n.id}
            style={adminStyles.navItem(active === n.id)}
            onClick={() => setActive(n.id)}>
            {n.label}
            {n.count != null && (
              <span style={adminStyles.navCount(active === n.id)}>{n.count}</span>
            )}
          </button>
        ))}
      </nav>
      <div style={adminStyles.sidebarFoot}>
        <div>Signed in as: <strong style={{color:"var(--paper)"}}>admin</strong></div>
        <button style={adminStyles.sidebarBtn} onClick={onLogout}>Sign out</button>
      </div>
    </aside>
  );
}

// ───────────── Topbar ─────────────
function Topbar({ title, desc }) {
  return (
    <div style={adminStyles.topbar}>
      <div>
        <h1 style={adminStyles.pageTitle}>{title}</h1>
        <div style={adminStyles.pageDesc}>{desc}</div>
      </div>
      <div style={adminStyles.topRight}>
        <span style={adminStyles.liveDot}></span>
        <span>Site live · {new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</span>
        <a href="Hyyve Homepage.html" target="_blank" style={{...adminStyles.btn, textDecoration:"none", color:"var(--ink)"}}>
          View site →
        </a>
      </div>
    </div>
  );
}

// ───────────── Overview ─────────────
function Overview({ content, briefs, setActive }) {
  const newBriefs = briefs.filter(b => b.status === "new").length;
  const recent = briefs.slice(0, 4);
  return (
    <>
      <div style={adminStyles.statGrid}>
        <div style={adminStyles.stat}>
          <div style={adminStyles.statLabel}>New briefs</div>
          <div style={adminStyles.statBig}>{newBriefs}</div>
          <div style={adminStyles.statTrend}>{briefs.length} total</div>
        </div>
        <div style={adminStyles.stat}>
          <div style={adminStyles.statLabel}>Solutions</div>
          <div style={adminStyles.statBig}>{content.solutions.length}</div>
          <div style={adminStyles.statTrend}>service lanes</div>
        </div>
        <div style={adminStyles.stat}>
          <div style={adminStyles.statLabel}>Customers</div>
          <div style={adminStyles.statBig}>{content.customers.length}</div>
          <div style={adminStyles.statTrend}>{content.customers.filter(c=>c.featured).length} featured</div>
        </div>
        <div style={adminStyles.stat}>
          <div style={adminStyles.statLabel}>Team</div>
          <div style={adminStyles.statBig}>{content.about.team.length}</div>
          <div style={adminStyles.statTrend}>visible on About</div>
        </div>
      </div>

      <div style={adminStyles.card}>
        <div style={adminStyles.cardHeader}>
          <div>
            <h2 style={adminStyles.cardTitle}>Recent briefs</h2>
            <div style={adminStyles.cardSub}>Submissions captured by the Brief wizard</div>
          </div>
          <button style={adminStyles.btn} onClick={() => setActive("briefs")}>
            View all →
          </button>
        </div>
        {recent.length === 0 ? (
          <EmptyState title="No briefs yet" copy="When prospects complete the Brief wizard, their submissions will land here."/>
        ) : (
          <table style={adminStyles.table}>
            <thead>
              <tr>
                <th style={adminStyles.th}>ID</th>
                <th style={adminStyles.th}>Title</th>
                <th style={adminStyles.th}>Lane</th>
                <th style={adminStyles.th}>Submitted</th>
                <th style={adminStyles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(b => (
                <tr key={b.id}>
                  <td style={{...adminStyles.td, fontFamily:"var(--font-mono)", fontSize:11, color:"var(--slate-500)"}}>{b.id}</td>
                  <td style={adminStyles.td}>{b.brief?.title || "—"}</td>
                  <td style={adminStyles.td}>
                    <span style={adminStyles.badge("amber")}>{b.brief?.lane || "—"}</span>
                  </td>
                  <td style={{...adminStyles.td, color:"var(--slate-500)"}}>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td style={adminStyles.td}>
                    <span style={adminStyles.badge(b.status === "new" ? "amber" : b.status === "contacted" ? "green" : "slate")}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={adminStyles.card}>
        <h2 style={adminStyles.cardTitle}>Quick actions</h2>
        <div style={{display:"flex", gap:10, marginTop: 16, flexWrap:"wrap"}}>
          <button style={adminStyles.btn} onClick={() => setActive("solutions")}>Edit solutions</button>
          <button style={adminStyles.btn} onClick={() => setActive("customers")}>Add customer</button>
          <button style={adminStyles.btn} onClick={() => setActive("contact")}>Update contact info</button>
          <button style={adminStyles.btn} onClick={() => setActive("about")}>Edit team bios</button>
        </div>
      </div>
    </>
  );
}

function EmptyState({ title, copy }) {
  return (
    <div style={{padding:"40px 20px", textAlign:"center", color:"var(--slate-500)"}}>
      <div style={{fontFamily:"var(--font-display)", fontSize: 22, color:"var(--ink)", marginBottom: 6}}>{title}</div>
      <div style={{fontSize: 13, maxWidth: 360, margin: "0 auto"}}>{copy}</div>
    </div>
  );
}

// ───────────── Briefs ─────────────
function BriefsPanel({ briefs, onUpdate, onDelete }) {
  const [selected, setSelected] = React.useState(null);
  const [filter, setFilter] = React.useState("all");

  const filtered = filter === "all" ? briefs : briefs.filter(b => b.status === filter);

  const downloadAll = () => {
    const blob = new Blob([JSON.stringify(briefs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hyyve-briefs-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div style={adminStyles.card}>
        <div style={adminStyles.cardHeader}>
          <div>
            <h2 style={adminStyles.cardTitle}>Briefs</h2>
            <div style={adminStyles.cardSub}>
              {briefs.length} total · {briefs.filter(b=>b.status==="new").length} new · {briefs.filter(b=>b.status==="contacted").length} contacted
            </div>
          </div>
          <div style={adminStyles.cardActions}>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{...adminStyles.input, fontSize:13, padding:"7px 10px"}}>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
            <button style={adminStyles.btn} onClick={downloadAll} disabled={briefs.length===0}>
              Export JSON
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title={briefs.length === 0 ? "No briefs yet" : "Nothing matches that filter"}
            copy={briefs.length === 0
              ? "Open the homepage and complete the Brief wizard to test — submissions show up here automatically."
              : "Try changing the filter dropdown."}
          />
        ) : (
          <table style={adminStyles.table}>
            <thead>
              <tr>
                <th style={adminStyles.th}>ID</th>
                <th style={adminStyles.th}>Title</th>
                <th style={adminStyles.th}>Lane</th>
                <th style={adminStyles.th}>Investment</th>
                <th style={adminStyles.th}>Submitted</th>
                <th style={adminStyles.th}>Status</th>
                <th style={adminStyles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} style={{cursor:"pointer"}} onClick={() => setSelected(b)}>
                  <td style={{...adminStyles.td, fontFamily:"var(--font-mono)", fontSize:11, color:"var(--slate-500)"}}>{b.id}</td>
                  <td style={{...adminStyles.td, fontWeight: 500}}>{b.brief?.title || "—"}</td>
                  <td style={adminStyles.td}>
                    <span style={adminStyles.badge("amber")}>{b.brief?.lane || "—"}</span>
                  </td>
                  <td style={adminStyles.td}>{b.brief?.investment || "—"}</td>
                  <td style={{...adminStyles.td, color:"var(--slate-500)"}}>
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td style={adminStyles.td}>
                    <span style={adminStyles.badge(b.status === "new" ? "amber" : b.status === "contacted" ? "green" : "slate")}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{...adminStyles.td, textAlign: "right", color: "var(--slate-500)"}}>→</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <BriefDrawer brief={selected} onClose={() => setSelected(null)} onUpdate={onUpdate} onDelete={(id) => { onDelete(id); setSelected(null); }}/>
      )}
    </>
  );
}

function BriefDrawer({ brief, onClose, onUpdate, onDelete }) {
  const b = brief.brief || {};
  const a = brief.answers || {};
  return (
    <>
      <div style={adminStyles.drawerOverlay} onClick={onClose}/>
      <div style={adminStyles.drawer}>
        <div style={adminStyles.drawerHd}>
          <div>
            <div style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"var(--slate-500)"}}>
              {brief.id} · {new Date(brief.createdAt).toLocaleString()}
            </div>
            <h3 style={{fontFamily:"var(--font-display)", fontWeight: 400, fontSize: 22, letterSpacing:"-.01em", margin:"4px 0 0"}}>
              {b.title || "Untitled brief"}
            </h3>
          </div>
          <button style={{background:"transparent", border:"none", cursor:"pointer", fontSize: 20, color:"var(--slate-500)"}} onClick={onClose}>×</button>
        </div>

        <div style={adminStyles.drawerBody}>
          <div>
            <div style={adminStyles.label}>Status</div>
            <div style={{display:"flex", gap: 6, marginTop: 8}}>
              {["new", "contacted", "closed"].map(s => (
                <button key={s}
                  style={{...adminStyles.btn, ...(brief.status === s ? adminStyles.btnPrimary : {})}}
                  onClick={() => onUpdate(brief.id, { status: s })}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={adminStyles.label}>Scoped brief</div>
            <div style={{...adminStyles.card, marginTop:8, marginBottom:0, padding: 18, background: "var(--paper-tint)"}}>
              <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"var(--amber-deep)", letterSpacing:".1em", textTransform:"uppercase", marginBottom: 6}}>
                {b.lane}
              </div>
              <p style={{margin:0, fontSize: 14, lineHeight: 1.55}}>{b.summary}</p>
              {b.agents && b.agents.length > 0 && (
                <ul style={{margin:"14px 0 0", paddingLeft: 18, fontSize: 13, lineHeight: 1.7}}>
                  {b.agents.map((ag, i) => <li key={i}>{ag}</li>)}
                </ul>
              )}
              <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 12, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--slate-200)"}}>
                <div><div style={{fontSize:10, color:"var(--slate-500)", fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:".08em"}}>Timeline</div><div style={{fontWeight:500, marginTop:2}}>{b.timeline}</div></div>
                <div><div style={{fontSize:10, color:"var(--slate-500)", fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:".08em"}}>Investment</div><div style={{fontWeight:500, marginTop:2}}>{b.investment}</div></div>
                <div><div style={{fontSize:10, color:"var(--slate-500)", fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:".08em"}}>Savings</div><div style={{fontWeight:500, marginTop:2}}>{b.savings}</div></div>
              </div>
            </div>
          </div>

          <div>
            <div style={adminStyles.label}>Client answers</div>
            <div style={{display:"flex", flexDirection: "column", gap: 14, marginTop: 8}}>
              {[
                ["Process", a.process],
                ["Tools & systems", a.tools],
                ["Team & cost", a.team],
                ["90-day outcome", a.outcome],
                ["Contact", a.contact],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{fontSize:11, color:"var(--slate-500)", fontFamily:"var(--font-mono)", textTransform:"uppercase", letterSpacing:".08em", marginBottom: 4}}>{k}</div>
                  <div style={{fontSize:13.5, lineHeight: 1.55, color:"var(--ink)", whiteSpace:"pre-wrap"}}>{v || "—"}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={adminStyles.label}>Internal notes</div>
            <textarea
              style={{...adminStyles.textarea, marginTop: 8, width: "100%"}}
              placeholder="Add a note for the partner team…"
              value={brief.notes || ""}
              onChange={e => onUpdate(brief.id, { notes: e.target.value })}
            />
          </div>

          <div style={{display:"flex", gap: 8, marginTop: "auto", paddingTop: 16, borderTop:"1px solid var(--slate-200)"}}>
            <button style={{...adminStyles.btn, ...adminStyles.btnAccent}}>Email contact</button>
            <button style={{...adminStyles.btn, ...adminStyles.btnDanger, marginLeft:"auto"}}
              onClick={() => { if(confirm("Delete this brief? This cannot be undone.")) onDelete(brief.id); }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ───────────── Generic editor helpers ─────────────
function Field({ label, children }) {
  return (
    <div style={adminStyles.field}>
      <label style={adminStyles.label}>{label}</label>
      {children}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder }) {
  return <Field label={label}><input style={adminStyles.input} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder}/></Field>;
}
function TextArea({ label, value, onChange, rows = 3 }) {
  return <Field label={label}><textarea style={{...adminStyles.textarea, minHeight: rows*22+20}} value={value || ""} onChange={e => onChange(e.target.value)}/></Field>;
}

// ───────────── Solutions editor ─────────────
function SolutionsEditor({ content, save }) {
  const update = (idx, patch) => {
    const next = { ...content, solutions: content.solutions.map((s, i) => i === idx ? { ...s, ...patch } : s) };
    save(next);
  };
  const updateCap = (sIdx, cIdx, patch) => {
    const sol = content.solutions[sIdx];
    const caps = sol.capabilities.map((c, i) => i === cIdx ? { ...c, ...patch } : c);
    update(sIdx, { capabilities: caps });
  };
  const addCap = (sIdx) => {
    const sol = content.solutions[sIdx];
    update(sIdx, { capabilities: [...sol.capabilities, { name: "New capability", description: "" }] });
  };
  const removeCap = (sIdx, cIdx) => {
    const sol = content.solutions[sIdx];
    update(sIdx, { capabilities: sol.capabilities.filter((_, i) => i !== cIdx) });
  };

  return (
    <>
      {content.solutions.map((sol, idx) => (
        <div key={sol.id} style={adminStyles.card}>
          <div style={adminStyles.cardHeader}>
            <div>
              <h2 style={adminStyles.cardTitle}>{sol.title}</h2>
              <div style={adminStyles.cardSub}>id: <code style={{fontFamily:"var(--font-mono)"}}>{sol.id}</code></div>
            </div>
          </div>
          <div style={adminStyles.fieldsetFull}>
            <div style={adminStyles.fieldset}>
              <TextField label="Title" value={sol.title} onChange={v => update(idx, { title: v })}/>
              <TextField label="Tagline" value={sol.tagline} onChange={v => update(idx, { tagline: v })}/>
            </div>
            <TextArea label="Description" value={sol.description} onChange={v => update(idx, { description: v })} rows={3}/>
            <div>
              <div style={{...adminStyles.label, marginBottom: 10}}>Capabilities ({sol.capabilities.length})</div>
              {sol.capabilities.map((cap, cIdx) => (
                <div key={cIdx} style={adminStyles.itemRow}>
                  <div style={adminStyles.itemHandle}>0{cIdx+1}</div>
                  <div style={{flex:1, display:"flex", flexDirection:"column", gap:10}}>
                    <input style={adminStyles.input} value={cap.name} onChange={e => updateCap(idx, cIdx, { name: e.target.value })}/>
                    <textarea style={{...adminStyles.textarea, minHeight: 60}} value={cap.description} onChange={e => updateCap(idx, cIdx, { description: e.target.value })}/>
                  </div>
                  <button style={{...adminStyles.btn, ...adminStyles.btnDanger}} onClick={() => removeCap(idx, cIdx)}>Remove</button>
                </div>
              ))}
              <button style={adminStyles.btn} onClick={() => addCap(idx)}>+ Add capability</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// ───────────── Customers editor ─────────────
function CustomersEditor({ content, save }) {
  const update = (idx, patch) => {
    const next = { ...content, customers: content.customers.map((c, i) => i === idx ? { ...c, ...patch } : c) };
    save(next);
  };
  const remove = (idx) => {
    if (!confirm("Remove this customer? You can re-add them later.")) return;
    save({ ...content, customers: content.customers.filter((_, i) => i !== idx) });
  };
  const add = () => {
    const id = `cust-${Date.now().toString(36)}`;
    save({ ...content, customers: [...content.customers, {
      id, name: "New customer", industry: "", lane: "Automation", logo: "?",
      blurb: "", quote: "", attribution: "", featured: false,
    }] });
  };

  return (
    <>
      {content.customers.map((cust, idx) => (
        <div key={cust.id} style={adminStyles.card}>
          <div style={adminStyles.cardHeader}>
            <div style={{display:"flex", alignItems:"center", gap: 14}}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background:"linear-gradient(135deg, var(--amber-soft), var(--amber-deep))",
                color:"var(--midnight)", display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 400,
              }}>{cust.logo}</div>
              <div>
                <h2 style={adminStyles.cardTitle}>{cust.name}</h2>
                <div style={adminStyles.cardSub}>{cust.industry} · {cust.lane}</div>
              </div>
            </div>
            <div style={adminStyles.cardActions}>
              <label style={{display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:"var(--slate-700)", cursor:"pointer"}}>
                <input type="checkbox" checked={!!cust.featured} onChange={e => update(idx, { featured: e.target.checked })}/>
                Featured
              </label>
              <button style={{...adminStyles.btn, ...adminStyles.btnDanger}} onClick={() => remove(idx)}>Remove</button>
            </div>
          </div>
          <div style={adminStyles.fieldsetFull}>
            <div style={adminStyles.fieldset}>
              <TextField label="Name" value={cust.name} onChange={v => update(idx, { name: v })}/>
              <TextField label="Industry / size" value={cust.industry} onChange={v => update(idx, { industry: v })}/>
              <Field label="Service lane">
                <select style={adminStyles.input} value={cust.lane} onChange={e => update(idx, { lane: e.target.value })}>
                  <option>Automation</option>
                  <option>Agentic</option>
                  <option>Consultation</option>
                </select>
              </Field>
              <TextField label="Logo letter" value={cust.logo} onChange={v => update(idx, { logo: v.slice(0,2) })}/>
            </div>
            <TextArea label="Engagement blurb" value={cust.blurb} onChange={v => update(idx, { blurb: v })}/>
            <TextArea label="Quote" value={cust.quote} onChange={v => update(idx, { quote: v })}/>
            <TextField label="Attribution" value={cust.attribution} onChange={v => update(idx, { attribution: v })} placeholder="Name · Title"/>
          </div>
        </div>
      ))}
      <button style={{...adminStyles.btn, ...adminStyles.btnAccent}} onClick={add}>+ Add customer</button>
    </>
  );
}

// ───────────── About editor ─────────────
function AboutEditor({ content, save }) {
  const updateAbout = (patch) => save({ ...content, about: { ...content.about, ...patch } });
  const updatePrinciple = (i, patch) => {
    const ps = content.about.principles.map((p, idx) => idx === i ? { ...p, ...patch } : p);
    updateAbout({ principles: ps });
  };
  const updateMember = (i, patch) => {
    const t = content.about.team.map((m, idx) => idx === i ? { ...m, ...patch } : m);
    updateAbout({ team: t });
  };
  const addMember = () => updateAbout({ team: [...content.about.team, { name: "New person", role: "Role", bio: "" }] });
  const removeMember = (i) => {
    if (!confirm("Remove this team member?")) return;
    updateAbout({ team: content.about.team.filter((_, idx) => idx !== i) });
  };

  return (
    <>
      <div style={adminStyles.card}>
        <h2 style={adminStyles.cardTitle}>Headline & intro</h2>
        <div style={{...adminStyles.fieldsetFull, marginTop: 16}}>
          <TextField label="Headline" value={content.about.headline} onChange={v => updateAbout({ headline: v })}/>
          <TextArea label="Intro paragraph" value={content.about.intro} onChange={v => updateAbout({ intro: v })} rows={4}/>
        </div>
      </div>

      <div style={adminStyles.card}>
        <h2 style={adminStyles.cardTitle}>Principles</h2>
        <div style={{marginTop: 12}}>
          {content.about.principles.map((p, i) => (
            <div key={i} style={adminStyles.itemRow}>
              <div style={adminStyles.itemHandle}>0{i+1}</div>
              <div style={{flex:1, display:"flex", flexDirection:"column", gap: 10}}>
                <input style={adminStyles.input} value={p.title} onChange={e => updatePrinciple(i, { title: e.target.value })}/>
                <textarea style={{...adminStyles.textarea, minHeight: 60}} value={p.body} onChange={e => updatePrinciple(i, { body: e.target.value })}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={adminStyles.card}>
        <div style={adminStyles.cardHeader}>
          <h2 style={adminStyles.cardTitle}>Team</h2>
          <button style={{...adminStyles.btn, ...adminStyles.btnAccent}} onClick={addMember}>+ Add member</button>
        </div>
        {content.about.team.map((m, i) => (
          <div key={i} style={adminStyles.itemRow}>
            <div style={adminStyles.itemHandle}>{m.name.split(" ").map(s=>s[0]).join("").slice(0,2)}</div>
            <div style={{flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10}}>
              <input style={adminStyles.input} value={m.name} onChange={e => updateMember(i, { name: e.target.value })}/>
              <input style={adminStyles.input} value={m.role} onChange={e => updateMember(i, { role: e.target.value })}/>
              <textarea style={{...adminStyles.textarea, gridColumn:"1 / -1", minHeight: 50}} value={m.bio} onChange={e => updateMember(i, { bio: e.target.value })}/>
            </div>
            <button style={{...adminStyles.btn, ...adminStyles.btnDanger}} onClick={() => removeMember(i)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}

// ───────────── Contact editor ─────────────
function ContactEditor({ content, save }) {
  const update = (patch) => save({ ...content, contact: { ...content.contact, ...patch } });
  const c = content.contact;
  return (
    <div style={adminStyles.card}>
      <h2 style={adminStyles.cardTitle}>Contact information</h2>
      <div style={adminStyles.cardSub}>Used in the site footer, About page, and the closing CTA.</div>
      <div style={{...adminStyles.fieldsetFull, marginTop: 20}}>
        <div style={adminStyles.fieldset}>
          <TextField label="Email" value={c.email} onChange={v => update({ email: v })}/>
          <TextField label="Phone" value={c.phone} onChange={v => update({ phone: v })}/>
          <TextField label="LinkedIn" value={c.linkedin} onChange={v => update({ linkedin: v })}/>
          <TextField label="Substack" value={c.substack} onChange={v => update({ substack: v })}/>
          <TextField label="Address / location" value={c.address} onChange={v => update({ address: v })}/>
        </div>
        <TextArea label="Footer tagline" value={c.tagline} onChange={v => update({ tagline: v })} rows={2}/>
      </div>
    </div>
  );
}

// ───────────── Settings ─────────────
function SettingsPanel({ resetAll, content }) {
  return (
    <>
      <div style={adminStyles.card}>
        <h2 style={adminStyles.cardTitle}>Backup & restore</h2>
        <div style={adminStyles.cardSub}>Content is stored locally in your browser. Export it before clearing browser data.</div>
        <div style={{display: "flex", gap: 10, marginTop: 16}}>
          <button style={adminStyles.btn} onClick={() => {
            const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `hyyve-content-${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}>Export content (JSON)</button>
          <label style={{...adminStyles.btn, cursor: "pointer"}}>
            Import content
            <input type="file" accept="application/json" style={{display:"none"}} onChange={async e => {
              const f = e.target.files[0];
              if (!f) return;
              const text = await f.text();
              try {
                const parsed = JSON.parse(text);
                if (confirm("Replace all content with imported data?")) {
                  saveContent(parsed);
                  alert("Imported successfully.");
                }
              } catch (err) {
                alert("That doesn't look like a valid Hyyve content file.");
              }
            }}/>
          </label>
        </div>
      </div>

      <div style={adminStyles.card}>
        <h2 style={{...adminStyles.cardTitle, color:"#B23A3A"}}>Danger zone</h2>
        <div style={adminStyles.cardSub}>Irreversible operations.</div>
        <div style={{display:"flex", gap:10, marginTop:16}}>
          <button style={{...adminStyles.btn, ...adminStyles.btnDanger}} onClick={() => {
            if (confirm("Reset ALL content to defaults? Your edits will be lost.")) resetAll();
          }}>Reset content to defaults</button>
          <button style={{...adminStyles.btn, ...adminStyles.btnDanger}} onClick={() => {
            if (confirm("Delete ALL captured briefs? This cannot be undone.")) {
              localStorage.removeItem("hyyve.briefs.v1");
              window.dispatchEvent(new Event("hyyve:briefs-updated"));
            }
          }}>Delete all briefs</button>
        </div>
      </div>
    </>
  );
}

// ───────────── App ─────────────
function AdminApp() {
  const [authed, setAuthed] = React.useState(() => sessionStorage.getItem("hyyve.admin") === "1");
  const [active, setActive] = React.useState("overview");
  const [content, setContent] = React.useState(loadContent);
  const [briefs, setBriefs] = React.useState(loadBriefs);

  React.useEffect(() => {
    const onContent = () => setContent(loadContent());
    const onBriefs = () => setBriefs(loadBriefs());
    window.addEventListener("hyyve:content-updated", onContent);
    window.addEventListener("hyyve:briefs-updated", onBriefs);
    window.addEventListener("storage", () => { onContent(); onBriefs(); });
    return () => {
      window.removeEventListener("hyyve:content-updated", onContent);
      window.removeEventListener("hyyve:briefs-updated", onBriefs);
    };
  }, []);

  const save = (next) => {
    setContent(next);
    saveContent(next);
  };

  const handleUpdateBrief = (id, patch) => {
    updateBrief(id, patch);
    setBriefs(loadBriefs());
  };
  const handleDeleteBrief = (id) => {
    deleteBrief(id);
    setBriefs(loadBriefs());
  };
  const resetAll = () => {
    resetContent();
    setContent(loadContent());
  };

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)}/>;

  const titles = {
    overview:  ["Overview", "How the site is doing right now"],
    briefs:    ["Briefs", "Submissions captured by the homepage Brief wizard"],
    solutions: ["Solutions", "What appears on the Solutions page and homepage cells"],
    customers: ["Customers", "Logos, blurbs, and quotes shown across the site"],
    about:     ["About page", "Story, principles, and team displayed on About"],
    contact:   ["Contact info", "Email, phone, social — used in footer and CTA"],
    settings:  ["Settings", "Backup, restore, and danger zone"],
  };
  const [title, desc] = titles[active];

  return (
    <div style={adminStyles.app}>
      <Sidebar
        active={active}
        setActive={setActive}
        briefCount={briefs.filter(b => b.status === "new").length}
        onLogout={() => { sessionStorage.removeItem("hyyve.admin"); setAuthed(false); }}
      />
      <div style={adminStyles.main}>
        <Topbar title={title} desc={desc}/>
        <div style={adminStyles.content}>
          {active === "overview"  && <Overview content={content} briefs={briefs} setActive={setActive}/>}
          {active === "briefs"    && <BriefsPanel briefs={briefs} onUpdate={handleUpdateBrief} onDelete={handleDeleteBrief}/>}
          {active === "solutions" && <SolutionsEditor content={content} save={save}/>}
          {active === "customers" && <CustomersEditor content={content} save={save}/>}
          {active === "about"     && <AboutEditor content={content} save={save}/>}
          {active === "contact"   && <ContactEditor content={content} save={save}/>}
          {active === "settings"  && <SettingsPanel content={content} resetAll={resetAll}/>}
        </div>
      </div>
    </div>
  );
}

window.AdminApp = AdminApp;
