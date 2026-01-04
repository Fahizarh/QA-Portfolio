async function getIframeBody(page, iFrameLocator) {
  const frame = await (
    await page.waitForSelector(iFrameLocator)
  ).contentFrame();
  return frame;
}

async function fillCardDetails(page, cardDetails = {}) {
  const frame = await getIframeBody(page, '[name="embedded-checkout"]');

  await frame.click('[data-testid="card-accordion-item"]');
  await frame.fill("#cardNumber", cardDetails.number);
  await frame.fill("#cardExpiry", cardDetails.expiry);
  await frame.fill("#cardCvc", cardDetails.cvc);
  await frame.fill("#billingName", cardDetails.name);
  await frame.click('[data-testid="hosted-payment-submit-button"]');

  return frame;
}

async function fail3DSAuthentication(page) {
  const authFrame = await getIframeBody(
    page,
    '[name="stripe-challenge-frame"]'
  );
  await authFrame.click("#test-source-fail-3ds");
  
}

async function pass3DSAuthentication(page) {
  const authFrame = await getIframeBody(
    page,
    '[name="stripe-challenge-frame"]'
  );
  await authFrame.click("#test-source-authorize-3ds");
}

module.exports = {
  fillCardDetails,
  fail3DSAuthentication,
  pass3DSAuthentication,
};
