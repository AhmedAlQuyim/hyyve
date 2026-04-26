// Brief Wizard — full-screen modal that runs a 5-question discovery
// powered by Claude. At the end: scoped brief + book-a-call + downloadable text.

const briefStyles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(11,18,32,.55)",
    backdropFilter: "blur(8px)",
    zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 32,
  },
  modal: {
    width: "min(960px, 100%)",
    maxHeight: "92vh",
    background: "var(--paper)",
    border: "1px solid var(--slate-200)",
    borderRadius: 28,
    display: "flex", flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 60px 120px -30px rgba(0,0,0,.5)",
  },
  header: {
    padding: "20px 28px",
    borderBottom: "1px solid var(--slate-200)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexShrink: 0,
  },
  headerL: { display: "flex", alignItems: "center", gap: 12 },
  headerTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 18,
    letterSpacing: "-.005em",
  },
  headerMeta: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--slate-500)",
    letterSpacing: ".08em", textTransform: "uppercase", marginTop: 2,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: "50%",
    border: "1px solid var(--slate-200)",
    background: "transparent", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--slate-700)", fontSize: 18,
  },
  progress: {
    height: 3,
    background: "var(--slate-100)",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    background: "var(--amber)",
    transition: "width .4s cubic-bezier(.2,.7,.2,1)",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 28px",
    display: "flex", flexDirection: "column", gap: 18,
  },
  msgRow: { display: "flex", gap: 12, alignItems: "flex-start" },
  msgRowEnd: { justifyContent: "flex-end" },
  avatar: {
    width: 32, height: 32, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  bubble: {
    padding: "14px 18px",
    borderRadius: 18,
    maxWidth: 640,
    fontSize: 15, lineHeight: 1.55,
    whiteSpace: "pre-wrap",
  },
  bubbleAgent: {
    background: "var(--paper-2)", color: "var(--ink)",
    borderTopLeftRadius: 6,
  },
  bubbleUser: {
    background: "var(--midnight)", color: "var(--paper)",
    borderTopRightRadius: 6,
  },
  typing: {
    display: "inline-flex", gap: 4, alignItems: "center",
    padding: "16px 18px",
  },
  typingDot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "var(--slate-500)",
  },
  inputRow: {
    padding: "16px 28px 24px",
    borderTop: "1px solid var(--slate-200)",
    flexShrink: 0,
    background: "var(--paper)",
  },
  inputWrap: {
    background: "var(--paper-tint)",
    border: "1px solid var(--slate-200)",
    borderRadius: 22,
    padding: "10px 10px 10px 18px",
    display: "flex", alignItems: "flex-end", gap: 10,
  },
  textarea: {
    flex: 1, border: "none", outline: "none", background: "transparent",
    fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink)",
    resize: "none", lineHeight: 1.5, padding: "8px 0",
    maxHeight: 120, minHeight: 24,
  },
  sendBtn: {
    background: "var(--midnight)", color: "var(--paper)",
    border: "none", borderRadius: 999,
    padding: "10px 18px", fontSize: 13, fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 8,
    cursor: "pointer", flexShrink: 0,
  },
  sendBtnDisabled: { opacity: .35, cursor: "not-allowed" },
  hint: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--slate-500)",
    letterSpacing: ".08em", textTransform: "uppercase",
    marginTop: 10, display: "flex", justifyContent: "space-between",
  },
  // Brief output card
  briefCard: {
    border: "1px solid var(--slate-200)",
    background: "var(--paper-tint)",
    borderRadius: 20,
    padding: 24,
    marginTop: 4,
  },
  briefEyebrow: {
    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--amber-deep)",
    letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8,
  },
  briefTitle: {
    fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 24,
    lineHeight: 1.15, letterSpacing: "-.015em", margin: "0 0 14px",
  },
  briefMeta: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
    paddingTop: 14, marginTop: 14, borderTop: "1px solid var(--slate-200)",
  },
  briefMetaCell: {},
  briefMetaLabel: {
    fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--slate-500)",
    letterSpacing: ".1em", textTransform: "uppercase",
  },
  briefMetaValue: {
    fontFamily: "var(--font-display)", fontSize: 18, marginTop: 4,
    color: "var(--ink)",
  },
  briefActions: {
    display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap",
  },
  briefBtnPrimary: {
    background: "var(--amber)", color: "var(--midnight)",
    border: "none", borderRadius: 999,
    padding: "12px 20px", fontSize: 14, fontWeight: 600,
    display: "inline-flex", alignItems: "center", gap: 8,
    cursor: "pointer",
  },
  briefBtnSec: {
    background: "transparent", color: "var(--ink)",
    border: "1px solid var(--slate-300)",
    borderRadius: 999, padding: "12px 20px", fontSize: 14, fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 8,
    cursor: "pointer",
  },
};

function HexBadge({size=32, glow=true, pulse=false}) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <polygon points="18,2 32,10 32,26 18,34 4,26 4,10"
               stroke="var(--midnight)" strokeWidth="1.5" fill="var(--paper)"/>
      <circle cx="18" cy="18" r="4" fill="var(--amber)">
        {pulse && <animate attributeName="r" values="3;5;3" dur="1.4s" repeatCount="indefinite"/>}
      </circle>
    </svg>
  );
}

const QUESTIONS = [
  { key: "process",  prompt: "Welcome — I'm the Hyyve concierge. I'll ask five quick questions and put together a real brief by the end. First — describe the process or work that's eating your team's time. Specifics help: what gets done, how often, and roughly how long it takes." },
  { key: "tools",    prompt: "Got it — thank you. Which tools, systems, or data sources are involved? (e.g. Salesforce, NetSuite, email inboxes, internal docs, voice/phone, spreadsheets, etc.)" },
  { key: "team",     prompt: "Helpful. How big is the team that owns this work today, and roughly what does it cost — in hours or headcount — each week?" },
  { key: "outcome",  prompt: "Now the most important one — what would a good outcome look like in 90 days? Faster cycle time, fewer escalations, freeing people for other work, hitting an SLA? Be specific if you can." },
  { key: "contact",  prompt: "Last step. Share your name, work email, and company so I can route this brief to a partner who can confirm it by Thursday." },
];

const SYSTEM_PROMPT = `You are the Hyyve concierge — a strategy agent built by Hyyve, an AI consultancy that designs agents and automation for mid-market businesses. Your tone is calm, friendly, and quietly energetic, with the formal precision of a senior consultant. Plain English. Never marketing-speak.

You will be given the user's answers to 5 discovery questions about a process they want to automate. Your job is to produce a SCOPED BRIEF in JSON format with these exact fields:

{
  "title": "<a short evocative project title, like 'Logistics reconciliation hive' — max 7 words>",
  "lane": "<one of: 'Automation' | 'Agentic systems' | 'Consultation'>",
  "summary": "<2-3 sentence summary of what we'd build, in plain English>",
  "agents": ["<agent 1 — short name + 1-line role>", "<agent 2>", "<agent 3>"],
  "timeline": "<estimated weeks, e.g. '8–11 weeks'>",
  "investment": "<rough range, e.g. '$48k–$72k'>",
  "savings": "<plausible 12-month savings projection, e.g. '~840 ops hours/yr'>",
  "next_step": "<one sentence on what happens next>"
}

Be realistic and specific based on what the user told you. Don't oversell. If their problem is too vague or too small, say so honestly in the summary. Output ONLY the JSON, no other text.`;

function TypingIndicator() {
  return (
    <div style={briefStyles.msgRow}>
      <div style={briefStyles.avatar}><HexBadge size={28} pulse={true}/></div>
      <div style={{...briefStyles.bubble, ...briefStyles.bubbleAgent, ...briefStyles.typing}}>
        <span style={{...briefStyles.typingDot, animation: "hyyve-bounce 1.2s -0.32s infinite"}}></span>
        <span style={{...briefStyles.typingDot, animation: "hyyve-bounce 1.2s -0.16s infinite"}}></span>
        <span style={{...briefStyles.typingDot, animation: "hyyve-bounce 1.2s 0s infinite"}}></span>
      </div>
    </div>
  );
}

function BriefResultCard({ brief, answers }) {
  const downloadBrief = () => {
    const text = `HYYVE — SCOPED BRIEF
Generated ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}

${brief.title}
Service lane: ${brief.lane}

SUMMARY
${brief.summary}

PROPOSED AGENTS
${brief.agents.map((a,i) => `  ${i+1}. ${a}`).join('\n')}

TIMELINE        ${brief.timeline}
INVESTMENT      ${brief.investment}
12-MO SAVINGS   ${brief.savings}

NEXT STEP
${brief.next_step}

—————

CLIENT INPUTS

Process described:
${answers.process || '—'}

Tools & systems:
${answers.tools || '—'}

Team & cost today:
${answers.team || '—'}

90-day outcome:
${answers.outcome || '—'}

Contact:
${answers.contact || '—'}

—————
hyyve · hello@hyyve.co
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hyyve-brief-${brief.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={briefStyles.briefCard}>
      <div style={briefStyles.briefEyebrow}>— Scoped brief · {brief.lane}</div>
      <h3 style={briefStyles.briefTitle}>{brief.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--slate-700)", margin: "0 0 14px" }}>
        {brief.summary}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {brief.agents.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--ink)" }}>
            <span style={{ color: "var(--amber-deep)", fontFamily: "var(--font-mono)", fontSize: 11, paddingTop: 2 }}>
              0{i+1}
            </span>
            <span>{a}</span>
          </div>
        ))}
      </div>
      <div style={briefStyles.briefMeta}>
        <div>
          <div style={briefStyles.briefMetaLabel}>Timeline</div>
          <div style={briefStyles.briefMetaValue}>{brief.timeline}</div>
        </div>
        <div>
          <div style={briefStyles.briefMetaLabel}>Investment</div>
          <div style={briefStyles.briefMetaValue}>{brief.investment}</div>
        </div>
        <div>
          <div style={briefStyles.briefMetaLabel}>12-mo savings</div>
          <div style={briefStyles.briefMetaValue}>{brief.savings}</div>
        </div>
      </div>
      <div style={briefStyles.briefActions}>
        <button style={briefStyles.briefBtnPrimary} onClick={() => alert("Calendar booking coming soon — for now, email hello@hyyve.co")}>
          Book partner call <span style={{fontSize:12}}>→</span>
        </button>
        <button style={briefStyles.briefBtnSec} onClick={downloadBrief}>
          Download brief <span style={{fontSize:12}}>↓</span>
        </button>
      </div>
    </div>
  );
}

function BriefWizard({ onClose }) {
  const [messages, setMessages] = React.useState([
    { role: "agent", text: QUESTIONS[0].prompt },
  ]);
  const [answers, setAnswers] = React.useState({});
  const [step, setStep] = React.useState(0); // index of question being answered
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [brief, setBrief] = React.useState(null);
  const [error, setError] = React.useState(null);
  const bodyRef = React.useRef(null);
  const taRef = React.useRef(null);

  // auto-scroll on new messages
  React.useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, thinking, brief]);

  // focus textarea
  React.useEffect(() => { taRef.current?.focus(); }, [step]);

  const progress = brief ? 100 : (step / QUESTIONS.length) * 100;
  const stepLabel = brief ? "Brief ready" : `Question ${step + 1} of ${QUESTIONS.length}`;

  const handleSend = async () => {
    const txt = input.trim();
    if (!txt || thinking) return;

    const currentQ = QUESTIONS[step];
    const newAnswers = { ...answers, [currentQ.key]: txt };

    setMessages(m => [...m, { role: "user", text: txt }]);
    setAnswers(newAnswers);
    setInput("");

    if (step < QUESTIONS.length - 1) {
      // move to next question
      setThinking(true);
      await new Promise(r => setTimeout(r, 700));
      setMessages(m => [...m, { role: "agent", text: QUESTIONS[step + 1].prompt }]);
      setThinking(false);
      setStep(step + 1);
    } else {
      // generate brief
      setThinking(true);
      setMessages(m => [...m, { role: "agent", text: "Thank you. Drafting your brief now — give me a moment to think it through." }]);
      try {
        const userPayload = `Here are the discovery answers:

PROCESS:
${newAnswers.process}

TOOLS & SYSTEMS:
${newAnswers.tools}

TEAM & COST:
${newAnswers.team}

90-DAY OUTCOME:
${newAnswers.outcome}

CONTACT:
${newAnswers.contact}

Now produce the scoped brief JSON.`;

        const result = await window.claude.complete({
          messages: [
            { role: "user", content: SYSTEM_PROMPT + "\n\n" + userPayload },
          ],
        });

        // try to parse JSON — model sometimes wraps in fences
        let parsed = null;
        const cleaned = result.replace(/```json\s*|\s*```/g, '').trim();
        try { parsed = JSON.parse(cleaned); }
        catch (e) {
          // try to extract first {...} block
          const m = cleaned.match(/\{[\s\S]*\}/);
          if (m) parsed = JSON.parse(m[0]);
        }

        if (!parsed) throw new Error("Couldn't parse brief.");

        setBrief(parsed);
        // capture for admin
        if (window.saveBrief) {
          window.saveBrief({ brief: parsed, answers: newAnswers });
        }
        setMessages(m => [...m, { role: "agent", text: "Here's your scoped brief. You can download it as a text file or book a partner call directly." }]);
      } catch (e) {
        setError(e.message);
        setMessages(m => [...m, { role: "agent", text: "Hmm — I had trouble drafting the brief just now. Could you email hello@hyyve.co and I'll have a partner reach out within the day?" }]);
      } finally {
        setThinking(false);
      }
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
    // auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(120, e.target.scrollHeight) + "px";
  };

  return (
    <div style={briefStyles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={briefStyles.modal}>
        <div style={briefStyles.header}>
          <div style={briefStyles.headerL}>
            <HexBadge pulse={!brief} />
            <div>
              <div style={briefStyles.headerTitle}>The Brief · hyyve concierge</div>
              <div style={briefStyles.headerMeta}>{stepLabel}</div>
            </div>
          </div>
          <button style={briefStyles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div style={briefStyles.progress}>
          <div style={{...briefStyles.progressBar, width: `${progress}%`}}/>
        </div>

        <div style={briefStyles.body} ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} style={{
              ...briefStyles.msgRow,
              ...(m.role === "user" ? briefStyles.msgRowEnd : {}),
            }}>
              {m.role === "agent" && <div style={briefStyles.avatar}><HexBadge size={28} pulse={false}/></div>}
              <div style={{
                ...briefStyles.bubble,
                ...(m.role === "agent" ? briefStyles.bubbleAgent : briefStyles.bubbleUser),
              }}>
                {m.text}
              </div>
              {m.role === "user" && (
                <div style={{...briefStyles.avatar, background: "var(--slate-100)", borderRadius: "50%"}}>
                  <span style={{fontSize: 13, fontWeight: 600, color: "var(--slate-700)"}}>YOU</span>
                </div>
              )}
            </div>
          ))}
          {thinking && <TypingIndicator/>}
          {brief && <BriefResultCard brief={brief} answers={answers}/>}
        </div>

        {!brief && (
          <div style={briefStyles.inputRow}>
            <div style={briefStyles.inputWrap}>
              <textarea
                ref={taRef}
                style={briefStyles.textarea}
                value={input}
                onChange={onChange}
                onKeyDown={handleKey}
                placeholder={step === 4 ? "Maren Holst · maren@lyramfg.com · Lyra Manufacturing" : "Type your answer… (Enter to send, Shift+Enter for newline)"}
                disabled={thinking}
                rows={1}
              />
              <button
                style={{...briefStyles.sendBtn, ...((!input.trim() || thinking) ? briefStyles.sendBtnDisabled : {})}}
                onClick={handleSend}
                disabled={!input.trim() || thinking}
              >
                Send <span style={{fontSize:11}}>→</span>
              </button>
            </div>
            <div style={briefStyles.hint}>
              <span>Powered by Hyyve concierge agent</span>
              <span>{step+1} / {QUESTIONS.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.BriefWizard = BriefWizard;
