const wp = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  const options = {
    webpackOptions: require('../../config/webpack.dev.config'),
  };
  on('file:preprocessor', wp(options))
};
