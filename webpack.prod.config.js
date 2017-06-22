const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const config = require('./webpack.base.config.js');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'union.[contenthash].[name].css',
  allChunks: true,
});

config.bail = true;
config.profile = false;
config.devtool = 'source-map';

config.output = {
  path: path.resolve(path.join(__dirname, 'dist')),
  publicPath: 'https://du9l8eemj97rm.cloudfront.net/',
  filename: 'union.[name].[chunkhash].js',
};

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist', 'prototypes/build']),
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
  new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'chunkManifest',
  }),
  new CopyWebpackPlugin([{ from: './src/img/favicons', to: './branding' }]),
  new webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    sourceMap: true,
  }),
  new AssetsWebpackPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
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
