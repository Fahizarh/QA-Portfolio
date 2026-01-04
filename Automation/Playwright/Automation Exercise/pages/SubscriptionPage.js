import { expect } from "@playwright/test";

class SubscriptionPage {
  constructor(page) {
    this.page = page;
    this.footer = page.locator("#footer");
    this.subscriptionText = page.locator("div[class='single-widget'] h2");
    this.subscribeEmail = page.locator("#susbscribe_email");
    this.subscribeIcon = page.locator("#subscribe");
    this.subscriptionSuccess = page.getByText(
      "You have been successfully subscribed!"
    );
  }

  async subscribe(email) {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.subscriptionText).toBeVisible();
    await this.subscribeEmail.fill(email);
    await this.subscribeIcon.click();
    await expect(this.subscriptionSuccess).toBeVisible();
  }
}

module.exports = { SubscriptionPage };
