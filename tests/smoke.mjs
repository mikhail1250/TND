import { readFile } from "node:fs/promises";

const files = ["index.html", "styles.css", "script.js", "methodology.html", "privacy.html", "404.html", "updates.html", "llms.txt", "pricing.md", "robots.txt", "sitemap.xml", "favicon.svg", "thank-you.html"];
const contents = Object.fromEntries(
  await Promise.all(files.map(async (file) => [file, await readFile(file, "utf8")]))
);

const jsonLdMatch = contents["index.html"].match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const jsonLd = jsonLdMatch ? JSON.parse(jsonLdMatch[1]) : null;
const graphTypes = jsonLd?.["@graph"]?.map((item) => item["@type"]) ?? [];

const checks = [
  ["homepage has one H1", (contents["index.html"].match(/<h1[ >]/g) || []).length === 1],
  ["homepage identifies draft status", contents["index.html"].includes("remains in draft")],
  ["homepage links official law", contents["index.html"].includes("resmigazete.gov.tr")],
  ["homepage links draft guidance", contents["index.html"].includes("gib.gov.tr")],
  ["living guide is the primary offer", contents["index.html"].includes("Expected launch price") && contents["index.html"].includes("&euro;89")],
  ["homepage has FAQ structured data", contents["index.html"].includes('"@type": "FAQPage"')],
  ["JSON-LD parses and identifies the site", graphTypes.includes("Organization") && graphTypes.includes("WebSite") && graphTypes.includes("WebPage") && graphTypes.includes("FAQPage")],
  ["LLM context links primary sources", contents["llms.txt"].includes("Official Gazette") && contents["llms.txt"].includes("draft Communique No. 333")],
  ["LLM context links machine-readable resources", contents["llms.txt"].includes("sitemap.xml") && contents["llms.txt"].includes("robots.txt")],
  ["machine-readable pricing is present", contents["pricing.md"].includes("EUR 89")],
  ["canonical matches the live custom domain", contents["index.html"].includes('<link rel="canonical" href="https://turkeynondom.com/">')],
  ["sitemap uses the live canonical host", contents["sitemap.xml"].includes("https://turkeynondom.com/")],
  ["AI crawlers are explicitly allowed", ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended", "Bingbot"].every((bot) => contents["robots.txt"].includes(`User-agent: ${bot}`))],
  ["brand uses the Article 20/D monogram", contents["index.html"].includes("<span>20</span><b>/D</b>") && !contents["favicon.svg"].includes("<circle")],
  ["updates page has dated source-based entries", contents["updates.html"].includes('id="2026-06-20"') && contents["updates.html"].includes('id="2026-06-04"') && contents["updates.html"].includes("resmigazete.gov.tr") && contents["updates.html"].includes("gib.gov.tr")],
  ["updates page has collection structured data", contents["updates.html"].includes('"@type": "CollectionPage"') && contents["updates.html"].includes('"@type": "ItemList"')],
  ["guide uses publication-list language", contents["index.html"].includes("Expected launch price") && contents["index.html"].includes("Join the publication list") && !/founding|reserve/i.test(contents["index.html"])],
  ["checker has four questions", (contents["index.html"].match(/data-question=/g) || []).length === 4],
  ["checker script is present", contents["script.js"].includes("eligibility-checker")],
  ["mobile breakpoint is present", contents["styles.css"].includes("@media (max-width: 760px)")],
  ["privacy explains local checker", contents["privacy.html"].includes("runs in your browser")],
  ["privacy explains the publication form", contents["privacy.html"].includes("FormSubmit") && contents["privacy.html"].includes("publication list")],
  ["thank-you page exists", contents["thank-you.html"].includes("Thank you.") && contents["thank-you.html"].includes("publication list")],
  ["homepage has a real signup form", contents["index.html"].includes('class="signup-form"') && contents["index.html"].includes('action="https://formsubmit.co/hello@turkeynondom.com"')],
  ["homepage has planning tools", contents["index.html"].includes('id="tax-savings-tool"') && contents["index.html"].includes('id="deadline-tool"')],
  ["homepage has scenario content", contents["index.html"].includes("UK non-dom") && contents["index.html"].includes("Remote founder")],
  ["homepage covers the larger Law 7582 planning window", contents["index.html"].includes("Asset regularisation") && contents["index.html"].includes("31 July 2027")],
  ["calculator script is present", contents["script.js"].includes("calculateTaxExposure") && contents["script.js"].includes("renderDeadline")],
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
