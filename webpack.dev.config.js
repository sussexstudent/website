const webpack = require('webpack');
const config = require('./webpack.base.config.js');

if (process.env.NODE_ENV !== 'test') {

}

config.devServer = {
  historyApiFallback: true,
};

config.output = {
  path: './build',
  pathInfo: true,
  publicPath: '/build/',
  filename: '[name].js',
  chunkFilename: '[id].chunk.js',
};

config.devtool = 'eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.NoErrorsPlugin(),
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.js?$/, loaders: ['babel?cacheDirectory'], exclude: /node_modules/ },
]);

module.exports = config;
