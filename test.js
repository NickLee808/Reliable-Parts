const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
  'https://www.reliableparts.com/catalog/air_conditioner_filters',
  'https://www.reliableparts.com/catalog/660109',
  'https://www.reliableparts.com/catalog/659561',
];

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const result = [];

  await page.goto('https://www.reliableparts.com/product/1757496');
  result.push(await page.evaluate(() => {
    console.log('henlo');
    let imgURL = document.querySelector('.owl-item.active').querySelector('a').href;
    let title = document.querySelectorAll('.col-xs-12.col-sm-12.col-md-6.product-detail-right')[0].childNodes[1].innerText;
    let partNum = document.querySelectorAll('h1')[0].innerText.slice(8);
    let price = document.querySelectorAll('.product-details-price')[0].innerText;
    let description = document.querySelectorAll('.product-details-right-bottom.gray-font')[0].innerText;
    return imgURL;
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