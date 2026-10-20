#!/usr/bin/env node
// Writes public/favicon.svg: one wallpaper blossom from the shared ring geometry, with a dark variant.
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PETALS, ring } from "./tile-geometry.mjs";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/favicon.svg",
);
const SIZE = 32;
const CENTRE = SIZE / 2;
const round = (n) => Number(n.toFixed(2));

const petals = ring(CENTRE, CENTRE, 7, PETALS)
  .map(
    ([x, y]) =>
      `    <circle cx="${round(x)}" cy="${round(y)}" r="5" fill="var(--petal)" />`,
  )
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="Raven-Lee Mills">
  <style>
    :root { --paper: #FDF7F9; --petal: #F3AFC8; --bloom: #A82A5C; }
    @media (prefers-color-scheme: dark) {
      :root { --paper: #241019; --petal: #8E2B54; --bloom: #CF658A; }
    }
  </style>
  <rect width="${SIZE}" height="${SIZE}" fill="var(--paper)" />
  <g>
${petals}
    <circle cx="${CENTRE}" cy="${CENTRE}" r="2.8" fill="var(--bloom)" />
  </g>
</svg>
`;

await writeFile(OUT, svg);
console.log(`favicon: wrote public/favicon.svg (${PETALS} petals)`);
