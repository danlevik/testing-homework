const { assert } = require("chai");
const { async } = require("rxjs");

// describe("microsoft", async function () {
//   it("Тест, который пройдет", async function () {
//     await this.browser.url("https://www.microsoft.com/ru-ru/");
//     await this.browser.assertView("plain", "header");

//     const title = await this.browser.$("#uhfLogo").getText();
//     assert.equal(title, "Microsoft");
//   });
// });

describe("Название магазина в шапке должно быть ссылкой на главную страницу", async function () {
  it("Элемент с названием магазина есть", async function () {
    // await this.browser.url("http://localhost:3000/hw/store");
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto("http://localhost:3000/hw/store");
    await this.browser.pause(1000);

    const titleElement = await page.$(".navbar-brand");
    assert.ok(titleElement, "Элемента нет");
    const titleText = await page.$eval(
      ".navbar-brand",
      (element) => element.innerHTML
    );
    assert.equal(titleText, "Example store");
  });

  it("Элемент - ссылка на главную страницу", async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto("http://localhost:3000/hw/store");
    await this.browser.pause(1000);

    const href = await page.$eval(".navbar-brand", (element) =>
      element.getAttribute("href")
    );
    assert.ok("href", "У элемента нет ссылки");
    assert.equal(href, "/hw/store/");
  });
});

// describe("В магазине должны быть все страницы", async function () {});

describe("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async function () {
  it("Все ссылки отображаются", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.assertView("correctLinks", "nav");
  });
});

describe("При изменении размера экрана, шапка адаптируется", async function () {
  it("Шапка корректно отображается на размере 1920*1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.assertView("navLarge", "nav");
  });

  it("Шапка корректно отображается на размере 460*1080", async function () {
    await this.browser.setWindowSize(460, 1080);
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.assertView("navSmall", "nav");
  });

  it("Открытая шапка корректно отображается на размере 460*1080", async function () {
    await this.browser.setWindowSize(460, 1080);
    await this.browser.url("http://localhost:3000/hw/store");
    const burgerButton = await this.browser.$(".Application-Toggler");
    await burgerButton.click();
    await this.browser.pause(1000);

    await this.browser.assertView("navSmallOpenWithFocus", "nav");
  });

  it("Шапка закрывается при повторном нажатии на бургер", async function () {
    await this.browser.setWindowSize(460, 1080);
    await this.browser.url("http://localhost:3000/hw/store");
    const burgerButton = await this.browser.$(".Application-Toggler");
    await burgerButton.click();
    await burgerButton.click();
    await this.browser.pause(1000);

    await this.browser.assertView("navSmallWithFocus", "nav");
  });

  it("Шапка закрывается при нажатии на ссылку", async function () {
    await this.browser.setWindowSize(460, 1080);
    await this.browser.url("http://localhost:3000/hw/store");
    const burgerButton = await this.browser.$(".Application-Toggler");
    await burgerButton.click();

    const navbarLink = await this.browser.$(".Application-Menu .nav-link");
    await navbarLink.click();
    await this.browser.pause(1000);

    await this.browser.assertView("navSmall", "nav");
  });
});