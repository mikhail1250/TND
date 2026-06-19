import { readFile } from "node:fs/promises";

const files = ["index.html", "styles.css", "script.js", "methodology.html", "privacy.html", "404.html"];
const contents = Object.fromEntries(
  await Promise.all(files.map(async (file) => [file, await readFile(file, "utf8")]))
);

const checks = [
  ["homepage has one H1", (contents["index.html"].match(/<h1[ >]/g) || []).length === 1],
  ["homepage identifies draft status", contents["index.html"].includes("remains in draft")],
  ["homepage links official law", contents["index.html"].includes("resmigazete.gov.tr")],
  ["homepage links draft guidance", contents["index.html"].includes("gib.gov.tr")],
  ["checker has four questions", (contents["index.html"].match(/data-question=/g) || []).length === 4],
  ["checker script is present", contents["script.js"].includes("eligibility-checker")],
  ["mobile breakpoint is present", contents["styles.css"].includes("@media (max-width: 760px)")],
  ["privacy explains local checker", contents["privacy.html"].includes("runs in your browser")],
  ["methodology separates authority levels", contents["methodology.html"].includes("Four levels of authority")]
];

let failed = 0;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}  ${name}`);
  if (!passed) failed += 1;
}

if (failed) {
  console.error(`\n${failed} smoke check(s) failed.`);
  process.exit(1);
}

console.log(`\n${checks.length} smoke checks passed.`);
