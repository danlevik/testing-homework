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
