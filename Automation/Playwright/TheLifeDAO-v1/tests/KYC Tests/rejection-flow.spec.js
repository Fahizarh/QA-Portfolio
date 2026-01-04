import { test, expect } from "@playwright/test";
const { SignIn } = require("../../pages/SignIn");
const { KYCVerification } = require("../../pages/KYCVerification");
const {
  getApplicantIdFromKYCInit,
  simulateKYCReview,
} = require("../../helpers/completeKYC");
const { createSubscribedUser } = require("../../helpers/createSubscribedUser");

test.describe("KYC Rejection Flow", () => {
  let testUser = {};

  // Create subscribed user once before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    testUser = await createSubscribedUser(page, request);
    await page.close();
  });

  test("Verify that a user is not allowed to resubmit KYC after final rejection", async ({
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
    const applicantId = await applicantIdPromise;

    // Step 3: Simulate rejection
    await simulateKYCReview(request, applicantId, {
      reviewAnswer: "RED",
      reviewRejectType: "FINAL",
      rejectLabels: ["AGE_REQUIREMENT_MISMATCH"],
      moderationComment: "Age ineligibility.",
    });

    // Step 4: Reload and check for no resubmit
    await page.reload();
    await expect(kycPage.resubmitVerificationButton).not.toBeVisible();
  });
});
