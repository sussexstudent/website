const path = require('path');
const webpack = require('webpack');
const { generateConfig } = require('./webpack.base.config.js');

const config = generateConfig();

config.entry.main = ['./src/projects/sanguine/client.tsx'];

config.devServer = {
  historyApiFallback: true,
  hot: true,
  https: false,
};

config.mode = 'development';

config.entry.vendor.push('webpack-hot-middleware/client');
config.entry.main.push('webpack-hot-middleware/client');

config.output = {
  path: path.resolve('./build'),
  publicPath: '/assets/',
  filename: '[name].js',
  chunkFilename: '[id].chunk.js',
};

config.devtool = 'inline-source-map';

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      HYDROLEAF_MODE: JSON.stringify('RENDER_COMPONENT'),
      COMP_NODE: '0',
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
]);

config.module.rules = config.module.rules.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?cacheDirectory&envName=bundle'],
    exclude: /node_modules/,
  },
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
