const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.base.config.js');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: './dist',
  publicPath: '/assets/',
  filename: '[name].js',
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist', 'prototypes/build']),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
]);

config.module.rules = config.module.rules.concat([
  { test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
]);

module.exports = config;
