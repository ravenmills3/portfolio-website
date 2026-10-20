// Read Markdown notes from content/notes and render them at build time.
import { marked } from "marked";
import { LOCALES } from "~~/data/routes";
import { parseFrontmatter, type ParsedNote } from "#shared/utils/frontmatter";

export interface NoteMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  placeholder: boolean;
  // True when the note has no file in the requested locale.
  fallback: boolean;
}

const storage = () => useStorage("assets:notes");
const languageOf = (code: string) =>
  LOCALES.find((l) => l.code === code)?.language ?? "en-US";

async function readSource(slug: string, code: string) {
  const store = storage();
  for (const [lang, fallback] of [
    [languageOf(code), false],
    ["en-US", true],
  ] as const) {
    const raw = await store.getItemRaw<Uint8Array | string>(
      `${slug}:${lang}.md`,
    );
    if (raw != null)
      return {
        text: typeof raw === "string" ? raw : new TextDecoder().decode(raw),
        fallback,
      };
  }
  return null;
}

function toMeta(slug: string, parsed: ParsedNote, fallback: boolean): NoteMeta {
  const { meta } = parsed;
  return {
    slug,
    title: String(meta.title ?? slug),
    date: String(meta.date ?? ""),
    summary: String(meta.summary ?? ""),
    placeholder: meta.placeholder === true,
    fallback,
  };
}

export async function listNotes(code: string): Promise<NoteMeta[]> {
  const slugs = new Set(
    (await storage().getKeys()).map((key) => key.split(":")[0]!),
  );
  const notes: NoteMeta[] = [];
  for (const slug of slugs) {
    const source = await readSource(slug, code);
    if (source)
      notes.push(toMeta(slug, parseFrontmatter(source.text), source.fallback));
  }
  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNote(code: string, slug: string) {
  const source = await readSource(slug, code);
  if (!source) return null;
  const parsed = parseFrontmatter(source.text);
  return {
    ...toMeta(slug, parsed, source.fallback),
    html: await marked.parse(parsed.body),
  };
}
