const path = require('path');
const { generateConfig, baseDir } = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = generateConfig();

const extractCSS = new MiniCssExtractPlugin({
  filename: 'union.[contenthash].[name].css',
  //allChunks: true,
});

config.bail = true;
config.profile = false;
config.devtool = 'none';

config.performance = {
  hints: false,
  maxEntrypointSize: 500000,
};

config.output = {
  path: path.resolve(path.join(baseDir, 'comp-dist')),
  publicPath: 'https://du9l8eemj97rm.cloudfront.net/',
  filename: 'union.[name].js',
};

config.plugins = [
  extractCSS,
];

config.module.rules = config.module.rules.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?envName=comp'],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loader: [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1', 'postcss-loader'],
  },
]);

module.exports = config;
