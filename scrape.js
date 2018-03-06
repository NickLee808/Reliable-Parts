const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reliableparts.com/');
  
  // Saves all main categories as an array named 'arrayOfAllCategories'
  const arrayOfAllCategories = await page.evaluate(() => {
    let data = [];
    let allCategories = document.querySelectorAll('.menu-all-category')[0].children[0].children;
    for (category of allCategories) {
      data.push(category.firstChild.attributes[0].nodeValue);
    }
    return data;
  });

  let arrayOfAllSubs = [];
  let arrayOfAllProducts = [];

  for (category of arrayOfAllCategories){
    await page.goto(category);
    arrayOfAllSubs.push(await page.evaluate(() => {
      let data = [];
      // 'categoryMenu' = className for subcategories of each category's page
      let categoryMenu = document.querySelectorAll('.categoryMenu');
      let childrenHtml = categoryMenu.children;
      return childrenHtml;
    }))
  }
  
  browser.close();
  return arrayOfAllSubs;
}


scrape().then((value) => {
  console.log(value);
})


/*const urls = [
  'https://www.reliableparts.com/catalog/air_conditioner_filters',
  'https://www.reliableparts.com/catalog/660109',
  'https://www.reliableparts.com/catalog/659561',
  'https://www.reliableparts.com/catalog/660110',
  'https://www.reliableparts.com/catalog/660108',
  'https://www.reliableparts.com/catalog/660099',
  'https://www.reliableparts.com/catalog/660100',
  'https://www.reliableparts.com/catalog/660115',
  'https://www.reliableparts.com/catalog/660124',
  'https://www.reliableparts.com/catalog/660125',
  'https://www.reliableparts.com/catalog/660126',
  'https://www.reliableparts.com/catalog/660114',
  'https://www.reliableparts.com/catalog/air_conditioner_repair_tools',
  'https://www.reliableparts.com/catalog/compressor_hard_start_kits',
  'https://www.reliableparts.com/catalog/648800',
  'https://www.reliableparts.com/catalog/electronic_control_boards',
  'https://www.reliableparts.com/catalog/motor_mounting_bracket_kits',
  'https://www.reliableparts.com/catalog/a_c_air_conditioner_motors',
  'https://www.reliableparts.com/catalog/motor_run_capacitors',
  'https://www.reliableparts.com/catalog/motor_start_capacitors',
  'https://www.reliableparts.com/catalog/time_delay_timers',
  'https://www.reliableparts.com/catalog/relays_',
  'https://www.reliableparts.com/catalog/transformers_'
];

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const result = [];

  for (var i=0; i<urls.length; i++) {
    await page.goto(urls[i]);
    await page.evaluate(() => { 
      let data = [];
      let elements = document.querySelectorAll('.box-bottom');
      for (var i = 0; i < elements.length; i++){
        let title = elements[i].childNodes[1].innerText;
        let partNum = elements[i].childNodes[3].innerText.slice(13);
        let price = elements[i].childNodes[5].innerText;
        data.push({title, partNum, price});
      }
      return data;
    })
  }
  browser.close();
  return result;
};

scrape().then((scrapedData) => {
  console.log('SCRAPED DATA: ', scrapedData);
});*/





/*let urlScrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reliableparts.com/');

  const result = await page.evaluate(() => {
    let data = []; // Create an empty array that will store our data
    let temp = document.getElementsByClassName('menu-all-category'); // Select all Products
    let elements = temp[0];//<ul> of all products

    for (var i = 0; i<elements.length; i++){ // Loop through each proudct
      data.push(elements[i]);

      // let title = element.childNodes[5].innerText; // Select the title
      // let price = element.childNodes[7].children[0].innerText; // Select the price

      // data.push({title, price}); // Push an object with the data onto our array
    }

    return data; // Return our data array
  });

  browser.close();
  return result; // Return the data
}*/