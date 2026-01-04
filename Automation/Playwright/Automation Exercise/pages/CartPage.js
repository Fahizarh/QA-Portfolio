class CartPage {
  constructor(page) {
    this.page = page;
    this.cart = page.locator("#header li:nth-child(3)");
    this.viewCart = page.locator("p[class='text-center'] a");
  }
}

module.exports = { CartPage };
