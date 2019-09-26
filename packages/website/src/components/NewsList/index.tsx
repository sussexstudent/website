import React from 'react';
import cx from 'classnames';
import { NewsBlock, NewsItem } from './NewsBlock';

interface IProps {
  fullWidth: boolean;
  items: NewsItem[];
}

export const NewsList: React.FC<IProps> = ({ items, fullWidth = false }) => (
  <ul className={cx('NewsGrid', { 'NewsGrid--full-width': fullWidth })}>
    {items.map((item) => (
      <NewsBlock item={item} key={item.id} />
    ))}
  </ul>
);
