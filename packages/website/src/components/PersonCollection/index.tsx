import React from 'react';
import {
  PersonCollectionFigure,
  FigureData,
} from '../PersonCollection/PersonCollectionFigure';
import { scrollableXStyle } from '@ussu/basil/src/ScrollableSlice';

interface IProps {
  items?: FigureData[];
  size?: 'small' | 'medium' | 'big';
}

export const PersonCollection: React.FC<IProps> = ({
  children,
  items = null,
}) => (
  <ul
    className={`PersonCollection`}
    css={[
      scrollableXStyle,
      {
        listStyle: 'none',
        padding: 0,
        margin: '0 auto',
      },
    ]}
  >
    {items === null
      ? children
      : items.map((item) => <PersonCollectionFigure {...item} />)}
  </ul>
);
