import { getCustomers } from "@/lib/content";
import { LabelMono } from "@/components/ui/LabelMono";

export async function QuoteBlock() {
  const customers = await getCustomers();
  const featured = customers.find(c => c.id === "lyra")!;
  const [name, role] = featured.attribution.split(" · ");

  return (
    <section className="px-6 md:px-14 py-20 md:py-28 bg-paper-2 text-center">
      <LabelMono className="text-slate-500">— What customers say</LabelMono>
      <blockquote
        className="display display-light mx-auto mt-4"
        style={{ fontSize: "clamp(28px, 4.5vw, 48px)", lineHeight: 1.18, letterSpacing: "-0.02em", maxWidth: 1100, fontVariationSettings: "'opsz' 144" }}
      >
        &ldquo;We thought we were buying agents. We ended up with a&nbsp;team that{" "}
        <em className="text-amber-deep">understands our operations</em>{" "}
        better than most of our&nbsp;own people&nbsp;do.&rdquo;
      </blockquote>
      <div className="mt-10 flex items-center justify-center gap-3.5">
        <div className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, var(--color-amber-soft), var(--color-amber-deep))" }} />
        <div className="text-left">
          <div className="font-medium">{name}</div>
          <LabelMono className="text-slate-500" >{role} · {featured.name}</LabelMono>
        </div>
      </div>
    </section>
  );
}
