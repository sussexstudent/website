import { css } from 'emotion';

export const cardActionable = css({
  '&': {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15);',
    overflow: 'hidden',
    transition: 'box-shadow 300ms ease',
  },
  '&:hover': {
    boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.15);',
  },
  '&:active': {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.15);',
  },
});
