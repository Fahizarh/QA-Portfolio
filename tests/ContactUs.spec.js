import { test, expect } from "@playwright/test";
const { HomePage } = require("../pages/HomePage");
const { ContactPage } = require("../pages/ContactPage");
const contactDetails = require("../data/contact-details.json");

test.describe("Contact Test Cases", () => {
  let homePage;
  let contactPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);
    await page.goto("/");
    await expect(homePage.homePageSlider).toBeVisible();
  });

  test("Contact Us Form", async ({ page }) => {
    const { contactFormDetails } = contactDetails;

    await contactPage.contactUs.click();
    await expect(contactPage.getInTouchText).toBeVisible();
    await contactPage.fillContactForm(
      contactFormDetails.name,
      contactFormDetails.email,
      contactFormDetails.subject,
      contactFormDetails.message
    );
    await expect(contactPage.successAlert).toBeVisible();
    await contactPage.homeButton.click();
    await expect(page).toHaveURL("/");
  });
});
