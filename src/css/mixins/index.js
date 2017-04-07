module.exports = {
  rounded: function roundedMixin(mixin, type) {
    return {
      '&': {
        'border-radius': '2px',
        overflow: 'hidden',
      }
    }
  },
  card: function cardMixin(mixin, type) {
    switch (type) {
      case 'standard': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
            'border-radius': '2px',
            overflow: 'hidden',
            transition: 'box-shadow 300ms ease',
          },
          '&:hover': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
          },
          '&:active': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
          },
        };
      }
      case 'standard-no-transition': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
            'border-radius': '2px',
          },
          '&:hover': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
          },
          '&:active': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
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
