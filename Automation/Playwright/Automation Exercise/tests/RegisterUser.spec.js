import { test, expect } from "@playwright/test";
const { RegistrationPage } = require("../pages/RegistrationPage");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const userData = require("../data/registration.json");

test.describe("Registration Test Cases", () => {
  let registration;
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    homePage = new HomePage(page);
    registration = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    
    await expect(homePage.homePageSlider).toBeVisible();
    await homePage.logInOrSignUp.click();
    await expect(registration.newUserSignUpText).toBeVisible();
  });

  test("Register User", async ({ page }) => {
    const { signUpDetails, testData } = userData;

    await registration.signUp(signUpDetails.username, signUpDetails.email);
    await expect(registration.accountInformationText).toBeVisible();

    await registration.registration(
      testData.username,
      testData.password,
      testData.day,
      testData.month,
      testData.year,
      testData.firstname,
      testData.lastname,
      testData.company,
      testData.address,
      testData.country,
      testData.state,
      testData.city,
      testData.zipcode,
      testData.phoneNumber
    );

    await registration.createAccountButton.click();
    await expect(registration.accountCreatedText).toBeVisible();
    await registration.continueButton.click();
    await loginPage.isLoggedIn(testData.username);
    await registration.deleteAccount.click();
    await expect(registration.accountDeletedText).toBeVisible();
  });

  test("Register user with existing email", async ({ page }) => {
    const { existingSignUpDetails } = userData;

    await registration.signUp(
      existingSignUpDetails.username,
      existingSignUpDetails.email
    );
    await expect(registration.emailExistsError).toBeVisible();
  });
});
