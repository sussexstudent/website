import React from 'react';
import { OneImageBackground } from '~components/OneImage';
import styled from '@emotion/styled';

export const SlateBoxContainer: React.FC = ({ children }) => (
  <div className="BentoBox">{children}</div>
);
export const SlateBoxBackground = styled(OneImageBackground)({
  overflow: 'auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  paddingTop: '1rem',
  boxSizing: 'border-box',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});
