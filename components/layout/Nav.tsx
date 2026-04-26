"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { StartBriefButton } from "@/components/brief/StartBriefButton";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "#",          label: "Customers" }, // matches prototype — no destination yet
  { href: "/about",     label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-5 border-b border-slate-200"
      style={{ background: "rgba(251,249,244,.7)", backdropFilter: "blur(12px)" }}
    >
      <Logo />

      <div className="hidden md:flex gap-9 text-sm font-medium">
        {links.map(l => (
          <Link key={l.label} href={l.href} className="text-ink no-underline">{l.label}</Link>
        ))}
      </div>

      <div className="hidden md:block">
        <StartBriefButton className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-midnight text-paper text-sm font-medium">
          Start a Brief
          <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[11px]" style={{ background: "rgba(255,255,255,.15)" }}>→</span>
        </StartBriefButton>
      </div>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden p-2"
        onClick={() => setOpen(v => !v)}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-paper-tint border-b border-slate-200 md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {links.map(l => (
              <Link key={l.label} href={l.href} className="text-ink no-underline text-base" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <StartBriefButton className="mt-2 inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-midnight text-paper text-sm font-medium">
              Start a Brief →
            </StartBriefButton>
          </div>
        </div>
      )}
    </nav>
  );
}
