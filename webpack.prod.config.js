const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const config = require('./webpack.base.config.js');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'union.[contenthash].[name].css',
  allChunks: false,
});


config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: path.resolve(path.join(__dirname, 'dist')),
  publicPath: 'https://du9l8eemj97rm.cloudfront.net/',
  filename: 'union.[name].[hash].js',
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist', 'prototypes/build']),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new GitRevisionPlugin(),
  extractCSS,
  new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'chunkManifest',
  }),
  new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
  new AssetsWebpackPlugin(),
  new webpack.optimize.CommonsChunkPlugin({ async: true, children: true, minChunks: 3 }),

]);

config.module.rules = config.module.rules.concat([
  { test: /\.js?$/, loaders: ['babel-loader?forceEnv=bundle'], exclude: /node_modules/ },
  {
    test: /\.css$/,
    loader: extractCSS.extract({
      fallback: 'style-loader',
      use: 'css-loader?importLoaders=1!postcss-loader',
    }),
  },
]);

module.exports = config;
