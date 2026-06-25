"use server";

import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

type WaitlistResult =
  | { success: true }
  | { success: false; errorCode: "required" | "invalid" | "notConfigured" | "unknown" };

export async function joinWaitlist(
  _prev: WaitlistResult | null,
  formData: FormData
): Promise<WaitlistResult> {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { success: false, errorCode: "required" };
  }

  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, errorCode: "invalid" };
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("RESEND_AUDIENCE_ID is not configured");
    return { success: false, errorCode: "notConfigured" };
  }

  try {
    const resend = getResend();
    await resend.contacts.create({
      email: trimmed,
      audienceId,
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to add to waitlist:", err);
    return { success: false, errorCode: "unknown" };
  }
}
