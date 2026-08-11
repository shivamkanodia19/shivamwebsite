const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:5174/pitch");
  await page.waitForTimeout(1200);
  
  for (let i = 1; i <= 7; i++) {
    await page.screenshot({ path: `pitch-s${i}.png`, fullPage: false });
    if (i < 7) {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(600);
    }
  }
  await browser.close();
  console.log("done");
})();
