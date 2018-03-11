// dependencies
const Promise = require('bluebird');
const puppeteer = require('puppeteer');
const fs = Promise.promisifyAll(require('fs'));

// current batch
const start = 5000;
const stop = 5248;

let scrape = async () => {
    // import allProducts urls
    let allProducts = await fs.readFileAsync('allProducts.json', 'utf8')
        .then(data => JSON.parse(data));

    // remove duplicates
    var sorted_arr = allProducts.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    allProducts = results;

    // before: 8923 entries, after: 5248 entries
    console.log('allProducts length: ', allProducts.length);
    console.log('current batch: ', start, ' to ', stop);

    // scrape in batches to eliminate 429 error
    allProducts = allProducts.slice(start, stop);

    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let allData = [];

    for (product of allProducts){
        console.log(product);
        await page.goto(product);
        allData.push(await page.evaluate(() => {
            let imgTag = document.querySelector('.owl-item.active');
            let imgURL;
            if(!!imgTag) {
                imgURL = imgTag.querySelector('a').href;
            }
            let title = document.querySelectorAll('.col-xs-12.col-sm-12.col-md-6.product-detail-right')[0].childNodes[1].innerText;
            let partNum = document.querySelectorAll('h1')[0].innerText.slice(8);
            let price = document.querySelectorAll('.product-details-price')[0].innerText;
            let description = document.querySelectorAll('.product-details-right-bottom.gray-font')[0].innerText.slice(20);
            let replacesParts = [];
            let parts = document.querySelector('#collapseOne');
            if(!!parts){
                parts = parts.querySelectorAll('li');
                for(part of parts){
                    replacesParts.push(part.textContent);
                }
            }
            let fitsModels = [];
            let models = document.querySelector('#collapseThree');
            if(!!models){
                models = models.querySelectorAll('li');
                for(model of models){
                    fitsModels.push(model.querySelector('a').textContent);
                }
            }
            return {imgURL, title, partNum, price, description, replacesParts, fitsModels};
        }));
    }

    return allData;
}

// run that shit
scrape().then(data => {
    fs.writeFile(`${start}to${stop}.json`, JSON.stringify(data), err => {
        if(err) throw err;
        console.log('done');
    });
});
