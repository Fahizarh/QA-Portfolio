import { expect } from "@playwright/test";

class ProductPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator("#header li:nth-child(2)");
    this.productsList = page.locator(".features_items");
    this.viewFirstProduct = page.locator("a[href='/product_details/1']");
    this.productName = page.locator("div[class='product-information'] h2");
    this.productCategory = page.locator("div:nth-child(1) > p:nth-child(3)");
    this.productPrice = page.locator(
      "div[class='product-information'] span span"
    );
    this.productAvailability = page.locator(
      "div:nth-child(1) > p:nth-child(6)"
    );
    this.productCondition = page.locator("body section p:nth-child(3)").first();
    this.productBrand = page.locator("body section p:nth-child(3)").last();
    this.searchProductInput = page.locator("#search_product");
    this.submitSearch = page.locator("#submit_search");
    this.searchedProductsText = page.locator(".title.text-center");

    this.firstProduct = page.locator(".product-overlay").first();
    this.addFirstProductToCart = page
      .locator(".overlay-content > .btn")
      .first();
    this.continueShopping = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.secondProduct = page.locator(
      "div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay"
    );
    this.addSecondProductToCart = page.locator(
      "div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn"
    );
  }

  async firstProductDetail() {
    await this.viewFirstProduct.click();
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async searchProduct(product) {
    await this.searchProductInput.fill(product);
    await this.submitSearch.click();
    await expect(this.searchedProductsText).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  async addFirstAndSecondProductToCart() {
    await this.firstProduct.hover();
    await this.addFirstProductToCart.click();
    await this.continueShopping.click();

    await this.secondProduct.hover();
    await this.addSecondProductToCart.click();
  }
}

module.exports = { ProductPage };
