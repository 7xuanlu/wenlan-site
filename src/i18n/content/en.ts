import type { CoreContent } from "./schema";

export const enContent = {
  home: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "Wenlan | Living Personal Knowledge Library for AI Work",
        description:
          "Wenlan is a living personal knowledge library for AI work: agents capture what they learn, you add sources you trust, and the daemon keeps source-cited pages current.",
      },
    },
  },
  about: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "About Wenlan | Living Personal Knowledge Library",
        description:
          "Wenlan is an open-source, local-first personal knowledge library for AI work, built by agents and grounded in its sources.",
      },
    },
  },
  docs: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "Wenlan Docs | Product Manual",
        description:
          "Install Wenlan, learn the daily AI work memory loop, understand the architecture, and follow the project roadmap, changelog, and evals.",
      },
    },
  },
  getStarted: {
    status: "translated",
    sourceHash: null,
    content: {
      seo: {
        title: "Get Started with Wenlan | Local AI Work Memory",
        description:
          "Install Wenlan through the Claude Code plugin or run Wenlan setup before connecting another MCP client.",
      },
    },
  },
  notFound: {
    status: "translated",
    sourceHash: null,
    content: {
      eyebrow: "404",
      title: "This page does not exist.",
      description:
        "If you followed a link, it may be outdated. If you typed the URL, check for a typo. Below are common starting points.",
      primaryCta: "Back to home",
      secondaryCta: "Browse articles",
      popularDestinations: [
        {
          href: "/docs/get-started",
          label: "Get started",
          description: "Install Wenlan and verify the first local memory loop.",
        },
        {
          href: "/docs/daily-workflow",
          label: "Daily workflow",
          description: "Capture, handoff, distill across AI sessions.",
        },
        {
          href: "/learn/ai-work-memory",
          label: "AI work memory",
          description: "What changes when AI sessions carry context across days.",
        },
        {
          href: "/learn/mcp-memory-server",
          label: "MCP memory server",
          description: "How Wenlan exposes memory through MCP.",
        },
        {
          href: "/learn/wenlan-vs-basic-memory",
          label: "Wenlan vs Basic Memory",
          description: "Markdown knowledge base vs AI work-session memory layer.",
        },
        {
          href: "/about",
          label: "About",
          description: "Project background, principles, and the person behind Wenlan.",
        },
      ],
    },
  },
  footer: {
    status: "translated",
    sourceHash: null,
    content: {
      brand: "Wenlan",
      tagline: "Living personal knowledge library for AI work.",
      groups: [
        {
          title: "Product",
          links: [
            { href: "/docs/get-started", label: "Get started" },
            { href: "/docs/daily-workflow", label: "Daily workflow" },
            { href: "/docs/capture-quality", label: "Capture quality" },
            { href: "/docs/core-concepts", label: "Core concepts" },
            { href: "/docs/data-and-privacy", label: "Data and privacy" },
            { href: "/docs/configuration", label: "Configuration" },
            { href: "/docs/updates-and-uninstall", label: "Updates" },
            { href: "/docs/platforms", label: "Platforms" },
            { href: "/docs", label: "Docs" },
          ],
        },
        {
          title: "Learn",
          links: [
            { href: "/learn", label: "Learn hub" },
            { href: "/learn/wenlan-vs-basic-memory", label: "vs Basic Memory" },
            { href: "/learn/wenlan-vs-claude-mem", label: "vs claude-mem" },
            {
              href: "/learn/wenlan-vs-superlocal-memory",
              label: "vs Superlocal Memory",
            },
          ],
        },
        {
          title: "Project",
          links: [
            { href: "/about", label: "About" },
            { href: "/docs/architecture", label: "Architecture" },
            { href: "/docs/evaluation", label: "Evaluation" },
            { href: "/docs/changelog", label: "Changelog" },
            { href: "/docs/roadmap", label: "Roadmap" },
            { href: "/docs/project-scope", label: "Project scope" },
            { href: "/docs/security", label: "Security" },
            { href: "https://github.com/7xuanlu/wenlan", label: "GitHub" },
            { href: "/feed.xml", label: "RSS feed" },
            {
              href: "https://github.com/7xuanlu/wenlan/blob/main/LICENSE",
              label: "Apache-2.0",
            },
          ],
        },
      ],
      signature: {
        brand: "Wenlan",
        tagline: "Living personal knowledge library",
        builtByPrefix: "Built by",
        author: "Qi-Xuan Lu",
        authorUrl: "https://github.com/7xuanlu",
      },
    },
  },
} as const satisfies CoreContent;
