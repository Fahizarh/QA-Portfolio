import { test, expect } from "@playwright/test";
const { HomePage } = require("../pages/HomePage");
const { SubscriptionPage } = require("../pages/SubscriptionPage");
const { CartPage } = require("../pages/CartPage");

test.describe("Subscription Test Cases", () => {
  let homePage;
  let subscriptionPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    subscriptionPage = new SubscriptionPage(page);
    cartPage = new CartPage(page);
    await page.goto("/");
    await expect(homePage.homePageSlider).toBeVisible();
  });

  test("Verify Subscription in Home Page", async ({ page }) => {
    const emailAddress = "testemail@yahoo.com";
    await subscriptionPage.subscribe(emailAddress);
  });

  test("Verify Subscription in Cart Page", async ({ page }) => {
    const emailAddress = "testemail@yahoo.com";

    await cartPage.cart.click();
    await subscriptionPage.subscribe(emailAddress);
  });
});
