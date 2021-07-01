const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  page.on("response", async(response) => {
      await page.click('.selector');
      await page.click('#title', "This is title");
      await page.click('#body', "This is body");
      await page.screenshot({ path: 'example.png' });
      await page.click('#submit')
  });

  await browser.close();
})();