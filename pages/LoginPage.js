import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmail = page.getByTestId("login-email");
    this.loginPassword = page.getByTestId("login-password");
    this.loginButton = page.getByTestId("login-button");
    this.logIntoAccountText = page.locator("div[class='login-form'] h2");
    this.incorrectLoginError = page.getByText(
      "Your email or password is incorrect!"
    );
    this.loggedInText = (username) =>
      page.getByText(`Logged in as ${username}`);
    this.logOut = page.locator("#header li:nth-child(4)");
  }

  async loginWithDetails(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async isLoggedIn(username) {
    const loggedInTextLocator = this.loggedInText(username);
    await expect(loggedInTextLocator).toBeVisible();
  }
}

module.exports = { LoginPage };
