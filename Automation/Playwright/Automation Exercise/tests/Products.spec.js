import { test, expect } from "@playwright/test";
const { HomePage } = require("../pages/HomePage");
const { ProductPage } = require("../pages/ProductPage");

test.describe("Test Cases Page", () => {
  let homePage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await page.goto("/");
    await expect(homePage.homePageSlider).toBeVisible();
  });

  test("Verify All Products and Product Detail Page", async ({ page }) => {
    await productPage.products.click();
    await expect(page).toHaveURL("/products");
    await expect(productPage.productsList).toBeVisible();
    await productPage.firstProductDetail();
  });

  test("Search Product", async ({ page }) => {
    const productName = "Blue Top";

    await productPage.products.click();
    await expect(page).toHaveURL("/products");
    await expect(productPage.productsList).toBeVisible();
    await productPage.searchProduct(productName);
  });
});
