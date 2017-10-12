const webpack = require('webpack');

const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};
env.build = env.production || env.staging;

module.exports = {
  target: 'web',

  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-imgix',
      'unfetch/polyfill',
      'raven-js',
      'mitt',
    ],
    main: ['./src/projects/website/entry.js'],
    freshers: ['./src/projects/freshers/entry.js'],
    devFonts: './src/projects/website/env-dev.js',
    productionFonts: './src/projects/website/env-production.js',
  },

  output: {
    path: path.resolve(path.join(__dirname, 'build')),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modules: ['web_modules', 'node_modules', './src/images'],
    alias: {
      '~components': path.resolve(__dirname, 'src/components/'),
      '~libs': path.resolve(__dirname, 'src/libs/'),
    },
    extensions: ['.js', '.svg'],
  },

  node: {
    Buffer: false,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        HYDROLEAF_MODE: JSON.stringify('RENDER_COMPONENT'),
        NODE_ENV: JSON.stringify(NODE_ENV),
        FALMER_ENDPOINT: JSON.stringify(
          env.production
            ? 'https://falmer.sussexstudent.com'
            : 'http://localhost:8000'
        ),
      },
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new DuplicatePackageCheckerPlugin(),
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
  },
};
