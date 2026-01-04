const { expect } = require("@playwright/test");

async function registerUserViaApi(requestContext, email, password) {
  const response = await requestContext.post(
    "https://uat.thelifedao.io/api/v2/signup",
    {
      data: {
        email,
        password,
        confirmPassword: password,
      },
    }
  );
  expect(response.status()).toBe(200);
}

module.exports = {
  registerUserViaApi,
};
