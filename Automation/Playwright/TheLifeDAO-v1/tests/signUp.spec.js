import { test, expect } from "@playwright/test";
const { SignUp } = require("../pages/SignUp");
const {
  getVerificationLinkFromEmail,
} = require("../helpers/retrieveVerificationLink");
const { verifyCaptcha } = require("../helpers/verifyCaptcha");
const userDetails = require("../data/test-user.json");

test.describe("Sign Up Test Cases", () => {
  const serverId = "2z9fljmb";
  const serverDomain = `@${serverId}.mailosaur.net`;

  let emailAddress;
  let signUpPage;
  let verificationEmailLink;

  test.beforeAll(() => {
    const timestamp = Date.now();
    emailAddress = `testuser${timestamp}${serverDomain}`;
  });

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUp(page);
    await page.goto("/app/sign-up", { waitUntil: "domcontentloaded" });
  });

  test("Verify a user can sign up with a valid email and compliant password", async ({
    page,
  }) => {
    await signUpPage.signUp(
      emailAddress,
      userDetails.password,
      userDetails.password
    );
    await verifyCaptcha(page);
    await expect(signUpPage.signUpSuccessText).toBeVisible();
  });

  test("Verify the system prevents signup with an already registered email", async ({
    page,
  }) => {
    await signUpPage.signUp(
      userDetails.existingEmail,
      userDetails.password,
      userDetails.password
    );
    await verifyCaptcha(page);
    await expect(signUpPage.userExistsError).toBeVisible();
  });

  test("Verify that the Sign up button is disabled if the password does not meet the criteria", async ({
    page,
  }) => {
    await signUpPage.email.fill(emailAddress);
    await signUpPage.password.fill(userDetails.invalidPassword);
    await signUpPage.repeatPassword.fill(userDetails.invalidPassword);
    await verifyCaptcha(page);

    await expect(signUpPage.signUpBtn).toBeDisabled();
  });

  test("Verify the system detects and rejects mismatched passwords during signup", async ({
    page,
  }) => {
    await signUpPage.email.fill(emailAddress);
    await signUpPage.password.fill(userDetails.password);
    await signUpPage.repeatPassword.fill(userDetails.invalidPassword);
    await verifyCaptcha(page);

    await expect(signUpPage.signUpBtn).toBeDisabled();
  });

  test("Verify users can navigate to the Log in page from the Sign up page", async ({
    page,
  }) => {
    await signUpPage.logInLink.click();
    expect(page.url()).toBe("https://uat.thelifedao.io/app/sign-in");
  });

  test("Verify the password field’s visibility toggle switches between hidden and visible modes when clicked", async ({
    page,
  }) => {
    await signUpPage.password.fill(userDetails.password);
    for (const expectedType of ["text", "password", "text"]) {
      await signUpPage.passwordVisibilityToggle.click();
      await expect(signUpPage.password).toHaveValue(userDetails.password);
      await expect(signUpPage.password).toHaveAttribute("type", expectedType);
    }
  });

  test("Verify that the email is confirmed when a user clicks on the verification link sent to their email and user cannot use the link again after confirmation", async ({
    page,
    request,
  }) => {
    await signUpPage.signUp(
      emailAddress,
      userDetails.password,
      userDetails.password
    );
    await verifyCaptcha(page);

    verificationEmailLink = await getVerificationLinkFromEmail(emailAddress);
    await page.goto(verificationEmailLink);
    await expect(page.getByText("Welcome back to The LifeDAO")).toBeVisible();

    await page.goto(verificationEmailLink);
    await expect(page.getByText("Link Expired")).toBeVisible();
    await expect(signUpPage.signUpAgainBtn).toBeVisible();
  });
});
