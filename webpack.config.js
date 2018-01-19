const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction
  ? require('./config/webpack.prod.config.js')
  : require('./config/webpack.dev.config.js');

module.exports = config;
