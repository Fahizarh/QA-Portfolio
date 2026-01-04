const { createVerifiedUser } = require("./createVerifiedUser");
const { fillCardDetails } = require("./paymentHelper");
const cards = require("../data/card-details.json");
const { request } = require("@playwright/test");
const { SignIn } = require("../pages/SignIn");

async function createSubscribedUser(page, request) {
  // Step 1 - Create and verify new user
  let { email, password } = await createVerifiedUser(page, request);

  // Step 2 - Sign in user
  const signInPage = new SignIn(page);
  await page.goto("/app/sign-in", { waitUntil: "domcontentloaded" });
  await signInPage.signIn(email, password);

  // Step 3 - Make payment with valid details
  await fillCardDetails(page, cards.validCard);

  return { email, password };
}

module.exports = { createSubscribedUser };
