

const MailosaurClient = require("mailosaur");
const apiKey = "x5SUWIEkPaLqgJefPogW3djDuKNZW3df";
const mailosaur = new MailosaurClient(apiKey);
const serverID = "2z9fljmb";

// Retrieve Verification Link from Email after Sign up
async function getVerificationLinkFromEmail(emailAddress) {
  const emailSubject = "Verify Your Email";
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
      timeout: 10000,
    }
  );
  let verificationLink = verificationEmail.html.links[0].href;
  return verificationLink;
}

module.exports = {
  getVerificationLinkFromEmail,
};
