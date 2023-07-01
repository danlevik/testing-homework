const { assert } = require("chai");
const { async } = require("rxjs");

describe("В пустой корзине корректно отображаются сообщения и ссылки", async function () {
  it("Корректное сообщение, если в корзине нет товаров", async function () {
    await this.browser.url("http://localhost:3000/hw/store/cart");
    await this.browser.assertView("emptyCart", "body");

    const linkToCatalog = await this.browser.$(".Cart a");
    await expect(linkToCatalog).toHaveAttribute("href", "/hw/store/catalog");
  });

  it("Корректное сообщение, если был оформлен закан", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const addToCartButton = await this.browser.$(".ProductDetails-AddToCart");

    await addToCartButton.click();
    await this.browser.url("http://localhost:3000/hw/store/cart");

    const nameInput = await this.browser.$(".Form-Field_type_name");
    const phoneInput = await this.browser.$(".Form-Field_type_phone");
    const addressInput = await this.browser.$(".Form-Field_type_address");

    await nameInput.setValue("test");
    await phoneInput.setValue("81234567890");
    await addressInput.setValue("test");

    await this.browser.$(".Form-Submit").click();

    await this.browser.assertView("successfullOrder", "body", {
      ignoreElements: [".Cart-SuccessMessage p"],
    });

    const linkToCatalog = await this.browser.$(".Cart a");
    await expect(linkToCatalog).toHaveAttribute("href", "/hw/store/catalog");
  });
});

describe("Таблица с добавленными товарами в корзине корректно отображается", function () {
  it("", async function () {});
});
