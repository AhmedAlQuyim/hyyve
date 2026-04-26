import { LabelMono } from "@/components/ui/LabelMono";
import { LiveDot } from "@/components/ui/LiveDot";
import { StartBriefButton } from "@/components/brief/StartBriefButton";
import { LiveNetwork } from "./LiveNetwork";
import Link from "next/link";

export function Hero() {
  return (
    <section className="px-6 md:px-14 pt-12 md:pt-20 pb-12 md:pb-16 grid gap-10 md:gap-12 lg:grid-cols-[1.15fr_1fr] items-center">
      <div>
        <LabelMono className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-paper-2 border border-slate-200 text-slate-500">
          <LiveDot />
          AI consultancy · Made for mid-market ops
        </LabelMono>

        <h1
          className="display display-light mt-8"
          style={{
            fontSize: "clamp(56px, 9vw, 120px)",
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            fontVariationSettings: "'opsz' 144",
          }}
        >
          Tell us the work<br />
          you wish you<br />
          <em className="text-amber-deep" style={{ fontStyle: "italic" }}>
            didn&apos;t have to do.
          </em>
        </h1>

        <p className="mt-8 text-slate-700 max-w-[540px]" style={{ fontSize: 19, lineHeight: 1.55 }}>
          Hyyve designs and ships the AI agents and automations that mid-market teams use every day.
          Skip the discovery deck — describe the work, and we&apos;ll come back with a real, scoped brief.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <StartBriefButton className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-amber text-midnight text-base font-semibold">
            Start a Brief →
          </StartBriefButton>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-transparent text-ink border border-slate-300 text-base font-medium no-underline"
          >
            Our Solutions →
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <LiveNetwork />
      </div>
    </section>
  );
}
