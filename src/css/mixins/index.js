module.exports = {
  'a11y-hide': {
    '&': {
      clip: 'rect(1px, 1px, 1px, 1px)',
      position: 'absolute !important',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
    },
  },
  rounded: function roundedMixin(mixin, type) {
    const self = {
      'border-radius': '2px',
    };

    if (type === 'mask') {
      self.overflow = 'hidden';
    }

    return {
      '&': self,
    };
  },
  card: function cardMixin(mixin, type) {
    switch (type) {
      case 'standard': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15);',
            'border-radius': '2px',
            overflow: 'hidden',
            transition: 'box-shadow 300ms ease',
          },
          '&:hover': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
          },
          '&:active': {
            'box-shadow': '0 1px 2px 0 rgba(0,0,0,0.15);',
          },
        };
      }
      case 'standard-no-action': {
        return {
          '&': {
            'background-color': '#ffffff',
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15);',
            'border-radius': '2px',
            overflow: 'hidden',
          },
        };
      }
      case 'standard-force': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15) !important;',
            'border-radius': '2px !important',
            overflow: 'hidden !important',
            transition: 'box-shadow 300ms ease !important',
          },
          '&:hover': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15) !important;',
          },
          '&:active': {
            'box-shadow': '0 1px 2px 0 rgba(0,0,0,0.15) !important;',
          },
        };
      }
      case 'standard-no-transition': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15);',
            'border-radius': '2px',
          },
          '&:hover': {
            'box-shadow': '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
          },
          '&:active': {
            'box-shadow': '0 1px 2px 0 rgba(0,0,0,0.15);',
          },
        };
      }
      case 'flat': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15);',
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
