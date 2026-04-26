export default function Home() {
  return (
    <main className="p-14">
      <span className="label-mono text-slate-500">— design tokens smoke test</span>
      <h1 className="display display-light text-ink mt-4" style={{ fontSize: 96, lineHeight: 0.93, letterSpacing: "-0.04em" }}>
        Tell us the work<br />you wish you<br /><em className="text-amber-deep">didn't have to do.</em>
      </h1>
      <p className="mt-8 text-slate-700 max-w-[540px]" style={{ fontSize: 19, lineHeight: 1.55 }}>
        If this paragraph is in Inter Tight on a paper-tint background, the smoke test passes.
      </p>
    </main>
  );
}
