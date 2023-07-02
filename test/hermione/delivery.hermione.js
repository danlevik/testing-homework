const { assert } = require("chai");
const { async } = require("rxjs");

describe("Страница Delivery адаптируется в зависимости от ширины экрана", async function () {
  it("1920 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.assertView("deliveryFull", "body");
  });
  it("1270 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.setWindowSize(1270, 1080);

    await this.browser.assertView("deliveryLarge", "body");
  });
  it("1100 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.setWindowSize(1100, 1080);
    await this.browser.assertView("deliveryBig", "body");
  });
  it("850 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.setWindowSize(850, 1080);
    await this.browser.assertView("deliveryMedium", "body");
  });
  it("700 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.setWindowSize(700, 1080);
    await this.browser.assertView("deliverySmaller", "body");
  });
  it("400 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/delivery");
    await this.browser.setWindowSize(400, 1080);
    await this.browser.assertView("deliverySmall", "body");
  });
});
