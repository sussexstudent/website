module.exports = {
  card: function cardMixin(mixin, type) {
    switch (type) {
      case 'flat': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
          },
        };
      }
      case 'raised': {
        return {
          '&': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.1);',
          },
        };
      }
      default: {
        return {};
      }
    }
  },
};
