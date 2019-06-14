const path = require('path');
const { baseDir } = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.prod.config');

config.plugins.push(new HtmlWebpackPlugin());
config.entry.main = './src/previewEntry';
config.output = {
  path: path.resolve(path.join(baseDir, 'preview-dist')),
  publicPath: '/',
};

module.exports = config;
