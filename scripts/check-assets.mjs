import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const directories = process.argv.slice(2);
const textExtensions = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg"]);
const rootRelative = /(["'`(])\/images\/|url\(\/images\//;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else if (textExtensions.has(extname(fullPath))) files.push(fullPath);
  }
  return files;
}

const problems = [];
for (const directory of directories) {
  for (const file of await walk(directory)) {
    const source = await readFile(file, "utf8");
    if (rootRelative.test(source)) problems.push(file);
  }
}

if (problems.length > 0) {
  console.error("Root-relative /images paths found:");
  for (const file of problems) console.error(`- ${file}`);
  process.exit(1);
}

console.log(`[check-assets] no root-relative /images paths in ${directories.join(", ")}`);
