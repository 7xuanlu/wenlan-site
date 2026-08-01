import type { Locale } from "@/i18n/locales";

export const signupAttributionFieldNames = {
  landingPath: "signup_landing_path",
  referrerHost: "signup_referrer_host",
  utmSource: "signup_utm_source",
  utmMedium: "signup_utm_medium",
  utmCampaign: "signup_utm_campaign",
} as const;

export const resendSignupPropertyKeys = {
  locale: "signup_locale",
  landingPath: "signup_landing_path",
  referrerHost: "signup_referrer_host",
  utmSource: "signup_utm_source",
  utmMedium: "signup_utm_medium",
  utmCampaign: "signup_utm_campaign",
} as const;

export type SignupAttribution = Record<
  (typeof signupAttributionFieldNames)[keyof typeof signupAttributionFieldNames],
  string
>;

const MAX_ATTRIBUTION_VALUE_LENGTH = 120;
const UTM_VALUE = /^[\p{L}\p{N}][\p{L}\p{N} ._~-]*$/u;

function boundedValue(value: string | null | undefined) {
  return (value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_ATTRIBUTION_VALUE_LENGTH);
}

function referrerHost(referrer: string) {
  if (!referrer) return "direct";

  try {
    return boundedValue(new URL(referrer).hostname.toLowerCase()) || "direct";
  } catch {
    return "direct";
  }
}

function serverSafeAttributionValue(
  propertyName: keyof typeof resendSignupPropertyKeys,
  value: string,
) {
  if (!value || value.includes("@")) return "";
  if (propertyName === "landingPath") {
    let decoded: string;
    try {
      decoded = decodeURIComponent(value);
    } catch {
      return "";
    }
    if (
      !value.startsWith("/") ||
      value.startsWith("//") ||
      /[?#\\]/.test(value) ||
      decoded.includes("@")
    ) {
      return "";
    }
  }
  if (propertyName === "referrerHost" && value !== "direct") {
    try {
      const parsed = new URL(`https://${value}`);
      if (
        parsed.hostname.toLowerCase() !== value.toLowerCase() ||
        parsed.username ||
        parsed.password ||
        parsed.port
      ) {
        return "";
      }
    } catch {
      return "";
    }
  }
  if (
    (propertyName === "utmSource" ||
      propertyName === "utmMedium" ||
      propertyName === "utmCampaign") &&
    !UTM_VALUE.test(value)
  ) {
    return "";
  }
  return value;
}

export function browserSignupAttribution(
  locationHref: string,
  referrer: string,
): SignupAttribution {
  let url: URL;
  try {
    url = new URL(locationHref);
  } catch {
    url = new URL("https://wenlan.app/");
  }

  return {
    signup_landing_path: boundedValue(url.pathname) || "/",
    signup_referrer_host: referrerHost(referrer),
    signup_utm_source: boundedValue(url.searchParams.get("utm_source")),
    signup_utm_medium: boundedValue(url.searchParams.get("utm_medium")),
    signup_utm_campaign: boundedValue(url.searchParams.get("utm_campaign")),
  };
}

export function resendSignupProperties(formData: FormData, locale: Locale) {
  const properties: Record<string, string> = {
    [resendSignupPropertyKeys.locale]: locale,
  };

  for (const [propertyName, formFieldName] of Object.entries(
    signupAttributionFieldNames,
  )) {
    const rawValue = formData.get(formFieldName);
    if (typeof rawValue !== "string") continue;

    const value = serverSafeAttributionValue(
      propertyName as keyof typeof resendSignupPropertyKeys,
      boundedValue(rawValue),
    );
    if (value) {
      properties[
        resendSignupPropertyKeys[
          propertyName as keyof typeof resendSignupPropertyKeys
        ]
      ] = value;
    }
  }

  return properties;
}
