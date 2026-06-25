export type CoverageStatus =
  | "translated"
  | "fallback_en"
  | "needs_update"
  | "unavailable";

export type ContentLeaf =
  | string
  | readonly ContentLeaf[]
  | { readonly [key: string]: ContentLeaf };

export type ContentUnit<Content extends ContentLeaf> = {
  coverage: CoverageStatus;
  sourceHash: string | null;
  content: Content;
};

export type SeoContent = {
  seo: {
    title: string;
    description: string;
  };
};

export type NotFoundContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  popularDestinations: readonly {
    href: string;
    label: string;
    description: string;
  }[];
};

export type FooterContent = {
  brand: string;
  tagline: string;
  groups: readonly {
    title: string;
    links: readonly {
      href: string;
      label: string;
    }[];
  }[];
  signature: {
    brand: string;
    tagline: string;
    builtByPrefix: string;
    author: string;
    authorUrl: string;
  };
};

export type CoreContent = {
  home: ContentUnit<SeoContent>;
  about: ContentUnit<SeoContent>;
  docs: ContentUnit<SeoContent>;
  getStarted: ContentUnit<SeoContent>;
  notFound: ContentUnit<NotFoundContent>;
  footer: ContentUnit<FooterContent>;
};
