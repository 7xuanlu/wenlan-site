/** Clipboard access may be denied; callers must offer manual selection instead. */
export async function copyTextSafely(text: string, write: (text: string) => Promise<void>): Promise<boolean> {
  try { await write(text); return true; } catch { return false; }
}
