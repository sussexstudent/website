const webpack = require('webpack');

const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

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
      vendor: [
        'react',
        'react-dom',
        'react-imgix',
        'unfetch/polyfill',
        'raven-js',
        'mitt',
      ],
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
      modules: ['web_modules', 'node_modules', './src/images'],
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
        minChunks: Infinity,
      }),
      new DuplicatePackageCheckerPlugin(),
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
          loader: 'awesome-typescript-loader?useBabel=true',
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
              },
            },
          ],
        },
      ],
    },
  };
}

module.exports = { generateConfig, baseDir };
