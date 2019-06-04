const path = require('path');
const webpack = require('webpack');
const { generateConfig, baseDir } = require('./webpack.base.config.js');
const nodeExternals = require('webpack-node-externals');
const SaveAssetsJson = require('assets-webpack-plugin');

const config = generateConfig();

const isProd = process.env.NODE_ENV === 'production';

config.bail = true;
config.profile = false;
config.devtool = 'none';

config.performance = {
  hints: false,
  maxEntrypointSize: 500000,
};

config.target = 'node';

config.mode = isProd ? 'production' : 'development';

config.optimization = { minimize: false };

config.output = {
  path: path.resolve(path.join(baseDir, '/sanguine-dist/backend')),
  //publicPath: isProd ? 'https://du9l8eemj97rm.cloudfront.net/' : '/dist/',
  filename: 'sanguine.js',
};

config.entry = ['@babel/polyfill', './src/projects/sanguine/server.tsx'];

config.node = {
  __dirname: false,
  __filename: false,
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.TARGET_ENV': '"SANGUINE"',
  }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'server-assets.json',
  }),
];

config.externals = [nodeExternals()];

config.module.rules = config.module.rules.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?envName=comp'],
    exclude: /node_modules/,
  }
]);

module.exports = config;
