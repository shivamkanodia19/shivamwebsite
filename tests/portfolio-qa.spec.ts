import { expect, test } from "@playwright/test";

const homeViewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x667", width: 375, height: 667 },
];

for (const viewport of homeViewports) {
  test(`homepage layout ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "I turn messy systems into working software." })).toBeVisible();
    await expect(page.locator(".role-card")).toHaveCount(3);
    await expect(page.locator("img")).not.toHaveCount(0);

    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(150);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const brokenImages = await page.locator("img").evaluateAll((images) =>
      images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).length,
    );
    expect(brokenImages).toBe(0);

    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/[\u2013\u2014]/);

    const forbiddenFonts = await page.locator("h1, h2, h3, p, a, button").evaluateAll((elements) =>
      elements.filter((element) => /Playfair|Georgia/i.test(getComputedStyle(element).fontFamily)).length,
    );
    expect(forbiddenFonts).toBe(0);

    await page.screenshot({ path: `verify-home-${viewport.name}.png`, fullPage: true });
  });
}

test("mobile first screen contains all company credentials", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const lastCredential = page.locator(".role-card").last();
  await expect(lastCredential).toBeVisible();
  const box = await lastCredential.boundingBox();
  expect(box).not.toBeNull();
  expect((box?.y ?? 9999) + (box?.height ?? 0)).toBeLessThanOrEqual(667);
});

test("mobile menu closes on Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("poster is contained and directly accessible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#research");
  const poster = page.getByAltText("Full cattle futures forecasting research poster");
  await poster.scrollIntoViewIfNeeded();
  await expect(poster).toBeVisible();
  await expect.poll(() => poster.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const metrics = await poster.evaluate((image) => ({
    width: image.getBoundingClientRect().width,
    naturalWidth: (image as HTMLImageElement).naturalWidth,
    objectFit: getComputedStyle(image).objectFit,
  }));
  expect(metrics.width).toBeLessThanOrEqual(metrics.naturalWidth);
  expect(metrics.objectFit).toBe("contain");
  await expect(page.getByRole("link", { name: /View full poster/ })).toHaveAttribute("href", "/img/research-poster.jpg");
});

test("project proof is keyboard visible and reduced motion is respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#projects");
  const project = page.locator(".project-card").first();
  await project.focus();
  await expect(project.getByText("Designed the flow from conversation to structured clinical information.")).toBeVisible();
  const focusStyle = await project.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(focusStyle).not.toBe("none");
  const transitionDuration = await project.evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.001);
});

test("15-second recruiter scan identifies the complete range", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByText("Software Engineering Intern", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Business Intelligence Intern", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Co-founder", { exact: true }).first()).toBeVisible();
  const experienceTop = await page.locator("#work").evaluate((element) => element.getBoundingClientRect().top);
  expect(experienceTop).toBeLessThan(900);
});

test("30-second evidence scan exposes proof and contact paths", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  for (const proof of [
    "200+",
    "first clinic pilot partner",
    "65",
    "Working workflow prototype",
  ]) {
    await expect(page.getByText(proof, { exact: true }).first()).toBeAttached();
  }
  await expect(page.getByRole("link", { name: /Resume/ }).first()).toHaveAttribute("href", "/resume.pdf");
  await expect(page.getByRole("link", { name: /LinkedIn/ }).first()).toHaveAttribute("href", /linkedin\.com/);
  await expect(page.getByRole("link", { name: /Email/ }).first()).toHaveAttribute("href", /^mailto:/);
});

test("outside work keeps only the strength record proof", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#recognition");
  await expect(page.getByRole("heading", { name: "Strength outside the screen." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Three first-place USAPL meet results/ })).toHaveAttribute("href", /openpowerlifting\.org/);
  await expect(page.getByText("152.5 kg competition bench.")).toBeVisible();
  const sectionText = await page.locator("#recognition").innerText();
  expect(sectionText).not.toMatch(/Persona|Chase redesign|Aggie Venture Fund|EH EDGE|Student Research Week/);
});

test("hero profile card is a primary visual element", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const portrait = page.locator(".hero-portrait");
  const proof = page.locator(".hero-proof");
  await expect(proof).toBeVisible();
  const metrics = await portrait.evaluate((image) => {
    const imageRect = image.getBoundingClientRect();
    const cardRect = image.closest(".hero-proof")?.getBoundingClientRect();
    return {
      portraitWidth: imageRect.width,
      cardWidth: cardRect?.width ?? 0,
    };
  });
  expect(metrics.portraitWidth).toBeGreaterThanOrEqual(140);
  expect(metrics.cardWidth).toBeGreaterThanOrEqual(480);
});

test("ClinicalHours uses a real local product artifact without exposing private records", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#clinicalhours");
  const product = page.getByAltText("ClinicalHours opportunity map interface");
  await product.scrollIntoViewIfNeeded();
  await expect(product).toBeVisible();
  const metrics = await product.evaluate((image) => ({
    src: (image as HTMLImageElement).getAttribute("src"),
    naturalWidth: (image as HTMLImageElement).naturalWidth,
    renderedWidth: image.getBoundingClientRect().width,
  }));
  expect(metrics.src).toBe("/img/clinicalhours-product.png");
  expect(metrics.naturalWidth).toBe(1800);
  expect(metrics.renderedWidth).toBeLessThan(metrics.naturalWidth);
  const sectionText = await page.locator("#clinicalhours").innerText();
  expect(sectionText).not.toMatch(/patient|email address|phone/i);
});

test("page length and ClinicalHours placement meet scan targets", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900, maxPageHeight: 6500 },
    { width: 390, height: 844, maxPageHeight: 8000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const metrics = await page.evaluate(() => ({
      pageHeight: document.documentElement.scrollHeight,
      clinicalTop: document.querySelector("#clinicalhours")?.getBoundingClientRect().top ?? Infinity,
    }));
    expect(metrics.pageHeight).toBeLessThanOrEqual(viewport.maxPageHeight);
    expect(metrics.clinicalTop).toBeLessThanOrEqual(viewport.height * 3);
  }
});

for (const viewport of [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "390x844", width: 390, height: 844 },
]) {
  test(`pitch layout ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/pitch");
    await expect(page.getByRole("heading", { name: "I turn messy systems into working software." })).toBeVisible();
    await expect(page.getByText("Matic", { exact: true })).toBeVisible();
    await expect(page.getByText("Legends Global", { exact: true })).toBeVisible();
    await expect(page.getByText("ClinicalHours", { exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/[\u2013\u2014]/);
    await page.screenshot({ path: `verify-pitch-${viewport.name}.png`, fullPage: true });
  });
}
