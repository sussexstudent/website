const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = process.env.NODE_ENV === 'production';

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};
env['build'] = (env.production || env.staging)
let extractCSS = new ExtractTextPlugin({
  filename: `style{isProduction ? '.[contenthash]' : ''}.css`,
  allChunks: true
});

module.exports = {
  target: 'web',

  entry: {
    main: './src/index.js',
  },

  output: {
    path: path.join(__dirname),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      './src/images',
    ],
    moduleExtensions: ['js', 'svg'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${NODE_ENV}'`,
      },
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
    }),
    new HtmlWebpackPlugin({
      title: 'USSU Docs',
      filename: '200.html',
      template: './public/template.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackPlugin({
      title: 'USSU Docs',
      filename: 'index.html',
      template: './public/template.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
//    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', }),
  //  extractCSS,
  ],

  module: {
    rules: [
      { test: /\.js$/, use: 'eslint-loader', enforce: 'pre', exclude: /node_modules/ },
      { test: /\.json$/, use: 'json-loader', enforce: 'pre' },
      { test: /\.css$/, use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'] },
      { test: /\.svg|\.png|\.woff/, use: 'url-loader?limit=10000' },
    ],

    noParse: /\.min\.js/,
  }
};
