type IconType = "automation" | "agentic" | "consultation";

export function CellIcon({ type }: { type: IconType }) {
  const stroke = "var(--color-midnight)";
  const fill = "var(--color-paper)";

  if (type === "automation") {
    return (
      <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5" fill={fill} />
        <circle cx="28" cy="28" r="6" fill="var(--color-amber)" />
        <path d="M28 14 v8 M28 34 v8 M14 28 h8 M34 28 h8" stroke={stroke} strokeWidth="1.2" />
      </svg>
    );
  }
  if (type === "agentic") {
    return (
      <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
        <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5" fill={fill} />
        <circle cx="28" cy="28" r="3" fill="var(--color-amber)" />
        <circle cx="16" cy="20" r="3" fill={stroke} />
        <circle cx="40" cy="20" r="3" fill={stroke} />
        <circle cx="16" cy="36" r="3" fill={stroke} />
        <circle cx="40" cy="36" r="3" fill={stroke} />
        <line x1="16" y1="20" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="40" y1="20" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="16" y1="36" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="40" y1="36" x2="28" y2="28" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
      <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke={stroke} strokeWidth="1.5" fill={fill} />
      <path d="M28 8 a20 20 0 0 1 20 20" stroke="var(--color-amber)" strokeWidth="2.4" fill="none" />
      <circle cx="28" cy="28" r="4" fill={stroke} />
    </svg>
  );
}
