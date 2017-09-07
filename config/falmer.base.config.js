const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  target: 'web',

  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-imgix',
      'unfetch/polyfill',
      'raven-js',
      'mitt',
    ],
    main: ['./src/projects/falmer/entry.js'],
    devFonts: './src/projects/website/env-dev.js',
    productionFonts: './src/projects/website/env-production.js',
  },

  output: {
    path: path.resolve(path.join(__dirname, '../build-falmer')),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modules: ['web_modules', 'node_modules', './src/images'],
    alias: {
      '~components': path.resolve(path.join(__dirname, '../src/components')),
      '~falmer': path.resolve(path.join(__dirname, '../src/projects/falmer')),
    },
    extensions: ['.js', '.svg'],
  },

  node: {
    Buffer: false,
  },

  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 3999 }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        FALMER_ENDPOINT: JSON.stringify(
          NODE_ENV === 'production'
            ? 'https://falmer.sussexstudent.com'
            : 'http://localhost:8000'
        ),
      },
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new DuplicatePackageCheckerPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './src/projects/falmer/index.ejs',
    }),
    new HtmlWebpackHardDiskPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.svg|\.png|\.woff|\.json/,
        use: 'url-loader?limit=10000',
      },
    ],
    noParse: /\.min\.js/,
  },
};
