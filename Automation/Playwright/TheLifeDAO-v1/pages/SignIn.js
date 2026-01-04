class SignIn {
  constructor(page) {
    this.page = page;

    this.email = page.getByPlaceholder("example@gmail.com");
    this.password = page.getByPlaceholder("************");
    this.forgotPassword = page.locator(
      ".font-roboto.font-semibold.text-grey-800"
    );
    this.rememberMe = page.locator("span[class='min-w-6'] svg");
    this.logInBtn = page.getByRole("button", { name: "Log In" }).last();
    this.signInConfirmationText = page.getByText("Activate Your Membership");
    this.signInError = page.getByText("Invalid email or password");
    this.emailError = page.getByText("Please enter the email.");
    this.passwordError = page.getByText("Please enter password.");
    this.passwordVisibilityToggle = page.locator(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1)"
    );

    this.sendPasswordResetLink = page.getByRole("button", {
      name: "Send Link",
    });
    this.passwordResetLinkConfirmation = page.getByText(
      "Link sent, please check your email"
    );
    this.newPassword = page.getByPlaceholder("************").first();
    this.repeatNewPassword = page.getByPlaceholder("************").last();
    this.setPasswordBtn = page.getByRole("button", { name: "Set Password" });
    this.resetPasswordVisibilityToggle = page.locator(
      "body > div:nth-child(2) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > svg:nth-child(1)"
    );
  }

  async signIn(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.logInBtn.click();
  }

  async forgotOldPassword(emailAddress) {
    await this.forgotPassword.click();
    await this.email.fill(emailAddress);
    await this.sendPasswordResetLink.click();
  }

  async resetPassword(password, repeatPassword) {
    await this.newPassword.fill(password);
    await this.repeatNewPassword.fill(repeatPassword);
    await this.setPasswordBtn.click();
  }
}
module.exports = { SignIn };
