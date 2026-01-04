import { test, expect } from "@playwright/test";
const { SignIn } = require("../pages/SignIn");
const {
  retrievePasswordResetLink,
} = require("../helpers/retrievePasswordResetLink");
const { forgotPassword } = require("../helpers/forgetPasswordAPI");
const userDetails = require("../data/test-user.json");

test.describe("Sign In Test Cases", () => {
  let signInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignIn(page);
    await page.goto("/app/sign-in", { waitUntil: "domcontentloaded" });
  });

  test("Verify a user can log in successfully with valid credentials (email and password)", async ({
    page,
  }) => {
    await signInPage.signIn(userDetails.email, userDetails.password);
    await expect(signInPage.signInConfirmationText).toBeVisible();
  });

  test("Verify the system displays an error when an incorrect password is entered", async ({
    page,
  }) => {
    await signInPage.signIn(userDetails.email, userDetails.invalidPassword);
    await expect(signInPage.signInError).toBeVisible();
  });

  test("Verify the system rejects login attempts with an unregistered email", async ({
    page,
  }) => {
    const unregisteredEmail = "unregistered@gmail.com";
    await signInPage.signIn(unregisteredEmail, userDetails.password);
    await expect(signInPage.signInError).toBeVisible();
  });

  test("Verify the system does not allow login without providing login credentials", async ({
    page,
  }) => {
    await signInPage.logInBtn.click();
    await expect(signInPage.emailError).toBeVisible();
    await expect(signInPage.passwordError).toBeVisible();
  });

  test("Verify the password field’s visibility toggle switches between hidden and visible modes when clicked", async ({
    page,
  }) => {
    await signInPage.password.fill(userDetails.password);
    for (const expectedType of ["text", "password", "text"]) {
      await signInPage.passwordVisibilityToggle.click();
      await expect(signInPage.password).toHaveValue(userDetails.password);
      await expect(signInPage.password).toHaveAttribute("type", expectedType);
    }
  });

  test("Verify the Forgot password link redirects to the password reset request page", async ({
    page,
  }) => {
    await signInPage.forgotPassword.click();
    expect(page.url()).toBe("https://uat.thelifedao.io/app/forgot-password");
  });

  test("Verify a user receives a password reset link after providing a valid email address", async ({
    page,
  }) => {
    await signInPage.forgotOldPassword(userDetails.email);
    await expect(signInPage.passwordResetLinkConfirmation).toBeVisible();
    let resetLink = await retrievePasswordResetLink(userDetails.email);
    await page.goto(resetLink);
    await expect(page.getByText("Reset Password")).toBeVisible();
  });

  test("Verify that the Send Link button is disabled when a user does not provide an email address", async ({
    page,
  }) => {
    await signInPage.forgotPassword.click();
    await signInPage.email.fill("");
    await expect(signInPage.sendPasswordResetLink).toBeDisabled();
  });

  test("Verify a user cannot set a new password without meeting all the password criteria", async ({
    page,
  }) => {
    const testPasswords = ["NewPassword1!", "Short1!", "1234567890"];
    await signInPage.forgotOldPassword(userDetails.email);
    let resetLink = await retrievePasswordResetLink(userDetails.email);
    for (const newPassword of testPasswords) {
      await page.goto(resetLink);
      await signInPage.resetPassword(newPassword, newPassword);
      expect(page.url()).not.toBe("https://uat.thelifedao.io/app/sign-in");
    }
  });

  test("Verify the system rejects mismatched passwords during reset", async ({
    page,
    request,
  }) => {
    const passwords = ["Password1", "Password2"];
    await forgotPassword(request, userDetails.email);
    let resetLink = await retrievePasswordResetLink(userDetails.email);
    await page.goto(resetLink);
    await signInPage.resetPassword(passwords[0], passwords[1]);
    await expect(page.getByText("Passwords must match")).toBeVisible();
  });

  test("Verify the user cannot use their old password as their new password", async ({
    page,
    request,
  }) => {
    await forgotPassword(request, userDetails.email);
    let resetLink = await retrievePasswordResetLink(userDetails.email);
    await page.goto(resetLink);
    await signInPage.resetPassword(userDetails.password, userDetails.password);
    await expect(signInPage.setPasswordBtn).toBeDisabled();
  });

  test("Verify the reset password field’s visibility toggle switches between hidden and visible modes when clicked", async ({
    page,
    request,
  }) => {
    await forgotPassword(request, userDetails.email);
    let resetLink = await retrievePasswordResetLink(userDetails.email);
    await page.goto(resetLink);
    await signInPage.newPassword.fill(userDetails.newPassword);
    for (const expectedType of ["text", "password", "text"]) {
      await signInPage.resetPasswordVisibilityToggle.click();
      await expect(signInPage.newPassword).toHaveValue(userDetails.newPassword);
      await expect(signInPage.newPassword).toHaveAttribute(
        "type",
        expectedType
      );
    }
  });
});
