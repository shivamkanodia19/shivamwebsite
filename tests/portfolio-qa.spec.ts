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
    await expect(page.getByRole("heading", { name: "I build things that work." })).toBeVisible();
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
  await expect(project.getByText("Owned")).toBeVisible();
  const focusStyle = await project.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(focusStyle).not.toBe("none");
  const animationDuration = await page.locator(".workflow-track").evaluate((element) => getComputedStyle(element, "::before").animationDuration);
  expect(Number.parseFloat(animationDuration)).toBeLessThanOrEqual(0.001);
});

for (const viewport of [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "390x844", width: 390, height: 844 },
]) {
  test(`pitch layout ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/pitch");
    await expect(page.getByRole("heading", { name: "I build things that work." })).toBeVisible();
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
