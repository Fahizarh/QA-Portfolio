class KYCVerification {
  constructor(page) {
    this.page = page;

    this.startVerificationButton = page.getByRole("button", {
      name: "Start Verification",
    });
    this.resubmitVerificationButton = page.getByRole("button", {
      name: "Resubmit Verification",
    });
  }
}
module.exports = { KYCVerification };
