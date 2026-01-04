import { test, expect } from "@playwright/test";
const { HomePage } = require("../pages/HomePage");
const { TestCasesPage } = require("../pages/TestCasesPage");

test.describe("Test Cases Page", () => {
  let homePage;
  let testCasesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testCasesPage = new TestCasesPage(page);
    await page.goto("/");
    await expect(homePage.homePageSlider).toBeVisible();
  });

  test("Verify Test Cases Page", async ({ page }) => {
    await testCasesPage.testCases.click();
    await expect(page).toHaveURL("/test_cases");
  });
});
