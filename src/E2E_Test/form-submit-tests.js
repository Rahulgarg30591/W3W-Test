const puppeteer = require("puppeteer");

const submitSuccess = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.waitForSelector("#userGroup");
  await page.click('div[id="1"]');

  await page.type("#title", "This is title");
  await page.type("#body", "This is body");
  page.click("#submit");
  await page.waitForResponse(async (response) => {
    console.log(response);
    await page.screenshot({ path: "submitSuccess.png" });
    await browser.close();
  });
};

const submitFailure = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.waitForSelector("#userGroup");
  await page.click('div[id="1"]');
  page.click("#submit");
  await page.waitForSelector("#errorMsg");
  await page.screenshot({ path: "submitFailure.png" });
  await browser.close();
};

const submitWithoutBody = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.waitForSelector("#userGroup");
  await page.click('div[id="1"]');

  await page.type("#title", "This is title");
  page.click("#submit");
  await page.waitForSelector("#errorMsg");
  await page.screenshot({ path: "submitWithoutBody.png" });
  await browser.close();
};

const submitWithoutTitle = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.waitForSelector("#userGroup");
  await page.click('div[id="1"]');

  await page.type("#body", "This is body");
  page.click("#submit");
  await page.waitForSelector("#errorMsg");
  await page.screenshot({ path: "submitWithoutTitle.png" });
  await browser.close();
};

(() => {
  submitSuccess();
  submitFailure();
  submitWithoutBody();
  submitWithoutTitle();
})();
