import { test, expect } from "@playwright/test";

test("solutions page lists all three lanes with anchors", async ({ page }) => {
  await page.goto("/solutions");
  for (const id of ["automation", "agentic", "consultation"]) {
    const section = page.locator(`section#${id}`);
    await expect(section).toBeVisible();
  }
});

test("anchor link to /solutions#agentic focuses the right section", async ({ page }) => {
  await page.goto("/solutions#agentic");
  const target = page.locator("section#agentic");
  await expect(target).toBeInViewport();
});
