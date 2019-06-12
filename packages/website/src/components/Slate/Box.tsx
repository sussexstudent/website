import React from 'react';
import { IBackgroundProps, OneImageBackground } from '../OneImage';

export const SlateBoxContainer: React.FC = ({ children }) => (
  <div className="BentoBox">{children}</div>
);
export const SlateBoxBackground: React.FC<IBackgroundProps> = (props) => (
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
