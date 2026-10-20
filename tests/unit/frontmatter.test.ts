import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFrontmatter } from "../../shared/utils/frontmatter.ts";

test("reads keys, booleans and the body", () => {
  const { meta, body } = parseFrontmatter(
    '---\ntitle: "Hello: world"\nplaceholder: true\ndraft: false\n---\n\nBody text',
  );
  assert.equal(meta.title, "Hello: world");
  assert.equal(meta.placeholder, true);
  assert.equal(meta.draft, false);
  assert.equal(body, "Body text");
});

test("handles Windows line endings", () => {
  const { meta, body } = parseFrontmatter("---\r\ntitle: Hi\r\n---\r\nBody");
  assert.equal(meta.title, "Hi");
  assert.equal(body, "Body");
});

test("returns the whole file as body without frontmatter", () => {
  const { meta, body } = parseFrontmatter("# Just markdown");
  assert.deepEqual(meta, {});
  assert.equal(body, "# Just markdown");
});
