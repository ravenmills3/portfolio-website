// Static preview that mimics wrangler.toml: clean URLs, trailing slashes dropped, 404.html fallback.
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
  const file = await resolve(pathname);
  const target = file ?? join(root, "404.html");
  const status = file ? 200 : 404;
  try {
    res.writeHead(status, {
      "content-type": types[extname(target)] ?? "application/octet-stream",
    });
    res.end(await readFile(target));
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, () => console.log(`Preview on http://localhost:${port}`));
