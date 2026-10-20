#!/usr/bin/env node
// Checks the three message files have identical key sets, and reports translation coverage.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "../i18n/locales");
const read = (locale) =>
  JSON.parse(readFileSync(join(dir, `${locale}.json`), "utf8"));

// Every leaf path as a.b.c, mapped to whether it holds a non-empty value.
function leaves(node, prefix = "", out = new Map()) {
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value))
      leaves(value, path, out);
    else out.set(path, Array.isArray(value) ? value.length > 0 : value !== "");
  }
  return out;
}

const source = leaves(read("en-US"));
let failed = false;
for (const locale of ["fr-CA", "vi-VN"]) {
  const target = leaves(read(locale));
  const missing = [...source.keys()].filter((k) => !target.has(k));
  const extra = [...target.keys()].filter((k) => !source.has(k));
  const filled = [...target.values()].filter(Boolean).length;
  if (missing.length || extra.length) {
    failed = true;
    console.error(
      `${locale}: missing ${missing.join(", ") || "none"}; extra ${extra.join(", ") || "none"}`,
    );
  }
  console.log(`${locale}: ${filled}/${source.size} strings translated`);
}
if (failed) process.exit(1);
console.log("i18n-check: key sets match");
