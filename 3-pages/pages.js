const puppeteer = require('puppeteer');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

let scrape = async () => {
    let subcategories = await fs.readFileAsync('subcategories.json', 'utf8')
        .then(data => JSON.parse(data).subcategories);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let dirtyArr = [];
    let nextPage = (url) => {
        await page.goto(url);
        dirtyArr.push(await page.evaluate(() => {
            let pagination = document.querySelector('.pagination');
            let hasNext = pagination.innerText.indexOf('NEXT') > -1;
            if(hasNext) {
                let href = pagination.lastChild.childNodes[1].href;
                dirtyArr.push(href);
                resolve(nextPage(href));
            }else{
                resolve(null);
            }
        }));
    }
    for(let i = 0; i < subcategories.length; i++) {
        let sub = subcategories[i]
        await nextPage(sub);
        console.log('dirtyArr: ', dirtyArr);
    }
}

// run that shit
scrape();
