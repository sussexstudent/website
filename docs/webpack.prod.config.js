const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.base.config.js');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: './docs/dist',
  publicPath: '/',
  filename: '[name].[hash].js',
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist']),
  new CopyWebpackPlugin([
    { from: './docs/src/root', to: './' },
  ]),
  new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
]);

config.module.rules = config.module.rules.concat([
  { test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
]);

module.exports = config;
