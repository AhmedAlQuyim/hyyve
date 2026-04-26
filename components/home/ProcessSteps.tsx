import { LabelMono } from "@/components/ui/LabelMono";

const STEPS: Array<[string, string, string]> = [
  ["Day 0",   "The Brief",   "You describe the work — here on the page or in a 30-min call. Our concierge agent scopes it in real time."],
  ["Wk 1–2",  "Diagnostic",  "We sit with your team, map the process, and confirm the agent's job description before any code is written."],
  ["Wk 3–10", "Build",       "Two-week loops. Real users, real data, real tools — from the first sprint forward. No demos."],
  ["Wk 11+",  "Steward",     "We stay on for 90 days, then hand the keys to your team. Or stick around longer — your call."],
];

export function ProcessSteps() {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28">
      <LabelMono className="text-slate-500">— 02 / How it works</LabelMono>
      <h2 className="display mt-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 800 }}>
        Four steps. Two of them<br />are coffee.
      </h2>
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-3xl overflow-hidden">
        {STEPS.map(([day, title, copy], i) => (
          <div
            key={day}
            className="p-8 bg-paper flex flex-col gap-3.5 min-h-[220px]"
            style={{ borderRight: i < STEPS.length - 1 ? "1px solid var(--color-slate-200)" : undefined }}
          >
            <LabelMono className="text-amber-deep">{day}</LabelMono>
            <h3 className="display m-0" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{title}</h3>
            <p className="m-0 text-slate-700" style={{ fontSize: 13.5, lineHeight: 1.55 }}>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
