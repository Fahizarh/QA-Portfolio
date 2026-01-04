const { request, expect } = require("@playwright/test");
require("dotenv").config();

const path = require("path");
const filePath = path.resolve(__dirname, "../data/passport.jpg");

async function getIframeBody(page, iFrameLocator) {
  const frame = await (
    await page.waitForSelector(iFrameLocator)
  ).contentFrame();
  return frame;
}

async function initiateKYC(page) {
  const frame = await getIframeBody(page, 'iframe[src*="sumsub.com/websdk"]');

  await frame.getByRole("button", { name: "Continue" }).click();
  await frame.getByRole("button", { name: "Start Verification" }).click();
  await frame.getByRole("button", { name: "Agree and continue" }).click();
  await frame.getByText("Passport").click();
  await frame.getByRole("button", { name: "Continue", exact: true }).click();
  await frame.locator('input[type="file"]').setInputFiles(filePath);
  await page.waitForTimeout(8000);
  await frame.getByRole("button", { name: "Continue", exact: true }).click();

  return frame;
}

async function getApplicantIdFromKYCInit(page) {
  return new Promise((resolve) => {
    page.on("response", async (response) => {
      if (
        response.url().includes("/api/v2/user/initialize-kyc") &&
        response.request().method() === "POST"
      ) {
        const body = await response.json();
        resolve(body.sessionId);
      }
    });
  });
}

async function simulateKYCReview(
  requestContext,
  applicantId,
  reviewBody = { reviewAnswer: "GREEN" }
) {
  const ts = Math.floor(Date.now() / 1000);
  const method = "POST";
  const path = `/resources/applicants/${applicantId}/status/testCompleted`;

  const bodyString = JSON.stringify(reviewBody);
  const signaturePayload = `${ts}${method}${path}${bodyString}`;

  const signature = crypto
    .createHmac("sha256", process.env.TAKASURE_SUMSUB_SECRET_KEY)
    .update(signaturePayload)
    .digest("hex");

  const response = await requestContext.post(`https://api.sumsub.com${path}`, {
    headers: {
      "X-App-Token": process.env.TAKASURE_SUMSUB_APP_TOKEN,
      "X-App-Access-Sig": signature,
      "X-App-Access-Ts": `${ts}`,
      "Content-Type": "application/json",
    },
    data: reviewBody,
  });

  return response.json();
}

module.exports = {
  initiateKYC,
  getApplicantIdFromKYCInit,
  simulateKYCReview,
};
