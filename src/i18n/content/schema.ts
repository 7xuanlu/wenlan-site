export type ContentStatus =
  | "translated"
  | "fallback_en"
  | "needs_update"
  | "unavailable";

export type ContentLeaf =
  | string
  | readonly ContentLeaf[]
  | { readonly [key: string]: ContentLeaf };

export type ContentUnit<Content extends ContentLeaf> = {
  status: ContentStatus;
  sourceHash: string | null;
  content: Content;
};

export type SeoContent = {
  seo: {
    title: string;
    description: string;
  };
};

export type LinkContent = {
  id: string;
  href: string;
  label: string;
};

export type ChromeContent = {
  skipLinkLabel: string;
  breadcrumbAriaLabel: string;
};

export type WaitlistErrorCode =
  | "required"
  | "invalid"
  | "notConfigured"
  | "unknown";

export type WaitlistContent = {
  successMessage: string;
  pendingLabel: string;
  submitLabel: string;
  emailPlaceholder: string;
  fallbackError: string;
  errors: Record<WaitlistErrorCode, string>;
};

export type HandoffVisualLabels = {
  start: string;
  capture: string;
  handoff: string;
  resume: string;
};

export type DistilleryVisualLabels = {
  merged: string;
  linked: string;
  refined: string;
};

export type HomeContent = SeoContent & {
  nav: {
    schemaName: string;
    brand: string;
    previewBadge: string;
    githubAriaLabel: string;
    themeToggle: {
      lightLabel: string;
      darkLabel: string;
    };
    links: readonly LinkContent[];
  };
  hero: {
    title: string;
    description: string;
    primaryCta: LinkContent;
    secondaryCta: LinkContent;
    metaLinks: readonly LinkContent[];
    metaText: readonly {
      id: string;
      label: string;
    }[];
  };
  demo: {
    title: string;
    playLabel: string;
  };
  useCases: {
    eyebrow: string;
    title: string;
    description: string;
    evidenceLabel: string;
    outcomeLabel: string;
    actionsLabel: string;
    index: {
      title: string;
      activeViewLabel: string;
      pagesTitle: string;
      pagesLabel: string;
      sourcesLabel: string;
      statusLabel: string;
      sourceBackedLabel: string;
      citationLabel: string;
      citingLabel: string;
    };
    scenarios: readonly {
      id: string;
      label: string;
      railLabel: string;
      summary: string;
      lead: string;
      body: string;
      evidence: readonly {
        id: string;
        label: string;
        detail: string;
      }[];
      outcome: string;
    }[];
  };
  metrics: {
    eyebrow: string;
    title: string;
    description: string;
    headers: {
      surface: string;
      scope: string;
      result: string;
    };
    rows: readonly {
      id: string;
      surface: string;
      scope: string;
      result: string;
    }[];
    note: string;
    link: LinkContent;
  };
  sections: {
    problem: CoreTextSection;
    solution: CoreTextSection & {
      visualLabels: HandoffVisualLabels;
    };
    memoryDistillery: CoreTextSection & {
      visualLabels: DistilleryVisualLabels;
    };
    humanControl: CoreTextSection;
    features: CoreTextSection;
    openSourceCta: CoreTextSection & {
      primaryCta: LinkContent;
      secondaryCta: LinkContent;
      waitlistHeading: string;
      waitlist: WaitlistContent;
    };
  };
  faqs: {
    eyebrow: string;
    title: string;
    items: readonly {
      id: string;
      q: string;
      a: string;
    }[];
  };
  redesign: {
    hero: {
      headline: EmphasisText;
      description: string;
      assurances: readonly { id: string; label: string }[];
      worksWithLabel: string;
      worksWithNote: string;
    };
    pains: {
      title: string;
      intro: string;
      generations: readonly { id: string; name: string; body: string }[];
      current: { name: string; body: string };
      closer: EmphasisText;
    };
    pipeline: {
      intro: string;
      stages: readonly { id: string; step: string; title: string }[];
      distillNote: string;
      arcLabel: string;
    };
    bento: {
      cells: readonly { id: string; title: string; body: string }[];
    };
    storage: {
      title: string;
      intro: string;
      indexLabel: string;
      filesLabel: string;
      fusionNote: string;
      distillCaption: string;
      ingestCaption: string;
      tradeoffs: readonly { id: string; title: string; body: string }[];
    };
    metrics: {
      title: string;
      bars: readonly { id: string; label: string; value: string; sub: string }[];
      footnote: string;
    };
  };
};

export type EmphasisText = {
  pre: string;
  emphasis: string;
  post: string;
};

export type CoreTextSection = {
  eyebrow: string;
  title: string;
  body: string;
  note: string;
};

export type AboutContent = SeoContent & {
  breadcrumbs: {
    home: string;
    current: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    statusLabel: string;
    statusItems: readonly string[];
  };
  sections: readonly {
    id: string;
    number: string;
    title: string;
    paragraphs: readonly string[];
  }[];
  principles: {
    title: string;
    items: readonly {
      id: string;
      title: string;
      body: string;
    }[];
  };
  projectLinksHeading: string;
  projectLinks: readonly LinkContent[];
  help: {
    eyebrow: string;
    bodyPrefix: string;
    securityLink: LinkContent;
    bodySuffix: string;
  };
  cta: {
    primary: LinkContent;
    secondary: LinkContent;
  };
  schema: {
    name: string;
    description: string;
  };
};

export type DocsContent = SeoContent & {
  breadcrumbs: {
    home: string;
    current: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  intro: {
    eyebrow: string;
    body: string;
  };
  sections: {
    items: readonly {
      id: string;
      title: string;
      description: string;
      items: readonly DocsItemContent[];
    }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: LinkContent;
    secondary: LinkContent;
  };
  schema: {
    name: string;
    description: string;
  };
};

export type DocsItemContent = {
  id: string;
  href: string;
  label: string;
  title: string;
  description: string;
  meta: string;
};

export type GetStartedContent = SeoContent & {
  breadcrumbs: {
    home: string;
    docs: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    meta: readonly string[];
    setupPathLabel: string;
    setupPathItems: readonly string[];
  };
  steps: readonly {
    id: string;
    number: string;
    title: string;
    paragraphs: readonly string[];
    commands: readonly string[];
    ctas: readonly LinkContent[];
  }[];
  sidebar: {
    eyebrow: string;
    items: readonly {
      id: string;
      label: string;
    }[];
  };
  schema: {
    name: string;
    description: string;
  };
};

export type NotFoundContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  popularHeading: string;
  popularDestinations: readonly {
    id: string;
    href: string;
    label: string;
    description: string;
  }[];
};

export type FooterContent = {
  ariaLabel: string;
  brand: string;
  tagline: string;
  groups: readonly {
    id: string;
    title: string;
    links: readonly {
      id: string;
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
  chrome: ContentUnit<ChromeContent>;
  home: ContentUnit<HomeContent>;
  about: ContentUnit<AboutContent>;
  docs: ContentUnit<DocsContent>;
  getStarted: ContentUnit<GetStartedContent>;
  notFound: ContentUnit<NotFoundContent>;
  footer: ContentUnit<FooterContent>;
};
