const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const baseDir = path.join(__dirname, '..');

module.exports = {
  target: 'web',
  entry: {
    main: ['@ussu/common/src/lazysizes.ts', './src/entry.ts'],
  },

  output: {
    path: path.resolve(path.join(__dirname, './build-falmer')),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modules: ['web_modules', 'node_modules', './src/images'],
    extensions: ['.ts', '.tsx', '.js'],
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
    new DuplicatePackageCheckerPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './src/index.ejs',
      chunks: ['main', 'productionFonts'],
      inject: false,
    }),
    new HtmlWebpackHardDiskPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader?useBabel=true&useCache=true',
            options: {
              useBabel: true,
              useCache: true,
              babelCore: "@babel/core",
              reportFiles: ['src/**/*.{ts,tsx}'],
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|png)$/,
        use: 'url-loader?limit=10000',
        exclude: /icons/,
      },
      {
        test: /\.svg$/,
        exclude: /img/,
        use: [
          'babel-loader',
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              dimensions: false,
              svgoConfig: {
                plugins: [{removeViewBox: false}],
              },
              prettier: false,
            },
          },
        ],
      },
    ],
  },
};
