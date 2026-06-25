import type { ComponentProps } from "react";
import NextLink from "next/link";
import { createNavigation } from "next-intl/navigation";
import { type Locale } from "./locales";
import { routing } from "./routing-config";
import { localizePath } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export function localizedHrefForLocale(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] || "";

  return `${localizePath(locale, pathname)}${suffix}`;
}

export type LocalizedLinkProps = Omit<
  ComponentProps<typeof NextLink>,
  "href" | "locale"
> & {
  href: string;
  locale: Locale;
};

export function LocalizedLink({ href, locale, ...props }: LocalizedLinkProps) {
  return <NextLink href={localizedHrefForLocale(locale, href)} {...props} />;
}
