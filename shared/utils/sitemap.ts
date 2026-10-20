// Build sitemap.xml with hreflang alternates for every page in every locale.
export interface SitemapInput {
  domain: string;
  locales: ReadonlyArray<{ language: string; prefix: string }>;
  defaultLanguage: string;
  paths: string[];
}

const url = (domain: string, prefix: string, path: string) => {
  const full = `${prefix}${path === "/" ? "" : path}` || "/";
  return `${domain}${full}`;
};

export function buildSitemap({
  domain,
  locales,
  defaultLanguage,
  paths,
}: SitemapInput): string {
  const entries = paths.flatMap((path) =>
    locales.map((loc) => {
      const alternates = locales
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.language}" href="${url(domain, alt.prefix, path)}"/>`,
        )
        .join("\n");
      const xDefault = locales.find((l) => l.language === defaultLanguage);
      return `  <url>\n    <loc>${url(domain, loc.prefix, path)}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url(domain, xDefault?.prefix ?? "", path)}"/>\n  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}
