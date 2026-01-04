const MailosaurClient = require("mailosaur");
const apiKey = "x5SUWIEkPaLqgJefPogW3djDuKNZW3df";
const mailosaur = new MailosaurClient(apiKey);
const serverID = "2z9fljmb";

// Retrieve Verification Link from Email after Sign up
async function getVerificationCodeFromEmail(page, emailAddress) {
  const emailSubject = "your one-time passcode to thirdweb";
  const searchCriteria = {
    subject: emailSubject,
    sentTo: emailAddress,
    receivedAfter: new Date(Date.now() - 5000),
  };
  // Wait for email with timeout
  const verificationEmail = await mailosaur.messages.get(
    serverID,
    searchCriteria,
    {
      timeout: 30000,
    }
  );

  const bodyText = verificationEmail.text.body;

  const match = bodyText.match(/\b\d{4,8}\b/);
  if (!match) {
    throw new Error(`No OTP found in email body: "${bodyText}"`);
  }

  const otp = match[0];
  console.log(`Retrieved OTP: ${otp}`);

  const inputs = page.locator(".code-input");
  for (let i = 0; i < otp.length; i++) {
    await inputs.nth(i).type(otp[i]);
  }
}

module.exports = {
  getVerificationCodeFromEmail,
};
