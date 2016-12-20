const webpack = require('webpack');

const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(JSON.stringify(NODE_ENV));

const isProduction = process.env.NODE_ENV === 'production';

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};
env['build'] = (env.production || env.staging)
const extractCSS = new ExtractTextPlugin({
  filename: `style${false ? '.[contenthash]' : ''}.css`,
  allChunks: true,
});

module.exports = {
  target: 'web',

  entry: {
    main: './src/entry.js',
  },

  output: {
    path: path.resolve(path.join(__dirname, 'build')),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      './src/images',
    ],
    extensions: ['.js', '.svg'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
    }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', }),
    extractCSS,
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?importLoaders=1!postcss-loader',
        }),
      },
      {
        test: /\.svg|\.png|\.woff|\.json/,
        loader: 'url-loader?limit=10000',
      },
    ],
    noParse: /\.min\.js/,
  },
};
