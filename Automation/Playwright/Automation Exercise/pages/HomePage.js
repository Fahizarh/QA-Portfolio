class HomePage {
  constructor(page) {
    this.page = page;
    this.homePageSlider = page.locator("#slider");
    this.logInOrSignUp = page.locator("#header li:nth-child(4)");
    this.newUserSignUpText = page.locator("div[class='signup-form'] h2");
  }
}

module.exports = { HomePage };
