// Split a Markdown file into simple key: value metadata and a body.
export interface ParsedNote {
  meta: Record<string, string | boolean>;
  body: string;
}

export function parseFrontmatter(source: string): ParsedNote {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) return { meta: {}, body: source };

  const meta: Record<string, string | boolean> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    const key = line.slice(0, i).trim();
    const raw = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    meta[key] = raw === "true" ? true : raw === "false" ? false : raw;
  }
  return { meta, body: match[2]!.trimStart() };
}
