import { getAbout } from "@/lib/content";
import { Principles } from "@/components/about/Principles";
import { Team } from "@/components/about/Team";
import { LabelMono } from "@/components/ui/LabelMono";

export const metadata = { title: "About — hyyve." };

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <main>
      <section className="px-6 md:px-14 pt-16 md:pt-24 pb-12">
        <LabelMono className="text-slate-500">— About</LabelMono>
        <h1
          className="display display-light mt-4"
          style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.04em", fontVariationSettings: "'opsz' 144" }}
        >
          {about.headline}
        </h1>
        <p className="mt-8 text-slate-700 max-w-[760px]" style={{ fontSize: 19, lineHeight: 1.6 }}>
          {about.intro}
        </p>
      </section>
      <Principles principles={about.principles} />
      <Team team={about.team} />
    </main>
  );
}
