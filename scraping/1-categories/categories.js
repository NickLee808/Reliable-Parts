// dependencies
const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.reliableparts.com/');
    return page.evaluate(() => {
        let temp = [];
        let allCategories = document.querySelectorAll('.menu-all-category')[0].children[0].children;
        for(category of allCategories) {
            temp.push(category.firstChild.attributes[0].textContent);
        }
        return temp;
    });
}

// Run the whole damn thing
scrape().then((data) => {
    fs.writeFile('categories.json', 
    JSON.stringify({categories: data}), 
    (err) => {
        if (err) throw err;
        console.log('Data saved as categories.json');
    });
});
