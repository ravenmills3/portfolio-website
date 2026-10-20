// One-off: render og-image.png, apple-touch-icon.png and favicon.ico with system Chrome.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = process.env.CHROME ?? "google-chrome";
const pub = join(import.meta.dirname, "../public");
const work = mkdtempSync(join(tmpdir(), "assets-"));
const petal = "M0 0C-17 -12 -17 -40 0 -52C17 -40 17 -12 0 0Z";

const bloom = (x, y, s, n, turn = 0) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${Array.from(
    { length: n },
    (_, i) =>
      `<path d="${petal}" transform="rotate(${turn + (360 / n) * i})" fill="${i % 2 ? "#c13a78" : "#e0679a"}"/>`,
  ).join("")}<circle r="9" fill="#f6c64d"/></g>`;

const og = `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght,SOFT,WONK@0,600,100,1&family=Be+Vietnam+Pro:wght@500&display=swap">
<style>*{margin:0}body{width:1200px;height:630px;background:#241520;position:relative;overflow:hidden;font-family:'Be Vietnam Pro',sans-serif}
h1{position:absolute;left:84px;top:200px;font:600 100px/1.05 Fraunces,serif;color:#f8eef3;width:620px}
p{position:absolute;left:88px;top:430px;font-size:36px;color:#f3a6c6;width:600px;line-height:1.35}svg{position:absolute;right:0;top:0}</style>
<h1>Raven-Lee Mills</h1><p>Full-stack developer in Ottawa. Always learning.</p>
<svg width="560" height="630" viewBox="0 0 560 630">${bloom(330, 270, 3.4, 9)}${bloom(130, 150, 1.9, 7, 20)}${bloom(470, 520, 1.6, 6, 10)}${bloom(120, 490, 1.1, 6)}</svg>`;

const icon = `<!doctype html><style>*{margin:0}body{width:180px;height:180px;background:#fdf7f9}</style><body>${readFileSync(join(pub, "favicon.svg"), "utf8").replace("<svg ", '<svg width="180" height="180" ')}`;
const ico = `<!doctype html><style>*{margin:0}body{width:48px;height:48px;background:transparent}</style><body>${readFileSync(join(pub, "favicon.svg"), "utf8").replace("<svg ", '<svg width="48" height="48" ')}`;

function shot(html, out, w, h, transparent = false) {
  const file = join(work, `${out}.html`);
  writeFileSync(file, html);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${w},${h}`,
    "--virtual-time-budget=6000",
    `--screenshot=${join(pub, out)}`,
  ];
  if (transparent) args.push("--default-background-color=00000000");
  execFileSync(chrome, [...args, `file://${file}`], { stdio: "ignore" });
}

shot(og, "og-image.png", 1200, 630);
shot(icon, "apple-touch-icon.png", 180, 180);
shot(ico, "favicon-48.png", 48, 48, true);

// Wrap the 48px PNG in a single-image ICO container.
const png = readFileSync(join(pub, "favicon-48.png"));
const head = Buffer.alloc(22);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(1, 4);
head.writeUInt8(48, 6);
head.writeUInt8(48, 7);
head.writeUInt16LE(1, 10);
head.writeUInt16LE(32, 12);
head.writeUInt32LE(png.length, 14);
head.writeUInt32LE(22, 18);
writeFileSync(join(pub, "favicon.ico"), Buffer.concat([head, png]));
console.log("Rendered og-image.png, apple-touch-icon.png, favicon.ico");
