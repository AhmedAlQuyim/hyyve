export function LabelMono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`label-mono ${className}`}>{children}</span>;
}
