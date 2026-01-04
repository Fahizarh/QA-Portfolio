class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactUs = page.locator("#header li:nth-child(8)");
    this.getInTouchText = page.getByText("Get In Touch");
    this.name = page.getByTestId("name");
    this.email = page.getByTestId("email");
    this.subject = page.getByTestId("subject");
    this.message = page.getByTestId("message");
    this.uploadFile = page.locator("input[name='upload_file']");
    this.submitButton = page.getByTestId("submit-button");
    this.successAlert = page.locator(".status.alert.alert-success");
    this.homeButton = page.locator(".btn.btn-success");
  }

  async fillContactForm(username, email, subject, message) {
    await this.name.fill(username);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);
    // Insert upload file here later
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }
}

module.exports = { ContactPage };
