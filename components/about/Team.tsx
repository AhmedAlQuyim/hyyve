import type { TeamMember } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export function Team({ team }: { team: TeamMember[] }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28 border-t border-slate-200">
      <LabelMono className="text-slate-500">— The team</LabelMono>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map(m => (
          <div key={m.name} className="border border-slate-200 bg-paper rounded-2xl p-6">
            <div className="w-14 h-14 rounded-full mb-4" style={{ background: "linear-gradient(135deg, var(--color-amber-soft), var(--color-amber-deep))" }} />
            <h3 className="display m-0" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{m.name}</h3>
            <LabelMono className="text-slate-500 block mt-1">{m.role}</LabelMono>
            <p className="mt-3 text-slate-700" style={{ fontSize: 14, lineHeight: 1.55 }}>{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
