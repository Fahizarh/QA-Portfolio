class SignUp {
  constructor(page) {
    this.page = page;

    this.becomeAMember = page.getByTestId("lp-hero-cta").first();
    this.logIn = page.getByRole("button", { name: "Log In" });
    this.email = page.getByPlaceholder("Enter your email");
    this.password = page.getByPlaceholder("************").first();
    this.repeatPassword = page.getByPlaceholder("************").last();
    this.signUpBtn = page.getByRole("button", { name: "Sign Up" });
    this.signUpSuccessText = page.getByText("You're Almost Ready to Go!");
    this.userExistsError = page.getByText("User already exists");
    this.unmatchedPasswordError = page.getByText("Passwords must match");
    this.logInLink = page.locator(".text-primary.font-semibold.text-sm");
    this.passwordVisibilityToggle = page.locator(
      "body > div:nth-child(2) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > svg:nth-child(1)"
    );
    this.signUpAgainBtn = page.getByRole("button", { name: "Sign Up Again" });
  }

  async signUp(emailAddress, password, passwordRepeat) {
    await this.email.fill(emailAddress);
    await this.password.fill(password);
    await this.repeatPassword.fill(passwordRepeat);
    await this.signUpBtn.click();
  }
}
module.exports = { SignUp };
