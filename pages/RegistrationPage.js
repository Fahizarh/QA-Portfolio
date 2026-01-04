import { expect } from "@playwright/test";

class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.newUserSignUpText = page.locator("div[class='signup-form'] h2");
    this.nameInput = page.getByPlaceholder("Name");
    this.emailInput = page.getByTestId("signup-email");
    this.signUpButton = page.getByRole("button", { name: "Signup" });
    this.accountInformationText = page.getByText("Enter Account Information");
    this.mrTitle = page.locator("#id_gender1");
    this.mrsTitle = page.locator("#id_gender2");
    this.userName = page.locator("#name");
    this.userEmail = page.locator("#email");
    this.userPassword = page.locator("#password");
    this.userBirthDay = page.locator("#days");
    this.userBirthMonth = page.locator("#months");
    this.userBirthYear = page.locator("#years");
    this.signUpForNewsletter = page.locator("#newsletter");
    this.offers = page.locator("#optin");
    this.firstName = page.locator("#first_name");
    this.lastName = page.locator("#last_name");
    this.company = page.locator("#company");
    this.userAddress = page.locator("#address1");
    this.countryDropdown = page.locator("#country");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipCode = page.locator("#zipcode");
    this.mobileNumber = page.locator("#mobile_number");
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
    this.accountCreatedText = page.locator("h2[class='title text-center'] b");
    this.continueButton = page.locator(".btn.btn-primary");
    this.deleteAccount = page.locator("#header li:nth-child(5)");
    this.accountDeletedText = page.locator("h2[class='title text-center'] b");

    this.emailExistsError = page.getByText("Email Address already exist!");
  }

  async signUp(username, email) {
    await this.nameInput.fill(username);
    await this.emailInput.fill(email);
    await this.signUpButton.click();
  }

  async selectDOB(day, month, year) {
    await this.userBirthDay.selectOption(day);
    await this.userBirthMonth.selectOption(month);
    await this.userBirthYear.selectOption(year);
  }

  async registration(
    username,
    password,
    day,
    month,
    year,
    firstname,
    lastname,
    company,
    address,
    country,
    state,
    city,
    zipcode,
    phoneNumber
  ) {
    await this.userName.fill("");
    await this.userName.fill(username);
    await this.mrsTitle.click();
    await this.userPassword.fill(password);
    await this.selectDOB(day, month, year);
    await this.signUpForNewsletter.click();
    await this.offers.click();
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.company.fill(company);
    await this.userAddress.fill(address);
    await this.countryDropdown.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipCode.fill(zipcode);
    await this.mobileNumber.fill(phoneNumber);

    return username;
  }
}
module.exports = { RegistrationPage };
