var mixins = require('./src/css/mixins');

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins')({
      mixins: mixins,
    }),
    require('postcss-nested'),
    require('postcss-ant')(),
    require('lost'),
    require('postcss-lh'),
    require('postcss-cssnext'),
    require('postcss-pxtorem'),
  ],
};
