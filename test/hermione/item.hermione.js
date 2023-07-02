const { assert } = require("chai");
const { async } = require("rxjs");

describe("На странице с подробной информацией отображаются все необходимые данные", async function () {
  it("Отображается название товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productName = await this.browser.$(".ProductDetails-Name").getText();
    assert.isString(productName);
    assert.notEqual(productName, "");
  });

  it("Отображается описание товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productDescription = await this.browser
      .$(".ProductDetails-Description")
      .getText();
    assert.isString(productDescription);
    assert.notEqual(productDescription, "");
  });

  it("Отображается цена товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productPrice = await this.browser
      .$(".ProductDetails-Price")
      .getText();
    assert.isString(productPrice);
    assert.notEqual(productPrice, "$");
  });

  it("Отображается цвет товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productColor = await this.browser
      .$(".ProductDetails-Color")
      .getText();
    assert.isString(productColor);
    assert.notEqual(productColor, "");
  });

  it("Отображается материал товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productMaterial = await this.browser
      .$(".ProductDetails-Material")
      .getText();
    assert.isString(productMaterial);
    assert.notEqual(productMaterial, "");
  });

  it("Отображается кнопка добавления товара в корзину", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const addToCartButton = await this.browser.$(".ProductDetails-AddToCart");
    assert.ok(addToCartButton);
  });
});

describe("Статичные изображения на странице товара корректно отображаются", async function () {
  it("1920 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await this.browser.assertView("itemImageFull", ".Image");
    await this.browser.assertView(
      "itemButtonFull",
      ".ProductDetails-AddToCart"
    );
  });
  it("1270 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await this.browser.setWindowSize(1270, 1080);

    await this.browser.assertView("itemImageLarge", ".Image");
    await this.browser.assertView(
      "itemButtonLarge",
      ".ProductDetails-AddToCart"
    );
  });
  it("1100 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await this.browser.setWindowSize(1100, 1080);
    await this.browser.assertView("itemImageBig", ".Image");
    await this.browser.assertView("itemButtonBig", ".ProductDetails-AddToCart");
  });
  it("850 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await this.browser.setWindowSize(850, 1080);
    await this.browser.assertView("itemImageMedium", ".Image");
    await this.browser.assertView(
      "itemButtonMedium",
      ".ProductDetails-AddToCart"
    );
  });
  it("700 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await this.browser.setWindowSize(700, 1080);
    await this.browser.assertView("itemImageSmaller", ".Image");
    await this.browser.assertView(
      "itemButtonSmaller",
      ".ProductDetails-AddToCart"
    );
  });
  it("400 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await this.browser.setWindowSize(400, 1080);
    await this.browser.assertView("itemImageSmall", ".Image");
    await this.browser.assertView(
      "itemButtonSmall",
      ".ProductDetails-AddToCart"
    );
  });
});
