import type { ReactNode } from "react";

type SectionDisclosureProps = {
  label?: ReactNode;
  children: ReactNode;
};

export function SectionDisclosure({ label, children }: SectionDisclosureProps) {
  if (!label) {
    return <>{children}</>;
  }

  return (
    <details className="mt-5 rounded-xl border border-[var(--o-border)] bg-[var(--o-card-bg)]">
      <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-[var(--o-text-secondary)] marker:text-[var(--o-warm)] transition-colors hover:text-[var(--o-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--o-warm)]">
        {label}
      </summary>
      <div className="px-5 pb-5 pt-4">
        {children}
      </div>
    </details>
  );
}
