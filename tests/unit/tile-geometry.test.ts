import assert from "node:assert/strict";
import { test } from "node:test";
import {
  BLOSSOMS,
  PETALS,
  buildCss,
  buildMaskSvg,
  differences,
} from "../../scripts/tile-geometry.mjs";
import { SAKURA_PETAL } from "../../shared/utils/blossom.ts";

const css = buildCss();

test("a reformatted wallpaper.css still matches", () => {
  const reformatted = css
    .replace(/\/\*[^*]*\*\//g, "/* Generated */")
    .replace(/radial-gradient\(/g, "radial-gradient(\n      ")
    .replace(/, var\(/g, ",\n      var(")
    .replace(/0\.032/g, "0.0320");
  assert.notEqual(reformatted, css);
  assert.deepEqual(differences(reformatted, css), []);
});

test("a changed value is reported by selector and property", () => {
  assert.deepEqual(
    differences(css.replace("at 25% 25%", "at 25% 26%"), css),
    ["@utility wallpaper &::after|background-image"],
  );
  assert.deepEqual(
    differences(css.replace("var(--tile, 56px)", "var(--tile, 48px)"), css),
    ["@utility wallpaper|--t"],
  );
  assert.deepEqual(
    differences(css.replace("rotate(72)", "rotate(70)"), css),
    ["@utility wallpaper &::before|mask-image"],
  );
});

test("the mask draws every blossom's sakura petals", () => {
  const svg = buildMaskSvg();
  const petals = svg.match(/<path /g) ?? [];
  assert.equal(petals.length, PETALS * BLOSSOMS.length);
  assert.ok(svg.includes(SAKURA_PETAL));
});

test("colours are read through fallbacks, never declared", () => {
  assert.doesNotMatch(css, /--(petal|bloom|floret)\s*:/);
  for (const name of ["petal", "bloom", "floret"])
    assert.ok(css.includes(`var(--${name}, var(--wp-${name}))`), name);
});
