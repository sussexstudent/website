const setup = ({ config }) => {
  config.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.svg'],
  };

  config.module.rules = ([
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
    }
    ]);

  return config;
};

module.exports = setup;
