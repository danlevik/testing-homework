const { assert } = require("chai");
const { async } = require("rxjs");

describe("В корзине должна отображаться таблица с добавленными в нее товарами", async function () {
  it("Корректное сообщение, если в корзине нет товаров", async function () {
    await this.browser.url("http://localhost:3000/hw/store/cart");
    await this.browser.assertView("emptyCart", "body");
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

    await this.browser.assertView("successfullOrder", "body");
  });
});
