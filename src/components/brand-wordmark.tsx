type BrandWordmarkVariant = "nav" | "hero" | "footer";

type BrandWordmarkProps = {
  label: string;
  variant: BrandWordmarkVariant;
};

export function BrandWordmark({ label, variant }: BrandWordmarkProps) {
  const { latin, cjk } = splitBrandLabel(label);

  return (
    <span className={`brand-wordmark brand-wordmark--${variant}`}>
      <span className="brand-wordmark__latin">{latin}</span>
      {cjk && (
        <>
          <span className="brand-wordmark__divider" aria-hidden="true" />
          <span className="brand-wordmark__cjk">{cjk}</span>
        </>
      )}
    </span>
  );
}

function splitBrandLabel(label: string): { latin: string; cjk: string | null } {
  const match = label.match(/^(Wenlan)(?:\s+(.+))?$/);

  if (!match) {
    return { latin: label, cjk: null };
  }

  return {
    latin: match[1],
    cjk: match[2] ?? null,
  };
}
