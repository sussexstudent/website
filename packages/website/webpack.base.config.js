const webpack = require('webpack');
const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

const baseDir = path.join(__dirname, '.');

function generateConfig() {
  return {
    target: 'web',
    mode: isProduction ? 'production' : 'development',

    entry: {
      vendor: ['unfetch/polyfill', '../common/src/lazysizes.ts'],
      main: ['./src/entry.ts'],
    },

    output: {
      path: path.resolve(path.join(baseDir, 'build')),
      publicPath: '/assets',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.svg'],
    },

    node: {
      Buffer: false,
    },

    plugins: [
      new LodashModuleReplacementPlugin({
        paths: true,
        flattening: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.FALMER_ENDPOINT': JSON.stringify(
          isProduction
            ? 'https://falmer.sussexstudent.com'
            : 'http://localhost:8000'
        )
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
          test: /\.m?jsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              envName: 'bundle'
            }
          }
          ],
        },
      ],
    },
  };
}

module.exports = { generateConfig, baseDir };
