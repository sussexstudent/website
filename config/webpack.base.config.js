const webpack = require('webpack');
const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};
env.build = env.production || env.staging;

const baseDir = path.join(__dirname, '..');

function generateConfig() {
  return {
    target: 'web',

    entry: {
      vendor: ['unfetch/polyfill', './src/projects/common/lazysizes.ts'],
      main: ['./src/projects/website/entry.ts'],
    },

    output: {
      path: path.resolve(path.join(baseDir, 'build')),
      publicPath: '/assets',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
    },

    resolve: {
      plugins: [new TsConfigPathsPlugin({ configFile: path.resolve(path.join(baseDir, 'tsconfig.json')) })],
      modules: ['node_modules', './src/images'],
      alias: {
        '~icons': path.resolve(path.join(__dirname, '../src/icons')),
        '~components': path.resolve(baseDir, 'src/components/'),
        '~libs': path.resolve(baseDir, 'src/libs/'),
        'react-helmet': 'react-helmet/es/Helmet.js',
        'lodash.pick': 'lodash/pick',
        'lodash.flowright': 'lodash/flowright',
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
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.FALMER_ENDPOINT': JSON.stringify(
          env.production
            ? 'https://falmer.sussexstudent.com'
            : 'http://localhost:8000'
        ),
        __DEV__: env.development,
        __STAGING__: env.staging,
        __PRODUCTION__: env.production,
      }),
      new DuplicatePackageCheckerPlugin(),
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
          test: /(\.svg|\.png|\.woff|\.mp3|\.webm)$/,
          use: 'url-loader?limit=10000',
          exclude: /icons/,
        },
        {
          test: /\.svg$/,
          exclude: /img|(\.file\.svg$)/,
          use: [
            'babel-loader',
            {
              loader: '@svgr/webpack',
              options: {
                // icon: true,
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
        {
          test: /\.js?$/,
          loaders: ['babel-loader?envName=bundle'],
        },
      ],
    },
  };
}

module.exports = { generateConfig, baseDir };
