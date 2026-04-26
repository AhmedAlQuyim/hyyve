import Link from "next/link";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="display display-light text-ink no-underline" style={{ fontSize: size, letterSpacing: "-0.04em" }}>
      hyyve<span className="text-amber">.</span>
    </Link>
  );
}
