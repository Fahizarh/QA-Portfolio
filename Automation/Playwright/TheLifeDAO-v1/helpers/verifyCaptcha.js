async function getIframeBody(page, iFrameLocator) {
  const frame = await (
    await page.waitForSelector(iFrameLocator)
  ).contentFrame();
  return frame;
}

async function verifyCaptcha(page) {
  const frame = await getIframeBody(
    page,
    'iframe[title="Widget containing a Cloudflare security challenge"]'
  );

  await frame.locator('input[type="checkbox"], button').click();

  return frame;
}

module.exports = {
  verifyCaptcha,
};
