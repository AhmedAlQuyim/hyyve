"use client";

import { useEffect, useState } from "react";
import { LabelMono } from "@/components/ui/LabelMono";
import { LiveDot } from "@/components/ui/LiveDot";

const TICKS = [
  "Reconciling 240 invoices · Lyra Mfg · 2s ago",
  "Drafting 18 sales briefs · Northwind · just now",
  "Triaging 312 support tickets · VERA · 4s ago",
  "QA-ing 47 outbound calls · Halberd&Co · just now",
  "Routing 96 inbound emails · Plinth · 1s ago",
];

export function LiveNetwork() {
  const [tickIdx, setTickIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTickIdx((t) => (t + 1) % TICKS.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="relative w-full max-w-[600px] justify-self-end rounded-[28px] border border-slate-200 overflow-hidden p-6"
      style={{
        aspectRatio: "1 / 1",
        background:
          "linear-gradient(135deg, var(--color-paper) 0%, var(--color-paper-2) 100%)",
      }}
    >
      <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-tint border border-slate-200">
        <LiveDot />
        <LabelMono className="text-slate-500">47 agents · live</LabelMono>
      </div>

      <svg viewBox="0 0 560 560" width="100%" height="100%" className="block">
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,169,92,.3)" />
            <stop offset="100%" stopColor="rgba(232,169,92,0)" />
          </radialGradient>
          <pattern id="hgrid" width="80" height="92.4" patternUnits="userSpaceOnUse">
            <polygon
              points="40,2 78,24 78,68 40,90 2,68 2,24"
              fill="none"
              stroke="rgba(15,27,51,.18)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="560" height="560" fill="url(#hgrid)" />
        <circle cx="280" cy="280" r="220" fill="url(#ng)" />

        {/* connecting lines */}
        <g stroke="rgba(232,169,92,.55)" strokeWidth="1" strokeDasharray="3,5">
          <line x1="280" y1="280" x2="160" y2="200">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="400" y2="200">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.2s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="160" y2="360">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="400" y2="360">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>
        <g stroke="rgba(15,27,51,.4)" strokeWidth="1" strokeDasharray="3,5">
          <line x1="280" y1="280" x2="280" y2="120">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.4s" repeatCount="indefinite" />
          </line>
          <line x1="280" y1="280" x2="280" y2="440">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.9s" repeatCount="indefinite" />
          </line>
        </g>

        {/* outer cells (faint) */}
        <g stroke="rgba(15,27,51,.18)" fill="none" strokeWidth="1">
          <polygon points="80,80 120,103 120,150 80,173 40,150 40,103" />
          <polygon points="480,80 520,103 520,150 480,173 440,150 440,103" />
          <polygon points="80,387 120,410 120,457 80,480 40,457 40,410" />
          <polygon points="480,387 520,410 520,457 480,457 480,457 480,387" />
          <polygon points="280,40 320,63 320,110 280,133 240,110 240,63" />
          <polygon points="280,427 320,450 320,497 280,520 240,497 240,450" />
        </g>

        {/* mid cells */}
        <g>
          <polygon
            points="160,160 200,183 200,230 160,253 120,230 120,183"
            stroke="rgba(15,27,51,.4)"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="160" cy="207" r="3.5" fill="var(--color-midnight)" />
          <text x="160" y="148" textAnchor="middle" fontSize="9" fill="rgba(15,27,51,.5)" fontFamily="JetBrains Mono" letterSpacing="1">
            CRM
          </text>

          <polygon
            points="400,160 440,183 440,230 400,253 360,230 360,183"
            stroke="rgba(15,27,51,.4)"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="400" cy="207" r="3.5" fill="var(--color-midnight)" />
          <text x="400" y="148" textAnchor="middle" fontSize="9" fill="rgba(15,27,51,.5)" fontFamily="JetBrains Mono" letterSpacing="1">
            ERP
          </text>

          <polygon
            points="160,320 200,343 200,390 160,413 120,390 120,343"
            stroke="rgba(15,27,51,.4)"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="160" cy="367" r="3.5" fill="var(--color-midnight)" />
          <text x="160" y="426" textAnchor="middle" fontSize="9" fill="rgba(15,27,51,.5)" fontFamily="JetBrains Mono" letterSpacing="1">
            DOCS
          </text>

          <polygon
            points="400,320 440,343 440,390 400,413 360,390 360,343"
            stroke="rgba(15,27,51,.4)"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="400" cy="367" r="3.5" fill="var(--color-midnight)" />
          <text x="400" y="426" textAnchor="middle" fontSize="9" fill="rgba(15,27,51,.5)" fontFamily="JetBrains Mono" letterSpacing="1">
            CHAT
          </text>
        </g>

        {/* center cell — active */}
        <g>
          <polygon
            points="280,210 340,243 340,317 280,350 220,317 220,243"
            fill="rgba(232,169,92,.18)"
            stroke="#E8A95C"
            strokeWidth="2"
          />
          <circle cx="280" cy="280" r="10" fill="#E8A95C">
            <animate attributeName="r" values="7;14;7" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;.4;1" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="280" r="5" fill="var(--color-paper)" />
          <text x="280" y="200" textAnchor="middle" fontSize="11" fill="#E8A95C" fontFamily="JetBrains Mono" letterSpacing="1.5">
            HYYVE
          </text>
        </g>
      </svg>

      <div
        className="absolute bottom-4 left-4 right-4 backdrop-blur rounded-2xl px-4 h-10 flex items-center gap-2.5 font-mono text-[11px] text-slate-700"
        style={{ background: "rgba(244,242,236,.85)", border: "1px solid var(--color-slate-200)" }}
      >
        <LiveDot />
        <span key={tickIdx} style={{ animation: "hyyve-tickin .5s ease both" }}>
          {TICKS[tickIdx]}
        </span>
      </div>
    </div>
  );
}
