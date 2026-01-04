class MembershipSubscription {
  constructor(page) {
    this.page = page;

    this.prejoinDiscount = page.getByText("-10% Pre-join discount");
    this.enterCouponOrReferral = page.getByPlaceholder(
      "Enter coupon or referral code here"
    );
    this.applyButton = page.getByRole("button", { name: "Apply" });
    this.couponAppliedText = page.getByText("-25 USDC Coupon");
    this.couponRemovedText = page.getByText("Coupon discount");
    this.invalidCodeError = page.getByText(
      "This code isn't valid. Please check and try again."
    );
    this.removeCoupon = page.locator(
      "svg[width='20'][height='20'][viewBox='0 0 24 24']"
    );
    this.above25CouponError = page.getByText(
      "Only $25 coupons are accepted at sign-up"
    );
    this.joinWhatsappGroupButton = page.getByRole("button", {
      name: "Join WhatsApp Group",
    });
  }

  async applyCouponOrReferral(code) {
    await this.enterCouponOrReferral.fill(code);
    await this.applyButton.click();
  }
}
module.exports = { MembershipSubscription };
