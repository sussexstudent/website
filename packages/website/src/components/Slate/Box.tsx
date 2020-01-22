import React from 'react';
import { OneImageBackgroundProps, OneImageBackground } from '../OneImage';

export const SlateBoxContainer: React.FC = ({ children, ...props }) => (
  <div className="BentoBox" {...props}>
    {children}
  </div>
);

export const SlateBoxContainerStyleable: React.FC = ({
  children,
  ...props
}) => (
  <div
    css={{
      boxShadow: '0 2px 16px 3px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      transition: 'box-shadow 300ms ease',
      background: 'white',
      boxSizing: 'border-box',
      marginBottom: '1rem',
      position: 'relative',
      display: 'flex',
      width: '100%',
      '&:hover': {
        boxShadow: '0 4px 22px 3px rgba(0, 0, 0, 0.2)',
      },
      '&:active': {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
      },
    }}
    {...props}
  >
    {children}
  </div>
);

export const SlateBoxBackground: React.FC<OneImageBackgroundProps> = (
  props,
) => (
  <OneImageBackground
    css={{
      overflow: 'auto',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: '1rem',
      boxSizing: 'border-box',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    {...props}
  />
);
