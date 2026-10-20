// Static preview that mimics wrangler.toml: clean URLs, trailing slashes dropped, 404.html fallback
// and the rules in _headers, so the CSP is enforced in tests.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(import.meta.dirname, "../../.output/public");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

// Parse _headers into [pattern, headers] rules; "*" matches any characters.
async function headerRules() {
  const text = await readFile(join(root, "_headers"), "utf8").catch(() => "");
  const rules = [];
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      const pattern = line.trim().replace(/[.+?^${}()|[\]\\]/g, "\\$&");
      rules.push([new RegExp(`^${pattern.replaceAll("*", ".*")}$`), {}]);
    } else if (rules.length) {
      const [name, ...value] = line.trim().split(":");
      rules.at(-1)[1][name.trim().toLowerCase()] = value.join(":").trim();
    }
  }
  return rules;
}

async function headersFor(pathname) {
  const headers = {};
  for (const [pattern, values] of await headerRules())
    if (pattern.test(pathname)) Object.assign(headers, values);
  return headers;
}

async function resolve(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  for (const candidate of [clean, join(clean, "index.html"), `${clean}.html`]) {
    const file = join(root, candidate);
    if (!file.startsWith(root)) continue;
    const info = await stat(file).catch(() => null);
    if (info?.isFile()) return file;
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname, search } = new URL(req.url ?? "/", "http://localhost");
  if (pathname.length > 1 && pathname.endsWith("/")) {
    res.writeHead(307, { location: pathname.replace(/\/+$/, "") + search });
    return res.end();
  }
  // Cloudflare applies _headers but never serves the file itself.
  const file = pathname === "/_headers" ? null : await resolve(pathname);
  const target = file ?? join(root, "404.html");
  const status = file ? 200 : 404;
  try {
    res.writeHead(status, {
      ...(await headersFor(pathname)),
      "content-type": types[extname(target)] ?? "application/octet-stream",
    });
    res.end(await readFile(target));
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, () => console.log(`Preview on http://localhost:${port}`));
