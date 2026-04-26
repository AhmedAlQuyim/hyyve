import { LabelMono } from "@/components/ui/LabelMono";
import { StartBriefButton } from "@/components/brief/StartBriefButton";

export function FinalCta() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-6 md:mx-14 px-6 md:px-14 py-20 md:py-28 bg-midnight text-paper rounded-3xl relative overflow-hidden">
        <LabelMono className="text-amber block mb-6">— The fastest way to know</LabelMono>
        <h2
          className="display display-light m-0 text-paper"
          style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em", maxWidth: 820 }}
        >
          The fastest way to know<br />
          if we can help is to&nbsp;<em className="text-amber" style={{ fontStyle: "italic" }}>ask</em>.
        </h2>
        <p className="text-slate-300 mt-6 max-w-[560px]" style={{ fontSize: 18 }}>
          The Brief takes about three minutes. Five questions, real answers, a scoped engagement at the end. No sales call required to start.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <StartBriefButton className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-amber text-midnight text-base font-semibold">
            Start a Brief →
          </StartBriefButton>
          <button className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-transparent text-paper border border-paper/25 text-base font-medium">
            Book a partner call
          </button>
        </div>
      </div>
    </section>
  );
}
