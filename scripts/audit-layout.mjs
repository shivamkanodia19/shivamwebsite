import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const phase = process.argv[2] || "before";
const baseURL = process.env.BASE_URL || "http://127.0.0.1:8080";
const outputDir = path.resolve("test-results", `audit-${phase}`);
const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x667", width: 375, height: 667 },
];
const selectors = {
  hero: "#hero",
  experience: "#work",
  clinicalhours: "#clinicalhours",
  research: "#research",
  builds: "#builds",
  projects: "#projects",
  recognition: "#recognition",
  closing: "#resume",
};

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();
const report = {};

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: "networkidle" });
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(outputDir, `home-${viewport.name}.png`), fullPage: true });

  const metrics = await page.evaluate((sectionSelectors) => {
    const elementMetrics = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        top: Math.round(rect.top + scrollY),
        height: Math.round(rect.height),
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
      };
    };
    const headings = [...document.querySelectorAll("h1, h2, h3")].map((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      const lines = new Set([...range.getClientRects()].map((rect) => Math.round(rect.top)));
      const rect = heading.getBoundingClientRect();
      return { text: heading.textContent.trim(), tag: heading.tagName, lines: lines.size, width: Math.round(rect.width), height: Math.round(rect.height) };
    });
    const images = [...document.images].map((image) => {
      const rect = image.getBoundingClientRect();
      return { src: image.getAttribute("src"), natural: `${image.naturalWidth}x${image.naturalHeight}`, rendered: `${Math.round(rect.width)}x${Math.round(rect.height)}`, fit: getComputedStyle(image).objectFit };
    });
    return {
      pageHeight: document.documentElement.scrollHeight,
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      sections: Object.fromEntries(Object.entries(sectionSelectors).map(([name, selector]) => [name, elementMetrics(selector)])),
      headings,
      images,
    };
  }, selectors);

  report[viewport.name] = metrics;
  for (const [name, selector] of Object.entries(selectors)) {
    const locator = page.locator(selector);
    if (await locator.count()) {
      await locator.screenshot({ path: path.join(outputDir, `${name}-${viewport.name}.png`) });
    }
  }

  await page.goto(`${baseURL}/pitch`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outputDir, `pitch-${viewport.name}.png`), fullPage: true });
  report[`pitch-${viewport.name}`] = await page.evaluate(() => ({
    pageHeight: document.documentElement.scrollHeight,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: innerWidth,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
  }));
  await context.close();
}

await browser.close();
await fs.writeFile(path.join(outputDir, "metrics.json"), JSON.stringify(report, null, 2));
console.log(path.join(outputDir, "metrics.json"));
