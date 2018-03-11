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
    console.log(allData.slice(0,5));
    await Part.bulkCreate(allData)
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
