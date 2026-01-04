const { getVerificationLinkFromEmail } = require("./retrieveVerificationLink");
const { registerUserViaApi } = require("./registerViaAPI");
const userDetails = require("../data/test-user.json");

async function createVerifiedUser(page, requestContext) {
  const timestamp = Date.now();
  const serverDomain = "@2z9fljmb.mailosaur.net";
  const email = `testuser${timestamp}${serverDomain}`;
  const password = userDetails.password;

  await registerUserViaApi(requestContext, email, password);

  const verificationLink = await getVerificationLinkFromEmail(email);
  await page.goto(verificationLink, { waitUntil: "domcontentloaded" });

  return { email, password };
}

module.exports = {
  createVerifiedUser,
};
