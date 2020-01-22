const setup = ({ config }) => {
  config.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.svg'],
  };

  config.module.rules = ([
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            envName: 'bundle'
          }
        },
        {
          loader: 'ts-loader',
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader'
        },
        'postcss-loader',
      ]
    },
    {
      test: /(\.svg|\.png|\.woff|\.mp3|\.webm)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
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
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: 'graphql-tag/loader',
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
    ]);

  return config;
};

module.exports = setup;
