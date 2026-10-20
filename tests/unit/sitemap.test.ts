import assert from "node:assert/strict";
import { test } from "node:test";
import { buildSitemap } from "../../shared/utils/sitemap.ts";

const xml = buildSitemap({
  domain: "https://example.dev",
  defaultLanguage: "en-US",
  locales: [
    { language: "en-US", prefix: "" },
    { language: "fr-CA", prefix: "/fr-ca" },
  ],
  paths: ["/", "/about"],
});

test("lists every page in every locale", () => {
  for (const loc of [
    "https://example.dev/",
    "https://example.dev/fr-ca",
    "https://example.dev/about",
    "https://example.dev/fr-ca/about",
  ]) {
    assert.ok(xml.includes(`<loc>${loc}</loc>`), loc);
  }
  assert.equal(xml.match(/<url>/g)?.length, 4);
});

test("adds hreflang alternates and x-default", () => {
  assert.ok(
    xml.includes('hreflang="fr-CA" href="https://example.dev/fr-ca/about"'),
  );
  assert.ok(
    xml.includes('hreflang="x-default" href="https://example.dev/about"'),
  );
});
