import React from 'react';
import cx from 'classnames';
import NewsBlock, {NewsItem} from './NewsBlock';

interface IProps {
  fullWidth: boolean;
  items: Array<NewsItem>;
}

const NewsList = ({ items, fullWidth = false }: IProps) => (
  <ul className={cx('NewsGrid', { 'NewsGrid--full-width': fullWidth })}>
    {items.map(item => <NewsBlock item={item} key={item.id} />)}
  </ul>
);

export default NewsList;
