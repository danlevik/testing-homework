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

// Простите за этот очень кошмар, позже обязательно отрефакторю 😭
describe("Таблица с добавленными товарами в корзине корректно отображается", function () {
  it("Корректное отображение корзины после добавления 2 товаров с разным количеством", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const item0Name = await this.browser.$(".ProductDetails-Name").getText();
    const item0Price = await this.browser.$(".ProductDetails-Price").getText();
    const addToCartButton0 = await this.browser.$(".ProductDetails-AddToCart");
    await addToCartButton0.click();
    await addToCartButton0.click();

    const item0Summary = Number(item0Price.slice(1)) * 2;

    await this.browser.url("http://localhost:3000/hw/store/catalog/2");
    const item2Name = await this.browser.$(".ProductDetails-Name").getText();
    const item2Price = await this.browser.$(".ProductDetails-Price").getText();
    const addToCartButton2 = await this.browser.$(".ProductDetails-AddToCart");
    await addToCartButton2.click();

    const item2Summary = Number(item2Price.slice(1));

    let summary = 0;
    summary += item0Summary + item2Summary;

    await this.browser.url("http://localhost:3000/hw/store/cart");

    const cart = await this.browser.$(".Cart-Table");

    const cartItem0 = await cart.$(`tr[data-testid='0']`);

    await expect(cartItem0.$(".Cart-Name")).toHaveText(item0Name);
    await expect(cartItem0.$(".Cart-Price")).toHaveText(item0Price);
    await expect(cartItem0.$(".Cart-Count")).toHaveText("2");
    await expect(cartItem0.$(".Cart-Total")).toHaveText(`$${item0Summary}`);

    const cartItem2 = await cart.$(`tr[data-testid='2']`);

    await expect(cartItem2.$(".Cart-Name")).toHaveText(item2Name);
    await expect(cartItem2.$(".Cart-Price")).toHaveText(item2Price);
    await expect(cartItem2.$(".Cart-Count")).toHaveText(`1`);
    await expect(cartItem2.$(".Cart-Total")).toHaveText(`$${item2Summary}`);

    await expect(cart.$(".Cart-OrderPrice")).toHaveText(`$${summary}`);
  });
});
