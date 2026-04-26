import { test, expect } from "@playwright/test";

test.describe("desktop nav", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("nav links route to the right pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Solutions" }).first().click();
    await expect(page).toHaveURL(/\/solutions$/);
    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about$/);
  });
});

test.describe("mobile nav", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("hamburger reveals drawer with links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: "Solutions" }).first()).toBeVisible();
  });
});
