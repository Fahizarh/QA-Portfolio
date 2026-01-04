import { test, expect } from "@playwright/test";
const { SignIn } = require("../pages/SignIn");
const { Dashboard } = require("../pages/Dashboard");
const { createSubscribedUser } = require("../helpers/createSubscribedUser");
const userDetails = require("../data/test-user.json");

test.describe("Dashboard Test Cases", () => {
  let signInPage;
  let dashboardPage;
  let testUser = {};

  // Create subscribed user once before all tests
  test.beforeAll(async ({ browser, request }) => {
    const page = await browser.newPage();
    testUser = await createSubscribedUser(page, request);
    await page.close();
  });

  // Sign in before each test
  test.beforeEach(async ({ page }) => {
    signInPage = new SignIn(page);
    dashboardPage = new Dashboard(page);

    await page.goto("/app/sign-in", { waitUntil: "domcontentloaded" });
    await signInPage.signIn(testUser.email, testUser.password);
  });

  test("Verify that a subscribed user is prompted to provide their phone number when they click on the Join Whatsapp group button", async ({
    page,
  }) => {
    await dashboardPage.joinWhatsappGroupButton.click();
    await expect(page.getByText("Enter Phone Number")).toBeVisible();
  });

  test("Verify that the Join the group button is disabled when a user enters an invalid phone number", async ({
    page,
  }) => {
    const phoneNumber = "98483424";
    await dashboardPage.joinWhatsappGroupButton.click();
    await dashboardPage.phoneNumberInput.fill(phoneNumber);
    await expect(dashboardPage.joinGroupButton).toBeDisabled();
  });

  test("Verify that the subscribed user receives the WhatsApp group link in a new tab after providing a valid phone number", async ({
    page,
    context,
  }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent("page"),
      dashboardPage.joinWhatsappGroup(userDetails.phoneNumber),
    ]);

    await newTab.waitForLoadState();

    expect(newTab.url()).toBe(
      "https://chat.whatsapp.com/BslGphsBPmo6eqaTjAmYC7"
    );
  });

  test("Verify that a user can log out from the dashboard", async ({
    page,
  }) => {
    await dashboardPage.logOut.click();
    const url = "https://uat.thelifedao.io/app/sign-in";
    await page.waitForURL(url);
    const currentUrl = page.url();
    expect(currentUrl).toBe(url);
  });
});
