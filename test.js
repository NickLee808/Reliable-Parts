const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.reliableparts.com');
  await page.screenshot({path: 'reliableparts.jpg'});
  await page.setViewport({width: 1000, height: 500})

  await browser.close();
}

getPic();