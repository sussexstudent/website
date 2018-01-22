const path = require('path');
const { generateConfig, baseDir } = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = generateConfig();

const extractCSS = new ExtractTextPlugin({
  filename: 'union.[contenthash].[name].css',
  allChunks: true,
});

config.bail = true;
config.profile = false;
config.devtool = 'none';

config.performance = {
  hints: false,
  maxEntrypointSize: 500000,
};

config.output = {
  path: path.resolve(path.join(baseDir, 'comp-dist')),
  publicPath: '/assets/',
  filename: 'union.[name].js',
};

config.plugins = [
  extractCSS,
];

config.module.rules = config.module.rules.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?forceEnv=comp'],
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
