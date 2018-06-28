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
    main: ['babel-polyfill', './src/projects/common/lazysizes.ts', './src/projects/falmer/entry.ts'],
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
      '~icons': path.resolve(path.join(__dirname, '../src/icons')),
      '~components': path.resolve(path.join(__dirname, '../src/components')),
      '~types': path.resolve(path.join(__dirname, '../src/types')),
      '~falmer': path.resolve(path.join(__dirname, '../src/projects/falmer')),
      '~libs': path.resolve(baseDir, 'src/libs/'),
      'react-router-dom': 'react-router-dom/es',
      'react-router': 'react-router/es',
      'react-helmet': 'react-helmet/es/Helmet.js',
      'date-fns': 'date-fns/esm',
      history: 'history/es',
      'lodash.pick': 'lodash/pick',
      'lodash.flowright': 'lodash/flowright',
    },
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
      template: './src/projects/falmer/index.ejs',
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
              svgo: false,
            },
          },
        ],
      },
    ],
  },
};
