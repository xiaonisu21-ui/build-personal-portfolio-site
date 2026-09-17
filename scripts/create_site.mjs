#!/usr/bin/env node
import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const outputArg = getArg("--output");
const force = args.includes("--force");

if (!outputArg) {
  console.error("Usage: node scripts/create_site.mjs --output <directory> [--force]");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../assets/starter-site");
const output = resolve(process.cwd(), outputArg);

try {
  const info = await stat(output);
  if (info.isDirectory() && (await readdir(output)).length > 0 && !force) {
    console.error(`Refusing to overwrite non-empty directory: ${output}`);
    console.error("Pass --force only after reviewing the target.");
    process.exit(2);
  }
} catch {
  await mkdir(output, { recursive: true });
}

await cp(source, output, { recursive: true, force });
console.log(`Created portfolio starter at ${output}`);
console.log("Next: edit content.js, replace demo-avatar.png, then run validate_site.mjs.");

