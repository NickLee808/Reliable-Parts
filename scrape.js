const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reliableparts.com/');

  let allSubCats = [];
  let dirtyArray = [];
  let cleanArray = [];
  
  // Saves all main categories as an array named 'allCategories'
  const allCategories = await page.evaluate(() => {
    let temp = [];
    let allCategories = document.querySelectorAll('.menu-all-category')[0].children[0].children;
    for (category of allCategories) {
      temp.push(category.firstChild.attributes[0].textContent);
    }
    return temp;
  });

  // Loops through 'allCategories' to get 'allSubCats'
  for (subCategory of allCategories){
    await page.goto(subCategory);
    allSubCats.push(await page.evaluate(() => {
      let temp = [];
      // 'categoryMenu' = className for subcategories of each category's page
      let categoryMenu = document.querySelectorAll('.categoryMenu');
      if(categoryMenu.length === 0){
        return undefined;
      }
      let partsCollection = categoryMenu[0].children;
      for(collection of partsCollection){
        temp.push(collection.children[1].href);
      }
      return temp;
    }))
    // Stores all direct links to products in an array
    dirtyArray.push(await page.evaluate(() => {
      let temp = [];
      let products = document.querySelectorAll('.product-image-sub');
      for (product of products){
        temp.push(product.childNodes[0].href);
      }
      return temp;
    }))
  }
  
  for (subCategory of allSubCats){
    if (subCategory !== undefined){
      for (innerArray of subCategory){
        await page.goto(innerArray);
        dirtyArray.push(await page.evaluate(() => {
          let temp = [];
          let products = document.querySelectorAll('.product-image-sub');
          for (product of products){
            temp.push(product.childNodes[0].href);
          }
          return temp;
        }))
      }
    }
  }

  for (innerArray of dirtyArray){
    if (innerArray.length !== 0){
      cleanArray.push(innerArray);
    }
  }

  // allProducts is now an array of every product's direct URL as a string
  let allProducts = [].concat.apply([], cleanArray);

  let allData = [];

  // Enter every product link and grab title, partNum, price, description, imgURL, replacesParts, fitsModels 
  for (product of allProducts){
    await page.goto(product);
    allData.push(await page.evaluate(() => {
      console.log('henlo');
      let imgURL = document.querySelector('.owl-item.active').querySelector('a').href
      let title = document.querySelectorAll('.col-xs-12.col-sm-12.col-md-6.product-detail-right')[0].childNodes[1].innerText;
      let partNum = document.querySelectorAll('h1')[0].innerText.slice(8);
      let price = document.querySelectorAll('.product-details-price')[0].innerText;
      let description = document.querySelectorAll('.product-details-right-bottom.gray-font')[0].innerText;
      //let replacesParts = document.getElementById('collapseOne').querySelectorAll('li');
      return {imgURL, title, partNum, price, description};
    }));
  }

  browser.close();
  // Final working answer
  return (allData);
}

// Runs the whole damn thing
scrape().then((value) => {
  fs.writeFile('data.JSON', value, function (err) {
    if (err) throw err;
    console.log('Data saved as "/data.JSON"');
  });
})

