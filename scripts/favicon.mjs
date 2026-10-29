#!/usr/bin/env node
// Writes public/favicon.svg: the wallpaper's sakura blossom, matching BloomMark.vue, with a dark variant.
//   node scripts/favicon.mjs           rewrite favicon.svg
//   node scripts/favicon.mjs --check   fail if favicon.svg differs
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MARK,
  SAKURA_PETAL,
  markPetals,
  markStamens,
} from "../shared/utils/blossom.ts";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/favicon.svg",
);
const CENTRE = MARK.size / 2;

const petals = markPetals()
  .map(
    (transform) =>
      `    <path transform="${transform}" d="${SAKURA_PETAL}" fill="var(--petal)" />`,
  )
  .join("\n");
const dots = markStamens()
  .map(
    ([x, y]) =>
      `    <circle cx="${x}" cy="${y}" r="${MARK.stamens.r}" fill="var(--bloom)" />`,
  )
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK.size} ${MARK.size}" role="img" aria-label="Raven-Lee Mills">
  <style>
    :root { --paper: #FDF7F9; --petal: #F3AFC8; --bloom: #A82A5C; }
    @media (prefers-color-scheme: dark) {
      :root { --paper: #241019; --petal: #8E2B54; --bloom: #CF658A; }
    }
  </style>
  <rect width="${MARK.size}" height="${MARK.size}" fill="var(--paper)" />
  <g>
${petals}
    <circle cx="${CENTRE}" cy="${CENTRE}" r="${MARK.core}" fill="var(--bloom)" />
${dots}
  </g>
</svg>
`;

if (process.argv.includes("--check")) {
  if ((await readFile(OUT, "utf8")) !== svg) {
    console.error("favicon: public/favicon.svg differs. Run node scripts/favicon.mjs.");
    process.exit(1);
  }
  console.log("favicon: public/favicon.svg matches");
} else {
  await writeFile(OUT, svg);
  console.log("favicon: wrote public/favicon.svg (sakura blossom)");
}
