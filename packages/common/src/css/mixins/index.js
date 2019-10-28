const omit = require('lodash').omit;
const standardType = require('./typedata').standard;

function type(mixin, args) {
  const [name, ...options] = args.split(' ');

  if (!standardType.hasOwnProperty(name)) {
    console.warn(`[css] "${name}" isn't a font size.`);
    return { color: 'red !important' };
  }

  const withoutLineHeight = options.indexOf('without-line-height') > -1;
  const isHighlight = options.indexOf('highlight') > -1;

  const keysToRemove = [];

  if (withoutLineHeight) {
    keysToRemove.push('line-height');
  }

  const process = (map) => {
    let processedMap = map;
    processedMap = omit(processedMap, keysToRemove);

    if (isHighlight && Object.hasOwnProperty.call(processedMap, 'font-size')) {
      processedMap['line-height'] = processedMap['font-size'];
    }

    return processedMap;
  };

  const size = standardType[name];

  const fontMap = process(standardType[name]['group-a']);

  if (size.hasOwnProperty('group-b')) {
    fontMap['@media screen and (min-width: 320px)'] = process(
      standardType[name]['group-b'],
    );
  }

  if (size.hasOwnProperty('group-c')) {
    fontMap['@media screen and (min-width: 600px)'] = process(
      standardType[name]['group-c'],
    );
  }

  if (size.hasOwnProperty('group-d')) {
    fontMap['.feature-no-touch &'] = process(standardType[name]['group-d']);
  }

  return fontMap;
}

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
      'border-radius': '0px',
    };

    if (type === 'mask') {
      self.overflow = 'hidden';
    }

    return {
      '&': self,
    };
  },
  type,
  outputTypeClassNames(mixin) {
    const sizes = Object.keys(standardType);
    const map = {};

    sizes.forEach((sizeName) => {
      map[`.type-${sizeName}`] = type(mixin, sizeName);
    });

    return map;
  },
  card: function cardMixin(mixin, type) {
    switch (type) {
      case 'standard': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15);',
            'border-radius': '0px',
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
            'border-radius': '0px',
            overflow: 'hidden',
          },
        };
      }
      case 'floating': {
        return {
          'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.1);',
          'border-radius': '0px',
        };
      }
      case 'standard-force': {
        return {
          '&': {
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.15) !important;',
            'border-radius': '0px !important',
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
            'border-radius': '0px',
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
