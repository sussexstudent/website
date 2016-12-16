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
let extractCSS = new ExtractTextPlugin(`style{isProduction ? '.[contenthash]' : ''}.css`, { allChunks: true });

module.exports = {
  target: 'web',

  entry: {
    main: './src/index.js',
  },

  output: {
    path: path.join(__dirname),
    pathInfo: true,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modulesDirectories: [
      'web_modules',
      'node_modules',
      './src/images',
    ],
    extentions: ['js', 'svg'],
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
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
    ],
    loaders: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'] },
      { test: /\.svg|\.png|\.woff/, loader: 'url?limit=10000' },
    ],

    noParse: /\.min\.js/,
  },
  postcss(webpackInner) {
    return [
      require('postcss-import')({
        addDependencyTo: webpackInner,
      }),
      require('postcss-ant')(),
      require('postcss-lh'),
      require('postcss-cssnext'),
    ];
  },

};
