import { test, expect } from "@playwright/test";

test("about page renders headline, principles, and team", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /We build the agents/ })).toBeVisible();
  // 4 principles + 4 team cards = 8 h3 elements inside main
  const headings = page.locator("main h3");
  await expect(headings).toHaveCount(8);
});
