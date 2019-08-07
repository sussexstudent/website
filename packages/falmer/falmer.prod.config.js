const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const config = require('./falmer.base.config.js');
const MiniCSSExtract = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const extractCSS = new MiniCSSExtract({
  filename: 'falmer.[contenthash].[name].css',
  allChunks: true,
});

config.bail = true;
config.profile = false;
config.devtool = 'source-map';
config.mode = 'production';

const baseDir = path.join(__dirname);

config.output = {
  path: path.resolve(path.join(baseDir, 'dist-falmer')),
  publicPath: 'https://du9l8eemj97rm.cloudfront.net/',
  filename: 'falmer.[name].[chunkhash].js',
};


config.optimization = {
  minimizer: [
    new TerserPlugin(),
    new OptimizeCSSAssetsPlugin({})
  ]
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  extractCSS,
  new AssetsWebpackPlugin(),
]);

config.module.rules = config.module.rules.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?envName=bundle'],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loader: [MiniCSSExtract.loader, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    }, 'postcss-loader'],
  },
]);

module.exports = config;
