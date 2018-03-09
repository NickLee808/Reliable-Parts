const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reliableparts.com/');

  let allSubCats = [];
  let allProducts = [];
  
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
    allProducts.push(await page.evaluate(() => {
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
        allProducts.push(await page.evaluate(() => {
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

  browser.close();
  // Final working answer
  return allProducts;
}

// Runs the whole damn thing
scrape().then((value) => {
  console.log(value);
})