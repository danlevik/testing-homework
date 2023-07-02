const { assert } = require("chai");
const { async } = require("rxjs");

describe("Главная страница адаптируется в зависимости от ширины экрана", async function () {
  it("1920 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.assertView("mainFull", "body");
  });
  it("1270 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.setWindowSize(1270, 1080);

    await this.browser.assertView("mainLarge", "body");
  });
  it("1100 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.setWindowSize(1100, 1080);
    await this.browser.assertView("mainBig", "body");
  });
  it("850 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.setWindowSize(850, 1080);
    await this.browser.assertView("mainMedium", "body");
  });
  it("700 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.setWindowSize(700, 1080);
    await this.browser.assertView("mainSmaller", "body");
  });
  it("400 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.setWindowSize(400, 1080);
    await this.browser.assertView("mainSmall", "body");
  });
});
