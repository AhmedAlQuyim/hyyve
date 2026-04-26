import { test, expect } from "@playwright/test";

test("homepage renders all five sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Tell us the work/ })).toBeVisible();
  await expect(page.getByText("AI consultancy · Made for mid-market ops")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Three cells, one hive/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Four steps/ })).toBeVisible();
  await expect(page.getByText(/We thought we were buying agents/)).toBeVisible();
  await expect(page.getByRole("heading", { name: /The fastest way to know/ })).toBeVisible();
});

test("Start a Brief button is present (placeholder behavior in Phase 1)", async ({ page }) => {
  await page.goto("/");
  const buttons = page.getByRole("button", { name: /Start a Brief/i });
  await expect(buttons.first()).toBeVisible();
});
