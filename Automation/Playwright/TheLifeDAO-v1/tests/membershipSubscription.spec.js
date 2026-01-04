import { test, expect } from "@playwright/test";
const { MembershipSubscription } = require("../pages/MembershipSubscription");
const { SignIn } = require("../pages/SignIn");
const { createVerifiedUser } = require("../helpers/createVerifiedUser");
const { fillCardDetails } = require("../helpers/paymentHelper");
const cards = require("../data/card-details.json");

test.describe("Membership Subscription Test Cases", () => {
  let signInPage;
  let membershipPage;
  let testUser = {};

  // Create user once before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    testUser = await createVerifiedUser(page, request);
    await page.close();
  });

  // Sign in before each test
  test.beforeEach(async ({ page }) => {
    signInPage = new SignIn(page);
    membershipPage = new MembershipSubscription(page);

    await page.goto("/app/sign-in", { waitUntil: "domcontentloaded" });
    await signInPage.signIn(testUser.email, testUser.password);
  });

  test("Verify discount is applied when a valid coupon code is used ", async ({
    page,
  }) => {
    const couponCode = "ZFWVkY";
    await membershipPage.applyCouponOrReferral(couponCode);
    await expect(membershipPage.couponAppliedText).toHaveCSS(
      "font-weight",
      "600"
    );
  });

  test("Verify error is shown when an invalid coupon code is applied ", async ({
    page,
  }) => {
    const couponCode = "ZFWVko";
    await membershipPage.removeCoupon.click();
    await membershipPage.applyCouponOrReferral(couponCode);
    await expect(membershipPage.invalidCodeError).toBeVisible();
  });

  test("Verify that a user can remove a coupon code ", async ({ page }) => {
    const couponCode = "ZFWVkY";
    await membershipPage.applyCouponOrReferral(couponCode);
    await membershipPage.removeCoupon.click();
    await expect(membershipPage.couponRemovedText).toBeVisible();
  });

  test("Verify that system does not allow the use of a coupon code with value more than $25 ", async ({
    page,
  }) => {
    const couponCode = "TcgWFy";
    await membershipPage.applyCouponOrReferral(couponCode);
    await expect(membershipPage.above25CouponError).toBeVisible();
  });

  test("Verify that an error is displayed when a user tries to pay their membership fee with a card with insufficient funds", async ({
    page,
  }) => {
    const frame = await fillCardDetails(page, cards.insufficientFunds);
    await expect(
      frame.locator(`text=${cards.insufficientFunds.expectedError}`)
    ).toBeVisible();
  });

  test("Verify that an error is displayed when a user tries to pay their membership fee with an expired card", async ({
    page,
  }) => {
    const frame = await fillCardDetails(page, cards.expiredCard);
    await expect(
      frame.locator(`text=${cards.expiredCard.expectedError}`)
    ).toBeVisible();
  });

  test("Verify that an error is displayed when a user tries to pay their membership fee with incorrect CVC", async ({
    page,
  }) => {
    const frame = await fillCardDetails(page, cards.invalidCvc);
    await expect(
      frame.locator(`text=${cards.invalidCvc.expectedError}`)
    ).toBeVisible();
  });

  test("Verify that an error is displayed when a user tries to pay their membership fee with incorrect card number", async ({
    page,
  }) => {
    const frame = await fillCardDetails(page, cards.invalidNumber);
    await expect(
      frame.locator(`text=${cards.invalidNumber.expectedError}`)
    ).toBeVisible();
  });

  test("Verify that a user cannot proceed to the dashboard if their payment was not processed", async ({
    page,
  }) => {
    const frame = await fillCardDetails(page, cards.processingError);
    await expect(
      frame.locator(`text=${cards.processingError.expectedError}`)
    ).toBeVisible();
    await expect(membershipPage.joinWhatsappGroupButton).not.toBeVisible();
  });

  test("Verify that a user is directed to the dashboard when they successfully complete their payment", async ({
    page,
  }) => {
    await fillCardDetails(page, cards.validCard);
    await expect(membershipPage.joinWhatsappGroupButton).toBeVisible();
  });
});
