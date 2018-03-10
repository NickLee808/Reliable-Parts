const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const result = [];

  function pageGoto (url) {
    await page.goto(`${url}`);
    result.push(await page.evaluate(() => {
    let temp = [];
    let products = document.querySelectorAll('.product-image-sub');
    for (product of products){
      temp.push(product.childNodes[0].href);
    };
    if (document.querySelector('[aria-label="Next"]')){
      pageGoto(document.querySelector('[aria-label="Next"]').href);
    }
    return temp;
    }));
  }

  await page.goto('https://www.reliableparts.com/catalog/Dishwasher-Accessories-461418');
  result.push(await page.evaluate(() => {
  let temp = [];
    let products = document.querySelectorAll('.product-image-sub');
    for (product of products){
      temp.push(product.childNodes[0].href);
    };
    if (document.querySelector('[aria-label="Next"]')){
      pageGoto(document.querySelector('[aria-label="Next"]').href);
    }
    return temp;
  }));

  browser.close();
  return result;
};


scrape().then((value) => {
  // fs.writeFile('test.JSON', JSON.stringify(value), function (err) {
  //   if (err) throw err;
  //   console.log('Test data saved as "/test.JSON"');
  // });
  console.log(value);
});