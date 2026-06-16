import { expect, test } from "@playwright/test";

test("starts in default light mode without theme controls", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: /theme/i })).toHaveCount(0);

  const themeBackground = await page.locator("html").evaluate((node) => {
    return window.getComputedStyle(node).getPropertyValue("--bg").trim();
  });

  expect(themeBackground).toBe("#e8f8fd");
});

test("matches mockup delivery density", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  await expect(page.getByText("50 mock orders, 5 status variants")).toBeVisible();
  await expect(page.getByRole("button", { name: "Load 20 more" })).toBeVisible();
  await expect(page.getByText("Showing 30 of 50")).toBeVisible();
});

test("hides reset in default state", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  await expect(page.getByRole("button", { name: "Reset" })).toHaveCount(0);

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
});

test("shows reset when search or status filter is active", async ({ page }) => {
  await page.goto("/");

  const resetButton = page.getByRole("button", { name: "Reset" });
  await expect(resetButton).toHaveCount(0);

  await page.getByRole("textbox", { name: "Search deliveries" }).fill("PLK");
  await expect(resetButton).toBeVisible();

  await resetButton.click();
  await expect(resetButton).toHaveCount(0);

  await page.getByRole("button", { name: "RETURNED" }).click();
  await expect(resetButton).toBeVisible();
});

test("loads more client-side without list skeleton", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1280, "desktop-only load more position");

  await page.goto("/");

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  await page.getByRole("button", { name: "Load 20 more" }).click();

  expect(await page.locator(".skeleton-card").count()).toBe(0);
  await expect(page.locator("article.delivery-card")).toHaveCount(50);
  await expect(page.getByText("Showing 50 of 50")).toBeVisible();
});

test("updates search results without list skeleton", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  await page.getByRole("textbox", { name: "Search deliveries" }).fill("PLK");

  await expect(page.locator(".skeleton-card")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
  await expect
    .poll(() => page.locator("article.delivery-card").count())
    .toBeGreaterThan(0);
  await expect
    .poll(() => page.locator("article.delivery-card").count())
    .toBeLessThan(30);
});

test("updates status filter without list skeleton", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  await page.getByRole("button", { name: "RETURNED" }).click();

  await expect(page.locator(".skeleton-card")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
  await expect(page.getByText("Showing 9 of 9")).toBeVisible();
});

test("keeps search and filter controls sticky", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article.delivery-card")).toHaveCount(30);

  const controls = page.locator(".dashboard-controls");
  await expect(controls).toHaveCSS("position", "sticky");

  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(controls).toBeVisible();
  await expect
    .poll(async () => {
      const box = await controls.boundingBox();

      return Math.round(box?.y ?? 999);
    })
    .toBeLessThanOrEqual(1);
});

test("keeps desktop sidebar sticky", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1280, "desktop-only sidebar");

  await page.goto("/");
  await expect(page.locator("article.delivery-card")).toHaveCount(30);

  const sidebar = page.locator(".sidebar-shell");
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toHaveCSS("position", "sticky");
  await expect
    .poll(async () => {
      const box = await sidebar.boundingBox();

      return Math.round(box?.height ?? 0);
    })
    .toBeGreaterThanOrEqual(page.viewportSize()?.height ?? 0);

  await page.evaluate(() => window.scrollTo(0, 900));
  await expect
    .poll(async () => {
      const box = await sidebar.boundingBox();

      return Math.round(box?.y ?? 999);
    })
    .toBeLessThanOrEqual(1);
});

test("shows compact mobile navigation instead of sidebar", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1280, "mobile-only navigation");

  await page.goto("/");

  await expect(page.locator(".sidebar-shell")).toBeHidden();

  const mobileNav = page.getByRole("navigation", { name: "Mobile primary" });
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav).toHaveCSS("grid-template-columns", /.+/);

  for (const label of [
    "Dashboard",
    "Delivery Order",
    "Schedule",
    "Manifest",
    "History",
    "Report",
  ]) {
    await expect(mobileNav.getByRole("button", { name: label })).toBeVisible();
  }
});

test("shows four compact metric cards on mobile", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1280, "mobile-only metrics");

  await page.goto("/");
  await expect(page.locator(".metric-card")).toHaveCount(4);

  const firstMetric = page.locator(".metric-card").first();
  const secondMetric = page.locator(".metric-card").nth(1);
  const firstBox = await firstMetric.boundingBox();
  const secondBox = await secondMetric.boundingBox();

  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThanOrEqual(1);

  const metricValueYs = await page.locator(".metric-value").evaluateAll((nodes) =>
    nodes.map((node) => Math.round(node.getBoundingClientRect().y)),
  );
  expect(new Set(metricValueYs).size).toBe(1);
});

test("highlights search matches inside delivery cards", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article.delivery-card")).toHaveCount(30);

  await page.getByRole("textbox", { name: "Search deliveries" }).fill("Busan");
  await expect(page.locator("article.delivery-card .search-highlight")).not.toHaveCount(0);
  await expect(page.locator("article.delivery-card .search-highlight").first()).toHaveText(
    /busan/i,
  );

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("article.delivery-card .search-highlight")).toHaveCount(0);
});

test("keeps selected detail panel sticky on desktop", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1280, "desktop-only detail panel");

  await page.goto("/");
  await expect(page.locator("article.delivery-card")).toHaveCount(30);

  const selectedPanel = page.getByRole("complementary").filter({
    has: page.getByRole("heading", { name: "Selected Detail" }),
  });

  await expect(selectedPanel).toBeVisible();
  await expect(selectedPanel).toHaveCSS("position", "sticky");

  await page.evaluate(() => window.scrollTo(0, 900));
  await expect
    .poll(async () => {
      const box = await selectedPanel.boundingBox();

      return Math.round(box?.y ?? 999);
    })
    .toBeLessThanOrEqual(1);
});

test("shows scroll-to-top after scrolling and returns to top", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  const scrollTopButton = page.getByRole("button", { name: "Scroll to top" });
  await expect(scrollTopButton).toHaveCount(0);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(scrollTopButton).toBeVisible();

  await scrollTopButton.click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 })
    .toBeLessThan(24);
});

test("keeps mobile scroll-to-top above detail sheet", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1280, "mobile-only sheet overlap check");

  await page.goto("/");
  await expect(page.locator("article.delivery-card")).toHaveCount(30);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

  const scrollTopButton = page.getByRole("button", { name: "Scroll to top" });
  await expect(scrollTopButton).toBeVisible();

  const buttonBox = await scrollTopButton.boundingBox();
  const sheetBox = await page.locator(".fixed.inset-x-0.bottom-0").boundingBox();

  expect(buttonBox).not.toBeNull();
  expect(sheetBox).not.toBeNull();
  expect(buttonBox!.y + buttonBox!.height).toBeLessThanOrEqual(sheetBox!.y - 8);
});
