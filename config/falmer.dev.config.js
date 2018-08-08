const path = require('path');
const webpack = require('webpack');
const config = require('./falmer.base.config.js');

config.devServer = {
  historyApiFallback: true,
  hot: true,
  https: false,
};

config.output = {
  path: path.resolve('./build-falmer'),
  publicPath: 'http://localhost:8080/',
  filename: '[name].js',
  chunkFilename: '[id].chunk.js',
};
config.mode = 'development';

config.devtool = 'inline-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
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
