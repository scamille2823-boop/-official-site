import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const [dist = "dist", label = "", href = "../"] = process.argv.slice(2);
const textExtensions = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(dist))) {
  throw new Error(`Build directory not found: ${dist}`);
}

let rewritten = 0;
for (const file of await walk(dist)) {
  if (!textExtensions.has(extname(file))) continue;

  const before = await readFile(file, "utf8");
  const after = before
    .replace(/(["'`(])\/images\//g, "$1./images/")
    .replace(/url\(\/images\//g, "url(./images/")
    .replace(/\.\/\.\/images\//g, "./images/");

  if (after !== before) {
    await writeFile(file, after);
    rewritten += 1;
  }
}

if (label) {
  const htmlPath = join(dist, "index.html");
  let html = await readFile(htmlPath, "utf8");

  if (!html.includes('id="version-switch"')) {
    const badge = `<a id="version-switch" href="${href}" style="position:fixed;right:16px;bottom:16px;z-index:9999;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid rgba(148,163,184,.35);border-radius:999px;background:rgba(15,23,42,.82);color:#e2e8f0;font:500 12px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans SC',sans-serif;text-decoration:none;backdrop-filter:blur(12px);box-shadow:0 8px 24px rgba(2,6,23,.24)">${label} · 切换版本</a>`;
    html = html.replace("</body>", `${badge}\n</body>`);
    await writeFile(htmlPath, html);
  }
}

console.log(`[postbuild] relative image paths rewritten in ${rewritten} file(s)`);
