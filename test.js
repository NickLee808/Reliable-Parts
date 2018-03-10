const fs = require('fs');

let data = [['link1', 'link2', 'link3'], ['link4', 'link5', 'link6'], ['link7', 'link8', 'link9']];

fs.writeFile('test.JSON', JSON.stringify([].concat.apply([], data)), function (err) {
  if (err) throw err;
  console.log('Saved!');
});