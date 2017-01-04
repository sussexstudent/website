const fs = require('fs');
const path = require('path');

console.log(path.join(__dirname, '../webpack-assets.json'));
const assetsMap = JSON.parse(fs.readFileSync(path.join(__dirname, '../webpack-assets.json')));
const wintersmithConf = JSON.parse(fs.readFileSync(path.join(__dirname, '../prototypes/config.json')));

wintersmithConf.locals.assets = assetsMap;

fs.writeFileSync('./prototypes/config-prod.json', JSON.stringify(wintersmithConf));
