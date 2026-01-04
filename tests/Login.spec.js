import { test, expect } from "@playwright/test";
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const loginDetails = require("../data/login.json");

test.describe("Login Test Cases", () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await page.goto("/");
    await expect(homePage.homePageSlider).toBeVisible();
    await homePage.logInOrSignUp.click();
    await expect(loginPage.logIntoAccountText).toBeVisible();
  });

  test("Login with correct email and password", async ({ page }) => {
    const { validLogInDetails } = loginDetails;

    await loginPage.loginWithDetails(
      validLogInDetails.email,
      validLogInDetails.password
    );
    await loginPage.isLoggedIn(validLogInDetails.username);
  });

  test("Login with incorrect email and password", async ({ page }) => {
    const { invalidLogInDetails } = loginDetails;

    await loginPage.loginWithDetails(
      invalidLogInDetails.email,
      invalidLogInDetails.password
    );
    await expect(loginPage.incorrectLoginError).toBeVisible();
  });

  test("Logout user", async ({ page }) => {
    const { validLogInDetails } = loginDetails;

    await loginPage.loginWithDetails(
      validLogInDetails.email,
      validLogInDetails.password
    );
    await loginPage.isLoggedIn(validLogInDetails.username);
    await loginPage.logOut.click();
    await expect(page).toHaveURL("/login");
  });
});
