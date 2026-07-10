export function ScenarioGlyph({
  scenarioId,
  compact = false,
}: {
  readonly scenarioId: string;
  readonly compact?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`${compact ? "size-9" : "size-11"} relative flex shrink-0 items-center justify-center rounded-lg border border-[var(--case-accent)]/35 bg-[var(--o-bg)]/42 text-[var(--case-accent)]`}
    >
      <svg viewBox="0 0 40 40" className={compact ? "size-7" : "size-8"} fill="none">
        {scenarioId === "dev-codebase" && (
          <>
            <path d="M15 13L9 20L15 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25 13L31 20L25 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 11L18 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </>
        )}
        {scenarioId === "product-customers" && (
          <>
            <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="25" cy="15" r="4" stroke="currentColor" strokeWidth="1.8" opacity="0.72" />
            <path d="M9 29C10 24 13 22 17 22H23C27 22 30 24 31 29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14 29H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
          </>
        )}
        {scenarioId === "research-writing" && (
          <>
            <path d="M13 10H25L29 14V30H13V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M25 10V14H29" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" opacity="0.7" />
            <path d="M17 19H25M17 23H24M17 27H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.64" />
          </>
        )}
      </svg>
    </span>
  );
}

export function EvidenceIcon({
  scenarioId,
  index,
}: {
  readonly scenarioId: string;
  readonly index: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-md border border-[var(--o-border-subtle)] bg-[var(--o-surface)]/68 text-[var(--case-accent)]"
    >
      <svg viewBox="0 0 32 32" className="size-5" fill="none">
        {scenarioId === "dev-codebase" && <DevEvidenceIcon index={index} />}
        {scenarioId === "product-customers" && <ProductEvidenceIcon index={index} />}
        {scenarioId === "research-writing" && <ResearchEvidenceIcon index={index} />}
      </svg>
    </span>
  );
}

function DevEvidenceIcon({ index }: { readonly index: number }) {
  if (index === 1) {
    return (
      <>
        <path d="M8 9H19L23 13H24V24H8V9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 8L10 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </>
    );
  }

  if (index === 2) {
    return (
      <>
        <path d="M10 11H22V23H10V11Z" stroke="currentColor" strokeWidth="2" />
        <path d="M16 7V11M16 23V27M7 17H10M22 17H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
      </>
    );
  }

  if (index === 3) {
    return (
      <>
        <path d="M9 12H23V21H17L13 25V21H9V12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
      </>
    );
  }

  return <DocumentLines />;
}

function ProductEvidenceIcon({ index }: { readonly index: number }) {
  if (index === 1) {
    return (
      <>
        <path d="M9 9H23V23H9V9Z" stroke="currentColor" strokeWidth="2" />
        <path d="M13 13H19M13 17H21M13 21H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </>
    );
  }

  if (index === 2) {
    return (
      <>
        <path d="M10 20L15 25L24 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8H24V24H8V8Z" stroke="currentColor" strokeWidth="1.7" opacity="0.45" />
      </>
    );
  }

  if (index === 3) {
    return (
      <>
        <path d="M9 12H23V21H17L13 25V21H9V12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </>
    );
  }

  return (
    <>
      <circle cx="13" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="13" r="4" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M7 25C8 20 11 18 16 18C21 18 24 20 25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function ResearchEvidenceIcon({ index }: { readonly index: number }) {
  if (index === 1) {
    return (
      <>
        <path d="M8 10H24V23H8V10Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 15H20M12 19H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M21 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    );
  }

  if (index === 2) {
    return <DocumentLines />;
  }

  if (index === 3) {
    return (
      <>
        <path d="M16 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 23C11 20 13 18 16 18C19 18 21 20 21 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 25H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </>
    );
  }

  return <DocumentLines />;
}

function DocumentLines() {
  return (
    <>
      <path d="M10 8H21L24 11V24H10V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M21 8V12H24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.65" />
      <path d="M14 16H20M14 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.62" />
    </>
  );
}
