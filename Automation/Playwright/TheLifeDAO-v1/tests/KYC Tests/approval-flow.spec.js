import { test, expect } from "@playwright/test";
const { SignIn } = require("../../pages/SignIn");
const { KYCVerification } = require("../../pages/KYCVerification");
const {
  getApplicantIdFromKYCInit,
  simulateKYCReview,
  initiateKYC,
} = require("../../helpers/completeKYC");
const { createSubscribedUser } = require("../../helpers/createSubscribedUser");
test.describe("KYC Approval Flow", () => {
  let testUser = {};

  // Create subscribed user once before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    testUser = await createSubscribedUser(page, request);
    await page.close();
  });

  test("Verify that a user's KYC is verified when successful.", async ({
    page,
    request,
  }) => {
    const signInPage = new SignIn(page);
    const kycPage = new KYCVerification(page);

    // Step 1: Sign in
    await page.goto("/app/sign-in", { waitUntil: "domcontentloaded" });
    await signInPage.signIn(testUser.email, testUser.password);

    // Step 2: Start KYC and get applicant ID
    const applicantIdPromise = getApplicantIdFromKYCInit(page);
    await kycPage.startVerificationButton.click();
    await initiateKYC(page);
    const applicantId = await applicantIdPromise;

    await simulateKYCReview(request, applicantId, {
      reviewAnswer: "GREEN",
    });

    await page.reload();
    await expect(page.getByText("KYC Verified").first()).toBeVisible();
  });
});
