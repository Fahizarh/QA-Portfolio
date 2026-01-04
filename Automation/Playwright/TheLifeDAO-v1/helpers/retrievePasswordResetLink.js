const MailosaurClient = require("mailosaur");
const apiKey = "x5SUWIEkPaLqgJefPogW3djDuKNZW3df";
const mailosaur = new MailosaurClient(apiKey);
const serverID = "2z9fljmb";

// Retrieve Password Reset Link
async function retrievePasswordResetLink(emailAddress) {
  const emailSubject = "Reset Your Password";
  const searchCriteria = {
    subject: emailSubject,
    sentTo: emailAddress,
    receivedAfter: new Date(Date.now() - 5000),
  };

  const resetPasswordEmail = await mailosaur.messages.get(
    serverID,
    searchCriteria,
    {
      timeout: 10000,
    }
  );
  let resetPasswordLink = resetPasswordEmail.html.links[0].href;
  return resetPasswordLink;
}

module.exports = {
  retrievePasswordResetLink,
};
