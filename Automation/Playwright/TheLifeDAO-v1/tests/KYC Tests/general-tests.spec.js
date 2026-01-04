import { test, expect } from "@playwright/test";
const { SignIn } = require("../../pages/SignIn");
const { KYCVerification } = require("../../pages/KYCVerification");
const { initiateKYC } = require("../../helpers/completeKYC");
const { createSubscribedUser } = require("../../helpers/createSubscribedUser");

test.describe("General KYC Verification Test Cases", () => {
  let signInPage;
  let kycPage;
  let testUser = {};

  // Create subscribed user once before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    testUser = await createSubscribedUser(page, request);
    await page.close();
  });

  // Sign in before each test
  test.beforeEach(async ({ page }) => {
    signInPage = new SignIn(page);
    kycPage = new KYCVerification(page);

    await page.goto("/app/sign-in", { waitUntil: "domcontentloaded" });
    await signInPage.signIn(testUser.email, testUser.password);
  });

  test("Verify that the Start Verification button is visible after a user completes payment", async ({
    page,
  }) => {
    await expect(kycPage.startVerificationButton).toBeVisible();
  });

  test("Verify that a prepaid member can initiate the KYC verification by submitting the required documents", async ({
    page,
  }) => {
    await kycPage.startVerificationButton.click();
    const documentSubmission = await initiateKYC(page);
    expect(documentSubmission.getByText("Verifying your ID")).toBeVisible();
  });
});
