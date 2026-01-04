const { createSubscribedUser } = require("../helpers/createSubscribedUser");
const {
  initiateKYC,
  getApplicantIdFromKYCInit,
  simulateKYCReview,
} = require("../helpers/completeKYC");
const { Dashboard } = require("../pages/Dashboard");
const { KYCVerification } = require("../pages/KYCVerification");

async function createKYCVerifiedUser(page, request) {
  // Step 1 - Create a new user and subscribe to membership
  let { email, password } = await createSubscribedUser(page, request);

  const dashboardPage = new Dashboard(page);
  await dashboardPage.cancelWelcomeModal.click();

  const applicantIdPromise = getApplicantIdFromKYCInit(page);
  const kycPage = new KYCVerification(page);
  await kycPage.startVerificationButton.click();
  await initiateKYC(page);
  const applicantId = await applicantIdPromise;

  await simulateKYCReview(request, applicantId, {
    reviewAnswer: "GREEN",
  });

  return { email, password };
}

module.exports = { createKYCVerifiedUser };
