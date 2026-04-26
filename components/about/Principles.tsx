import type { Principle } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export function Principles({ principles }: { principles: Principle[] }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28 border-t border-slate-200">
      <LabelMono className="text-slate-500">— How we work</LabelMono>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {principles.map(p => (
          <div key={p.title}>
            <h3 className="display m-0" style={{ fontSize: 28, letterSpacing: "-0.015em", lineHeight: 1.15 }}>{p.title}</h3>
            <p className="mt-3 text-slate-700" style={{ fontSize: 16, lineHeight: 1.6 }}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
