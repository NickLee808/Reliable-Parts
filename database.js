// dependencies
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const sequelize = require('sequelize');
const db = require('./models');
const { Part } = db;

let database = async () => {
    // import allData.json
    let allData = await fs.readFileAsync('scraping/5-sequelize/allData.json', 'utf8')
        .then(data => JSON.parse(data));
    let stringifiedData = allData.map(part => {
        let newPart = {};
        newPart.imgURL = part.imgURL;
        newPart.title = part.title;
        newPart.partNum = part.partNum;
        newPart.price = part.price;
        newPart.description = part.description;
        newPart.replacesParts = JSON.stringify(part.replacesParts);
        newPart.fitsModels = JSON.stringify(part.fitsModels);
        return newPart;
    })
    await Part.bulkCreate(stringifiedData)
        .then(() => {
            return Part.findAll();
        })
        .then(parts => {
            console.log(parts);
        })
        .catch(err => {
            if(err) throw err;
        });
}

database();
