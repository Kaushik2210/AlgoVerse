#!/usr/bin/env node
/**
 * Reads every leetcode/NNNN-kebab-case-title/ folder and generates the JSON
 * data the /leetcode routes consume. Runs at build/dev time (see the
 * "predev"/"prebuild" npm scripts) so the 166+ problem folders never have to
 * be hand-transcribed into a giant committed JSON blob — this script is the
 * only thing that needs to know their on-disk shape.
 *
 * Output (gitignored, regenerated every run):
 *   src/data/leetcode/index.json          -> lightweight list for /leetcode
 *   src/data/leetcode/problems/<slug>.json -> full readme + code per problem
 */
import { readdirSync, statSync, readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LEETCODE_DIR = path.join(ROOT, "leetcode");
const OUT_DIR = path.join(ROOT, "src", "data", "leetcode");
const PROBLEMS_OUT_DIR = path.join(OUT_DIR, "problems");

const FOLDER_RE = /^(\d{4,5})-([a-z0-9-]+)$/;

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function readSafe(p) {
  try {
    return readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

/** Pull "# 68. Text Justification" -> title, and the excerpt paragraph after it. */
function parseReadme(readme, fallbackSlug) {
  const lines = readme.split("\n");
  let title = titleFromSlug(fallbackSlug);
  let bodyStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const m = /^#\s+\d+\.\s+(.+)$/.exec(lines[i].trim());
    if (m) {
      title = m[1].trim();
      bodyStart = i + 1;
      break;
    }
  }

  // Excerpt: the first non-empty paragraph after the title heading.
  let excerpt = "";
  let buf = [];
  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") {
      if (buf.length) break;
      continue;
    }
    if (line.trim().startsWith("#")) break;
    buf.push(line.trim());
  }
  excerpt = buf.join(" ").replace(/`/g, "").trim();
  if (excerpt.length > 220) excerpt = excerpt.slice(0, 217).trimEnd() + "...";

  return { title, excerpt };
}

function main() {
  if (!statSync(LEETCODE_DIR, { throwIfNoEntry: false })) {
    console.warn("[leetcode-index] leetcode/ directory not found, skipping.");
    return;
  }

  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(PROBLEMS_OUT_DIR, { recursive: true });

  const entries = readdirSync(LEETCODE_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => FOLDER_RE.test(name))
    .sort();

  const index = [];

  for (const folder of entries) {
    const m = FOLDER_RE.exec(folder);
    const number = parseInt(m[1], 10);
    const slugTitle = m[2];
    const dir = path.join(LEETCODE_DIR, folder);

    const readme = readSafe(path.join(dir, "README.md"));
    const python = readSafe(path.join(dir, "solution.py"));
    const java = readSafe(path.join(dir, "Solution.java"));
    const cpp = readSafe(path.join(dir, "solution.cpp"));

    const { title, excerpt } = parseReadme(readme, slugTitle);

    const problem = {
      number,
      slug: folder,
      title,
      excerpt,
      readme,
      code: { python, java, cpp },
    };

    writeFileSync(
      path.join(PROBLEMS_OUT_DIR, `${folder}.json`),
      JSON.stringify(problem),
      "utf8"
    );

    index.push({ number, slug: folder, title, excerpt });
  }

  index.sort((a, b) => a.number - b.number);

  writeFileSync(path.join(OUT_DIR, "index.json"), JSON.stringify(index), "utf8");

  console.log(`[leetcode-index] generated ${index.length} problems -> ${path.relative(ROOT, OUT_DIR)}`);
}

main();
