// const puppeteer = require('puppeteer');

// let scrape = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // await page.goto('http://books.toscrape.com/');

//   // const result = await page.evaluate(() => {
//   //   let data = [];
//   //   let elements = document.querySelectorAll('.product_pod');
//   //     for (var element of elements){
//   //       let title = element.childNodes[5].innerText;
//   //       let price = element.childNodes[7].children[0].innerText;
//   //       data.push({title, price});
//   //     }
//   //     return data;
//   // }

//   await page.goto('https://www.reliableparts.com/catalog/air_conditioner_filters');
//   await page.waitFor(1000);


//   await page.click('#middle > div.container > div.row.subcategory-row > div:nth-child(1) > div > div.box-bottom > h2 > a');

//   const result = await page.evaluate(() => {
//     let title = document.querySelector('h1').innerText;
//     return title;
//   });


//   browser.close();
//   return result;
// };

// scrape().then((value) => {
//     console.log(value);
// });

const puppeteer = require('puppeteer');
const urls = [
  'https://www.reliableparts.com/catalog/air_conditioner_filters',
  'https://www.reliableparts.com/catalog/660109'
];



let urlScrape = async () => {
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
}



// let scrape = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const result = [];

//   for (var i=0; i<urls.length; i++) {
//     await page.goto(urls[i]);
//     result.push(await page.evaluate(() => {
//       let data = [];
//       let elements = document.querySelectorAll('.box-bottom');
//       for (var element of elements){
//         let title = element.childNodes[1].innerText;
//         data.push({title});
//       }
//       return data;
//     })
//     )
//   }
//   browser.close();
//   return result;
// };

urlScrape().then((value) => {
  console.log('value: ', value); // Success!
});