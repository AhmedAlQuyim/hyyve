import { getSolutions } from "@/lib/content";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";
import { LabelMono } from "@/components/ui/LabelMono";
import { StartBriefButton } from "@/components/brief/StartBriefButton";

export const metadata = { title: "Solutions — hyyve." };

export default async function SolutionsPage() {
  const solutions = await getSolutions();
  return (
    <main>
      <section className="px-6 md:px-14 pt-16 md:pt-24 pb-12">
        <LabelMono className="text-slate-500">— Solutions</LabelMono>
        <h1
          className="display display-light mt-4"
          style={{ fontSize: "clamp(56px, 9vw, 120px)", lineHeight: 0.93, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144" }}
        >
          Three cells, one hive.
        </h1>
        <p className="mt-6 text-slate-700 max-w-[680px]" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Whatever shape your work takes — repeatable, complex, or strategic — there&apos;s a Hyyve service lane built for it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <StartBriefButton className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-amber text-midnight text-base font-semibold">
            Start a Brief →
          </StartBriefButton>
        </div>
      </section>
      {solutions.map((s, i) => <SolutionDetail key={s.id} solution={s} index={i} />)}
    </main>
  );
}
