const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', {waitUntil: "networkidle0"});
  //page.on("response", async(response) => {
    await page.screenshot({ path: 'example0.png' });
      await page.waitForSelector('#userGroup');
      await page.screenshot({ path: 'example1.png' });
  await page.click('div[id="1"]');
  await page.screenshot({ path: 'example2.png' });
  
      await page.type('#title', "This is title");
      await page.type('#body', "This is body");
      await page.screenshot({ path: 'example3.png' });
      await page.click('#submit');
      await page.on('response', async(response) => {
        await page.screenshot({ path: 'example4.png' });
        await browser.close();
      });
      /*await page.waitForResponse(async(response) => {
        await page.screenshot({ path: 'example4.png' });
        await browser.close();
      });*/
      //await page.screenshot({ path: 'example4.png' });
      //await browser.close();
  //});
})();