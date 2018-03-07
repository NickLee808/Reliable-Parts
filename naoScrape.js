// All air conditionar parts
const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let result = [];

  await page.goto('https://www.reliableparts.com/');
  let rootLinks = (await page.evaluate(() => {
    let data = [];
    let rawHtml = document.querySelectorAll('.menu-all-category');
    let childrenHtml = rawHtml[0].children[0].children;
    for(var i = 0; i < childrenHtml.length; i++){
      data.push(childrenHtml[i].firstChild.attributes[0].nodeValue);
    }
    return data;
  }));

  for(var j = 0; j < rootLinks.length; j++){
    await page.goto(rootLinks[j]);
    result.push(await page.evaluate(() => {
      let data = [];
      let undefineds = [];
      let categoryMenu = document.querySelectorAll('.categoryMenu');
      if(categoryMenu.length === 0){
        let productList = document.querySelectorAll('.row.subcategory-row');
        undefineds.push(productList);
        return productList;
      }
      let childrenHtml = categoryMenu[0].children;
      for(var k = 0; k < childrenHtml.length; k++){
        data.push(childrenHtml[k].children[1].href);
      }
      return undefineds;
    }))
  }
  
  browser.close();
  return result;
};


scrape().then((urls) => {
  console.log('SCRAPED DATA: ', urls);
  //add scrape() here
})