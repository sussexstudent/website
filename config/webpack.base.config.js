const webpack = require('webpack');

const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const NODE_ENV = process.env.NODE_ENV || 'development';

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};
env.build = env.production || env.staging;

const baseDir = path.join(__dirname, '..');

const vendorLibs = [
  'react',
  'react-dom',
  'react-apollo',
  'apollo-client',
  'apollo-cache-inmemory',
  'graphql',
  'react-router',
  'react-router-dom',
  'unfetch/polyfill',
  'raven-js',
  'mitt',
];

const vendorExp = new RegExp(`(${vendorLibs.join('|')})`);

function generateConfig() {
  return {
    target: 'web',

    entry: {
      vendor: ['./src/projects/common/lazysizes.ts'],
      main: ['./src/projects/website/entry.ts'],
      devFonts: './src/projects/website/env-dev.ts',
      productionFonts: './src/projects/website/env-production.ts',
    },

    output: {
      path: path.resolve(path.join(baseDir, 'build')),
      publicPath: '/assets',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
    },

    resolve: {
      modules: ['node_modules', './src/images'],
      alias: {
        '~components': path.resolve(baseDir, 'src/components/'),
        '~libs': path.resolve(baseDir, 'src/libs/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.svg'],
    },

    node: {
      Buffer: false,
    },

    plugins: [
      new LodashModuleReplacementPlugin({
        paths: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
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
        minChunks: (module) => vendorExp.test(module.resource),
      }),
      new DuplicatePackageCheckerPlugin(),
      new TsConfigPathsPlugin(),
    ],
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   use: 'eslint-loader',
        //   exclude: /node_modules/,
        //   enforce: 'pre',
        // },
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
          test: /\.svg|\.png|\.woff/,
          use: 'url-loader?limit=10000',
          exclude: /icons/,
        },
        {
          test: /\.svg$/,
          exclude: /img/,
          use: [
            'babel-loader',
            {
              loader: 'svgr/webpack',
              options: {
                svgo: false,
                prettier: false,
              },
            },
          ],
        },
      ],
    },
  };
}

module.exports = { generateConfig, baseDir };