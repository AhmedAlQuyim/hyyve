import type { Solution } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export function SolutionDetail({ solution, index }: { solution: Solution; index: number }) {
  return (
    <section id={solution.id} className="px-6 md:px-14 py-16 md:py-24 border-t border-slate-200 scroll-mt-24">
      <LabelMono className="text-slate-500">— 0{index + 1} / {solution.title}</LabelMono>
      <h2 className="display mt-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 800 }}>
        {solution.tagline}
      </h2>
      <p className="mt-6 text-slate-700 max-w-[760px]" style={{ fontSize: 18, lineHeight: 1.6 }}>
        {solution.description}
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {solution.capabilities.map(cap => (
          <div key={cap.name} className="border border-slate-200 bg-paper rounded-2xl p-6">
            <h3 className="display m-0" style={{ fontSize: 20, letterSpacing: "-0.01em" }}>{cap.name}</h3>
            <p className="mt-2 text-slate-700" style={{ fontSize: 14, lineHeight: 1.55 }}>{cap.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
