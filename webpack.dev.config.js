const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');

config.devServer = {
  historyApiFallback: true,
  hot: true,
  https: true,
};

config.entry.main.push('webpack-hot-middleware/client');

config.output = {
  path: path.resolve('./build'),
  publicPath: '/assets/',
  filename: '[name].js',
  chunkFilename: '[id].chunk.js',
};

config.devtool = 'inline-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),

]);

config.module.rules = config.module.rules.concat([
  { test: /\.js?$/, loaders: ['babel-loader?cacheDirectory&forceEnv=bundle'], exclude: /node_modules/ },
  {
    test: /\.css$/,
    // fallback: 'style-loader',
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  },

]);

module.exports = config;
