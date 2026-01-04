import { test, expect } from "@playwright/test";
const { SignIn } = require("../../pages/SignIn");
const { KYCVerification } = require("../../pages/KYCVerification");
const {
  initiateKYC,
  getApplicantIdFromKYCInit,
  simulateKYCReview,
} = require("../../helpers/completeKYC");
const { createSubscribedUser } = require("../../helpers/createSubscribedUser");

test.describe("KYC Resubmission Flow", () => {
  let testUser = {};

  // Create subscribed user once before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    testUser = await createSubscribedUser(page, request);
    await page.close();
  });

  test("Verify that a user is allowed to resubmit when the KYC rejection is not final", async ({
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

    // Step 4: Simulate KYC rejection with retry option
    await simulateKYCReview(request, applicantId, {
      reviewAnswer: "RED",
      reviewRejectType: "RETRY",
      rejectLabels: ["ID_INVALID"],
      moderationComment: "Upload a valid ID",
    });

    // Step 5: Reload and verify resubmission is prompted
    await page.reload();
    await expect(kycPage.resubmitVerificationButton).toBeVisible();
  });
});
