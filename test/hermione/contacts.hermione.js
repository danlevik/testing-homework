const { assert } = require("chai");
const { async } = require("rxjs");

describe("Страница Contacts адаптируется в зависимости от ширины экрана", async function () {
  it("1920 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.assertView("contactsFull", "body");
  });
  it("1270 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.setWindowSize(1270, 1080);

    await this.browser.assertView("contactsLarge", "body");
  });
  it("1100 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.setWindowSize(1100, 1080);
    await this.browser.assertView("contactsBig", "body");
  });
  it("850 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.setWindowSize(850, 1080);
    await this.browser.assertView("contactsMedium", "body");
  });
  it("700 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.setWindowSize(700, 1080);
    await this.browser.assertView("contactsSmaller", "body");
  });
  it("400 на 1080", async function () {
    await this.browser.url("http://localhost:3000/hw/store/contacts");
    await this.browser.setWindowSize(400, 1080);
    await this.browser.assertView("contactsSmall", "body");
  });
});
