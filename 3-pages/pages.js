const Promise = require('bluebird');
const puppeteer = require('puppeteer');
const fs = Promise.promisifyAll(require('fs'));

let scrape = async () => {
    let subcategories = await fs.readFileAsync('subcategories.json', 'utf8')
        .then(data => JSON.parse(data).subcategories.slice(0, 3));
    console.log('subcategories');
    console.log(subcategories);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let dirtyArr = [];
    let nextPage = async (url) => {
        await page.goto(url);
        console.log('went to: ', url);
        let href = await page.evaluate(() => {
            let pagination = document.querySelector('.pagination');
            if(!!pagination) {
                let hasNext = pagination.innerText.indexOf('NEXT') > -1;
                if(hasNext) {
                    let link = pagination.lastChild.childNodes[1].href;
                    return [link, nextPage(link)];
                }else{
                    return null;
                }
            }
        });
    }
    for(let i = 0; i < subcategories.length; i++) {
        let sub = subcategories[i]
        dirtyArr.push(await nextPage(sub));
        fs.writeFile('dirtyArr.json',
        JSON.parse({"dirtyArr": dirtyArr}),
            (err) => {
                if(err) throw err;
                console.log('done');
            });
    }
}

// run that shit
scrape();
