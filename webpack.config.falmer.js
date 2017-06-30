const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction
  ? require('./config/falmer.prod.config.js')
  : require('./config/falmer.dev.config.js');

module.exports = config;
