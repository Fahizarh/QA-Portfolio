class Dashboard {
  constructor(page) {
    this.page = page;

    this.cancelWelcomeModal = page.locator(
      "button[class='text-[#667085] active:text-grey-600 absolute right-6'] svg"
    );
    this.joinWhatsappGroupButton = page.getByRole("button", {
      name: "Join WhatsApp Group",
    });
    this.phoneNumberInput = page.getByPlaceholder("Enter your phone number");
    this.joinGroupButton = page.getByRole("button", {
      name: "Join the Group",
    });
    this.successText = page.getByText("You're Almost There! 🎉");
    this.gotItButton = page.getByRole("button", {
      name: "Got it!",
    });
    this.logOut = page.locator(
      "div[class='flex-1 flex flex-col gap-4'] div[class='flex items-center gap-2 rounded-lg p-3 max-md:py-4 cursor-pointer text-negative-contrast']"
    );
  }

  async joinWhatsappGroup(phoneNumber) {
    await this.joinWhatsappGroupButton.click();
    await this.phoneNumberInput.fill(phoneNumber);
    await this.joinGroupButton.click();
  }
}
module.exports = { Dashboard };
