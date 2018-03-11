// dependencies
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

// concat allProducts
let concat = async () => {
    let batch1 = await fs.readFileAsync('../4-products/0to500.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch2 = await fs.readFileAsync('../4-products/500to1000.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch3 = await fs.readFileAsync('../4-products/1000to1500.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch4 = await fs.readFileAsync('../4-products/1500to2000.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch5 = await fs.readFileAsync('../4-products/2000to2500.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch6 = await fs.readFileAsync('../4-products/2500to3000.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch7 = await fs.readFileAsync('../4-products/3000to3500.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch8 = await fs.readFileAsync('../4-products/3500to4000.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch9 = await fs.readFileAsync('../4-products/4000to4500.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch10 = await fs.readFileAsync('../4-products/4500to5000.json', 'utf8')
        .then(data => JSON.parse(data));
    let batch11 = await fs.readFileAsync('../4-products/5000to5248.json', 'utf8')
        .then(data => JSON.parse(data));
    let allData = batch1.concat(batch2, batch3, batch4, batch5, batch6, batch7, batch8, batch9, batch10, batch11);

    console.log('allData length');
    console.log(allData.length);
    return allData;
}

// run that shit
concat().then(data => {
    fs.writeFile('allData.json', JSON.stringify(data), err => {
        if(err) throw err;
        console.log('done');
    });
});
