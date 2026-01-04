const { expect } = require("@playwright/test");

async function forgotPassword(requestContext, email) {
  const response = await requestContext.post(
    "https://uat.thelifedao.io/api/v2/auth/forget-password",
    {
      data: {
        email,
      },
    }
  );
  expect(response.status()).toBe(200);
}

module.exports = {
  forgotPassword,
};
