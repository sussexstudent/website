const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const config = require('./falmer.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'falmer.[contenthash].[name].css',
  allChunks: true,
});

config.bail = true;
config.profile = false;
config.devtool = 'source-map';

const baseDir = path.join(__dirname, '..');

config.output = {
  path: path.resolve(path.join(baseDir, 'dist-falmer')),
  publicPath: 'https://du9l8eemj97rm.cloudfront.net/',
  filename: 'falmer.[name].[chunkhash].js',
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['./dist-falmer'], {
    root: path.join(__dirname, '/..'),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  extractCSS,
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common.js',
    async: false,
    children: true,
    minChunks: 2,
  }),
  // new ChunkManifestPlugin({
  //   filename: 'falmer-manifest.json',
  //   manifestVariable: 'chunkManifest',
  // }),
  new webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    sourceMap: true,
  }),
  new AssetsWebpackPlugin(),
  // new webpack.optimize.ModuleConcatenationPlugin(),
]);

config.module.rules = config.module.rules.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?forceEnv=bundle'],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loader: extractCSS.extract({
      fallback: 'style-loader',
      use: 'css-loader?importLoaders=1!postcss-loader',
    }),
  },
]);

module.exports = config;
