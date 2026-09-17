#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const target = resolve(process.cwd(), process.argv[2] || "assets/starter-site");
const required = ["index.html", "styles.css", "content.js", "app.js", "demo-avatar.png"];
const textExtensions = new Set([".html", ".css", ".js", ".json", ".md", ".svg", ".txt", ".yaml", ".yml"]);
const forbidden = [
  { name: "mainland China mobile number", pattern: /\b1[3-9]\d{9}\b/g },
  { name: "likely personal email", pattern: /\b[\w.+-]+@(?:163|qq|gmail|outlook)\.com\b/gi },
  { name: "local user path", pattern: /\/Users\//g },
  { name: "temporary ChatGPT host", pattern: new RegExp("chatgpt" + "\\.site", "gi") },
  { name: "deployment access token", pattern: new RegExp(["eo", "token"].join("_"), "gi") },
  { name: "unfinished placeholder", pattern: /\bTODO\b/g },
  { name: "common secret assignment", pattern: /(?:api[_-]?key|access[_-]?token|secret)\s*[:=]\s*["'][^"']{8,}/gi },
];

let failures = 0;

for (const file of required) {
  try {
    const info = await stat(join(target, file));
    if (!info.isFile()) throw new Error("not a file");
  } catch {
    console.error(`MISSING ${file}`);
    failures += 1;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(target);
let combined = "";
for (const file of files) {
  if (!textExtensions.has(extname(file))) continue;
  const text = await readFile(file, "utf8");
  combined += `\n${text}`;
  for (const rule of forbidden) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(text)) {
      console.error(`FORBIDDEN ${rule.name}: ${file}`);
      failures += 1;
    }
  }
}

if (!/(虚构示例|Fictional demo)/i.test(combined)) {
  console.error("MISSING visible fictional-demo label");
  failures += 1;
}
if (!/(AI\s*生成内容|AI-generated content)/i.test(combined)) {
  console.error("MISSING AI-generated-content disclosure");
  failures += 1;
}

if (failures) {
  console.error(`Validation failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Validation passed: ${target}`);
console.log(`${files.length} file(s) checked; disclosure and privacy rules present.`);
