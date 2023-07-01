const { assert } = require("chai");
const { async } = require("rxjs");

describe("Если товар добавлен в корзину, информация об этом отражается в карточке и на странице", async function () {
  it("Отображается надпись на странице товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cardLink = await this.browser.$("[data-testid='0'] .card-link");
    await cardLink.click();
    const addToCartButton = await this.browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();
    const cartBadge = await this.browser.$(".CartBadge").getText();

    assert.ok(cartBadge, "Надпись не появилась");
    assert.equal(cartBadge, "Item in cart");
  });

  it("Отображается надпись в каталоге", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cardLink = await this.browser.$("[data-testid='0'] .card-link");
    await cardLink.click();
    const addToCartButton = await this.browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cartBadge = await this.browser
      .$("[data-testid='0'] .CartBadge")
      .getText();

    assert.ok(cartBadge, "Надпись не появилась");
    assert.equal(cartBadge, "Item in cart");
  });
});

describe("Для каждого товара отображаются все данные", async function () {
  it("Отображается название товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cardTitle = await this.browser
      .$("[data-testid='0'] .ProductItem-Name")
      .getText();

    assert.isString(cardTitle);
    assert.notEqual(cardTitle, "");
  });
  it("Отображается цена товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cardPrice = await this.browser
      .$("[data-testid='0'] .ProductItem-Price")
      .getText();

    assert.isString(cardPrice);
    assert.notEqual(cardPrice, "$");
  });

  it("Отображается ссылка на товар", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cardLink = await this.browser.$(
      "[data-testid='0'] .ProductItem-DetailsLink"
    );
    const cardLinkText = await cardLink.getText();
    const isLink = (await cardLink.getTagName("href")) == "a";

    assert.equal(cardLinkText, "Details");
    assert.isTrue(isLink);
  });

  it("Ссылка ведет на корректный товар", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const cardsLength = await this.browser.$$(".ProductItem").length;
    for (let i = 0; i < cardsLength; i++) {
      let card = await this.browser.$(`[data-testid='${i}'] .ProductItem`);
      let cardName = await card.$(".ProductItem-Name").getText();
      let linkElement = await card.$(".ProductItem-DetailsLink");
      await expect(linkElement).toHaveAttribute(
        "href",
        `/hw/store/catalog/${i}`
      );
      await linkElement.click();

      let detailsItemName = await this.browser
        .$(".ProductDetails-Name")
        .getText();
      assert.equal(detailsItemName, cardName);
      await this.browser.url("http://localhost:3000/hw/store/catalog");
    }
  });
});
