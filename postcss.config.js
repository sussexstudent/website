const mixins = require('./packages/common/src/css/mixins');

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins')({
      mixins: mixins,
    }),
    require('postcss-nested'),
    require('lost'),
    require('postcss-lh'),
    require('postcss-cssnext')
  ],
};
