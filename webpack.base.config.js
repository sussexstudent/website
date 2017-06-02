const webpack = require('webpack');

const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(JSON.stringify(NODE_ENV));

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};
env.build = (env.production || env.staging);

module.exports = {
  target: 'web',

  entry: {
    vendor: ['react', 'react-dom', 'unfetch/polyfill', 'raven-js', 'mitt'],
    main: ['./src/entry.js'],
    devFonts: './src/env-dev.js',
    productionFonts: './src/env-production.js',
  },

  output: {
    path: path.resolve(path.join(__dirname, 'build')),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      './src/images',
    ],
    alias: {
      '@ussu/components': path.resolve(path.join(__dirname, 'src/js/components')),
    },
    extensions: ['.js', '.svg'],
  },

  node: {
    Buffer: false,
  },

  plugins: [
    //new BundleAnalyzerPlugin({ analyzerPort: 3999 }),
    new webpack.DefinePlugin({
      'process.env': {
        HYDROLEAF_MODE: JSON.stringify("RENDER_COMPONENT"),
        NODE_ENV: JSON.stringify(NODE_ENV),
        FALMER_ENDPOINT: JSON.stringify(env.production ? 'https://falmer.sussexstudent.com' : 'http://localhost:8000'),
      },
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
    }),
    /*new LodashModuleReplacementPlugin({
      collections: true,
      shorthands: true,
      paths: true,
      unicode: true,
    }),*/
    new webpack.NamedChunksPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
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
        test: /\.svg|\.png|\.woff|\.json/,
        use: 'url-loader?limit=10000',
      },
    ],
    noParse: /\.min\.js/,
  },
};
