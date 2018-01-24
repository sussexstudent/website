const path = require('path');
const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const baseDir = path.join(__dirname, '../..');
const NODE_ENV = process.env.NODE_ENV || 'development';


const config = {
  target: 'web',

  entry: {
    main: ['unfetch/polyfill', './src/projects/common/lazysizes.ts', './src/projects/website/entry.ts'],
    devFonts: './src/projects/website/env-dev.ts',
    productionFonts: './src/projects/website/env-production.ts',
  },

  resolve: {
    modules: ['node_modules', './src/images'],
    alias: {
      '~components': path.resolve(baseDir, 'src/components/'),
      '~libs': path.resolve(baseDir, 'src/libs/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.svg'],
  },

  plugins: [
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
    new TsConfigPathsPlugin(),
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
        test: /(\.svg|\.png|\.woff)$/,
        use: 'url-loader?limit=10000',
        exclude: /icons/,
      },
      {
        test: /\.svg$/,
        exclude: /img|(\.file\.svg$)/,
        use: [
          'babel-loader',
          {
            loader: 'svgr/webpack',
            options: {
              svgo: true,
              prettier: false,
            },
          },
        ],
      },
    ],
  },
};

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      HYDROLEAF_MODE: JSON.stringify('RENDER_COMPONENT'),
      COMP_NODE: '0',
    },
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
]);

config.module.rules = config.module.rules.concat([
  {
    test: /\.jsx?$/,
    loaders: ['babel-loader?cacheDirectory&forceEnv=bundle'],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
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
