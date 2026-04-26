import { getContact } from "@/lib/content";
import { Logo } from "./Logo";
import { LabelMono } from "@/components/ui/LabelMono";

export async function Footer() {
  const contact = await getContact();
  return (
    <footer className="px-6 md:px-14 py-16 border-t border-slate-200 grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]">
      <div>
        <Logo size={28} />
        <p className="mt-3 text-[13px] text-slate-700 max-w-[280px]">{contact.tagline}</p>
      </div>
      <FooterCol title="Studio" items={["About", "Field notes", "Careers"]} />
      <FooterCol title="Solutions" items={["Automation", "Agentic systems", "Consultation"]} />
      <div className="text-[13px] text-slate-700 leading-loose">
        <LabelMono className="text-slate-500 block mb-3">Reach</LabelMono>
        <div>{contact.email}</div>
        <div>LinkedIn · Substack</div>
        <div className="mt-3 text-[11px] text-slate-500">© 2026 Hyyve Studio Ltd.</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="text-[13px] text-slate-700 leading-loose">
      <LabelMono className="text-slate-500 block mb-3">{title}</LabelMono>
      {items.map(i => <div key={i}>{i}</div>)}
    </div>
  );
}
