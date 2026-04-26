import Link from "next/link";
import { LabelMono } from "@/components/ui/LabelMono";
import { CellIcon } from "./CellIcon";
import { getSolutions } from "@/lib/content";

const SUMMARIES: Record<string, { copy: string; bullets: string[]; linkLabel: string; linkHash: string }> = {
  automation: {
    copy: "The repeatable work — invoicing, reconciliation, lead routing, ticket triage. We replace it with agents that learn the rules, then keep getting better.",
    bullets: ["— Process discovery", "— Agent design & build", "— Tool & data integration", "— Stewardship & QA"],
    linkLabel: "Explore automation →",
    linkHash: "#automation",
  },
  agentic: {
    copy: "Multi-agent setups that plan, decide, and execute. Bespoke architectures for the complex, judgement-heavy work — research, sales ops, supply chain.",
    bullets: ["— Architecture & planning", "— Custom tool servers", "— Multi-agent orchestration", "— Eval & observability"],
    linkLabel: "Explore agentic →",
    linkHash: "#agentic",
  },
  consultation: {
    copy: "For leadership wrestling with where AI should sit in the org. Five-week engagements, one tight deliverable: a roadmap your team can ship.",
    bullets: ["— Opportunity mapping", "— ROI modeling", "— Vendor / build assessment", "— 12-month roadmap"],
    linkLabel: "Explore consulting →",
    linkHash: "#consultation",
  },
};

export async function SolutionsGrid() {
  const solutions = await getSolutions();
  return (
    <section className="px-6 md:px-14 py-20 md:py-28">
      <LabelMono className="text-slate-500">— 01 / Our Solutions</LabelMono>
      <h2 className="display mt-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 800 }}>
        Three cells, one hive.<br />
        Whatever shape the work takes.
      </h2>
      <div className="mt-14 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map(s => {
          const meta = SUMMARIES[s.id];
          return (
            <div key={s.id} className="border border-slate-200 bg-paper rounded-3xl p-8 min-h-[360px] flex flex-col gap-4 transition-all">
              <CellIcon type={s.id} />
              <h3 className="display m-0" style={{ fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p className="text-slate-700" style={{ fontSize: 15, lineHeight: 1.55 }}>{meta.copy}</p>
              <ul className="font-mono text-slate-500 list-none p-0 m-0" style={{ fontSize: 12, lineHeight: 1.9, letterSpacing: "0.04em" }}>
                {meta.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <Link href={`/solutions${meta.linkHash}`} className="mt-auto pt-3 border-t border-slate-200 text-ink no-underline font-medium text-sm inline-flex items-center gap-2">
                {meta.linkLabel}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
