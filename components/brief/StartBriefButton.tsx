"use client";

type Props = { className?: string; children: React.ReactNode };

// Phase 2 will replace this onClick with the Brief Wizard modal.
export function StartBriefButton({ className = "", children }: Props) {
  return (
    <button
      type="button"
      onClick={() => alert("Brief Wizard arrives in Phase 2.")}
      className={className}
    >
      {children}
    </button>
  );
}
