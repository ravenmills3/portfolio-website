import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCss, differences } from "../../scripts/tile-geometry.mjs";

const css = buildCss();

test("a reformatted wallpaper.css still matches", () => {
  const reformatted = css
    .replace(/\/\*[^*]*\*\//g, "/* Generated */")
    .replace(/radial-gradient\(/g, "radial-gradient(\n      ")
    .replace(/, var\(/g, ",\n      var(")
    .replace(/0\.078/g, "0.0780");
  assert.notEqual(reformatted, css);
  assert.deepEqual(differences(reformatted, css), []);
});

test("a changed value is reported by property", () => {
  assert.deepEqual(
    differences(css.replace("at 25% 16%", "at 25% 17%"), css),
    ["background-image"],
  );
  assert.deepEqual(
    differences(css.replace("var(--tile, 56px)", "var(--tile, 48px)"), css),
    ["--t"],
  );
});
