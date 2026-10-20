// Drop empty strings and lists so untranslated keys fall back to English instead of rendering blank.
type Messages = Record<string, unknown>;

export function pruneEmpty(messages: Messages): Messages {
  const out: Messages = {};
  for (const [key, value] of Object.entries(messages)) {
    if (typeof value === "string") {
      if (value !== "") out[key] = value;
    } else if (Array.isArray(value)) {
      const kept = value.filter((entry) => entry !== "");
      if (kept.length) out[key] = kept;
    } else if (value && typeof value === "object") {
      const kept = pruneEmpty(value as Messages);
      if (Object.keys(kept).length) out[key] = kept;
    } else if (value != null) {
      out[key] = value;
    }
  }
  return out;
}
