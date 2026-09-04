"use client";

import { useEffect } from "react";
import { currentSignupAttribution } from "@/lib/signup-attribution";

export function AcquisitionCapture() {
  useEffect(() => { currentSignupAttribution(); }, []);
  return null;
}
