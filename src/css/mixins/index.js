module.exports = {
  card: function cardMixin(mixin, type) {
    switch (type) {
      case 'standard': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 300ms ease',
          },
          '&:hover': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
          },
          '&:active': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 30ms ease',
          },
        };
      }
      case 'flat': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
          },
        };
      }
      case 'raised': {
        return {
          '&': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
          },
        };
      }
      default: {
        return {};
      }
    }
  },
};
