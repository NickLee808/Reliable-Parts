const puppeteer = require('puppeteer');
// All air conditionar parts

let initialScrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const result = [];
  let rootLinks;
  let tempResult = [];

  await page.goto('https://www.reliableparts.com/');
  rootLinks = (await page.evaluate(()  => {
    let data = [];
    let rawHtml = document.querySelectorAll('.menu-all-category');
    let childrenHtml = rawHtml[0].children[0].children;
    for(var i = 0; i < childrenHtml.length; i++){
      data.push(childrenHtml[i].firstChild.attributes[0].nodeValue);
    }
    return data;
  }));

  for(var x = 0; x < rootLinks.length; x++){
    await page.goto(rootLinks[x]);
    tempResult.push(await page.evaluate(() => {
      let data = [];
      let rawHtml = document.querySelectorAll('.categoryMenu');
      if(rawHtml.length === 0){
        return undefined;
      }
      // let childrenHtml = rawHtml[0].children[1].children[1].href;
      let childrenHtml = rawHtml[0].children;
      for(var j = 0; j < childrenHtml.length; j++){
        data.push(childrenHtml[j].children[1].href);
      }
      // return childrenHtml;
      return data;
    }))
  }

  browser.close();

  return tempResult;
  return rootLinks;
};


initialScrape()
.then((scrapedData) => {
  console.log('SCRAPED DATA for intial URLS: ', scrapedData);
  firstUrls = scrapedData;

})