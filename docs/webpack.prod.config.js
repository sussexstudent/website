const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.base.config.js');

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: './dist',
  pathInfo: true,
  publicPath: '/',
  filename: '[name].[hash].js',
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist']),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
]);

module.exports = config;
